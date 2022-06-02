import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import parse from 'html-react-parser'
// rsuite
import Table from 'rsuite/Table'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import Tag from 'rsuite/Tag'

// includes
import * as cms from 'src/app/modules/cms'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {StateParamsModel} from 'src/app/modules/common/Model'
import {SortType} from 'rsuite-table/lib/@types/common'
import Pagination from 'rsuite/Pagination'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import {ContentModel} from '../Model/ContentModal'
import AddContentModal from '../components/AddContentModal'
import DesignComponent from 'src/app/modules/common/components/designComponent'
import {IContentState} from '../redux/reducer'
import {isEmpty} from 'lodash'
import {toast} from 'react-toastify'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import DeleteModal from 'src/app/modules/common/components/deleteModal'

const ConentManager = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const [editSelectedData, setEditCheckedData] = useState<ContentModel>()
  const [checkedValues, setCheckedValues] = useState<Array<string>>([])

  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })

  const {
    data,
    singleEnableSuccess,
    singleDisableSuccess,
    enableSuccess,
    disableSuccess,
    deleteSuccess,
    toggleLoading,
    loading,
    success,
  } = useSelector((state: IContentState | any) => state.content)

  // alert modal
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)

  useEffect(() => {
    dispatch(cms.content.actions.getContentData(params))
  }, [params])

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }

  const enableContentData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(cms.content.actions.enableContent(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const disableContentData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(cms.content.actions.disableContent(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const handleToggleAction = (data: {[key: string]: string}) => {
    data?.status
      ? dispatch(cms.content.actions.singleDisableContent({id: data.id}))
      : dispatch(cms.content.actions.singleEnableContent({id: data.id}))
  }

  const Cell = Table.Cell

  const handleClose = () => setOpen(false)

  const ActionCell = ({rowData, dataKey, ...props}: any) => {
    function handleAction() {
      alert(`id:${rowData[dataKey]}`)
    }
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
          <IconButton
            appearance='subtle'
            onClick={() => {
              handleAlertOpen()
              let contentId = [rowData.id]
              setCheckedValues(contentId)
            }}
            icon={<TrashIcon />}
          />
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

  const columns = [
    {
      label: 'S.N.',
      dataKey: 'sn',
      width: 60,
      cell: <Cell dataKey='sn' />,
    },
    {
      label: 'Content',
      dataKey: 'content_name',
      flexGrow: 1,
      cell: <Cell dataKey='content_name' />,
      sortable: true,
    },
    {
      label: 'Description',
      dataKey: 'description',
      flexGrow: 1,
      cell: <Cell>{(rowData) => parse(rowData?.description)}</Cell>,
      sortable: true,
    },
    {
      label: 'Category',
      dataKey: 'category',
      flexGrow: 1,
      cell: <Cell>{(rowData) => (rowData?.category ? rowData?.category?.name : '-')}</Cell>,
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

  const handleChecked = (values: Array<string>) => {
    setCheckedValues(values)
  }

  useEffect(() => {
    if (deleteSuccess) {
      toast.success('Content deleted successfully')
    }
    if (enableSuccess) {
      toast.success('Content enabled successfully')
    }
    if (disableSuccess) {
      toast.success('Content disabled successfully')
    }
    handleChecked([])
    dispatch(cms.content?.actions.getContentData(params))
  }, [deleteSuccess, success, enableSuccess, disableSuccess])

  useEffect(() => {
    if (singleEnableSuccess) {
      toast.success('Content enabled successfully')
    }
    if (singleDisableSuccess) {
      toast.success('Content disabled successfully')
    }
    handleChecked([])
  }, [singleDisableSuccess, singleEnableSuccess])

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  const contentData = data?.content
    ? data?.content?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        content_name: item.title,
        slug: item.slug,
        content_name_np: item.titleNp,
        description: item.description,
        descriptionNp: item.descriptionNp,
        categoryId: item.category.id,
        category: item.category,
        show_lead_form_id: item.showLeadForm.id,
        showLeadForm: item.showLeadForm,
        enable_page_header_id: item.enablePageHeader.id,
        enablePageHeader: item.enablePageHeader,
        show_banner_id: item.showBanner.id,
        showBanner: item.showBanner,
        show_review_id: item.showReview.id,
        showReview: item.showReview,
        show_collapsible_id: item.collapsibleStatus.id,
        collapsibleStatus: item.collapsibleStatus,
        collapsible_title: item.collapsibleTitle,
        collapsible_title_np: item.collapsibleTitleNp,
        collapsibleData: item.collapsibleData,
        rating: item.rating,
        bannerId: item?.banner?.id,
        faqOptionId: item.faqOption.id,
        faqId: item.faq?.id,
        helpSectionId: item.helpSection.id,
        helpSection: item.helpSectionData[0],
        applySectionId: item.applySection.id,
        applySection: item.applySectionData[0],
        productSectionId: item.productSection.id,
        productData: item.productSectionData,
        modelType: item.modelType,
        status: item.status,
        menuId: item.menu.id,
        menu: item.menu,
      }))
    : []
  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen(true)
    setActionType('Add')
  }

  const handleDelete = () => {
    let contentDataId = checkedValues?.map((value) => ({id: value}))
    dispatch(cms.content?.actions?.deleteContent(contentDataId))
    handleAlertClose()
  }

  const handleRefresh = () => {
    dispatch(cms.content?.actions.getContentData(params))
  }

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Content Manager'
          params={params}
          setParams={setParams}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          handleRefresh={handleRefresh}
          enableMultiple={enableContentData}
          disableMultiple={disableContentData}
          exportShow={false}
          importShow={false}
        />

        <div className='datatable'>
          <RSuiteTable
            onChecked={handleChecked}
            checkedValues={checkedValues}
            showCheckbox={true}
            columns={columns}
            data={contentData}
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
            <AddContentModal
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

export default ConentManager
