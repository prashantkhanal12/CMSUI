import {isEmpty} from 'lodash'
import React, {useEffect, useRef, useState} from 'react'
import IdleTimer from 'react-idle-timer'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import Modal from 'rsuite/Modal'
import * as auth from 'src/app/modules/auth'
import {FiLogOut} from 'react-icons/fi'
import {Logout} from 'src/app/modules/auth'
import {RootState} from 'src/setup'

const IdleTimerContainer = () => {
  const idleTimerRef: any = useRef(null)
  const sessionTimeoutRef: any = useRef(null)
  const dispatch = useDispatch()
  const [isTimedOut, setIsTimedOut] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [loggedOutModal, setLoggedOutModal] = useState(false)
  const [isLoggedIn, setLoggedIn] = useState(false)
  const {accessToken, guestToken}: any = useSelector<RootState>(({auth}) => auth, shallowEqual)

  useEffect(() => {
    if (!isEmpty(accessToken)) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [])

  const onIdle = () => {
    setModalOpen(true)
    sessionTimeoutRef.current = setTimeout(logOut, 60000)
  }

  const logOut = () => {
    setModalOpen(false)
    setLoggedIn(false)
    dispatch(auth.actions.logout())
    setLoggedOutModal(true)
    clearTimeout(sessionTimeoutRef.current)
  }

  const userActive = (e: any) => {
    setIsTimedOut(false)
  }

  const staySignedIn = () => {
    setModalOpen(false)
    setLoggedOutModal(false)
    clearTimeout(sessionTimeoutRef.current)
  }
  return (
    <div>
      {isLoggedIn ? (
        <>
          <Modal open={modalOpen}>
            <h2>You've been idle</h2>
            <p>You will be logged out soon</p>
            <div className='d-flex justify-content-end px-9 '>
              <button onClick={staySignedIn} className='btn btn-primary btn-sm ms-3'>
                Stay Signed In
              </button>
              <button onClick={logOut} className='btn btn-secondary btn-sm ms-3'>
                Log Out
              </button>
            </div>
          </Modal>
          <IdleTimer
            ref={idleTimerRef}
            onActive={userActive}
            timeout={300000}
            onIdle={onIdle}
          ></IdleTimer>
        </>
      ) : (
        <>
          <Modal
            open={loggedOutModal}
            onClose={() => setLoggedOutModal(false)}
            className='w-25'
            enforceFocus={false}
          >
            <Modal.Body className='text-center'>
              <FiLogOut className='mb-3 text-danger' style={{fontSize: '50px'}} />
              <h2 className='d-flex justify-content-center'>You have been logged out</h2>
            </Modal.Body>
          </Modal>
          <IdleTimer ref={idleTimerRef} timeout={1000}></IdleTimer>
        </>
      )}
    </div>
  )
}

export default IdleTimerContainer
