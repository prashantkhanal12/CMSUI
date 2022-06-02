import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import * as documentRedux from '../index'
import * as documentCategoryRedux from '../../documentCategory/index'
import * as documentSubCategoryRedux from '../../documentSubCategory/index'
import {StateParamsModel} from 'src/app/modules/common/Model'

import Modal from 'rsuite/Modal'

import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormInputMediaManager from 'src/cms/helpers/components/forms/FormInputMediaManager'
import {imageBaseUrl} from 'src/cms/helpers/constants'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  documentCategoryId: Yup.string().required('Document category is required'),
  documentSubCategoryId: Yup.string().required('Document sub-category is required'),
  quaterId: Yup.string().required('Quater is required'),
  file: Yup.string().required('File is required'),
  fiscalYear: Yup.string().required('Fiscal year is required'),
  nepaliMonth: Yup.string().required('Nepali month is required'),
  nepaliYear: Yup.string().required('Nepali year is required'),
})

const AddDocument = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState<any>('')

  const {fiscal_year, quater, loading, success} = useSelector((state: any) => state.manageDocument)
  const [docCategory, setDocCategory] = useState('')
  const [selectFiscalYear, setSelectFiscalYear] = useState('')

  const {
    data: {documentCategory},
  } = useSelector((state: any) => state.documentCategory)

  const {
    data: {documentSubCategory},
  } = useSelector((state: any) => state.documentSubCategory)

  useEffect(() => {
    dispatch(documentCategoryRedux.actions.getAllDocumentCategory())
    dispatch(documentRedux.actions.getFiscalYear())
    dispatch(documentRedux.actions.getQuater())
  }, [])

  useEffect(() => {
    if (!isEmpty(docCategory)) {
      dispatch(documentSubCategoryRedux.actions.getAllDocumentSubCategory(docCategory))
    }
  }, [docCategory])

  const documentCategoryOptions = documentCategory.map((item: {[key: string]: string}) => ({
    label: item.name,
    value: item.id,
  }))

  const documentSubCategoryOptions = documentSubCategory.map((item: {[key: string]: string}) => ({
    label: item.name,
    value: item.id,
  }))

  const fiscalYearOptions = fiscal_year.map((item: {[key: string]: string}) => ({
    label: item.year,
    value: item.year,
  }))

  const quaterOptions = quater.map((item: {[key: string]: string}) => ({
    label: item.displayName,
    value: item.id,
  }))
  //Split Year using Fiscal Year

  const myArray = selectFiscalYear.split('/')
  const yearOptions = myArray.map((item: string) => ({
    label: item,
    value: item,
  }))

  //Nepali Month
  const monthOptions = [
    {label: 'Baisakh', value: 'baisakh'},
    {label: 'Jestha', value: 'jestha'},
    {label: 'Ashad', value: 'ashad'},
    {label: 'Shrawan', value: 'shrawan'},
    {label: 'Ashwin', value: 'ashwin'},
    {label: 'Kartik', value: 'kartik'},
    {label: 'Mangsir', value: 'mangsir'},
    {label: 'Poush', value: 'poush'},
    {label: 'Magh', value: 'magh'},
    {label: 'Falgun', value: 'falgun'},
    {label: 'Chaitra', value: 'chaitra'},
  ]

  useEffect(() => {
    if (success) {
      dispatch(documentRedux?.actions.getDocument(params))
      isEmpty(editSelectedData)
        ? toast.success('Document added successfully')
        : toast.success('Document edited successfully')
      dispatch(documentRedux?.actions?.resetDocument())
      handleClose()
    }
  }, [success])

  return (
    <div className='modal-container'>
      <Modal
        open={open}
        onClose={handleClose}
        className='w-75'
        backdrop='static'
        keyboard={false}
        enforceFocus={false}
      >
        <Modal.Header>
          <Modal.Title>{actionType} Document </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{overflow: 'visible'}}>
          <div>
            <Formik
              initialValues={{
                name: '',
                status: '',
                documentCategoryId: '',
                documentSubCategoryId: '',
                quaterId: '',
                slug: '',
                fiscalYear: '',
                nepaliMonth: '',
                nepaliYear: '',
                file: null || '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                const formData = {
                  ...values,

                  status: values?.status === 'Active' ? true : false,
                }
                if (!isEmpty(editSelectedData)) {
                  dispatch(documentRedux.actions.updateDocument(formData, editSelectedData?.id))
                } else {
                  dispatch(documentRedux.actions.addDocument(formData))
                }
              }}
            >
              {({touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'id',
                      'name',
                      'name_np',
                      'file',
                      'fiscalYear',
                      'nepaliYear',
                      'nepaliMonth',
                      'quaterId',
                    ]
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue(
                      'documentCategoryId',
                      editSelectedData?.documentSubCategory.documentCategory?.id,
                      false
                    )
                    setFieldValue(
                      'documentSubCategoryId',
                      editSelectedData?.documentSubCategory?.id,
                      false
                    )
                    setFieldValue(
                      'status',
                      editSelectedData?.status === true ? 'Active' : 'Inactive',
                      false
                    )
                  }
                }, [])

                return (
                  <Form>
                    <div className='card-body border-top pt-5'>
                      <div className='row'>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Name'
                            label='Name (EN)'
                            name='name'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Name (NP)'
                            label='Name (NP)'
                            name='name_np'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select'
                            label='Document Category'
                            name='documentCategoryId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={documentCategoryOptions}
                            values={values}
                            setFieldValue={setFieldValue}
                            required={true}
                          />
                        </div>
                        {!isEmpty(values?.documentCategoryId)
                          ? setDocCategory(values?.documentCategoryId)
                          : null}
                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select'
                            label='Document Sub Category'
                            name='documentSubCategoryId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={documentSubCategoryOptions}
                            values={values}
                            setFieldValue={setFieldValue}
                            required={true}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormInputMediaManager
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            label='File'
                            name='file'
                            setFieldValue={setFieldValue}
                            setImageUrl={setImageUrl}
                            value={values?.file}
                            required={true}
                          />

                          {!isEmpty(values?.file) ? (
                            <>
                              <li className='listing'>
                                <div className='thumbImageBlock'>
                                  <button
                                    type='button'
                                    title='Remove'
                                    className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                                    onClick={() => {
                                      setImageUrl('')
                                      setFieldValue('file', '')
                                    }}
                                  >
                                    Delete
                                  </button>

                                  <img
                                    className='thumbImage w-100 h-100'
                                    src={`${imageBaseUrl}/${values?.file}`}
                                    alt=''
                                  />
                                </div>
                              </li>
                            </>
                          ) : null}
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select'
                            label='Fiscal Year'
                            name='fiscalYear'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={fiscalYearOptions}
                            values={values}
                            setFieldValue={setFieldValue}
                            required={true}
                          />
                        </div>
                        {!isEmpty(values?.fiscalYear)
                          ? setSelectFiscalYear(values?.fiscalYear)
                          : null}
                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select'
                            label='Year'
                            name='nepaliYear'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={yearOptions}
                            values={values}
                            setFieldValue={setFieldValue}
                            required={true}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select'
                            label='Month'
                            name='nepaliMonth'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={monthOptions}
                            values={values}
                            setFieldValue={setFieldValue}
                            required={true}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select'
                            label='Quater'
                            name='quaterId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={quaterOptions}
                            values={values}
                            setFieldValue={setFieldValue}
                            required={true}
                          />
                        </div>
                      </div>
                    </div>

                    <div className='d-flex justify-content-end px-9 '>
                      <button
                        type='submit'
                        disabled={loading}
                        className='btn btn-primary btn-sm ms-3'
                      >
                        Save
                      </button>
                      <button
                        type='button'
                        onClick={handleClose}
                        className='btn btn-secondary btn-sm ms-3'
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default AddDocument
