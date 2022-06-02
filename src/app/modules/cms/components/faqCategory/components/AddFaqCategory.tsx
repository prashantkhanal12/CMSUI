import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {ErrorMessage, Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import {useHistory, useParams} from 'react-router-dom'
import Modal from 'rsuite/Modal'
import * as Yup from 'yup'

//Manual import
import {StateParamsModel} from 'src/app/modules/common/Model'
import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import * as faqIconTypeRedux from '../faqIconType/redux'
import {IFaqIconTypeState} from '../faqIconType/redux'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import * as faqCategoryRedux from '../../faqCategory/redux'
import FormInputMediaManager from 'src/cms/helpers/components/forms/FormInputMediaManager'
import {imageBaseUrl} from 'src/cms/helpers/constants'
import {FaqIconTypeModel} from '../faqIconType/Model'
import {TreePicker} from 'rsuite'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}
const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Must not contain number or symbol'),
  iconTypeId: Yup.string().required('Icon Type Id is required'),
  status: Yup.string().required('Status is required'),
})

const AddFaqCategory = ({open, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  let history = useHistory()
  const params: {id: string} = useParams()
  const [imagePath, setImagePath] = useState('')
  const {loading, success} = useSelector((state: any) => state.faqCategory)
  const faqCategoryData = useSelector((state: any) => state.faqCategory)
  const [categoryId, setCategoryId] = useState(faqCategoryData?.id)
  const faqIconTypeData: IFaqIconTypeState = useSelector((state: any) => state.faqIconType)

  const [imageUrl, setImageUrl] = useState<any>('')

  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]

  const faqIconTypeOptions: any = faqIconTypeData?.data?.faqIconType?.map(
    (items: FaqIconTypeModel) => ({
      label: items?.display_name,
      value: items?.id,
      system_name: items?.system_name,
    })
  )

  /**
   * fetching the category list from the store
   *
   */
  const faqCategoryListData: {
    label: string
    value: string
    children: {label: string; value: string}[]
  }[] = faqCategoryData?.faqCategoryList?.faqCategory?.map(
    (items: {name: string; id: string; children: {name: string; id: string}[]}) => ({
      label: items?.name,
      value: items?.name,
      children:
        items.children &&
        items.children.map((item: {name: string; id: string}) => ({
          label: item.name,
          value: item.id,
        })),
    })
  )

  useEffect(() => {
    dispatch(faqIconTypeRedux.actions.getFaqIconType())
    dispatch(faqCategoryRedux.actions.getAllFaqCategory())
  }, [])

  useEffect(() => {
    if (!isEmpty(params?.id)) {
      setCategoryId(params?.id)
    }
    if (success) {
      dispatch(faqCategoryRedux?.actions.getFaqCategory())
      isEmpty(editSelectedData)
        ? toast.success('Faq Category type added successfully')
        : toast.success('Faq Category edited successfully')
      dispatch(faqCategoryRedux?.actions?.createFaqCategoryReset())
      handleClose()
    }
  }, [params, success])

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
          <Modal.Title>{actionType} Faq Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                parentCategoryId: '',
                name: '',
                name_np: '',
                slug: '',
                iconTypeId: '',
                image: '',
                iconType: '',
                status: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, {setSubmitting}) => {
                const formData = {
                  ...values,
                  slug: !isEmpty(editSelectedData)
                    ? editSelectedData?.slug
                    : values?.name.replace(/\s/g, '-').toLowerCase(),
                  status: values?.status === 'Active' ? true : false,
                }
                dispatch(faqCategoryRedux.actions.CreateFaqCategory(formData))

                if (!isEmpty(editSelectedData)) {
                  dispatch(
                    faqCategoryRedux.actions.updateFaqCategory(formData, editSelectedData?.id)
                  )
                } else {
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'name',
                      'name_np',
                      'slug',
                      'parentCategoryId',
                      'iconTypeId',
                      'image',
                      'iconType',
                    ]
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue(
                      'status',
                      editSelectedData?.status === true ? 'Active' : 'Inactive',
                      false
                    )
                    setFieldValue('parentCategoryId', editSelectedData?.parentCategoryId, false)
                  }
                }, [])

                const chosenIconType = faqIconTypeOptions.find(
                  (item: any) => item.value === values.iconTypeId
                )

                return (
                  <Form>
                    <div className='card-body border-top pt-5'>
                      <div className='row'>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Name'
                            label='Name (EN)'
                            name='name'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Name (NP)'
                            label='Name (NP)'
                            name='name_np'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            required={true}
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Slug'
                            label='Slug'
                            name='slug'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            disabled={true}
                            value={
                              !isEmpty(editSelectedData)
                                ? editSelectedData?.slug
                                : values?.name.replace(/\s/g, '-').toLowerCase()
                            }
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <label className='form-label fw-bolder text-dark fs-6'>Parent FAQ</label>
                          <TreePicker
                            size='lg'
                            height={50}
                            name='parentCategoryId'
                            className='col-md-12'
                            defaultExpandAll
                            data={faqCategoryListData}
                            onSelect={(e: any) => setFieldValue('parentCategoryId', e.value)}
                            defaultValue={editSelectedData?.parentCategoryId}
                            // onChange={handleChange}
                            // errors={errors}
                          />
                        </div>
                        {/* <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormSelect
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Icon Type'
                            label='Select the parent Category'
                            name='parentCategoryId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={faqCategoryListData}
                            required={true}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div> */}
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormSelect
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Icon Type'
                            label='Icon Type Id'
                            name='iconTypeId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={faqIconTypeOptions}
                            required={true}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        {chosenIconType?.system_name === 'image' ? (
                          <div className='col-md-6 col-sm-6 col-xs-12'>
                            <FormInputMediaManager
                              labelClassName='col-md-12'
                              containerClassName='col-md-12'
                              label='Image'
                              name='image'
                              setFieldValue={setFieldValue}
                              setImageUrl={setImagePath}
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
                        ) : chosenIconType?.system_name === 'icon_class' ? (
                          <div>
                            <div className='col-md-6 col-sm-6 col-xs-12'>
                              <div className='d-flex align-items-end'>
                                <div className='w-100'>
                                  <FormTextBox
                                    type='text'
                                    labelClassName='col-12'
                                    containerClassName='col-md-12'
                                    placeholder='Select an icon'
                                    label='IconType'
                                    name='iconType'
                                    onChange={handleChange}
                                    errors={errors}
                                    touched={touched}
                                  />
                                </div>

                                <button
                                  className='btn btn-primary mb-7'
                                  title='Select icon and paste here'
                                  onClick={() => {
                                    window.open(
                                      'https://react-icons.github.io/react-icons/',
                                      '_blank'
                                    )
                                  }}
                                >
                                  Select
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : null}
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
export default AddFaqCategory
