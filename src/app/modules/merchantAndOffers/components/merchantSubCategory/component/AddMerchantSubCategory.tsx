import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {ErrorMessage, Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import * as Yup from 'yup'

import * as merchantSubCategory from '../index'
import * as categoryTypeRedux from 'src/app/modules/common'
import * as categoriesRedux from 'src/app/modules/cms'
import {StateParamsModel} from 'src/app/modules/common/Model'

import Modal from 'rsuite/Modal'

import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'

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
  categoryId: Yup.string().required('Category is required'),
  status: Yup.string().required('Status is required'),
})

const AddMerchantSubCategory = ({
  open,
  params,
  handleClose,
  actionType,
  editSelectedData,
}: Props) => {
  const dispatch = useDispatch()
  const [merchantCategory, setMerchantCategory] = useState('')
  const {loading, success} = useSelector((state: any) => state.merchantSubCategory)
  const {
    data: {categoryType},
  } = useSelector((state: any) => state.categoryType)

  const {
    data: {category},
  } = useSelector((state: any) => state.categories)
  useEffect(() => {
    dispatch(categoryTypeRedux.action.getCategoryType())
  }, [])

  useEffect(() => {
    const merchantCatType = categoryType?.filter(
      (item: {[key: string]: string}) => item.display_name === 'Merchant'
    )
    setMerchantCategory(merchantCatType[0]?.id)
  }, [categoryType])

  useEffect(() => {
    if (!isEmpty(merchantCategory)) {
      dispatch(categoriesRedux.categories.actions.getSpecificCmsCategories(merchantCategory))
    }
  }, [merchantCategory])

  const categoryOptions = category?.map((item: {[key: string]: string}) => ({
    label: item.name,
    value: item.id,
  }))

  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]

  useEffect(() => {
    if (success) {
      dispatch(merchantSubCategory?.actions.getMerchantSubCategory(params))
      isEmpty(editSelectedData)
        ? toast.success('Merchant sub category added successfully')
        : toast.success('Merchant sub category edited successfully')
      dispatch(merchantSubCategory?.actions?.resetMerchantSubCategory())
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
          <Modal.Title>{actionType} Merchant Sub Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                name: '',
                status: '',
                categoryId: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                const formData = {
                  ...values,
                  status: values?.status === 'Active' ? true : false,
                }

                if (!isEmpty(editSelectedData)) {
                  dispatch(
                    merchantSubCategory.actions.updateMerchantSubCategory(
                      formData,
                      editSelectedData?.id
                    )
                  )
                } else {
                  dispatch(merchantSubCategory.actions.addMerchantSubCategory(formData))
                }
              }}
            >
              {({touched, handleChange, errors, setFieldValue, values}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = ['description', 'descriptionNp', 'name', 'nameNp']
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue('categoryId', editSelectedData?.category?.id, false)
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
                            placeholder='Please select'
                            label='Category Type'
                            name='categoryId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={categoryOptions}
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
                            placeholder='Enter Name'
                            label='Name (EN)'
                            name='name'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Name (NP)'
                            label='Name (NP)'
                            name='nameNp'
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
export default AddMerchantSubCategory
