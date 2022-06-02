import {ErrorMessage, Form, Formik} from 'formik'
import {isEmpty} from 'lodash'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {Modal} from 'rsuite'
import * as Yup from 'yup'
import {StateParamsModel} from 'src/app/modules/common/Model'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import * as csr from '../index'
import * as galleryRedux from '../../gallery/redux'
import FormInputMediaManager from 'src/cms/helpers/components/forms/FormInputMediaManager'
import {imageBaseUrl} from 'src/cms/helpers/constants'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import {ICsrState} from '../../csr/redux/reducer'
import * as csrRedux from '../index'
import {CompareCsrModal, CsrOptionModel} from '../Model'
import {FormOptionModal} from '../../menu/Model'
import {GalleryModel} from '../../gallery/Model'
type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  status: Yup.string().required('Status is required'),
  shortDescription: Yup.string().max(250, 'Short Description exceeds 250 words').nullable(),
  shortDescriptionNp: Yup.string()
    .max(250, 'Short Description Nepali exceeds 250 words')
    .nullable(),
})

const AddCsr = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const {csrFileType, loading, success} = useSelector((state: any) => state.csr)
  const {
    data: {album},
  } = useSelector((state: any) => state.gallery)
  const [thumbImageUrl, setThumbImageUrl] = useState<any>('')
  const [fileUrl, setFileUrl] = useState<any>('')

  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]

  const albumOptions = album?.map((items: GalleryModel) => ({
    label: items.title,
    value: items.id,
  }))

  const fileOptions = csrFileType?.map((items: CsrOptionModel) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))

  useEffect(() => {
    dispatch(csrRedux.actions.getCsrFileType())
    dispatch(galleryRedux.actions.getAllGallery())
  }, [])
  useEffect(() => {
    if (success) {
      isEmpty(editSelectedData)
        ? toast.success('CSR added successfully')
        : toast.success('CSR edited successfully')
      dispatch(csr?.actions?.addCsrItemReset())
      dispatch(csr?.actions.getCsrData(params))
      handleClose()
    }
  }, [success])

  const initialValues = {
    title: '',
    titleNp: '',
    slug: '',
    shortDescription: '',
    shortDescriptionNp: '',
    description: '',
    descriptionNp: '',
    status: '',
    thumbnailImage: '',
    fileType: '',
    file: '',
    albumId: '',
  }

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
          <Modal.Title>{actionType} CSR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={initialValues}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values: any) => {
                const formData = {
                  ...values,
                  slug: !isEmpty(editSelectedData)
                    ? editSelectedData?.slug
                    : values?.title.replace(/\s/g, '-').toLowerCase(),
                  status: values?.status === 'Active' ? true : false,
                }

                if (!isEmpty(editSelectedData)) {
                  dispatch(csr.actions.updateCsrItem(formData, editSelectedData?.id))
                } else {
                  dispatch(csr.actions.addCsrItem(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, setFieldValue, values}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'title',
                      'titleNp',
                      'shortDescription',
                      'shortDescriptionNp',
                      'description',
                      'descriptionNp',
                      'slug',
                      'status',
                      'thumbnailImage',
                      'file',
                      'fileType',
                      'albumId',
                    ]
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue(
                      'status',
                      editSelectedData?.status === true ? 'Active' : 'Inactive',
                      false
                    )
                  }
                }, [])

                const chosenFileType = fileOptions.find(
                  (item: FormOptionModal) => item.value === values.fileType
                )
                return (
                  <Form>
                    <div className='card-body border-top pt-5'>
                      <div className='row'>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            placeholder='Enter Title'
                            name='title'
                            label='Title (EN)'
                            containerClassName=''
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
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

                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Description (EN)'
                            name='description'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.description : ''
                            }
                            handleChange={handleChange}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Description (NP)'
                            name='descriptionNp'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.descriptionNp : ''
                            }
                            handleChange={handleChange}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Short Description (EN)'
                            name='shortDescription'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.shortDescription : ''
                            }
                            handleChange={handleChange}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Short Description (NP)'
                            name='shortDescriptionNp'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.shortDescriptionNp : ''
                            }
                            handleChange={handleChange}
                          />
                        </div>

                        <div className='row justify-content-between mt-5'>
                          <div className='col-md-6 col-xs-12'>
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
                              disabled={true}
                              value={
                                !isEmpty(editSelectedData)
                                  ? editSelectedData?.slug
                                  : convertToSlug(values?.title)
                              }
                            />
                          </div>
                          <div className='col-md-6 col-xs-12'>
                            <FormSelect
                              type='text'
                              labelClassName='col-md-12'
                              containerClassName='col-md-12'
                              placeholder='Please select album'
                              label='Album'
                              name='albumId'
                              onChange={handleChange}
                              errors={errors}
                              touched={touched}
                              options={albumOptions}
                              values={values}
                              setFieldValue={setFieldValue}
                            />
                          </div>
                          <div className='col-md-6 col-xs-12'>
                            <FormSelect
                              type='text'
                              labelClassName='col-md-12'
                              containerClassName='col-md-12'
                              placeholder='File Type'
                              label='Image or Video'
                              name='fileType'
                              onChange={handleChange}
                              errors={errors}
                              touched={touched}
                              options={fileOptions}
                              values={values}
                              setFieldValue={setFieldValue}
                            />
                          </div>

                          {chosenFileType?.systemName === 'image' ? (
                            <div className='col-md-6 col-xs-12'>
                              <FormInputMediaManager
                                labelClassName='col-md-12'
                                containerClassName='col-md-12'
                                label='Image'
                                name='file'
                                setFieldValue={setFieldValue}
                                setImageUrl={setFileUrl}
                                value={values?.file}
                              />
                              {!isEmpty(values?.file) ? (
                                <>
                                  <li className='listing'>
                                    <div className='thumbImageBlock'>
                                      <button
                                        type='button'
                                        title='Remove'
                                        className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                                        onClick={() => {
                                          setFieldValue('file', '')
                                        }}
                                      >
                                        Delete
                                      </button>

                                      <img
                                        className='thumbImage w-100 h-100'
                                        src={`${imageBaseUrl}/${values.file}`}
                                        alt=''
                                      />
                                    </div>
                                  </li>
                                </>
                              ) : null}
                            </div>
                          ) : chosenFileType?.systemName === 'video' ? (
                            <div className='col-md-6 col-xs-12'>
                              <FormTextBox
                                type='text'
                                labelClassName='col-md-12'
                                containerClassName='col-md-12'
                                placeholder='Iframe '
                                label='Iframe'
                                name='file'
                                onChange={handleChange}
                                errors={errors}
                                touched={touched}
                                as='textarea'
                              />
                            </div>
                          ) : null}

                          <div className='col-md-6 col-xs-12'>
                            <FormInputMediaManager
                              labelClassName='col-md-12'
                              containerClassName='col-md-12'
                              label='Thumbnail Image'
                              name='thumbnailImage'
                              setFieldValue={setFieldValue}
                              setImageUrl={setThumbImageUrl}
                              value={values?.thumbnailImage}
                            />

                            {!isEmpty(values?.thumbnailImage) ? (
                              <>
                                <li className='listing'>
                                  <div className='thumbImageBlock'>
                                    <button
                                      type='button'
                                      title='Remove'
                                      className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                                      onClick={() => {
                                        setFieldValue('thumbnailImage', '')
                                      }}
                                    >
                                      Delete
                                    </button>

                                    <img
                                      className='thumbImage w-100 h-100'
                                      src={`${imageBaseUrl}/${values.thumbnailImage}`}
                                      alt=''
                                    />
                                  </div>
                                </li>
                              </>
                            ) : null}
                          </div>
                        </div>

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

export default AddCsr
