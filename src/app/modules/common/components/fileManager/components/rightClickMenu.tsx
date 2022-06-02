import {Dispatch, SetStateAction, useState} from 'react'
import {
  AiFillFolderOpen,
  AiOutlineCloudDownload,
  AiOutlineDelete,
  AiOutlineFolderView,
  AiOutlineInfoCircle,
} from 'react-icons/ai'
import {MdOutlineDriveFileRenameOutline} from 'react-icons/md'
import {saveAs} from 'file-saver'

// includes
import {useDispatch} from 'react-redux'
import DeleteModal from '../../deleteModal'
import {FileProps} from '../Model'
import * as mediaManager from 'src/app/modules/common/components/fileManager'

interface Props {
  showMenu: boolean
  xPos: string
  yPos: string
  selectedFile: FileProps
  setInfoModalOpen: Dispatch<SetStateAction<boolean>>
  setPreviewModalOpen: Dispatch<SetStateAction<boolean>>
  clickedFiles: Array<string>
  handleDoubleClick: (file: FileProps, fileExt: string | undefined) => void
  setAddFolderOpen: Dispatch<SetStateAction<boolean>>
  setRenameFileFolder: Dispatch<SetStateAction<string>>
}

const RightClickMenu = ({
  showMenu,
  xPos,
  yPos,
  selectedFile,
  setInfoModalOpen,
  setPreviewModalOpen,
  clickedFiles,
  handleDoubleClick,
  setAddFolderOpen,
  setRenameFileFolder,
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
    dispatch(mediaManager?.actions?.deleteFolderFiles({paths: body}))
    setDeleteModalOpen(false)
  }
  return (
    <div
      className={`context-menu ${showMenu ? 'd-block' : 'd-none'}`}
      style={{
        left: xPos,
        top: yPos,
      }}
    >
      <div
        className='rc-option'
        onClick={() => handleDoubleClick(selectedFile, selectedFile?.fileExt)}
      >
        <AiFillFolderOpen />
        Open
      </div>
      {selectedFile?.fileExt && (
        <div
          className='rc-option'
          onClick={() => saveAs(selectedFile?.downloadLink, selectedFile?.basename)}
        >
          <AiOutlineCloudDownload />
          Download
        </div>
      )}
      {(selectedFile?.fileExt === 'jpg' ||
        selectedFile?.fileExt === 'jpeg' ||
        selectedFile?.fileExt === 'png' ||
        selectedFile?.fileExt === 'gif') && (
        <div
          className='rc-option rc-option-border'
          onClick={() => {
            setInfoModalOpen(false)
            setPreviewModalOpen(true)
          }}
        >
          <AiOutlineFolderView />
          Preview
        </div>
      )}
      <div
        className='rc-option'
        onClick={() => {
          setRenameFileFolder(selectedFile?.basename)
          setAddFolderOpen(true)
        }}
      >
        <MdOutlineDriveFileRenameOutline />
        Rename
      </div>
      <div className='rc-option' onClick={() => setDeleteModalOpen(true)}>
        <AiOutlineDelete />
        Delete
      </div>
      <div
        className='rc-option'
        onClick={() => {
          setPreviewModalOpen(false)
          setInfoModalOpen(true)
        }}
      >
        <AiOutlineInfoCircle />
        Info
      </div>
      <DeleteModal
        isOpen={deleteModalOpen}
        handleClose={handleCloseModal}
        handleClick={handleDelete}
      />
    </div>
  )
}

export default RightClickMenu
