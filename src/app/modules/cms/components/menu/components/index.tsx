import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
// rsuite
import Table from 'rsuite/Table'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import Tag from 'rsuite/Tag'
// icons

// includes
import * as menuRedux from 'src/app/modules/cms'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import {SortType} from 'rsuite-table/lib/@types/common'
import Pagination from 'rsuite/Pagination'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import AddMenuModal from './AddMenuModal'
import {MenuModal} from '../Model/MenuModal'
import {IMenuState} from '../redux/reducer'
import DesignComponent from 'src/app/modules/common/components/designComponent'
import {isEmpty} from 'lodash'
import {toast} from 'react-toastify'
import DeleteModal from 'src/app/modules/common/components/deleteModal'

const MenuManager = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const [checkedValues, setCheckedValues] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<MenuModal>()
  const handleClose = () => setOpen(false)
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
    sortMenuData,
    menuList,
  } = useSelector((state: IMenuState | any) => state.menuManager)
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })

  // alert modal
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)
  const [openSortModal, setOpenSortModal] = useState(false)

  useEffect(() => {
    dispatch(menuRedux.menu.actions.getMenu(params))
  }, [params])

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }

  const enableMenuData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(menuRedux.menu.actions.enableMenu(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const disableMenuData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(menuRedux.menu.actions.disableMenu(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const Cell = Table.Cell

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
                let menuId = [rowData.id]
                setCheckedValues(menuId)
              }}
              icon={<TrashIcon />}
            />
          </Whisper>
        </CheckPermissions>
        <Whisper placement='top' trigger='hover' speaker={<Tooltip>Status</Tooltip>}>
          <Toggle
            size='sm'
            disabled={toggleLoading}
            checked={rowData.statusData?.systemName === 'active' ? true : false}
            onClick={() => handleToggleAction(rowData)}
          />
        </Whisper>
      </Cell>
    )
  }

  const handleToggleAction = (data: any) => {
    data?.statusData?.systemName === 'active'
      ? dispatch(menuRedux.menu.actions.singleDisableMenu({id: data.id}))
      : dispatch(menuRedux.menu.actions.singleEnableMenu({id: data.id}))
  }

  const columns = [
    {
      label: 'S.N.',
      dataKey: 'sn',
      width: 60,
      cell: <Cell dataKey='sn' />,
    },
    {
      label: 'Menu Name',
      dataKey: 'tableViewName',
      flexGrow: 1,
      cell: <Cell dataKey='tableViewName' />,
      sortable: true,
    },
    {
      label: 'Menu Type',
      dataKey: 'menuData',
      flexGrow: 1,
      cell: <Cell>{(rowData) => (rowData.menuData ? rowData.menuData.displayName : '-')}</Cell>,
      sortable: false,
    },
    {
      label: 'Slug',
      dataKey: 'slug',
      flexGrow: 1,
      cell: <Cell dataKey='slug' />,
      sortable: true,
    },
    {
      label: 'Status',
      dataKey: 'status',
      width: 85,
      cell: (
        <Cell>
          {(rowData) =>
            rowData?.statusData?.systemName === 'active' ? (
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

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  const menuData = data?.menu
    ? data?.menu?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        contentData: item.content,
        contentId: item?.content?.id,
        featuredImage: item.featuredImage,
        featuredImageText: item.featuredImageText,
        featuredImageTextNp: item.featuredImageTextNp,
        featuredImageUrl: item.featuredImageUrl,
        file: item.file,
        firstButtonLink: item.firstButtonLink,
        firstButtonText: item.firstButtonText,
        firstButtonTextNp: item.firstButtonTextNp,
        headerImage: item.headerImage,
        metaDescription: item.metaDescription,
        headerShortDescription: item.headerShortDescription,
        headerShortDescriptionNp: item.headerShortDescriptionNp,
        hideInWebsite: item.hideInWebsite.id,
        iconType: item.iconType.id,
        id: item.id,
        menuIcon: item.menuIcon,
        menuImage: item.menuImage,
        menuLinkType: item.menuLinkType.id,
        menuData: item.menuType,
        menuType: item.menuType.id,
        metaKeyword: item.metaKeyword,
        metaTitle: item.metaTitle,
        name: item.name,
        nameNp: item.nameNp,
        orderId: item.orderId,
        parentId: item?.parentId,
        productId: item.product?.id,
        secondButtonLink: item.secondButtonLink,
        secondButtonText: item.secondButtonText,
        secondButtonTextNp: item.secondButtonTextNp,
        serviceId: item.service?.id,
        showNotificationBell: item.showNotificationBell,
        showToLoggedInUserOnly: item.showToLoggedInUserOnly,
        slug: item.slug,
        status: item.status.id,
        statusData: item.status,
        tableViewName: item.tableViewName,
        url: item.url,
      }))
    : []

  useEffect(() => {
    if (deleteSuccess) {
      toast.success('Menu deleted successfully')
    }
    if (enableSuccess) {
      toast.success('Menu enabled successfully')
    }
    if (disableSuccess) {
      toast.success('Menu disabled successfully')
    }
    handleChecked([])
    dispatch(menuRedux.menu.actions.getMenu(params))
  }, [deleteSuccess, success, enableSuccess, disableSuccess])

  useEffect(() => {
    if (singleEnableSuccess) {
      toast.success('Menu enabled successfully')
    }
    if (singleDisableSuccess) {
      toast.success('Menu disabled successfully')
    }
    handleChecked([])
  }, [singleDisableSuccess, singleEnableSuccess])

  const handleChecked = (values: Array<string>) => {
    setCheckedValues(values)
  }

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen(true)
    setActionType('Add')
  }

  const handleDelete = () => {
    let menuId = checkedValues?.map((value) => ({id: value}))
    dispatch(menuRedux.menu.actions.deleteMenu(menuId))
    handleAlertClose()
  }

  const handleRefresh = () => {
    dispatch(menuRedux.menu.actions.getMenu())
  }

  const handleGetAllData = () => {
    dispatch(menuRedux.menu.actions.getAllMenu())
  }

  const handleSubmitSort = (data: Array<ItemType>) => {
    let body = {
      menuLists: data?.map((item) => ({
        id: item?.keyId,
        parentId: item?.parentId,
      })),
    }
    dispatch(menuRedux.menu.actions.sortMenu(body))
  }

  useEffect(() => {
    if (!isEmpty(sortMenuData) && success) {
      toast.success('Menu sorted successfully')
      dispatch(menuRedux.menu.actions.sortMenuReset())
      setParams({...params, limit: 10})
      dispatch(menuRedux.menu.actions.getMenu(params))
      setOpenSortModal(false)
    }
  }, [sortMenuData, success])

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Menu Manager'
          params={params}
          setParams={setParams}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          handleRefresh={handleRefresh}
          exportShow={false}
          importShow={false}
          enableMultiple={enableMenuData}
          disableMultiple={disableMenuData}
          data={menuList.menu}
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
            checkedValues={checkedValues}
            onChecked={handleChecked}
            data={menuData}
            handleSort={handleSort}
            showLoading={loading}
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
            total={data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
          {open && (
            <AddMenuModal
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

export default MenuManager
