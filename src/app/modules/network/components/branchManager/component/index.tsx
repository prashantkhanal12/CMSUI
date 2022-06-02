import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'
import Modal from 'rsuite/Modal'
import Input from 'rsuite/Input'
import InputGroup from 'rsuite/InputGroup'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Tag from 'rsuite/Tag'
import Whisper from 'rsuite/Whisper'
// icons
import {FaPlus, FaCircle} from 'react-icons/fa'
import {FiCircle} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'

// includes
import * as managerRedux from '../'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import SearchIcon from '@rsuite/icons/Search'
import {StateParamsModel} from 'src/app/modules/common/Model'
import {SortType} from 'rsuite-table/lib/@types/common'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import AddBranchManager from './AddBranchManager'
import RemindOutlineIcon from '@rsuite/icons/RemindOutline'
import {toast} from 'react-toastify'
import {isEmpty} from 'lodash'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const BranchManagerComponent = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const {
    data,
    loading,
    importSuccess,
    exportSuccess,
    singleEnableSuccess,
    singleDisableSuccess,
    enableSuccess,
    disableSuccess,
    success,
    deleteSuccess,
    toggleLoading,
  } = useSelector((state: any) => state.manager)
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

  //Export Modal
  const [exportModal, setExportModal] = useState(false)
  const handleExportAlert = () => setExportModal(true)
  const handleExportClose = () => setExportModal(false)

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }

  const enableBranchManagerData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(managerRedux.actions.enableBranchManager(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const disableBranchManagerData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(managerRedux.actions.disableBranchManager(formData))
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
                let managerId = [rowData.id]
                setCheckedValues(managerId)
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
      ? dispatch(managerRedux.actions.singleDisableBranchManager({id: data.id}))
      : dispatch(managerRedux.actions.singleEnableBranchManager({id: data.id}))
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
      label: 'Email',
      dataKey: 'email',
      flexGrow: 1,
      cell: <Cell>{(rowData) => (rowData.email ? rowData.email : '-')}</Cell>,
      sortable: true,
    },
    {
      label: 'Branch',
      dataKey: 'branch',
      flexGrow: 1,
      cell: <Cell>{(rowData) => rowData.branch.title}</Cell>,
      sortable: false,
    },
    {
      label: 'Manager Phone No.',
      dataKey: 'managerPhone',
      flexGrow: 1,
      cell: <Cell>{(rowData) => (rowData.managerPhone ? rowData.managerPhone : '-')}</Cell>,
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
    dispatch(managerRedux.actions.getBranchManagerData(params))
  }, [params])

  const handleChecked = (values: Array<string>) => {
    setCheckedValues(values)
  }

  useEffect(() => {
    if (deleteSuccess) {
      toast.success('Branch manager deleted successfully')
    }
    if (enableSuccess) {
      toast.success('Branch manager enabled successfully')
    }
    if (disableSuccess) {
      toast.success('Branch manager disabled successfully')
    }
    if (importSuccess) {
      toast.success('Branch manager imported successfully')
    }
    handleChecked([])
    dispatch(managerRedux.actions.getBranchManagerData(params))
  }, [deleteSuccess, success, enableSuccess, disableSuccess, importSuccess, exportSuccess])

  useEffect(() => {
    if (singleEnableSuccess) {
      toast.success('Branch manager enabled successfully')
    }
    if (singleDisableSuccess) {
      toast.success('Branch manager disabled successfully')
    }
    handleChecked([])
  }, [singleDisableSuccess, singleEnableSuccess])

  const managerData = data?.manager
    ? data?.manager?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        branch: item.branch,
        branchManagerImage: item.branchManagerImage,
        email: item.email,
        hideInWebsite: item.hideInWebsite,
        managerPhone: item.managerPhone,
        id: item.id,
        name: item.name,
        nameNp: item.nameNp,
        phone: item.phone,
        status: item.status,
      }))
    : []

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  function fileImport(event: any) {
    if (!isEmpty(event.target.files)) {
      let formData = new FormData()
      formData.append('file', event.target.files[0])
      dispatch(managerRedux?.actions?.importBranchManager(formData))
      event.target.value = null
    }
  }

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen(true)
    setActionType('Add')
  }

  const handleExport = () => {
    dispatch(managerRedux.actions.exportFile('Branch Manager Data', params))
  }

  const handleTemplateExport = () => {
    dispatch(managerRedux.actions.exportTemplateFile())
  }

  const handleDelete = () => {
    let manager = checkedValues?.map((value) => ({id: value}))
    dispatch(managerRedux?.actions?.deleteBranchManager(manager))
    handleAlertClose()
  }

  const handleRefresh = () => {
    dispatch(managerRedux.actions.getBranchManagerData(params))
  }

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Branch Manager'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          handleExport={handleExport}
          handleImport={fileImport}
          enableMultiple={enableBranchManagerData}
          disableMultiple={disableBranchManagerData}
          templateButtonName='Download Template for Branch Manager'
          templateLinkShow={true}
          handleTemplateExport={handleTemplateExport}
        />

        <div className='datatable'>
          <RSuiteTable
            onChecked={handleChecked}
            showCheckbox={true}
            columns={columns}
            data={managerData}
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
            <AddBranchManager
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

export default BranchManagerComponent
