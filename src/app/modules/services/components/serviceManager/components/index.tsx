import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {cloneDeep, isEmpty} from 'lodash'

// rsuite
import Table from 'rsuite/Table'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import Tag from 'rsuite/Tag'

import {SortType} from 'rsuite-table/lib/@types/common'
import Pagination from 'rsuite/Pagination'
import Edit2 from '@rsuite/icons/Edit'
import IconButton from 'rsuite/esm/IconButton'
import TrashIcon from '@rsuite/icons/Trash'
import {toast} from 'react-toastify'

// includes
import * as services from 'src/app/modules/services'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import {ContentModel} from '../Model/ContentModal'
import AddServiceManagerModal from './AddServiceManagerModal'
import DesignComponent from 'src/app/modules/common/components/designComponent'
import {IServiceManagerState} from '../redux/reducer'
import {ServiceManagerType} from '../Model'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import * as faqCategoryRedux from 'src/app/modules/cms/components/faqCategory/redux'
import * as serviceTags from 'src/app/modules/services/components/serviceTag/redux'
import * as serviceCate from 'src/app/modules/services/components/serviceCategory/redux'

const Cell = Table.Cell

const ConentManager = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)
  const [openSortModal, setOpenSortModal] = useState(false)

  const [checkedValues, setCheckedValues] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<ContentModel>()
  const handleClose = () => setOpen(false)
  const {
    data,
    loading,
    enableResp,
    disableResp,
    deleteResp,
    success,
    serviceManagerList,
    sortServiceManagerData,
  }: IServiceManagerState = useSelector((state: any) => state?.serviceManager)
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })

  useEffect(() => {
    dispatch(services?.serviceManager?.actions.getServiceManager())
  }, [])
  useEffect(() => {
    if (success) {
      if (!isEmpty(enableResp)) {
        toast.success('Service Manager enabled successfully')
        dispatch(services?.serviceManager?.actions.enableServiceManagerReset())
      }
      if (!isEmpty(deleteResp)) {
        toast.success('Service Manager deleted successfully')
        dispatch(services?.serviceManager?.actions.deleteServiceManagerReset())
      }
      if (!isEmpty(disableResp)) {
        toast.success('Service Manager disabled successfully')
        dispatch(services?.serviceManager?.actions.disableServiceManagerReset())
      }
      if (!isEmpty(enableResp) || !isEmpty(disableResp) || !isEmpty(deleteResp)) {
        handleChecked([])
        dispatch(services?.serviceManager?.actions.getServiceManager())
      }
    }
  }, [disableResp, success, enableResp, deleteResp])

  const handleChecked = (values: Array<string>) => {
    setCheckedValues(values)
  }

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }

  const ActionCell = ({rowData, dataKey, ...props}: any) => {
    return (
      <Cell {...props} className='link-group'>
        <CheckPermissions type='Edit'>
          <IconButton
            appearance='subtle'
            onClick={() => {
              setEditCheckedData(rowData)
              setActionType('Edit')
              setOpen(true)
            }}
            icon={<Edit2 />}
          />
        </CheckPermissions>
        <CheckPermissions type='Delete'>
          <Whisper placement='top' trigger='hover' speaker={<Tooltip>Delete</Tooltip>}>
            <IconButton
              appearance='subtle'
              onClick={() => {
                handleAlertOpen()
                let serviceManagerId = [rowData.id]
                setCheckedValues(serviceManagerId)
              }}
              icon={<TrashIcon />}
            />
          </Whisper>
        </CheckPermissions>
        <CheckPermissions type='Edit'>
          <Whisper placement='top' trigger='hover' speaker={<Tooltip>Status</Tooltip>}>
            <Toggle
              size='sm'
              disabled={loading}
              checked={rowData.status}
              onClick={() => handleToggleAction(rowData)}
            />
          </Whisper>
        </CheckPermissions>
      </Cell>
    )
  }

  const handleToggleAction = (data: any) => {
    let serviceManagerId = {serviceManagerId: [{id: data.id}]}
    data?.status
      ? dispatch(services?.serviceManager?.actions.disableServiceManager(serviceManagerId))
      : dispatch(services?.serviceManager?.actions.enableServiceManager(serviceManagerId))
  }

  const handleDelete = () => {
    let serviceManagerId = checkedValues?.map((value) => ({id: value}))
    dispatch(services?.serviceManager?.actions.deleteServiceManager({serviceManagerId}))
    handleAlertClose()
  }

  const enableMultipleData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(services?.serviceManager?.actions.enableServiceManager({serviceManagerId: formData}))
    } else {
      toast.error('No data Selected')
    }
  }

  const disableMultipleData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(
        services?.serviceManager?.actions.disableServiceManager({serviceManagerId: formData})
      )
    } else {
      toast.error('No data Selected')
    }
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
      label: 'Category',
      dataKey: 'category',
      flexGrow: 1,
      cell: <Cell>{(rowData) => rowData?.serviceCategory?.name}</Cell>,
    },
    {
      label: 'Slug',
      dataKey: 'slug',
      flexGrow: 1,
      cell: <Cell dataKey='slug' />,
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

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  const managerData: any = data?.serviceManager
    ? data?.serviceManager?.map((item: ServiceManagerType, i: number) => ({
        ...item,
        sn: (params?.page - 1) * params?.limit + (i + 1),
        name: item?.title,
        title_np: item?.titleNp,
        tags: item?.serviceTags?.serviceTag?.map((tag: any) => tag?.id),
        serviceCategoryId: item?.serviceCategory?.id,
        media: [{...item?.mediaSetting, mediaTypeId: item?.mediaSetting?.mediaType?.id}],
        servicePopularityId: item?.servicePopularity?.id,
        serviceLeadFormId: item?.serviceLeadForm?.id,
        reviewId: item?.serviceReview?.id,
        review: item?.rating,
        serviceFeatureId: item?.serviceFeature?.id,
        featuredInHomepage: item?.featuredInHome ? 'yes' : 'no',
        featureData: [
          {
            title: item?.featureTitle,
            titleNp: item?.featureTitleNp,
            description: item?.featureDescription,
            descriptionNp: item?.featureDescriptionNp,
            helpText: item?.featureHelpText,
            helpTextNp: item?.featureHelpTextNp,
          },
        ],
        features: item?.featureSetting?.map((obj) => ({
          ...obj,
          descriptionNp: obj?.description_np,
        })),
        pageHeader: [
          {
            ...item?.pageHeader,
            firstCtaButton: item?.pageHeader?.firstCtaButtonText,
            firstCtaButtonNp: item?.pageHeader?.firstCtaButtonTextNp,
            secondCtaButton: item?.pageHeader?.secondCtaButtonText,
            secondCtaButtonNp: item?.pageHeader?.secondCtaButtonTextNp,
          },
        ],
        faqOptionId: item?.serviceFaq?.id,
        faqId: item?.faq?.id,
        serviceDocumentId: item?.serviceDocument?.id,
        documentData: {
          title: item?.documentTitle,
          titleNp: item?.documentTitleNp,
          description: item?.documentDescription,
          descriptionNp: item?.documentDescriptionNp,
        },
        documents: item?.documentSetting?.map((obj) => ({
          ...obj,
          descriptionNp: obj?.description_np,
        })),
        serviceRelatedId: item?.serviceRelated?.id,
        relatedData: {
          ...item?.relatedSetting,
          serviceId: item?.relatedSetting?.relatedService || '',
        },
        serviceApplyId: item?.serviceApplyNow?.id,
        applyData: cloneDeep(item?.applyNowSetting),
        additionalData: item?.additionalSetting?.map((obj) => ({
          ...obj,
          textNp: obj?.text_np,
          descriptionNp: obj?.description_np,
        })),
      }))
    : []

  useEffect(() => {
    getAllServiceOptions()
  }, [])

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen(true)
    setActionType('Add')
  }

  const handleRefresh = () => {
    dispatch(services?.serviceManager?.actions.getServiceManager())
  }

  const getAllServiceOptions = () => {
    dispatch(faqCategoryRedux.actions.getAllFaqCategory({status: true}))
    dispatch(services.serviceManager.actions.getServiceReviewOption())
    dispatch(services?.serviceManager.actions.getServicePopularity())
    dispatch(services?.serviceManager.actions.getServicesLeadForm())
    dispatch(services?.serviceManager.actions.getServiceMediaType())
    dispatch(services?.serviceManager.actions.getServicesFeaturesOption())
    dispatch(services?.serviceManager.actions.getServiceFaqOption())
    dispatch(services.serviceManager.actions.getServiceDocumentOption())
    dispatch(services.serviceManager.actions.getServiceApplyNowOption())
    dispatch(services.serviceManager.actions.getServiceRelatedOption())
    dispatch(serviceTags?.actions.getServiceTagList())
    dispatch(serviceCate?.actions?.getServiceCategoryList())
    dispatch(services?.serviceManager?.actions.getServiceManagerList())
  }

  const handleGetAllData = () => {
    setParams({...params, limit: data?.meta?.total})
    dispatch(services?.serviceManager.actions.getServiceManager(params))
  }

  const handleSubmitSort = (data: Array<ItemType>) => {
    let body = {
      serviceManagerId: data?.map((item) => ({id: item?.keyId})),
    }
    dispatch(services?.serviceManager.actions.sortServiceManager(body))
  }

  useEffect(() => {
    if (!isEmpty(sortServiceManagerData) && success) {
      toast.success('Service manager sorted successfully')
      dispatch(services?.serviceManager.actions.sortServiceManagerReset())
      setParams({...params, limit: 10})
      dispatch(services?.serviceManager.actions.getServiceManager(params))
      setOpenSortModal(false)
    }
  }, [sortServiceManagerData, success])
  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Service Manager'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          exportShow={false}
          importShow={false}
          enableMultiple={enableMultipleData}
          disableMultiple={disableMultipleData}
          data={managerData}
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
            data={managerData}
            handleSort={handleSort}
            onChecked={handleChecked}
            showLoading={loading}
            checkedValues={checkedValues}
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
            <AddServiceManagerModal
              open={open}
              params={params}
              handleClose={handleClose}
              actionType={actionType}
              editSelectedData={editSelectedData}
            />
          )}
        </div>
      </div>
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
    </>
  )
}

export default ConentManager
