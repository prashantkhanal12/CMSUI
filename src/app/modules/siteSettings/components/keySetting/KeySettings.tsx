import React, { useState } from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import FormTextBox from '../../../../../cms/helpers/components/forms/FormTextBox'

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  captcha: Yup.string().required('Captcha is required'),
})
const KeySettings = () => {
  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_profile_details'
        aria-expanded='true'
        aria-controls='kt_account_profile_details'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Key Settings</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <Formik
          initialValues={{
            name: '',
            captcha: '',
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 400)
          }}
        >
          {({ isSubmitting, touched, handleChange, errors, values, setFieldValue }) => (
            <Form>
              <div className='card-body border-top pt-5'>
                <FormTextBox
                  containerClassName='col-lg-8 '
                  type='text'
                  placeholder='Name '
                  label='Key name'
                  name='name'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={true}
                />
                <FormTextBox
                  containerClassName='col-lg-8 '
                  type='text'
                  placeholder='Captcha'
                  label='Captcha'
                  name='captcha'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={true}
                />
              </div>

              <div className='justify-content-end'>
                <button type='button' disabled={isSubmitting} className='btn btn-primary'>
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
export default KeySettings
