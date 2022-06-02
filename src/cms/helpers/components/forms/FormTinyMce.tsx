import React, {useRef, useState} from 'react'
import {Editor} from '@tinymce/tinymce-react'
import MediaManagerModal from '../MediaManagerModal'
import {ErrorMessage} from 'formik'

type Props = {
  containerClassName?: string
  label?: any
  limit?: number
  name: string
  initialValue?: any
  rules?: any
  input?: any
  height?: number | undefined
  handleChange: any
  labelClassName?: any
  required?: boolean
  errors?: any
}

const FormTinyMce: React.FC<Props> = ({
  containerClassName,
  limit,
  labelClassName,
  label,
  name,
  initialValue,
  rules,
  input,
  height,
  handleChange,
  required,
  errors,
  ...rest
}) => {
  const editorRef: any = useRef(null)
  const [mediaManagerModalOpen, setMediaManagerModalOpen] = useState(false)
  const [editorCallBack, setEditorCallBack] = useState<any>()

  const handleCloseMediaManagerModal = () => {
    setMediaManagerModalOpen(false)
  }

  const callingFunction = (cb: any) => {
    const callBackFile = {
      callback: (downloadLink: string, title: string) => {
        cb(downloadLink, {title})
      },
    }
    setEditorCallBack(callBackFile)
  }

  return (
    <div className={label ? 'mb-6' : 'col-lg-6 '}>
      {label && (
        <label className={`mb-1 fw-bolder fs-6 ${labelClassName || 'col-lg-4'}`}>
          <span className={required ? 'required' : ''}>{label}</span>
        </label>
      )}
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialValue}
        onEditorChange={(e) => {
          handleChange({target: {name, value: e}})
        }}
        // outputFormat='text'
        init={{
          // setup: function (ed) {
          //   var maxlength = limit ?? 9999999
          //   var count = 0
          //   ed.on('keydown', function (e) {
          //     count++

          //     if (count > maxlength) {
          //       alert('You have reached the character limit')
          //       e.stopPropagation()
          //       return false
          //     }
          //   })
          // },

          height: height ? height : 350,
          menubar: false,
          toolbar_mode: 'sliding',

          plugins: [
            'lists advlist anchor autolink link charmap code directionality emoticons hr image insertdatetime media nonbreaking pagebreak paste print preview searchreplace visualblocks code fullscreen code help wordcount table ',
          ],
          toolbar1:
            'bold italic backcolor | alignleft aligncenter ' +
            'undo redo | formatselect | ' +
            'bullist numlist outdent indent |alignright alignjustify | ' +
            'removeformat | help | image imagetools media | table | insertfile | code | ltr rtl | emoticons | hr insertdatetime',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          automatic_uploads: true,
          file_picker_types: 'image',
          file_picker_callback: function (cb, value, meta) {
            setMediaManagerModalOpen(true)
            callingFunction(cb)
          },
        }}
        textareaName={name}
        apiKey='3qyej0twovgwvklxo176yhnorvfpy2f965i3ac4d56gm4fpr'
        {...rest}
      />
      <div className='fv-plugins-message-container text-danger fw-bolder small text-end mt-1'>
        <ErrorMessage name={name} component='div' className='field-error-message' />
      </div>

      <MediaManagerModal
        isOpen={mediaManagerModalOpen}
        handleClose={handleCloseMediaManagerModal}
        editorCallBack={editorCallBack}
      />
    </div>
  )
}

export default FormTinyMce
