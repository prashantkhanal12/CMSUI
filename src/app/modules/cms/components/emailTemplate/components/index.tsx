import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Table from 'rsuite/Table'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import {toast} from 'react-toastify'
import {SortType} from 'rsuite-table/lib/@types/common'
import {isEmpty} from 'lodash'

//Manual import
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import {StateParamsModel} from 'src/app/modules/common/Model'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import DesignComponent from 'src/app/modules/common/components/designComponent'
import * as emailTemplateRedux from '../../emailTemplate/redux'
import {IEmailTemplateState} from '../../emailTemplate/redux'
import AddEmailTemplate from './AddEmailTemplate'

const EmailTemplate = () => {
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

  const emailTemplateData: IEmailTemplateState = useSelector((state: any) => state.emailTemplate)

  useEffect(() => {
    dispatch(emailTemplateRedux.actions.getEmailTemplate(params))
  }, [params])
  const {
    loading,

    success,
    deleteSuccess,
  } = useSelector((state: any) => state.emailTemplate)

  const [checkedValues, setCheckedValues] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<any>()

  // alert modal
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)

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
                let emailTemplateId = [rowData.id]
                setCheckedValues(emailTemplateId)
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
      label: 'Template Name',
      dataKey: 'templateName',
      flexGrow: 1,
      cell: <Cell dataKey='templateName' />,
      sortable: true,
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
      toast.success('Email Template deleted successfully')
    }

    handleChecked([])
    dispatch(emailTemplateRedux?.actions.getEmailTemplate(params))
  }, [deleteSuccess])

  const data = emailTemplateData?.data?.template
    ? emailTemplateData?.data?.template?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item.id,
        templateName: item.templateName,
        userSubject: item.userSubject,
        adminSubject: item.adminSubject,
        adminMessage: item.adminMessage,
        userMessage: item.userMessage,
        adminEmail: item.adminEmail,
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
    let templateId = checkedValues?.map((value) => ({id: value}))
    dispatch(emailTemplateRedux?.actions?.deleteEmailTemplate(templateId))
    handleAlertClose()
  }

  const handleRefresh = () => {
    dispatch(emailTemplateRedux.actions.getEmailTemplate(params))
  }
  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Email Template'
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
            onChecked={handleChecked}
            showCheckbox={true}
            columns={columns}
            data={data}
            checkedValues={checkedValues}
            showLoading={emailTemplateData?.loading}
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
            total={emailTemplateData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
          {open && (
            <AddEmailTemplate
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

export default EmailTemplate
