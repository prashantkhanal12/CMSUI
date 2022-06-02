import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import {ErrorMessage, Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import Modal from 'rsuite/Modal'
import {isEmpty} from 'lodash'
// branch
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import * as categoryTypeRedux from 'src/app/modules/common'
import * as categories from 'src/app/modules/cms/components/categories'
import * as subCategory from '../../subCategory'
import {StateParamsModel} from 'src/app/modules/common/Model'
import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import * as news from '../index'
import FormCheckbox from 'src/cms/helpers/components/forms/FormCheckbox'
import FormDatepicker from 'src/cms/helpers/components/forms/FormDatepicker'
import moment from 'moment'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
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
  categoryId: Yup.string().required('Category is required'),
  subCategoryId: Yup.string().required('Sub category is required'),
  name: Yup.string().required('Name is required'),
  published_date: Yup.string().required('Published date is required').nullable(),
  status: Yup.string().required('Status is required'),
})

const AddNews = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()

  const [categoryValue, setCategoryValue] = useState('')
  const [attachedFile, setAttachedFile] = useState('')
  const [imageEng, setImageEng] = useState('')
  const [imageNp, setImageNp] = useState('')
  const [newsCategory, setNewsCategory] = useState('')

  const {loading, success} = useSelector((state: any) => state.news)
  const {
    data: {categoryType},
  } = useSelector((state: any) => state.categoryType)
  const {
    data: {category},
  } = useSelector((state: any) => state.categories)
  const {data: subCategoryData} = useSelector((state: any) => state.subCategory)

  useEffect(() => {
    dispatch(categoryTypeRedux.action.getCategoryType())
  }, [])

  useEffect(() => {
    const newsCatType = categoryType?.filter(
      (item: {[key: string]: string}) => item.display_name === 'News'
    )
    setNewsCategory(newsCatType[0]?.id)
  }, [categoryType])

  useEffect(() => {
    if (!isEmpty(newsCategory)) {
      dispatch(categories.actions.getSpecificCmsCategories(newsCategory))
    }
  }, [newsCategory])

  useEffect(() => {
    if (categoryValue) {
      dispatch(subCategory.actions.getSpecificSubCategory(categoryValue))
    }
  }, [categoryValue])

  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]

  const categoryOptions = category?.map((items: any) => ({
    label: items.name,
    value: items.id,
  }))

  const subCategoryOptions = subCategoryData?.subCategory?.map((items: any) => ({
    label: items.name,
    value: items.id,
  }))

  useEffect(() => {
    if (success) {
      isEmpty(editSelectedData)
        ? toast.success('News added successfully')
        : toast.success('News edited successfully')
      dispatch(news?.actions.getNews(params))
      dispatch(news?.actions?.addNewsReset())
      handleClose()
    }
  }, [success])

  function convertToSlug(text: any) {
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
        className='w-75'
        backdrop='static'
        keyboard={false}
        enforceFocus={false}
      >
        <Modal.Header>
          <Modal.Title>{actionType} News</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                name: '',
                name_np: '',
                description: '',
                archive_date: '',
                description_np: '',
                categoryId: '',
                subCategoryId: '',
                published_date: null,
                show_pop_up: false,
                status: '',
                image: '',
                image_np: '',
                attached_file: '',
                visibility_time: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, {setSubmitting}) => {
                const formData = {
                  ...values,
                  status: values?.status === 'Active' ? true : false,
                  slug: !isEmpty(editSelectedData)
                    ? editSelectedData?.slug
                    : convertToSlug(values?.name),
                  published_date: moment(values?.published_date).format('YYYY-MM-DD'),
                  archive_date: values?.archive_date
                    ? moment(values?.archive_date).format('YYYY-MM-DD')
                    : null,
                  visibility_time: values?.visibility_time
                    ? values?.visibility_time.toString()
                    : null,
                }

                if (!isEmpty(editSelectedData)) {
                  dispatch(news.actions.updateNews(formData, editSelectedData?.id))
                } else {
                  dispatch(news.actions.addNews(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'name',
                      'name_np',
                      'description',
                      'description_np',
                      'categoryId',
                      'subCategoryId',
                      'slug',
                      'attached_file_title',
                      'attached_file_title_np',
                      'attached_file',
                      'visibility_time',
                      'show_pop_up',
                      'image',
                      'image_np',
                    ]
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))

                    setFieldValue(
                      'archive_date',
                      editSelectedData?.archive_date
                        ? moment(editSelectedData?.archive_date, 'YYYY-MM-DD').toDate()
                        : null,
                      false
                    )
                    setFieldValue(
                      'published_date',
                      moment(editSelectedData?.published_date, 'YYYY-MM-DD').toDate(),
                      false
                    )
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
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select category'
                            label='Category'
                            name='categoryId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={categoryOptions}
                            required={true}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        {!isEmpty(values?.categoryId) ? setCategoryValue(values?.categoryId) : ''}
                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select sub category'
                            label='Sub Category'
                            name='subCategoryId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={subCategoryOptions}
                            values={values}
                            setFieldValue={setFieldValue}
                            disabled={isEmpty(categoryValue) ? true : false}
                            required
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='News title'
                            label='News title (EN)'
                            name='name'
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
                            placeholder='News title (NP)'
                            label='News title (NP)'
                            name='name_np'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Attached file title'
                            label='Attached file title (EN)'
                            name='attached_file_title'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Attached file title (NP)'
                            label='Attached file title (NP)'
                            name='attached_file_title_np'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormInputMediaManager
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            label='Attached File'
                            name='attached_file'
                            setFieldValue={setFieldValue}
                            setImageUrl={setAttachedFile}
                            value={values?.attached_file}
                          />
                        </div>
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
                                : convertToSlug(values?.name)
                            }
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormDatepicker
                            labelClassName='col-12'
                            containerClassName='col-12 '
                            label='Published date'
                            name='published_date'
                            placeholderText='Please select a Published date'
                            setFieldValue={setFieldValue}
                            value={values.published_date || false}
                            errors={errors}
                            touched={touched}
                            required={true}
                            showIcon={true}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormDatepicker
                            labelClassName='col-12'
                            containerClassName='col-12 '
                            minDate={values.published_date}
                            label='Archive date'
                            name='archive_date'
                            placeholderText='Please select a Archive date'
                            setFieldValue={setFieldValue}
                            value={values.archive_date || false}
                            errors={errors}
                            touched={touched}
                            showIcon={true}
                            disabled={values.published_date ? false : true}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Description'
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
                            name='description_np'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.description_np : ''
                            }
                            handleChange={handleChange}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='number'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter days'
                            label='Show As New (In Days)'
                            name='visibility_time'
                            onChange={handleChange}
                            min='0'
                            errors={errors}
                            touched={touched}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormInputMediaManager
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            label='Image (EN)'
                            name='image'
                            setFieldValue={setFieldValue}
                            setImageUrl={setImageEng}
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
                                      setImageEng('')
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
                        <div className='col-md-6 col-xs-12'>
                          <FormInputMediaManager
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            label='Image (NP)'
                            name='image_np'
                            setFieldValue={setFieldValue}
                            setImageUrl={setImageNp}
                            value={values?.image_np}
                          />

                          {!isEmpty(values?.image_np) ? (
                            <>
                              <li className='listing'>
                                <div className='thumbImageBlock'>
                                  <button
                                    type='button'
                                    title='Remove'
                                    className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                                    onClick={() => {
                                      setImageNp('')
                                      setFieldValue('image_np', '')
                                    }}
                                  >
                                    Delete
                                  </button>

                                  <img
                                    className='thumbImage w-100 h-100'
                                    src={`${imageBaseUrl}/${values?.image_np}`}
                                    alt=''
                                  />
                                </div>
                              </li>
                            </>
                          ) : null}
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <label className='form-label fw-bolder text-dark fs-6 required'>
                            Status
                          </label>

                          <div className='d-flex ms-5'>
                            {statusOptions?.map((status: {label: string; value: string}) => (
                              <FormRadio
                                key={status?.value}
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
export default AddNews
