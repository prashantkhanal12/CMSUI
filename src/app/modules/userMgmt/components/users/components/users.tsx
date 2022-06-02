import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as user from 'src/app/modules/userMgmt'
import Table from 'rsuite/Table'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import Pagination from 'rsuite/Pagination'
import Edit2 from '@rsuite/icons/Edit'
import {UserModel} from 'src/app/modules/auth/models/UserModel'
import {EmptyObject} from 'chart.js/types/basic'
import IconButton from 'rsuite/IconButton'
import Tag from 'rsuite/Tag'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import TrashIcon from '@rsuite/icons/Trash'
import AddUser from './Adduser'
import {toast} from 'react-toastify'
import {IUserState} from '..'
import {StateParamsModel} from 'src/app/modules/common/Model'
import {SortType} from 'rsuite-table/lib/@types/common'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import {isEmpty} from 'lodash'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const Cell = Table.Cell

const UserManagementIndex = () => {
  const dispatch = useDispatch()
  const userList: IUserState = useSelector((state: any) => state.userManagement)
  const {
    activateSuccess,
    deactivateSuccess,
    singleActivateSuccess,
    singleDeactivateSuccess,
    deleteSuccess,
  } = userList
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const [editSelectedData, setEditCheckedData] = useState<UserModel | EmptyObject>({})
  const [selectedData, setSelectedData] = useState<Array<string>>([])
  // alert modal
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

  const handleToggleAction = (data: {[key: string]: string}) => {
    data?.status
      ? dispatch(user.actions.singleDeactivateUser(data.id))
      : dispatch(user.actions.singleActivateUser(data.id))
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
                setSelectedData(keySettingId)
              }}
              icon={<TrashIcon />}
            />
          </Whisper>
        </CheckPermissions>
        <CheckPermissions type='Edit'>
          <Whisper placement='top' trigger='hover' speaker={<Tooltip>Status</Tooltip>}>
            <Toggle
              size='sm'
              checked={rowData.status}
              onClick={() => handleToggleAction(rowData)}
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
      width: 80,
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
      label: 'Username',
      dataKey: 'userName',
      flexGrow: 1,
      cell: <Cell dataKey='userName' />,
      sortable: true,
    },
    {
      label: 'Email',
      dataKey: 'email',
      flexGrow: 1,
      cell: <Cell dataKey='email' />,
      sortable: true,
    },
    {
      label: 'Mobile Number',
      dataKey: 'mobile_number',
      flexGrow: 1,
      cell: <Cell dataKey='mobile_number' />,
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
      width: 120,
      align: 'center',
      cell: <ActionCell dataKey='id' />,
    },
  ]

  const handleClose = () => setOpen(false)

  useEffect(() => {
    dispatch(user.actions.getUsers(params))
  }, [params])

  const data = userList?.data?.user
    ? userList?.data?.user?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        name: item?.name,
        userName: item?.userName,
        email: item?.email,
        mobile_number: item?.mobile_number,
        status: item?.status,
      }))
    : []

  useEffect(() => {
    if (singleActivateSuccess) {
      toast.success('User activated successfully')
    }
    if (singleDeactivateSuccess) {
      toast.success('User deactivated successfully')
    }
    handleCheck([])
  }, [singleActivateSuccess, singleDeactivateSuccess])

  useEffect(() => {
    if (activateSuccess) {
      toast.success('User activated successfully')
    }
    if (deactivateSuccess) {
      toast.success('User deactivated successfully')
    }
    if (deleteSuccess) {
      toast.success('User deleted successfully')
    }
    handleCheck([])
    dispatch(user?.actions.getUsers(params))
  }, [activateSuccess, deactivateSuccess, deleteSuccess])

  const handleCheck = (data: any) => {
    setSelectedData(data)
  }

  const activateSelectedData = () => {
    if (!isEmpty(selectedData)) {
      const formData = selectedData.map((d: string) => ({
        id: d,
      }))
      dispatch(user.actions.activateUsers(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const deactivateSelectedData = () => {
    if (!isEmpty(selectedData)) {
      const formData = selectedData.map((d: string) => ({
        id: d,
      }))
      dispatch(user.actions.deactivateUsers(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen(true)
    setActionType('Add')
  }

  const handleDelete = () => {
    let userSelectedId = selectedData?.map((value) => ({id: value}))
    dispatch(user?.actions?.deleteUsers(userSelectedId))
    handleAlertClose()
  }

  const handleRefresh = () => {
    dispatch(user.actions.getUsers(params))
  }

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='User Management'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          exportShow={false}
          importShow={false}
          enableMultiple={activateSelectedData}
          disableMultiple={deactivateSelectedData}
        />

        <div className='datatable'>
          <RSuiteTable
            showCheckbox={true}
            onChecked={handleCheck}
            columns={columns}
            data={data}
            checkedValues={selectedData}
            showLoading={userList?.loading}
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
            total={userList?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />

          {open && (
            <AddUser
              open={open}
              params={params}
              handleClose={handleClose}
              actionType={actionType}
              editSelectedData={editSelectedData}
            />
          )}
        </div>

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
    </>
  )
}
export default UserManagementIndex
