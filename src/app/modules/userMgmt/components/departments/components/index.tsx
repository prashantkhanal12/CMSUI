import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'
import Tag from 'rsuite/Tag'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'

// includes
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {toast} from 'react-toastify'
import {DepartmentModel} from '../Model'
import AddDepartment from './AddDepartment'
import * as departments from '../index'
import {StateParamsModel} from 'src/app/modules/common/Model'
import {SortType} from 'rsuite-table/lib/@types/common'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import {IDepartmentState} from '../../departments/redux/reducer'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import {isEmpty} from 'lodash'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const Departments = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })
  const [checkedValues, setCheckedValues] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<DepartmentModel>()

  const [selectedData, setSelectedData] = useState<Array<string>>([])
  // alert modal
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)
  const departmentData: IDepartmentState = useSelector((state: any) => state.departments)
  const {
    activateSuccess,
    deactivateSuccess,
    singleActivateSuccess,
    singleDeactivateSuccess,
    deleteSuccess,
  }: any = departmentData
  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }
  const handleToggleAction = (data: {[key: string]: string}) => {
    const body = {id: data.id}
    data?.status
      ? dispatch(departments.actions.singleDeactivateBranchlessBanking(body))
      : dispatch(departments.actions.singleActivateBranchlessBanking(body))
  }

  useEffect(() => {
    dispatch(departments.actions.getDepartment(params))
  }, [params])
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
                let keySettingId = [rowData.id]
                setCheckedValues(keySettingId)
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
      label: 'Description',
      dataKey: 'description',
      flexGrow: 1,
      cell: <Cell>{(rowData) => (rowData?.description ? rowData?.description : '-')}</Cell>,
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
    if (departmentData?.deleteSuccess) {
      toast.success('Department deleted successfully')
      dispatch(departments?.actions.getDepartment(params))
    }
  }, [departmentData])

  // active/deactive section

  useEffect(() => {
    if (singleActivateSuccess) {
      toast.success('Department activated successfully')
    }
    if (singleDeactivateSuccess) {
      toast.success('Department deactivated successfully')
    }
    handleCheck([])
  }, [singleActivateSuccess, singleDeactivateSuccess])

  useEffect(() => {
    if (activateSuccess) {
      toast.success('Department activated successfully')
    }
    if (deactivateSuccess) {
      toast.success('Department deactivated successfully')
    }

    handleChecked([])
    dispatch(departments.actions.getDepartment(params))
  }, [activateSuccess, deactivateSuccess])

  const data = departmentData?.data?.department
    ? departmentData?.data?.department?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        name: item?.name,
        nameNp: item?.nameNp,
        description: item?.description,
        descriptionNp: item?.descriptionNp,
        status: item?.status,
      }))
    : []

  const handleCheck = (data: any) => {
    setSelectedData(data)
  }

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  const handleChecked = (values: any) => {
    setCheckedValues(values)
  }

  const modalSubmit = () => {
    let departmentId = checkedValues?.map((value) => ({id: value}))
    dispatch(departments?.actions?.deleteDepartment(departmentId))
    handleAlertClose()
  }

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen(true)
    setActionType('Add')
  }

  const handleRefresh = () => {
    dispatch(departments.actions.getDepartment(params))
  }

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Departments'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          exportShow={false}
          importShow={false}
          toggleMultipleShow={false}
        />

        <div className='datatable'>
          <RSuiteTable
            onChecked={handleChecked}
            showCheckbox={true}
            columns={columns}
            data={data}
            showLoading={departmentData?.loading}
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
            className='mt-5'
            size='sm'
            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
            total={departmentData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />

          <AddDepartment
            open={open}
            params={params}
            handleClose={handleClose}
            actionType={actionType}
            editSelectedData={editSelectedData}
          />
        </div>
        {alertOpen &&
          (!isEmpty(checkedValues) ? (
            <DeleteModal
              handleClick={() => modalSubmit()}
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

export default Departments
