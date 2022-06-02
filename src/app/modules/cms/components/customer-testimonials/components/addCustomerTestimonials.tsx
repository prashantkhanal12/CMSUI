import {useEffect, useState} from 'react'
import {ErrorMessage, Form, Formik} from 'formik'
import {isEmpty} from 'lodash'
import {useDispatch, useSelector} from 'react-redux'
import {Modal} from 'rsuite'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
//Manual import
import {StateParamsModel} from 'src/app/modules/common/Model'
import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
import * as customerTestimonialsRedux from 'src/app/modules/cms/components/customer-testimonials/redux'
import * as customerTestimonialMediaType from 'src/app/modules/common'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormInputMediaManager from 'src/cms/helpers/components/forms/FormInputMediaManager'
import {imageBaseUrl} from 'src/cms/helpers/constants'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  mediaTypeId: Yup.string().required('Media Type Id is required'),
  short_description: Yup.string().required('Short Description is required'),
  subtitle: Yup.string().required('Subtitle is required'),
  thumbnail_image: Yup.string().required('Thumnail image is required'),
  status: Yup.string().required('Status is required'),
})
const AddCustomerTestimonials = ({
  open,
  params,
  handleClose,
  actionType,
  editSelectedData,
}: Props) => {
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState('')
  const [thumbImageUrl, setThumbImageUrl] = useState('')
  const {loading, success} = useSelector((state: any) => state.customerTestimonials)

  const {data: mediaTypeData} = useSelector((state: any) => state.customerTestimonialMediaType)

  useEffect(() => {
    dispatch(customerTestimonialMediaType.action.getMediaType())
  }, [])

  const mediaTypeOptions = mediaTypeData?.mediaType?.map((items: any) => ({
    label: items.display_name,
    value: items.id,
  }))

  useEffect(() => {
    if (success) {
      dispatch(customerTestimonialsRedux?.actions.getCustomerTestimonials(params))
      isEmpty(editSelectedData)
        ? toast.success('Customer Testimonial added successfully')
        : toast.success('Customer Testimonial edited successfully')
      dispatch(customerTestimonialsRedux?.actions.createCustomerTestimonialsReset())
      handleClose()
    }
  }, [success])

  const initialValues = {
    title: '',
    title_np: '',
    subtitle: '',
    subtitle_np: '',
    short_description: '',
    short_description_np: '',
    description: '',
    description_np: '',
    slug: '',
    thumbnail_image: '',
    featured_in_homepage: '',
    mediaTypeId: '',
    status: '',
    image: '',
  }

  const featuredOptions = [
    {label: 'Yes', value: 'yes'},
    {label: 'No', value: 'no'},
  ]

  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]

  const convertToSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
  }

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
          <Modal.Title>Add Customer Testimonials </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values: any) => {
                const formData = {
                  ...values,
                  status: values?.status === 'Active' ? true : false,
                  featured_in_homepage: values.featured_in_homepage === 'yes' ? true : false,
                  slug: !isEmpty(editSelectedData)
                    ? editSelectedData?.slug
                    : convertToSlug(values?.title),
                }

                if (!isEmpty(editSelectedData)) {
                  dispatch(
                    customerTestimonialsRedux.actions.updateCustomerTestimonials(
                      formData,
                      editSelectedData?.id
                    )
                  )
                } else {
                  dispatch(customerTestimonialsRedux.actions.CreateCustomerTestimonials(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, setFieldValue, values}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'title',
                      'title_np',
                      'subtitle',
                      'subtitle_np',
                      'short_description',
                      'short_description_np',
                      'description',
                      'description_np',
                      'thumbnail_image',
                      'status',
                      'image',
                      'video',
                      'slug',
                      'mediaTypeId',
                    ]
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue('mediaTypeId', editSelectedData?.mediaType?.id, false)
                    setFieldValue(
                      'featured_in_homepage',
                      (editSelectedData.featured_in_homepage =
                        editSelectedData.featured_in_homepage === true ? 'yes' : 'no'),
                      false
                    )
                    setFieldValue(
                      'status',
                      (editSelectedData.status =
                        editSelectedData.status === true ? 'Active' : 'Inactive'),
                      false
                    )
                  }
                }, [])
                return (
                  <Form>
                    <div className='card-body border-top pt-5'>
                      <div className='row justify-content-between'>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            placeholder='Customer Title (English)'
                            name='title'
                            label='Title (EN)'
                            containerClassName=''
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                          <div className='mb-6'>
                            <em>
                              <small>
                                {
                                  'Use <span> tag for color effect. Eg. <span>Highlighted</span> non highlighted'
                                }
                              </small>
                              <small className='d-block'>
                                Results: <span className='text-danger'>Highlighted</span> non
                                highlighted
                              </small>
                            </em>
                          </div>
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
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
                          <div className='mb-6'>
                            <em>
                              <small>
                                {
                                  'Use <span> tag for color effect. Eg. <span>Highlighted</span> non highlighted'
                                }
                              </small>
                              <small className='d-block'>
                                Results: <span className='text-danger'>Highlighted</span> non
                                highlighted
                              </small>
                            </em>
                          </div>
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            placeholder='Enter Subtitle (English)'
                            name='subtitle'
                            label='Subtitle (EN)'
                            containerClassName=''
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            placeholder='Enter subtitle (Nepali)'
                            name='subtitle_np'
                            label='Subtitle (NP)'
                            containerClassName=''
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Short Description'
                            name='short_description'
                            required={true}
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.short_description : ''
                            }
                            handleChange={handleChange}
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Short Description (NP)'
                            name='short_description_np'
                            initialValue={
                              !isEmpty(editSelectedData)
                                ? editSelectedData?.short_description_np
                                : ''
                            }
                            handleChange={handleChange}
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12 mb-3'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Description'
                            name='description'
                            required={true}
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.description : ''
                            }
                            handleChange={handleChange}
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12 mb-3'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Description (NP)'
                            name='description_np'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.description_np : ''
                            }
                            handleChange={handleChange}
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter slug'
                            label='Slug'
                            name='slug'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            value={
                              !isEmpty(editSelectedData)
                                ? editSelectedData?.slug
                                : convertToSlug(values?.title)
                            }
                            disabled={true}
                            required={true}
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormInputMediaManager
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            label='Thumbnail Image'
                            name='thumbnail_image'
                            setFieldValue={setFieldValue}
                            setImageUrl={setThumbImageUrl}
                            value={values?.thumbnail_image}
                            required={true}
                          />

                          {!isEmpty(values?.thumbnail_image) ? (
                            <>
                              <li className='listing'>
                                <div className='thumbImageBlock'>
                                  <button
                                    type='button'
                                    title='Remove'
                                    className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                                    onClick={() => {
                                      setImageUrl('')
                                      setFieldValue('thumbnail_image', '')
                                    }}
                                  >
                                    Delete
                                  </button>

                                  <img
                                    className='thumbImage w-100 h-100'
                                    src={`${imageBaseUrl}/${values?.thumbnail_image}`}
                                    alt=''
                                  />
                                </div>
                              </li>
                            </>
                          ) : null}
                        </div>

                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <label className='form-label fw-bolder text-dark fs-6 '>
                            Featured in Homepage
                          </label>
                          <div className='d-flex ms-5'>
                            {featuredOptions?.map((status: {label: string; value: string}) => (
                              <FormRadio
                                containerClassName=''
                                label='Featured in Homepage'
                                name='featured_in_homepage'
                                type='radio'
                                onChange={handleChange}
                                errors={errors}
                                touched={touched}
                                checkBoxText={status?.label}
                                value={status?.value}
                              />
                            ))}
                          </div>
                          <div className='mb-6 text-primary d-block'>
                            <em>
                              <small>Featured Image will be shown on home page</small>
                            </em>
                          </div>
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select media type'
                            label='Media Type'
                            name='mediaTypeId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={mediaTypeOptions}
                            required={true}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>

                        {!isEmpty(values?.mediaTypeId) ? (
                          values?.mediaTypeId === '89875c3e-3d5f-4347-9272-d66b5ec7c588' ? (
                            <>
                              <div className='col-md-6 col-sm-6 col-xs-12'>
                                <FormInputMediaManager
                                  labelClassName='col-md-12'
                                  containerClassName='col-md-12'
                                  label='Image'
                                  name='image'
                                  setFieldValue={setFieldValue}
                                  setImageUrl={setImageUrl}
                                  value={values?.image}
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
                                            setImageUrl('')
                                            setFieldValue('image', '')
                                          }}
                                        >
                                          Delete
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
                            </>
                          ) : (
                            <>
                              <div className='col-md-6 col-sm-6 col-xs-12'>
                                <FormTextBox
                                  type='text'
                                  placeholder='Video'
                                  as='textarea'
                                  name='video'
                                  label='Video'
                                  containerClassName=''
                                  onChange={handleChange}
                                  errors={errors}
                                  touched={touched}
                                />
                              </div>
                            </>
                          )
                        ) : null}

                        <div className='col-md-6 col-xs-12'>
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
                    </div>

                    <div className='d-flex justify-content-end px-9 '>
                      <button type='submit' disabled={loading} className='btn btn-primary btn-sm'>
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

export default AddCustomerTestimonials
