import {Formik, Form, useFormikContext, FieldArray} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import Modal from 'rsuite/Modal'
import {useEffect} from 'react'
import {groupBy, isEmpty, mapValues, cloneDeep} from 'lodash'
import {toast} from 'react-toastify'
//Manual import
import {StateParamsModel} from 'src/app/modules/common/Model'
import * as goldRateAdd from '../index'
import * as goldRateCategoryRedux from '../../../goldRateCategory/redux/index'
import FormValidateTextBox from 'src/cms/helpers/components/forms/FormValidateTextBox'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const AddGoldRates = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()

  const {loading, editSuccess} = useSelector((state: any) => state.goldRate)

  const goldCategory = useSelector((state: any) => state.goldRateCategory)

  useEffect(() => {
    dispatch(goldRateCategoryRedux?.actions.getGoldRateCategory(params))
  }, [params])

  useEffect(() => {
    if (editSuccess) {
      dispatch(goldRateAdd?.actions.getGoldRate(params))
      isEmpty(editSelectedData)
        ? toast.success('Gold Rate added successfully')
        : toast.success('Gold Rate edited successfully')
      handleClose()
      dispatch(goldRateAdd?.actions.updateGoldRateReset())
    }
  }, [editSuccess])

  const AddEditForm = () => {
    // Grab values and submitForm from context
    const {resetForm, setFieldValue} = useFormikContext()
    useEffect(() => {
      if (!isEmpty(editSelectedData)) {
        const fields = ['goldRateCategories']
        fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
      } else {
        resetForm({
          values: {
            goldRateCategories: [
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

  const categoryData = mapValues(groupBy(goldCategory?.data?.goldRateCategory, 'name'), (obj) =>
    obj.map((item) => ({
      ...item,
      unit_in_tola: '1',
      unit_in_gram: '10',
      rate_per_tola: '',
      rate_per_gram: '',
    }))
  )

  return (
    <div className='modal-container w-100'>
      <Modal
        open={open}
        onClose={handleClose}
        size='lg'
        backdrop='static'
        keyboard={false}
        enforceFocus={false}
      >
        <Modal.Header>
          <Modal.Title> {actionType} Gold Rates </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                goldRateCategories: [
                  {
                    ...categoryData,
                  },
                ],
              }}
              onSubmit={(values: any) => {
                let formData: any = []
                let goldRateData = cloneDeep(values?.goldRateCategories[0])
                Object.keys(goldRateData).map((key, index) => {
                  formData.push(goldRateData[key][0])
                })
                if (!isEmpty(editSelectedData)) {
                  dispatch(
                    goldRateAdd?.actions.updateGoldRate(
                      {goldRateCategories: formData},
                      formData[0].goldRateId
                    )
                  )
                } else {
                  dispatch(goldRateAdd?.actions.CreateGoldRate({goldRateCategories: formData}))
                }
              }}
            >
              {({handleChange, handleBlur, values, isSubmitting, errors, touched}: any) => {
                return (
                  <Form>
                    <div>
                      <table className='table '>
                        <thead className='thead-dark'>
                          <tr>
                            <th scope='col'>Type</th>
                            <th scope='col'>Unit in Tola</th>
                            <th scope='col'>Rate in Tola</th>
                            <th scope='col'>Unit in gram</th>
                            <th scope='col'>Rate in gram</th>
                          </tr>
                        </thead>
                        <tbody>
                          <FieldArray
                            name='goldRateCategories'
                            render={(arrayHelpers) =>
                              values.goldRateCategories.map((item: any) =>
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
                                            name={`goldRateCategories[0][${key}][0].unit_in_tola`}
                                            onChange={handleChange}
                                            errors={errors}
                                            touched={touched}
                                            value={
                                              values?.goldRateCategories[0][key][0]?.unit_in_tola
                                            }
                                            required={true}
                                            testType='decimalNumber'
                                          />
                                        </div>
                                      </td>
                                      <td>
                                        <div className='form-group'>
                                          <FormValidateTextBox
                                            type='text'
                                            containerClassName='col-md-12'
                                            mainClassName='col-md-12'
                                            min='0'
                                            className='form-control'
                                            placeholder=''
                                            name={`goldRateCategories[0][${key}][0].rate_per_tola`}
                                            onChange={handleChange}
                                            errors={errors}
                                            touched={touched}
                                            value={
                                              values?.goldRateCategories[0][key][0]?.rate_per_tola
                                            }
                                            required={true}
                                            testType='decimalNumber'
                                          />
                                        </div>
                                      </td>

                                      <td>
                                        <div className='form-group'>
                                          <FormValidateTextBox
                                            type='text'
                                            containerClassName='col-md-12'
                                            mainClassName='col-md-12'
                                            min='0'
                                            className='form-control'
                                            placeholder=''
                                            name={`goldRateCategories[0][${key}][0].unit_in_gram`}
                                            onChange={handleChange}
                                            errors={errors}
                                            touched={touched}
                                            value={
                                              values?.goldRateCategories[0][key][0]?.unit_in_gram
                                            }
                                            required={true}
                                            testType='decimalNumber'
                                          />
                                        </div>
                                      </td>

                                      <td>
                                        <div className='form-group'>
                                          <FormValidateTextBox
                                            type='text'
                                            containerClassName='col-md-12'
                                            mainClassName='col-md-12'
                                            min='0'
                                            className='form-control'
                                            placeholder=''
                                            name={`goldRateCategories[0][${key}][0].rate_per_gram`}
                                            onChange={handleChange}
                                            errors={errors}
                                            touched={touched}
                                            value={
                                              values?.goldRateCategories[0][key][0]?.rate_per_gram
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

export default AddGoldRates
