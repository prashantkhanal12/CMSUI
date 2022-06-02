import Pagination from 'rsuite/Pagination'
import Table from 'rsuite/Table'
import {useState, useEffect} from 'react'
import TrashIcon from '@rsuite/icons/Trash'
import {SortType} from 'rsuite-table/lib/@types/common'
import {useSelector, useDispatch} from 'react-redux'
import {EmptyObject} from 'chart.js/types/basic'
import IconButton from 'rsuite/IconButton'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import parse from 'html-react-parser'
import Tag from 'rsuite/Tag'
import {AiOutlineEdit} from 'react-icons/ai'
import {toast} from 'react-toastify'

//Manual import
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import {ItemType, StateParamsModel} from 'src/app/modules/common/Model'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import * as qualificationRedux from 'src/app/modules/CarrierSetting/components/Qualification/redux'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import {isEmpty} from 'lodash'
import DesignComponent from 'src/app/modules/common/components/designComponent'
import {IQualificationState} from 'src/app/modules/CarrierSetting/components/Qualification/redux'
import {QualificationModel} from 'src/app/modules/CarrierSetting/components/Qualification/Model'
import AddQualification from 'src/app/modules/CarrierSetting/components/Qualification/components/AddQualification'

const Cell = Table.Cell
const Qualification = () => {
  const dispatch = useDispatch()
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })
  const [allDataParams, setAllDataParams] = useState<StateParamsModel>({
    page: 0,
    limit: 0,
  })

  const [actionType, setActionType] = useState('Add')
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)
  const [open1, setOpen1] = useState(false)
  const [editSelectedData, setEditCheckedData] = useState<QualificationModel | EmptyObject>({})
  const [selectedData, setSelectedData] = useState<Array<string>>([])

  const handleClose1 = () => setOpen1(false)
  const [openSortModal, setOpenSortModal] = useState(false)
  const [checkedValues, setCheckedValues] = useState<Array<string>>([])

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }

  const qualificationData: IQualificationState = useSelector((state: any) => state.Qualification)
  useEffect(() => {
    dispatch(qualificationRedux.actions.getQualification(params))
  }, [params])
  const {
    success,
    activateSuccess,
    deactivateSuccess,
    singleActivateSuccess,
    singleDeactivateSuccess,
    deleteSuccess,
    loading,
    // bannerList,
    // sortBannerData,
  } = qualificationData

  const enableQualificationData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(qualificationRedux.actions.activateQualification(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const disableQualificationData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(qualificationRedux.actions.deactivateQualification(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const handleToggleAction = (data: {[key: string]: string}) => {
    data?.status
      ? dispatch(qualificationRedux.actions.singleDeactivateQualification({id: data.id}))
      : dispatch(qualificationRedux.actions.singleActivateQualification({id: data.id}))
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
                setOpen1(true)
              }}
              icon={<AiOutlineEdit />}
            />
          </Whisper>
        </CheckPermissions>
        <CheckPermissions type='Delete'>
          <Whisper placement='top' trigger='hover' speaker={<Tooltip>Delete</Tooltip>}>
            <IconButton
              appearance='subtle'
              onClick={() => {
                handleAlertOpen()
                let qualificationId = [rowData.id]
                setSelectedData(qualificationId)
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

  const handleCheck = (data: any) => {
    setSelectedData(data)
  }

  useEffect(() => {
    if (activateSuccess) {
      toast.success('Qualification activated successfully')
    }
    if (deactivateSuccess) {
      toast.success('Qualification deactivated successfully')
    }
    if (deleteSuccess) {
      toast.success('Qualification deleted successfully')
    }
    handleCheck([])
    dispatch(qualificationRedux?.actions.getQualification(params))
  }, [activateSuccess, deactivateSuccess, deleteSuccess])
  useEffect(() => {
    if (singleActivateSuccess) {
      toast.success(' Qualification Actvated successfully')
    }
    if (singleDeactivateSuccess) {
      toast.success(' Qualification deactivated successfully')
    }
    handleCheck([])
  }, [singleActivateSuccess, singleDeactivateSuccess])

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  const handleRefresh = () => {
    dispatch(qualificationRedux.actions.getQualification(params))
  }

  //    Get data from api to map in datatable
  const data = qualificationData?.data?.qualification
    ? qualificationData?.data?.qualification?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        name: item?.name,
        nameNp: item?.nameNp,
        description: item?.description,
        descriptionNp: item?.descriptionNp,
        status: item?.status,
      }))
    : []
  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen1(true)
    setActionType('Add')
  }
  const handleDelete = () => {
    let bannerSelectedId = selectedData?.map((value) => ({id: value}))
    dispatch(qualificationRedux?.actions.deleteQualification(bannerSelectedId))
    handleAlertClose()
  }

  return (
    <div>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Qualification Manager'
          params={params}
          setParams={setParams}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          handleRefresh={handleRefresh}
          exportShow={false}
          importShow={false}
          enableMultiple={enableQualificationData}
          disableMultiple={disableQualificationData}
          data={data}
          sortShow={true}
          sortButtonName='Sort'
          loading={loading}
        />

        <div className='datatable'>
          <RSuiteTable
            showCheckbox={true}
            columns={columns}
            data={data}
            checkedValues={selectedData}
            showLoading={qualificationData?.loading}
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
            maxButtons={5}
            size='sm'
            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
            total={qualificationData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
        </div>

        {open1 && (
          <AddQualification
            open={open1}
            handleClose={handleClose1}
            actionType={actionType}
            editSelectedData={editSelectedData}
          />
        )}

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
      </div>
    </div>
  )
}
export default Qualification
