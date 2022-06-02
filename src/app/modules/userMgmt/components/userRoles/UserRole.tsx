import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RoleModel} from '../../Model/index'
import {IUserRoleState} from '../userRoles'
import Table from 'rsuite/Table'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import Pagination from 'rsuite/Pagination'
import {isEmpty} from 'lodash'
import {EmptyObject} from 'chart.js/types/basic'
import AddUserRole from './AddUserRole'
import * as userRoleRedux from './index'
import {AiOutlineEdit} from 'react-icons/ai'
import IconButton from 'rsuite/IconButton'
import {StateParamsModel} from 'src/app/modules/common/Model'
import {SortType} from 'rsuite-table/lib/@types/common'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const RoleManagementIndex = () => {
  const dispatch = useDispatch()
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })
  const [previousData, setPreviousData] = useState<any>([])
  const [checkedValues, setCheckedValues] = useState<Array<string>>([])
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const [editSelectedData, setEditCheckedData] = useState<RoleModel | EmptyObject>({})

  const Cell = Table.Cell
  const userRoleDataRole1: IUserRoleState = useSelector((state: any) => state.userRoles)

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
              icon={<AiOutlineEdit />}
            />
          </Whisper>
        </CheckPermissions>
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
      dataKey: 'name',
      flexGrow: 1,
      cell: <Cell dataKey='name' />,
      sortable: true,
    },
    {
      label: 'Role',
      dataKey: 'role',
      flexGrow: 1,
      cell: <Cell>{(rowData) => rowData?.roles?.map((role: any) => role?.name) + ', '}</Cell>,
      sortable: true,
    },
    {
      label: 'Action',
      width: 300,
      align: 'center',
      cell: <ActionCell dataKey='id' />,
    },
  ]

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }

  const handleCheck = (values: Array<string>) => {
    setCheckedValues(values)
  }

  const handleClose = () => setOpen(false)

  const data = !isEmpty(userRoleDataRole1?.data?.userRole)
    ? userRoleDataRole1?.data?.userRole?.map((userRole1: any, i: number) => {
        return {
          sn: (params?.page - 1) * params?.limit + (i + 1),
          id: userRole1?.id,
          name: userRole1?.name,
          roles: userRole1?.roles,
        }
      })
    : []

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen(true)
    setActionType('Add')
  }

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  useEffect(() => {
    dispatch(userRoleRedux?.actions.getUserRole(params))
  }, [params])

  const handleRefresh = () => {
    dispatch(userRoleRedux?.actions.getUserRole(params))
  }

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='User Role Management'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
          deleteShow={false}
          exportShow={false}
          importShow={false}
          toggleMultipleShow={false}
        />
        <div className='datatable'>
          <RSuiteTable
            showCheckbox={true}
            onChecked={handleCheck}
            columns={columns}
            data={data}
            showLoading={userRoleDataRole1?.loading}
            checkedValues={previousData}
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
            layout={['total', '-', 'limit', '|', 'pager']}
            total={userRoleDataRole1?.data?.meta?.total}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
        </div>
        <AddUserRole
          open={open}
          params={params}
          handleClose={handleClose}
          actionType={actionType}
          editSelectedData={editSelectedData}
        />{' '}
      </div>
    </>
  )
}
export default RoleManagementIndex
