import Input from 'rsuite/Input'
import InputGroup from 'rsuite/InputGroup'
import SearchIcon from '@rsuite/icons/Search'
import {FaPlus} from 'react-icons/fa'
import Pagination from 'rsuite/Pagination'
import Table from 'rsuite/Table'
import {useState, useEffect} from 'react'
import {SortType} from 'rsuite-table/lib/@types/common'
import {useSelector, useDispatch} from 'react-redux'
import IconButton from 'rsuite/IconButton'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import Edit2 from '@rsuite/icons/Edit'
import {useParams} from 'react-router-dom'

//Manual import
import RSuiteTable from 'src/cms/helpers/components/rsuiteTable'
import {StateParamsModel} from 'src/app/modules/common/Model'
import CheckPermissions from 'src/app/modules/common/checkPermission'
import AddFaqManager from './AddFaqManager'
import {IFaqManagerState} from '../redux'
import * as faqManagerRedux from '../../faqManager/redux'

const Cell = Table.Cell
const FaqManager = () => {
  const dispatch = useDispatch()
  const parameter: {id: string} = useParams()
  const [actionType, setActionType] = useState('Add')
  const [alertOpen, setAlertOpen] = useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = () => setAlertOpen(false)
  const [open1, setOpen1] = useState(false)
  const [editSelectedData, setEditCheckedData] = useState<any>({})
  const [selectedData, setSelectedData] = useState<Array<string>>([])

  const handleClose1 = () => setOpen1(false)

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

  const faqManagerData: IFaqManagerState = useSelector((state: any) => state.faqManager)

  useEffect(() => {
    dispatch(faqManagerRedux.actions.getFaqManager(params, parameter?.id))
  }, [params, parameter?.id])

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
              icon={<Edit2 />}
            />
          </Whisper>
        </CheckPermissions>
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
      label: 'Question',
      flexGrow: 1,
      dataKey: 'faq_qna.question',
      cell: <Cell>{(rowData) => rowData?.faq_qna.map((item: any) => item.question)}</Cell>,
      sortable: true,
    },
    {
      label: 'Question (NP)',
      flexGrow: 1,
      dataKey: 'faq_qna.question_np',
      cell: <Cell>{(rowData) => rowData?.faq_qna.map((item: any) => item.question_np)}</Cell>,
      sortable: true,
    },
  ]

  const handleCheck = (data: any) => {
    setSelectedData(data)
  }

  const handleSort = (dataKey: string, sortType?: SortType) => {
    setParams({...params, orderBy: dataKey, order: sortType})
  }

  const data = faqManagerData?.data?.faqQuestion
    ? faqManagerData?.data?.faqQuestion?.map((item: any, i: number) => ({
        sn: (params?.page - 1) * params?.limit + (i + 1),
        faq_qna: [
          {
            id: item.id,
            answer: item.answer,
            answer_np: item.answer_np,
            question: item.question,
            question_np: item.question_np,
          },
        ],
      }))
    : []

    const handleRefresh = () => {
      dispatch(faqManagerRedux.actions.getFaqManager(params, parameter?.id))
    }

  return (
    <div className='shadow p-3 bg-white rounded'>
      <div className='heading__component__title fw-bolder mb-4'>FAQs Category Manager</div>
      <div className='d-flex justify-content-between align-items-center mb-5'>
        <InputGroup inside className='w-25'>
          <Input
            placeholder='Search'
            onChange={(value: string) => setParams({...params, search: value})}
          />
          <InputGroup.Addon>
            <SearchIcon />
          </InputGroup.Addon>
          <InputGroup.Addon>
            <SearchIcon />
          </InputGroup.Addon>
        </InputGroup>
        <div style={{display: 'flex'}}>
          <div
            className='sub_button'
            onClick={() => {
              setEditCheckedData({faq_qna: faqManagerData?.data?.faqQuestion})
              setActionType('Add')
              setOpen1(true)
            }}
          >
            <button className='heading__component__btn btn btn-primary'>
              <FaPlus />

              <span style={{paddingLeft: '5px'}}>Update Questions</span>
            </button>
          </div>
        </div>
      </div>

      <div className='datatable'>
        <RSuiteTable
          showCheckbox={true}
          columns={columns}
          data={data}
          checkedValues={selectedData}
          showLoading={faqManagerData?.loading}
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
          size='xs'
          layout={['total', '-', 'limit', '|', 'pager']}
          total={faqManagerData?.data?.meta?.total}
          limitOptions={[10, 20, 50, 100]}
          limit={params?.limit}
          activePage={params?.page}
          onChangePage={(value) => setParams({...params, page: value})}
          onChangeLimit={handleChangeLimit}
        />
      </div>

      {open1 && (
        <AddFaqManager
          faqCategoryId={parameter?.id}
          open={open1}
          handleClose={handleClose1}
          actionType={actionType}
          editSelectedData={editSelectedData}
        />
      )}
    </div>
  )
}
export default FaqManager
