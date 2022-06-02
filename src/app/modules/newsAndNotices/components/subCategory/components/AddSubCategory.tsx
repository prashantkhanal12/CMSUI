import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import {ErrorMessage, Form, Formik} from 'formik'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import {toast} from 'react-toastify'
import Modal from 'rsuite/Modal'
// branch
import * as categoryType from 'src/app/modules/common'
import * as categories from 'src/app/modules/cms/components/categories'
import {isEmpty} from 'lodash'
import {StateParamsModel} from 'src/app/modules/common/Model'
import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import * as subCategory from '../index'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  categoryId: Yup.string().required('Category is required'),
  categoryTypeId: Yup.string().required('Category type is required'),
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  status: Yup.string().required('Status is required'),
})

const AddCategory = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()

  const [subTypeValue, setSubTypeValue] = useState('')
  const {loading, success} = useSelector((state: any) => state.subCategory)
  const {data: categoryTypeData} = useSelector((state: any) => state.categoryType)
  const {data: categoriesData} = useSelector((state: any) => state.categories)

  useEffect(() => {
    dispatch(categoryType.action.getCategoryType())
  }, [])
  useEffect(() => {
    if (subTypeValue) {
      dispatch(categories.actions.getSpecificCmsCategories(subTypeValue))
    }
  }, [subTypeValue])

  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]

  const categoriesOptions = categoriesData?.category?.map((items: any) => ({
    label: items.name,
    value: items.id,
  }))
  const categoryTypeOptions = categoryTypeData?.categoryType
    ?.filter((item: any) => {
      return item.system_name === 'news' || item.system_name === 'notice'
    })
    ?.map((items: any) => ({
      label: items.display_name,
      value: items.id,
    }))

  useEffect(() => {
    if (success) {
      dispatch(subCategory?.actions.getSubCategory(params))
      isEmpty(editSelectedData)
        ? toast.success('Sub Category added successfully')
        : toast.success('Sub Category edited successfully')
      dispatch(subCategory?.actions?.addSubCategoryReset())
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
          <Modal.Title>{actionType} Sub Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                name: '',
                name_np: '',
                description: '',
                description_np: '',
                order: '',
                categoryId: '',
                categoryTypeId: '',
                status: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, {setSubmitting}) => {
                const formData = {
                  ...values,
                  status: values?.status === 'Active' ? true : false,
                }
                if (!isEmpty(editSelectedData)) {
                  dispatch(subCategory.actions.updateSubCategory(formData, editSelectedData?.id))
                } else {
                  dispatch(subCategory.actions.addSubCategory(formData))
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
                      'categoryTypeId',
                      'order',
                      'slug',
                      'type',
                      'typeId',
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
                            placeholder='Please select category type'
                            label='Category Type'
                            name='categoryTypeId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={categoryTypeOptions}
                            required={true}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        {!isEmpty(values?.categoryTypeId)
                          ? setSubTypeValue(values?.categoryTypeId)
                          : ''}
                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select category'
                            label='Category'
                            disabled={values?.categoryTypeId ? false : true}
                            name='categoryId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={categoriesOptions}
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
                            placeholder='Name (EN)'
                            label='Name (EN)'
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
                            placeholder='Name (NP)'
                            label='Name (NP)'
                            name='name_np'
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
                            required
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
                        {/* <div className='col-md-6 col-xs-12'>
                                                    <FormTextBox
                                                        type='number'
                                                        labelClassName='col-md-12'
                                                        containerClassName='col-md-12'
                                                        placeholder='Enter category order'
                                                        label='Category Order'
                                                        name='order'
                                                        onChange={handleChange}
                                                        errors={errors}
                                                        touched={touched}
                                                    />
                                                </div> */}
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
export default AddCategory
