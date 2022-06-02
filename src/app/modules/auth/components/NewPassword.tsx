import * as Yup from 'yup'
import {Form, Formik, FormikErrors, useFormik} from 'formik'
import FormPassword from 'src/cms/helpers/components/forms/FormPassword'
import {useDispatch, useSelector} from 'react-redux'
import * as auth from '../redux/actions'
import {ChangeEvent, useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {IAuthState} from '../redux/reducer'
import {isEmpty} from 'lodash'
import {toast} from 'react-toastify'

const verifyChangeNewPasswordSchema = Yup.object().shape({
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

export function NewPassword() {
  const dispatch = useDispatch()
  const history = useHistory()
  const params: {id: string} = useParams()
  const authResp: IAuthState = useSelector((state: any) => state.auth)
  const {loading, setNewPasswordSuccess} = authResp
  const [userId, setUserId] = useState(authResp?.userId)
  useEffect(() => {
    if (!isEmpty(params?.id)) {
      setUserId(params?.id)
    }

    if (setNewPasswordSuccess) {
      toast.success('Password set successfully')
      history.push('/')
    }
  }, [params, setNewPasswordSuccess])

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={verifyChangeNewPasswordSchema}
      validateOnChange
      onSubmit={(values: {[key: string]: string}, {setSubmitting}) => {
        // if (loginState === 'verifyUser') {
        //   dispatch(auth.actions.checkFirstTimeLogin(values.email))
        // } else if (loginState === 'verifyChangeNewPassword') {
        dispatch(auth.actions.setPassword(userId, values.password, values.confirmPassword))
        // } else {
        // dispatch(auth.actions.login(values.email, values.password))
        // }
      }}
    >
      {({isSubmitting, isValidating, touched, handleChange, errors}) => {
        return (
          <Form>
            <div className='pt-8'>
              <div className=''>
                <h4 className='login-box-msg text-center mb-5'>Set New Password</h4>
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
                  <div className='row'>
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
                      {!loading && (
                        <span className='indicator-label'>
                          Submit
                          {/* {loginState === 'verifyUser' ? 'Verify User' : 'Login'} */}
                        </span>
                      )}

                      {loading && (
                        <span className='indicator-progress' style={{display: 'block'}}>
                          Please wait...
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}
