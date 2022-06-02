import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useParams} from 'react-router-dom'
import {Form, Formik} from 'formik'
import * as auth from '../redux/actions'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormPassword from 'src/cms/helpers/components/forms/FormPassword'
import {useEffect, useState} from 'react'
import {isEmpty} from 'lodash'
import {NewPassword} from './NewPassword'
import {IAuthState} from '..'
import {ISettingTypeState} from '../../siteSettings/components/settings'
// import 'src/cms/assets/sass/_auth.scss'

const loginSchema = Yup.object().shape({
  // email: Yup.string()
  //   .email('Wrong email format')
  //   .min(3, 'Minimum 3 symbols')
  //   .max(50, 'Maximum 50 symbols')
  //   .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 5 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const verifyUserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
})

export function Login() {
  const dispatch = useDispatch()
  const params: {id: string} = useParams()
  const authResp: IAuthState = useSelector((state: any) => state.auth)
  const settingTypeData: ISettingTypeState = useSelector((state: any) => state.settingType)
  const loading = authResp?.loading
  const [userId, setUserId] = useState(authResp?.userId)
  const [applicationCredentials, setApplicationCredentials] = useState([])

  const [loginState, setLoginState] = useState('verifyUser')

  useEffect(() => {
    let arrayOfCredentials: any = []
    if (!isEmpty(settingTypeData?.backendData)) {
      settingTypeData?.backendData &&
        settingTypeData?.backendData['Application Credentials']?.map((item: any) => {
          arrayOfCredentials.push(item)
        })
    }
    setApplicationCredentials(arrayOfCredentials)
  }, [settingTypeData])

  useEffect(() => {
    applicationCredentials?.map((items: any) => {
      if (items.name === 'loginByEmail') {
        if (items.value === '1') setLoginState('loginByEmail')
      }
      if (items.name === 'loginByPhoneNumber') {
        if (items.value === '1') setLoginState('loginByPhoneNumber')
      }
      if (items.name === 'loginByUsername') {
        if (items.value === '1') setLoginState('loginByUsername')
      }

      if (items.name === 'loginByEmail' && items.value === '1') {
        if (items.name === 'loginByPhoneNumber' && items.value === '1') {
        }
      }
      // if (items.name === 'loginByEmail') {
      //   if (items.value === '1') setLoginState('loginByEmail')
      // }
      // if (items.name === 'loginByEmail') {
      //   if (items.value === '1') setLoginState('loginByEmail')
      // }
      // if (items.name === 'loginByEmail') {
      //   if (items.value === '1') setLoginState('loginByEmail')
      // }
      // if (items.name === 'loginByEmail') {
      //   if (items.value === '1') setLoginState('loginByEmail')
      // }
      // if (
      //   items.name === 'loginByEmail' &&
      //   items.value === '1' &&
      //   items.name === 'loginByPhoneNumber' &&
      //   items.value === '1'
      // ) {
      //   setLoginState('loginByEmail&PhoneNumber')
      // }
      // if (
      //   items.name === 'loginByEmail' &&
      //   items.value === '1' &&
      //   items.name === 'loginByUsername' &&
      //   items.value === '1'
      // ) {
      //   setLoginState('loginByEmail&Username')
      // }

      // if (
      //   items.name === 'loginByPhoneNumber' &&
      //   items.value === '1' &&
      //   items.name === 'loginByUsername' &&
      //   items.value === '1'
      // ) {
      //   setLoginState('loginByPhone&Username')
      // }

      // if (
      //   items.name === 'loginByEmail' &&
      //   items.value === '1' &&
      //   items.name === 'loginByUsername' &&
      //   items.value === '1' &&
      //   items.name === 'loginByPhoneNumber' &&
      //   items.value === '1'
      // ) {
      //   setLoginState('loginByEmail&Username&PhoneNumber')
      // }
    })
  }, [applicationCredentials])
  useEffect(() => {
    if (!authResp.firstLogin && !isEmpty(authResp?.data)) {
      setLoginState('loginUser')
    }
    if (authResp.firstLogin && !isEmpty(authResp?.data)) {
      setLoginState('verifyChangeNewPassword')
    }

    if (authResp?.setNewPasswordSuccess) {
      setLoginState('loginUser')
    }

    if (authResp?.userId) {
      setUserId(authResp?.userId)
    }
  }, [authResp])

  useEffect(() => {
    if (!isEmpty(params?.id)) {
      setUserId(params?.id)
      setLoginState('verifyChangeNewPassword')
    }
  }, [params])

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={loginSchema}
      validateOnChange
      onSubmit={(values: {[key: string]: string}, {setSubmitting}) => {
        // if (loginState === 'verifyUser') {
        //   dispatch(auth.actions.checkFirstTimeLogin(values.email))
        // } else if (loginState === 'verifyChangeNewPassword') {
        //   dispatch(auth.actions.setPassword(userId, values.password, values.confirmPassword))
        // } else {
        dispatch(auth.actions.login(values.email, values.password))
        // }
      }}
    >
      {({isSubmitting, isValidating, touched, handleChange, errors}) => {
        return (
          <Form>
            <div className='pt-8'>
              <div className=''>
                {/* {(loginState === 'verifyUser' || loginState === 'loginUser') && ( */}
                <>
                  <h4 className='login-box-msg text-center mt-10 mb-5'>
                    Log in to start your session
                  </h4>
                  <FormTextBox
                    labelClassName='col-md-12'
                    containerClassName='col-md-12'
                    // type='email'
                    placeholder='Email'
                    name='email'
                    label='Email'
                    onChange={handleChange}
                    validate={isValidating}
                    errors={errors}
                    touched={touched}
                    required={true}
                  />

                  <FormPassword
                    labelClassName='col-md-12'
                    containerClassName='col-md-12'
                    placeholder='Password'
                    label='Password'
                    name='password'
                    onChange={handleChange}
                    validate={isValidating}
                    errors={errors}
                    touched={touched}
                    required={true}
                  />
                </>
                {/*  )} */}
              </div>

              {/* {loginState === 'verifyChangeNewPassword' && (
                <NewPassword handleChange={handleChange} touched={touched} errors={errors} />
              )} */}
              <div className='text-center'>
                <button type='submit' className='btn btn-lg w-100 mb-5' disabled={loading}>
                  {!loading && (
                    <span className='indicator-label'>
                      Login
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

              <div className='text-center mb-5'>
                <Link to='/auth/forgot-password' className='login-link fs-6 fw-bolder'>
                  Forgot Password ?
                </Link>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}
