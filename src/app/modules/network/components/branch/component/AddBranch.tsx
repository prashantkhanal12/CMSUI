import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {ErrorMessage, Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import * as Yup from 'yup'

import * as branch from '../index'
import * as place from 'src/app/modules/common'
import * as setting from 'src/app/modules/siteSettings/components/settings'
import {StateParamsModel} from 'src/app/modules/common/Model'

import Modal from 'rsuite/Modal'
import {OptionModel, PlaceModel} from '../Model'

import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import FormCheckbox from 'src/cms/helpers/components/forms/FormCheckbox'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'

import MapView from '../../../../common/components/Map/MapView'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
import FormDatepicker from 'src/cms/helpers/components/forms/FormDatepicker'
import moment from 'moment'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  branchExtendedId: Yup.string().required('Branch extended hour is required'),
  title: Yup.string()
    .required('Branch title is required')
    .matches(/^[A-Za-z\s]+$/, 'Must not contain number or symbol'),
  code: Yup.string()
    .required('Branch Code is required')
    .matches(/^[0-9][0-9]*$/, 'Must contain only numbers'),
  email: Yup.string()
    .email('Invalid Email. Eg: example@xyz.com')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Please provide valid email')
    .nullable(),
  telephone: Yup.string()
    .matches(/^[0-9][0-9]*$/, 'Must contain only numbers')
    .max(10, 'Mobile number exceeds 10 digits')
    .nullable(),
  fax: Yup.string()
    .matches(/^[0-9][0-9]*$/, 'Must contain only numbers')
    .max(10, 'Mobile number exceeds 10 digits')
    .nullable(),
  status: Yup.string().required('Status is required'),
})

const AddBranch = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const [provinceValue, setProvinceValue] = useState('')
  const [branchCategoryValue, setBranchCategoryValue] = useState('')
  const [valleyProvinceOptions, setValleyProvinceOptions] = useState([])
  const [valleyDistrictOptions, setValleyDistrictOptions] = useState([])
  const [location, setLocation] = useState({lat: '', lng: ''})
  const {category, branchExtendedHourStatus, loading, success} = useSelector(
    (state: any) => state.branch
  )
  const {district, province} = useSelector((state: any) => state.place)

  const persistSettings = JSON.parse(localStorage.getItem('persist:settings') as string)
  const backendData = JSON.parse(persistSettings.backendData)
  const branchData = backendData['Branch Settings'].find(
    (item: {[key: string]: string | []}) => item.name === 'branchExtendFrom'
  )

  useEffect(() => {
    if (!isEmpty(editSelectedData)) {
      setLocation({lat: editSelectedData?.latitude, lng: editSelectedData?.longitude})
    }
  }, [editSelectedData])

  useEffect(() => {
    dispatch(setting.actions.getSettingType())
    dispatch(branch.actions.getBranchCategory())
    dispatch(branch.actions.getExtendedHour())
    dispatch(place.action.getProvince())
  }, [])

  useEffect(() => {
    if (provinceValue) {
      dispatch(place.action.getDistrict(provinceValue))
    }
  }, [provinceValue])

  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]

  const categoryOptions = category?.map((items: OptionModel) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))

  const extendedHours = branchExtendedHourStatus?.map((items: OptionModel) => ({
    label: items.display_name,
    value: items.id,
  }))

  const districtOptions = district?.map((items: PlaceModel) => ({
    label: items.title,
    value: items.id,
  }))

  const provinceOptions = province?.map((items: PlaceModel) => ({
    label: items.title,
    value: items.id,
}))

  useEffect(() => {
    if (branchCategoryValue === 'e142aa7f-d275-43cf-87a7-503872a9274a') {
      const provinceOptions = province
        ?.filter((d: any) => d.title === 'Bagmati Pradesh')
        .map((items: PlaceModel) => ({
          label: items.title,
          value: items.id,
        }))
      setValleyProvinceOptions(provinceOptions)
    } else {
      const provinceOptions = province?.map((items: PlaceModel) => ({
        label: items.title,
        value: items.id,
      }))
      setValleyProvinceOptions(provinceOptions)
    }
  }, [branchCategoryValue])

  useEffect(() => {
    if (!isEmpty(branchCategoryValue) && !isEmpty(provinceValue)) {
      if (branchCategoryValue === 'e142aa7f-d275-43cf-87a7-503872a9274a') {
        const districtOptions = district
          ?.filter((d: any) => d.categoryId === 'e142aa7f-d275-43cf-87a7-503872a9274a')
          .map((items: PlaceModel) => ({
            label: items.title,
            value: items.id,
          }))
        setValleyDistrictOptions(districtOptions)
      } else {
        const districtOptions = district
          ?.filter((d: any) => d.categoryId !== 'e142aa7f-d275-43cf-87a7-503872a9274a')
          .map((items: PlaceModel) => ({
            label: items.title,
            value: items.id,
          }))
        setValleyDistrictOptions(districtOptions)
      }
    }
  }, [branchCategoryValue, provinceValue, district])

  useEffect(() => {
    if (success) {
      dispatch(branch?.actions.getBranchData(params))
      isEmpty(editSelectedData)
        ? toast.success('Branch added successfully')
        : toast.success('Branch edited successfully')
      dispatch(branch?.actions?.resetBranch())
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
          <Modal.Title>{actionType} Branch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                branchCategoryId: '',
                code: '',
                title: '',
                provinceId: '',
                status: '',
                branchExtendedId: '',
                latitude: '',
                longitude: '',
                upcomingBranchStatus: false,
                cashCounterStatus: false,
                openingTime: null,
                closingTime: null,
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, {setSubmitting}) => {
                const formData = {
                  ...values,
                  longitude: values?.longitude ? values?.longitude.toString() : '',
                  latitude: values?.latitude ? values?.latitude.toString() : '',
                  status: values?.status === 'Active' ? true : false,
                  openingTime: values?.openingTime
                    ? moment(values?.openingTime).format('HH:mm')
                    : null,
                  closingTime: values?.closingTime
                    ? moment(values?.closingTime).format('HH:mm')
                    : null,
                }
                if (!isEmpty(editSelectedData)) {
                  dispatch(branch.actions.updateBranch(formData, editSelectedData?.id))
                } else {
                  dispatch(branch.actions.addBranch(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'address',
                      'address_np',
                      'closingTime',
                      'code',
                      'description',
                      'description_np',
                      'email',
                      'fax',
                      'id',
                      'openingTime',
                      'telephone',
                      'title',
                      'title_np',
                      'latitude',
                      'longitude',
                    ]
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue('branchCategoryId', editSelectedData?.branch_category?.id, false)
                    setFieldValue('provinceId', editSelectedData?.province?.id, false)
                    setFieldValue('districtId', editSelectedData?.district?.id, false)
                    setFieldValue('branchExtendedId', editSelectedData?.extended_hour?.id, false)
                    setFieldValue('upcomingBranchStatus', editSelectedData?.upcoming_branch, false)
                    setFieldValue('cashCounterStatus', editSelectedData?.cash_counter, false)

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
                            label='Category'
                            name='branchCategoryId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={categoryOptions}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Branch Code ID'
                            label='Branch Code ID'
                            name='code'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required
                          />
                        </div>
                        {!isEmpty(values?.branchCategoryId)
                          ? setBranchCategoryValue(values?.branchCategoryId)
                          : ''}
                      </div>
                      <div className='row'>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Branch Title (EN)'
                            label='Branch Title (EN)'
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
                            placeholder='Branch Title (NP)'
                            label='Branch Title (NP)'
                            name='title_np'
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
                            options={
                              !isEmpty(branchCategoryValue)
                                ? valleyProvinceOptions
                                : provinceOptions
                            }
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        {!isEmpty(values?.provinceId) ? setProvinceValue(values?.provinceId) : ''}
                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select district'
                            label='District'
                            name='districtId'
                            disabled={
                              !isEmpty(editSelectedData) || values?.provinceId ? false : true
                            }
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={
                              !isEmpty(branchCategoryValue) && !isEmpty(valleyProvinceOptions)
                                ? valleyDistrictOptions
                                : districtOptions
                            }
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Branch Address'
                            label='Branch Address (EN)'
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
                            placeholder='Enter Branch Address (NP)'
                            label='Branch Address (NP)'
                            name='address_np'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>

                        <MapView
                          latName='latitude'
                          lngName='longitude'
                          location={{
                            lat: values.latitude,
                            lng: values.longitude,
                          }}
                          setFieldValue={setFieldValue}
                        />

                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Longitude'
                            label='Longitude'
                            name='longitude'
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
                            placeholder='Enter Latitude'
                            label='Latitude'
                            name='latitude'
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
                            placeholder='Enter Telephone'
                            label='Telephone'
                            name='telephone'
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
                            placeholder='Enter Fax Number'
                            label='Fax'
                            name='fax'
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
                            placeholder='Enter E-mail'
                            label='E-mail'
                            name='email'
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
                            label='Extended Hours'
                            name='branchExtendedId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={extendedHours}
                            values={values}
                            setFieldValue={setFieldValue}
                            required
                          />
                        </div>

                        {values?.branchExtendedId === 'bca33c16-f4b3-4bad-8962-086551be8fd2' ? (
                          <>
                            {branchData.value === 'true' ? (
                              <>
                                <div className='col-md-6 col-xs-12'>
                                  <FormTinyMce
                                    containerClassName='col-md-12'
                                    label='Branch Description (EN)'
                                    name='description'
                                    initialValue={
                                      !isEmpty(editSelectedData)
                                        ? editSelectedData?.description
                                        : ''
                                    }
                                    handleChange={handleChange}
                                  />
                                </div>
                                <div className='col-md-6 col-xs-12'>
                                  <FormTinyMce
                                    containerClassName='col-md-12'
                                    label='Branch Description (NP)'
                                    name='description_np'
                                    initialValue={
                                      !isEmpty(editSelectedData)
                                        ? editSelectedData?.description_np
                                        : ''
                                    }
                                    handleChange={handleChange}
                                  />
                                </div>
                              </>
                            ) : null}
                            <div className='col-md-3 col-xs-12'>
                              <FormDatepicker
                                labelClassName='col-12'
                                containerClassName='col-12 '
                                dateFormat='hh:mm aa'
                                showTimeSelect={true}
                                showTimeSelectOnly={true}
                                name='openingTime'
                                label='Opening Time'
                                placeholderText='--:-- --'
                                setFieldValue={setFieldValue}
                                value={values.openingTime || false}
                                errors={errors}
                                touched={touched}
                                showIcon={true}
                              />
                            </div>
                            <div className='col-md-3 col-xs-12'>
                              <FormDatepicker
                                labelClassName='col-12'
                                containerClassName='col-12 '
                                dateFormat='hh:mm aa'
                                showTimeSelect={true}
                                showTimeSelectOnly={true}
                                name='closingTime'
                                label='Closing Time'
                                placeholderText='--:-- --'
                                setFieldValue={setFieldValue}
                                value={values.closingTime || false}
                                errors={errors}
                                touched={touched}
                                showIcon={true}
                              />
                            </div>
                          </>
                        ) : null}

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
                        <div className='col-md-6 col-sm-12 col-xs-12'>
                          <div className='row pt-5'>
                            <FormCheckbox
                              labelClassName='col-md-12'
                              containerClassName='col-md-12'
                              name='upcomingBranchStatus'
                              touched={touched}
                              errors={errors}
                              onChange={handleChange}
                              checkBoxText='Upcoming Branch'
                            />

                            <FormCheckbox
                              labelClassName='col-md-12'
                              containerClassName='col-md-12'
                              name='cashCounterStatus'
                              touched={touched}
                              errors={errors}
                              onChange={handleChange}
                              checkBoxText='Cash Counter Status'
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
export default AddBranch
