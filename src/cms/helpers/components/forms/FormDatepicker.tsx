import React, {useState} from 'react'
import {ErrorMessage} from 'formik'
import DatePicker from 'react-datepicker'
import moment from 'moment'

interface Props {
  containerClassName?: string
  label?: string
  name: string
  type?: string
  placeholderText?: string
  className?: string
  errors: {[key: string]: string} | any
  touched: any
  labelClassName?: string
  required?: boolean
  value?: any
  setFieldValue: any
  showIcon?: boolean
  showTimeSelectOnly?: boolean
  showTimeSelect?: boolean
  dateFormat?: string | string[] | undefined
  timeIntervals?: number | undefined
  maxDate?: Date | null | undefined
  minDate?: Date | null | undefined
  disabled?: boolean
}

const FormDatepicker = React.memo((props: Props) => {
  const [openCalender, setOpenCalender] = useState<boolean>(false)
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
    setFieldValue,
    value,
    showIcon,
    showTimeSelectOnly,
    showTimeSelect,
    dateFormat,
    timeIntervals,
    maxDate,
    minDate,
    disabled,
    ...rest
  } = props

  return (
    <div className={` align-items-center ${label ? 'row mb-2' : 'col-lg-6 '}`}>
      {label && (
        <label className={`mb-1 fw-bolder fs-6 ${labelClassName || 'col-lg-4'}`}>
          <span className={required ? 'required' : ''}>{label}</span>
        </label>
      )}
      <div className={`custom-datepicker ${containerClassName || 'col-lg-6'}`}>
        <div className='row'>
          <div className='col-lg-10' style={{paddingRight: 0}}>
            <DatePicker
              name={name}
              className='form-control pl-3 border-radius-right-0 pe-auto'
              autoComplete='off'
              id={name}
              selected={value}
              timeIntervals={timeIntervals || 5}
              dateFormat={dateFormat || 'yyyy-MM-dd'}
              showTimeSelect={showTimeSelect || false}
              showTimeSelectOnly={showTimeSelectOnly || false}
              // minDate={moment(minDate).toDate() || moment('1943-01-01').toDate()}
              minDate={minDate || moment('1943-01-01').toDate()}
              yearDropdownItemNumber={100}
              scrollableYearDropdown={true}
              onClickOutside={() => setOpenCalender(false)}
              disabled={disabled}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                }
              }}
              onInputClick={() => setOpenCalender(!openCalender)}
              open={openCalender}
              onChange={(date: any) => {
                setOpenCalender(false)
                setFieldValue(name, date)
              }}
              {...rest}
            />
          </div>
          {showIcon && (
            <div
              className='input-group-append col-lg-2'
              onClick={() => {
                setOpenCalender(!openCalender)
              }}
              style={{paddingLeft: 0}}
            >
              <span className='input-group-text input-group-text h-100 p-1 border-left-0 border-radius-left-0 bg-success text-white d-flex justify-content-center'>
                <i className='la la-calendar text-white' style={{fontSize: 20}} />
              </span>
            </div>
          )}
        </div>
        <div className='fv-plugins-message-container text-danger fw-bolder small text-end mt-1'>
          <ErrorMessage name={name} component='div' className='field-error-message' />
        </div>
      </div>
    </div>
  )
})

export default FormDatepicker
