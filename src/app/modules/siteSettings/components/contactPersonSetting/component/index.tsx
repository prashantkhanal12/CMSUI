import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'
import Tag from 'rsuite/Tag'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
// includes
import * as contactPersonRedux from '../index'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import {SortType} from 'rsuite-table/lib/@types/common'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import {toast} from 'react-toastify'
import {isEmpty} from 'lodash'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import DesignComponent from 'src/app/modules/common/components/designComponent'
import AddContactPerson from './AddContactPerson'

const ContactPersonComponent = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const {data, loading, success, deleteSuccess, sortContactPersonData} = useSelector(
    (state: any) => state.contactPerson
  )
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
  const [openSortModal, setOpenSortModal] = useState(false)

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
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
                let branchId = [rowData.id]
                setCheckedValues(branchId)
              }}
              icon={<TrashIcon />}
            />
          </Whisper>
        </CheckPermissions>
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
      label: 'Name',
      dataKey: 'name',
      flexGrow: 1,
      cell: <Cell dataKey='name' />,
      sortable: true,
    },
    {
      label: 'Designation',
      dataKey: 'designation',
      flexGrow: 1,
      cell: <Cell dataKey='designation' />,
      sortable: true,
    },
    {
      label: 'Email',
      dataKey: 'email',
      flexGrow: 1,
      cell: <Cell dataKey='email' />,
      sortable: true,
    },

    {
      label: 'Action',
      width: 150,
      align: 'center',
      cell: <ActionCell dataKey='id' />,
    },
  ]

  useEffect(() => {
    dispatch(contactPersonRedux.actions.getContactPerson(params))
  }, [params])

  const handleChecked = (values: Array<string>) => {
    setCheckedValues(values)
  }

  useEffect(() => {
    if (deleteSuccess) {
      toast.success('Contact person deleted successfully')
    }

    handleChecked([])
    dispatch(contactPersonRedux.actions.getContactPerson(params))
  }, [deleteSuccess])

  const contactPersonData = data?.contactPersonSetting
    ? data?.contactPersonSetting?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        designation: item.designation,
        id: item.id,
        name: item.name,
        nameNp: item.nameNp,
        email: item.email,
        image: item.image,
        order: item.order,
        extension: item.extension,
        mobile_numbers: item.mobileNumber.map((item: {[key: string]: string}) => ({
          id: item.id,
          data: item.mobile_number,
        })),
        phone_numbers: item.phoneNumber.map((item: {[key: string]: string}) => ({
          id: item.id,
          data: item.phone_number,
        })),
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
    let contactPersonId = checkedValues?.map((value) => ({id: value}))
    dispatch(contactPersonRedux?.actions?.deleteContactPerson(contactPersonId))
    handleAlertClose()
  }

  const handleRefresh = () => {
    dispatch(contactPersonRedux.actions.getContactPerson(params))
  }

  const handleSubmitSort = (data: Array<ItemType>) => {
    let body = {
      contactPersonSettingId: data?.map((item) => ({id: item?.keyId})),
    }
    dispatch(contactPersonRedux?.actions.sortContactPerson(body))
  }

  useEffect(() => {
    if (!isEmpty(sortContactPersonData) && success) {
      toast.success('Contact person sorted successfully')
      dispatch(contactPersonRedux.actions.sortContactPersonReset())
      dispatch(contactPersonRedux.actions.getContactPerson(params))
      setOpenSortModal(false)
    }
  }, [sortContactPersonData, success])

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Contact Person'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          toggleMultipleShow={false}
          exportShow={false}
          importShow={false}
          data={contactPersonData}
          sortShow={true}
          sortButtonName='Sort'
          handleSubmitSort={handleSubmitSort}
          openSortModal={openSortModal}
          setOpenSortModal={setOpenSortModal}
          loading={loading}
        />

        <div className='datatable'>
          <RSuiteTable
            onChecked={handleChecked}
            showCheckbox={true}
            columns={columns}
            data={contactPersonData}
            checkedValues={checkedValues}
            showLoading={loading}
            handleSort={handleSort}
          />
          {/* <Pagination
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
          /> */}
          {open && (
            <AddContactPerson
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

export default ContactPersonComponent
