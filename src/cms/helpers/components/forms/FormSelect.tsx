import React from 'react'
import {ErrorMessage, FormikErrors} from 'formik'
import Select from 'react-select'

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
  disabled?: boolean
  multiple?: boolean
  options: {label: string; value: string}[] | undefined
  values: any
  setFieldValue: any
  arrValue?: string
  defaultValue?: any
}

const FormSelect = React.memo((props: Props) => {
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
    options,
    placeholder,
    disabled,
    values,
    setFieldValue,
    multiple,
    arrValue,
    defaultValue,
    ...rest
  } = props

  return (
    <div className={label ? 'row mb-6' : 'col-lg-6 '}>
      {label && (
        <label className={`mb-1 fw-bolder fs-6 ${labelClassName || 'col-lg-4'}`}>
          <span className={required ? 'required' : ''}>{label}</span>
        </label>
      )}
      <div className={containerClassName ?? 'col-lg-6 '}>
        {multiple ? (
          <Select
            {...rest}
            id='color'
            className='customSelect'
            name={name}
            options={options}
            onChange={(option) => {
              let selectIds = option.map((item) => item?.value)
              setFieldValue(name, selectIds)
            }}
            value={options?.filter((obj) => values?.[name]?.includes(obj?.value))}
            isMulti={multiple}
            isDisabled={disabled}
            defaultValue={defaultValue}
          />
        ) : (
          <Select
            {...rest}
            id='color'
            className='customSelect'
            name={name}
            options={options}
            isDisabled={disabled}
            onChange={(option) => {
              setFieldValue(name, option?.value)
            }}
            value={
              arrValue || values?.[name]
                ? options?.find((obj) => obj?.value === (arrValue ? arrValue : values?.[name]))
                : null
            }
            defaultValue={defaultValue}
          />
        )}
        <div className='fv-plugins-message-container text-danger fw-bolder small text-end mt-1'>
          <ErrorMessage name={name} component='div' className='field-error-message' />
        </div>
      </div>
    </div>
  )
})

export default FormSelect
