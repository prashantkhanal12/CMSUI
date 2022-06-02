import Modal from 'rsuite/Modal'
import {Uploader} from 'rsuite'

type Props = {
  open: boolean
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const UploadInterestRate = ({open, handleClose, actionType, editSelectedData}: Props) => {
  return (
    <>
      <div className='modal-container'>
        <Modal open={open} onClose={handleClose} enforceFocus={false}>
          <Modal.Header>
            <Modal.Title>Upload Interest Rate File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{display: 'flex'}}>
              <Uploader action='//jsonplaceholder.typicode.com/posts/' accept={'.csv, xlsx'} />
              <div style={{paddingTop: '5px', paddingLeft: '5px', fontStyle: 'italic'}}>
                <span>Choose a file</span>
              </div>
            </div>
            <Uploader
              action='//jsonplaceholder.typicode.com/posts/'
              accept={'.csv, xlsx'}
              draggable
            >
              <div style={{lineHeight: '200px'}}>Click or Drag files to this area to upload</div>
            </Uploader>
            <span
              style={{
                color: 'grey',
                fontStyle: 'italic',
                fontSize: '10px',
              }}
            >
              *Only supports excel file or csv file
            </span>
            <div className='justify-content-end'>
              <button type='submit' className='btn btn-primary w-100'>
                Save
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}
export default UploadInterestRate
