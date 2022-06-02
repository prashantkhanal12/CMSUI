import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import {ErrorMessage, Form, Formik} from 'formik'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import {toast} from 'react-toastify'
import Modal from 'rsuite/Modal'
// branch
import * as categoryTypeRedux from 'src/app/modules/common'
import * as categories from 'src/app/modules/cms/components/categories'
import * as subCategory from '../../subCategory'
import {isEmpty} from 'lodash'
import {StateParamsModel} from 'src/app/modules/common/Model'
import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import * as notice from '../index'
import FormCheckbox from 'src/cms/helpers/components/forms/FormCheckbox'
import FormDatepicker from 'src/cms/helpers/components/forms/FormDatepicker'
import moment from 'moment'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
import {getTodayDate} from 'src/cms/helpers/AssetHelpers'
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
  subCategoryId: Yup.string().required('Sub Category type is required'),
  name: Yup.string().required('Name is required'),
  published_date: Yup.string().required('Published date is required').nullable(),
  status: Yup.string().required('Status is required'),
})

const AddNotice = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()

  const [noticeCategory, setNoticeCategory] = useState('')
  const [categoryValue, setCategoryValue] = useState('')
  const [attachedFile, setAttachedFile] = useState('')
  const [imageEng, setImageEng] = useState('')
  const [imageNp, setImageNp] = useState('')
  const {loading, success} = useSelector((state: any) => state.notices)
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
    const noticeCatType = categoryType?.filter(
      (item: {[key: string]: string}) => item.display_name === 'Notice'
    )
    setNoticeCategory(noticeCatType[0]?.id)
  }, [categoryType])

  useEffect(() => {
    if (!isEmpty(noticeCategory)) {
      dispatch(categories.actions.getSpecificCmsCategories(noticeCategory))
    }
  }, [noticeCategory])

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
      dispatch(notice?.actions.getNotice(params))
      isEmpty(editSelectedData)
        ? toast.success('Notice added successfully')
        : toast.success('Notice edited successfully')
      dispatch(notice?.actions?.addNoticeReset())
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
          <Modal.Title>{actionType} Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                name: '',
                name_np: '',
                description: '',
                description_np: '',
                categoryId: '',
                subCategoryId: '',
                published_date: null,
                published_time: null,
                expiry_date: null,
                expiry_time: null,
                showing_day: null,
                image: '',
                image_np: '',
                attached_file: '',
                status: '',
                show_pop_up: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, {setSubmitting}) => {
                const formData = {
                  ...values,
                  show_pop_up: false,
                  status: values?.status === 'Active' ? true : false,
                  showing_day: values?.showing_day ? values?.showing_day : null,
                  slug: !isEmpty(editSelectedData)
                    ? editSelectedData?.slug
                    : convertToSlug(values?.name),
                  published_date: moment(values?.published_date).format('YYYY-MM-DD'),
                  published_time: values?.published_time
                    ? moment(values?.published_time).format('hh:mm A')
                    : null,
                  expiry_date: values?.expiry_date
                    ? moment(values?.expiry_date).format('YYYY-MM-DD')
                    : null,
                  expiry_time: values?.expiry_time
                    ? moment(values?.expiry_time).format('hh:mm A')
                    : null,
                }

                if (!isEmpty(editSelectedData)) {
                  dispatch(notice.actions.updateNotice(formData, editSelectedData?.id))
                } else {
                  dispatch(notice.actions.addNotice(formData))
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
                      'showing_day',
                      'image',
                      'image_np',
                      'show_pop_up',
                      'published_time',
                      'published_date',
                      'expiry_date',
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
                            placeholder='Please select subcategory'
                            label='Sub Category'
                            disabled={values?.categoryId ? false : true}
                            name='subCategoryId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={subCategoryOptions}
                            required={true}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Notice Name'
                            label='Notice Name'
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
                            placeholder='Notice Name (NP)'
                            label='Notice Name (NP)'
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
                            label='Attached file title'
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
                            value={values?.published_date || false}
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
                            dateFormat='hh:mm aa'
                            showTimeSelect={true}
                            showTimeSelectOnly={true}
                            name='published_time'
                            label='Published time'
                            placeholderText='--:-- --'
                            setFieldValue={setFieldValue}
                            value={values?.published_time || false}
                            errors={errors}
                            touched={touched}
                            showIcon={true}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormDatepicker
                            labelClassName='col-12'
                            containerClassName='col-12 '
                            label='Expiry date'
                            name='expiry_date'
                            placeholderText='Please select a Expiry date'
                            setFieldValue={setFieldValue}
                            minDate={values.published_date}
                            value={values?.expiry_date || false}
                            errors={errors}
                            touched={touched}
                            showIcon={true}
                            disabled={values.published_date ? false : true}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormDatepicker
                            labelClassName='col-12'
                            containerClassName='col-12 '
                            dateFormat='hh:mm aa'
                            showTimeSelect={true}
                            showTimeSelectOnly={true}
                            name='expiry_time'
                            label='Expiry time'
                            placeholderText='--:-- --'
                            setFieldValue={setFieldValue}
                            value={values?.expiry_time || false}
                            errors={errors}
                            touched={touched}
                            showIcon={true}
                            disabled={values.expiry_date ? false : true}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Description'
                            name='description'
                            height={350}
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
                            height={350}
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
                            name='showing_day'
                            min='0'
                            onChange={handleChange}
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
                        {/* <div className='col-md-6 col-xs-12'>
                          <FormCheckbox
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            label='Show Pop Up'
                            name='show_pop_up'
                            touched={touched}
                            errors={errors}
                            onChange={handleChange}
                            checkBoxText='Show pop up'
                            required
                          />
                        </div> */}
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
export default AddNotice
