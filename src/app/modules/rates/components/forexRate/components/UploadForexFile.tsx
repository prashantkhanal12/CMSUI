import Modal from 'rsuite/Modal'
import {Form, Uploader} from 'rsuite'
import React, {useEffect} from 'react'
import {IForexRateState} from '../redux/reducer'
import {useDispatch, useSelector} from 'react-redux'
import * as forexRateAll from 'src/app/modules/rates/components/forexRate'
import {toast} from 'react-toastify'
import {isEmpty} from 'lodash'

type Props = {
  open: boolean
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const UploadForexFile = ({open, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const forexRateData: IForexRateState = useSelector((state: any) => state.forexRate)
  const {success} = forexRateData

  useEffect(() => {
    if (success) {
      toast.success('Forex Rate File imported successfully')
    }
    dispatch(forexRateAll?.actions.getForexRate())
  }, [success])

  function fileImport(event: any) {
    if (!isEmpty(event.target.files)) {
      let formData = new FormData()
      formData.append('file', event[0].blobfile[0])
      dispatch(forexRateAll.actions.importForexRate(formData))
      event.target.value = null
    }
  }
  return (
    <>
      <div className='modal-container'>
        <Modal
          open={open}
          onClose={handleClose}
          backdrop='static'
          keyboard={false}
          enforceFocus={false}
        >
          <Modal.Header>
            <Modal.Title>Upload Forex File</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div style={{display: 'flex'}}>
              <Uploader
                action='//jsonplaceholder.typicode.com/posts/'
                accept={'.csv, xlsx'}
                onChange={fileImport}
              />
              <div style={{paddingTop: '5px', paddingLeft: '5px', fontStyle: 'italic'}}>
                <span>Choose a file</span>
              </div>
            </div>
            <Uploader
              action='//jsonplaceholder.typicode.com/posts/'
              accept={'.csv, xlsx'}
              draggable
              onChange={fileImport}
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
export default UploadForexFile
