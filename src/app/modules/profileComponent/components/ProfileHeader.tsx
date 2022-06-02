import React, {useEffect, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../cms/helpers'
import {useDispatch, useSelector} from 'react-redux'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import {Form, Formik} from 'formik'
import {isEmpty, values} from 'lodash'
import * as userRedux from 'src/app/modules/userMgmt'
import * as auth from 'src/app/modules/auth'
import {watch} from 'fs'
import ChangePassword from './SetPassword'
import {toast} from 'react-toastify'

const ProfileHeader: React.FC = () => {
  const authResp = useSelector((state: any) => state.auth)
  const {loading, success} = useSelector((state: any) => state.userManagement)
  const {user} = authResp
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    if (success) {
      dispatch(auth.actions.requestUser())
      toast.success('Profile updated successfully')
    }
  }, [success])

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body pt-9'>
        <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
          <div className='flex-grow-1'>
            <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
              <div className='d-flex flex-column'>
                <div className='d-flex align-items-center mb-2'>
                  <span className='text-gray-800  fs-2 fw-bolder me-1'>
                    {user?.data.name}
                  </span>
                  <span>
                    <KTSVG
                      path='/media/icons/duotune/general/gen026.svg'
                      className='svg-icon-1 primaryColor'
                    />
                  </span>
                </div>

                <div className='d-flex flex-wrap fw-bold fs-6  pe-2'>
                  <span className='d-flex align-items-center   me-5 mb-2'>
                    <KTSVG path='/media/svg/misc/smartphone-dark.svg' className='svg-icon-4 me-1 primaryColor' />
                    {user?.data.mobile_number}
                  </span>
                  <span className='d-flex align-items-center   mb-2'>
                    <KTSVG
                      path='/media/icons/duotune/communication/com011.svg'
                      className='svg-icon-4 me-1 primaryColor'
                    />
                    {user?.data.email}
                  </span>
                </div>
              </div>

              <div className='d-flex my-4'>
                <button
                  className='btn btn-sm btn-primary'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_offer_a_deal'
                  onClick={() => setOpen(true)}
                >
                  Change Password
                </button>
              </div>
            </div>
            <h3 className='text-gray-800 fw-bolder me-5'>Personal Information</h3>
            <div className='border-top pt-5'>
              <Formik
                initialValues={{}}
                // validationSchema={FORM_VALIDATION}

                onSubmit={(values: any) => {
                  dispatch(userRedux.actions.updateUsers(values, user?.data?.id))
                  // dispatch(user.actions.addUsers(values))
                }}
              >
                {({
                  isSubmitting,
                  touched,
                  handleChange,
                  handleSubmit,
                  errors,
                  values,
                  setFieldValue,
                }: any) => {
                  useEffect(() => {
                    if (!isEmpty(user?.data)) {
                      const fields = ['name', 'userName', 'email', 'mobile_number']
                      fields.forEach((field) => setFieldValue(field, user?.data[field], false))
                    }
                  }, [])
                  return (
                    <Form>
                      <div className='row'>
                        <div className='ccol-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            containerClassName='col-md-12'
                            type='text'
                            placeholder='Name'
                            label='Name'
                            name='name'
                            disabled={!isEmpty(user?.data) ? true : false}
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>
                        <div className='ccol-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            containerClassName='col-md-12'
                            type='text'
                            placeholder='Username'
                            label='Username'
                            name='userName'
                            disabled={!isEmpty(user?.data) ? true : false}
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>
                        <div className='ccol-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            containerClassName='col-md-12'
                            type='email'
                            placeholder='Email'
                            name='email'
                            label='Email'
                            disabled={!isEmpty(user?.data) ? true : false}
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>

                        <div className='ccol-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            containerClassName='col-md-12'
                            type='text'
                            placeholder='Enter Mobile Number'
                            label='Mobile Number'
                            name='mobile_number'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>
                      </div>

                      <div className='d-flex justify-content-end  '>
                        <button
                          type='submit'
                          disabled={
                            user?.data?.mobile_number !== values.mobile_number ? false : true
                          }
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
          </div>
        </div>
      </div>
      {open && <ChangePassword open={open} userId={user?.data?.id} handleClose={handleClose} />}
    </div>
  )
}

export {ProfileHeader}
