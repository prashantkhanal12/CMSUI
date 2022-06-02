import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Form, Formik, useFormik } from 'formik'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import * as auth from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
})

export function VerifyUser() {
  const dispatch = useDispatch()
  const history = useHistory()
  const authResp = useSelector((state: any) => state.auth)
  const [errorVisible, setErrorVisible] = useState<Boolean>(false)
  const [emailId, setEmailId] = useState<string>('')
  const loading = authResp?.loading

  useEffect(() => {
    if (authResp.firstLogin) {
      history.push('/auth/set-password')
    }
  }, [authResp])


  return (
    <>
      <h4 className='login-box-msg text-center mt-10 mb-5'>Verify User</h4>
      <Formik
        initialValues={{}}
        validationSchema={emailSchema}
        onSubmit={(values: { [key: string]: string }, { setErrors, setSubmitting }) => {
          dispatch(auth.actions.checkFirstTimeLogin(values.email))
          !authResp.firstLogin ? setErrorVisible(true) : null
          setTimeout(() => {
            setSubmitting(false)
          }, 400)
        }}
      >
        {({ isSubmitting, touched, handleChange, errors, values, setFieldValue }) => (
          <Form>
            <div className='pt-8'>
              <div className=''>
                <FormTextBox
                  labelClassName='col-md-12'
                  containerClassName='col-md-12'
                  type='email'
                  placeholder='Email'
                  name='email'
                  label='Email'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={true}
                />
              </div>

              {errorVisible && (
                <h5 className='text-center mb-5' style={{ color: '#4242428c' }}>
                  <span className='link-danger'>{emailId} </span>
                  <span>has already been verified. </span>
                  <br /> Please go to{' '}
                  <Link to='/auth/login' className='link-danger fs-6 fw-bolder'>
                    Login Page
                  </Link>
                </h5>
              )}

              <div className=''>
                <div className=''>
                  <button
                    type='submit'
                    className='btn btn-lg w-100 mb-5'
                    disabled={loading}
                  >
                    {!loading && <span className='indicator-label'>Continue</span>}

                    {loading && (
                      <span className='indicator-progress' style={{ display: 'block' }}>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                  <div className='text-center mb-5'>
                    <Link to='/auth/login' className='link-danger fs-6 fw-bolder'>
                      Go back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}
