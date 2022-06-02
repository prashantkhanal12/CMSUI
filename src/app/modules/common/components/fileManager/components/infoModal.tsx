import Modal from 'rsuite/Modal'
import {FileProps} from '../Model'

type Props = {
  open: boolean
  handleClose: () => void
  file: FileProps
}

const InfoModal = ({open, handleClose, file}: Props) => {
  return (
    <Modal className='info-modal w-75' open={open} onClose={handleClose} enforceFocus={false}>
      <Modal.Header>
        <Modal.Title>{file?.basename}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='preview-info'>
          <div className='size info-details'>
            <span>Size:</span>
            <div>{file?.size}</div>
          </div>
          <div className='path info-details'>
            <span>Path:</span>
            <div>{file?.storageLink}</div>
          </div>
          <div className='link info-details'>
            <span>Link:</span>
            <div>
              <a download href={file?.downloadLink}>
                {file?.downloadLink}
              </a>
            </div>
          </div>
          <div className='modified info-details'>
            <span>Modified:</span>
            <div>{file?.modifiedAt}</div>
          </div>
          <div className='writable info-details'>
            <span>Writable:</span>
            <div>{file?.writeable ? 'true' : 'false'}</div>
          </div>
          <div className='readable info-details'>
            <span>Readable:</span>
            <div>{file?.writeable ? 'true' : 'false'}</div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default InfoModal
