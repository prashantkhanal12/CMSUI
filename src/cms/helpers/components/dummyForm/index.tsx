import * as Yup from 'yup'
import {Form, Formik} from 'formik'

// import './user.css'
import FormTextBox from '../forms/FormTextBox'
import FormPassword from '../forms/FormPassword'
import FormSelect from '../forms/FormSelect'
import FormRadio from '../forms/FormRadio'
import FormCheckbox from '../forms/FormCheckbox'
import FormDatepicker from '../forms/FormDatepicker'

const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().required('email  is required').email('Please provide valid email'),
  userName: Yup.string().required('User Name is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('This field is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  userRole: Yup.string().required('User Role is required'),
  userDepartment: Yup.string().required('User Department is required'),
  province: Yup.string().required('province zone is required'),
  branch: Yup.string().required('Branch is required'),
  date: Yup.string().required('Date is required'),
})

const DummyForm = () => {
  const roleOptions = [
    {label: 'Admin', value: 'admin'},
    {label: 'SuperAdmin', value: 'superadmin'},
  ]

  const departmentOptions = [
    {label: 'Teacher', value: 'teacher'},
    {label: 'Student', value: 'student'},
  ]

  const provinceOptions = [
    {label: 'Bagmati', value: 'bagmati'},
    {label: 'Lumbini', value: 'lumbini'},
  ]

  const branchOptions = [
    {label: 'Kathmandu', value: 'kathmandu'},
    {label: 'Bhaktapur', value: 'bhaktapur'},
  ]
  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-header border-0 cursor-pointer' role='button'>
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Profile Details</h3>
        </div>
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            userName: '',
            password: '',
            confirmPassword: '',
            userRole: '',
            userDepartment: '',
            province: '',
            branch: '',
            date: '',
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values, {setSubmitting}) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2))
              setSubmitting(false)
            }, 400)
          }}
        >
          {({isSubmitting, touched, handleChange, errors, setFieldValue, values}) => (
            <Form>
              <div className='card-body border-top pt-5'>
                <div className='row mb-2'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>Full Name</label>

                  <div className='col-lg-8'>
                    <div className='row'>
                      <FormTextBox
                        type='text'
                        placeholder='First name'
                        name='firstName'
                        containerClassName=''
                        onChange={handleChange}
                        errors={errors}
                        touched={touched}
                        required={true}
                      />

                      <FormTextBox
                        type='text'
                        placeholder='Last name'
                        name='lastName'
                        containerClassName=''
                        onChange={handleChange}
                        errors={errors}
                        touched={touched}
                        required={true}
                      />
                    </div>
                  </div>
                </div>

                <FormTextBox
                  containerClassName='col-lg-8 '
                  type='email'
                  placeholder='Email'
                  name='email'
                  label='Email'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={true}
                />

                <FormTextBox
                  containerClassName='col-lg-8 '
                  type='text'
                  placeholder='Username'
                  label='User name'
                  name='userName'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={true}
                />

                <FormPassword
                  containerClassName='col-lg-8 '
                  placeholder='Password'
                  label='Password'
                  name='password'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={true}
                />

                <FormPassword
                  containerClassName='col-lg-8 '
                  placeholder='Confirm Password'
                  label='Confirm Password'
                  name='confirmPassword'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={true}
                />

                <FormSelect
                  containerClassName='col-lg-8 '
                  placeholder='Select a role'
                  label='User Role'
                  name='userRole'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={true}
                  options={roleOptions}
                  values={values}
                  setFieldValue={setFieldValue}
                />

                <FormSelect
                  containerClassName='col-lg-8 '
                  placeholder='Select a department'
                  label='User department'
                  name='userDepartment'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={true}
                  options={departmentOptions}
                  values={values}
                  setFieldValue={setFieldValue}
                />
                <div className='form-text'>
                  Select Respective Branch (*Must Have To Select Province To Select Respective
                  Branch)
                </div>

                <FormSelect
                  containerClassName='col-lg-8 '
                  placeholder='Select a province'
                  label='Province'
                  name='province'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={true}
                  options={provinceOptions}
                  values={values}
                  setFieldValue={setFieldValue}
                />

                <FormSelect
                  containerClassName='col-lg-8 '
                  placeholder='Select a province'
                  label='Branch'
                  name='branch'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={true}
                  options={branchOptions}
                  values={values}
                  setFieldValue={setFieldValue}
                />

                <FormCheckbox
                  containerClassName='col-lg-8 '
                  placeholder='Select a province'
                  label='Branch'
                  name='branch'
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                  required={true}
                  checkBoxText='Active'
                />

                <FormDatepicker
                  containerClassName='col-lg-4 '
                  label='Datepicker'
                  name='date'
                  placeholderText='Please select a date'
                  setFieldValue={setFieldValue}
                  value={values.date || false}
                  errors={errors}
                  touched={touched}
                  required={true}
                  showIcon={true}
                />

                <div className={`align-items-center row mb-6`}>
                  <label className={`col-form-label fw-bold fs-6 col-lg-4`}>
                    <span>Gender</span>
                  </label>
                  <div className='col-lg-8' role='group' aria-labelledby='my-radio-group'>
                    <div className='row'>
                      <FormRadio
                        containerClassName='col-lg-4 '
                        label='Gender'
                        name='gender'
                        type='radio'
                        onChange={handleChange}
                        errors={errors}
                        touched={touched}
                        required={true}
                        checkBoxText='Male'
                        value='male'
                      />
                      <FormRadio
                        containerClassName='col-lg-4 '
                        label='Gender'
                        name='gender'
                        type='radio'
                        onChange={handleChange}
                        errors={errors}
                        touched={touched}
                        required={true}
                        checkBoxText='Female'
                        value='female'
                      />
                      <FormRadio
                        containerClassName='col-lg-4 '
                        label='Gender'
                        name='gender'
                        type='radio'
                        onChange={handleChange}
                        errors={errors}
                        touched={touched}
                        required={true}
                        checkBoxText='Others'
                        value='others'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='user_form_button d-flex mt-5'>
                <button
                  className='heading__component__btn'
                  style={{backgroundColor: '00c0ef'}}
                  type='submit'
                  disabled={isSubmitting}
                >
                  Save
                </button>
                <div className='sub_button'>
                  <button className='heading__component__btn' style={{backgroundColor: '#ff9000'}}>
                    Save and New
                  </button>
                </div>
                <div className='sub_button'>
                  <button className='heading__component__btn'>Save and Exit</button>
                </div>
                <div className='sub_button'>
                  <button className='heading__component__btn' style={{backgroundColor: '#dc3545'}}>
                    Cancel
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default DummyForm
