import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'
import IconButton from 'rsuite/IconButton'
import Pagination from 'rsuite/Pagination'
import Whisper from 'rsuite/Whisper'
import Tooltip from 'rsuite/Tooltip'
import Tag from 'rsuite/Tag'

// icons
import {RiDeleteBin6Line} from 'react-icons/ri'
import {AiOutlineEdit} from 'react-icons/ai'

// includes
import * as smtp from 'src/app/modules/siteSettings/components/smtpSetting'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import {ISmtpState} from 'src/app/modules/siteSettings/components/smtpSetting'
import AddSmtp from './AddSmtp'
import {toast} from 'react-toastify'
import {SmtpModel} from '../Model'
import {EmptyObject} from 'chart.js/types/basic'
import {StateParamsModel} from 'src/app/modules/common/Model'
import {SortType} from 'rsuite-table/lib/@types/common'
import TrashIcon from '@rsuite/icons/Trash'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import {isEmpty} from 'lodash'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const Cell = Table.Cell

const SmtpSettings = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })
  const [checkedValues, setCheckedValues] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<SmtpModel | EmptyObject>({})

  // alert modal
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)

  const smtpData: ISmtpState = useSelector((state: any) => state.smtp)

  useEffect(() => {
    dispatch(smtp.actions.getSmtp(params))
  }, [params])

  useEffect(() => {
    if (smtpData?.deleteSuccess) {
      toast.success('SMTP deleted successfully')
      handleChecked([])
      dispatch(smtp?.actions.getSmtp())
    }
  }, [smtpData])

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
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
                let smtpSettingId = [rowData.id]
                setCheckedValues(smtpSettingId)
              }}
              icon={<TrashIcon />}
            />
          </Whisper>
        </CheckPermissions>
      </Cell>
    )
  }

  const handleClose = () => setOpen(false)

  const columns = [
    {
      label: 'S.N.',
      dataKey: 'sn',
      width: 60,
      cell: <Cell dataKey='sn' />,
    },
    {
      label: 'Hostname',
      flexGrow: 1,
      dataKey: 'hostName',
      cell: <Cell dataKey='hostName' />,
      sortable: true,
    },
    {
      label: 'Username',
      dataKey: 'userName',
      flexGrow: 1,
      cell: <Cell dataKey='userName' />,
      sortable: true,
    },

    {
      label: 'Type',
      dataKey: 'type',
      flexGrow: 1,
      cell: <Cell dataKey='type' />,
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

  const data = smtpData?.data?.smtpSetting
    ? smtpData?.data?.smtpSetting?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        hostName: item?.hostName,
        encryption: item?.encryption,
        portNumber: item?.portNumber,
        type: item?.type,
        userName: item?.userName,
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
    let smtpSettingId = checkedValues?.map((value) => ({id: value}))
    dispatch(smtp?.actions?.deleteSmtp(smtpSettingId))
    handleAlertClose()
  }

  const handleRefresh = () => {
    dispatch(smtp.actions.getSmtp(params))
  }

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='SMTP Settings'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
          handleAlertOpen={handleAlertOpen}
          exportShow={false}
          importShow={false}
          toggleMultipleShow={false}
        />

        <div className='datatable'>
          <RSuiteTable
            showCheckbox={true}
            columns={columns}
            data={data}
            showLoading={smtpData?.loading}
            onChecked={handleChecked}
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
            className='mt-5'
            size='sm'
            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
            total={smtpData?.data?.meta?.total || 0}
            limitOptions={[1, 2]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
        </div>
        <AddSmtp
          open={open}
          //params={params}
          handleClose={handleClose}
          actionType={actionType}
          editSelectedData={editSelectedData}
        />

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
export default SmtpSettings
