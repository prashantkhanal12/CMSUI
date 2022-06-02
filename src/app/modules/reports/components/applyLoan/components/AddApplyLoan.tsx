import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
import moment from 'moment'
import Modal from 'rsuite/Modal'
//Manual import
import {StateParamsModel} from 'src/app/modules/common/Model'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import * as place from 'src/app/modules/common'
import {PlaceModel} from 'src/app/modules/network/components/branchless/Model'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import * as productTagRedux from '../../../../products/components/productTag'
import * as applyLoanRedux from '../../applyLoan/redux'
import * as municipalityRedux from '../../municipality/components/redux'
import FormDatepicker from 'src/cms/helpers/components/forms/FormDatepicker'
import * as productManagerRedux from '../../../../products/components/productManager'
import {IMunicipalityState} from '../../municipality/components/redux'
import {MunicipalityModel} from '../../municipality/components/Model'

type Props = {
  open: boolean
  params?: StateParamsModel
  setParams?: any
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[a-zA-Z]+$/, 'Must not contain number or symbol'),
  email: Yup.string()
    .email('Provide Valid email')
    .required('Email is required')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Must be Valid email'),
  mobileNumber: Yup.string().matches(/^(98|97)([0-9]{8})$/, 'Invalid contact number'),
  dob: Yup.string().required('DOB is required'),
  loanTypeId: Yup.string().required('Loan Type Id is required '),
  loanAmount: Yup.string()
    .required('Loan Amount is required')
    .matches(/^[0-9][0-9]*$/, 'Must Be numeric'),
  wardno: Yup.string().matches(/^[0-9][0-9]*$/, 'Must be Numberic'),
})

const AddApplyLoan = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const {loading, success} = useSelector((state: any) => state.applyLoan)
  const [provinceId, setProvinceId] = useState('')
  const [tag, setTag] = useState('')
  const {district, province} = useSelector((state: any) => state.place)
  const municipalityData: IMunicipalityState = useSelector((state: any) => state.municipality)

  useEffect(() => {
    dispatch(municipalityRedux.actions.getMunicipality(params))
  }, [params])
  const {
    data: {productTag},
  } = useSelector((state: any) => state.productTag)

  const {
    allProductManager: {productManager},
  } = useSelector((state: any) => state.productManager)

  useEffect(() => {
    dispatch(productTagRedux.actions.getAllProductTag())
  }, [])

  useEffect(() => {
    const loanTag = productTag?.filter((item: any) => item.name === 'Loan')
    setTag(loanTag[0]?.id)
  }, [productTag])

  useEffect(() => {
    if (!isEmpty(tag)) {
      dispatch(productManagerRedux.actions.getProductManagerByTag(tag))
    }
  }, [tag])

  useEffect(() => {
    dispatch(place.action.getProvince())
  }, [])

  useEffect(() => {
    if (provinceId) {
      dispatch(place.action.getDistrict(provinceId))
    }
  }, [provinceId])

  const LoanOptions = productManager?.map((loan: any) => ({
    label: loan.title,
    value: loan.id,
  }))

  const districtOptions = district?.map((district: PlaceModel) => ({
    label: district.title,
    value: district.id,
  }))

  const municipalityOptions = district?.map((municipality: MunicipalityModel) => ({
    label: municipality.title,
    value: municipality.id,
  }))

  const provinceOptions = province?.map((province: PlaceModel) => ({
    label: province.title,
    value: province.id,
  }))

  useEffect(() => {
    if (success) {
      dispatch(applyLoanRedux?.actions.getApplyLoanFinish())
      isEmpty(editSelectedData)
        ? toast.success('Apply Loan added successfully')
        : toast.success('Apply Loan edited successfully')
      dispatch(applyLoanRedux?.actions.resetApplyLoan())
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
          <Modal.Title>{actionType} Apply Loan</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{overflow: 'visible'}}>
          <div>
            <Formik
              initialValues={{
                name: '',
                email: '',
                mobileNumber: '',
                dob: '',
                wardno: 0,
                loanAmount: '',
                municipality: '',
                provinceId: '',
                districtId: '',
                loanTypeId: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                const formData = {
                  ...values,
                  dob: moment(values?.dob).format('YYYY-MM-DD'),
                }

                if (!isEmpty(editSelectedData)) {
                  dispatch(applyLoanRedux.actions.updateApplyLoan(formData, editSelectedData?.id))
                } else {
                  dispatch(applyLoanRedux.actions.addApplyLoan(formData))
                }
              }}
            >
              {({touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'name',
                      'email',
                      'mobileNumber',
                      'dob',
                      'wardno',
                      'loanAmount',
                      'municipality',
                      'districtId',
                      'provinceId',
                      'loanTypeId',
                    ]
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue('provinceId', editSelectedData?.provinceId?.id, false)
                    setFieldValue('districtId', editSelectedData?.districtId?.id, false)
                    setFieldValue('loanTypeId', editSelectedData?.loanTypeId?.id, false)
                  }
                }, [])

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
                            placeholder='Email'
                            label='Email '
                            name='email'
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
                            placeholder='Phone Number'
                            label='Phone Number '
                            name='mobileNumber'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>

                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormDatepicker
                            labelClassName='col-12'
                            containerClassName='col-12 '
                            label=' Date of Birth'
                            name='dob'
                            placeholderText='Please select a date'
                            setFieldValue={setFieldValue}
                            value={values.dob || false}
                            touched={touched}
                            showIcon={true}
                            errors={{}}
                            required={true}
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            type='number'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Ward No'
                            label='Ward Number '
                            name='wardno'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Loan Amount'
                            label='Loan Amount '
                            name='loanAmount'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required={true}
                          />
                        </div>

                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormSelect
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Select Province name'
                            label='Province Id'
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
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormSelect
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Select District name'
                            label='District Id'
                            name='districtId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={districtOptions}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormSelect
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Select Municipality name'
                            label='Municipality'
                            name='municipality'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={municipalityOptions}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>

                        <div className='col-md-6 col-sm-6 col-xs-12'>
                          <FormSelect
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Select Loan Type '
                            label='Loan Type Id'
                            name='loanTypeId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={LoanOptions}
                            required={true}
                            values={values}
                            setFieldValue={setFieldValue}
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
export default AddApplyLoan
