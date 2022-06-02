import React, {useEffect} from 'react'
import {ErrorMessage, Field} from 'formik'

interface Props {
  containerClassName?: string
  label?: string
  name: any
  validate?: any
  type?: any
  placeholder?: any
  onChange: any
  className?: any
  errors: any
  touched: any
  labelClassName?: string
  setFieldValue: any
  required?: boolean
  disabled?: boolean
  value?: string | number
  as?: string
  min?: string
  onKeyUp?: any
  readOnly?: any
}

const FormHiddenTextBox = React.memo((props: Props) => {
  const {
    containerClassName,
    label,
    name,
    type,
    className,
    disabled,
    errors,
    touched,
    labelClassName,
    setFieldValue,
    value,
    required,
    onKeyUp,
    as,
    min,
    readOnly,
    ...rest
  } = props

  useEffect(() => {
    if (disabled && value) {
      setFieldValue && setFieldValue(name, value)
    }
  }, [value])

  return (
    <div className={label ? 'row mb-6' : 'col-lg-6 '}>
      {label && (
        <label className={`mb-1 fw-bolder fs-6 ${labelClassName || 'col-lg-4'}`}>
          <span className={required ? 'required' : ''}>{label}</span>
        </label>
      )}
      <div className={containerClassName ?? 'col-lg-6 '}>
        <Field
          name={name}
          label={label}
          type={type || 'text'}
          className={className || 'form-control border'}
          autoComplete='off'
          as={as || 'input'}
          min={min}
          value={value}
          disabled={disabled}
          onKeyUp={onKeyUp}
          readOnly={readOnly}
          {...rest}
        />
        <div className='fv-plugins-message-container text-danger fw-bolder small text-end mt-1'>
          <ErrorMessage name={name} component='div' className='field-error-message' />
        </div>
      </div>
    </div>
  )
})

export default FormHiddenTextBox
