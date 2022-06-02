import React, { useState } from 'react'
import { ErrorMessage, Field } from 'formik'
import { SketchPicker } from 'react-color'

interface Props {
  containerClassName?: string
  label?: string
  name: string
  validate?: any
  required?: boolean
  onChange: any
  className?: any
  errors: any
  touched: any
  labelClassName?: string
  disabled?: boolean
  value: string
  setFieldValue: any
}

const FormColorPicker = React.memo((props: Props) => {
  const {
    containerClassName,
    label,
    name,
    className,
    errors,
    touched,
    labelClassName,
    required,
    value,
    setFieldValue,
    ...rest
  } = props

  const [displayColorPicker, setDisplayColorPicker] = useState(false)

  const handleClick = () => {
    setDisplayColorPicker(true)
  };

  const handleClose = () => {
    setDisplayColorPicker(false)
  };


  return (
    <div className={label ? 'row mb-6' : 'col-lg-6 '}>
      {label && (
        <label className={`mb-1 fw-bolder fs-6 ${labelClassName || 'col-lg-4'}`}>
          <span className={required ? 'required' : ''}>{label}</span>
        </label>
      )}
      <div className={containerClassName ?? 'col-lg-6 '}>
        <div className='d-flex align-items-center'>

          <div className='btn border rounded' style={{ height: "46.1px", flex: '1' }} >
            {value}
          </div>
          <div className="btn btn-primary" onClick={handleClick}>Pick color</div>
          {displayColorPicker ? <div style={{
            position: 'absolute',
            zIndex: '2',
          }}>
            <div style={{
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            }} onClick={handleClose} />
            <SketchPicker
              color={value}
              onChange={(color) => {
                setFieldValue(name, color?.hex)
              }}
              onChangeComplete={() => {
                setTimeout(() => {
                  handleClose()
                }, 500)
              }}
              disableAlpha={true}
            />

          </div> : null}

        </div>
        <div className='fv-plugins-message-container text-danger fw-bolder small text-end mt-1'>
          <ErrorMessage name={name} component='div' className='field-error-message' />
        </div>


      </div>
    </div>
  )
})

export default FormColorPicker
