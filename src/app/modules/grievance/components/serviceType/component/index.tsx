import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'
import Tag from 'rsuite/Tag'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'

// includes
import * as serviceType from '../index'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {StateParamsModel} from 'src/app/modules/common/Model'
import {SortType} from 'rsuite-table/lib/@types/common'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import {toast} from 'react-toastify'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import AddServiceType from './AddServiceType'
import {isEmpty} from 'lodash'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const ServiceTypeComponent = () => {
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
  } = useSelector((state: any) => state.serviceType)
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

  const enableServiceTypeData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(serviceType.actions.enableServiceType(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const disableServiceTypeData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(serviceType.actions.disableServiceType(formData))
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
      ? dispatch(serviceType.actions.singleDisableServiceType({id: data.id}))
      : dispatch(serviceType.actions.singleEnableServiceType({id: data.id}))
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
      label: 'Service Code ID',
      dataKey: 'serviceCodeId',
      flexGrow: 1,
      cell: <Cell dataKey='serviceCodeId' />,
      sortable: false,
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
    dispatch(serviceType.actions.getServiceType(params))
  }, [params])

  const handleChecked = (values: Array<string>) => {
    setCheckedValues(values)
  }

  useEffect(() => {
    if (deleteSuccess) {
      toast.success('Service Type deleted successfully')
    }
    if (enableSuccess) {
      toast.success('Service Type enabled successfully')
    }
    if (disableSuccess) {
      toast.success('Service Type disabled successfully')
    }
    handleChecked([])
    dispatch(serviceType?.actions.getServiceType(params))
  }, [deleteSuccess, success, enableSuccess, disableSuccess])

  useEffect(() => {
    if (singleEnableSuccess) {
      toast.success('Service Type enabled successfully')
    }
    if (singleDisableSuccess) {
      toast.success('Service Type disabled successfully')
    }
    handleChecked([])
  }, [singleDisableSuccess, singleEnableSuccess])

  const serviceTypeData = data?.grievanceServiceType
    ? data?.grievanceServiceType?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        note: item.note,
        noteNp: item.noteNp,
        id: item.id,
        name: item.name,
        nameNp: item.nameNp,
        receiverEmail: item.receiverEmails,
        serviceCodeId: item.serviceCodeId,
        serviceCategoryId: item.serviceCategory,
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
    let serviceTypeId = checkedValues?.map((value) => ({id: value}))
    dispatch(serviceType?.actions?.deleteServiceType(serviceTypeId))
    handleAlertClose()
  }

  const handleRefresh = () => {
    dispatch(serviceType.actions.getServiceType(params))
  }

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Service Type'
          params={params}
          setParams={setParams}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          handleRefresh={handleRefresh}
          exportShow={false}
          importShow={false}
          enableMultiple={enableServiceTypeData}
          disableMultiple={disableServiceTypeData}
        />

        <div className='datatable'>
          <RSuiteTable
            onChecked={handleChecked}
            showCheckbox={true}
            columns={columns}
            data={serviceTypeData}
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
            <AddServiceType
              open={open}
              params={params}
              setParams={setParams}
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

export default ServiceTypeComponent
