import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {ErrorMessage, Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import * as Yup from 'yup'

import * as atm from '../index'
import * as place from 'src/app/modules/common'
import * as branch from 'src/app/modules/network/components/branch'
import {StateParamsModel} from 'src/app/modules/common/Model'

import Modal from 'rsuite/Modal'
import {OptionModel, PlaceModel} from '../Model'

import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'

import MapView from '../../../../common/components/Map/MapView'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'

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
  contact: Yup.string()
    .matches(/^[0-9][0-9]*$/, 'Should be only number')
    .max(10, 'Mobile number exceeds 10 digits')
    .nullable(),
  status: Yup.string().required('Status is required'),
})

const AddAtm = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const [provinceValue, setProvinceValue] = useState('')
  const [branchCategoryValue, setBranchCategoryValue] = useState('')
  const [valleyProvinceOptions, setValleyProvinceOptions] = useState([])
  const [valleyDistrictOptions, setValleyDistrictOptions] = useState([])
  const [location, setLocation] = useState({lat: '', lng: ''})
  const {loading, success} = useSelector((state: any) => state.atm)
  const {district, province} = useSelector((state: any) => state.place)
  const {category} = useSelector((state: any) => state.branch)

  useEffect(() => {
    if (!isEmpty(editSelectedData)) {
      setLocation({lat: editSelectedData?.latitude, lng: editSelectedData?.longitude})
    }
  }, [editSelectedData])

  useEffect(() => {
    dispatch(branch.actions.getBranchCategory())
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
  }))

  const provinceOptions = province?.map((items: PlaceModel) => ({
    label: items.title,
    value: items.id,
  }))

  const districtOptions = district?.map((items: PlaceModel) => ({
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
      dispatch(atm?.actions.getAtmData(params))
      isEmpty(editSelectedData)
        ? toast.success('ATM added successfully')
        : toast.success('ATM edited successfully')
      dispatch(atm?.actions?.resetAtm())
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
          <Modal.Title>{actionType} ATM </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                province: '',
                name: '',
                status: '',
                categoryId: '',
                latitude: '',
                longitude: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, {setSubmitting}) => {
                const formData = {
                  ...values,
                  longitude: values?.longitude ? values?.longitude.toString() : '',
                  latitude: values?.latitude ? values?.latitude.toString() : '',
                  status: values?.status === 'Active' ? true : false,
                }
                if (!isEmpty(editSelectedData)) {
                  dispatch(atm.actions.updateAtm(formData, editSelectedData?.id))
                } else {
                  dispatch(atm.actions.addAtm(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'address',
                      'addressNp',
                      'description',
                      'descriptionNp',
                      'longitude',
                      'latitude',
                      'id',
                      'contact',
                      'name',
                      'nameNp',
                    ]
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue('categoryId', editSelectedData?.category?.id, false)
                    setFieldValue('province', editSelectedData?.province?.id, false)
                    setFieldValue('district', editSelectedData?.district?.id, false)
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
                            name='categoryId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={categoryOptions}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        {!isEmpty(values?.categoryId)
                          ? setBranchCategoryValue(values?.categoryId)
                          : ''}
                      </div>
                      <div className='row'>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='ATM Title (EN)'
                            label='ATM Title (EN)'
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
                            placeholder='ATM Title (NP)'
                            label='ATM Title (NP)'
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
                            placeholder='Please select province'
                            label='Province'
                            name='province'
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
                        {!isEmpty(values?.province) ? setProvinceValue(values?.province) : ''}

                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select district'
                            label='District'
                            name='district'
                            onChange={handleChange}
                            disabled={!isEmpty(editSelectedData) || values?.province ? false : true}
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
                            placeholder='Enter ATM Address'
                            label='ATM Address'
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
                            placeholder='Enter ATM Address (NP)'
                            label='ATM Address (NP)'
                            name='addressNp'
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
                            name='contact'
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
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='ATM Description (EN)'
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
                            label='ATM Description (NP)'
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
export default AddAtm
