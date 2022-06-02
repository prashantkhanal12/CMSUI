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

import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import * as subCategory from '../index'
import * as categoryType from 'src/app/modules/common'
import {ISubCategoryState} from '../../subCategory/redux/reducer'

import DeleteModal from 'src/app/modules/common/components/deleteModal'
import {isEmpty} from 'lodash'
import AddSubCategory from './AddSubCategory'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const SubCategory = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
    orderBy: 'order',
  })
  const [checkedValues, setCheckedValues] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<any>()
  const [selectedData, setSelectedData] = useState<Array<string>>([])
  // alert modal
  const [openSortModal, setOpenSortModal] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)
  const subCategoryData: ISubCategoryState = useSelector((state: any) => state.subCategory)
  const {
    activateSuccess,
    deactivateSuccess,
    singleActivateSuccess,
    singleDeactivateSuccess,
    success,
    loading,
    sortNewsSubCategoryData,
  } = subCategoryData

  // const { data: categoryTypeData } = useSelector((state: any) => state.categoryType)

  useEffect(() => {
    dispatch(subCategory.actions.getSubCategory(params))
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
      ? dispatch(subCategory.actions.singleDeactivateSubCategory(formData))
      : dispatch(subCategory.actions.singleActivateSubCategory(formData))
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
      label: 'Sub Category Name',
      dataKey: 'name',
      flexGrow: 1,
      cell: <Cell dataKey='name' />,
      sortable: true,
    },
    {
      label: 'Category type',
      dataKey: 'type',
      flexGrow: 1,
      cell: <Cell dataKey='type' />,
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
    if (subCategoryData?.deleteSuccess) {
      toast.success('Category deleted successfully')
      dispatch(subCategory?.actions.getSubCategory(params))
    }
  }, [subCategoryData])

  // active/deactive section

  useEffect(() => {
    if (singleActivateSuccess) {
      toast.success('Category activated successfully')
    }
    if (singleDeactivateSuccess) {
      toast.success('Category deactivated successfully')
    }
    handleChecked([])
  }, [singleActivateSuccess, singleDeactivateSuccess])

  useEffect(() => {
    if (activateSuccess) {
      toast.success('Category activated successfully')
    }
    if (deactivateSuccess) {
      toast.success('Category deactivated successfully')
    }
    handleChecked([])
    dispatch(subCategory?.actions.getSubCategory(params))
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
      dispatch(subCategory.actions.activateSubCategory(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const deactivateSelectedData = () => {
    if (!isEmpty(checkedValues)) {
      const formData: any = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(subCategory.actions.deactivateSubCategory(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const handleChecked = (values: any) => {
    setCheckedValues(values)
  }

  const data = subCategoryData?.data?.subCategory
    ? subCategoryData?.data?.subCategory?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        name: item?.name,
        name_np: item?.name_np,
        description: item?.description,
        description_np: item?.description_np,
        order: item?.order,
        type: item?.category?.typeId?.display_name,
        categoryTypeId: item?.category?.typeId?.id,
        category: item?.category?.name,
        categoryId: item?.category?.id,
        status: item?.status,
      }))
    : []

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen(true)
    setActionType('Add')
  }

  const modalSubmit = () => {
    let id = checkedValues?.map((value) => ({id: value}))
    dispatch(subCategory?.actions?.deleteSubCategory(id))
    handleAlertClose()
  }

  const handleRefresh = () => {
    dispatch(subCategory?.actions.getSubCategory(params))
  }
  const handleGetAllData = () => {
    setParams({...params, limit: subCategoryData?.data?.meta?.total})
    dispatch(subCategory?.actions.getSubCategory(params))
  }

  const handleSubmitSort = (data: Array<ItemType>) => {
    let body = {
      subCategoryId: data?.map((item) => ({id: item?.keyId})),
    }
    dispatch(subCategory?.actions.sortNewSubCategory(body))
  }

  useEffect(() => {
    if (!isEmpty(sortNewsSubCategoryData) && success) {
      toast.success('Sub category sorted successfully')
      dispatch(subCategory.actions.sortNewSubCategoryReset())
      setParams({...params, limit: 10})
      dispatch(subCategory.actions.getSubCategory(params))
      setOpenSortModal(false)
    }
  }, [sortNewsSubCategoryData, success])

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Sub Category'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
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
            onChecked={handleChecked}
            showCheckbox={true}
            columns={columns}
            data={data}
            showLoading={subCategoryData?.loading}
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
            total={subCategoryData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
          {open && (
            <AddSubCategory
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

export default SubCategory
