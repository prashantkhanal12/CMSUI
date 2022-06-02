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

//Manual import
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import * as roadBlockPopupRedux from 'src/app/modules/cms/components/roadblockPopup/redux'
import {RoadBlockPopupModel} from '../Model'
import AddRoadBlockPopup from './AddRoadblock'
import {IRoadBlockPopupState} from 'src/app/modules/cms/components/roadblockPopup/redux'
import {getTodayDate} from 'src/cms/helpers/AssetHelpers'
import {isEmpty} from 'lodash'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const Cell = Table.Cell
const RoadBlockPopup = () => {
  const dispatch = useDispatch()
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
    //orderBy: 'order',
  })

  const [actionType, setActionType] = useState('Add')
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)
  const [open1, setOpen1] = useState(false)
  const [editSelectedData, setEditCheckedData] = useState<RoadBlockPopupModel | EmptyObject>({})
  const [selectedData, setSelectedData] = useState<Array<string>>([])
  const [openSortModal, setOpenSortModal] = useState(false)

  const handleClose1 = () => setOpen1(false)

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }

  const roadBlockPopupData: IRoadBlockPopupState = useSelector((state: any) => state.roadBlockPopup)
  const {
    toggleLoading,
    activateSuccess,
    deactivateSuccess,
    singleActivateSuccess,
    singleDeactivateSuccess,
    deleteSuccess,
    success,
    sortRoadBlockData,
  } = roadBlockPopupData
  useEffect(() => {
    dispatch(roadBlockPopupRedux?.actions.getRoadBlockPopup(params))
  }, [params])

  const handleToggleAction = (data: {[key: string]: string}) => {
    data?.status
      ? dispatch(roadBlockPopupRedux.actions.singleDeactivateRoadBlockPopup({id: data.id}))
      : dispatch(roadBlockPopupRedux.actions.singleActivateRoadBlockPopup({id: data.id}))
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
                let roadPopupId = [rowData.id]
                setSelectedData(roadPopupId)
              }}
              icon={<TrashIcon />}
            />
          </Whisper>
        </CheckPermissions>
        <Whisper placement='top' trigger='hover' speaker={<Tooltip>Status</Tooltip>}>
          <Toggle
            size='sm'
            checked={rowData.status}
            disabled={toggleLoading}
            onClick={() => handleToggleAction(rowData)}
          />
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
      toast.success('Road Block Popup activated successfully')
    }
    if (deactivateSuccess) {
      toast.success('Road Block Popup deactivated successfully')
    }
    if (singleActivateSuccess) {
      toast.success('Single Road Block Popup Activated successfully')
    }
    if (singleDeactivateSuccess) {
      toast.success('Single Road Block Popup deactivated successfully')
    }
    if (deleteSuccess) {
      toast.success('Road Block Popup deleted successfully')
    }
    handleCheck([])
    dispatch(roadBlockPopupRedux?.actions.getRoadBlockPopup(params))
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
      dispatch(roadBlockPopupRedux.actions.activateRoadBlockPopup(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const deactivateSelectedData = () => {
    if (!isEmpty(selectedData)) {
      const formData = selectedData.map((d: string) => ({
        id: d,
      }))
      dispatch(roadBlockPopupRedux.actions.deactivateRoadBlockPopup(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  //Get data to update
  const data = roadBlockPopupData?.data?.popup
    ? roadBlockPopupData?.data?.popup?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        title: item?.title,
        titleNp: item?.titleNp,
        description: item?.description,
        descriptionNp: item?.descriptionNp,
        startDate: moment(item?.startDate).toDate(),
        startTime: item?.startTime ? moment(`${getTodayDate()} ${item?.startTime}`).toDate() : null,
        endDate: moment(item?.endDate).toDate(),
        endTime: item?.endTime ? moment(`${getTodayDate()} ${item?.endTime}`).toDate() : null,
        status: item?.status,
      }))
    : []

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen1(true)
    setActionType('Add')
  }

  const handleDelete = () => {
    let roadBlockPopupSelectedId = selectedData?.map((value) => ({id: value}))
    dispatch(roadBlockPopupRedux?.actions.deleteRoadBlockPopup(roadBlockPopupSelectedId))
    handleAlertClose()
  }
  const handleGetAllData = () => {
    dispatch(roadBlockPopupRedux.actions.getRoadBlockPopup())
  }

  const handleRefresh = () => {
    dispatch(roadBlockPopupRedux?.actions.getRoadBlockPopup(params))
  }

  const handleSubmitSort = (data: Array<ItemType>) => {
    let body = {
      roadBlockPopupLists: data?.map((item) => ({id: item?.keyId})),
    }
    dispatch(roadBlockPopupRedux.actions.sortRoadBlock(body))
  }
  useEffect(() => {
    if (!isEmpty(sortRoadBlockData) && success) {
      toast.success('Road Block Popup sorted successfully')
      dispatch(roadBlockPopupRedux.actions.sortRoadBlockReset())
      dispatch(roadBlockPopupRedux.actions.getRoadBlockPopup(params))
      setOpenSortModal(false)
    }
  }, [sortRoadBlockData, success])

  return (
    <div>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Road Block Popup Manager'
          params={params}
          setParams={setParams}
          handleAddModal={handleAddModal}
          handleRefresh={handleRefresh}
          handleAlertOpen={handleAlertOpen}
          exportShow={false}
          importShow={false}
          data={roadBlockPopupData?.data.popup}
          enableMultiple={activateSelectedData}
          disableMultiple={deactivateSelectedData}
          sortShow={true}
          handleGetAllData={handleGetAllData}
          sortButtonName='Sort'
          handleSubmitSort={handleSubmitSort}
          openSortModal={openSortModal}
          setOpenSortModal={setOpenSortModal}
          loading={roadBlockPopupData?.loading}
        />

        <div className='datatable'>
          <RSuiteTable
            showCheckbox={true}
            columns={columns}
            data={data}
            checkedValues={selectedData}
            showLoading={roadBlockPopupData?.loading}
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
            total={roadBlockPopupData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
        </div>

        {open1 && (
          <AddRoadBlockPopup
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
export default RoadBlockPopup
