import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {ErrorMessage, Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import Modal from 'rsuite/Modal'
//Manual import
import {ProductCategoryModel} from '../../productCategory/Model/ProductCategoryModel'
import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import * as productTagRedux from '../index'
import * as productCategoryRedux from '../../productCategory'
import {StateParamsModel} from 'src/app/modules/common/Model'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  productCategoryId: Yup.string().required('Product category is required'),
  status: Yup.string().required('Status is required'),
})

const AddProductTag = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const {loading, success} = useSelector((state: any) => state.productTag)
  const {
    data: {productCategory},
  } = useSelector((state: any) => state.productCategory)

  useEffect(() => {
    dispatch(productCategoryRedux.actions.getAllProductCategory())
  }, [])

  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]
  const productCategoryOptions = productCategory?.map((items: ProductCategoryModel) => ({
    label: items.name,
    value: items.id,
  }))

  useEffect(() => {
    if (success) {
      dispatch(productTagRedux?.actions.getProductTag(params))
      isEmpty(editSelectedData)
        ? toast.success('Product tags added successfully')
        : toast.success('Product tags edited successfully')
      dispatch(productTagRedux?.actions?.resetProductTag())
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
          <Modal.Title>{actionType} Product Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{overflow: 'visible'}}>
          <div>
            <Formik
              initialValues={{
                name: '',
                status: '',
                productCategoryId: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                const formData = {
                  ...values,
                  status: values?.status === 'Active' ? true : false,
                }

                if (!isEmpty(editSelectedData)) {
                  dispatch(productTagRedux.actions.updateProductTag(formData, editSelectedData?.id))
                } else {
                  dispatch(productTagRedux.actions.addProductTag(formData))
                }
              }}
            >
              {({touched, handleChange, errors, setFieldValue, values}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = ['id', 'name', 'nameNp', 'productCategoryId']
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
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select'
                            label='Product Category'
                            name='productCategoryId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={productCategoryOptions}
                            values={values}
                            setFieldValue={setFieldValue}
                            required
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
export default AddProductTag
