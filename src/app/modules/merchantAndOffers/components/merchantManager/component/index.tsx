import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import Tag from 'rsuite/Tag'

// includes
import * as merchantRedux from '../index'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import {SortType} from 'rsuite-table/lib/@types/common'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import AddMerchantManager from './AddMerchantManager'
import {toast} from 'react-toastify'
import {isEmpty, orderBy} from 'lodash'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const MerchantManagerComponent = () => {
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
    merchantManagerList,
    sortMerchantManagerData,
  } = useSelector((state: any) => state.merchantManager)
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

  const enableMerchantManagerData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(merchantRedux.actions.enableMerchantManager(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const disableMerchantManagerData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(merchantRedux.actions.disableMerchantManager(formData))
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
      ? dispatch(merchantRedux.actions.singleDisableMerchantManager({id: data.id}))
      : dispatch(merchantRedux.actions.singleEnableMerchantManager({id: data.id}))
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
      label: 'Email',
      dataKey: 'email',
      flexGrow: 1,
      cell: <Cell>{(rowData) => (rowData.email ? rowData.email : '-')}</Cell>,
      sortable: false,
    },
    {
      label: 'Slug',
      dataKey: 'slug',
      flexGrow: 1,
      cell: <Cell dataKey='slug' />,
      sortable: false,
    },
    {
      label: 'Order',
      dataKey: 'order',
      height: 85,
      cell: <Cell dataKey='order' />,
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
    dispatch(merchantRedux.actions.getMerchantManager(params))
  }, [params])

  const handleChecked = (values: Array<string>) => {
    setCheckedValues(values)
  }

  useEffect(() => {
    if (deleteSuccess) {
      toast.success('Merchant  deleted successfully')
    }
    if (enableSuccess) {
      toast.success('Merchant enabled successfully')
    }
    if (disableSuccess) {
      toast.success('Merchant disabled successfully')
    }
    handleChecked([])
    dispatch(merchantRedux?.actions.getMerchantManager(params))
  }, [deleteSuccess, success, enableSuccess, disableSuccess])

  useEffect(() => {
    if (singleEnableSuccess) {
      toast.success('Merchant enabled successfully')
    }
    if (singleDisableSuccess) {
      toast.success('Merchant disabled successfully')
    }
    handleChecked([])
  }, [singleDisableSuccess, singleEnableSuccess])

  const MerchantManagerData = data?.merchant
    ? data?.merchant?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        description: item.description,
        descriptionNp: item.descriptionNp,
        email: item.email,
        id: item.id,
        name: item.name,
        nameNp: item.nameNp,
        order: item.order,
        slug: item.slug,
        PAN: item.PAN,
        merchantAddresses: item.merchantAddress.merchantAddress,
        merchantAdresses: item.merchantAddress.merchantAddress.map(
          (item: {[key: string]: string}) => ({
            id: item.id,
            provinceId: item.provinceId,
            districtId: item.districtId,
            address: item.address,
            addressNp: item.addressNp,
            googlePlusCode: item.googlePlusCode !== null ? item.googlePlusCode : '',
            latitude: item.latitude,
            longitude: item.longitude,
          })
        ),
        merchantCategoryId: item.merchantCategoryId,
        mobileNumbers: item.merchantMobileNumber.merchantMobileNumber.map(
          (item: {[key: string]: string}) => ({
            id: item.id,
            mobilenumber: item.number,
          })
        ),
        phoneNumbers: item.merchantPhoneNumber.merchantPhoneNumber.map(
          (item: {[key: string]: string}) => ({
            id: item.id,
            phonenumber: item.number,
          })
        ),
        merchantSubCategoryId: item.merchantSubCategoryId,
        status: item.status,
        thumbImage: item.thumbImage,
        websiteLink: item.websiteLink,
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
    let MerchantManagerId = checkedValues?.map((value) => ({id: value}))
    dispatch(merchantRedux?.actions?.deleteMerchantManager(MerchantManagerId))
    handleAlertClose()
  }
  const handleRefresh = () => {
    dispatch(merchantRedux.actions.getMerchantManager(params))
  }

  const handleGetAllData = () => {
    setParams({...params, limit: data?.meta?.total})
    dispatch(merchantRedux.actions.getMerchantManager(params))
  }

  const handleSubmitSort = (data: Array<ItemType>) => {
    let body = {
      merchantId: data?.map((item) => ({id: item?.keyId})),
    }
    dispatch(merchantRedux.actions.sortMerchantManager(body))
  }

  useEffect(() => {
    if (!isEmpty(sortMerchantManagerData) && success) {
      toast.success('Merchant manager sorted successfully')
      dispatch(merchantRedux.actions.sortMerchantManagerReset())
      setParams({...params, limit: 10})
      dispatch(merchantRedux.actions.getMerchantManager(params))
      setOpenSortModal(false)
    }
  }, [sortMerchantManagerData, success])

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Merchant Manager'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          exportShow={false}
          importShow={false}
          enableMultiple={enableMerchantManagerData}
          disableMultiple={disableMerchantManagerData}
          data={MerchantManagerData}
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
            data={MerchantManagerData}
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
            <AddMerchantManager
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

export default MerchantManagerComponent
