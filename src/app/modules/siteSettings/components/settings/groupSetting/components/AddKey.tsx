import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import {Form, Formik} from 'formik'
import * as groupSetting from '../index'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import {toast} from 'react-toastify'
import Modal from 'rsuite/Modal'
import {isEmpty} from 'lodash'
import {KeyModel} from '../Model'

type Props = {
  open: boolean
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const AddKey = ({open, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const {loading, success} = useSelector((state: any) => state.groupSetting)

  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  })

  useEffect(() => {
    if (success) {
      dispatch(groupSetting?.actions.getKey())
      isEmpty(editSelectedData)
        ? toast.success('GROUP name added successfully')
        : toast.success('GROUP name edited successfully')
      dispatch(groupSetting?.actions?.createKeyReset())
      handleClose()
    }
  }, [success])

  return (
    <div className='modal-container'>
      <Modal
        open={open}
        onClose={handleClose}
        backdrop='static'
        keyboard={false}
        enforceFocus={false}
      >
        <Modal.Header>
          <Modal.Title>{actionType} GROUP Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                name: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values: KeyModel, {setSubmitting}) => {
                if (!isEmpty(editSelectedData)) {
                  dispatch(groupSetting.actions.updateKey(values, editSelectedData?.id))
                } else {
                  dispatch(groupSetting.actions.createKey(values))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = ['name']
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                  }
                }, [])

                return (
                  <Form>
                    <div className='card-body border-top pt-5 pb-5'>
                      <FormTextBox
                      labelClassName='col-12'
                        containerClassName='col-lg-12 '
                        type='text'
                        placeholder='Name '
                        label='Name'
                        name='name'
                        onChange={handleChange}
                        errors={errors}
                        touched={touched}
                        required={true}
                      />
                    </div>

                    <div className='d-flex justify-content-end px-5 '>
                      <button
                        type='submit'
                        disabled={loading}
                        className='btn btn-primary btn-sm ms-3'
                      >
                        Save
                      </button>
                      <button
                        type='button'
                        onClick={handleClose}
                        className='btn btn-secondary btn-sm ms-3'
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default AddKey
