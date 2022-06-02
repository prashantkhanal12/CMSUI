import {isEmpty} from 'lodash'
import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import Modal from 'rsuite/Modal'

// includes
import * as mediaManager from '../index'
import {MediaParams} from '../Model'

type Props = {
  open: boolean
  handleClose: () => void
  currentPath: string
  addFileData: {[key: string]: string}
  success: boolean | undefined
  params: MediaParams
  error: string
}

const UploadModal = ({
  open,
  handleClose,
  currentPath,
  addFileData,
  success,
  params,
  error,
}: Props) => {
  const dispatch = useDispatch()
  const [allFiles, setAllFiles] = useState([])
  const [progressPercentage, setProgressPercentage] = useState('')

  useEffect(() => {
    if (!isEmpty(addFileData) && success) {
      dispatch(mediaManager.actions.addFilesReset())
      dispatch(mediaManager.actions.getMediaList(params))
      setTimeout(() => {
        setProgressPercentage('')
        toast.success('Files uploaded successfully')
      }, 1000)
      setAllFiles([])
      handleClose()
    }
  }, [addFileData, success])

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setProgressPercentage('')
      }, 1000)
      dispatch(mediaManager.actions.addFilesReset())
    }
  }, [error])

  const selectFiles = (e: any) => {
    const newFiles: any = [...allFiles, ...e.target.files]
    setAllFiles(newFiles)
  }

  const removeFile = (selectedFile: HTMLInputElement) => {
    let newFiles: any = allFiles?.filter(
      (file: HTMLInputElement) => file?.name !== selectedFile?.name
    )
    setAllFiles(newFiles)
  }

  const options = {
    onUploadProgress: (progressEvent: any) => {
      const {loaded, total} = progressEvent
      let percent = Math.floor((loaded * 100) / total)

      if (percent < 100) {
        setProgressPercentage(`${percent}%`)
      }
      if (percent === 100) {
        setTimeout(() => {
          setProgressPercentage('100%')
        }, 1000)
      }
    },
  }

  const uploadAllFiles = () => {
    let body = new FormData()
    body.append('path', currentPath)
    allFiles.map((file: any) => {
      body.append('files[]', file, file?.name)
    })
    dispatch(mediaManager.actions.addFiles(body, options))
  }

  return (
    <Modal
      className='info-modal w-75'
      open={open}
      onClose={() => {
        handleClose()
        setAllFiles([])
      }}
      enforceFocus={false}
    >
      <Modal.Header>
        <Modal.Title>Upload Files</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='form-group'>
          <div className='dropzone dropzone-queue mb-2' id='kt_modal_upload_dropzone'>
            <div className='dropzone-panel mb-4'>
              <a>
                <input
                  type='file'
                  className='inputfile'
                  id='file'
                  onChange={selectFiles}
                  multiple
                />
                <label htmlFor='file' className='dropzone-select btn btn-sm btn-primary me-2'>
                  Attach files
                </label>
              </a>
              <a
                className='dropzone-upload btn btn-sm btn-light-primary me-2'
                onClick={uploadAllFiles}
              >
                Upload All
              </a>
              <a
                className='dropzone-remove-all btn btn-sm btn-light-primary'
                onClick={() => setAllFiles([])}
              >
                Remove All
              </a>
            </div>
            <div className='dropzone-items wm-200px'>
              {!isEmpty(allFiles) &&
                allFiles?.map((file: HTMLInputElement, i: number) => (
                  <div className='dropzone-item p-5' key={i}>
                    <div className='dropzone-file'>
                      <div className='dropzone-filename text-dark' title='some_image_file_name.jpg'>
                        <span data-dz-name=''>{file?.name} </span>
                        <strong>
                          ( <span data-dz-size=''>{(file?.size / 1024).toFixed(2)}kb</span> )
                        </strong>
                      </div>
                      <div className='dropzone-error mt-0' data-dz-errormessage=''></div>
                    </div>
                    <div className='dropzone-toolbar'>
                      <span className='dropzone-cancel' data-dz-remove='' style={{display: 'none'}}>
                        <i className='bi bi-x fs-3'></i>
                      </span>
                      <span className='dropzone-delete' onClick={() => removeFile(file)}>
                        <i className='bi bi-x fs-1'></i>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className='dropzone-progress'>
            <div
              className='progress bg-light-primary'
              style={{opacity: progressPercentage ? 1 : 0}}
            >
              <div
                className='progress-bar bg-primary'
                role='progressbar'
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={0}
                data-dz-uploadprogress=''
                style={{opacity: progressPercentage ? 1 : 0, width: progressPercentage}}
              ></div>
            </div>
          </div>
          <span className='form-text fs-6 text-muted'>Max file size is 5MB per file.</span>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default UploadModal
