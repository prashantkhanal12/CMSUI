import React, {Dispatch, SetStateAction, useState} from 'react'
import Modal from 'rsuite/Modal'
import FileManager from 'src/app/modules/common/components/fileManager/components'

interface Props {
  isOpen: boolean
  handleClose: () => void
  editorCallBack: any
}
const MediaManagerModal = ({isOpen, handleClose, editorCallBack}: Props) => {
  return (
    <>
      <Modal
        backdrop='static'
        role='alertdialog'
        open={isOpen}
        onClose={() => handleClose()}
        size='lg'
        className='mediaManagerModal'
        enforceFocus={false}
        id='mediaManager'
      >
        <Modal.Header>
          <Modal.Title>Media Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FileManager
            isModal={true}
            editorCallBack={editorCallBack}
            handleCloseFileManagerModal={handleClose}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default MediaManagerModal
