import {useEffect, useState} from 'react'
import Table from 'rsuite/Table'
import Whisper from 'rsuite/Whisper'
import Tooltip from 'rsuite/Tooltip'
import Edit2 from '@rsuite/icons/Edit'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import {useDispatch, useSelector} from 'react-redux'
import {SortType} from 'rsuite-table/lib/@types/common'
import {isEmpty} from 'lodash'
import {toast} from 'react-toastify'
import Toggle from 'rsuite/Toggle'

// includes
import * as moduleReducer from '../index'
import {IModuleModel, ToogleStatusType} from '../Model'
import AddModules from './AddModules'
import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import DesignComponent from 'src/app/modules/common/components/designComponent'
import {IModuleState} from '../index'
import * as social from 'src/app/modules/siteSettings/components/moduleManager'
import Tag from 'rsuite/esm/Tag'

const Cell = Table.Cell

const ModuleManager = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const moduleData = useSelector((state: any) => state.module)
  const {social_integration, navigation_status, enableDisableStatusData}: IModuleState =
    useSelector((state: any) => state.module)
  const [editSelectedData, setEditCheckedData] = useState<IModuleModel | {}>()

  const [openSortModal, setOpenSortModal] = useState(false)

  const {toggleNavData, sortModuleManagerData, success, loading}: IModuleState = moduleData

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

  const data = moduleData?.data?.module
    ? moduleData.data.module.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        name: item?.name,
        navigationVisibility: item?.navigationVisibility,
        socialIntegration: item?.socialIntegration,
        alias: item?.alias,
        iconClass: item?.iconClass,
        parent: item?.parentId,
        status: item?.status,
        allowInRoute: item?.allow_in_route,
      }))
    : []

  useEffect(() => {
    dispatch(moduleReducer.moduleActions.getModule(params))
  }, [params])

  useEffect(() => {
    dispatch(social.actions.getSocialIntegration())
    dispatch(social.nav_visiblity.getNavVisibility())
    dispatch(moduleReducer.moduleActions.getAllModule())
  }, [])

  useEffect(() => {
    if (!isEmpty(toggleNavData) && success) {
      dispatch(moduleReducer.moduleActions.toggleNaviationStatusModuleReset())
      dispatch(moduleReducer.moduleActions.toggleSocialIntStatusModuleReset())
      dispatch(moduleReducer.moduleActions.getModule(params))
      setTimeout(() => {
        toast.success('Status changed successfully')
      }, 1000)
    }
  }, [toggleNavData, success])

  useEffect(() => {
    if (!isEmpty(enableDisableStatusData) && success) {
      dispatch(moduleReducer.moduleActions.enableModuleStatusReset())
      dispatch(moduleReducer.moduleActions.disableModuleStatusReset())
      dispatch(moduleReducer.moduleActions.getModule(params))
      setTimeout(() => {
        toast.success('Status changed successfully')
      }, 1000)
    }
  }, [enableDisableStatusData, success])

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
        <CheckPermissions type='Edit'>
          <Toggle
            size='sm'
            checked={rowData?.status}
            onClick={() => handleToggleEnableDisableAction(rowData)}
          />
        </CheckPermissions>
      </Cell>
    )
  }

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
      label: 'Route',
      dataKey: 'alias',
      flexGrow: 1,
      cell: <Cell dataKey='alias' />,
    },
    {
      label: 'Navigation',
      dataKey: 'navigationVisibility',
      width: 85,
      cell: (
        <Cell>
          {(rowData: IModuleModel) => (
            <CheckPermissions type='Edit'>
              <Whisper placement='top' trigger='hover' speaker={<Tooltip>Status</Tooltip>}>
                <Toggle
                  size='sm'
                  checked={rowData.navigationVisibility?.system_name === 'inactive' ? false : true}
                  onClick={() => handleToggleNavigationAction(rowData)}
                />
              </Whisper>
            </CheckPermissions>
          )}
        </Cell>
      ),
    },
    {
      label: 'Social Integration',
      dataKey: 'socialIntegration',
      width: 105,
      cell: (
        <Cell>
          {(rowData: IModuleModel) => (
            <CheckPermissions type='Edit'>
              <Toggle
                size='sm'
                checked={rowData.socialIntegration?.system_name === 'inactive' ? false : true}
                onClick={() => handleToggleAction(rowData)}
              />
            </CheckPermissions>
          )}
        </Cell>
      ),
    },
    {
      label: 'Parent Name',
      dataKey: 'parentId',
      flexGrow: 1,
      cell: (
        <Cell>{(rowData: IModuleModel) => (rowData?.parent ? rowData?.parent?.name : '-')}</Cell>
      ),
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

  const handleToggleNavigationAction = (data: IModuleModel) => {
    let statusId = !isEmpty(navigation_status)
      ? navigation_status?.find((obj) => obj.id !== data?.navigationVisibility?.id)?.id
      : data?.navigationVisibility?.id
    let body = {
      statusId,
      moduleId: [
        {
          id: data.id,
        },
      ],
    }
    dispatch(moduleReducer.moduleActions.toggleNaviationStatusModule(body))
  }

  const handleToggleAction = (data: IModuleModel) => {
    let statusId = !isEmpty(social_integration)
      ? social_integration?.find((obj) => obj.id !== data?.socialIntegration?.id)?.id
      : data?.socialIntegration?.id
    let body = {
      statusId,
      moduleId: [
        {
          id: data.id,
        },
      ],
    }
    dispatch(moduleReducer.moduleActions.toggleSocialIntStatusModule(body))
  }

  const handleToggleEnableDisableAction = (data: IModuleModel) => {
    let body = {
      moduleId: [
        {
          id: data.id,
        },
      ],
    }
    data?.status
      ? dispatch(moduleReducer.moduleActions.disableModuleStatus(body))
      : dispatch(moduleReducer.moduleActions.enableModuleStatus(body))
  }

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen(true)
    setActionType('Add')
  }

  const handleRefresh = () => {
    dispatch(moduleReducer.moduleActions.getModule(params))
  }

  const handleGetAllData = () => {
    dispatch(moduleReducer.moduleActions.getModule(params))
  }

  const handleSubmitSort = (data: Array<ItemType>) => {
    let body = {
      modules: data?.map((item) => ({id: item?.keyId})),
    }
    dispatch(moduleReducer.moduleActions.sortModuleManager(body))
  }

  useEffect(() => {
    if (!isEmpty(sortModuleManagerData) && success) {
      toast.success('Module sorted successfully')
      dispatch(moduleReducer.moduleActions.sortModuleManagerReset())
      dispatch(moduleReducer.moduleActions.getModule(params))
      setOpenSortModal(false)
    }
  }, [sortModuleManagerData, success])

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Module Settings'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
          deleteShow={false}
          exportShow={false}
          importShow={false}
          toggleMultipleShow={false}
          data={moduleData?.module}
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
            // showCheckbox={true}
            columns={columns}
            data={data}
            height={500}
            // checkedValues={checkedValues}
            showLoading={moduleData?.loading}
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
            total={moduleData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
          {open && (
            <AddModules
              open={open}
              params={params}
              handleClose={handleClose}
              actionType={actionType}
              editSelectedData={editSelectedData}
            />
          )}
        </div>
      </div>
    </>
  )
}
export default ModuleManager
