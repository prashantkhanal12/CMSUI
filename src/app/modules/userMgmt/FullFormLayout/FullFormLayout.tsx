import React from 'react'
import {Formik} from 'formik'

interface Iprops {
  heading?: string
  handleSubmitForm?: any
  initialValues?: any
  FORM_VALIDATION?: {}
  children: any
}

const FullFormLayout = ({
  children,
  heading,
  initialValues,
  FORM_VALIDATION,
  handleSubmitForm,
}: Iprops) => {
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
          <h3 className='fw-bolder m-0'>{heading}</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <Formik
          initialValues={initialValues}
          validateOnMount={true}
          validationSchema={FORM_VALIDATION}
          onSubmit={handleSubmitForm}
        >
          {children}
        </Formik>
      </div>
    </div>
  )
}

export default FullFormLayout
