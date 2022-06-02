import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Table from 'rsuite/Table'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import Tag from 'rsuite/Tag'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {toast} from 'react-toastify'
import {SortType} from 'rsuite-table/lib/@types/common'
import {isEmpty} from 'lodash'
import moment from 'moment'

//Manual import
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import DesignComponent from 'src/app/modules/common/components/designComponent'
import * as galleryRedux from '../../gallery/redux'
import {IGalleryState} from '../../gallery/redux'
import AddGallery from './AddGallery'
import {imageBaseUrl} from 'src/cms/helpers/constants'

const Gallery = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
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

  const galleryData: IGalleryState = useSelector((state: any) => state.gallery)

  useEffect(() => {
    dispatch(galleryRedux.actions.getGallery(params))
  }, [params])
  const {
    loading,
    singleEnableSuccess,
    singleDisableSuccess,
    enableSuccess,
    disableSuccess,
    toggleLoading,
    success,
    deleteSuccess,
    sortGalleryData,
  } = useSelector((state: any) => state.gallery)

  const [checkedValues, setCheckedValues] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<any>()

  // alert modal
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)
  const [openSortModal, setOpenSortModal] = useState(false)

  const enableGalleryData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(galleryRedux.actions.enableGallery(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const disableGalleryData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(galleryRedux.actions.disableGallery(formData))
    } else {
      toast.error('No data Selected')
    }
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
                let galleryId = [rowData.id]
                setCheckedValues(galleryId)
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
      ? dispatch(galleryRedux.actions.singleDisableGallery({id: data.id}))
      : dispatch(galleryRedux.actions.singleEnableGallery({id: data.id}))
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
      label: 'Cover Image',
      dataKey: 'coverImage',

      flexGrow: 1,
      height: 500,
      width: 100,
      cell: (
        <Cell>
          {(rowData) => (
            <img
              className='thumbImage '
              src={`${imageBaseUrl}/${rowData?.coverImage}`}
              alt=''
              width='150'
              height='50'
            />
          )}
        </Cell>
      ),
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
      toast.success('Gallery deleted successfully')
    }
    if (enableSuccess) {
      toast.success('Gallery enabled successfully')
    }
    if (disableSuccess) {
      toast.success('Gallery disabled successfully')
    }
    handleChecked([])
    dispatch(galleryRedux?.actions.getGallery(params))
  }, [deleteSuccess, success, enableSuccess, disableSuccess])

  useEffect(() => {
    if (singleEnableSuccess) {
      toast.success('Gallery enabled successfully')
    }
    if (singleDisableSuccess) {
      toast.success('Gallery disabled successfully')
    }
    handleChecked([])
  }, [singleDisableSuccess, singleEnableSuccess])

  const data: any = galleryData?.data?.album
    ? galleryData?.data?.album?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item.id,
        title: item.title,
        titleNp: item.titleNp,
        date: moment(item?.date).toDate(),
        thumbImage: item.thumbImage,
        coverImage: item.coverImage,
        description: item.description,
        descriptionNp: item.descriptionNp,
        status: item.status,
        photos: item.photos.photo,
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
    let galleryId = checkedValues?.map((value) => ({albumId: value}))
    dispatch(galleryRedux?.actions?.deleteGallery(galleryId))
    handleAlertClose()
  }
  const handleRefresh = () => {}

  const handleGetAllData = () => {
    setParams({...params, limit: galleryData?.data?.meta?.total})
    dispatch(galleryRedux.actions.getGallery(params))
  }

  const handleSubmitSort = (data: Array<ItemType>) => {
    let body = {
      albumId: data?.map((item) => ({id: item?.keyId})),
    }
    dispatch(galleryRedux.actions.sortGallery(body))
  }

  useEffect(() => {
    if (!isEmpty(sortGalleryData) && success) {
      toast.success('Gallery sorted successfully')
      dispatch(galleryRedux.actions.sortGalleryReset())
      setParams({...params, limit: 10})
      dispatch(galleryRedux.actions.getGallery(params))
      setOpenSortModal(false)
    }
  }, [sortGalleryData, success])

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Photo Gallery'
          params={params}
          setParams={setParams}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          handleRefresh={handleRefresh}
          exportShow={false}
          importShow={false}
          enableMultiple={enableGalleryData}
          disableMultiple={disableGalleryData}
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
            onChecked={handleChecked}
            showCheckbox={true}
            columns={columns}
            data={data}
            checkedValues={checkedValues}
            showLoading={galleryData?.loading}
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
            total={galleryData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
          {open && (
            <AddGallery
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
              handleClose={() => handleAlertClose()}
              isOpen={alertOpen}
            />
          ) : (
            toast.error('No data selected') && setAlertOpen(false)
          ))}
      </div>
    </>
  )
}

export default Gallery
