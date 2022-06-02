import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Table from 'rsuite/Table'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import Tag from 'rsuite/Tag'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {toast} from 'react-toastify'
import {SortType} from 'rsuite-table/lib/@types/common'
import {isEmpty} from 'lodash'
import Modal from 'rsuite/Modal'
import RemindOutlineIcon from '@rsuite/icons/RemindOutline'
//Manual import
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import {StateParamsModel} from 'src/app/modules/common/Model'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import DesignComponent from 'src/app/modules/common/components/designComponent'
import * as interestRateRedux from '../../interestRate'
import {IInterestRateState} from '../redux/reducer'
import AddInterestRate from './AddInterestRate'
import * as updateNotesRedux from 'src/app/modules/rates/components/updateNotes'
import AddUpdateInterestsNote from './AddUpdateInterestsNote'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import {IUpdateNotesState} from 'src/app/modules/rates/components/updateNotes'

const InterestRate = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const [interestId, setInterestId] = useState<any>('')
  const [addNotice, setAddNotice] = useState(false)
  const [actionTypeNotice, setActionTypeNotice] = useState('AddNote')
  const updateNotes: IUpdateNotesState = useSelector((state: any) => state.updateNotes)
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

  const interestRateData: IInterestRateState = useSelector((state: any) => state.interestRate)

  useEffect(() => {
    dispatch(interestRateRedux.actions.getInterestRate(params))
    dispatch(updateNotesRedux?.actions.getUpdateNotes())
  }, [params])

  useEffect(() => {
    const updateNoteList = updateNotes?.data?.excerptRateCategory?.filter(
      (item: any) => item.name === 'Interest Rate'
    )
    updateNoteList?.length > 0 && setInterestId(updateNoteList[0]?.id)
  }, [updateNotes])

  const {
    loading,
    singleEnableSuccess,
    singleDisableSuccess,
    enableSuccess,
    disableSuccess,
    toggleLoading,
    success,
    deleteSuccess,
  } = useSelector((state: any) => state.interestRate)

  const [checkedValues, setCheckedValues] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<any>()

  // alert modal
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)

  const [alertOpenFile, setAlertOpenFile] = useState(false)

  const handleAlertOpenFile = () => setAlertOpenFile(true)
  const handleAlertCloseFile = () => setAlertOpenFile(false)

  const enableInterestRateData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(interestRateRedux.actions.enableInterestRate(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const disableInterestRateData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(interestRateRedux.actions.disableInterestRate(formData))
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
                let interestRateId = [rowData.id]
                setCheckedValues(interestRateId)
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
      ? dispatch(interestRateRedux.actions.singleDisableInterestRate({id: data.id}))
      : dispatch(interestRateRedux.actions.singleEnableInterestRate({id: data.id}))
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
      label: 'Date',
      dataKey: 'date',
      flexGrow: 1,
      cell: <Cell dataKey='date' />,
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
      toast.success('Interest Rate deleted successfully')
    }
    if (enableSuccess) {
      toast.success('Interest Rate enabled successfully')
    }
    if (disableSuccess) {
      toast.success('Interest Rate disabled successfully')
    }
    handleChecked([])
    dispatch(interestRateRedux?.actions.getInterestRate(params))
  }, [deleteSuccess, success, enableSuccess, disableSuccess])

  useEffect(() => {
    if (singleEnableSuccess) {
      toast.success('Interest Rate enabled successfully')
    }
    if (singleDisableSuccess) {
      toast.success('Interest Rate disabled successfully')
    }
    handleChecked([])
  }, [singleDisableSuccess, singleEnableSuccess])

  const data = interestRateData?.data?.interestRate
    ? interestRateData?.data?.interestRate?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item.id,
        date: item?.date,
        firstSectionInfoText: item?.firstSectionInfoText,
        loanInterestRate: item?.loanInterestRate,
        depositInterestRate: item?.depositInterestRate,
        secondSectionInfoText: item?.secondSectionInfoText,
        thirdSectionBodyOneText: item?.thirdSectionBodyOneText,
        thirdSectionBodyTwoText: item?.thirdSectionBodyTwoText,
        thirdSectionHeaderOneText: item?.thirdSectionHeaderOneText,
        thirdSectionHeaderTwoText: item?.thirdSectionHeaderTwoText,
        order: item?.order,
        status: item.status,
      }))
    : []

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  const handleAddNotice = () => {
    setEditCheckedData({})
    setAddNotice(true)
  }

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen(true)
    setActionType('Add')
  }

  const handleDelete = () => {
    let interestRate = checkedValues?.map((value) => ({id: value}))
    dispatch(interestRateRedux?.actions.deleteInterestRate(interestRate))
    handleAlertClose()
  }

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
      {addNotice && (
          <AddUpdateInterestsNote
            open={addNotice}
            interestId={interestId}
            handleClose={()=>setAddNotice(false)}
            actionType={actionTypeNotice}
            editSelectedData={editSelectedData}
          />
        )}

        <DesignComponent
          moduleName='Interest Rate Manager'
          params={params}
          setParams={setParams}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          handleExport={handleAlertOpenFile}
          exportShow={true}
          importShow={false}
          enableMultiple={enableInterestRateData}
          disableMultiple={disableInterestRateData}
          exportButtonName='Download Loan or Deposit Interest File'
          addNoteShow={true}
          handleAddNotice={handleAddNotice}          
        />

        <div className='datatable'>
          <RSuiteTable
            onChecked={handleChecked}
            showCheckbox={true}
            columns={columns}
            data={data}
            checkedValues={checkedValues}
            showLoading={interestRateData?.loading}
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
            total={interestRateData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
          {open && (
            <AddInterestRate
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
                    <strong className='ms-3'>Choose a rate file and download!</strong>
                  </h4>
                </div>

                <div className='row mt-5'>
                  <div className='col-lg-6'>
                    {' '}
                    <button
                      className='dt-btn dt-btn-outline-primary dt-btn-sm w-100'
                      onClick={() => {
                        dispatch(interestRateRedux?.actions.getInterestRateLoanFile())
                        handleAlertCloseFile()
                      }}
                    >
                      Download Loan Interest file
                    </button>
                  </div>
                  <div className='col-lg-6'>
                    <button
                      className='dt-btn dt-btn-outline-primary dt-btn-sm w-100'
                      onClick={() => {
                        dispatch(interestRateRedux?.actions.getInterestRateDepositFile()) //'xlsx'
                        handleAlertCloseFile()
                      }}
                    >
                      {' '}
                      Download Deposit Interest file
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
    </>
  )
}

export default InterestRate
