import {ErrorMessage, Field} from 'formik'
import React, {useEffect, useRef, useState} from 'react'
import MediaManagerModal from '../MediaManagerModal'
import { isEmpty } from 'lodash';

type Props = {
  containerClassName?: string
  label?: string
  name: string
  initialValue?: any
  rules?: any
  labelClassName?: string
  required?: boolean
  className?: string
  setFieldValue: any
  value: any
  setImageUrl?: any
  note?:string
}

const FormInputMediaManager: React.FC<Props> = ({
  containerClassName,
  labelClassName,
  label,
  name,
  initialValue,
  rules,
  required,
  className,
  setFieldValue,
  value,
  setImageUrl,
  note,
  ...rest
}) => {
  const [mediaManagerModalOpen, setMediaManagerModalOpen] = useState(false)

  const handleCloseMediaManagerModal = () => {
    setMediaManagerModalOpen(false)
  }

  const callBackFile = {
    callback: (downloadLink: string, title: string, storageLink: string) => {
      setFieldValue(name, storageLink)
      setImageUrl && setImageUrl(downloadLink)
    },
  }

  return (
    <div className={label ? 'mb-6' : 'col-lg-6 '}>
      {label && (
        <label className={`mb-1 fw-bolder fs-6 ${labelClassName || 'col-lg-4'}`}>
          <span className={required ? 'required' : ''}>{label}</span>
        </label>
      )}
      <div className={containerClassName ?? 'col-lg-6 '}>
        <input
          name={name}
          type={'text'}
          className={className || 'form-control border'}
          autoComplete='off'
          value={value}
          onClick={() => setMediaManagerModalOpen(true)}
          {...rest}
        />
        {!isEmpty(note) && (<em>
          <small>                                
            <span className='text-danger'>Note:</span> {note}                                
          </small>                              
        </em>)}
        
        <div className='fv-plugins-message-container text-danger fw-bolder small text-end mt-1'>
          <ErrorMessage name={name} component='div' className='field-error-message' />
        </div>
      </div>
      <MediaManagerModal
        isOpen={mediaManagerModalOpen}
        handleClose={handleCloseMediaManagerModal}
        editorCallBack={callBackFile}
      />
    </div>
  )
}

export default FormInputMediaManager
