import {isEmpty} from 'lodash'
import {ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState} from 'react'
import {AiFillFolder} from 'react-icons/ai'
import {MdOutlineClear} from 'react-icons/md'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import Loader from 'rsuite/esm/Loader'

// includes
import * as mediaManager from '../index'
import {IMediaManagerState} from '../index'
import {FileProps, MediaParams} from '../Model'

interface Props {
  addFolderOpen: boolean
  setAddFolderOpen: Dispatch<SetStateAction<boolean>>
  currentPath: string
  loading: boolean | undefined
  renameFileFolder: string
  selectedFile: FileProps
  params: MediaParams
}

const AddFolder = ({
  addFolderOpen,
  setAddFolderOpen,
  currentPath,
  loading,
  renameFileFolder,
  selectedFile,
  params,
}: Props) => {
  const dispatch = useDispatch()
  const [folderName, setFolderName] = useState('')
  const {addFolderData, success, renameFileData}: IMediaManagerState = useSelector(
    (state: any) => state?.mediaManager
  )

  useEffect(() => {
    if (!isEmpty(addFolderData) && success) {
      dispatch(mediaManager.actions.addNewFolderReset())
      dispatch(mediaManager.actions.getMediaList(params))
      setTimeout(() => {
        setAddFolderOpen(false)
        setFolderName('')
        toast.success('Folder created successfully')
      }, 1000)
    }
  }, [addFolderData, success])

  useEffect(() => {
    if (!isEmpty(renameFileData) && success) {
      dispatch(mediaManager.actions.renameFileFolderReset())
      dispatch(mediaManager.actions.getMediaList(params))
      setTimeout(() => {
        setAddFolderOpen(false)
        setFolderName('')
        toast.success('Folder renamed successfully')
      }, 1000)
    }
  }, [renameFileData, success])

  useEffect(() => {
    if (!isEmpty(renameFileFolder)) {
      setFolderName(renameFileFolder?.split('.')[0])
    }
  }, [renameFileFolder])

  const handleFolderNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!renameFileFolder) {
      dispatch(mediaManager.actions.addNewFolder({path: `${currentPath}/${folderName}`}))
    } else {
      const extArr = selectedFile?.basename.split('.')
      const ext = extArr.length > 1 ? extArr.pop() : ''
      const body = {
        oldPath: selectedFile?.storageLink,
        newPath: `${currentPath}/${folderName}${ext ? `.${ext}` : ''}`,
      }
      dispatch(mediaManager.actions.renameFileFolder(body))
    }
  }
  return (
    <div className={`card-add-folder ${addFolderOpen ? 'd-block' : 'd-none'}`}>
      <div
        className='d-flex align-items-center'
        style={{justifyContent: 'end', marginTop: 10, marginRight: 10}}
      >
        <span className='svg-icon svg-icon-2x svg-icon-primary me-4'>
          <AiFillFolder />
        </span>
        <input
          type='text'
          name='new_folder_name'
          placeholder='Enter name'
          className='form-control mw-250px me-3'
          onChange={handleFolderNameChange}
          value={folderName}
        />
        <button
          className={`btn btn-icon btn-light-primary me-3 ${loading ? 'disabled' : ''}`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {!loading ? (
            <span className='indicator-label'>
              <span className='svg-icon svg-icon-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <path
                    d='M9.89557 13.4982L7.79487 11.2651C7.26967 10.7068 6.38251 10.7068 5.85731 11.2651C5.37559 11.7772 5.37559 12.5757 5.85731 13.0878L9.74989 17.2257C10.1448 17.6455 10.8118 17.6455 11.2066 17.2257L18.1427 9.85252C18.6244 9.34044 18.6244 8.54191 18.1427 8.02984C17.6175 7.47154 16.7303 7.47154 16.2051 8.02984L11.061 13.4982C10.7451 13.834 10.2115 13.834 9.89557 13.4982Z'
                    fill='black'
                  />
                </svg>
              </span>
            </span>
          ) : (
            <Loader />
          )}
        </button>
        <button
          className='btn btn-icon btn-light-danger'
          onClick={() => {
            setFolderName('')
            setAddFolderOpen(false)
          }}
        >
          <span className='indicator-label'>
            <MdOutlineClear />
          </span>
          <span className='indicator-progress'>
            <span className='spinner-border spinner-border-sm align-middle'></span>
          </span>
        </button>
      </div>
    </div>
  )
}

export default AddFolder
