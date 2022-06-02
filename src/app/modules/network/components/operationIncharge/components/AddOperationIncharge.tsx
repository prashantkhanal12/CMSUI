import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import {ErrorMessage, Form, Formik} from 'formik'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import {toast} from 'react-toastify'
import Modal from 'rsuite/Modal'
import {isEmpty} from 'lodash'
// branch
import * as branch from '../../../components/branch'
import {StateParamsModel} from 'src/app/modules/common/Model'

import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import FormCheckbox from 'src/cms/helpers/components/forms/FormCheckbox'
import * as operationIncharge from '../index'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  branchId: Yup.string().required('Branch is required'),
  hidden_in_webiste: Yup.string().required('The hidden in webiste field is required.'),
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Must not contain number or symbol'),
  email: Yup.string()
    .email('Invalid Email. Eg: example@xyz.com')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Please provide valid email')
    .nullable(),
  phone: Yup.string().nullable()
    .matches(/^(98|97)([0-9]{8})$/, 'Enter valid phone number')
    .max(10, 'Phone number exceeds 10 digits'),
  telephone: Yup.string()
    .matches(/^[0-9][0-9]*$/, 'Must contain only number')
    .max(10, 'Telephone exceeds 10 digits'),
  status: Yup.string().required('Status is required'),
})

const AddOperationIncharge = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()

  const {loading, success} = useSelector((state: any) => state.operationIncharge)
  const {data: branchData} = useSelector((state: any) => state.branch)

  useEffect(() => {
    dispatch(branch.actions.getAllBranchList())
  }, [])

  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]

  const branchOptions = branchData?.branch?.map((items: any) => ({
    label: items.title,
    value: items.id,
  }))

  useEffect(() => {
    if (success) {
      dispatch(operationIncharge?.actions.getOperationIncharge(params))
      isEmpty(editSelectedData)
        ? toast.success('Operation Incharge added successfully')
        : toast.success('Operation Incharge edited successfully')
      dispatch(operationIncharge?.actions?.addOperationInchargeReset())
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
          <Modal.Title>{actionType} Operation Incharge</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                name: '',
                name_np: '',
                email: '',
                phone: '',
                telephone: '',
                hidden_in_webiste: false,
                status: '',
                branchId: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, {setSubmitting}) => {
                const formData = {
                  ...values,
                  status: values?.status === 'Active' ? true : false,
                }
                if (!isEmpty(editSelectedData)) {
                  dispatch(
                    operationIncharge.actions.updateOperationIncharge(
                      formData,
                      editSelectedData?.id
                    )
                  )
                } else {
                  dispatch(operationIncharge.actions.addOperationIncharge(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'name',
                      'name_np',
                      'email',
                      'phone',
                      'telephone',
                      'hidden_in_webiste',
                      'branchId',
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
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select branch'
                            label='Branch'
                            name='branchId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={branchOptions}
                            required={true}
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
                            placeholder='Name (EN)'
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
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Email'
                            label='Email'
                            name='email'
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
                            placeholder='Enter Phone no'
                            label='Phone Number'
                            name='phone'
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
                            placeholder='Enter telephone'
                            label='Telephone'
                            name='telephone'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
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
                        <div className='col-md-6 col-sm-12 col-xs-12'>
                          <div className='row pt-5'>
                            <FormCheckbox
                              label='Hidden in website'
                              labelClassName='col-md-12'
                              containerClassName='col-md-12'
                              name='hidden_in_webiste'
                              touched={touched}
                              errors={errors}
                              onChange={handleChange}
                              checkBoxText='Hidden in website'
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
export default AddOperationIncharge
