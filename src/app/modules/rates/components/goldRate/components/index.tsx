import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import {SortType} from 'rsuite-table/lib/@types/common'
import {groupBy, isEmpty, mapValues} from 'lodash'
import Modal from 'rsuite/Modal'
// rsuite
import Table from 'rsuite/Table'
import IconButton from 'rsuite/IconButton'
import Pagination from 'rsuite/Pagination'

import {AiOutlineEdit} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import Tag from 'rsuite/Tag'
import Toggle from 'rsuite/Toggle'
import TrashIcon from '@rsuite/icons/Trash'
import RemindOutlineIcon from '@rsuite/icons/RemindOutline'

//Manual import
import {StateParamsModel} from 'src/app/modules/common/Model'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import * as goldRateRedux from '../index'
import AddGoldRates from './AddGoldRates'
import {IGoldRateFileState, IGoldRateState} from '../redux/reducer'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import UploadGoldFile from './UploadGoldFile'
import {GoldRateModel} from 'src/app/modules/rates/components/goldRate/Model'
import * as goldRateAll from 'src/app/modules/rates/components/goldRate'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import DesignComponent from 'src/app/modules/common/components/designComponent'
import * as updateNotesRedux from 'src/app/modules/rates/components/updateNotes'
import {IUpdateNotesState} from 'src/app/modules/rates/components/updateNotes'
import AddUpdateGoldNotes from './AddUpdateGoldNotes'

const Cell = Table.Cell
const GoldRates = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const [open1, setOpen1] = useState(false)
  const [actionType1, setActionType1] = useState('AddGoldRate')
  const [addNotice, setAddNotice] = useState(false)
  const handleCloseNotice = () => setAddNotice(false)
  const handleOpenNotice = () => setAddNotice(true)
  const [actionTypeNotice, setActionTypeNotice] = useState('AddNote')
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })

  const [selectedData, setSelectedData] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<GoldRateModel | any>({})
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertOpenFile, setAlertOpenFile] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)

  const handleAlertOpenFile = () => setAlertOpenFile(true)
  const handleAlertCloseFile = () => setAlertOpenFile(false)

  const goldRateData: IGoldRateState = useSelector((state: any) => state.goldRate)
  const goldRateDataFile: IGoldRateFileState = useSelector((state: any) => state.goldRateFile)
  const updateNotes: IUpdateNotesState = useSelector((state: any) => state.updateNotes)
  const [goldId, setGoldId] = useState<any>('')
  const {activateSuccess, deactivateSuccess, success, importSuccess, deleteSuccess} = goldRateData

  useEffect(() => {
    dispatch(updateNotesRedux?.actions.getUpdateNotes())
  }, [])

  useEffect(() => {
    const updateNoteList = updateNotes?.data?.excerptRateCategory?.filter(
      (item: any) => item.name === 'Gold Rate'
    )
    updateNoteList?.length > 0 && setGoldId(updateNoteList[0]?.id)
  }, [updateNotes])

  const handleToggleAction = (data: {[key: string]: string}) => {
    const formData = [
      {
        id: data.id,
      },
    ]

    data?.status
      ? dispatch(goldRateAll.actions.deactivateGoldRate(formData))
      : dispatch(goldRateAll.actions.activateGoldRates(formData))
  }

  const ActionCell = ({rowData, dataKey, ...props}: any) => {
    return (
      <Cell {...props} className='link-group'>
        <CheckPermissions type='Edit'>
          <Whisper placement='top' trigger='hover' speaker={<Tooltip>Edit</Tooltip>}>
            <IconButton
              appearance='subtle'
              onClick={() => {
                setEditCheckedData({goldRateCategories: [rowData.goldRateCate]})
                setActionType1('Edit')
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
                let keySettingId = [rowData.id]
                setSelectedData(keySettingId)
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

  const handleClose = () => setOpen(false)
  const handleClose1 = () => setOpen1(false)

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }

  const columns = [
    {
      label: 'S.N.',
      dataKey: 'sn',
      width: 60,
      cell: <Cell dataKey='sn' />,
    },
    {
      label: 'Date',
      flexGrow: 1,
      dataKey: 'date',
      cell: <Cell dataKey='date' />,
      sortable: true,
    },
    {
      label: 'Time',
      dataKey: 'time',
      flexGrow: 1,
      cell: <Cell dataKey='time' />,
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

  //Get data from state
  const data = goldRateData?.data?.goldRate
    ? goldRateData?.data?.goldRate?.map((goldRate1: any, i: number) => {
        const goldRateCate = mapValues(groupBy(goldRate1?.goldCategory, 'item.name'), (obj) =>
          obj.map((item: any) => ({
            ...item,
            goldRateId: goldRate1?.id,
            name: item?.item?.name,
            unit_in_tola: item?.unit_in_tola.toString(),
          }))
        )

        return {
          sn: (params?.page - 1) * params?.limit + (i + 1),
          id: goldRate1?.id,
          date: goldRate1?.date,
          time: goldRate1?.time,
          status: goldRate1?.status,
          goldRateCate,
        }
      })
    : []

  //To get goldRate data when page referesh
  useEffect(() => {
    dispatch(goldRateRedux.actions.getGoldRate(params))
  }, [params])

  useEffect(() => {
    if (activateSuccess) {
      toast.success('Gold Rate activated successfully')
    }
    if (importSuccess) {
      toast.success('Gold Rate imported successfully')
    }
    if (deactivateSuccess) {
      toast.success('Gold Rate deactivated successfully')
    }
    if (deleteSuccess) {
      toast.success('Gold Rate deleted successfully')
    }
    handleCheck([])
    dispatch(goldRateAll?.actions.getGoldRate(params))
  }, [activateSuccess, deactivateSuccess, deleteSuccess, importSuccess, success])

  const handleCheck = (data: any) => {
    setSelectedData(data)
  }

  const activateSelectedData = () => {
    if (!isEmpty(selectedData)) {
      const formData = selectedData.map((d: string) => ({
        id: d,
      }))
      dispatch(goldRateAll.actions.activateGoldRates(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const deactivateSelectedData = () => {
    if (!isEmpty(selectedData)) {
      const formData = selectedData.map((d: string) => ({
        id: d,
      }))
      dispatch(goldRateAll.actions.deactivateGoldRate(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  function fileImport(event: any) {
    if (!isEmpty(event.target.files)) {
      let formData = new FormData()
      formData.append('file', event.target.files[0])
      dispatch(goldRateAll.actions.importGoldRate(formData))
      event.target.value = null
    }
  }

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen1(true)
    setActionType1('Add')
  }

  const handleAddNotice = () => {
    setEditCheckedData({})
    setAddNotice(true)
    setActionType1('AddNote')
  }

  const handleDelete = () => {
    let goldRateSelectedId = selectedData?.map((value) => ({id: value}))
    dispatch(goldRateAll?.actions.deleteGoldRate(goldRateSelectedId))
    handleAlertClose()
  }

  const handleRefresh = () => {
    dispatch(goldRateAll?.actions.getGoldRate(params))
  }

  return (
    <div>
      <div className='shadow p-3 bg-white rounded'>
        {addNotice && (
          <AddUpdateGoldNotes
            open={addNotice}
            goldId={goldId}
            handleClose={handleCloseNotice}
            actionType={actionTypeNotice}
            editSelectedData={editSelectedData}
          />
        )}

        <DesignComponent
          moduleName='Gold Rates'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          handleExport={handleAlertOpenFile}
          handleImport={fileImport}
          enableMultiple={activateSelectedData}
          disableMultiple={deactivateSelectedData}
          exportButtonName='Export'
          addNoteShow={true}
          handleAddNotice={handleAddNotice}
        />

        <div className='datatable'>
          <RSuiteTable
            showCheckbox={true}
            columns={columns}
            data={data}
            onChecked={handleCheck}
            checkedValues={selectedData}
            showLoading={goldRateData?.loading}
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
            total={goldRateData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
        </div>
        {open && <UploadGoldFile open={open} handleClose={handleClose} actionType={actionType} />}
        {open1 && (
          <AddGoldRates
            open={open1}
            handleClose={handleClose1}
            actionType={actionType1}
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

        {/* File Download */}
        <div className='modal-container'>
          <Modal
            backdrop='static'
            role='alertdialog'
            open={alertOpenFile}
            onClose={handleAlertCloseFile}
            enforceFocus={false}
            size='xs'
          >
            <Modal.Body>
              <div className='px-4'>
                <div className='d-flex'>
                  <RemindOutlineIcon
                    style={{
                      color: '#ffb300',
                      fontSize: 24,
                    }}
                  />
                  <h4>
                    <strong className='ms-3'>Choose file format and download!</strong>
                  </h4>
                </div>

                {/* Template download */}

                <div className='row mt-5'>
                  <div className='col-lg-6'>
                    {' '}
                    <button
                      className='dt-btn dt-btn-outline-primary dt-btn-sm w-100'
                      onClick={() => {
                        dispatch(goldRateAll.actions.getGoldRateFile('csv'))
                        handleAlertCloseFile()
                      }}
                    >
                      CSV file
                    </button>
                  </div>
                  <div className='col-lg-6'>
                    <button
                      className='dt-btn dt-btn-outline-primary dt-btn-sm w-100'
                      onClick={() => {
                        dispatch(goldRateAll.actions.getGoldRateFile('xlsx'))
                        handleAlertCloseFile()
                      }}
                    >
                      {' '}
                      XLSX file
                    </button>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={handleAlertCloseFile} className='btn btn-secondary btn-sm ms-3'>
                Cancel
              </button>
            </Modal.Footer>
          </Modal>
        </div>
        {/* End File Download */}
      </div>
    </div>
  )
}
export default GoldRates
