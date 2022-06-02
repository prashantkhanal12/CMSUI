import React from 'react'
import { ErrorMessage, Field } from 'formik'
import { useState } from 'react'

interface Props {
  containerClassName?: string
  label?: any
  name: any
  validate?: any
  type?: any
  placeholder?: any
  onChange: any
  className?: any
  errors: any
  touched: any
  labelClassName?: string
  required?: boolean
}

const FormPassword = React.memo((props: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const {
    containerClassName,
    label,
    name,
    type,
    className,
    errors,
    touched,
    labelClassName,
    required,
    ...rest
  } = props

  return (
    <div className='row mb-2'>
      <label className={`mb-1 fw-bolder fs-6 ${labelClassName || 'col-lg-4'}`}>
        <span className={required ? 'required' : ''}>{label}</span>
      </label>
      <div className={containerClassName ?? 'col-lg-6 '} data-kt-password-meter='true'>
        <div className='position-relative mb-3'>
          <Field
            name={name}
            label={label}
            type={showPassword ? 'text' : 'password'}
            className={className || 'form-control border'}
            {...rest}
          />

          <span
            className='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2'
            data-kt-password-meter-control='visibility'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <i className='bi bi-eye fs-2'></i>
            ) : (
              <i className='bi bi-eye-slash fs-2'></i>
            )}
          </span>
        </div>
        <div className='fv-plugins-message-container text-danger fw-bolder small text-end mt-1'>
          <ErrorMessage name={name} component='div' className='field-error-message' />
        </div>
      </div>
    </div>
  )
})

export default FormPassword
