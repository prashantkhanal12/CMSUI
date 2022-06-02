import {isEmpty} from 'lodash'
import {Dispatch, SetStateAction, useState} from 'react'
import {
  AiFillFolderOpen,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineCloudDownload,
  AiOutlineDelete,
  AiOutlineFolderView,
  AiOutlineInfoCircle,
} from 'react-icons/ai'
import {saveAs} from 'file-saver'
import {MdOutlineDriveFileRenameOutline} from 'react-icons/md'
import Tooltip from 'rsuite/Tooltip'
import Whisper from 'rsuite/Whisper'
import {useDispatch} from 'react-redux'

// includes
import {FileProps} from '../Model'
import DeleteModal from '../../deleteModal'
import * as mediaManager from 'src/app/modules/common/components/fileManager'

interface Props {
  goBackArray: Array<string>
  setGoBackArray: Dispatch<SetStateAction<Array<string>>>
  setGoForwardArray: Dispatch<SetStateAction<Array<string>>>
  goForwardArray: Array<string>
  currentPath: string
  setParams: Dispatch<SetStateAction<{path: string}>>
  setSelectedTreeFolder: Dispatch<SetStateAction<string>>
  data: Array<FileProps>
  selectedFile: FileProps
  setInfoModalOpen: Dispatch<SetStateAction<boolean>>
  setPreviewModalOpen: Dispatch<SetStateAction<boolean>>
  clickedFiles: Array<string>
  handleDoubleClick: (file: FileProps, fileExt: string | undefined) => void
}

const TopHeaderMenu = ({
  goBackArray,
  setGoBackArray,
  setGoForwardArray,
  goForwardArray,
  currentPath,
  setParams,
  setSelectedTreeFolder,
  data,
  selectedFile,
  setInfoModalOpen,
  setPreviewModalOpen,
  clickedFiles,
  handleDoubleClick,
}: Props) => {
  const dispatch = useDispatch()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const handleCloseModal = () => {
    setDeleteModalOpen(false)
  }

  const handleDelete = () => {
    const body = clickedFiles?.map((file) => ({
      folderPath: file,
    }))
    setDeleteModalOpen(false)
    dispatch(mediaManager?.actions?.deleteFolderFiles({paths: body}))
  }
  return (
    <div className='d-flex align-items-center file-top-header-parent pt-4'>
      <Whisper placement='top' trigger='hover' speaker={<Tooltip>Go Back</Tooltip>}>
        <button
          className='file-top-header'
          disabled={isEmpty(goBackArray) ? true : false}
          onClick={() => {
            let newGoBackArray: Array<string> = [...goBackArray]
            let goBackPath: string | undefined = newGoBackArray.pop()
            if (newGoBackArray?.length > 0) {
              setGoBackArray(newGoBackArray)
            } else {
              setGoBackArray([])
            }
            setGoForwardArray([...goForwardArray, currentPath])
            if (goBackPath) {
              setParams({path: goBackPath})
              setSelectedTreeFolder(goBackPath)
            }
          }}
        >
          <AiOutlineArrowLeft className={isEmpty(goBackArray) ? 'disabled' : ''} />
        </button>
      </Whisper>
      <Whisper placement='top' trigger='hover' speaker={<Tooltip>Go Forward</Tooltip>}>
        <button
          className='file-top-header'
          disabled={isEmpty(goForwardArray) ? true : false}
          onClick={() => {
            let newGoForwardArray: Array<string> = [...goForwardArray]
            let goForwardPath: string | undefined = newGoForwardArray.pop()
            let goForwardFile: FileProps | undefined = data?.find(
              (file) => file?.storageLink === goForwardPath
            )
            if (goForwardFile?.totalFolder !== 0) {
              setGoForwardArray(newGoForwardArray)
            } else {
              setGoForwardArray([])
            }
            setGoBackArray([...goBackArray, currentPath])
            if (goForwardPath) {
              setParams({path: goForwardPath})
              setSelectedTreeFolder(goForwardPath)
            }
          }}
        >
          <AiOutlineArrowRight className={isEmpty(goForwardArray) ? 'disabled' : ''} />
        </button>
      </Whisper>
      <Whisper placement='top' trigger='hover' speaker={<Tooltip>Open</Tooltip>}>
        <button
          className={`rc-option file-top-header`}
          disabled={clickedFiles?.length === 1 ? false : true}
          onClick={() => handleDoubleClick(selectedFile, selectedFile?.fileExt)}
        >
          <AiFillFolderOpen className={clickedFiles?.length === 1 ? '' : 'disabled'} />
        </button>
      </Whisper>
      {selectedFile?.fileExt && (
        <Whisper placement='top' trigger='hover' speaker={<Tooltip>Download</Tooltip>}>
          <button
            className='rc-option file-top-header'
            disabled={clickedFiles?.length === 1 ? false : true}
            onClick={() => saveAs(selectedFile?.downloadLink, selectedFile?.basename)}
          >
            <AiOutlineCloudDownload className={clickedFiles?.length === 1 ? '' : 'disabled'} />
          </button>
        </Whisper>
      )}
      {(selectedFile?.fileExt === 'jpg' ||
        selectedFile?.fileExt === 'jpeg' ||
        selectedFile?.fileExt === 'png' ||
        selectedFile?.fileExt === 'gif') && (
        <Whisper placement='top' trigger='hover' speaker={<Tooltip>Preview</Tooltip>}>
          <button
            className='rc-option rc-option-border file-top-header'
            disabled={clickedFiles?.length === 1 ? false : true}
            onClick={() => {
              setInfoModalOpen(false)
              setPreviewModalOpen(true)
            }}
          >
            <AiOutlineFolderView className={clickedFiles?.length === 1 ? '' : 'disabled'} />
          </button>
        </Whisper>
      )}
      <Whisper placement='top' trigger='hover' speaker={<Tooltip>Rename</Tooltip>}>
        <button
          className='rc-option file-top-header'
          disabled={clickedFiles?.length === 1 ? false : true}
        >
          <MdOutlineDriveFileRenameOutline
            className={clickedFiles?.length === 1 ? '' : 'disabled'}
          />
        </button>
      </Whisper>
      <Whisper placement='top' trigger='hover' speaker={<Tooltip>Delete</Tooltip>}>
        <button
          className='rc-option file-top-header'
          disabled={clickedFiles?.length < 1 ? true : false}
          onClick={() => setDeleteModalOpen(true)}
        >
          <AiOutlineDelete className={clickedFiles?.length < 1 ? 'disabled' : ''} />
        </button>
      </Whisper>
      <Whisper placement='top' trigger='hover' speaker={<Tooltip>Info</Tooltip>}>
        <button
          className='rc-option file-top-header'
          disabled={clickedFiles?.length === 1 ? false : true}
          onClick={() => {
            setPreviewModalOpen(false)
            setInfoModalOpen(true)
          }}
        >
          <AiOutlineInfoCircle className={clickedFiles?.length === 1 ? '' : 'disabled'} />
        </button>
      </Whisper>
      <DeleteModal
        isOpen={deleteModalOpen}
        handleClose={handleCloseModal}
        handleClick={handleDelete}
      />
    </div>
  )
}

export default TopHeaderMenu
