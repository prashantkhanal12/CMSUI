import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import Tag from 'rsuite/Tag'

// includes
import * as formDownloadRedux from '../index'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import {SortType} from 'rsuite-table/lib/@types/common'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import AddFormsAndDownload from './AddFormsAndDownload'
import {toast} from 'react-toastify'
import {isEmpty} from 'lodash'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const FormDownloadComponent = () => {
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
    formDownloadList,
    sortFormDownloadData,
  } = useSelector((state: any) => state.formsAndDownload)
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

  const enableFormsDownloadData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(formDownloadRedux.actions.enableFormsDownload(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const disableFormsDownloadData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(formDownloadRedux.actions.disableFormsDownload(formData))
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
      ? dispatch(formDownloadRedux.actions.singleDisableFormsDownload({id: data.id}))
      : dispatch(formDownloadRedux.actions.singleEnableFormsDownload({id: data.id}))
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
      label: 'Title',
      dataKey: 'title',
      flexGrow: 1,
      cell: <Cell dataKey='title' />,
      sortable: true,
    },
    {
      label: 'Slug',
      dataKey: 'slug',
      flexGrow: 1,
      cell: <Cell dataKey='slug' />,
      sortable: true,
    },
    {
      label: 'File Name',
      dataKey: 'attached_file',
      flexGrow: 1,
      cell: <Cell dataKey='attached_file_title' />,
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
    dispatch(formDownloadRedux.actions.getFormsDownload(params))
  }, [params])

  const handleChecked = (values: Array<string>) => {
    setCheckedValues(values)
  }

  useEffect(() => {
    if (deleteSuccess) {
      toast.success('Form deleted successfully')
    }
    if (enableSuccess) {
      toast.success('Form enabled successfully')
    }
    if (disableSuccess) {
      toast.success('Form disabled successfully')
    }
    handleChecked([])
    dispatch(formDownloadRedux?.actions.getFormsDownload(params))
  }, [deleteSuccess, success, enableSuccess, disableSuccess])

  useEffect(() => {
    if (singleEnableSuccess) {
      toast.success('Form enabled successfully')
    }
    if (singleDisableSuccess) {
      toast.success('Form disabled successfully')
    }
    handleChecked([])
  }, [singleDisableSuccess, singleEnableSuccess])

  const formsDownloadData = data?.download
    ? data?.download?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item.id,
        title: item.title,
        title_np: item.title_np,
        order: item.order,
        slug: item.slug,
        status: item.status,
        attached_file_title: item.attached_file_title,
        attached_file: item.attached_file,
        image: item.image,
        published_date: item.published_date
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
    let formsDownloadId = checkedValues?.map((value) => ({id: value}))
    dispatch(formDownloadRedux?.actions?.deleteFormsDownload(formsDownloadId))
    handleAlertClose()
  }

  const handleRefresh = () => {
    dispatch(formDownloadRedux.actions.getFormsDownload(params))
  }

  const handleGetAllData = () => {
    setParams({...params, limit: data?.meta?.total})
    dispatch(formDownloadRedux.actions.getFormsDownload(params))
  }

  const handleSubmitSort = (data: Array<ItemType>) => {
    let body = {
      downloadId: data?.map((item) => ({id: item?.keyId})),
    }
    dispatch(formDownloadRedux.actions.sortFormsDownload(body))
  }

  useEffect(() => {
    if (!isEmpty(sortFormDownloadData) && success) {
      toast.success('Form sorted successfully')
      // dispatch(formDownloadRedux.actions.sortFormsDownload())
      setParams({...params, limit: 10})
      dispatch(formDownloadRedux.actions.getFormsDownload(params))
      setOpenSortModal(false)
    }
  }, [sortFormDownloadData, success])

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Forms & Downloads'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          exportShow={false}
          importShow={false}
          enableMultiple={enableFormsDownloadData}
          disableMultiple={disableFormsDownloadData}
          data={formsDownloadData}
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
            data={formsDownloadData}
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
            <AddFormsAndDownload
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

export default FormDownloadComponent
