import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import IconButton from 'rsuite/IconButton'
import Pagination from 'rsuite/Pagination'
import Popover from 'rsuite/Popover'
import Table from 'rsuite/Table'
import * as roleActions from '../index'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import {AiOutlineEdit} from 'react-icons/ai'
import {RoleModel} from '../Model'
import {EmptyObject} from 'chart.js/types/basic'
import AddRole from './AddRole'
import {toast} from 'react-toastify'
import {SortType} from 'rsuite-table/lib/@types/common'
import {StateParamsModel} from 'src/app/modules/common/Model'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import TrashIcon from '@rsuite/icons/Trash'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import {isEmpty} from 'lodash'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const Cell = Table.Cell

const RoleMgmt = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const [checkedValues, setCheckedValues] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<RoleModel | EmptyObject>({})
  const roleData = useSelector((state: any) => state.role)
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)
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

  const data = roleData?.data?.role
    ? roleData?.data?.role?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        name: item?.name,
        permissions: item?.permissions?.map((data: any) => ({
          name: data.name,
          id: data.id,
          description: data.description,
        })),
      }))
    : []

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
      </Cell>
    )
  }

  const NameCell = ({rowData, dataKey, ...props}: any) => {
    const speaker = (
      <Popover title='Permissions'>
        <div>{`${rowData.permissions.map((items: {[key: string]: string}) => items.name)}`}</div>
      </Popover>
    )

    return (
      <Cell {...props}>
        <Whisper placement='top' speaker={speaker}>
          <a>{rowData[dataKey].map((item: any) => item.name + ',' + '   ').splice(0, 5)} ...</a>
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
      dataKey: 'name',
      flexGrow: 1,
      cell: <Cell dataKey='name' />,
      sortable: true,
    },
    {
      label: 'Permissions',
      dataKey: 'permissions',
      width: 650,
      cell: <NameCell dataKey='permissions' />,
      sortable: false,
    },
    {
      label: 'Action',
      width: 150,
      align: 'center',
      cell: <ActionCell dataKey='id' />,
    },
  ]

  const handleClose = () => setOpen(false)

  const handleChecked = (values: Array<string>) => {
    setCheckedValues(values)
  }

  useEffect(() => {
    dispatch(roleActions.actions.getRole(params))
  }, [params])

  useEffect(() => {
    if (roleData?.deleteSuccess) {
      toast.success('Role deleted successfully')
      handleChecked([])
      dispatch(roleActions?.actions.getRole(params))
    }
  }, [roleData])

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen(true)
    setActionType('Add')
  }

  const deleteSubmit = () => {
    let roleId = checkedValues?.map((value) => ({id: value}))
    dispatch(roleActions?.actions?.deleteRole(roleId))
    handleAlertClose()
  }

  const handleRefresh = () => {
    dispatch(roleActions.actions.getRole(params))
  }

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Role Management'
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
            showCheckbox={true}
            columns={columns}
            checkedValues={checkedValues}
            data={data}
            showLoading={roleData?.loading}
            onChecked={handleChecked}
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
            total={roleData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
        </div>

        {open && (
          <AddRole
            open={open}
            params={params}
            handleClose={handleClose}
            actionType={actionType}
            editSelectedData={editSelectedData}
          />
        )}
        {alertOpen &&
          (!isEmpty(checkedValues) ? (
            <DeleteModal
              handleClick={() => deleteSubmit()}
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
export default RoleMgmt
