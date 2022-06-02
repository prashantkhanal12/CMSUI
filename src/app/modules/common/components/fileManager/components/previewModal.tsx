import Modal from 'rsuite/Modal'
import {FileProps} from '../Model'

type Props = {
  open: boolean
  handleClose: () => void
  file: FileProps
}

const PreviewModal = ({open, handleClose, file}: Props) => {
  return (
    <Modal className='preview-modal w-75' open={open} onClose={handleClose} enforceFocus={false}>
      <Modal.Header>
        <Modal.Title>{file?.basename}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img className='preview-image' src={file?.downloadLink} />
      </Modal.Body>
    </Modal>
  )
}

export default PreviewModal
