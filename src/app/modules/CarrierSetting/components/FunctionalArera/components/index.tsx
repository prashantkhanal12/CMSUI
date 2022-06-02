import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Table from 'rsuite/Table'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import parse from 'html-react-parser'
import Tag from 'rsuite/Tag'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {toast} from 'react-toastify'
import {SortType} from 'rsuite-table/lib/@types/common'
import {isEmpty} from 'lodash'
import moment from 'moment'

//Manual import
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import DesignComponent from 'src/app/modules/common/components/designComponent'
import * as functionalAreaRedux from '../../FunctionalArera/redux'
import {imageBaseUrl} from 'src/cms/helpers/constants'
import AddPosition from './AddFunctionalArera'
import {IFunctionalAreaState} from 'src/app/modules/CarrierSetting/components/FunctionalArera/redux'
import AddFunctionalArea from './AddFunctionalArera'

const FunctionalArea = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
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

  const functionalAreaData: IFunctionalAreaState = useSelector((state: any) => state.functionalArea)

  useEffect(() => {
    dispatch(functionalAreaRedux.actions.getFunctionalArea(params))
  }, [params])
  const {
    loading,
    singleEnableSuccess,
    singleDisableSuccess,
    enableSuccess,
    disableSuccess,
    toggleLoading,
    success,
    deleteSuccess,
    sortFunctionalAreaData,
  } = useSelector((state: any) => state.functionalArea)

  const [checkedValues, setCheckedValues] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<any>()

  // alert modal
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)
  const [openSortModal, setOpenSortModal] = useState(false)

  const enablePositionData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(functionalAreaRedux.actions.enableFunctionalArea(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const disablePositionData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(functionalAreaRedux.actions.disableFunctionalArea(formData))
    } else {
      toast.error('No data Selected')
    }
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
                let functionalAreaId = [rowData.id]
                setCheckedValues(functionalAreaId)
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
      ? dispatch(functionalAreaRedux.actions.singleDisableFunctionalArea({id: data.id}))
      : dispatch(functionalAreaRedux.actions.singleEnableFunctionalArea({id: data.id}))
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
      label: 'Name (EN)',
      dataKey: 'name',
      flexGrow: 1,
      cell: <Cell dataKey='name' />,
      sortable: true,
    },
    {
      label: 'Name (NP)',
      dataKey: 'nameNp',
      flexGrow: 1,
      cell: <Cell dataKey='nameNp' />,
      sortable: true,
    },
    {
      label: 'Description (EN)',
      dataKey: 'description',
      flexGrow: 1,
      cell: <Cell>{(rowData) => parse(rowData?.description)}</Cell>,
      sortable: true,
    },
    {
      label: 'Description (NP)',
      dataKey: 'descriptionNp',
      flexGrow: 1,
      cell: <Cell>{(rowData) => parse(rowData?.descriptionNp)}</Cell>,
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

  const handleChecked = (values: Array<string>) => {
    setCheckedValues(values)
  }

  useEffect(() => {
    if (deleteSuccess) {
      toast.success('Functional Arera deleted successfully')
    }
    if (enableSuccess) {
      toast.success('Functional Arera enabled successfully')
    }
    if (disableSuccess) {
      toast.success('Functional Arera disabled successfully')
    }
    handleChecked([])
    dispatch(functionalAreaRedux?.actions.getFunctionalArea(params))
  }, [deleteSuccess, success, enableSuccess, disableSuccess])

  useEffect(() => {
    if (singleEnableSuccess) {
      toast.success('Position enabled successfully')
    }
    if (singleDisableSuccess) {
      toast.success('Position disabled successfully')
    }
    handleChecked([])
  }, [singleDisableSuccess, singleEnableSuccess])

  const data: any = functionalAreaData?.data?.functionalArea
    ? functionalAreaData?.data?.functionalArea?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item.id,
        name: item.name,
        nameNp: item.nameNp,
        description: item.description,
        descriptionNp: item.descriptionNp,
        status: item.status,
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
    let area = checkedValues?.map((value) => ({id: value}))
    dispatch(functionalAreaRedux?.actions.deleteFunctionalArea(area))
    handleAlertClose()
  }
  const handleRefresh = () => {
    dispatch(functionalAreaRedux.actions.getFunctionalArea(params))
  }

  const handleGetAllData = () => {
    setParams({...params, limit: functionalAreaData?.data?.meta?.total})
    dispatch(functionalAreaRedux.actions.getAllFunctionalArea())
  }

  const handleSubmitSort = (data: Array<ItemType>) => {
    let body = {
      functionalAreaId: data?.map((item) => ({id: item?.keyId})),
    }

    // dispatch(positionRedux.actions.sortPosition(body))
  }

  useEffect(() => {
    if (!isEmpty(sortFunctionalAreaData) && success) {
      toast.success('Position sorted successfully')
      dispatch(functionalAreaRedux.actions.sortFunctionalAreaReset())
      setParams({...params, limit: 10})
      dispatch(functionalAreaRedux.actions.getFunctionalArea(params))
      setOpenSortModal(false)
    }
  }, [sortFunctionalAreaData, success])

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Functional Area'
          params={params}
          setParams={setParams}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          handleRefresh={handleRefresh}
          exportShow={false}
          importShow={false}
          enableMultiple={enablePositionData}
          disableMultiple={disablePositionData}
          data={data}
          sortShow={true}
          sortButtonName='Sort'
          handleSubmitSort={handleSubmitSort}
          // handleGetAllData={handleGetAllData}
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
            checkedValues={checkedValues}
            showLoading={functionalAreaData?.loading}
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
            total={functionalAreaData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
          {open && (
            <AddFunctionalArea
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
              handleClose={() => handleAlertClose()}
              isOpen={alertOpen}
            />
          ) : (
            toast.error('No data selected') && setAlertOpen(false)
          ))}
      </div>
    </>
  )
}

export default FunctionalArea
