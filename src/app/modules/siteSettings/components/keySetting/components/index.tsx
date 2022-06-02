import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'
import Input from 'rsuite/Input'
import InputGroup from 'rsuite/InputGroup'
import Whisper from 'rsuite/Whisper'
import Tooltip from 'rsuite/Tooltip'

// icons
import {FaPlus} from 'react-icons/fa'
import {RiDeleteBin6Line} from 'react-icons/ri'

// includes
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import SearchIcon from '@rsuite/icons/Search'
import VisibleIcon from '@rsuite/icons/Visible'
import InvisibleIcon from '@rsuite/icons/Unvisible'
import {SortType} from 'rsuite-table/lib/@types/common'
import {toast} from 'react-toastify'
import {IKeyState} from 'src/app/modules/siteSettings/components/keySetting'
import {KeyModel} from '../Model'
import AddKey from './AddKey'
import {StateParamsModel} from 'src/app/modules/common/Model'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import DeleteModal from 'src/app/modules/common/components/deleteModal'
import * as key from 'src/app/modules/siteSettings/components/keySetting'
import {isEmpty} from 'lodash'
import DesignComponent from 'src/app/modules/common/components/designComponent'

const KeySettings = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [keyVisible, setKeyVisible] = useState(true)
  const [actionType, setActionType] = useState('Add')
  const [params, setParams] = useState<StateParamsModel>({
    page: 1,
    limit: 10,
  })
  const [checkedValues, setCheckedValues] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<KeyModel>()
  // alert modal
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)
  const keyData: IKeyState = useSelector((state: any) => state.key)

  const [keySettingData, setKeySettingData] = useState<any>()

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }

  useEffect(() => {
    dispatch(key.actions.getKey(params))
  }, [params])

  useEffect(() => {
    const data = keyData?.data?.keySetting
      ? keyData?.data?.keySetting?.map((item: any, i: number) => ({
          sn: (params?.page - 1) * params?.limit + (i + 1),
          id: item?.id,
          name: item?.name,
          key: item?.key,
          status: item?.status,
          visible: false,
        }))
      : []

    setKeySettingData(data)
  }, [keyData])

  const handleAction = (id: string) => {
    const changedData = keySettingData.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          visible: !item.visible,
        }
      } else {
        return item
      }
    })
    setKeySettingData(changedData)
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
                let keySettingId = [rowData.id]
                setCheckedValues(keySettingId)
              }}
              icon={<TrashIcon />}
            />
          </Whisper>
        </CheckPermissions>
        <Whisper placement='top' trigger='hover' speaker={<Tooltip>Toogle</Tooltip>}>
          {rowData.visible ? (
            <IconButton
              appearance='subtle'
              onClick={() => handleAction(rowData.id)}
              icon={<VisibleIcon />}
            />
          ) : (
            <IconButton
              appearance='subtle'
              onClick={() => handleAction(rowData.id)}
              icon={<InvisibleIcon />}
            />
          )}
        </Whisper>
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
      label: 'Name',
      dataKey: 'name',
      flexGrow: 1,
      cell: <Cell dataKey='name' />,
      sortable: true,
    },
    {
      label: 'Key',
      dataKey: 'key',
      flexGrow: 1,
      cell: (
        <Cell>
          {(rowData) => (!rowData.visible ? <div className='fs-6'>'*********'</div> : rowData.key)}
        </Cell>
      ),
    },
    {
      label: 'Action',
      width: 150,
      align: 'center',
      cell: <ActionCell dataKey='id' />,
    },
  ]

  useEffect(() => {
    if (keyData?.deleteSuccess) {
      toast.success('Key deleted successfully')
      dispatch(key?.actions.getKey(params))
    }
  }, [keyData])

  const handleChecked = (values: Array<string>) => {
    setCheckedValues(values)
  }

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen(true)
    setActionType('Add')
  }

  const modalSubmit = () => {
    let keySettingId = checkedValues?.map((value) => ({id: value}))
    dispatch(key?.actions?.deleteKey(keySettingId))
    handleAlertClose()
  }

  const handleRefresh = () => {
    dispatch(key.actions.getKey(params))
  }

  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Key Settings'
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
            data={keySettingData}
            showLoading={keyData?.loading}
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
            total={10}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
          <AddKey
            open={open}
            params={params}
            handleClose={handleClose}
            actionType={actionType}
            editSelectedData={editSelectedData}
          />
        </div>

        {alertOpen &&
          (!isEmpty(checkedValues) ? (
            <DeleteModal
              handleClick={() => modalSubmit()}
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

export default KeySettings
