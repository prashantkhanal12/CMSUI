import {ErrorMessage, Form, Formik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import Modal from 'rsuite/Modal'
import {useEffect, useState} from 'react'
import {isEmpty} from 'lodash'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
//manual import
import {StateParamsModel} from 'src/app/modules/common/Model'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import * as bannerRedux from 'src/app/modules/cms/components/banner/redux'
import FormInputMediaManager from 'src/cms/helpers/components/forms/FormInputMediaManager'
import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import {imageBaseUrl} from 'src/cms/helpers/constants'

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .required('This field is required')
    .matches(/^[A-Za-z\s]+$/, 'Must not contain number or symbol'),
  image: Yup.string().required('This field is required'),
  status: Yup.string().required('Status is required'),
})

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}
const AddBanner = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const {loading, success} = useSelector((state: any) => state.banner)
  const [imagePath, setImagePath] = useState<any>('')

  useEffect(() => {
    if (success) {
      dispatch(bannerRedux?.actions.getBanner(params))
      isEmpty(editSelectedData)
        ? toast.success('Banner added successfully')
        : toast.success('Banner edited successfully')
      dispatch(bannerRedux?.actions.createBannerReset())
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
          <Modal.Title>{actionType} Banner </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                name: '',
                title: '',
                title_np: '',
                subtitle: '',
                subtitle_np: '',
                image: '',
                first_button_text: '',
                first_button_text_np: '',
                second_button_text: '',
                second_button_text_np: '',
                first_button_url: '',
                second_button_url: '',
                show_first_button: true,
                show_second_button: true,
                status: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values: any) => {
                const formData = {
                  ...values,

                  status: values?.status === 'Active' ? true : false,
                }
                if (!isEmpty(editSelectedData)) {
                  dispatch(bannerRedux.actions.updateBanner(formData, editSelectedData?.id))
                } else {
                  dispatch(bannerRedux.actions.CreateBanner(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, setFieldValue, values}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'name',
                      'title',
                      'title_np',
                      'subtitle',
                      'subtitle_np',
                      'image',
                      'first_button_text',
                      'first_button_text_np',
                      'first_button_url',
                      'second_button_text',
                      'second_button_text_np',
                      'second_button_url',
                    ]
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue(
                      'status',
                      editSelectedData?.status === true ? 'Active' : 'Inactive',
                      false
                    )
                  }
                }, [])
                return (
                  <Form>
                    <div className='card-body border-top pt-5'>
                      <div className='row justify-content-between'>
                        <div className='col-6'>
                          <FormTextBox
                            type='text'
                            placeholder='Enter Name'
                            name='name'
                            label='Name'
                            containerClassName=''
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>

                        <div className='col-6'>
                          <FormInputMediaManager
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            label=' Image '
                            name='image'
                            setFieldValue={setFieldValue}
                            setImageUrl={setImagePath}
                            value={values?.image}
                            required={true}
                            note="Recommended banner size of 1920*600px"
                          />
                           

                          {!isEmpty(values?.image) ? (
                            <>
                              <li className='listing'>
                                <div className='thumbImageBlock'>
                                  <button
                                    type='button'
                                    title='Remove'
                                    className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                                    onClick={() => {
                                      setImagePath('')
                                      setFieldValue('image', '')
                                    }}
                                  >
                                    X
                                  </button>

                                  <img
                                    className='thumbImage w-100 h-100'
                                    src={`${imageBaseUrl}/${values?.image}`}
                                    alt=''
                                  />
                                </div>
                              </li>
                            </>
                          ) : null}
                        </div>
                      </div>

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
                          />
                        </div>
                        <div className='col-6'>
                          <FormTextBox
                            type='text'
                            placeholder='Enter Title (Nepali)'
                            name='title_np'
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
                          <FormTextBox
                            type='text'
                            placeholder='Subtitle (English)'
                            name='subtitle'
                            as='textarea'
                            label='Subtitle (EN)'
                            containerClassName=''
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>

                        <div className='col-6'>
                          <FormTextBox
                            type='text'
                            placeholder='Subtitle (Nepali)'
                            name='subtitle_np'
                            as='textarea'
                            label='Subtitle (NP)'
                            containerClassName=''
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                      </div>

                      <div className='row justify-content-between'>
                        <div className='col-6'>
                          <FormTextBox
                            type='text'
                            placeholder='First Button Text (English)'
                            name='first_button_text'
                            label='First Button Text (EN)'
                            containerClassName=''
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                        <div className='col-6'>
                          <FormTextBox
                            type='text'
                            placeholder='First Button Text (Nepali)'
                            name='first_button_text_np'
                            label='First Button Text (NP)'
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
                        name='first_button_url'
                        label='First Button Url '
                        containerClassName=''
                        onChange={handleChange}
                        errors={errors}
                        touched={touched}
                      />

                      <div className='row justify-content-between'>
                        <div className='col-6'>
                          <FormTextBox
                            type='text'
                            placeholder='Second Button Text (English)'
                            name='second_button_text'
                            label='Second Button Text (EN)'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                        <div className='col-6'>
                          <FormTextBox
                            type='text'
                            placeholder='Second Button Text (Nepali)'
                            name='second_button_text_np'
                            label='Second Button Text (NP)'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                      </div>
                      <FormTextBox
                        type='text'
                        placeholder='Second Button Url '
                        name='second_button_url'
                        label='Second Button Url'
                        containerClassName=''
                        onChange={handleChange}
                        errors={errors}
                        touched={touched}
                      />
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
export default AddBanner
