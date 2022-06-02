import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'
import Tag from 'rsuite/Tag'
import Toggle from 'rsuite/Toggle'
import Whisper from 'rsuite/Whisper'
import Tooltip from 'rsuite/Tooltip'

// includes
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {toast} from 'react-toastify'
import {SortType} from 'rsuite-table/lib/@types/common'
import {isEmpty} from 'lodash'
import moment from 'moment'

import {StateParamsModel} from 'src/app/modules/common/Model'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import * as notice from '../index'
import * as categoryType from 'src/app/modules/common'

import DeleteModal from 'src/app/modules/common/components/deleteModal'
import AddNotice from './AddNotice'
import {INoticesState} from '../index'
import {getTodayDate} from 'src/cms/helpers/AssetHelpers'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const Notices = () => {
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
  const noticesData: INoticesState = useSelector((state: any) => state.notices)
  const {activateSuccess, deactivateSuccess, singleActivateSuccess, singleDeactivateSuccess} =
    noticesData

  useEffect(() => {
    dispatch(notice.actions.getNotice(params))
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
      ? dispatch(notice.actions.singleDeactivateNotice(formData))
      : dispatch(notice.actions.singleActivateNotice(formData))
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
      label: 'Notice Title',
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
      cell: (
        <Cell>
          {(rowData) =>
            rowData?.published_date ? moment(rowData?.published_date).format('YYYY-MM-DD') : '-'
          }
        </Cell>
      ),
      sortable: true,
    },
    {
      label: 'Expiry Date',
      dataKey: 'expiry_date',
      width: 140,
      cell: (
        <Cell>
          {(rowData) =>
            rowData?.expiry_date ? moment(rowData?.expiry_date).format('YYYY-MM-DD') : '-'
          }
        </Cell>
      ),
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
    if (noticesData?.deleteSuccess) {
      toast.success('Notice deleted successfully')
      dispatch(notice?.actions.getNotice(params))
      handleChecked([])
    }
  }, [noticesData])

  // active/deactive section

  useEffect(() => {
    if (singleActivateSuccess) {
      toast.success('Notice activated successfully')
    }
    if (singleDeactivateSuccess) {
      toast.success('Notice deactivated successfully')
    }
    handleChecked([])
  }, [singleActivateSuccess, singleDeactivateSuccess])

  useEffect(() => {
    if (activateSuccess) {
      toast.success('Notice activated successfully')
    }
    if (deactivateSuccess) {
      toast.success('Notice deactivated successfully')
    }

    handleChecked([])
    dispatch(notice?.actions.getNotice(params))
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
      dispatch(notice.actions.activateNotice(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const deactivateSelectedData = () => {
    if (!isEmpty(checkedValues)) {
      const formData: any = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(notice.actions.deactivateNotice(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const handleChecked = (values: any) => {
    setCheckedValues(values)
  }

  const data = noticesData?.data?.notice
    ? noticesData?.data?.notice?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        name: item?.name,
        name_np: item?.name_np,
        description: item?.description,
        description_np: item?.description_np,
        published_date: item?.published_date
          ? moment(item?.published_date, 'YYYY-MM-DD').toDate()
          : null,
        category: item?.subCategory?.category?.name,
        categoryId: item?.subCategory?.category?.id,
        subCategory: item?.subCategory?.name,
        subCategoryId: item?.subCategory?.id,
        status: item?.status,
        show_pop_up: item?.show_pop_up,
        image: item?.image,
        image_np: item?.image_np,
        slug: item?.slug,
        attached_file_title: item?.attached_file_title,
        attached_file_title_np: item?.attached_file_title_np,
        attached_file: item?.attached_file,
        expiry_date: item?.expiry_date ? moment(item?.expiry_date, 'YYYY-MM-DD').toDate() : null,
        expiry_time: item?.expiry_time
          ? moment(`${getTodayDate()} ${item?.expiry_time}`).toDate()
          : null,
        published_time: item?.published_time
          ? moment(`${getTodayDate()} ${item?.published_time}`).toDate()
          : null,
        showing_day: item?.showing_days,
      }))
    : []

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen(true)
    setActionType('Add')
  }

  const modalSubmit = () => {
    let id = checkedValues?.map((value) => ({id: value}))
    dispatch(notice?.actions?.deleteNotice(id))
    handleAlertClose()
  }
  const handleRefresh = () => {
    dispatch(notice?.actions.getNotice(params))
  }

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Notices'
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
            showLoading={noticesData?.loading}
            handleSort={handleSort}
            checkedValues={checkedValues}
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
            total={noticesData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
          {open && (
            <AddNotice
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

export default Notices
