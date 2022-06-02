import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'
import Tag from 'rsuite/Tag'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'

// includes
import * as documentRedux from '../index'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import {SortType} from 'rsuite-table/lib/@types/common'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import AddDocument from './AddDocument'
import {toast} from 'react-toastify'
import {isEmpty} from 'lodash'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const DocumentManagerComponent = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const {
    data,
    loading,
    singleEnableSuccess,
    singleDisableSuccess,
    enableSuccess,
    disableSuccess,
    toggleLoading,
    success,
    deleteSuccess,
    documentList,
    sortDocumentData,
  } = useSelector((state: any) => state.manageDocument)
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
    orderBy: 'order',
  })
  const [checkedValues, setCheckedValues] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<any>()

  // alert modal
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)
  const [openSortModal, setOpenSortModal] = useState(false)

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }

  const enableDocumentData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(documentRedux.actions.enableDocument(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const disableDocumentData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(documentRedux.actions.disableDocument(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const ActionCell = ({rowData, dataKey, ...props}: any) => {
    function handleAction() {
      alert(`id:${rowData[dataKey]}`)
    }
    return (
      <Cell {...props} className='link-group'>
        <CheckPermissions type='Edit'>
          <Whisper placement='top' trigger='hover' speaker={<Tooltip>Edit</Tooltip>}>
            <IconButton
              appearance='subtle'
              onClick={() => {
                setEditCheckedData(rowData)
                setActionType('Edit')
                setOpen(true)
              }}
              icon={<Edit2 />}
            />
          </Whisper>
        </CheckPermissions>
        <CheckPermissions type='Delete'>
          <Whisper placement='top' trigger='hover' speaker={<Tooltip>Delete</Tooltip>}>
            <IconButton
              appearance='subtle'
              onClick={() => {
                handleAlertOpen()
                let branchId = [rowData.id]
                setCheckedValues(branchId)
              }}
              icon={<TrashIcon />}
            />
          </Whisper>
        </CheckPermissions>
        <Whisper placement='top' trigger='hover' speaker={<Tooltip>Status</Tooltip>}>
          <Toggle
            size='sm'
            disabled={toggleLoading}
            checked={rowData.status}
            onClick={() => handleToggleAction(rowData)}
          />
        </Whisper>
      </Cell>
    )
  }

  const handleToggleAction = (data: {[key: string]: string}) => {
    data?.status
      ? dispatch(documentRedux.actions.singleDisableDocument({id: data.id}))
      : dispatch(documentRedux.actions.singleEnableDocument({id: data.id}))
  }

  const Cell = Table.Cell

  const handleClose = () => setOpen(false)

  const columns = [
    {
      label: 'S.N.',
      dataKey: 'sn',
      width: 60,
      cell: <Cell dataKey='sn' />,
    },
    {
      label: 'Name',
      dataKey: 'name',
      flexGrow: 1,
      cell: <Cell dataKey='name' />,
      sortable: true,
    },
    {
      label: 'Category',
      dataKey: 'documentCategory',
      flexGrow: 1,
      cell: <Cell>{(rowData) => rowData.documentSubCategory.documentCategory.name}</Cell>,
      sortable: false,
    },
    {
      label: 'Sub Category',
      dataKey: 'documentSubCategory',
      flexGrow: 1,
      cell: <Cell>{(rowData) => rowData.documentSubCategory.name}</Cell>,
      sortable: false,
    },
    {
      label: 'Fiscal Year',
      dataKey: 'fiscalYear',
      flexGrow: 1,
      cell: <Cell>{(rowData) => rowData.fiscalYear}</Cell>,
      sortable: false,
    },

    {
      label: 'Order',
      dataKey: 'order',
      width: 85,
      cell: <Cell dataKey='order' />,
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
    dispatch(documentRedux.actions.getDocument(params))
  }, [params])

  const handleChecked = (values: Array<string>) => {
    setCheckedValues(values)
  }

  useEffect(() => {
    if (deleteSuccess) {
      toast.success('Document deleted successfully')
    }
    if (enableSuccess) {
      toast.success('Document enabled successfully')
    }
    if (disableSuccess) {
      toast.success('Document disabled successfully')
    }
    handleChecked([])
    dispatch(documentRedux.actions.getDocument(params))
  }, [deleteSuccess, success, enableSuccess, disableSuccess])

  useEffect(() => {
    if (singleEnableSuccess) {
      toast.success('Document enabled successfully')
    }
    if (singleDisableSuccess) {
      toast.success('Document disabled successfully')
    }
    handleChecked([])
  }, [singleDisableSuccess, singleEnableSuccess])

  const documentData = data?.document
    ? data?.document?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        documentSubCategory: item.documentSubCategory,
        id: item.id,
        file: item.file,
        name: item.name,
        fiscalYear: item.fiscal_year,
        nepaliYear: item.nepali_year,
        nepaliMonth: item.nepali_month,
        name_np: item.name_np,
        order: item.order,
        quaterId: item.quater.id,
        status: item.status,
      }))
    : []

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen(true)
    setActionType('Add')
  }

  const handleDelete = () => {
    let documentId = checkedValues?.map((value) => ({id: value}))
    dispatch(documentRedux?.actions?.deleteDocument(documentId))
    handleAlertClose()
  }
  const handleRefresh = () => {
    dispatch(documentRedux.actions.getDocument(params))
  }

  const handleGetAllData = () => {
    setParams({...params, limit: data?.meta?.total})
    dispatch(documentRedux.actions.getDocument(params))
  }

  const handleSubmitSort = (data: Array<ItemType>) => {
    let body = {
      documentId: data?.map((item) => ({id: item?.keyId})),
    }
    dispatch(documentRedux.actions.sortDocument(body))
  }

  useEffect(() => {
    if (!isEmpty(sortDocumentData) && success) {
      toast.success('Document sorted successfully')
      dispatch(documentRedux.actions.sortDocumentReset())
      setParams({...params, limit: 10})
      dispatch(documentRedux.actions.getDocument(params))
      setOpenSortModal(false)
    }
  }, [sortDocumentData, success])

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Manage Document'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          exportShow={false}
          importShow={false}
          enableMultiple={enableDocumentData}
          disableMultiple={disableDocumentData}
          data={documentData}
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
            onChecked={handleChecked}
            showCheckbox={true}
            columns={columns}
            data={documentData}
            checkedValues={checkedValues}
            showLoading={loading}
            handleSort={handleSort}
          />
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            className='mt-5'
            maxButtons={5}
            size='sm'
            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
            total={data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
          {open && (
            <AddDocument
              open={open}
              params={params}
              handleClose={handleClose}
              actionType={actionType}
              editSelectedData={editSelectedData}
            />
          )}
        </div>

        {/* Delete Modal */}
        {alertOpen &&
          (!isEmpty(checkedValues) ? (
            <DeleteModal
              handleClick={() => handleDelete()}
              isOpen={alertOpen}
              handleClose={() => handleAlertClose()}
            />
          ) : (
            toast.error('No data selected') && setAlertOpen(false)
          ))}
      </div>
    </>
  )
}

export default DocumentManagerComponent
