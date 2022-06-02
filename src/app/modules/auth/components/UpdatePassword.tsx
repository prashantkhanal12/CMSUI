import * as Yup from 'yup'
import {Form, Formik, FormikErrors, useFormik} from 'formik'
import FormPassword from 'src/cms/helpers/components/forms/FormPassword'
import {useDispatch, useSelector} from 'react-redux'
import * as profile from 'src/app/modules/profileComponent'
import {useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import store from 'src/setup/redux/Store'
import {isEmpty} from 'lodash'

const verifyUpdatePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Old password is required'),
  newPassword: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('This field is required'),
})

export function UpdatePassword() {
  const dispatch = useDispatch()
  const history = useHistory()
  const {accessToken, guestToken} = useSelector((state: any) => state.auth)
  const {loading, success} = useSelector((state: any) => state.profile)
  const param: {id: string} = useParams()


  useEffect(() => {
    if (success) {
      toast.success('Password updated successfully')
      dispatch(profile.actions.updatePasswordReset())
      history.push('/')
    }
  }, [success])

  return (
    <Formik
      initialValues={{oldPassword: '', newPassword: '', confirmPassword: ''}}
      validationSchema={verifyUpdatePasswordSchema}
      validateOnChange
      onSubmit={(values: {[key: string]: string}, {setSubmitting}) => {
        !isEmpty(param?.id)
          ? dispatch(profile.actions.updatePassword(values, param?.id))
          : dispatch(profile.actions.updatePassword(values))
      }}
    >
      {({isSubmitting, isValidating, touched, handleChange, errors}) => {
        return (
          <Form>
            <div className='pt-8'>
              <div className=''>
                <h4 className='login-box-msg text-center mb-5'>Update Password</h4>
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
                      placeholder='Enter Old Password'
                      label='Old Password'
                      name='oldPassword'
                      onChange={handleChange}
                      errors={errors}
                      touched={touched}
                      required={true}
                    />
                    <FormPassword
                      labelClassName='col-md-12'
                      containerClassName='col-md-12'
                      placeholder='Enter New Password'
                      label='New Password'
                      name='newPassword'
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
