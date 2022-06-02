import React, {useState} from 'react'
import Modal from 'rsuite/Modal'
import RemindOutlineIcon from '@rsuite/icons/RemindOutline'
import {useDispatch} from 'react-redux'

interface Props {
  isOpen?: boolean
  handleClick: () => void
  handleClose: () => void
}
const DeleteModal = ({isOpen, handleClick, handleClose}: Props) => {
  return (
    <>
      <Modal backdrop='static' role='alertdialog' open={isOpen} size='xs' enforceFocus={false}>
        <Modal.Body>
          <div className='d-flex'>
            <RemindOutlineIcon
              style={{
                color: '#ffb300',
                fontSize: 24,
              }}
            />
            <h4>
              <strong className='ms-3'>Are you sure you want to delete?</strong>
            </h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClick} className='btn btn-primary btn-sm ms-3'>
            Ok
          </button>
          <button onClick={handleClose} className='btn btn-secondary btn-sm ms-3'>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteModal
