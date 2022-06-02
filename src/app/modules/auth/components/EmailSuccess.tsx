import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import {Form, Formik, useFormik} from 'formik'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import * as auth from '../redux/actions'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useLocation, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'

export function EmailSuccess(props: any) {
  const dispatch = useDispatch()
  const {success, loading} = useSelector((state: any) => state.auth)

  useEffect(() => {
    if (success) {
      toast.success('Email Sent Successfully')
    }
  }, [success])
  return (
    <div className=''>
      {/* <h2 className="login-box-msg text-center mt-5 mb-3">Email has been sent successfully.</h2> */}
      <h4 className='login-box-msg text-center mt-10 mb-5'>Successfully password reset!</h4>
      <h5 className='text-center' style={{color: '#4242428d'}}>
        We have sent an email to <span className='link-danger'>{props.location.state}</span>
        <br />
        please follow a link to verify your email.
      </h5>
      <div className='text-center mt-5'>
        <Link to='/auth/login' className='btn btn-lg w-100 mb-5'>
          Login
        </Link>
      </div>
      <div className='text-center mb-5'>
        Didn’t receive an email?{' '}
        <span
          className='link-danger fs-6 fw-bolder cursor-pointer'
          onClick={() => {
            dispatch(auth.actions.forgotPassword(props.location.state))
          }}
        >
          Resend
        </span>
      </div>
    </div>
  )
}
