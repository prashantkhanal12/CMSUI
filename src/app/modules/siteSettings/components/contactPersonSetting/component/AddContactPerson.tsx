import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {FieldArray, Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import * as Yup from 'yup'

import * as contactPersonRedux from '../index'
import {StateParamsModel} from 'src/app/modules/common/Model'

import Modal from 'rsuite/Modal'

import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
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
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Must not contain number or symbol'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  phone_numbers: Yup.array().of(
    Yup.object().shape({
      data: Yup.string()
        .matches(/^[0-9][0-9]*$/, 'Enter valid mobile number')
        .max(10, 'Phone number should not exceed 10 digits')
        .nullable(),
    })
  ),
  mobile_numbers: Yup.array().of(
    Yup.object().shape({
      data: Yup.string()
        .matches(/^(98|97)([0-9]{8})$/, 'Enter valid mobile number')
        .max(10, 'Mobile number should not exceed 10 digits')
        .nullable(),
    })
  ),
  designation: Yup.string()
    .required('Designation is required')
    .matches(/^[A-Za-z\s]+$/, 'Must not contain number or symbol'),
})
const AddContactPerson = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const {loading, success} = useSelector((state: any) => state.contactPerson)
  useEffect(() => {
    if (success) {
      isEmpty(editSelectedData)
        ? toast.success('Contact Person added successfully')
        : toast.success('Contact Person edited successfully')
      dispatch(contactPersonRedux?.actions?.resetContactPerson())
      dispatch(contactPersonRedux?.actions.getContactPerson(params))
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
          <Modal.Title>{actionType} Contact Person </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                name: '',
                nameNp: '',
                email: '',
                phone_numbers: [{data: ''}],
                mobile_numbers: [{data: ''}],
                extension: '',
                designation: '',
                image: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                const formData = {
                  ...values,
                }
                if (!isEmpty(editSelectedData)) {
                  dispatch(
                    contactPersonRedux.actions.updateContactPerson(formData, editSelectedData?.id)
                  )
                } else {
                  dispatch(contactPersonRedux.actions.addContactPerson(formData))
                }
              }}
            >
              {({touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'name',
                      'nameNp',
                      'email',
                      'phone_numbers',
                      'mobile_numbers',
                      'extension',
                      'designation',
                      'image',
                    ]
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
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
                            placeholder='Enter Name (EN)'
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
                            placeholder='Enter Name (NP)'
                            label='Name (NP)'
                            name='nameNp'
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
                            placeholder='Enter E-mail'
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
                            placeholder='Enter Designation'
                            label='Designation (EN)'
                            name='designation'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FieldArray
                            name='mobile_numbers'
                            render={(arrayHelpers) => (
                              <div>
                                {values.mobile_numbers && values.mobile_numbers.length > 0
                                  ? values.mobile_numbers.map((friend: any, index: any) => (
                                      <div key={index}>
                                        {/** both these conventions do the same */}
                                        <FormTextBox
                                          type='text'
                                          labelClassName='col-md-12'
                                          containerClassName='col-md-12'
                                          placeholder='Enter Mobile Number'
                                          label='Mobile Number'
                                          name={`mobile_numbers.${index}.data`}
                                          onChange={handleChange}
                                          errors={errors}
                                          touched={touched}
                                          required
                                        />
                                        <div className='d-flex justify-content-end mb-3'>
                                          <em>
                                            <small className='d-block'>
                                              <span className='text-danger'>Note: </span> Mobile
                                              number should starts with 98|97
                                            </small>
                                          </em>
                                        </div>
                                        {index > 0 && (
                                          <div className='col-md-12  justify-content-md-end text-end mb-2'>
                                            <button
                                              type='button'
                                              className='p-2 ps-5 pe-5 btn btn-secondary'
                                              onClick={() => arrayHelpers.remove(index)}
                                            >
                                              Remove
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    ))
                                  : null}
                                <div className=' d-flex justify-content-md-end mb-2 border-top border-light'>
                                  <button
                                    className='p-2 ps-5 pe-5 btn btn-primary'
                                    type='button'
                                    onClick={() => arrayHelpers.push({data: ''})}
                                  >
                                    + Add More
                                  </button>
                                </div>
                              </div>
                            )}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FieldArray
                            name='phone_numbers'
                            render={(arrayHelpers) => (
                              <div>
                                {values.phone_numbers && values.phone_numbers.length > 0
                                  ? values.phone_numbers.map((friend: any, index: any) => (
                                      <div key={index}>
                                        {/** both these conventions do the same */}
                                        <FormTextBox
                                          type='text'
                                          labelClassName='col-md-12'
                                          containerClassName='col-md-12'
                                          placeholder='Enter Phone Number'
                                          label='Phone Number'
                                          name={`phone_numbers.${index}.data`}
                                          onChange={handleChange}
                                          errors={errors}
                                          touched={touched}
                                          required
                                        />

                                        {index > 0 && (
                                          <div className='col-md-12  justify-content-md-end text-end mb-2'>
                                            <button
                                              type='button'
                                              className='p-2 ps-5 pe-5 btn btn-secondary'
                                              onClick={() => arrayHelpers.remove(index)}
                                            >
                                              Remove
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    ))
                                  : null}
                                <div className=' d-flex justify-content-md-end mb-2 border-top border-light'>
                                  <button
                                    className='p-2 ps-5 pe-5 btn btn-primary'
                                    type='button'
                                    onClick={() => arrayHelpers.push({data: ''})}
                                  >
                                    + Add More
                                  </button>
                                </div>
                              </div>
                            )}
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Extension'
                            label='Extension'
                            name='extension'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormInputMediaManager
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            label='Image (EN)'
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
                                    src={`${imageBaseUrl}/${values?.image}`}
                                    alt=''
                                  />
                                </div>
                              </li>
                            </>
                          ) : null}
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
export default AddContactPerson
