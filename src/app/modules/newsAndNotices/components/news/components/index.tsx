import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'
import Input from 'rsuite/Input'
import InputGroup from 'rsuite/InputGroup'
import Tag from 'rsuite/Tag'
import Toggle from 'rsuite/Toggle'
import Whisper from 'rsuite/Whisper'
import Tooltip from 'rsuite/Tooltip'

// icons
import {FaCircle, FaPlus} from 'react-icons/fa'
import {RiDeleteBin6Line} from 'react-icons/ri'

// includes
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import SearchIcon from '@rsuite/icons/Search'
import {toast} from 'react-toastify'
import {SortType} from 'rsuite-table/lib/@types/common'

import {StateParamsModel} from 'src/app/modules/common/Model'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import * as news from '../index'
import * as categoryType from 'src/app/modules/common'

import DeleteModal from 'src/app/modules/common/components/deleteModal'
import {FiCircle} from 'react-icons/fi'
import {isEmpty} from 'lodash'
import {AiFillFileExcel} from 'react-icons/ai'
import AddNews from './AddNews'
import {INewsState} from '../index'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const News = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })
  const [checkedValues, setCheckedValues] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<any>()
  const [selectedData, setSelectedData] = useState<Array<string>>([])
  // alert modal
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)
  const newsData: INewsState = useSelector((state: any) => state.news)
  const {
    activateSuccess,
    deactivateSuccess,
    singleActivateSuccess,
    singleDeactivateSuccess,
    loading,
  } = newsData

  // const { data: categoryTypeData } = useSelector((state: any) => state.categoryType)

  useEffect(() => {
    dispatch(news.actions.getNews(params))
  }, [params])

  useEffect(() => {
    dispatch(categoryType.action.getCategoryType())
  }, [])

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }
  const handleToggleAction = (data: {[key: string]: string}) => {
    const formData = {id: data?.id}
    data?.status
      ? dispatch(news.actions.singleDeactivateNews(formData))
      : dispatch(news.actions.singleActivateNews(formData))
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
                let keySettingId = [rowData.id]
                setCheckedValues(keySettingId)
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
      label: 'News Title',
      dataKey: 'name',
      flexGrow: 1,
      cell: <Cell dataKey='name' />,
      sortable: true,
    },
    {
      label: 'Category Name',
      dataKey: 'category',
      flexGrow: 1,
      cell: <Cell dataKey='category' />,
      sortable: true,
    },
    {
      label: 'Sub Category',
      dataKey: 'subCategory',
      flexGrow: 1,
      cell: <Cell dataKey='subCategory' />,
      sortable: true,
    },
    {
      label: 'Published Date',
      dataKey: 'published_date',
      width: 140,
      cell: <Cell dataKey='published_date' />,
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
    if (newsData?.deleteSuccess) {
      toast.success('News deleted successfully')
      dispatch(news?.actions.getNews(params))
    }
  }, [newsData])

  // active/deactive section

  useEffect(() => {
    if (singleActivateSuccess) {
      toast.success('News activated successfully')
    }
    if (singleDeactivateSuccess) {
      toast.success('News deactivated successfully')
    }
    handleChecked([])
  }, [singleActivateSuccess, singleDeactivateSuccess])

  useEffect(() => {
    if (activateSuccess) {
      toast.success('News activated successfully')
    }
    if (deactivateSuccess) {
      toast.success('News deactivated successfully')
    }

    handleChecked([])
    dispatch(news?.actions.getNews(params))
  }, [activateSuccess, deactivateSuccess])

  const handleCheck = (data: any) => {
    setSelectedData(data)
  }

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  const activateSelectedData = () => {
    if (!isEmpty(checkedValues)) {
      const formData: any = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(news.actions.activateNews(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const deactivateSelectedData = () => {
    if (!isEmpty(checkedValues)) {
      const formData: any = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(news.actions.deactivateNews(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const handleChecked = (values: any) => {
    setCheckedValues(values)
  }

  const data = newsData?.data?.news
    ? newsData?.data?.news?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        name: item?.name,
        name_np: item?.name_np,
        description: item?.description,
        description_np: item?.description_np,
        attached_file_title: item?.attached_file_title,
        attached_file_title_np: item?.attached_file_title_np,
        attached_file: item?.attached_file,
        slug: item?.slug,
        status: item?.status,
        show_pop_up: item?.show_pop_up,
        published_date: item?.published_date,
        archive_date: item?.archive_date,
        visibility_time: parseInt(item?.visibility_time),
        image: item?.image,
        image_np: item?.image_np,
        category: item?.subCategory?.category?.name,
        categoryId: item?.subCategory?.category?.id,
        subCategory: item?.subCategory?.name,
        subCategoryId: item?.subCategory?.id,
      }))
    : []

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen(true)
    setActionType('Add')
  }

  const modalSubmit = () => {
    let id = checkedValues?.map((value) => ({id: value}))
    dispatch(news?.actions?.deleteNews(id))
    handleAlertClose()
  }

  const handleRefresh = () => {
    dispatch(news?.actions.getNews(params))
  }

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='News'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          exportShow={false}
          importShow={false}
          enableMultiple={activateSelectedData}
          disableMultiple={deactivateSelectedData}
        />

        <div className='datatable'>
          <RSuiteTable
            onChecked={handleChecked}
            showCheckbox={true}
            columns={columns}
            data={data}
            showLoading={loading}
            checkedValues={checkedValues}
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
            total={newsData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
          {open && (
            <AddNews
              open={open}
              params={params}
              handleClose={handleClose}
              actionType={actionType}
              editSelectedData={editSelectedData}
            />
          )}
        </div>
        {alertOpen &&
          (!isEmpty(checkedValues) ? (
            <DeleteModal
              handleClick={() => modalSubmit()}
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

export default News
