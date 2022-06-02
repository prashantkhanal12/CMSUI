import {useEffect, useState} from 'react'
import CheckPermissions from '../checkPermission'
import {FaPlus} from 'react-icons/fa'
import SearchIcon from '@rsuite/icons/Search'
import CloseIcon from '@rsuite/icons/Close'
import ReloadIcon from '@rsuite/icons/Reload'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {ItemType, StateParamsModel} from '../Model'
import InputGroup from 'rsuite/InputGroup'
import Input from 'rsuite/Input'
import {isEmpty} from 'lodash'

//includes
import SortModal from './sortModal'
import {Form, Formik} from 'formik'
import DatePickerForGrievance from 'src/cms/helpers/components/forms/DatePickerForGrievance'
import moment from 'moment'

interface Props {
  moduleName: string
  params?: StateParamsModel
  setParams?: any
  handleAddModal?: () => void
  handleAddNotice?: () => void
  handleAlertOpen?: () => void
  enableMultiple?: () => void
  disableMultiple?: () => void
  handleExport?: () => void
  handleRefresh?: () => void
  handleGetAllData?: () => void
  handleTemplateExport?: () => void
  templateLinkShow?: boolean
  templateButtonName?: string
  handleImport?: any
  filterData?: boolean
  addShow?: boolean
  addNoteShow?: boolean
  deleteShow?: boolean
  exportShow?: boolean
  importShow?: boolean
  toggleMultipleShow?: boolean
  exportButtonName?: string
  sortShow?: boolean
  sortButtonName?: string
  openSortModal?: boolean
  setOpenSortModal?: any
  data?: Array<{[key: string]: string | number}> | undefined
  handleSubmitSort?: (data: Array<ItemType>) => void
  loading?: boolean
}

const DesignComponent = ({
  moduleName,
  params,
  setParams,
  handleAddModal,
  handleAddNotice,
  handleAlertOpen,
  handleExport,
  enableMultiple,
  disableMultiple,
  handleRefresh,
  handleGetAllData,
  handleTemplateExport,
  handleImport,
  templateLinkShow = false,
  templateButtonName,
  filterData = false,
  addShow = true,
  addNoteShow = false,
  deleteShow = true,
  exportShow = true,
  importShow = true,
  toggleMultipleShow = true,
  exportButtonName,
  sortShow,
  sortButtonName,
  data,
  openSortModal,
  setOpenSortModal,
  handleSubmitSort,
  loading,
}: Props) => {
  const [sortData, setSortData] = useState<Array<ItemType>>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!isEmpty(data)) {
      let newSortData: any = data
        ? data?.map((item, i) => {
            return {
              id: i,
              keyId: item?.id,
              name: item?.name,
              title: item?.title,
              parentId: item?.parent ? item?.parent : null,
              children: !isEmpty(item?.children) ? item?.children : null,
            }
          })
        : []
      setSortData(newSortData)
    }
  }, [data])

  const handleCloseOpenSortModal = () => {
    setOpenSortModal(false)
  }

  useEffect(() => {
    setParams({...params, search: searchQuery})
  }, [searchQuery])

  return (
    <>
      <div className='row g-0 border-bottom align-items-center mb-3 py-3'>
        <div className='col-lg-6'>
          <div className='heading__component__title fw-bolder '>{moduleName}</div>
        </div>
        <div className='col-lg-6'>
          <div className='d-flex justify-content-end'>
            {addShow ? (
              <div className='sub_button' onClick={handleAddModal}>
                <CheckPermissions type='Add'>
                  <button className='dt-btn dt-btn-primary'>
                    <FaPlus className='me-2' />
                    Add
                  </button>
                </CheckPermissions>
              </div>
            ) : null}
            {deleteShow ? (
              <CheckPermissions type='Delete'>
                <div className='sub_button'>
                  <button className='dt-btn dt-btn-secondary' onClick={handleAlertOpen}>
                    <RiDeleteBin6Line className='me-2' />
                    Delete
                  </button>
                </div>
              </CheckPermissions>
            ) : null}
          </div>
        </div>
      </div>
      {filterData ? (
        <div className='d-flex me-5 mb-3'>
          <div className='d-flex'>
            <Formik
              initialValues={{
                fromDate: '',
                toDate: '',
              }}
              onSubmit={(values) => {
                setParams({
                  ...params,
                  fromDate: moment(values?.fromDate).format('YYYY-MM-DD'),
                  toDate: moment(values?.toDate).format('YYYY-MM-DD'),
                })
              }}
            >
              {({touched, handleChange, errors, values, setFieldValue}) => {
                return (
                  <Form>
                    <div className='d-flex flex-row'>
                      <div className='col-5' style={{zIndex: 10}}>
                        <DatePickerForGrievance
                          containerClassName='col-12'
                          name='fromDate'
                          placeholderText='From date'
                          setFieldValue={setFieldValue}
                          value={values.fromDate || false}
                          touched={touched}
                          required={true}
                          showIcon={true}
                          errors={errors}
                        />
                      </div>
                      <div className='col-5 ms-5' style={{zIndex: 10}}>
                        <DatePickerForGrievance
                          containerClassName='col-12'
                          name='toDate'
                          placeholderText='To date'
                          setFieldValue={setFieldValue}
                          value={values.toDate || false}
                          touched={touched}
                          required={true}
                          showIcon={true}
                          errors={errors}
                        />
                      </div>
                      <div className='col-12 ms-5'>
                        <button type='submit' disabled={loading} className='btn btn-primary btn'>
                          Filter
                        </button>
                      </div>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
      ) : null}

      {templateLinkShow ? (
        <div className='d-flex justify-content-end align-items-center mb-5'>
          <div className='sub_button'>
            <button
              className='dt-btn dt-btn-outline-primary dt-btn-sm'
              onClick={handleTemplateExport}
            >
              {templateButtonName}
            </button>
          </div>
        </div>
      ) : null}

      <div className='d-flex justify-content-between align-items-center mb-5'>
        <InputGroup inside className='w-25'>
          <Input
            placeholder='Search'
            value={searchQuery}
            onChange={(value: string) => setSearchQuery(value)}
          />
          <InputGroup.Addon>
            {!isEmpty(params?.search) ? (
              <CloseIcon style={{cursor: 'pointer'}} onClick={() => setSearchQuery('')} />
            ) : (
              <SearchIcon />
            )}
            {/* <SearchIcon /> */}
          </InputGroup.Addon>
        </InputGroup>

        <div className='d-flex'>
          <div className='d-flex'>
            <div className='sub_button'>
              <button className='dt-btn dt-btn-outline-primary dt-btn-sm' onClick={handleRefresh}>
                <ReloadIcon />
              </button>
            </div>
            {addNoteShow ? (
              <div className='sub_button' onClick={handleAddNotice}>
                <CheckPermissions type='Add'>
                  <button className='dt-btn dt-btn-outline-primary dt-btn-sm'>Update Note</button>
                </CheckPermissions>
              </div>
            ) : null}

            {exportShow ? (
              <div className='sub_button'>
                <button className='dt-btn dt-btn-outline-primary dt-btn-sm' onClick={handleExport}>
                  {exportButtonName || 'Export to CSV'}
                </button>
              </div>
            ) : null}
            {importShow ? (
              <div className='sub_button'>
                <form action='#'>
                  <div className='input-file-container'>
                    <input
                      className='input-file'
                      id='my-file'
                      type='file'
                      onChange={handleImport}
                    />
                    <label
                      className='dt-btn dt-btn-outline-primary dt-btn-sm input-file-trigger'
                      htmlFor='my-file'
                    >
                      Import
                    </label>
                  </div>
                </form>
              </div>
            ) : null}
            {toggleMultipleShow ? (
              <>
                <div className='sub_button'>
                  <button
                    className='dt-btn dt-btn-outline-primary dt-btn-sm'
                    onClick={enableMultiple}
                  >
                    Active
                  </button>
                </div>
                <div className='sub_button'>
                  <button
                    className='dt-btn dt-btn-outline-primary dt-btn-sm'
                    onClick={disableMultiple}
                  >
                    Inactive
                  </button>
                </div>
              </>
            ) : null}

            {sortShow ? (
              <div
                className='sub_button'
                onClick={async () => {
                  handleGetAllData && handleGetAllData()
                  setOpenSortModal(true)
                }}
              >
                <button className='dt-btn dt-btn-outline-primary dt-btn-sm'>
                  {sortButtonName || 'Sort'}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <SortModal
        isOpen={openSortModal}
        handleClose={handleCloseOpenSortModal}
        data={sortData}
        setSortData={setSortData}
        sortButtonName={sortButtonName}
        handleSubmitSort={handleSubmitSort}
        loading={loading}
      />
    </>
  )
}

export default DesignComponent
