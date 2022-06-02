import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import {Form, Formik} from 'formik'
import * as key from '../index'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import {toast} from 'react-toastify'
import Modal from 'rsuite/Modal'
import {isEmpty} from 'lodash'
import {KeyModel} from '../Model'
import {StateParamsModel} from 'src/app/modules/common/Model'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const AddKey = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const {loading, success} = useSelector((state: any) => state.key)

  const FORM_VALIDATION = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    key: Yup.string().required('Key is required'),
  })

  useEffect(() => {
    if (success) {
      dispatch(key?.actions.getKey(params))
      isEmpty(editSelectedData)
        ? toast.success('KEY added successfully')
        : toast.success('KEY edited successfully')
      dispatch(key?.actions?.createKeyReset())
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
          <Modal.Title>{actionType} KEY Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                name: '',
                key: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values: KeyModel, {setSubmitting}) => {
                if (!isEmpty(editSelectedData)) {
                  dispatch(key.actions.updateKey(values, editSelectedData?.id))
                } else {
                  dispatch(key.actions.createKey(values))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = ['name', 'key']
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                  }
                }, [])

                return (
                  <Form>
                    <div className='card-body border-top pt-5'>
                      <FormTextBox
                        containerClassName='col-lg-8 '
                        type='text'
                        placeholder='Name '
                        label='Name'
                        name='name'
                        onChange={handleChange}
                        errors={errors}
                        touched={touched}
                        required={true}
                      />

                      <FormTextBox
                        containerClassName='col-lg-8 '
                        type='text'
                        placeholder='Key'
                        label='Key'
                        name='key'
                        onChange={handleChange}
                        errors={errors}
                        touched={touched}
                        required={true}
                      />
                      {/* <FormCkTextEditor name="key" /> */}
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
export default AddKey
