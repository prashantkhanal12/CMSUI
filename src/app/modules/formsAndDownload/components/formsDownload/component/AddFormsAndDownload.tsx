import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {ErrorMessage, Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import * as Yup from 'yup'

import * as formDownloadRedux from '../index'
import {StateParamsModel} from 'src/app/modules/common/Model'

import Modal from 'rsuite/Modal'

import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
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
  title: Yup.string()
    .required('Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Must not contain number or symbol'),
  status: Yup.string().required('Status is required'),
})

const AddFormsAndDownload = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const {loading, success} = useSelector((state: any) => state.formsAndDownload)

  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]

  useEffect(() => {
    if (success) {
      dispatch(formDownloadRedux?.actions.getFormsDownload(params))
      isEmpty(editSelectedData)
        ? toast.success('Form added successfully')
        : toast.success('Form edited successfully')
      dispatch(formDownloadRedux?.actions?.resetFormsDownload())
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
          <Modal.Title>{actionType} Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                id:'',
                title: '',
                titleNp: '',
                attached_file_title: '',
                attached_file: '',
                published_date:'',
                slug: '',
                status: '',
                image:"",
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                const formData = {
                  ...values,
                  slug: !isEmpty(editSelectedData)
                    ? editSelectedData?.slug
                    : values?.title.replace(/\s/g, '-').toLowerCase(),
                  status: values?.status === 'Active' ? true : false,
                }

                if (!isEmpty(editSelectedData)) {
                  dispatch(
                    formDownloadRedux.actions.updateFormsDownload(formData, editSelectedData?.id)
                  )
                } else {
                  dispatch(formDownloadRedux.actions.addFormsDownload(formData))
                }
              }}
            >
              {({touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'id',
                      'title',
                      'title_np',
                      'attached_file_title',
                      'attached_file',
                      'published_date',
                      'slug',
                      'status',
                      'image'
                    ]
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
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
                            label='Title (EN)'
                            name='title'
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
                            label='Title (NP)'
                            name='titleNp'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Attached file title'
                            label='Attached file title (EN)'
                            name='attached_file_title'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormInputMediaManager
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            label='Attached File'
                            name='image'
                            setFieldValue={setFieldValue}
                            value={values?.image}
                          />
                          {!isEmpty(values?.image) ? (
                            <>
                              <li className='listing'>
                                <div className='thumbImageBlock'>
                                  <button
                                    type='button'
                                    title='Remove'
                                    className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                                    onClick={() => {
                                      setFieldValue('image', '')
                                    }}
                                  >
                                    Delete
                                  </button>

                                  <img
                                    className='thumbImage w-100 h-100'
                                    src={`${!imageBaseUrl.includes("framework")?imageBaseUrl+"/framework":imageBaseUrl}/${values?.image}`}
                                    alt=''
                                  />
                                </div>
                              </li>
                            </>
                          ) : null}
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='date'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter publish date'
                            label='Publish Date'
                            name='published_date'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
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
                                : values?.title.replace(/\s/g, '-').toLowerCase()
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
export default AddFormsAndDownload
