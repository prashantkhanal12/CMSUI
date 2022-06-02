import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {ErrorMessage, Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import * as documentSubCategory from '../index'
import * as documentCategoryRedux from '../../documentCategory/index'
import {StateParamsModel} from 'src/app/modules/common/Model'

import Modal from 'rsuite/Modal'

import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  documentCategoryId: Yup.string().required('Document category is required'),
  name: Yup.string().required('Name is required'),
  status: Yup.string().required('Status is required'),
})

const AddDocumentSubCategory = ({
  open,
  params,
  handleClose,
  actionType,
  editSelectedData,
}: Props) => {
  const dispatch = useDispatch()
  const {loading, success} = useSelector((state: any) => state.documentSubCategory)
  const {
    data: {documentCategory},
  } = useSelector((state: any) => state.documentCategory)

  useEffect(() => {
    dispatch(documentCategoryRedux.actions.getAllDocumentCategory())
  }, [])

  const documentCategoryOptions = documentCategory.map((item: {[key: string]: string}) => ({
    label: item.name,
    value: item.id,
  }))

  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]

  useEffect(() => {
    if (success) {
      dispatch(documentSubCategory?.actions.getDocumentSubCategory(params))
      isEmpty(editSelectedData)
        ? toast.success('Document sub category added successfully')
        : toast.success('Document sub category edited successfully')
      dispatch(documentSubCategory?.actions?.resetDocumentSubCategory())
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
          <Modal.Title>{actionType} Document Sub Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                documentCategoryId: '',
                name: '',
                slug: '',
                status: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                const formData = {
                  ...values,
                  slug: !isEmpty(editSelectedData)
                    ? editSelectedData?.slug
                    : values?.name.replace(/\s/g, '-').toLowerCase(),
                  status: values?.status === 'Active' ? true : false,
                }

                if (!isEmpty(editSelectedData)) {
                  dispatch(
                    documentSubCategory.actions.updateDocumentSubCategory(
                      formData,
                      editSelectedData?.id
                    )
                  )
                } else {
                  dispatch(documentSubCategory.actions.addDocumentSubCategory(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'description',
                      'description_np',
                      'slug',
                      'id',
                      'name',
                      'name_np',
                    ]
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue(
                      'documentCategoryId',
                      editSelectedData?.documentCategory?.id,
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
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select'
                            label='Document Sub Category'
                            name='documentCategoryId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={documentCategoryOptions}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                      </div>
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
                            required
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
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Branch Description (EN)'
                            name='description'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.description : ''
                            }
                            handleChange={handleChange}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Branch Description (NP)'
                            name='description_np'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.description_np : ''
                            }
                            handleChange={handleChange}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Slug'
                            label='Slug'
                            name='slug'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            disabled={true}
                            value={
                              !isEmpty(editSelectedData)
                                ? editSelectedData?.slug
                                : values?.name.replace(/\s/g, '-').toLowerCase()
                            }
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <label className='form-label fw-bolder text-dark fs-6 required'>
                            Status
                          </label>

                          <div className='d-flex ms-5'>
                            {statusOptions?.map((status: {label: string; value: string}) => (
                              <FormRadio
                                containerClassName=''
                                label='Select Status'
                                name='status'
                                type='radio'
                                onChange={handleChange}
                                errors={errors}
                                touched={touched}
                                required={true}
                                checkBoxText={status?.label}
                                value={status?.value}
                              />
                            ))}
                          </div>
                          <div className='fv-plugins-message-container text-danger fw-bolder small text-end mt-1'>
                            <ErrorMessage
                              name='status'
                              component='div'
                              className='field-error-message'
                            />
                          </div>
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
export default AddDocumentSubCategory
