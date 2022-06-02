import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'
import {Tag, Toggle} from 'rsuite'

// includes
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {toast} from 'react-toastify'
import {SortType} from 'rsuite-table/lib/@types/common'
import {isEmpty} from 'lodash'

import {StateParamsModel} from 'src/app/modules/common/Model'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import AddOperationIncharge from './AddOperationIncharge'
import * as operationIncharge from '../index'
import {IOperationInchargeState} from '../../operationIncharge/redux/reducer'

import DeleteModal from 'src/app/modules/common/components/deleteModal'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const OperationIncharge = () => {
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
  const operationInchargeData: IOperationInchargeState = useSelector(
    (state: any) => state.operationIncharge
  )
  const {activateSuccess, deactivateSuccess, singleActivateSuccess, singleDeactivateSuccess} =
    operationInchargeData

  useEffect(() => {
    dispatch(operationIncharge.actions.getOperationIncharge(params))
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
      ? dispatch(operationIncharge.actions.singleDeactivateOperationIncharge(formData))
      : dispatch(operationIncharge.actions.singleActivateOperationIncharge(formData))
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
      label: 'Branch',
      dataKey: 'branch',
      flexGrow: 1,
      cell: <Cell dataKey='branch' />,
      sortable: false,
    },
    {
      label: 'Name',
      dataKey: 'name',
      flexGrow: 1,
      cell: <Cell dataKey='name' />,
      sortable: true,
    },
    {
      label: 'Email',
      dataKey: 'email',
      flexGrow: 1,
      cell: <Cell>{(rowData) => (rowData?.email ? rowData?.email : '-')}</Cell>,
      sortable: true,
    },
    // {
    //     label: 'Phone',
    //     dataKey: 'district',
    //     flexGrow: 1,
    //     cell: <Cell>{(rowData) => (rowData?.districtId ? rowData?.districtId?.title : '-')}</Cell>,
    //     sortable: false,
    // },
    {
      label: 'Phone',
      dataKey: 'phone',
      flexGrow: 1,
      cell: <Cell>{(rowData) => (rowData?.phone ? rowData?.phone : '-')}</Cell>,
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
    if (operationInchargeData?.deleteSuccess) {
      toast.success('Operation Incharge deleted successfully')
      dispatch(operationIncharge?.actions.getOperationIncharge(params))
    }
  }, [operationInchargeData])

  // active/deactive section

  useEffect(() => {
    if (singleActivateSuccess) {
      toast.success('Operation Incharge activated successfully')
    }
    if (singleDeactivateSuccess) {
      toast.success('Operation Incharge deactivated successfully')
    }
    handleChecked([])
  }, [singleActivateSuccess, singleDeactivateSuccess])

  useEffect(() => {
    if (activateSuccess) {
      toast.success('Operation Incharge activated successfully')
    }
    if (deactivateSuccess) {
      toast.success('Operation Incharge deactivated successfully')
    }

    handleChecked([])
    dispatch(operationIncharge?.actions.getOperationIncharge(params))
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
      dispatch(operationIncharge.actions.activateOperationIncharge(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const deactivateSelectedData = () => {
    if (!isEmpty(checkedValues)) {
      const formData: any = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(operationIncharge.actions.deactivateOperationIncharge(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const handleChecked = (values: any) => {
    setCheckedValues(values)
  }

  const data = operationInchargeData?.data?.operationIncharge
    ? operationInchargeData?.data?.operationIncharge?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        name: item?.name,
        name_np: item?.name_np,
        email: item?.email,
        phone: item?.phone,
        branch: item?.branch?.title,
        branchId: item?.branch?.id,
        status: item?.status,
        hidden_in_webiste: item?.hidden_in_website,
      }))
    : []

  const modalSubmit = () => {
    let operationInchargeBankingId = checkedValues?.map((value) => ({id: value}))
    dispatch(operationIncharge?.actions?.deleteOperationIncharge(operationInchargeBankingId))
    handleAlertClose()
  }

  function fileImport(event: any) {
    if (!isEmpty(event.target.files)) {
      let formData = new FormData()
      formData.append('file', event.target.files[0])
      dispatch(operationIncharge?.actions?.importOperationIncharge(formData))
      event.target.value = null
    }
  }

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen(true)
    setActionType('Add')
  }

  const handleExport = () => {
    dispatch(operationIncharge.actions.exportFile('Operation Incharge Data', params))
  }

  const handleRefresh = () => {
    dispatch(operationIncharge?.actions.getOperationIncharge(params))
  }

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Operation Incharge'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          handleExport={handleExport}
          handleImport={fileImport}
          enableMultiple={activateSelectedData}
          disableMultiple={deactivateSelectedData}
        />

        <div className='datatable'>
          <RSuiteTable
            onChecked={handleChecked}
            showCheckbox={true}
            columns={columns}
            data={data}
            showLoading={operationInchargeData?.loading}
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
            total={operationInchargeData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
          {open && (
            <AddOperationIncharge
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

export default OperationIncharge
