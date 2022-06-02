import {Form, Formik} from 'formik'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import Modal from 'rsuite/Modal'
import * as profile from 'src/app/modules/profileComponent'
import FormPassword from 'src/cms/helpers/components/forms/FormPassword'
import {IPasswordState} from '../redux/reducer'
import {toast} from 'react-toastify'

type Props = {
  open: boolean
  handleClose: () => void
  userId: string
}

const FORM_VALIDATION = Yup.object().shape({
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

const ChangePassword = ({open, handleClose, userId}: Props) => {
  const dispatch = useDispatch()
  const {loading, success} = useSelector((state: any) => state.profile)

  useEffect(() => {
    if (success) {
      toast.success('Password has been updated successfully')
      dispatch(profile.actions.updatePasswordReset())
      handleClose()
    }
  }, [success])

  return (
    <div className='modal-container'>
      <Modal
        open={open}
        onClose={handleClose}
        backdrop='static'
        keyboard={false}
        enforceFocus={false}
      >
        <Modal.Header>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{}}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values: any, {setSubmitting}) => {
                dispatch(profile.actions.updatePassword(values))
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                return (
                  <Form>
                    <div className='card-body border-top pt-5'>
                      <div className=''>
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

export default ChangePassword
