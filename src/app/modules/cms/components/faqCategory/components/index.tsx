import {FaPlus} from 'react-icons/fa'
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
import {useHistory} from 'react-router-dom'

//Manual import
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import * as faqCategoryRedux from '../../faqCategory/redux'
import {FaqCategoryModel} from '../Model'
import AddFaqCategory from './AddFaqCategory'
import {IFaqCategoryState} from '../redux'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import {isEmpty} from 'lodash'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const Cell = Table.Cell
const FaqCategory = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const [actionType, setActionType] = useState('Add')
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)
  const [openSortModal, setOpenSortModal] = useState(false)

  const [open1, setOpen1] = useState(false)
  const [editSelectedData, setEditCheckedData] = useState<FaqCategoryModel | EmptyObject>({})
  const [selectedData, setSelectedData] = useState<Array<string>>([])

  const handleClose1 = () => setOpen1(false)

  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })
  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }

  const faqCategoryData: IFaqCategoryState = useSelector((state: any) => state.faqCategory)

  useEffect(() => {
    dispatch(faqCategoryRedux.actions.getFaqCategory(params))
  }, [params])
  const {
    success,
    toggleLoading,
    activateSuccess,
    deactivateSuccess,
    singleActivateSuccess,
    singleDeactivateSuccess,
    deleteSuccess,
    loading,
    faqCategoryList,
    sortFaqCategoryData,
  } = faqCategoryData

  const handleToggleAction = (data: {[key: string]: string}) => {
    data?.status
      ? dispatch(faqCategoryRedux.actions.singleDeactivateFaqCategory({id: data.id}))
      : dispatch(faqCategoryRedux.actions.singleActivateFaqCategory({id: data.id}))
  }

  const handleDelete = () => {
    let faqCategorySelectedId = selectedData?.map((value) => ({id: value}))
    dispatch(faqCategoryRedux?.actions.deleteFaqCategory(faqCategorySelectedId))
    handleAlertClose()
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

        <Whisper placement='top' trigger='hover' speaker={<Tooltip>Update faq</Tooltip>}>
          <button
            className='btn btn-primary ms-3'
            style={{padding: '5px 8px', fontSize: '10px'}}
            onClick={() => {
              history.push(`/cms/update-faqs/${rowData.id}`)
            }}
          >
            <FaPlus className='me-2' />
            Update
          </button>
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
      dataKey: 'name',
      cell: <Cell dataKey='name' />,
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
      width: 250,
      align: 'center',
      cell: <ActionCell dataKey='id' />,
    },
  ]

  useEffect(() => {
    if (activateSuccess) {
      toast.success('Faq Category activated successfully')
    }
    if (deactivateSuccess) {
      toast.success('Faq Category deactivated successfully')
    }
    if (singleActivateSuccess) {
      toast.success('Faq Category Activated successfully')
    }
    if (singleDeactivateSuccess) {
      toast.success('Faq Category deactivated successfully')
    }
    if (deleteSuccess) {
      toast.success('Faq Category deleted successfully')
    }
    handleCheck([])
    dispatch(faqCategoryRedux?.actions.getFaqCategory(params))
  }, [
    activateSuccess,
    deactivateSuccess,
    deleteSuccess,
    singleActivateSuccess,
    singleDeactivateSuccess,
    success,
  ])

  const handleCheck = (data: any) => {
    setSelectedData(data)
  }

  const activateSelectedData = () => {
    if (!isEmpty(selectedData)) {
      const formData = selectedData.map((d: string) => ({
        id: d,
      }))
      dispatch(faqCategoryRedux.actions.activateFaqCategory(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const deactivateSelectedData = () => {
    if (!isEmpty(selectedData)) {
      const formData = selectedData.map((d: string) => ({
        id: d,
      }))
      dispatch(faqCategoryRedux.actions.deactivateFaqCategory(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen1(true)
    setActionType('Add')
  }

  //Get data to update
  const data = faqCategoryData?.data?.faqCategory
    ? faqCategoryData?.data?.faqCategory?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        name: item?.name,
        name_np: item?.name_np,
        status: item?.status,
        parentCategoryId: item?.parent?.id,
        iconTypeId: item?.faq_icon_type?.id,
        image: item?.image,
        slug: item?.slug,
        iconType: item?.iconType,
      }))
    : []

  const handleRefresh = () => {
    dispatch(faqCategoryRedux.actions.getFaqCategory(params))
  }
  const handleGetAllData = () => {
    dispatch(faqCategoryRedux.actions.getAllFaqCategory())
  }

  const handleSubmitSort = (data: Array<ItemType>) => {
    let body = {
      faqCategoryId: data?.map((item) => ({id: item?.keyId, parentId: item?.parentId})),
    }
    dispatch(faqCategoryRedux.actions.sortFaqCategory(body))
  }

  useEffect(() => {
    if (!isEmpty(sortFaqCategoryData) && success) {
      toast.success('Faq Category sorted successfully')
      dispatch(faqCategoryRedux.actions.sortFaqCategoryReset())

      dispatch(faqCategoryRedux.actions.getFaqCategory(params))
      setOpenSortModal(false)
    }
  }, [sortFaqCategoryData, success])

  return (
    <div className='shadow p-3 bg-white rounded'>
      <DesignComponent
        moduleName='FAQ Category Manager'
        params={params}
        setParams={setParams}
        handleRefresh={handleRefresh}
        handleAddModal={handleAddModal}
        handleAlertOpen={handleAlertOpen}
        exportShow={false}
        importShow={false}
        enableMultiple={activateSelectedData}
        disableMultiple={deactivateSelectedData}
        data={faqCategoryList?.faqCategory}
        sortShow={true}
        sortButtonName='Sort'
        handleSubmitSort={handleSubmitSort}
        handleGetAllData={handleGetAllData}
        openSortModal={openSortModal}
        setOpenSortModal={setOpenSortModal}
        loading={loading}
      />

      <div className='datatable'>
        <RSuiteTable
          showCheckbox={true}
          columns={columns}
          data={data}
          checkedValues={selectedData}
          showLoading={faqCategoryData?.loading}
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
          layout={['total', '-', 'limit', '|', 'pager']}
          total={faqCategoryData?.data?.meta?.total}
          limitOptions={[10, 20, 50, 100]}
          limit={params?.limit}
          activePage={params?.page}
          onChangePage={(value) => setParams({...params, page: value})}
          onChangeLimit={handleChangeLimit}
        />
      </div>

      {open1 && (
        <AddFaqCategory
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
          ></DeleteModal>
        ) : (
          toast.error('No data selected') && setAlertOpen(false)
        ))}
    </div>
  )
}
export default FaqCategory
