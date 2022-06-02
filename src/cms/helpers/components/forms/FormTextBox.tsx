import React, {useEffect} from 'react'
import {ErrorMessage, Field} from 'formik'
import {validationRule} from '../../validationRules'

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
  required?: boolean
  disabled?: boolean
  value?: string | number
  as?: string
  min?: string
  avoidKey?: any
  onKeyUp?: any
  mainClassName?: string
}

const FormTextBox = React.memo((props: Props) => {
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
    onKeyUp,
    avoidKey,
    value,
    as,
    min,
    mainClassName,
    ...rest
  } = props

  return (
    <div className={label ? 'row mb-6' : mainClassName || 'col-lg-6 '}>
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
          onKeyUp={onKeyUp}
          {...(avoidKey && {avoidKey: avoidKey})}
          {...(value && {value: value})}
          // validate={() =>
          //   validationRule.textbox({
          //     required,
          //     value: value || '',
          //     type: type || 'text',
          //   })
          // }
          {...rest}
        />
        <div className='fv-plugins-message-container text-danger fw-bolder small text-end mt-1'>
          <ErrorMessage name={name} component='div' className='field-error-message' />
        </div>
      </div>
    </div>
  )
})

export default FormTextBox
