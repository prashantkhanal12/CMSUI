import * as Yup from 'yup'
import {Form, Formik} from 'formik'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import {useDispatch, useSelector} from 'react-redux'
import * as user from 'src/app/modules/userMgmt'
import * as departmentRedux from 'src/app/modules/userMgmt/components/departments'
import {useHistory} from 'react-router-dom'
import Modal from 'rsuite/Modal'
import {useEffect} from 'react'
import {isEmpty} from 'lodash'
import {toast} from 'react-toastify'
import {StateParamsModel} from 'src/app/modules/common/Model'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormCheckbox from 'src/cms/helpers/components/forms/FormCheckbox'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Must not contain number or symbol'),
  userName: Yup.string()
    .required('Username is required')
    .matches(/^[a-zA-Z0-9_ ]+$/, 'Must not contain any symbol'),
  email: Yup.string()
    .required('Email  is required')
    .email('Please provide valid email')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Please provide valid email'),
  mobile_number: Yup.string()
    .required('Mobile No. is required')
    .matches(/^(98|97)([0-9]{8})$/, 'Enter valid phone number')
    .max(10, 'Phone number should not exceed 10 digits'),
})

const AddUser = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {loading, success} = useSelector((state: any) => state.userManagement)
  const {
    data: {department},
  } = useSelector((state: any) => state.departments)

  useEffect(() => {
    dispatch(departmentRedux.actions.getDepartment())
  }, [])

  const departmentOptions = department.map((items: {[key: string]: string}) => ({
    label: items.name,
    value: items.id,
  }))

  useEffect(() => {
    if (success) {
      dispatch(user?.actions.getUsers(params))
      isEmpty(editSelectedData)
        ? toast.success('User added successfully')
        : toast.success('User edited successfully')
      dispatch(user?.actions?.resetUsers())
      handleClose()
    }
  }, [success])

  const newData = [
    {
      id: '271186de-d42f-4ceb-ad21-808da87e6b9f',
      label: 'title',
      name: 'Titlte (EN)',
      settingType: 'Contact',
      type: 'input',
      value: 'Head Office',
    },
  ]

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
          <Modal.Title>{actionType} User </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{overflow: 'visible'}}>
          <div>
            <Formik
              initialValues={{
                name: '',
                userName: '',
                email: '',
                mobile_number: '',
                departmentId: '',
                grievance_manager: false,
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                if (!isEmpty(editSelectedData)) {
                  dispatch(user.actions.updateUsers(values, editSelectedData?.id))
                } else {
                  dispatch(user.actions.addUsers(values))
                }
              }}
            >
              {({touched, handleChange, errors, setFieldValue, values}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = ['name', 'userName', 'email', 'mobile_number']
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                  }
                }, [])

                return (
                  <Form>
                    <div className='card-body border-top pt-5'>
                      <div className='row'>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            containerClassName='col-md-12'
                            type='text'
                            placeholder='Name'
                            label='Name'
                            name='name'
                            disabled={!isEmpty(editSelectedData) ? true : false}
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            containerClassName='col-md-12'
                            type='text'
                            placeholder='Username'
                            label='Username'
                            name='userName'
                            disabled={!isEmpty(editSelectedData) ? true : false}
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            containerClassName='col-md-12'
                            type='email'
                            placeholder='Email'
                            name='email'
                            disabled={!isEmpty(editSelectedData) ? true : false}
                            label='Email'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                            value={values?.email}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12 pb-0 mb-0'>
                          <FormTextBox
                            containerClassName='col-12'
                            type='text'
                            placeholder='Enter Mobile Number'
                            label='Mobile Number'
                            name='mobile_number'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                          <div className='d-flex justify-content-end'>
                            <em>
                              <small className='d-block'>
                                <span className='text-danger'>Note: </span> Mobile number should
                                starts with 98|97
                              </small>
                            </em>
                          </div>
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select'
                            label='Department'
                            name='departmentId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={departmentOptions}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        <div className='col-lg-4'>
                          <FormCheckbox
                            labelClassName='col-md-12 pb-3'
                            containerClassName='col-md-12'
                            label='Grievance Manager'
                            name='grievance_manager'
                            touched={touched}
                            errors={errors as any}
                            onChange={handleChange}
                            checkBoxText='Is Grievance Officer ?'
                          />
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
                      </div>{' '}
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

export default AddUser
