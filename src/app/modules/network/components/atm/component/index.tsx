import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import Tag from 'rsuite/Tag'

// includes
import * as atm from '../index'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {StateParamsModel} from 'src/app/modules/common/Model'
import {SortType} from 'rsuite-table/lib/@types/common'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import {toast} from 'react-toastify'
import {isEmpty} from 'lodash'
import AddAtm from './AddAtm'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const AtmComponent = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const {
    data,
    loading,
    toggleLoading,
    importSuccess,
    exportSuccess,
    singleEnableSuccess,
    singleDisableSuccess,
    enableSuccess,
    disableSuccess,
    success,
    deleteSuccess,
  } = useSelector((state: any) => state.atm)
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })

  const [checkedValues, setCheckedValues] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<any>()

  // alert modal
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }

  const enableAtmData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(atm.actions.enableAtm(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const disableAtmData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(atm.actions.disableAtm(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const ActionCell = ({rowData, dataKey, ...props}: any) => {
    function handleAction() {
      alert(`id:${rowData[dataKey]}`)
    }
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
                let atmId = [rowData.id]
                setCheckedValues(atmId)
              }}
              icon={<TrashIcon />}
            />
          </Whisper>
        </CheckPermissions>
        <Whisper placement='top' trigger='hover' speaker={<Tooltip>Status</Tooltip>}>
          <Toggle
            size='sm'
            checked={rowData.status}
            disabled={toggleLoading}
            onClick={() => handleToggleAction(rowData)}
          />
        </Whisper>
      </Cell>
    )
  }

  const handleToggleAction = (data: {[key: string]: string}) => {
    data?.status
      ? dispatch(atm.actions.singleDisableAtm({id: data.id}))
      : dispatch(atm.actions.singleEnableAtm({id: data.id}))
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
      label: 'Name',
      dataKey: 'name',
      flexGrow: 1,
      cell: <Cell dataKey='name' />,
      sortable: true,
    },
    {
      label: 'Address',
      dataKey: 'address',
      flexGrow: 1,
      cell: <Cell>{(rowData) => (rowData.address ? rowData.address : '-')}</Cell>,
      sortable: true,
    },
    {
      label: 'Contact',
      dataKey: 'contact',
      flexGrow: 1,
      cell: <Cell>{(rowData) => (rowData.contact ? rowData.contact : '-')}</Cell>,
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
    dispatch(atm.actions.getAtmData(params))
  }, [params])

  const handleChecked = (values: Array<string>) => {
    setCheckedValues(values)
  }

  useEffect(() => {
    if (deleteSuccess) {
      toast.success('ATM deleted successfully')
    }
    if (enableSuccess) {
      toast.success('ATM enabled successfully')
    }
    if (disableSuccess) {
      toast.success('ATM disabled successfully')
    }
    if (importSuccess) {
      toast.success('ATM imported successfully')
    }
    handleChecked([])
    dispatch(atm?.actions.getAtmData(params))
  }, [deleteSuccess, success, enableSuccess, disableSuccess, exportSuccess, importSuccess])

  useEffect(() => {
    if (singleEnableSuccess) {
      toast.success('ATM enabled successfully')
    }
    if (singleDisableSuccess) {
      toast.success('ATM disabled successfully')
    }
    handleChecked([])
  }, [singleDisableSuccess, singleEnableSuccess])

  const atmData = data?.atm
    ? data?.atm?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        address: item.address,
        addressNp: item.addressNp,
        category: item.category,
        description: item.description,
        descriptionNp: item.descriptionNp,
        district: item.district,
        id: item.id,
        latitude: item.latitude,
        longitude: item.longitude,
        province: item.province,
        status: item.status,
        contact: item.contact,
        name: item.name,
        nameNp: item.nameNp,
        googlePlusCode: item.googlePlusCode,
      }))
    : []

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  function fileImport(event: any) {
    if (!isEmpty(event.target.files)) {
      let formData = new FormData()
      formData.append('file', event.target.files[0])
      dispatch(atm?.actions?.importAtm(formData))
      event.target.value = null
    }
  }

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen(true)
    setActionType('Add')
  }

  const handleExport = () => {
    dispatch(atm.actions.exportFile('ATM Data', params))
  }

  const handleDelete = () => {
    let atmId = checkedValues?.map((value) => ({id: value}))
    dispatch(atm?.actions?.deleteAtm(atmId))
    handleAlertClose()
  }

  const handleRefresh = () => {
    dispatch(atm.actions.getAtmData(params))
  }

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='ATM'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          handleExport={handleExport}
          handleImport={fileImport}
          enableMultiple={enableAtmData}
          disableMultiple={disableAtmData}
        />

        <div className='datatable'>
          <RSuiteTable
            onChecked={handleChecked}
            showCheckbox={true}
            columns={columns}
            data={atmData}
            checkedValues={checkedValues}
            showLoading={loading}
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
            total={data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
          {open && (
            <AddAtm
              open={open}
              params={params}
              handleClose={handleClose}
              actionType={actionType}
              editSelectedData={editSelectedData}
            />
          )}
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
      </div>
    </>
  )
}

export default AtmComponent
