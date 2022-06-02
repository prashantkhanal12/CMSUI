import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import Modal from 'rsuite/Modal'
import * as Yup from 'yup'

//Manual import
import {StateParamsModel} from 'src/app/modules/common/Model'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
import * as updateNotesRedux from 'src/app/modules/rates/components/updateNotes'

type Props = {
  open: boolean
  forexId: string
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}
const FORM_VALIDATION = Yup.object().shape({
  excerpt: Yup.string().required('Note is required'),
  excerpt_np: Yup.string().required('Note in Nepali is required'),
})

const AddUpdateNotes = ({
  open,
  forexId,
  params,
  handleClose,
  actionType,
  editSelectedData,
}: Props) => {
  const dispatch = useDispatch()
  const {
    loading,
    success,
    excerptRateData: {data},
  } = useSelector((state: any) => state.updateNotes)

  useEffect(() => {
    if (success) {
      isEmpty(data)
        ? toast.success('Notes added successfully')
        : toast.success('Notes edited successfully')
      handleClose()
    }
  }, [success])

  useEffect(() => {
    if (!isEmpty(forexId)) {
      dispatch(updateNotesRedux.actions.getUpdateNotesWithData(forexId))
    }
  }, [forexId])

  return (
    <div className='modal-container'>
      <Modal
        open={open}
        onClose={handleClose}
        size='lg'
        backdrop='static'
        keyboard={false}
        enforceFocus={false}
      >
        <Modal.Header>
          <Modal.Title>Update Notes </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              validationSchema={FORM_VALIDATION}
              initialValues={{
                id: '',
                excerpt: !isEmpty(data) ? data?.excerpt : '',
                excerpt_np: !isEmpty(data) ? data?.excerpt_np : '',
              }}
              onSubmit={(values: any) => {
                const formData = {
                  ...values,
                  id: forexId,
                }
                dispatch(updateNotesRedux.actions.CreateUpdateNotes(formData))
              }}
            >
              {({isSubmitting, touched, handleChange, errors, setFieldValue, values}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = ['excerpt', 'excerpt_np']

                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                  }
                }, [])
                return (
                  <Form>
                    <div className='card-body border-top pt-5'>
                      <div className='row justify-content-between'>
                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Notes (EN)'
                            name='excerpt'
                            initialValue={!isEmpty(data) ? data?.excerpt : ''}
                            handleChange={handleChange}
                            required={true}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Notes (NP)'
                            name='excerpt_np'
                            initialValue={!isEmpty(data) ? data?.excerpt_np : ''}
                            handleChange={handleChange}
                            required={true}
                          />
                        </div>
                      </div>
                    </div>

                    <div className='d-flex justify-content-end px-9 '>
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
export default AddUpdateNotes
