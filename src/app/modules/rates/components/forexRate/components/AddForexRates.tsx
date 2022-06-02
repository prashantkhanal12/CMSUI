import {ErrorMessage, FieldArray, Form, Formik, useFormikContext} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import Modal from 'rsuite/Modal'
import {useEffect} from 'react'
import {cloneDeep, groupBy, isEmpty, mapValues} from 'lodash'
import {toast} from 'react-toastify'
//Manual import
import {StateParamsModel} from 'src/app/modules/common/Model'
import * as forexRateCategoryRedux from '../../../forexRateCategory/redux/index'
import * as forexRateAdd from '../index'
import FormValidateTextBox from 'src/cms/helpers/components/forms/FormValidateTextBox'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const AddForexRates = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const {loading, editSuccess} = useSelector((state: any) => state.forexRate)

  const forexCategory = useSelector((state: any) => state.forexRateCategory)


  useEffect(() => {
    dispatch(forexRateCategoryRedux?.actions.getForexRateCategory(params))
  }, [params])

  useEffect(() => {
    if (editSuccess) {
      dispatch(forexRateAdd?.actions.getForexRate(params))
      isEmpty(editSelectedData)
        ? toast.success('Forex Rate added successfully')
        : toast.success('Forex Rate edited successfully')
      handleClose()
      dispatch(forexRateAdd?.actions.updateForexRateReset())
    }
  }, [editSuccess])

  const AddEditForm = () => {
    // Grab values and submitForm from context
    const {resetForm, setFieldValue} = useFormikContext()
    useEffect(() => {
      if (!isEmpty(editSelectedData)) {
        const fields = ['forexRateCategories']
        fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
      } else {
        resetForm({
          values: {
            forexRateCategories: [
              {
                ...categoryData,
              },
            ],
          },
        })
      }
    }, [editSelectedData])
    return null
  }

  //To ignore the dot in name field
  const formatCategoryData = forexCategory?.data?.forexRateCategory?.map((obj: any) => ({
    ...obj,
    name: obj?.name?.replace(/[.,]/g, ''),
  }))

  const categoryData = mapValues(groupBy(formatCategoryData, 'name'), (obj2: any) =>
    obj2.map((item: any) => ({
      ...item,
      unit: '1',
      cash_buy: '',
      non_cash_buy: '',
      sell: '',
      feature_order: '',
    }))
  )

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
          <Modal.Title>{actionType} Forex Rates </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                forexRateCategories: [
                  {
                    ...categoryData,
                  },
                ],
              }}
              onSubmit={(values: any) => {
                let formData: any = []
                let forexRateData = cloneDeep(values?.forexRateCategories[0])
                Object.keys(forexRateData).map((key, index) => {
                  formData.push(forexRateData[key][0])
                })

                if (!isEmpty(editSelectedData)) {
                  dispatch(
                    forexRateAdd?.actions.updateForexRate(
                      {forexRateCategories: formData},
                      formData[0].forexRateId
                    )
                  )
                } else {
                  dispatch(forexRateAdd?.actions.CreateForexRate({forexRateCategories: formData}))
                }
              }}
            >
              {({
                isSubmitting,
                touched,
                handleChange,
                handleSubmit,
                errors,
                handleBlur,
                setFieldValue,
                values,
              }) => {
                return (
                  <Form>
                    <div>
                      <table className='table'>
                        <thead className='thead-dark'>
                          <tr>
                            <th scope='col'>Currency</th>
                            <th scope='col'>Unit</th>
                            <th scope='col'>Cash Buy</th>
                            <th scope='col'>Non Cash Buy</th>
                            <th scope='col'>Sell</th>
                            <th scope='col'>Feature Order</th>
                          </tr>
                        </thead>
                        <tbody>
                          <FieldArray
                            name='forexRateCategories'
                            render={(arrayHelpers) =>
                              values.forexRateCategories.map((item: any) =>
                                Object.keys(item).map((key, index) => {
                                  return (
                                    <tr key={index}>
                                      <td>{key}</td>
                                      <td>
                                        <div className='form-group'>
                                          <FormValidateTextBox
                                            type='text'
                                            containerClassName='col-md-12'
                                            mainClassName='col-md-12'
                                            min='0'
                                            className='form-control'
                                            placeholder=''
                                            name={`forexRateCategories[0][${key}][0].unit`}
                                            onChange={handleChange}
                                            errors={errors}
                                            touched={touched}
                                            value={values?.forexRateCategories[0][key][0]?.unit}
                                            required={true}
                                            testType='decimalNumber'
                                          />
                                        </div>
                                      </td>
                                      <td>
                                        <div className='form-group '>
                                          <FormValidateTextBox
                                            type='text'
                                            containerClassName='col-md-12'
                                            mainClassName='col-md-12'
                                            min='0'
                                            className='form-control'
                                            placeholder=''
                                            name={`forexRateCategories[0][${key}][0].cash_buy`}
                                            onChange={handleChange}
                                            errors={errors}
                                            touched={touched}
                                            value={values?.forexRateCategories[0][key][0]?.cash_buy}
                                            required={true}
                                            testType='decimalNumber'
                                          />
                                        </div>
                                      </td>

                                      <td>
                                        <div className='form-group '>
                                          <FormValidateTextBox
                                            type='text'
                                            containerClassName='col-md-12'
                                            mainClassName='col-md-12'
                                            min='0'
                                            className='form-control'
                                            placeholder=''
                                            name={`forexRateCategories[0][${key}][0].non_cash_buy`}
                                            onChange={handleChange}
                                            errors={errors}
                                            touched={touched}
                                            value={
                                              values?.forexRateCategories[0][key][0]?.non_cash_buy
                                            }
                                            required={true}
                                            testType='decimalNumber'
                                          />
                                        </div>
                                      </td>

                                      <td>
                                        <div className='form-group '>
                                          <FormValidateTextBox
                                            type='text'
                                            containerClassName='col-md-12'
                                            mainClassName='col-md-12'
                                            min='0'
                                            className='form-control'
                                            placeholder=''
                                            name={`forexRateCategories[0][${key}][0].sell`}
                                            onChange={handleChange}
                                            errors={errors}
                                            touched={touched}
                                            value={values?.forexRateCategories[0][key][0]?.sell}
                                            required={true}
                                            testType='decimalNumber'
                                          />
                                        </div>
                                      </td>
                                      <td>
                                        <div className='form-group '>
                                          <FormValidateTextBox
                                            type='text'
                                            containerClassName='col-md-12'
                                            mainClassName='col-md-12'
                                            min='0'
                                            className='form-control'
                                            placeholder=''
                                            name={`forexRateCategories[0][${key}][0].feature_order`}
                                            onChange={handleChange}
                                            errors={errors}
                                            touched={touched}
                                            value={
                                              values?.forexRateCategories[0][key][0]?.feature_order
                                            }
                                            required={true}
                                            testType='decimalNumber'
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                })
                              )
                            }
                          />
                        </tbody>
                      </table>
                    </div>
                    <AddEditForm />
                    <div className='d-flex justify-content-end px-5 '>
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

export default AddForexRates
