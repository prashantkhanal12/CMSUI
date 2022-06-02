import Pagination from 'rsuite/Pagination'
import Table from 'rsuite/Table'
import {useState, useEffect} from 'react'
import TrashIcon from '@rsuite/icons/Trash'
import {SortType} from 'rsuite-table/lib/@types/common'
import {useSelector, useDispatch} from 'react-redux'
import {EmptyObject} from 'chart.js/types/basic'
import IconButton from 'rsuite/IconButton'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import Tag from 'rsuite/Tag'
import {AiOutlineEdit} from 'react-icons/ai'
import {toast} from 'react-toastify'

//Manual import
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import {BannerModel} from '../Model'
import AddBanner from './addBanner'
import {IBannerState} from '../redux'
import * as bannerRedux from 'src/app/modules/cms/components/banner/redux'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import {isEmpty} from 'lodash'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const Cell = Table.Cell
const Banner = () => {
  const dispatch = useDispatch()
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })
  const [allDataParams, setAllDataParams] = useState<StateParamsModel>({
    page: 0,
    limit: 0,
  })

  const [actionType, setActionType] = useState('Add')
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)
  const [open1, setOpen1] = useState(false)
  const [editSelectedData, setEditCheckedData] = useState<BannerModel | EmptyObject>({})
  const [selectedData, setSelectedData] = useState<Array<string>>([])

  const handleClose1 = () => setOpen1(false)
  const [openSortModal, setOpenSortModal] = useState(false)

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }

  const bannerData: IBannerState = useSelector((state: any) => state.banner)
  useEffect(() => {
    dispatch(bannerRedux.actions.getBanner(params))
  }, [params])
  const {
    success,
    activateSuccess,
    deactivateSuccess,
    singleActivateSuccess,
    singleDeactivateSuccess,
    deleteSuccess,
    loading,
    bannerList,
    sortBannerData,
  } = bannerData

  const handleToggleAction = (data: {[key: string]: string}) => {
    data?.status
      ? dispatch(bannerRedux.actions.singleDeactivateBanner({id: data.id}))
      : dispatch(bannerRedux.actions.singleActivateBanner({id: data.id}))
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
                setOpen1(true)
              }}
              icon={<AiOutlineEdit />}
            />
          </Whisper>
        </CheckPermissions>
        <CheckPermissions type='Delete'>
          <Whisper placement='top' trigger='hover' speaker={<Tooltip>Delete</Tooltip>}>
            <IconButton
              appearance='subtle'
              onClick={() => {
                handleAlertOpen()
                let bannerId = [rowData.id]
                setSelectedData(bannerId)
              }}
              icon={<TrashIcon />}
            />
          </Whisper>
        </CheckPermissions>
        <Whisper placement='top' trigger='hover' speaker={<Tooltip>Status</Tooltip>}>
          <Toggle size='sm' checked={rowData.status} onClick={() => handleToggleAction(rowData)} />
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
      label: 'Name',
      flexGrow: 1,
      dataKey: 'name',
      cell: <Cell dataKey='name' />,
      sortable: true,
    },
    {
      label: 'Title',
      dataKey: 'title',
      flexGrow: 1,
      cell: <Cell dataKey='title' />,
      sortable: true,
    },

    {
      label: 'Menu',
      dataKey: 'subtitle_np',
      flexGrow: 1,
      cell: <Cell dataKey='subtitle_np' />,
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

  useEffect(() => {
    if (activateSuccess) {
      toast.success('Banner activated successfully')
    }
    if (deactivateSuccess) {
      toast.success('Banner deactivated successfully')
    }
    if (deleteSuccess) {
      toast.success('Banner deleted successfully')
    }
    handleCheck([])
    dispatch(bannerRedux?.actions.getBanner(params))
  }, [activateSuccess, deactivateSuccess, deleteSuccess])
  useEffect(() => {
    if (singleActivateSuccess) {
      toast.success(' Banner Actvated successfully')
    }
    if (singleDeactivateSuccess) {
      toast.success(' Banner deactivated successfully')
    }
    handleCheck([])
  }, [singleActivateSuccess, singleDeactivateSuccess])

  const handleCheck = (data: any) => {
    setSelectedData(data)
  }
  const activateSelectedData = () => {
    if (!isEmpty(selectedData)) {
      const formData = selectedData.map((d: string) => ({
        id: d,
      }))
      dispatch(bannerRedux.actions.activateBanner(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const deactivateSelectedData = () => {
    if (!isEmpty(selectedData)) {
      const formData = selectedData.map((d: string) => ({
        id: d,
      }))
      dispatch(bannerRedux.actions.deactivateBanner(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  const handleRefresh = () => {
    dispatch(bannerRedux.actions.getBanner(params))
  }

  //Get data from api to map in datatable
  const data = bannerData?.data?.banner
    ? bannerData?.data?.banner?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        name: item?.name,
        title: item?.title,
        title_np: item?.title_np,
        subtitle: item?.subtitle,
        subtitle_np: item?.subtitle_np,
        image: item.image,
        first_button_text: item?.first_button_text,
        first_button_text_np: item?.first_button_text_np,
        first_button_url: item?.first_button_url,
        second_button_text: item?.second_button_text,
        second_button_text_np: item?.second_button_text_np,
        second_button_url: item?.second_button_url,
        status: item?.status,
      }))
    : []
  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen1(true)
    setActionType('Add')
  }
  const handleDelete = () => {
    let bannerSelectedId = selectedData?.map((value) => ({id: value}))
    dispatch(bannerRedux?.actions.deleteBanner(bannerSelectedId))
    handleAlertClose()
  }

  const handleGetAllData = () => {
    setParams({...params, limit: bannerData?.data?.meta?.total})
    dispatch(bannerRedux.actions.getBanner(params))
  }

  const handleSubmitSort = (data: Array<ItemType>) => {
    let body = {
      bannerId: data?.map((item) => ({id: item?.keyId})),
    }
    dispatch(bannerRedux.actions.sortBanner(body))
  }

  useEffect(() => {
    if (!isEmpty(sortBannerData) && success) {
      toast.success('Banner sorted successfully')
      dispatch(bannerRedux.actions.sortBannerReset())
      setParams({...params, limit: 10})
      dispatch(bannerRedux.actions.getBanner(params))
      setOpenSortModal(false)
    }
  }, [sortBannerData, success])
  return (
    <div>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Banner Manager'
          params={params}
          setParams={setParams}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          handleRefresh={handleRefresh}
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
            showLoading={bannerData?.loading}
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
            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
            total={bannerData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
        </div>

        {open1 && (
          <AddBanner
            open={open1}
            handleClose={handleClose1}
            actionType={actionType}
            editSelectedData={editSelectedData}
          />
        )}

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
    </div>
  )
}
export default Banner
