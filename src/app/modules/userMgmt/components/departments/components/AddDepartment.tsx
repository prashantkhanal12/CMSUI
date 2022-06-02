import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import {toast} from 'react-toastify'
import {ErrorMessage, Form, Formik} from 'formik'
import {isEmpty} from 'lodash'
import Modal from 'rsuite/Modal'
import * as departments from '../index'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import {StateParamsModel} from 'src/app/modules/common/Model'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const AddDepartment = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const {loading, success} = useSelector((state: any) => state.departments)
  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]

  // form validation
  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .matches(/^[A-Za-z\s]+$/, 'Must not contain number or symbol'),
    status: Yup.string().required('Status is required'),
  })
  useEffect(() => {
    if (success) {
      dispatch(departments?.actions.getDepartment(params))
      isEmpty(editSelectedData)
        ? toast.success('Department added successfully')
        : toast.success('Department edited successfully')
      dispatch(departments?.actions?.createDepartmentReset())
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
          <Modal.Title>{actionType} Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                name: '',
                status: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, {setSubmitting}) => {
                const formData = {
                  ...values,
                  status: values?.status === 'Active' ? true : false,
                }

                if (!isEmpty(editSelectedData)) {
                  dispatch(departments.actions.updateDepartment(formData, editSelectedData?.id))
                } else {
                  dispatch(departments.actions.createDepartment(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = ['name', 'description', 'descriptionNp', 'nameNp']
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
                            containerClassName='col-lg-12'
                            labelClassName='col-lg-12'
                            type='text'
                            placeholder='Name '
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
                            containerClassName='col-lg-12'
                            labelClassName='col-lg-12'
                            type='text'
                            placeholder='Name (NP)'
                            label='Name (NP)'
                            name='nameNp'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <div className='col-md-12 col-sm-12 col-xs-12'>
                            <FormTinyMce
                              containerClassName='col-md-12'
                              label='Description (EN)'
                              name='description'
                              initialValue={
                                !isEmpty(editSelectedData) ? editSelectedData?.description : ''
                              }
                              handleChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <div className='col-md-12 col-sm-12 col-xs-12'>
                            <FormTinyMce
                              containerClassName='col-md-12'
                              label='Description (NP)'
                              name='descriptionNp'
                              initialValue={
                                !isEmpty(editSelectedData) ? editSelectedData?.descriptionNp : ''
                              }
                              handleChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <div className='col-lg-12'>
                            <div className='row mb-6'>
                              <div className='col-lg-6'>
                                <div className='d-flex'>
                                  <label className='form-label fw-bolder text-dark fs-6 required'>
                                    Status
                                  </label>

                                  <div className='d-flex ms-5'>
                                    {statusOptions?.map(
                                      (status: {label: string; value: string}) => (
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
                                      )
                                    )}
                                  </div>
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
export default AddDepartment
