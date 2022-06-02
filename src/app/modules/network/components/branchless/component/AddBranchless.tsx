import {ChangeEvent, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as Yup from 'yup'
import {ErrorMessage, Form, Formik} from 'formik'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import {toast} from 'react-toastify'
import Modal from 'rsuite/Modal'
import {isEmpty} from 'lodash'
import {StateParamsModel} from 'src/app/modules/common/Model'
import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import * as place from 'src/app/modules/common'
import {PlaceModel} from '../Model'
import * as branchless from '../index'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
  handleChange?: (e: ChangeEvent<any>) => void
}

const FORM_VALIDATION = Yup.object().shape({
  title: Yup.string()
    .required('Title is required')
    .matches(/^[A-Za-z\s]+$/, 'Must not contain number or symbol'),
  contact_person: Yup.string().required('Contact person is required'),
  contact_number: Yup.string()
    .matches(/^(98|97)([0-9]{8})$/, 'Enter valid phone number')
    .max(10, 'Contact number exceeds 10 digits')
    .nullable(),
  status: Yup.string().required('Status is required'),
})

const AddBranchlessBank = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]
  const {loading, success} = useSelector((state: any) => state.branchless)
  const [provinceId, setProvinceId] = useState('')
  const {district, province} = useSelector((state: any) => state.place)

  useEffect(() => {
    dispatch(place.action.getProvince())
  }, [])

  useEffect(() => {
    if (provinceId) {
      dispatch(place.action.getDistrict(provinceId))
    }
  }, [provinceId])

  const districtOptions = district?.map((items: PlaceModel) => ({
    label: items.title,
    value: items.id,
  }))

  const provinceOptions = province?.map((items: PlaceModel) => ({
    label: items.title,
    value: items.id,
  }))

  useEffect(() => {
    if (success) {
      dispatch(branchless?.actions.getBranchlessBanking())
      isEmpty(editSelectedData)
        ? toast.success('Branchless Banking added successfully')
        : toast.success('Branchless Banking edited successfully')
      dispatch(branchless?.actions?.addBranchlessBankingReset())
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
          <Modal.Title>{actionType} Branchless Banking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                title: '',
                title_np: '',
                address: '',
                address_np: '',
                districtId: '',
                provinceId: '',
                contact_person: '',
                contact_person_np: '',
                contact_number: '',
                status: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, {setSubmitting}) => {
                const formData = {
                  ...values,
                  status: values?.status === 'Active' ? true : false,
                }

                if (!isEmpty(editSelectedData)) {
                  dispatch(
                    branchless.actions.updateBranchlessBanking(formData, editSelectedData?.id)
                  )
                } else {
                  dispatch(branchless.actions.addBranchlessBanking(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'title',
                      'title_np',
                      'address',
                      'address_np',
                      'contact_person',
                      'contact_person_np',
                      'contact_number',
                      'status',
                    ]
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue('provinceId', editSelectedData?.provinceId?.id, false)
                    setFieldValue('districtId', editSelectedData?.districtId?.id, false)
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
                            placeholder='Title (EN)'
                            label='Title (EN)'
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
                            placeholder='Title (NP)'
                            label='Title (NP)'
                            name='title_np'
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
                            placeholder='Enter Address (EN)'
                            label='Address (EN)'
                            name='address'
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
                            placeholder='Enter Address (NP)'
                            label='Address (NP)'
                            name='address_np'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select province'
                            label='Province'
                            name='provinceId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={provinceOptions}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        {!isEmpty(values?.provinceId) ? setProvinceId(values?.provinceId) : ''}
                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select district'
                            label='District'
                            name='districtId'
                            onChange={handleChange}
                            disabled={values?.provinceId ? false : true}
                            errors={errors}
                            touched={touched}
                            options={districtOptions}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Contact Person (EN)'
                            label='Contact Person (EN)'
                            name='contact_person'
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
                            placeholder='Enter Contact Person (NP)'
                            label='Contact Person (NP)'
                            name='contact_person_np'
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
                            placeholder='Enter Contact no'
                            label='Contact Number'
                            name='contact_number'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                          <div className='d-flex justify-content-end'>
                            <em>
                              <small className='d-block'>
                                <span className='text-danger'>Note: </span> Mobile number should
                                starts with 98|97
                              </small>
                            </em>
                          </div>
                        </div>

                        <div className='col-lg-12'>
                          <div className='row mb-6'>
                            <div className='col-lg-6'>
                              <div className='d-flex'>
                                <label className='form-label fw-bolder text-dark fs-6 required'>
                                  Status
                                </label>

                                <div className='d-flex ms-5'>
                                  {statusOptions?.map((status: {label: string; value: string}) => (
                                    <FormRadio
                                      containerClassName=''
                                      label='Select Status'
                                      name='status'
                                      onChange={handleChange}
                                      errors={errors}
                                      touched={touched}
                                      required={true}
                                      checkBoxText={status?.label}
                                      value={status?.value}
                                    />
                                  ))}
                                </div>
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
export default AddBranchlessBank
