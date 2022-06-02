import * as Yup from 'yup'
import {ErrorMessage, Form, Formik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import Modal from 'rsuite/Modal'
import {useEffect} from 'react'
import {isEmpty} from 'lodash'
import {toast} from 'react-toastify'
import moment from 'moment'
//Manual import
import {StateParamsModel} from 'src/app/modules/common/Model'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import * as textPopupRedux from 'src/app/modules/cms/components/textPopup/redux'
import FormDatepicker from 'src/cms/helpers/components/forms/FormDatepicker'
import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  url: Yup.string().required('Url is required'),
  status: Yup.string().required('Status is required'),
  publishDate: Yup.date().required('Publishe date is required'),
  publishTime: Yup.date().required('Publish time is required'),
  expiryDate: Yup.date().required('Expiry date is required'),
  expiryTime: Yup.date().required('Expiry time is required'),
})
const AddTextPopup = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const {loading, success} = useSelector((state: any) => state.textPopup)

  useEffect(() => {
    if (success) {
      dispatch(textPopupRedux?.actions.getTextPopup(params))
      isEmpty(editSelectedData)
        ? toast.success('TextPopup added successfully')
        : toast.success('TextPopup edited successfully')
      dispatch(textPopupRedux?.actions.createTextPopupReset())
      handleClose()
    }
  }, [success])

  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]
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
          <Modal.Title>Add TextPopup </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                title: '',
                titleNp: '',
                url: '',
                publishDate: '',
                publishTime: '',
                expiryDate: '',
                expiryTime: '',
                status: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values: any) => {
                const formData = {
                  ...values,

                  publishDate: moment(values?.publishDate).format('YYYY-MM-DD'),
                  expiryDate: moment(values?.expiryDate).format('YYYY-MM-DD'),
                  publishTime: moment(values?.publishTime).format('HH:mm'),
                  expiryTime: moment(values?.expiryTime).format('HH:mm'),
                  status: values?.status === 'Active' ? true : false,
                }
                if (!isEmpty(editSelectedData)) {
                  dispatch(textPopupRedux.actions.updateTextPopup(formData, editSelectedData?.id))
                } else {
                  dispatch(textPopupRedux.actions.CreateTextPopup(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, setFieldValue, values}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'title',
                      'titleNp',
                      'url',
                      'publishDate',
                      'publishTime',
                      'expiryDate',
                      'expiryTime',
                    ]
                    setFieldValue(
                      'status',
                      editSelectedData?.status === true ? 'Active' : 'Inactive',
                      false
                    )
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                  }
                }, [])
                return (
                  <Form>
                    <div className='card-body border-top pt-5'>
                      <div className='row justify-content-between'>
                        <div className='col-6'>
                          <FormTextBox
                            type='text'
                            placeholder='Enter Title (English)'
                            name='title'
                            label='Title (EN)'
                            containerClassName=''
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>
                        <div className='col-6'>
                          <FormTextBox
                            type='text'
                            placeholder='Enter Title (Nepali)'
                            name='titleNp'
                            label='Title (NP)'
                            containerClassName=''
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                      </div>
                      <FormTextBox
                        type='text'
                        placeholder='First Button Url '
                        name='url'
                        label=' Url '
                        containerClassName=''
                        onChange={handleChange}
                        errors={errors}
                        touched={touched}
                        required={true}
                      />

                      <div className='row justify-content-between'>
                        <div className='col-6'>
                          <FormDatepicker
                            labelClassName='col-12'
                            containerClassName='col-12 '
                            label='Publish Date'
                            name='publishDate'
                            placeholderText='Please select a date'
                            setFieldValue={setFieldValue}
                            value={values.publishDate || false}
                            errors={errors}
                            touched={touched}
                            showIcon={true}
                            required={true}
                          />
                        </div>

                        <div className='col-6'>
                          <FormDatepicker
                            labelClassName='col-12'
                            containerClassName='col-12 '
                            dateFormat='hh:mm aa'
                            showTimeSelect={true}
                            showTimeSelectOnly={true}
                            label='Publish Time'
                            showIcon={true}
                            name='publishTime'
                            placeholderText='--:-- --'
                            setFieldValue={setFieldValue}
                            value={values.publishTime || false}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>
                      </div>

                      <div className='row justify-content-between'>
                        <div className='col-6'>
                          <FormDatepicker
                            labelClassName='col-12'
                            containerClassName='col-12 '
                            label='Expiry Date'
                            name='expiryDate'
                            placeholderText='Please select a date'
                            setFieldValue={setFieldValue}
                            value={values.expiryDate || false}
                            errors={errors}
                            touched={touched}
                            showIcon={true}
                            required={true}
                          />
                        </div>

                        <div className='col-6'>
                          <FormDatepicker
                            labelClassName='col-12'
                            containerClassName='col-12 '
                            dateFormat='hh:mm aa'
                            showTimeSelect={true}
                            showTimeSelectOnly={true}
                            name='expiryTime'
                            label=' Expiry Time '
                            placeholderText='--:-- --'
                            setFieldValue={setFieldValue}
                            value={values.expiryTime || false}
                            showIcon={true}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className='col-md-6 col-sm-6 col-xs-12'>
                        <label className='form-label fw-bolder text-dark fs-6 required'>
                          Status
                        </label>

                        <div className='d-flex ms-5'>
                          {statusOptions?.map((status: {label: string; value: string}) => (
                            <FormRadio
                              containerClassName=''
                              label='Select Status'
                              name='status'
                              type='radio'
                              onChange={handleChange}
                              errors={errors}
                              touched={touched}
                              required={true}
                              checkBoxText={status?.label}
                              value={status?.value}
                            />
                          ))}
                        </div>
                        <div className='fv-plugins-message-container text-danger fw-bolder small text-end mt-1'>
                          <ErrorMessage
                            name='status'
                            component='div'
                            className='field-error-message'
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
export default AddTextPopup
