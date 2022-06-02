import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'
import Tag from 'rsuite/Tag'
import Toggle from 'rsuite/Toggle'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'

// includes
import * as grievanceRedux from '../index'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {StateParamsModel} from 'src/app/modules/common/Model'
import {SortType} from 'rsuite-table/lib/@types/common'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import DesignComponent from 'src/app/modules/common/components/designComponent'
import {isEmpty} from 'lodash'

const GrievanceHandlingComponent = () => {
  const dispatch = useDispatch()
  const {
    data: {grievance, meta},
    success,
    loading,
  } = useSelector((state: any) => state.grievance)

  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })

  useEffect(() => {
    dispatch(grievanceRedux.actions.getGrievance(params))
  }, [params])

  const [checkedValues, setCheckedValues] = useState<Array<string>>([])

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
        {/* <CheckPermissions type='Delete'>
          <Whisper placement='top' trigger='hover' speaker={<Tooltip>Delete</Tooltip>}>
            <IconButton
              appearance='subtle'
              // onClick={() => {
              //   handleAlertOpen()
              //   let branchId = [rowData.id]
              //   setCheckedValues(branchId)
              // }}
              icon={<TrashIcon />}
            />
          </Whisper>
        </CheckPermissions> */}
        {/* <Whisper placement='top' trigger='hover' speaker={<Tooltip>Status</Tooltip>}> */}
        {/* <Toggle
            size='sm'
            disabled={toggleLoading}
            checked={rowData.status}
            onClick={() => handleToggleAction(rowData)}
          /> */}
        {/* </Whisper> */}
      </Cell>
    )
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
      label: 'Grievance Code',
      dataKey: 'grievanceCode',
      flexGrow: 1,
      cell: (
        <Cell>
          {(rowData) => (!isEmpty(rowData?.grievanceCode) ? rowData?.grievanceCode : '-')}
        </Cell>
      ),
      sortable: true,
    },

    {
      label: 'Full Name',
      dataKey: 'fullName',
      flexGrow: 1,
      cell: <Cell>{(rowData) => (!isEmpty(rowData?.fullName) ? rowData?.fullName : '-')}</Cell>,

      sortable: false,
    },
    {
      label: 'Email Address',
      dataKey: 'email',
      flexGrow: 1,
      cell: <Cell>{(rowData) => (!isEmpty(rowData?.email) ? rowData?.email : '-')}</Cell>,

      sortable: false,
    },
    {
      label: 'Mobile Number',
      dataKey: 'mobileNumber',
      flexGrow: 1,
      cell: (
        <Cell>{(rowData) => (!isEmpty(rowData?.mobileNumber) ? rowData?.mobileNumber : '-')}</Cell>
      ),

      sortable: false,
    },
    {
      label: 'Preferred Branch',
      dataKey: 'preferredBranch',
      flexGrow: 1,
      cell: (
        <Cell>
          {(rowData) => (!isEmpty(rowData?.preferredBranch) ? rowData?.preferredBranch : '-')}
        </Cell>
      ),

      sortable: false,
    },
    {
      label: 'Service Category',
      dataKey: 'serviceCategory',
      flexGrow: 1,
      cell: (
        <Cell>{(rowData) => (rowData?.serviceCategory ? rowData?.serviceCategory.name : '-')}</Cell>
      ),

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
    // {
    //   label: 'Action',
    //   width: 150,
    //   align: 'center',
    //   cell: <ActionCell dataKey='id' />,
    // },
  ]

  const grievanceData = !isEmpty(grievance)
    ? grievance?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item.id,
        fullName: item.fullName,
        email: item.email,
        grievanceCode: item.grievanceCode,
        message: item.message,
        mobileNumber: item.mobileNumber,
        preferredBranch: item.preferredBranch,
        serviceSubType: item.serviceSubType,
        serviceType: item.serviceType,
        accountNumber: item.accountNumber,
        serviceCategory: item.serviceCategory,
        status: item.status,
      }))
    : []

  const handleChecked = (values: Array<string>) => {
    setCheckedValues(values)
  }

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }


  useEffect(() => {
    handleChecked([])
    dispatch(grievanceRedux?.actions.getGrievance())
  }, [success])

  const handleExport = () => {
    dispatch(grievanceRedux.actions.exportFile('Grievance Data', params))
  }
  const handleRefresh = () => {
    dispatch(grievanceRedux.actions.getGrievance())
  }

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Grievance Manager'
          params={params}
          setParams={setParams}
          filterData={true}
          handleExport={handleExport}
          handleRefresh={handleRefresh}
          addShow={false}
          deleteShow={false}
          importShow={false}
          toggleMultipleShow={false}
        />

        <div className='datatable'>
          <RSuiteTable
            onChecked={handleChecked}
            showCheckbox={true}
            columns={columns}
            showLoading={loading}
            data={grievanceData}
            checkedValues={checkedValues}
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
            total={meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
        </div>
      </div>
    </>
  )
}

export default GrievanceHandlingComponent
