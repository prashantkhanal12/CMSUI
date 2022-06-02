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
import * as roadBlockPopupRedux from 'src/app/modules/cms/components/roadblockPopup/redux'
import FormDatepicker from 'src/cms/helpers/components/forms/FormDatepicker'
import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}
const FORM_VALIDATION = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description  is required'),
  startDate: Yup.string().required('Start Date  is required'),
  endDate: Yup.string().required('End Date  is required'),
  startTime: Yup.string().required('Start Time  is required'),
  endTime: Yup.string().required('End Time  is required'),
  status: Yup.string().required('Status is required'),
})

const AddRoadBlockPopup = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const {loading, success} = useSelector((state: any) => state.roadBlockPopup)

  useEffect(() => {
    if (success) {
      dispatch(roadBlockPopupRedux?.actions.getRoadBlockPopup(params))
      isEmpty(editSelectedData)
        ? toast.success('Road Block Popup added successfully')
        : toast.success('Road Block Popup edited successfully')
      dispatch(roadBlockPopupRedux?.actions.createRoadBlockPopupReset())
      handleClose()
    }
  }, [success])

  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]

  return (
    <div className='modal-container'>
      <Modal open={open} onClose={handleClose} size='lg' enforceFocus={false}>
        <Modal.Header>
          <Modal.Title>Add Road Block Popup </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                title: '',
                titleNp: '',
                description: '',
                descriptionNp: '',
                startDate: '',
                startTime: '',
                endDate: '',
                endTime: '',
                status: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values: any) => {
                const formData = {
                  ...values,

                  status: values?.status === 'Active' ? true : false,
                  startDate: moment(values?.startDate).format('YYYY-MM-DD'),
                  endDate: moment(values?.endDate).format('YYYY-MM-DD'),
                  startTime: moment(values?.startTime).format('HH:mm'),
                  endTime: moment(values?.endTime).format('HH:mm'),
                }

                if (!isEmpty(editSelectedData)) {
                  dispatch(
                    roadBlockPopupRedux.actions.updateRoadBlockPopup(formData, editSelectedData?.id)
                  )
                } else {
                  dispatch(roadBlockPopupRedux.actions.CreateRoadBlockPopup(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, setFieldValue, values}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'title',
                      'titleNp',
                      'description',
                      'descriptionNp',
                      'startDate',
                      'startTime',
                      'endDate',
                      'endTime',
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
                            placeholder='Enter Title (EN)'
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
                            placeholder='Enter Title (NP)'
                            name='titleNp'
                            label='Title (NP)'
                            containerClassName=''
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                      </div>

                      <div className='row justify-content-between'>
                        <div className='col-6'>
                          <FormTinyMce
                            name='description'
                            handleChange={handleChange}
                            label='Description (EN)'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.description : ''
                            }
                            required={true}
                          />
                        </div>
                        <div className='col-6'>
                          <FormTinyMce
                            name='descriptionNp'
                            handleChange={handleChange}
                            label='Description (NP)'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.descriptionNp : ''
                            }
                          />
                        </div>
                      </div>

                      <div className='row justify-content-between '>
                        <div className='col-6'>
                          <FormDatepicker
                            labelClassName='col-12'
                            containerClassName='col-12 '
                            label='Start Date'
                            name='startDate'
                            placeholderText='Please select a date'
                            setFieldValue={setFieldValue}
                            value={values.startDate || false}
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
                            name='startTime'
                            label=' Start Time '
                            placeholderText='--:-- --'
                            setFieldValue={setFieldValue}
                            value={values.startTime || false}
                            errors={errors}
                            touched={touched}
                            showIcon={true}
                            required={true}
                          />
                        </div>
                      </div>

                      <div className='row justify-content-between'>
                        <div className='col-6'>
                          <FormDatepicker
                            labelClassName='col-12'
                            containerClassName='col-12 '
                            label='End Date'
                            name='endDate'
                            placeholderText='Please select a date'
                            setFieldValue={setFieldValue}
                            value={values.endDate || false}
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
                            name='endTime'
                            label=' End Time '
                            placeholderText='--:-- --'
                            setFieldValue={setFieldValue}
                            value={values.endTime || false}
                            errors={errors}
                            touched={touched}
                            showIcon={true}
                            required={true}
                          />
                        </div>
                      </div>
                      <label className='form-label fw-bolder text-dark fs-6 required'>Status</label>

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
                            checkBoxText={status?.label}
                            value={status?.value}
                            required={true}
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

export default AddRoadBlockPopup
