import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import Tag from 'rsuite/Tag'

// includes
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import {SortType} from 'rsuite-table/lib/@types/common'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import {toast} from 'react-toastify'
import {isEmpty} from 'lodash'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import DesignComponent from 'src/app/modules/common/components/designComponent'
import * as serviceTagRedux from '../../serviceTag/redux'
import {IServiceTagState} from '../../serviceTag/redux'
import AddServiceTag from './AddServiceTag'

const ServiceTag = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const {
    loading,
    singleEnableSuccess,
    singleDisableSuccess,
    enableSuccess,
    disableSuccess,
    toggleLoading,
    success,
    deleteSuccess,
  } = useSelector((state: any) => state.serviceTag)
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })
  const [checkedValues, setCheckedValues] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<any>()

  // alert modal
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }

  const serviceTagData: IServiceTagState = useSelector((state: any) => state.serviceTag)
  useEffect(() => {
    dispatch(serviceTagRedux.actions.getServiceTag(params))
  }, [params])

  const enableServiceTagData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(serviceTagRedux.actions.enableServiceTag(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const disableServiceTagData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(serviceTagRedux.actions.disableServiceTag(formData))
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
                let serviceId = [rowData.id]
                setCheckedValues(serviceId)
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
      ? dispatch(serviceTagRedux.actions.singleDisableServiceTag({id: data.id}))
      : dispatch(serviceTagRedux.actions.singleEnableServiceTag({id: data.id}))
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
    /* {
      label: 'Category Name',
      dataKey: 'serviceCategory',
      flexGrow: 1,
      cell: <Cell>{(rowData) => rowData.serviceCategory.name}</Cell>,
      sortable: true,
    }, */

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

  const handleChecked = (values: Array<string>) => {
    setCheckedValues(values)
  }

  useEffect(() => {
    if (deleteSuccess) {
      toast.success('Service Tag deleted successfully')
    }
    if (enableSuccess) {
      toast.success('Service Tag enabled successfully')
    }
    if (disableSuccess) {
      toast.success('Service Tag disabled successfully')
    }
    handleChecked([])
    dispatch(serviceTagRedux?.actions.getServiceTag(params))
  }, [deleteSuccess, success, enableSuccess, disableSuccess])

  useEffect(() => {
    if (singleEnableSuccess) {
      toast.success('Service Tag enabled successfully')
    }
    if (singleDisableSuccess) {
      toast.success('Service Tag disabled successfully')
    }
    handleChecked([])
  }, [singleDisableSuccess, singleEnableSuccess])

  const data = serviceTagData?.data?.serviceTag
    ? serviceTagData?.data?.serviceTag?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item.id,
        name: item.name,
        name_np: item.name_np,
        serviceCategory: item.serviceCategory,
        serviceCategoryId: item.serviceCategory.id,
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
    let serviceId = checkedValues?.map((value) => ({id: value}))
    dispatch(serviceTagRedux?.actions.deleteServiceTag(serviceId))
    handleAlertClose()
  }

  const handleRefresh = () => {
    dispatch(serviceTagRedux?.actions.getServiceTag(params))
  }

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Service Tag'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          exportShow={false}
          importShow={false}
          enableMultiple={enableServiceTagData}
          disableMultiple={disableServiceTagData}
        />

        <div className='datatable'>
          <RSuiteTable
            onChecked={handleChecked}
            showCheckbox={true}
            columns={columns}
            data={data}
            showLoading={serviceTagData?.loading}
            checkedValues={checkedValues}
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
            total={serviceTagData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
          {open && (
            <AddServiceTag
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
export default ServiceTag
