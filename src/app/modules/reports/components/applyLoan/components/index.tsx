import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'
import Tag from 'rsuite/Tag'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import {isEmpty} from 'lodash'
import {toast} from 'react-toastify'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import TrashIcon from '@rsuite/icons/Trash'
import moment from 'moment'
import Modal from 'rsuite/Modal'
import RemindOutlineIcon from '@rsuite/icons/RemindOutline'

// includes
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import {StateParamsModel} from 'src/app/modules/common/Model'
import {SortType} from 'rsuite-table/lib/@types/common'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import DesignComponent from 'src/app/modules/common/components/designComponent'
import * as applyLoanRedux from '../../applyLoan/redux'
import {IApplyLoanState} from '../../applyLoan/redux'
import axios from 'axios'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

const ApplyLoan = () => {
  const dispatch = useDispatch()
  const {
    loading,
    singleEnableSuccess,
    singleDisableSuccess,
    enableSuccess,
    disableSuccess,
    toggleLoading,
    success,
    deleteSuccess,
  } = useSelector((state: any) => state.applyLoan)
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })
  const [checkedValues, setCheckedValues] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<any>()
  const [alertOpenFile, setAlertOpenFile] = useState(false)

  // alert modal
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)

  const downloadApplyForLoanFile = () => {
    const GET_APPLY_FOR_LOAN_FILE = `${API_URL}/apply-loan/export`
    axios(`${GET_APPLY_FOR_LOAN_FILE}`, {
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const blob = new Blob([response.data])
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `ApplyForLoan.csv`)
      document.body.appendChild(link)
      link.click()
    })
  }

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }
  const ApplyLoanData: IApplyLoanState = useSelector((state: any) => state.applyLoan)

  useEffect(() => {
    dispatch(applyLoanRedux.actions.getApplyLoan(params))
  }, [params])

  useEffect(() => {
    dispatch(applyLoanRedux.actions.getMunicipality(params))
  }, [params])

  const enableApplyLoanData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(applyLoanRedux.actions.enableApplyLoan(formData))
    } else {
      toast.error('No data Selected')
    }
  }

  const disableApplyLoanData = () => {
    if (!isEmpty(checkedValues)) {
      const formData = checkedValues.map((d: string) => ({
        id: d,
      }))
      dispatch(applyLoanRedux.actions.disableApplyLoan(formData))
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
        <CheckPermissions type='Delete'>
          <Whisper placement='top' trigger='hover' speaker={<Tooltip>Delete</Tooltip>}>
            <IconButton
              appearance='subtle'
              onClick={() => {
                handleAlertOpen()
                let loan = [rowData.id]
                setCheckedValues(loan)
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
      ? dispatch(applyLoanRedux.actions.singleDisableApplyLoan({id: data.id}))
      : dispatch(applyLoanRedux.actions.singleEnableApplyLoan({id: data.id}))
  }

  const Cell = Table.Cell

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
      cell: <Cell dataKey='email' />,
    },
    {
      label: 'Phone No',
      dataKey: 'mobileNumber',
      flexGrow: 1,
      cell: <Cell dataKey='mobileNumber' />,
    },

    {
      label: 'Loan Amount',
      dataKey: 'loanAmount',
      flexGrow: 1,
      cell: <Cell dataKey='loanAmount' />,
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
      toast.success('Apply Loan deleted successfully')
    }
    if (enableSuccess) {
      toast.success('Apply Loan enabled successfully')
    }
    if (disableSuccess) {
      toast.success('Apply Loan disabled successfully')
    }
    handleChecked([])
    dispatch(applyLoanRedux?.actions.getApplyLoan(params))
  }, [deleteSuccess, success, enableSuccess, disableSuccess])

  useEffect(() => {
    if (singleEnableSuccess) {
      toast.success('Apply Loan enabled successfully')
    }
    if (singleDisableSuccess) {
      toast.success('Apply Loan disabled successfully')
    }
    handleChecked([])
  }, [singleDisableSuccess, singleEnableSuccess])

  const data = ApplyLoanData?.data?.loanApply
    ? ApplyLoanData?.data?.loanApply?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item.id,
        name: item.name,
        email: item.email,
        mobileNumber: item.mobileNumber,
        dob: moment(item?.dob).toDate(),
        wardno: item.wardNo,
        municipality: item.municipality?.title,
        loanAmount: item.loanAmount,
        loanTypeId: item.loanType,
        provinceId: item.province,
        districtId: item.district,
        status: item.status,
      }))
    : []

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  const handleDelete = () => {
    let applyLoanId = checkedValues?.map((value) => ({id: value}))
    dispatch(applyLoanRedux?.actions.deleteApplyLoan(applyLoanId))
    handleAlertClose()
  }

  const handleRefresh = () => {
    dispatch(applyLoanRedux?.actions.getApplyLoan(params))
  }

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Apply Loan'
          addShow={false}
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAlertOpen={handleAlertOpen}
          exportShow={true}
          importShow={false}
          enableMultiple={enableApplyLoanData}
          disableMultiple={disableApplyLoanData}
          exportButtonName='Export CSV'
          handleExport={downloadApplyForLoanFile}
        />

        <div className='datatable'>
          <RSuiteTable
            onChecked={handleChecked}
            showCheckbox={true}
            columns={columns}
            data={data}
            checkedValues={checkedValues}
            showLoading={ApplyLoanData?.loading}
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
            total={ApplyLoanData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
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

export default ApplyLoan
