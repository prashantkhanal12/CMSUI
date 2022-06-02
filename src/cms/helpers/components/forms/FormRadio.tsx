import React from 'react'
import {ErrorMessage, Field, FormikErrors} from 'formik'

interface Props {
  containerClassName?: string
  label?: string
  name: string
  type?: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<any>) => void
  className?: string
  errors: FormikErrors<any>
  touched: any
  labelClassName?: string
  required?: boolean
  checkBoxText: string
  value: string | number | boolean
}

const FormRadio = React.memo((props: Props) => {
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
    value,
    ...rest
  } = props

  return (
    <div className={containerClassName ?? 'col-lg-6 '}>
      <div className='form-check form-check-custom form-check-solid me-10'>
        <Field
          name={name}
          label={label}
          type={type || 'radio'}
          value={value}
          className={className || 'form-check-input h-25px w-25px'}
          {...rest}
        />
        <label className='form-check-label' htmlFor='flexRadio25'>
          {checkBoxText}
        </label>
      </div>

     
    </div>
  )
})

export default FormRadio
