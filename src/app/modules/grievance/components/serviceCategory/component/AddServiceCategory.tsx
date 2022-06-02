import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {ErrorMessage, Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import * as serviceCategory from '../index'
import {StateParamsModel} from 'src/app/modules/common/Model'

import Modal from 'rsuite/Modal'

import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Must not contain number or symbol'),
  status: Yup.string().required('Status is required'),
})

const AddServiceCategory = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const {loading, success} = useSelector((state: any) => state.serviceCategory)

  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]

  const showAccountFieldOptions = [
    {label: 'Yes', value: 'Yes'},
    {label: 'No', value: 'No'},
  ]

  useEffect(() => {
    if (success) {
      dispatch(serviceCategory?.actions.getServiceCategory(params))
      isEmpty(editSelectedData)
        ? toast.success('Service Category added successfully')
        : toast.success('Service Category edited successfully')
      dispatch(serviceCategory?.actions?.resetServiceCategory())
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
          <Modal.Title>{actionType} Service Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                name: '',
                status: '',
                showAccountNumberField: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                const formData = {
                  ...values,
                  status: values?.status === 'Active' ? true : false,
                  showAccountNumberField: values?.showAccountNumberField === 'Yes' ? true : false,
                }

                if (!isEmpty(editSelectedData)) {
                  dispatch(
                    serviceCategory.actions.updateServiceCategory(formData, editSelectedData?.id)
                  )
                } else {
                  dispatch(serviceCategory.actions.addServiceCategory(formData))
                }
              }}
            >
              {({touched, handleChange, errors, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = ['id', 'name', 'nameNp', 'note', 'noteNp', 'serviceCodeId']
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue(
                      'showAccountNumberField',
                      editSelectedData?.showAccountNumberField === true ? 'Yes' : 'No',
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
                            name='nameNp'
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
                            placeholder='Service Code ID'
                            label='Service Code ID'
                            name='serviceCodeId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <label className='form-label fw-bolder text-dark fs-6 '>
                            Show Account Number Field
                          </label>

                          <div className='d-flex ms-5'>
                            {showAccountFieldOptions?.map(
                              (showOptions: {label: string; value: string}) => (
                                <FormRadio
                                  containerClassName=''
                                  name='showAccountNumberField'
                                  type='radio'
                                  onChange={handleChange}
                                  errors={errors}
                                  touched={touched}
                                  required={true}
                                  checkBoxText={showOptions?.label}
                                  value={showOptions?.value}
                                />
                              )
                            )}
                          </div>
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Note (EN)'
                            name='note'
                            initialValue={!isEmpty(editSelectedData) ? editSelectedData?.note : ''}
                            handleChange={handleChange}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Note (NP)'
                            name='noteNp'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.noteNp : ''
                            }
                            handleChange={handleChange}
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
export default AddServiceCategory
