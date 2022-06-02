import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import Tag from 'rsuite/Tag'

// includes
import * as offerRedux from '../index'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import {SortType} from 'rsuite-table/lib/@types/common'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import AddOffer from './AddOffer'
import {toast} from 'react-toastify'
import {isEmpty} from 'lodash'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const OfferComponent = () => {
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
    offerManagerList,
    sortOfferManagerData,
  } = useSelector((state: any) => state.offers)
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
  const [openSortModal, setOpenSortModal] = useState(false)

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }

  const enableOfferData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(offerRedux.actions.enableOffer(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const disableOfferData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(offerRedux.actions.disableOffer(formData))
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
                let offerId = [rowData.id]
                setCheckedValues(offerId)
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
      ? dispatch(offerRedux.actions.singleDisableOffer({id: data.id}))
      : dispatch(offerRedux.actions.singleEnableOffer({id: data.id}))
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
      label: 'Published Date',
      dataKey: 'publishedDate',
      flexGrow: 1,
      cell: <Cell dataKey='publishedDate' />,
      sortable: false,
    },
    {
      label: 'Till Date',
      dataKey: 'tillDate',
      flexGrow: 1,
      cell: <Cell dataKey='tillDate' />,
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
      flexGrow: 1,
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
    dispatch(offerRedux.actions.getOffer(params))
  }, [params])

  const handleChecked = (values: Array<string>) => {
    setCheckedValues(values)
  }

  useEffect(() => {
    if (deleteSuccess) {
      toast.success('Offer deleted successfully')
    }
    if (enableSuccess) {
      toast.success('Offer enabled successfully')
    }
    if (disableSuccess) {
      toast.success('Offer disabled successfully')
    }
    handleChecked([])
    dispatch(offerRedux?.actions.getOffer(params))
  }, [deleteSuccess, success, enableSuccess, disableSuccess])

  useEffect(() => {
    if (singleEnableSuccess) {
      toast.success('Offer enabled successfully')
    }
    if (singleDisableSuccess) {
      toast.success('Offer disabled successfully')
    }
    handleChecked([])
  }, [singleDisableSuccess, singleEnableSuccess])

  const offerData = data?.offer
    ? data?.offer?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        description: item.description,
        descriptionNp: item.descriptionNp,
        shortDescription: item.shortDescription,
        shortDescriptionNp: item.shortDescriptionNp,
        id: item.id,
        title: item.title,
        titleNp: item.titleNp,
        order: item.order,
        slug: item.slug,
        offerAddresses: item.offerAddress?.offerAddress,
        offerAdresses: item.offerAddress?.offerAddress?.map((item: {[key: string]: string}) => ({
          id: item.id,
          provinceId: item.provinceId,
          districtId: item.districtId,
          address: item.address,
          addressNp: item.addressNp,
          googlePlusCode: item.googlePlusCode !== null ? item.googlePlusCode : '',
          latitude: item.latitude,
          longitude: item.longitude,
        })),
        categoryId: item.categoryId,
        mobileNumbers: item.offerMobileNumber?.offerMobileNumber.map(
          (item: {[key: string]: string}) => ({
            id: item.id,
            mobilenumber: item.number,
          })
        ),
        phoneNumbers: item.offerPhoneNumber?.offerPhoneNumber.map(
          (item: {[key: string]: string}) => ({
            id: item.id,
            phonenumber: item.number,
          })
        ),
        merchantId: item.merchant.id,
        status: item.status,
        thumbImage: item.thumbImage,
        link: item.link,
        publishedDate: item.publishedDate,
        initiationDate: item.initiationDate,
        tillDate: item.tillDate,
        discountTypeId: item.discountTypeId,
        discount: item.discount,
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
    let offerId = checkedValues?.map((value) => ({id: value}))
    dispatch(offerRedux?.actions?.deleteOffer(offerId))
    handleAlertClose()
  }

  const handleRefresh = () => {
    dispatch(offerRedux.actions.getOffer(params))
  }

  const handleGetAllData = () => {
    setParams({...params, limit: data?.meta?.total})
    dispatch(offerRedux.actions.getOffer(params))
  }

  const handleSubmitSort = (data: Array<ItemType>) => {
    let body = {
      offerId: data?.map((item) => ({id: item?.keyId})),
    }
    dispatch(offerRedux.actions.sortOfferManager(body))
  }

  useEffect(() => {
    if (!isEmpty(sortOfferManagerData) && success) {
      toast.success('Offer manager sorted successfully')
      dispatch(offerRedux.actions.sortOfferManagerReset())
      setParams({...params, limit: 10})
      dispatch(offerRedux.actions.getOffer(params))
      setOpenSortModal(false)
    }
  }, [sortOfferManagerData, success])

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Offers'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          exportShow={false}
          importShow={false}
          enableMultiple={enableOfferData}
          disableMultiple={disableOfferData}
          data={offerData}
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
            data={offerData}
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
            <AddOffer
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

export default OfferComponent
