import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

// rsuite
import Table from 'rsuite/Table'
import {Input, InputGroup, MaskedInput, Toggle} from 'rsuite'
// icons
import {FaPlus, FaCircle} from 'react-icons/fa'
import {FiCircle} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'

// includes
import * as groupSetting from 'src/app/modules/siteSettings/components/settings/groupSetting'
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import {IGroupSettingState} from 'src/app/modules/siteSettings/components/settings/groupSetting'
import Pagination from 'rsuite/Pagination'
import IconButton from 'rsuite/esm/IconButton'
import Edit2 from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import VisibleIcon from '@rsuite/icons/Visible'
import SearchIcon from '@rsuite/icons/Search'
import Whisper from 'rsuite/esm/Whisper'
import More from '@rsuite/icons/More'
import Popover from 'rsuite/esm/Popover'
import Dropdown from 'rsuite/esm/Dropdown'
import {toast} from 'react-toastify'
import {KeyModel} from '../Model'
import AddKey from './AddKey'
import DesignComponent from 'src/app/modules/common/components/designComponent'
// import KeySettings from './../KeySettings';

const GroupSetting = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [actionType, setActionType] = useState('Add')
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  })
  const [checkedValues, setCheckedValues] = useState<Array<string>>([])
  const [editSelectedData, setEditCheckedData] = useState<KeyModel>()

  const groupSettingData: IGroupSettingState = useSelector((state: any) => state.groupSetting)
  useEffect(() => {
    dispatch(groupSetting.actions.getKey(params))
  }, [params])

  const handleChangeLimit = (dataKey: number) => {
    setParams({
      ...params,
      limit: dataKey,
    })
  }
  useEffect(() => {
    if (groupSettingData?.deleteSuccess) {
      toast.success('Key deleted successfully')
      dispatch(groupSetting?.actions.getKey())
    }
  }, [groupSettingData])

  const ActionCell = ({rowData, dataKey, ...props}: any) => {
    function handleAction() {
      alert(`id:${rowData[dataKey]}`)
    }
    return (
      <Cell {...props} className='link-group'>
        <IconButton
          appearance='subtle'
          onClick={() => {
            setEditCheckedData(rowData)
            setActionType('Edit')
            setOpen(true)
          }}
          icon={<Edit2 />}
        />
        <IconButton
          appearance='subtle'
          onClick={() => {
            let settingGroupId = [{id: rowData.id}]
            // let settingGroupId = checkedValues?.map((value) => ({ id: value }))
            dispatch(groupSetting?.actions?.deleteKey(settingGroupId))
          }}
          icon={<TrashIcon />}
        />

        {/* <Toggle size="sm" /> */}
        {/* <IconButton appearance='subtle' onClick={handleAction} icon={<VisibleIcon />} /> */}
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
    },
    // {
    //   label: 'Action',
    //   width: 150,
    //   align: 'center',
    //   cell: <ActionCell dataKey='id' />,
    // },
  ]
  const handleChecked = (values: Array<string>) => {
    setCheckedValues(values)
  }

  const data = groupSettingData?.data?.settingGroup
    ? groupSettingData?.data?.settingGroup?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        id: item?.id,
        name: item?.name,
      }))
    : []

  const handleAddModal = () => {
    setEditCheckedData({})
    setOpen(true)
    setActionType('Add')
  }

  const handleRefresh = () => {
    dispatch(groupSetting.actions.getKey(params))
  }
  return (
    <>
      <div className='shadow p-3 bg-white rounded'>
        <DesignComponent
          moduleName='Group Settings'
          params={params}
          setParams={setParams}
          handleRefresh={handleRefresh}
          handleAddModal={handleAddModal}
          deleteShow={false}
          exportShow={false}
          importShow={false}
          toggleMultipleShow={false}
        />

        <div className='datatable'>
          <RSuiteTable
            onChecked={handleChecked}
            showCheckbox={false}
            columns={columns}
            data={data}
            showLoading={groupSettingData?.loading}
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
            total={groupSettingData?.data?.meta?.total || 0}
            limitOptions={[10, 20, 50, 100]}
            limit={params?.limit}
            activePage={params?.page}
            onChangePage={(value) => setParams({...params, page: value})}
            onChangeLimit={handleChangeLimit}
          />
          <AddKey
            open={open}
            handleClose={handleClose}
            actionType={actionType}
            editSelectedData={editSelectedData}
          />
        </div>
      </div>
    </>
  )
}

export default GroupSetting
