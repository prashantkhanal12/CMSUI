import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AiOutlineEdit} from 'react-icons/ai'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import {toast} from 'react-toastify'
import {Table, IconButton, Whisper, Tooltip, Toggle, Pagination, Tag} from 'rsuite'
import TrashIcon from '@rsuite/icons/Trash'
import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import {SortType} from 'rsuite-table/lib/@types/common'
import AddCsr from './AddCsr'
import {EmptyObject} from 'chart.js/types/basic'
import {CsrModel} from '../Model'
import DeleteModal from 'src/app/modules/common/components/deleteModal'

import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import {ICsrState} from '../../csr/redux/reducer'
import * as csr from '../index'
import {isEmpty} from 'lodash'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const Cell = Table.Cell

const Csr = () => {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const [selectedData, setSelectedData] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<CsrModel | EmptyObject>({})
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }

  const csrData: ICsrState = useSelector((state: any) => {
    return state.csr
  })

  const {success, loading, csrList, sortCsrData} = csrData

  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)
  const [openSortModal, setOpenSortModal] = useState(false)

  useEffect(() => {
    if (csrData?.deleteSuccess) {
      toast.success('CSR deleted successfully')
    }
    if (csrData?.activateSuccess) {
      toast.success('CSR activated successfully')
    }
    if (csrData?.deactivateSuccess) {
      toast.success('CSR deactivated successfully')
    }
    handleCheck([])
    dispatch(csr?.actions.getCsrData(params))
  }, [csrData?.deleteSuccess, csrData?.activateSuccess, csrData?.deactivateSuccess])

  useEffect(() => {
    if (csrData?.singleActivateSuccess) {
      toast.success('CSR activated successfully')
    }
    if (csrData?.singleDeactivateSuccess) {
      toast.success('CSR deactivated successfully')
    }
    handleCheck([])
  }, [csrData?.singleActivateSuccess, csrData?.singleDeactivateSuccess])

  const data = csrData?.data?.csr
    ? csrData?.data?.csr?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        name: item?.title,
        description: item?.description,
        descriptionNp: item?.descriptionNp,
        shortDescription: item?.shortDescription,
        shortDescriptionNp: item?.shortDescriptionNp,
        thumbnailImage: item?.thumbnailImage,
        title: item?.title,
        titleNp: item?.titleNp,
        slug: item?.slug,
        fileType: item?.fileType,
        file: item?.file,
        status: item?.status,
        albumId: item?.album?.id,
      }))
    : []

  const handleToggleAction = (data: {[key: string]: string}) => {
    const formData = {id: data?.id}
    data?.status
      ? dispatch(csr.actions.singleDeactivateCsr(formData))
      : dispatch(csr.actions.singleActivateCsr(formData))
  }

  const ActionCell = ({rowData, dataKey, ...props}: any) => {
    return (
      <Cell {...props} className='link-group'>
        <IconButton
          appearance='subtle'
          onClick={() => {
            setEditCheckedData(rowData)
            setActionType('Edit')
            setOpen(true)
          }}
          icon={<AiOutlineEdit />}
        />
        <CheckPermissions type='Delete'>
          <Whisper placement='top' trigger='hover' speaker={<Tooltip>Delete</Tooltip>}>
            <IconButton
              appearance='subtle'
              onClick={() => {
                handleAlertOpen()
                let csrId = [rowData.id]
                setSelectedData(csrId)
              }}
              icon={<TrashIcon />}
            />
          </Whisper>
        </CheckPermissions>
        <Whisper placement='top' trigger='hover' speaker={<Tooltip>Status</Tooltip>}>
          <Toggle
            size='sm'
            checked={rowData.status}
            disabled={csrData?.toggleLoading}
            onClick={() => handleToggleAction(rowData)}
          />
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
      label: 'CSR Title',
      dataKey: 'name',
      flexGrow: 1,
      cell: <Cell dataKey='title' />,
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

  const handleClose = () => setOpen(false)

  const handleCheck = (data: any) => {
    setSelectedData(data)
  }

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  useEffect(() => {
    dispatch(csr?.actions.getCsrData(params))
  }, [params])

  const activateSelectedData = () => {
    if (!isEmpty(selectedData)) {
      const formData: any = selectedData.map((d: string) => ({
        id: d,
      }))
      dispatch(csr.actions.activateCsr(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const deactivateSelectedData = () => {
    if (!isEmpty(selectedData)) {
      const formData: any = selectedData.map((d: string) => ({
        id: d,
      }))
      dispatch(csr.actions.deactivateCsr(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen(true)
    setActionType('Add')
  }
  const handleDelete = () => {
    let csrSelectedId = selectedData?.map((value) => ({id: value}))
    dispatch(csr?.actions.deleteCsrItem(csrSelectedId))

    handleAlertClose()
  }
  const handleGetAllData = () => {
    setParams({...params, limit: csrData?.data?.meta?.total})
    dispatch(csr?.actions.getCsrData(params))
  }

  const handleSubmitSort = (data: Array<ItemType>) => {
    let body = {
      csrLists: data?.map((item) => ({csrId: item?.keyId})),
    }

    dispatch(csr.actions.sortCsr(body))
  }

  useEffect(() => {
    if (!isEmpty(sortCsrData) && success) {
      toast.success('CSR sorted successfully')
      dispatch(csr.actions.sortCsrReset())
      setParams({...params, limit: 10})
      dispatch(csr.actions.getCsrData(params))
      setOpenSortModal(false)
    }
  }, [sortCsrData, success])

  const handleRefresh = () => {
    dispatch(csr?.actions.getCsrData(params))
  }

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='CSR Manager'
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
            showCheckbox={true}
            columns={columns}
            data={data}
            checkedValues={selectedData}
            showLoading={csrData?.loading}
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
            className='mt-5'
            maxButtons={5}
            size='sm'
            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
            total={csrData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />

          {open && (
            <AddCsr
              open={open}
              params={params}
              handleClose={handleClose}
              actionType={actionType}
              editSelectedData={editSelectedData}
            />
          )}
        </div>
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
      </div>{' '}
    </>
  )
}

export default Csr
