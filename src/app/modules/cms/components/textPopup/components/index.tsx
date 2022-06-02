import Pagination from 'rsuite/Pagination'
import Table from 'rsuite/Table'
import {useState, useEffect} from 'react'
import TrashIcon from '@rsuite/icons/Trash'
import {SortType} from 'rsuite-table/lib/@types/common'
import {useSelector, useDispatch} from 'react-redux'
import {EmptyObject} from 'chart.js/types/basic'
import IconButton from 'rsuite/IconButton'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import Tag from 'rsuite/Tag'
import {AiOutlineEdit} from 'react-icons/ai'
import {toast} from 'react-toastify'
import moment from 'moment'
import {isEmpty} from 'lodash'

//Manual import
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import * as textPopupRedux from 'src/app/modules/cms/components/textPopup/redux'
import {ITextPopupState} from 'src/app/modules/cms/components/textPopup/redux'
import AddTextPopup from './AddTextPopup'
import {TextPopupModel} from '../Model'
import {getTodayDate} from 'src/cms/helpers/AssetHelpers'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const Cell = Table.Cell
const TextPopup = () => {
  const dispatch = useDispatch()
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })

  const [actionType, setActionType] = useState('Add')
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)
  const [open1, setOpen1] = useState(false)
  const [editSelectedData, setEditCheckedData] = useState<TextPopupModel | EmptyObject>({})
  const [selectedData, setSelectedData] = useState<Array<string>>([])
  const [openSortModal, setOpenSortModal] = useState(false)

  const handleClose1 = () => setOpen1(false)

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }

  const textPopupData: ITextPopupState = useSelector((state: any) => state.textPopup)
  const {
    activateSuccess,
    deactivateSuccess,
    singleActivateSuccess,
    singleDeactivateSuccess,
    deleteSuccess,
    sortTextPopupData,
    success,
  } = textPopupData

  const handleToggleAction = (data: {[key: string]: string}) => {
    data?.status
      ? dispatch(textPopupRedux.actions.singleDeactivateTextPopup({id: data.id}))
      : dispatch(textPopupRedux.actions.singleActivateTextPopup({id: data.id}))
  }

  const ActionCell = ({rowData, dataKey, ...props}: any) => {
    return (
      <Cell {...props} className='link-group'>
        <CheckPermissions type='Edit'>
          <Whisper placement='top' trigger='hover' speaker={<Tooltip>Edit</Tooltip>}>
            <IconButton
              appearance='subtle'
              onClick={() => {
                setEditCheckedData(rowData)
                setActionType('Edit')
                setOpen1(true)
              }}
              icon={<AiOutlineEdit />}
            />
          </Whisper>
        </CheckPermissions>
        <CheckPermissions type='Delete'>
          <Whisper placement='top' trigger='hover' speaker={<Tooltip>Delete</Tooltip>}>
            <IconButton
              appearance='subtle'
              onClick={() => {
                handleAlertOpen()
                let bannerId = [rowData.id]
                setSelectedData(bannerId)
              }}
              icon={<TrashIcon />}
            />
          </Whisper>
        </CheckPermissions>
        <Whisper placement='top' trigger='hover' speaker={<Tooltip>Status</Tooltip>}>
          <Toggle size='sm' checked={rowData.status} onClick={() => handleToggleAction(rowData)} />
        </Whisper>
      </Cell>
    )
  }

  const columns = [
    {
      label: 'S.N.',
      dataKey: 'sn',
      width: 60,
      cell: <Cell dataKey='sn' />,
    },
    {
      label: 'Name',
      flexGrow: 1,
      dataKey: 'title',
      cell: <Cell dataKey='title' />,
      sortable: true,
    },

    {
      label: 'Status',
      dataKey: 'status',
      width: 85,
      cell: (
        <Cell>
          {(rowData) =>
            rowData?.status ? (
              <Tag color='green' size='sm'>
                Active
              </Tag>
            ) : (
              <Tag color='red' size='sm'>
                Inactive
              </Tag>
            )
          }
        </Cell>
      ),
      sortable: false,
    },

    {
      label: 'Action',
      width: 150,
      align: 'center',
      cell: <ActionCell dataKey='id' />,
    },
  ]

  useEffect(() => {
    if (activateSuccess) {
      toast.success('Text Popup activated successfully')
    }
    if (deactivateSuccess) {
      toast.success('Text Popup deactivated successfully')
    }
    if (singleActivateSuccess) {
      toast.success(' Text Popup activated successfully')
    }
    if (singleDeactivateSuccess) {
      toast.success(' Text Popup deactivated successfully')
    }
    if (deleteSuccess) {
      toast.success('Text Popup deleted successfully')
    }
    handleCheck([])
    dispatch(textPopupRedux?.actions.getTextPopup(params))
  }, [
    activateSuccess,
    deactivateSuccess,
    deleteSuccess,
    singleActivateSuccess,
    singleDeactivateSuccess,
  ])

  const handleCheck = (data: any) => {
    setSelectedData(data)
  }

  const activateSelectedData = () => {
    if (!isEmpty(selectedData)) {
      const formData = selectedData.map((d: string) => ({
        id: d,
      }))
      dispatch(textPopupRedux.actions.activateTextPopup(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const deactivateSelectedData = () => {
    if (!isEmpty(selectedData)) {
      const formData = selectedData.map((d: string) => ({
        id: d,
      }))
      dispatch(textPopupRedux.actions.deactivateTextPopup(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  useEffect(() => {
    dispatch(textPopupRedux.actions.getTextPopup(params))
  }, [params])

  //Get data from api to map in datatable
  const data = textPopupData?.data?.textPopup
    ? textPopupData?.data?.textPopup?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        title: item?.title,
        titleNp: item?.titleNp,
        url: item?.url,
        publishDate: item?.publishDate ? moment(item?.publishDate).toDate() : null,
        publishTime: item?.publishTime
          ? moment(`${getTodayDate()} ${item?.publishTime}`).toDate()
          : null,
        expiryDate: item?.expiryDate ? moment(item?.expiryDate).toDate() : null,
        expiryTime: item?.expiryTime
          ? moment(`${getTodayDate()} ${item?.expiryTime}`).toDate()
          : null,
        status: item?.status,
      }))
    : []

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen1(true)
    setActionType('Add')
  }

  const handleDelete = () => {
    let textPopupSelectedId = selectedData?.map((value) => ({id: value}))
    dispatch(textPopupRedux?.actions.deleteTextPopup(textPopupSelectedId))
    handleAlertClose()
  }
  const handleRefresh = () => {
    dispatch(textPopupRedux?.actions.getTextPopup(params))
  }

  const handleSubmitSort = (data: Array<ItemType>) => {
    let body = {
      textPopupLists: data?.map((item) => ({id: item?.keyId})),
    }
    dispatch(textPopupRedux.actions.sortTextPopup(body))
  }
  useEffect(() => {
    if (!isEmpty(sortTextPopupData) && success) {
      toast.success('Text Popup sorted successfully')
      dispatch(textPopupRedux.actions.sortTextPopupReset())
      dispatch(textPopupRedux.actions.getTextPopup(params))
      setOpenSortModal(false)
    }
  }, [sortTextPopupData, success])

  const handleGetAllData = () => {
    dispatch(textPopupRedux.actions.getTextPopup())
  }
  return (
    <div>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Text Popup Manager'
          params={params}
          setParams={setParams}
          handleAddModal={handleAddModal}
          handleRefresh={handleRefresh}
          handleAlertOpen={handleAlertOpen}
          exportShow={false}
          importShow={false}
          enableMultiple={activateSelectedData}
          disableMultiple={deactivateSelectedData}
          sortShow={true}
          handleGetAllData={handleGetAllData}
          data={textPopupData?.data.textPopup}
          sortButtonName='Sort'
          handleSubmitSort={handleSubmitSort}
          openSortModal={openSortModal}
          setOpenSortModal={setOpenSortModal}
          loading={textPopupData?.loading}
        />

        <div className='datatable'>
          <RSuiteTable
            showCheckbox={true}
            columns={columns}
            data={data}
            checkedValues={selectedData}
            showLoading={textPopupData?.loading}
            onChecked={handleCheck}
            handleSort={handleSort}
          />
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size='sm'
            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
            total={textPopupData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
        </div>

        {open1 && (
          <AddTextPopup
            open={open1}
            handleClose={handleClose1}
            actionType={actionType}
            editSelectedData={editSelectedData}
          />
        )}
        {alertOpen &&
          (!isEmpty(selectedData) ? (
            <DeleteModal
              handleClick={() => handleDelete()}
              isOpen={alertOpen}
              handleClose={() => handleAlertClose()}
            />
          ) : (
            toast.error('No data selected') && setAlertOpen(false)
          ))}
      </div>
    </div>
  )
}
export default TextPopup
