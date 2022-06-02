import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import {SortType} from 'rsuite-table/lib/@types/common'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import Tag from 'rsuite/Tag'
// rsuite
import Table from 'rsuite/Table'
import IconButton from 'rsuite/IconButton'
import Pagination from 'rsuite/Pagination'

import TrashIcon from '@rsuite/icons/Trash'
import {AiOutlineEdit} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux'
import {groupBy, isEmpty, mapValues} from 'lodash'
import Modal from 'rsuite/Modal'
import RemindOutlineIcon from '@rsuite/icons/RemindOutline'

//Manual import
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import {StateParamsModel} from 'src/app/modules/common/Model'
import AddForexRates from './AddForexRates'
import {IForexRateFileState, IForexRateState} from '../redux/reducer'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import UploadForexFile from './UploadForexFile'
import {ForexRateModel} from '../Model'
import * as forexRateRedux from '../index'
import * as forexRateAll from 'src/app/modules/rates/components/forexRate'
import * as updateNotesRedux from 'src/app/modules/rates/components/updateNotes'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import DesignComponent from 'src/app/modules/common/components/designComponent'
import {IUpdateNotesState} from 'src/app/modules/rates/components/updateNotes'
import AddUpdateNotes from './AddUpdateNotes'

const Cell = Table.Cell
const ForexRates = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const [actionType1, setActionType1] = useState('Add')
  const [open1, setOpen1] = useState(false)
  const [addNotice, setAddNotice] = useState(false)
  const handleCloseNotice = () => setAddNotice(false)
  const handleOpenNotice = () => setAddNotice(true)
  const [actionTypeNotice, setActionTypeNotice] = useState('AddNote')
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })
  const [selectedData, setSelectedData] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<ForexRateModel | any>({})
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)
  const [alertOpenFile, setAlertOpenFile] = useState(false)
  const handleAlertOpenFile = () => setAlertOpenFile(true)
  const handleAlertCloseFile = () => setAlertOpenFile(false)

  //Getting States
  const forexRateData: IForexRateState = useSelector((state: any) => state.forexRate)
  const forexRateDataFile: IForexRateFileState = useSelector((state: any) => state.forexRateFile)
  const [forexId, setForexId] = useState<any>('')
  const updateNotes: IUpdateNotesState = useSelector((state: any) => state.updateNotes)

  useEffect(() => {
    dispatch(updateNotesRedux?.actions.getUpdateNotes())
  }, [])

  useEffect(() => {
    const updateNoteList = updateNotes?.data?.excerptRateCategory?.filter(
      (item: any) => item.name === 'Forex Rate'
    )
    updateNoteList?.length > 0 && setForexId(updateNoteList[0]?.id)
  }, [updateNotes])

  const {activateSuccess, deactivateSuccess, success, singleActivateSuccess, deleteSuccess} =
    forexRateData

  const handleToggleAction = (data: {[key: string]: string}) => {
    const formData = [
      {
        id: data.id,
      },
    ]

    data?.status
      ? dispatch(forexRateAll.actions.deactivateForexRate(formData))
      : dispatch(forexRateAll.actions.activateForexRates(formData))
  }

  const ActionCell = ({rowData, dataKey, ...props}: any) => {
    return (
      <Cell {...props} className='link-group'>
        <CheckPermissions type='Delete'>
          <Whisper placement='top' trigger='hover' speaker={<Tooltip>Edit</Tooltip>}>
            <IconButton
              appearance='subtle'
              onClick={() => {
                setEditCheckedData({forexRateCategories: [rowData.forexRateCate]})
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
                let forexSettingId = [rowData.id]
                setSelectedData(forexSettingId)
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

  const data = forexRateData?.data?.forexRate
    ? forexRateData?.data?.forexRate?.map((forexRate1: any, i: number) => {
        const forexRateCate = mapValues(groupBy(forexRate1?.forexCategory, 'item.name'), (obj) =>
          obj.map((item: any) => {
            return {
              ...item,

              forexRateId: forexRate1?.id,
              name: item?.item?.name,
            }
          })
        )

        return {
          sn: (params?.page - 1) * params?.limit + (i + 1),
          id: forexRate1?.id,
          date: forexRate1?.date,
          time: forexRate1?.time,
          status: forexRate1?.status,
          forexRateCate,
        }
      })
    : []

  // get forexRate data when page referesh
  useEffect(() => {
    dispatch(forexRateRedux.actions.getForexRate(params))
  }, [params])

  useEffect(() => {
    if (activateSuccess) {
      toast.success('Forex Rate activated successfully')
    }
    if (deactivateSuccess) {
      toast.success('Forex Rate deactivated successfully')
    }
    if (deleteSuccess) {
      toast.success('Forex Rate deleted successfully')
    }
    if (success) {
      toast.success('File Imported successfully')
    }
    handleCheck([])
    dispatch(forexRateAll?.actions.getForexRate(params))
  }, [activateSuccess, deactivateSuccess, deleteSuccess, success])

  const handleCheck = (data: any) => {
    setSelectedData(data)
  }

  const activateSelectedData = () => {
    if (!isEmpty(selectedData)) {
      const formData = selectedData.map((d: string) => ({
        id: d,
      }))
      dispatch(forexRateAll?.actions.activateForexRates(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const deactivateSelectedData = () => {
    if (!isEmpty(selectedData)) {
      const formData = selectedData.map((d: string) => ({
        id: d,
      }))
      dispatch(forexRateAll?.actions.deactivateForexRate(formData))
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
      dispatch(forexRateAll.actions.importForexRate(formData))
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
    setActionType1('Add Note')
  }

  const handleDelete = () => {
    let forexRateSelectedId = selectedData?.map((value) => ({id: value}))
    dispatch(forexRateAll?.actions.deleteForexRate(forexRateSelectedId))

    handleAlertClose()
  }

  const handleRefresh = () => {
    dispatch(forexRateRedux.actions.getForexRate(params))
  }

  return (
    <div>
      <div className='shadow p-3 bg-white rounded'>
        {addNotice && (
          <AddUpdateNotes
            open={addNotice}
            forexId={forexId}
            handleClose={handleCloseNotice}
            actionType={actionTypeNotice}
            editSelectedData={editSelectedData}
          />
        )}
        <DesignComponent
          moduleName='Forex Rates'
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
            checkedValues={selectedData}
            showLoading={forexRateData?.loading}
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
            total={forexRateData?.data?.meta?.total}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
        </div>
        {open && <UploadForexFile open={open} handleClose={handleClose} actionType={actionType} />}

        {open1 && (
          <AddForexRates
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
                        dispatch(forexRateAll.actions.getForexRateFile('csv'))
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
                        dispatch(forexRateAll.actions.getForexRateFile('xlsx'))
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
        {/* End of file Download */}
      </div>
    </div>
  )
}
export default ForexRates
