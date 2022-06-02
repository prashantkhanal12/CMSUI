import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'
import {Tag, Toggle} from 'rsuite'

// icons
import {isEmpty} from 'lodash'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {toast} from 'react-toastify'
import {SortType} from 'rsuite-table/lib/@types/common'

// includes
import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import * as categories from '../index'
import * as categoryType from 'src/app/modules/common'
import {ICmsCategoriesState} from '../../categories/redux/reducer'

import DeleteModal from 'src/app/modules/common/components/deleteModal'
import AddCategory from './AddCategory'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const Cell = Table.Cell

const Categories = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })
  const [checkedValues, setCheckedValues] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<any>()
  const [openSortModal, setOpenSortModal] = useState(false)
  const [selectedData, setSelectedData] = useState<Array<string>>([])
  // alert modal
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)
  const cmsCategoriesData: ICmsCategoriesState = useSelector((state: any) => state.categories)
  const {
    activateSuccess,
    deactivateSuccess,
    singleActivateSuccess,
    singleDeactivateSuccess,
    sortCategoriesData,
    success,
    loading,
  } = cmsCategoriesData

  useEffect(() => {
    dispatch(categories.actions.getCmsCategories(params))
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
      ? dispatch(categories.actions.singleDeactivateCmsCategories(formData))
      : dispatch(categories.actions.singleActivateCmsCategories(formData))
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
          <IconButton
            appearance='subtle'
            onClick={() => {
              handleAlertOpen()
              let keySettingId = [rowData.id]
              setCheckedValues(keySettingId)
            }}
            icon={<TrashIcon />}
          />
        </CheckPermissions>

        <Toggle size='sm' checked={rowData.status} onClick={() => handleToggleAction(rowData)} />
      </Cell>
    )
  }

  const handleClose = () => setOpen(false)

  const columns = [
    {
      label: 'S.N.',
      dataKey: 'sn',
      width: 60,
      cell: <Cell dataKey='sn' />,
    },
    {
      label: 'Category Name',
      dataKey: 'name',
      flexGrow: 1,
      cell: <Cell dataKey='name' />,
      sortable: true,
    },
    {
      label: 'Type',
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
    if (cmsCategoriesData?.deleteSuccess) {
      toast.success('Category deleted successfully')
      dispatch(categories?.actions.getCmsCategories(params))
    }
  }, [cmsCategoriesData])

  // active/deactive section

  useEffect(() => {
    if (singleActivateSuccess) {
      toast.success('Category activated successfully')
    }
    if (singleDeactivateSuccess) {
      toast.success('Category deactivated successfully')
    }
    handleCheck([])
  }, [singleActivateSuccess, singleDeactivateSuccess])

  useEffect(() => {
    if (activateSuccess) {
      toast.success('Category activated successfully')
    }
    if (deactivateSuccess) {
      toast.success('Category deactivated successfully')
    }

    handleChecked([])
    dispatch(categories?.actions.getCmsCategories(params))
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
      dispatch(categories.actions.activateCmsCategories(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const deactivateSelectedData = () => {
    if (!isEmpty(checkedValues)) {
      const formData: any = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(categories.actions.deactivateCmsCategories(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const handleChecked = (values: any) => {
    setCheckedValues(values)
  }

  const data = cmsCategoriesData?.data?.category
    ? cmsCategoriesData?.data?.category?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        name: item?.name,
        name_np: item?.nameNp,
        order: item?.order,
        slug: item?.slug,
        type: item?.typeId?.display_name,
        categoryTypeId: item?.typeId?.id,
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
    dispatch(categories?.actions?.deleteCmsCategories(id))
    handleAlertClose()
  }

  const handleGetAllData = () => {
    setParams({...params, limit: cmsCategoriesData?.data?.meta?.total})
    dispatch(categories?.actions.getCmsCategories(params))
  }

  const handleSubmitSortCategory = (data: Array<ItemType>) => {
    let body = {
      categoryId: data?.map((item) => ({id: item?.keyId})),
    }
    dispatch(categories.actions.sortCategories(body))
  }

  const handleRefresh = () => {
    dispatch(categories.actions.getCmsCategories(params))
  }
  useEffect(() => {
    if (!isEmpty(sortCategoriesData) && success) {
      toast.success('Category sorted successfully')
      dispatch(categories?.actions.sortCategoriesReset())
      setParams({...params, limit: 10})
      dispatch(categories?.actions.getCmsCategories(params))
      setOpenSortModal(false)
    }
  }, [sortCategoriesData, success])
  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Categories'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          exportShow={false}
          importShow={false}
          enableMultiple={activateSelectedData}
          disableMultiple={deactivateSelectedData}
          sortShow={true}
          sortButtonName='Sort'
          data={data}
          handleSubmitSort={handleSubmitSortCategory}
          openSortModal={openSortModal}
          setOpenSortModal={setOpenSortModal}
        />

        <div className='datatable'>
          <RSuiteTable
            onChecked={handleChecked}
            showCheckbox={true}
            columns={columns}
            checkedValues={checkedValues}
            data={data}
            showLoading={cmsCategoriesData?.loading}
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
            total={cmsCategoriesData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
          {open && (
            <AddCategory
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

export default Categories
