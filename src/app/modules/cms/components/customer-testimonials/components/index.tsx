import {useEffect, useState} from 'react'
import {AiOutlineEdit} from 'react-icons/ai'
import {Table, IconButton, Whisper, Tooltip, Toggle, Pagination, Tag} from 'rsuite'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import parse from 'html-react-parser'
import TrashIcon from '@rsuite/icons/Trash'

import {SortType} from 'rsuite-table/lib/@types/common'
import {EmptyObject} from 'chart.js/types/basic'
import {CustomerTestimonialsModel} from '../Model'
import AddCustomerTestimonials from './addCustomerTestimonials'
import {toast} from 'react-toastify'

// Redux
import {useDispatch, useSelector} from 'react-redux'
import {ICustomerTestimonialsState} from '../redux'
import * as customerTestimonialsRedux from 'src/app/modules/cms/components/customer-testimonials/redux'
import DesignComponent from 'src/app/modules/common/components/designComponent'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import {isEmpty} from 'lodash'

const Cell = Table.Cell
const customerTestimonials = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const [selectedData, setSelectedData] = useState<Array<string>>([])
  const [openSortModal, setOpenSortModal] = useState(false)
  const [editSelectedData, setEditCheckedData] = useState<CustomerTestimonialsModel | EmptyObject>(
    {}
  )
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })

  const customerTestimonialsData: ICustomerTestimonialsState = useSelector(
    (state: any) => state.customerTestimonials
  )
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)

  const {
    activateSuccess,
    deactivateSuccess,
    singleActivateSuccess,
    singleDeactivateSuccess,
    deleteSuccess,
    toggleLoading,
    loading,
    success,
    customerTestimonialList,
    sortCustomerTestimonialData,
  } = customerTestimonialsData

  useEffect(() => {
    if (activateSuccess) {
      toast.success('Customer Testimonial activated successfully')
    }
    if (deactivateSuccess) {
      toast.success('Customer Testimonial deactivated successfully')
    }

    if (deleteSuccess) {
      toast.success('Customer Testimonial deleted successfully')
    }
    handleCheck([])
    dispatch(customerTestimonialsRedux?.actions.getCustomerTestimonials(params))
  }, [activateSuccess, deactivateSuccess, deleteSuccess])

  useEffect(() => {
    if (singleActivateSuccess) {
      toast.success(' Customer Testimonial Activated successfully')
    }
    if (singleDeactivateSuccess) {
      toast.success(' Customer Testimonial deactivated successfully')
    }

    handleCheck([])
  }, [singleActivateSuccess, singleDeactivateSuccess])

  //Get data from api to map in datatable
  const data = customerTestimonialsData?.data?.customerTestimonial
    ? customerTestimonialsData?.data?.customerTestimonial?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        title: item?.title,
        title_np: item?.title_np,
        subtitle: item?.subtitle,
        subtitle_np: item?.subtitle_np,
        short_description: item?.short_description,
        short_description_np: item?.short_description_np,
        description: item?.description,
        description_np: item?.description_np,
        slug: item?.slug,
        thumbnail_image: item?.thumbnail_image,
        featured_in_homepage: item?.featured_in_homepage,
        mediaType: item?.mediaType,
        image: item?.image,
        video: item?.video,
        status: item?.status,
        order: item?.order,
      }))
    : []

  const ActionCell = ({rowData, dataKey, ...props}: any) => {
    return (
      <Cell {...props} className='link-group'>
        <IconButton
          appearance='subtle'
          onClick={() => {
            setEditCheckedData(rowData)
            setActionType('Edit')
            setOpen(true)
          }}
          icon={<AiOutlineEdit />}
        />
        <CheckPermissions type='Delete'>
          <Whisper placement='top' trigger='hover' speaker={<Tooltip>Delete</Tooltip>}>
            <IconButton
              appearance='subtle'
              onClick={() => {
                handleAlertOpen()
                let customerId = [rowData.id]
                setSelectedData(customerId)
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
      ? dispatch(
          customerTestimonialsRedux.actions.singleDeactivateCustomerTestimonials({id: data.id})
        )
      : dispatch(
          customerTestimonialsRedux.actions.singleActivateCustomerTestimonials({id: data.id})
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
      label: 'Title',
      flexGrow: 1,
      dataKey: 'title',
      cell: <Cell>{(rowData) => parse(rowData?.title)}</Cell>,
      sortable: true,
    },
    {
      label: 'Subtitle',
      dataKey: 'subtitle',
      flexGrow: 1,
      cell: <Cell dataKey='subtitle' />,
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

  const handleCheck = (data: any) => {
    setSelectedData(data)
  }

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }

  const activateSelectedData = () => {
    if (!isEmpty(selectedData)) {
      const formData = selectedData.map((d: string) => ({
        id: d,
      }))
      dispatch(customerTestimonialsRedux.actions.activateCustomerTestimonials(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const deactivateSelectedData = () => {
    if (!isEmpty(selectedData)) {
      const formData = selectedData.map((d: string) => ({
        id: d,
      }))
      dispatch(customerTestimonialsRedux.actions.deactivateCustomerTestimonials(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen(true)
    setActionType('Add')
  }

  const modalSubmit = () => {
    let customerSelectedId = selectedData?.map((value) => ({id: value}))
    dispatch(customerTestimonialsRedux?.actions.deleteCustomerTestimonials(customerSelectedId))
    setAlertOpen(false)
  }

  const handleRefresh = () => {
    dispatch(customerTestimonialsRedux?.actions.getCustomerTestimonials(params))
  }

  const handleGetAllData = () => {
    setParams({...params, limit: customerTestimonialsData?.data?.meta?.total})
    dispatch(customerTestimonialsRedux?.actions.getCustomerTestimonials(params))
  }

  const handleSubmitSort = (data: Array<ItemType>) => {
    let body = {
      customerTestimonialId: data?.map((item) => ({id: item?.keyId})),
    }
    dispatch(customerTestimonialsRedux.actions.sortCustomerTestimonial(body))
  }

  useEffect(() => {
    if (!isEmpty(sortCustomerTestimonialData) && success) {
      toast.success('Customer testimonial sorted successfully')
      dispatch(customerTestimonialsRedux.actions.sortCustomerTestimonialReset())
      setParams({...params, limit: 10})
      dispatch(customerTestimonialsRedux.actions.getCustomerTestimonials(params))
      setOpenSortModal(false)
    }
  }, [sortCustomerTestimonialData, success])

  return (
    <div className='shadow p-3 bg-white rounded'>
      <DesignComponent
        moduleName='Customer Testimonials'
        params={params}
        setParams={setParams}
        handleAddModal={handleAddModal}
        handleRefresh={handleRefresh}
        handleAlertOpen={handleAlertOpen}
        exportShow={false}
        importShow={false}
        enableMultiple={activateSelectedData}
        disableMultiple={deactivateSelectedData}
        data={data}
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
          data={data}
          checkedValues={selectedData}
          showLoading={customerTestimonialsData?.loading}
          onChecked={handleCheck}
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
          size='sm'
          layout={['total', '-', 'limit', '|', 'pager']}
          total={customerTestimonialsData?.data?.meta?.total || 0}
          limitOptions={[10, 20, 50, 100]}
          limit={params?.limit}
          activePage={params?.page}
          onChangePage={(value) => setParams({...params, page: value})}
          onChangeLimit={handleChangeLimit}
        />
      </div>

      {open && (
        <AddCustomerTestimonials
          open={open}
          handleClose={() => setOpen(false)}
          actionType={actionType}
          editSelectedData={editSelectedData}
        />
      )}
      {alertOpen &&
        (!isEmpty(selectedData) ? (
          <DeleteModal
            handleClick={() => modalSubmit()}
            isOpen={alertOpen}
            handleClose={() => handleAlertClose()}
          />
        ) : (
          toast.error('No data selected') && setAlertOpen(false)
        ))}
    </div>
  )
}

export default customerTestimonials
