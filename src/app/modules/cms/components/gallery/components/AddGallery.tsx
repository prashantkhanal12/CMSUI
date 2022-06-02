import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {FieldArray, Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import Modal from 'rsuite/Modal'
import moment from 'moment'
import * as Yup from 'yup'

//Manual import
import {StateParamsModel} from 'src/app/modules/common/Model'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
import * as galleryRedux from '../../gallery/redux'
import FormDatepicker from 'src/cms/helpers/components/forms/FormDatepicker'
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
  thumbImage: Yup.string().required('Thumb Image is required'),
  coverImage: Yup.string().required('Cover Image is required'),
  date: Yup.string().required('Date is required'),
  photos: Yup.array().of(
    Yup.object().shape({
      photoTitle: Yup.string().required('Photo Title is required'),
    })
  ),
})

const AddGallery = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const [thumbImage, setThumbImage] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [linkData, setLinkData] = useState('')
  const {loading, success} = useSelector((state: any) => state.gallery)

  useEffect(() => {
    if (success) {
      dispatch(galleryRedux?.actions.getGallery(params))
      isEmpty(editSelectedData)
        ? toast.success('Gallery added successfully')
        : toast.success('Gallery edited successfully')
      dispatch(galleryRedux?.actions?.resetGallery())
      handleClose()
    }
  }, [success])

  return (
    <div className='modal-container'>
      <Modal
        open={open}
        onClose={handleClose}
        className='w-75'
        backdrop='static'
        keyboard={false}
        enforceFocus={false}
      >
        <Modal.Header>
          <Modal.Title>{actionType} Photos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                title: '',
                titleNp: '',
                date: '',
                description: '',
                descriptionNp: '',
                thumbImage: '',
                coverImage: '',
                photos: [
                  {
                    photoTitle: '',
                    photoTitleNp: '',
                    link: '',
                    iframe: '',
                  },
                ],
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, {setSubmitting}) => {
                const formData = {
                  ...values,
                  date: moment(values?.date).format('YYYY-MM-DD'),
                  photos: values?.photos?.map((item: {[key: string]: string}) => ({
                    ...item,
                    id: !isEmpty(editSelectedData) ? item.id : null,
                  })),
                }
                if (!isEmpty(editSelectedData)) {
                  dispatch(galleryRedux.actions.updateGallery(formData, editSelectedData?.id))
                } else {
                  dispatch(galleryRedux.actions.addGallery(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'id',
                      'title',
                      'titleNp',
                      'date',
                      'thumbImage',
                      'coverImage',
                      'description',
                      'descriptionNp',
                      'photos',
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
                      <div className='row'>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Title'
                            label='Album Title (EN)'
                            name='title'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Title (NP)'
                            label='Album Title (NP)'
                            name='titleNp'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormDatepicker
                            labelClassName='col-12'
                            containerClassName='col-12 '
                            label=' Date'
                            name='date'
                            placeholderText='Please select a date'
                            setFieldValue={setFieldValue}
                            value={values.date || false}
                            touched={touched}
                            showIcon={true}
                            errors={{}}
                            required={true}
                          />
                        </div>
                        <div className='col-lg-6'>
                          <div className='row'>
                            <div className='col-md-6 col-xs-12'>
                              <FormInputMediaManager
                                labelClassName='col-md-12'
                                containerClassName='col-md-12'
                                label='Album Thumb Image (EN)'
                                name='thumbImage'
                                setFieldValue={setFieldValue}
                                setImageUrl={setThumbImage}
                                value={values?.thumbImage}
                                required={true}
                              />

                              {!isEmpty(values?.thumbImage) ? (
                                <>
                                  <li className='listing'>
                                    <div className='thumbImageBlock'>
                                      <button
                                        type='button'
                                        title='Remove'
                                        className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                                        onClick={() => {
                                          setThumbImage('')
                                          setFieldValue('thumbImage', '')
                                        }}
                                      >
                                        X
                                      </button>

                                      <img
                                        className='thumbImage w-100 h-100'
                                        src={`${imageBaseUrl}/${values?.thumbImage}`}
                                        alt=''
                                      />
                                    </div>
                                  </li>
                                </>
                              ) : null}
                            </div>

                            <div className='col-md-6 col-xs-12'>
                              <FormInputMediaManager
                                labelClassName='col-md-12'
                                containerClassName='col-md-12'
                                label='Album Cover Image (EN)'
                                name='coverImage'
                                setFieldValue={setFieldValue}
                                setImageUrl={setCoverImage}
                                value={values?.coverImage}
                                required={true}
                              />

                              {!isEmpty(values?.coverImage) ? (
                                <>
                                  <li className='listing'>
                                    <div className='thumbImageBlock'>
                                      <button
                                        type='button'
                                        title='Remove'
                                        className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                                        onClick={() => {
                                          setCoverImage('')
                                          setFieldValue('coverImage', '')
                                        }}
                                      >
                                        X
                                      </button>

                                      <img
                                        className='thumbImage w-100 h-100'
                                        src={`${imageBaseUrl}/${values?.coverImage}`}
                                        alt=''
                                      />
                                    </div>
                                  </li>
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            name='description'
                            handleChange={handleChange}
                            label='Album Description (EN)'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.description : ''
                            }
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            name='descriptionNp'
                            handleChange={handleChange}
                            label=' Album Description (NP)'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.descriptionNp : ''
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className='card-body border-top pt-5'>
                      <h5>Photo Videos on Album</h5>
                      <div className=''>
                        <div className=''>
                          <FieldArray
                            name='photos'
                            render={(arrayHelpers) => (
                              <div>
                                {values.photos && values.photos.length > 0
                                  ? values.photos.map((friend: any, index: any) => (
                                      <div key={index} className='row'>
                                        <div className='col-12 pt-5 border-top'>
                                          {index > 0 && (
                                            <div className=' d-flex justify-content-md-end mb-2'>
                                              <button
                                                type='button'
                                                className='p-2 ps-5 pe-5 btn btn-secondary'
                                                onClick={() => arrayHelpers.remove(index)}
                                              >
                                                Remove
                                              </button>
                                            </div>
                                          )}
                                        </div>
                                        <div className='col-md-6 col-xs-12'>
                                          <FormTextBox
                                            type='text'
                                            labelClassName='col-md-12'
                                            containerClassName='col-md-12'
                                            placeholder='Title in English'
                                            label='Title (EN)'
                                            name={`photos.${index}.photoTitle`}
                                            onChange={handleChange}
                                            errors={errors}
                                            touched={touched}
                                            required={true}
                                          />
                                        </div>
                                        <div className='col-md-6 col-xs-12'>
                                          <FormTextBox
                                            type='text'
                                            labelClassName='col-md-12'
                                            containerClassName='col-md-12'
                                            placeholder='Title in Nepali'
                                            label='Title (NP)'
                                            name={`photos.${index}.photoTitleNp`}
                                            onChange={handleChange}
                                            errors={errors}
                                            touched={touched}
                                          />
                                        </div>
                                        <div className='col-md-6 col-xs-12'>
                                          <FormInputMediaManager
                                            labelClassName='col-md-12'
                                            containerClassName='col-md-12'
                                            label='Upload Image'
                                            name={`photos.${index}.link`}
                                            setFieldValue={setFieldValue}
                                            setImageUrl={setLinkData}
                                            value={values.photos[index].link}
                                          />

                                          {!isEmpty(values.photos[index].link) ? (
                                            <>
                                              <li className='listing'>
                                                <div className='thumbImageBlock'>
                                                  <button
                                                    type='button'
                                                    title='Remove'
                                                    className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                                                    onClick={() => {
                                                      setLinkData('')
                                                      setFieldValue('link', '')
                                                    }}
                                                  >
                                                    X
                                                  </button>

                                                  <img
                                                    className='thumbImage w-100 h-100'
                                                    src={`${imageBaseUrl}/${values.photos[index].link}`}
                                                    alt=''
                                                  />
                                                </div>
                                              </li>
                                            </>
                                          ) : null}
                                        </div>

                                        <div className='col-md-6 col-xs-12'>
                                          <FormTextBox
                                            type='text'
                                            as='textarea'
                                            labelClassName='col-md-12'
                                            containerClassName='col-md-12'
                                            placeholder='Iframe '
                                            label='Iframe'
                                            name={`photos.${index}.iframe`}
                                            onChange={handleChange}
                                            errors={errors}
                                            touched={touched}
                                          />
                                        </div>
                                      </div>
                                    ))
                                  : null}
                                <div className='d-flex justify-content-end'>
                                  <button
                                    className=' p-2 ps-3 pe-3 btn btn-primary w-100'
                                    type='button'
                                    onClick={() =>
                                      arrayHelpers.push({
                                        id: null,
                                        photoTitle: '',
                                        photoTitleNp: '',
                                        link: '',
                                        iframe: '',
                                      })
                                    }
                                  >
                                    + Add More
                                  </button>
                                </div>
                              </div>
                            )}
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
export default AddGallery
