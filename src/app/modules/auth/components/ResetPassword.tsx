import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useHistory, useParams} from 'react-router-dom'
import {Form, Formik} from 'formik'
import * as auth from '../redux/actions'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormPassword from 'src/cms/helpers/components/forms/FormPassword'
import {useEffect, useState} from 'react'
import {isEmpty} from 'lodash'
import {NewPassword} from './NewPassword'
import {IAuthState} from '..'
import {toast} from 'react-toastify'
// import 'src/cms/assets/sass/_auth.scss'

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('This field is required'),
})

export function ResetPassword() {
  const dispatch = useDispatch()
  const history = useHistory()
  const params: {id: string} = useParams()
  const authResp: IAuthState = useSelector((state: any) => state.auth)
  const {loading, resetNewPasswordSuccess} = authResp
  const [userId, setUserId] = useState('')

  useEffect(() => {
    if (!isEmpty(params?.id)) {
      setUserId(params?.id)
    }
    if (resetNewPasswordSuccess) {
      toast.success('Password reset  successfully')
      history.push('/')
    }
  }, [params, resetNewPasswordSuccess])

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={resetPasswordSchema}
      validateOnChange
      onSubmit={(values: {[key: string]: string}, {setSubmitting}) => {
        dispatch(auth.actions.resetPassword(userId, values.password, values.confirmPassword))
      }}
    >
      {({isSubmitting, isValidating, touched, handleChange, errors}) => {
        return (
          <Form>
            <div className='pt-8'>
              <h4 className='login-box-msg text-center mb-5'>Reset Password</h4>
              <h5 style={{color: '#757575', fontWeight: '400'}}>
                In order to <strong>protect your password</strong>, make sure your password:
              </h5>
              <ul style={{color: '#757575'}}>
                <li>Is longer than 8 characters</li>
                <li>Is least one uppercase character</li>
                <li>Is least one lowercase character</li>
                <li>Is least one number</li>
                <li>Is least one of the following symbols ! @ # $ % ^ & * ()</li>
              </ul>
              <div className=''>
                <FormPassword
                  labelClassName='col-md-12'
                  containerClassName='col-md-12'
                  placeholder='Enter New Password'
                  label='Password'
                  name='password'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={true}
                />

                <FormPassword
                  labelClassName='col-md-12 col-sm-12 col-xs-12'
                  containerClassName='col-md-12 col-sm-12 col-xs-12'
                  placeholder='Confirm Password'
                  label='Confirm Password'
                  name='confirmPassword'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={true}
                />
              </div>
              <div className='text-center'>
                <button type='submit' className='btn btn-lg w-100 mb-5' disabled={loading}>
                  {!loading && <span className='indicator-label'>Reset Password</span>}

                  {loading && (
                    <span className='indicator-progress' style={{display: 'block'}}>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}
