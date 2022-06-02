import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Form, Formik, useFormik } from 'formik'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import * as auth from '../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Switch, useHistory } from 'react-router-dom'
import { EmailSuccess } from './EmailSuccess'

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
})

export function ForgotPassword() {
  const history = useHistory()
  const dispatch = useDispatch()
  const authResp = useSelector((state: any) => state.auth)
  const loading = authResp?.loading
  const resCod = authResp.data?.response?.data?.resCod
  const [emailId, setEmailId] = useState('')

  useEffect(() => {
    if (resCod === '200') {
      history.push({
        pathname: '/auth/success',
        state: emailId,
      })
    }
  }, [authResp])

  return (
    <>
      <h4 className='login-box-msg text-center mt-10 mb-3'>Forgotten Password ?</h4>
      <Formik
        initialValues={{}}
        validationSchema={emailSchema}
        onSubmit={(values: { [key: string]: string }, { setSubmitting }) => {
          setEmailId(values.email)
          dispatch(auth.actions.forgotPassword(values.email))
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

              <div className=''>
                <div className=''>
                  <button
                    type='submit'
                    className='btn btn-lg w-100 mb-5'
                    disabled={loading}
                  >
                    {!loading && <span className='indicator-label'>Submit</span>}

                    {loading && (
                      <span className='indicator-progress' style={{ display: 'block' }}>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                  <div className='text-center mb-5'>
                    <Link to='/auth/login' className='login-link fs-6 fw-bolder'>
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
