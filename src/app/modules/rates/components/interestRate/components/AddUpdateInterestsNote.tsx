import {useEffect} from 'react'
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
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
  interestId: string
}

const FORM_VALIDATION = Yup.object().shape({
  excerpt: Yup.string().required('Note is required'),
  excerpt_np: Yup.string().required('Note in Nepali is required'),
})

const AddUpdateInterestsNote = ({
  open,
  params,
  handleClose,
  interestId,
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
      dispatch(updateNotesRedux?.actions.getUpdateNotes())
      isEmpty(editSelectedData)
        ? toast.success('Notes  added successfully')
        : toast.success('Notes edited successfully')
      dispatch(updateNotesRedux?.actions.createUpdateNotesReset())
      handleClose()
    }
  }, [success])

  useEffect(() => {
    if (!isEmpty(interestId)) {
      dispatch(updateNotesRedux.actions.getUpdateNotesWithData(interestId))
    }
  }, [interestId])

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
              initialValues={{
                id: '',
                excerpt: !isEmpty(data) ? data?.excerpt : '',
                excerpt_np: !isEmpty(data) ? data?.excerpt_np : '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values: any) => {
                const formData = {
                  ...values,
                  id: interestId,
                }
                dispatch(updateNotesRedux.actions.CreateUpdateNotes(formData))
              }}
            >
              {({isSubmitting, touched, handleChange, errors, setFieldValue, values}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = ['excerpt', 'excerpt_np']

                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue('id', editSelectedData?.id, false)
                  }
                }, [])
                return (
                  <Form>
                    <div className='card-body border-top pt-5'>
                      <div className='row justify-content-between'>
                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Notes'
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
export default AddUpdateInterestsNote
