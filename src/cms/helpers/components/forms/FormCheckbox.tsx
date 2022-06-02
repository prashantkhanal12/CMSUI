import React from 'react'
import {ErrorMessage, Field} from 'formik'

interface Props {
  containerClassName?: string
  label?: string
  name: string
  type?: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<any>) => void
  className?: string
  errors: {[key: string]: string | any}
  touched: any
  labelClassName?: string
  required?: boolean
  checkBoxText: string
}

const FormCheckbox = React.memo((props: Props) => {
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
    checkBoxText,
    ...rest
  } = props

  return (
    <div className={` align-items-center ${label ? 'row mb-2' : 'col-lg-6 '}`}>
      {label && (
        <label className={`mb-1 fw-bolder fs-6 ${labelClassName || 'col-lg-4'}`}>
          <span className={required ? 'required' : ''}>{label}</span>
        </label>
      )}
      <div className={containerClassName ?? 'col-lg-6 '}>
        <div className='form-check form-check-custom form-check-solid me-10'>
          <Field
            name={name}
            label={label}
            type={type || 'checkbox'}
            className={className || 'form-check-input h-25px w-25px'}
            {...rest}
          />
          <label className='form-check-label' htmlFor='flexCheckbox20'>
            {checkBoxText}
          </label>
        </div>

        <div className='fv-plugins-message-container text-danger fw-bolder small text-end mt-1'>
          <ErrorMessage name={name} component='div' className='field-error-message' />
        </div>
      </div>
    </div>
  )
})

export default FormCheckbox
