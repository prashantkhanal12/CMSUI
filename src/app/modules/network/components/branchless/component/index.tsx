import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'
import Toggle from 'rsuite/Toggle'
import Whisper from 'rsuite/Whisper'
import Tooltip from 'rsuite/Tooltip'
import Pagination from 'rsuite/Pagination'
import Tag from 'rsuite/Tag'

// includes
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {toast} from 'react-toastify'
import {StateParamsModel} from 'src/app/modules/common/Model'
import {SortType} from 'rsuite-table/lib/@types/common'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import AddBranchless from './AddBranchless'
import * as branchless from '../index'
import {IBranchlessState} from '../../branchless/redux/reducer'

import DeleteModal from 'src/app/modules/common/components/deleteModal'
import {isEmpty} from 'lodash'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const BranchComponent = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [keyVisible, setKeyVisible] = useState(true)
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
  const branchlessData: IBranchlessState = useSelector((state: any) => state.branchless)
  const {
    activateSuccess,
    deactivateSuccess,
    singleActivateSuccess,
    singleDeactivateSuccess,
    deleteSuccess,
  } = branchlessData

  useEffect(() => {
    dispatch(branchless.actions.getBranchlessBanking(params))
  }, [params])

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }
  const handleToggleAction = (data: {[key: string]: string}) => {
    const formData = {id: data?.id}
    data?.status
      ? dispatch(branchless.actions.singleDeactivateBranchlessBanking(formData))
      : dispatch(branchless.actions.singleActivateBranchlessBanking(formData))
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
      label: 'Title',
      dataKey: 'title',
      flexGrow: 1,
      cell: <Cell dataKey='title' />,
      sortable: true,
    },
    {
      label: 'Address',
      dataKey: 'address',
      flexGrow: 1,
      cell: <Cell>{(rowData) => (rowData?.address ? rowData?.address : '-')}</Cell>,
      sortable: true,
    },
    {
      label: 'District',
      dataKey: 'district',
      flexGrow: 1,
      cell: <Cell>{(rowData) => (rowData?.districtId ? rowData?.districtId?.title : '-')}</Cell>,
      sortable: false,
    },
    {
      label: 'Province',
      dataKey: 'province',
      flexGrow: 1,
      cell: <Cell>{(rowData) => (rowData?.province ? rowData?.province : '-')}</Cell>,
      sortable: false,
    },
    {
      label: 'Contact Person',
      dataKey: 'contact_person',
      flexGrow: 1,
      cell: <Cell dataKey='contact_person' />,
      sortable: true,
    },
    {
      label: 'Contact No',
      dataKey: 'contact_number',
      flexGrow: 1,
      cell: <Cell>{(rowData) => (rowData?.contact_number ? rowData?.contact_number : '-')}</Cell>,
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
    if (branchlessData?.deleteSuccess) {
      toast.success('Branchless Banking deleted successfully')
      dispatch(branchless?.actions.getBranchlessBanking(params))
    }
  }, [branchlessData])

  // active/deactive section

  useEffect(() => {
    if (singleActivateSuccess) {
      toast.success('Branchless Banking activated successfully')
    }
    if (singleDeactivateSuccess) {
      toast.success('Branchless Banking deactivated successfully')
    }
    handleCheck([])
  }, [singleActivateSuccess, singleDeactivateSuccess])

  useEffect(() => {
    if (activateSuccess) {
      toast.success('Branchless Banking activated successfully')
    }
    if (deactivateSuccess) {
      toast.success('Branchless Banking deactivated successfully')
    }

    handleChecked([])
    dispatch(branchless?.actions.getBranchlessBanking(params))
  }, [activateSuccess, deactivateSuccess])

  const handleCheck = (data: any) => {
    setSelectedData(data)
  }

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  const handleChecked = (values: any) => {
    setCheckedValues(values)
  }

  const data = branchlessData?.data?.branchlessBanking
    ? branchlessData?.data?.branchlessBanking?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        title: item?.title,
        title_np: item?.title_np,
        address: item?.address,
        address_np: item?.address_np,
        contact_person: item?.contact_person,
        contact_person_np: item?.contact_person_np,
        contact_number: item?.contact_number,
        district: item?.district?.title,
        province: item?.province?.title,
        districtId: item?.district,
        provinceId: item?.province,
        status: item?.status,
      }))
    : []

  const modalSubmit = () => {
    let branchlessBankingId = checkedValues?.map((value) => ({id: value}))
    dispatch(branchless?.actions?.deleteBranchlessBanking(branchlessBankingId))
    handleAlertClose()
  }

  const handleAddModal = () => {
    setEditCheckedData({})
    setActionType('Add')
    setOpen(true)
  }

  const handleExport = () => {
    dispatch(branchless.actions.exportFile('Branchless Data', params))
  }
  const handleRefresh = () => {
    dispatch(branchless?.actions.getBranchlessBanking(params))
  }

  return (
    <div className='shadow p-3 bg-white rounded'>
      <DesignComponent
        moduleName='Branchless Banking'
        params={params}
        setParams={setParams}
        handleRefresh={handleRefresh}
        handleAddModal={handleAddModal}
        handleAlertOpen={handleAlertOpen}
        handleExport={handleExport}
        toggleMultipleShow={false}
        importShow={false}
      />

      <div className='datatable'>
        <RSuiteTable
          onChecked={handleChecked}
          showCheckbox={true}
          columns={columns}
          data={data}
          showLoading={branchlessData?.loading}
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
          total={branchlessData?.data?.meta?.total || 0}
          limitOptions={[10, 20, 50, 100]}
          limit={params?.limit}
          activePage={params?.page}
          onChangePage={(value) => setParams({...params, page: value})}
          onChangeLimit={handleChangeLimit}
        />
        {open && (
          <AddBranchless
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
  )
}

export default BranchComponent
