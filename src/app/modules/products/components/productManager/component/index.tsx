import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'

import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import Tag from 'rsuite/Tag'

// includes
import * as productManagerRedux from '../index'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import {SortType} from 'rsuite-table/lib/@types/common'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import AddProductManager from './AddProductManager'
import {toast} from 'react-toastify'
import {isEmpty} from 'lodash'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const ProductManagerComponent = () => {
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
    allProductManager,
    sortProductManagerData,
  } = useSelector((state: any) => state.productManager)
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

  const enableProductManagerData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(productManagerRedux.actions.enableProductManager(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const disableProductManagerData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(productManagerRedux.actions.disableProductManager(formData))
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
                let productManagerId = [rowData.id]
                setCheckedValues(productManagerId)
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
      ? dispatch(productManagerRedux.actions.singleDisableProductManager({id: data.id}))
      : dispatch(productManagerRedux.actions.singleEnableProductManager({id: data.id}))
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
      dataKey: 'title',
      flexGrow: 1,
      cell: <Cell dataKey='title' />,
      sortable: true,
    },

    {
      label: 'Category',
      dataKey: 'productCategory',
      flexGrow: 1,
      cell: (
        <Cell>{(rowData) => (rowData.productCategory ? rowData.productCategory.name : '-')}</Cell>
      ),
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
    dispatch(productManagerRedux.actions.getProductManager(params))
  }, [params])

  const handleChecked = (values: Array<string>) => {
    setCheckedValues(values)
  }

  useEffect(() => {
    if (deleteSuccess) {
      toast.success('Products Manager deleted successfully')
    }
    if (enableSuccess) {
      toast.success('Products Manager enabled successfully')
    }
    if (disableSuccess) {
      toast.success('Products Manager disabled successfully')
    }
    handleChecked([])
    dispatch(productManagerRedux?.actions.getProductManager(params))
  }, [deleteSuccess, success, enableSuccess, disableSuccess])

  useEffect(() => {
    if (singleEnableSuccess) {
      toast.success('Products Manager enabled successfully')
    }
    if (singleDisableSuccess) {
      toast.success('Products Manager disabled successfully')
    }
    handleChecked([])
  }, [singleDisableSuccess, singleEnableSuccess])

  const productManagerData = data?.productManager
    ? data?.productManager?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        title: item?.title,
        title_np: item?.title_np,
        shortDescription: item?.shortDescription,
        shortDescriptionNp: item?.shortDescriptionNp,
        description: item?.description,
        descriptionNp: item?.descriptionNp,
        slug: item?.slug,
        productCategory: item?.productCategory,
        productCategoryId: item?.productCategory.id,
        featuredInHomepage: item?.featuredInHomepage,
        productTags: item?.productTags,
        tags: item?.productTags?.productTag[0]?.id,
        productPopularity: item?.productPopularity,
        productPopularityId: item?.productPopularity?.id,
        productLeadForm: item?.productLeadForm,
        productLeadFormId: item?.productLeadForm?.id,
        interestRateOption: item?.interestRateOption,
        interestRateId: item?.interestRateOption?.id,
        productReview: item?.productReview,
        reviewId: item?.productReview?.id,
        review: item?.rating,
        competitorStatus: item?.competitorStatus,
        competitorStatusId: item?.competitorStatus?.id,
        media: item?.mediaSetting,
        mediaTypeId: item?.mediaSetting.mediaType?.id,
        productFeatureId: item?.productFeature?.id,
        productFaq: item?.productFaq,
        faqOptionId: item?.productFaq?.id,
        faq: item?.faq,
        faqId: item?.faq?.id,
        productDocument: item?.productDocument,
        productDocumentId: item?.productDocument?.id,
        documentData: {
          title: item?.documentTitle,
          titleNp: item?.documentTitleNp,
          description: item?.documentDescription,
          descriptionNp: item?.documentDescriptionNp,
        },
        featureData: {
          description: item?.featureDescription,
          descriptionNp: item?.featureDescriptionNp,
          helpText: item?.featureHelpText,
          helpTextNp: item?.featureHelpTextNp,
          title: item?.featureTitle,
          titleNp: item?.featureTitleNp,
        },
        features: item?.featureSetting,
        productRelated: item?.productRelated,
        productRelatedId: item?.productRelated?.id,
        documents: item?.documentSetting,
        productApplyNow: item?.productApplyNow,
        productApplyId: item?.productApplyNow?.id,
        applyData: item?.applyNowSetting,

        additionalData: item?.additionalSetting,
        comparisonStatus: item?.comparisonStatus,
        productComparisonId: item?.comparisonStatus?.id,
        pageHeader: item?.pageHeader,
        relatedSetting: item?.relatedSetting,
        comparisonData: item?.comparisonSubCategoryArray,
        status: item?.status,
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
    let productManagerId = checkedValues?.map((value) => ({id: value}))
    dispatch(productManagerRedux?.actions?.deleteProductManager(productManagerId))
    handleAlertClose()
  }
  const handleRefresh = () => {
    dispatch(productManagerRedux.actions.getProductManager(params))
  }

  const handleGetAllData = () => {
    setParams({...params, limit: data?.meta?.total})
    dispatch(productManagerRedux.actions.getProductManager(params))
  }

  const handleSubmitSort = (data: Array<ItemType>) => {
    let body = {
      productManagerId: data?.map((item) => ({id: item?.keyId})),
    }
    dispatch(productManagerRedux.actions.sortProductManager(body))
  }

  useEffect(() => {
    if (!isEmpty(sortProductManagerData) && success) {
      toast.success('Product Manager sorted successfully')
      dispatch(productManagerRedux.actions.sortProductManagerReset())
      setParams({...params, limit: 10})
      dispatch(productManagerRedux.actions.getProductManager(params))
      setOpenSortModal(false)
    }
  }, [sortProductManagerData, success])

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Product Manager'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          exportShow={false}
          importShow={false}
          enableMultiple={enableProductManagerData}
          disableMultiple={disableProductManagerData}
          data={productManagerData}
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
            data={productManagerData}
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
            <AddProductManager
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

export default ProductManagerComponent
