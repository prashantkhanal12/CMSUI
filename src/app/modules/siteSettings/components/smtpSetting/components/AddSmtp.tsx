import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import {Form, Formik} from 'formik'
import * as smtp from '../index'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import Modal from 'rsuite/Modal'
import {SmtpModel} from '../Model'
import {toast} from 'react-toastify'
import FormPassword from 'src/cms/helpers/components/forms/FormPassword'
import {isEmpty} from 'lodash'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import {FaBullseye} from 'react-icons/fa'

type Props = {
  open: boolean
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  type: Yup.string().required('Type is required'),
  portNumber: Yup.string().required('Port Number is required'),
  hostName: Yup.string().required('Hostname is required'),
  userName: Yup.string().required('Username is required'),
  password: Yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    'Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
  ),
  encryption: Yup.string().required('Encryption is required'),
})

const AddSmtp = ({open, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const {encryption, loading, success} = useSelector((state: any) => state.smtp)
  const data = useSelector((state: any) => state.smtp)

  useEffect(() => {
    dispatch(smtp?.actions.getSmtpEncryption())
  }, [])

  const encryptionOptions = encryption.map((item: {[key: string]: string}) => ({
    label: item.displayName,
    value: item.id,
  }))

  useEffect(() => {
    if (success) {
      dispatch(smtp?.actions.getSmtp())
      isEmpty(editSelectedData)
        ? toast.success('SMTP added successfully')
        : toast.success('SMTP edited successfully')
      dispatch(smtp?.actions?.createSmtpReset())
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
          <Modal.Title>{actionType} SMTP Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                type: '',
                hostName: '',
                portNumber: '',
                userName: '',
                password: '',
                encryption: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values: SmtpModel) => {
                const formData = {
                  ...values,
                  portNumber: values?.portNumber?.toString(),
                }
                if (!isEmpty(editSelectedData)) {
                  dispatch(smtp.actions.updateSmtp(formData, editSelectedData?.id))
                } else {
                  dispatch(smtp.actions.createSmtp(formData))
                }
              }}
            >
              {({touched, handleChange, errors, setFieldValue, values}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = ['type', 'hostName', 'portNumber', 'userName', 'encryption']
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                  }
                }, [])
                return (
                  <Form>
                    <div className='card-body border-top pt-5'>
                      <div className='row'>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            containerClassName='col-lg-12'
                            labelClassName='col-lg-12'
                            type='text'
                            placeholder='Type '
                            label='Type'
                            name='type'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            containerClassName='col-lg-12'
                            labelClassName='col-lg-12'
                            type='text'
                            placeholder='Host name'
                            label='Host Name'
                            name='hostName'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            containerClassName='col-lg-12'
                            labelClassName='col-lg-12'
                            type='number'
                            placeholder='Port Number'
                            label='Port number'
                            name='portNumber'
                            min='0'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select'
                            label='Encryption'
                            name='encryption'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={encryptionOptions}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            containerClassName='col-lg-12'
                            labelClassName='col-lg-12'
                            type='email'
                            placeholder='abc@gmail.com'
                            label='Email'
                            name='userName'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          {isEmpty(editSelectedData) && (
                            <FormPassword
                              containerClassName='col-lg-12'
                              labelClassName='col-lg-12'
                              placeholder='Password'
                              label='Password'
                              name='password'
                              onChange={handleChange}
                              errors={errors}
                              touched={touched}
                              required={false}
                            />
                          )}
                        </div>
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
export default AddSmtp
