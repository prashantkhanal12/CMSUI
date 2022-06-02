import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {ErrorMessage, FieldArray, Form, Formik, yupToFormErrors} from 'formik'
import {toast} from 'react-toastify'
import * as Yup from 'yup'

import * as merchantRedux from '../index'
import * as place from 'src/app/modules/common'
import * as merchantSubCategoryRedux from '../../merchantSubCategory'
import * as categoryTypeRedux from 'src/app/modules/common'
import * as categoriesRedux from 'src/app/modules/cms'
import {StateParamsModel} from 'src/app/modules/common/Model'

import Modal from 'rsuite/Modal'

import FormRadio from 'src/cms/helpers/components/forms/FormRadio'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormInputMediaManager from 'src/cms/helpers/components/forms/FormInputMediaManager'
import {imageBaseUrl} from 'src/cms/helpers/constants'
import {PlaceModel} from 'src/app/modules/network/components/branch/Model'
import MapView from 'src/app/modules/common/components/Map/MapView'

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
  nameNp: Yup.string().required('Name nepali is required'),
  email: Yup.string()
    .email('Invalid Email. Eg: example@xyz.com')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Please provide valid email')
    .nullable(),
  status: Yup.string().required('Status is required'),
  merchantSubCategoryId: Yup.string().required('Merchant sub category is required'),
  merchantCategoryId: Yup.string().required('Merchant category is required'),
  phoneNumbers: Yup.array().of(
    Yup.object().shape({
      phonenumber: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9][0-9]*$/, 'Enter valid mobile number')
        .max(10, 'Phone number should not exceed 10 digits'),
    })
  ),
  mobileNumbers: Yup.array().of(
    Yup.object().shape({
      mobilenumber: Yup.string()
        .required('Mobile number is required')
        .matches(/^[0-9][0-9]*$/, 'Enter numbers only')
        .max(10, 'Mobile number should not exceed 10 digits'),
    })
  ),
})

const AddMerchantManager = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const {loading, success} = useSelector((state: any) => state.merchantManager)
  const [merchantCategory, setMerchantCategory] = useState('')
  const [merchantValue, setMerchantValue] = useState('')
  const [thumbImageUrl, setThumbImageUrl] = useState('')
  const [provinceValue, setProvinceValue] = useState('')

  const {district, province} = useSelector((state: any) => state.place)

  useEffect(() => {
    dispatch(place.action.getProvince())
  }, [])

  useEffect(() => {
    if (provinceValue) {
      dispatch(place.action.getDistrict(provinceValue))
    }
  }, [provinceValue])

  const districtOptions = district?.map((items: PlaceModel) => ({
    label: items.title,
    value: items.id,
  }))

  const provinceOptions = province?.map((items: PlaceModel) => ({
    label: items.title,
    value: items.id,
  }))

  const {
    data: {categoryType},
  } = useSelector((state: any) => state.categoryType)

  const {
    data: {category},
  } = useSelector((state: any) => state.categories)

  const {
    data: {merchantSubCategory},
  } = useSelector((state: any) => state.merchantSubCategory)

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

  useEffect(() => {
    if (merchantValue) {
      dispatch(merchantSubCategoryRedux.actions.getAllMerchantSubCategory(merchantValue))
    }
  }, [merchantValue])

  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]

  const merchantCategoryOptions = category?.map((items: any) => ({
    label: items.name,
    value: items.id,
  }))

  const merchantSubCategoryOptions = merchantSubCategory?.map((items: any) => ({
    label: items.name,
    value: items.id,
  }))
  useEffect(() => {
    if (success) {
      dispatch(merchantRedux?.actions.getMerchantManager(params))
      isEmpty(editSelectedData)
        ? toast.success('Merchant added successfully')
        : toast.success('Merchant edited successfully')
      dispatch(merchantRedux?.actions?.resetMerchantManager())
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
          <Modal.Title>{actionType} Merchant Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                PAN: '',
                name: '',
                nameNp: '',
                slug: '',
                status: '',
                merchantCategoryId: '',
                merchantSubCategoryId: '',
                email: '',
                thumbImage: '',
                websiteLink: '',
                description: '',
                descriptionNp: '',
                mobileNumbers: [{mobilenumber: ''}],
                phoneNumbers: [{phonenumber: ''}],
                merchantAdresses: [
                  {
                    provinceId: '',
                    districtId: '',
                    address: '',
                    addressNp: '',
                    googlePlusCode: '',
                    latitude: '',
                    longitude: '',
                  },
                ],
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                const formData = {
                  ...values,
                  merchantAdresses: values?.merchantAdresses?.map(
                    (item: {[key: string]: string}) => ({
                      ...item,
                      id: !isEmpty(editSelectedData) ? item.id : null,
                      longitude: item?.longitude ? item?.longitude.toString() : '',
                      latitude: item?.latitude ? item?.latitude.toString() : '',
                    })
                  ),
                  mobileNumbers: values?.mobileNumbers?.map((item: {[key: string]: string}) => ({
                    ...item,
                    id: !isEmpty(editSelectedData) ? item.id : null,
                  })),
                  phoneNumbers: values?.phoneNumbers?.map((item: {[key: string]: string}) => ({
                    ...item,
                    id: !isEmpty(editSelectedData) ? item.id : null,
                  })),
                  slug: !isEmpty(editSelectedData)
                    ? editSelectedData?.slug
                    : values?.name.replace(/\s/g, '-').toLowerCase(),
                  status: values?.status === 'Active' ? true : false,
                }

                if (!isEmpty(editSelectedData)) {
                  dispatch(
                    merchantRedux.actions.updateMerchantManager(formData, editSelectedData?.id)
                  )
                } else {
                  dispatch(merchantRedux.actions.addMerchantManager(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'description',
                      'descriptionNp',
                      'id',
                      'name',
                      'nameNp',
                      'slug',
                      'merchantCategoryId',
                      'merchantSubCategoryId',
                      'email',
                      'thumbImage',
                      'websiteLink',
                      'PAN',
                      'mobileNumbers',
                      'phoneNumbers',
                      'merchantAdresses',
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
                            placeholder='Please select'
                            label='Merchant Category'
                            name='merchantCategoryId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={merchantCategoryOptions}
                            required
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        {!isEmpty(values?.merchantCategoryId)
                          ? setMerchantValue(values?.merchantCategoryId)
                          : null}
                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select'
                            label='Merchant Sub Category'
                            name='merchantSubCategoryId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={merchantSubCategoryOptions}
                            required
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>

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
                            required
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
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
                          <FormTextBox
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            type='email'
                            placeholder='Email'
                            name='email'
                            label='Email'
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
                            placeholder='Enter PAN'
                            label='PAN'
                            name='PAN'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <FieldArray
                          name='merchantAdresses'
                          render={(arrayHelpers) => (
                            <div>
                              {values.merchantAdresses && values.merchantAdresses.length > 0
                                ? values.merchantAdresses.map((friend: any, index: any) => (
                                    <div className='row' key={index}>
                                      <div className='col-md-6 col-xs-12'>
                                        <FormSelect
                                          labelClassName='col-md-12'
                                          containerClassName='col-md-12'
                                          placeholder='Please select province'
                                          label='Province'
                                          name={`merchantAdresses.${index}.provinceId`}
                                          onChange={handleChange}
                                          errors={errors}
                                          touched={touched}
                                          options={provinceOptions}
                                          values={values}
                                          setFieldValue={setFieldValue}
                                          arrValue={values.merchantAdresses[index].provinceId}
                                        />
                                      </div>
                                      {!isEmpty(values?.merchantAdresses[index].provinceId)
                                        ? setProvinceValue(
                                            values?.merchantAdresses[index].provinceId
                                          )
                                        : ''}
                                      <div className='col-md-6 col-xs-12'>
                                        <FormSelect
                                          labelClassName='col-md-12'
                                          containerClassName='col-md-12'
                                          placeholder='Please select district'
                                          label='District'
                                          name={`merchantAdresses.${index}.districtId`}
                                          disabled={
                                            values?.merchantAdresses[index].provinceId
                                              ? false
                                              : true
                                          }
                                          onChange={handleChange}
                                          errors={errors}
                                          touched={touched}
                                          options={districtOptions}
                                          values={values}
                                          setFieldValue={setFieldValue}
                                          arrValue={values?.merchantAdresses[index].districtId}
                                        />
                                      </div>

                                      <div className='col-md-6 col-xs-12'>
                                        <FormTextBox
                                          type='text'
                                          labelClassName='col-md-12'
                                          containerClassName='col-md-12'
                                          placeholder='Enter Address'
                                          label='Address (EN)'
                                          name={`merchantAdresses.${index}.address`}
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
                                          name={`merchantAdresses.${index}.addressNp`}
                                          onChange={handleChange}
                                          errors={errors}
                                          touched={touched}
                                        />
                                      </div>

                                      <MapView
                                        lngName={`merchantAdresses.${index}.longitude`}
                                        latName={`merchantAdresses.${index}.latitude`}
                                        setFieldValue={setFieldValue}
                                        location={{
                                          lat: values.merchantAdresses[index].latitude,
                                          lng: values.merchantAdresses[index].longitude,
                                        }}
                                      />

                                      <div className='col-md-6 col-xs-12'>
                                        <FormTextBox
                                          type='text'
                                          labelClassName='col-md-12'
                                          containerClassName='col-md-12'
                                          placeholder='Enter Longitude'
                                          label='Longitude'
                                          name={`merchantAdresses.${index}.longitude`}
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
                                          name={`merchantAdresses.${index}.latitude`}
                                          onChange={handleChange}
                                          errors={errors}
                                          touched={touched}
                                        />
                                      </div>

                                      {index > 0 && (
                                        <div className='col-md-12  justify-content-md-end text-end mb-2'>
                                          <button
                                            type='button'
                                            className='p-2 ps-5 pe-5 btn btn-secondary'
                                            onClick={() => arrayHelpers.remove(index)}
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  ))
                                : null}
                              <div className=' d-flex justify-content-md-end mb-2 border-top border-light'>
                                <button
                                  className='p-2 ps-5 pe-5 btn btn-primary'
                                  type='button'
                                  onClick={() =>
                                    arrayHelpers.push({
                                      provinceId: '',
                                      districtId: '',
                                      address: '',
                                      addressNp: '',
                                      googlePlusCode: '',
                                      latitude: '',
                                      longitude: '',
                                    })
                                  }
                                >
                                  + Add More
                                </button>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                      <div className='row'>
                        <div className='col-md-6 col-xs-12'>
                          <FieldArray
                            name='mobileNumbers'
                            render={(arrayHelpers) => (
                              <div>
                                {values.mobileNumbers && values.mobileNumbers.length > 0
                                  ? values.mobileNumbers.map((friend: any, index: any) => (
                                      <div key={index}>
                                        {/** both these conventions do the same */}
                                        <FormTextBox
                                          type='text'
                                          labelClassName='col-md-12'
                                          containerClassName='col-md-12'
                                          placeholder='Enter Mobile Number'
                                          label='Mobile Number'
                                          name={`mobileNumbers.${index}.mobilenumber`}
                                          onChange={handleChange}
                                          errors={errors}
                                          touched={touched}
                                          required
                                        />
                                        <div className='d-flex justify-content-end mb-3'>
                                          <em>
                                            <small className='d-block'>
                                              <span className='text-danger'>Note: </span> Mobile
                                              number should starts with 98|97
                                            </small>
                                          </em>
                                        </div>

                                        {index > 0 && (
                                          <div className='col-md-12  justify-content-md-end text-end mb-2'>
                                            <button
                                              type='button'
                                              className='p-2 ps-5 pe-5 btn btn-secondary'
                                              onClick={() => arrayHelpers.remove(index)}
                                            >
                                              Remove
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    ))
                                  : null}
                                <div className=' d-flex justify-content-md-end mb-2 border-top border-light'>
                                  <button
                                    className='p-2 ps-5 pe-5 btn btn-primary'
                                    type='button'
                                    onClick={() => arrayHelpers.push({mobilenumber: ''})}
                                  >
                                    + Add More
                                  </button>
                                </div>
                              </div>
                            )}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FieldArray
                            name='phoneNumbers'
                            render={(arrayHelpers) => (
                              <div>
                                {values.phoneNumbers && values.phoneNumbers.length > 0
                                  ? values.phoneNumbers.map((friend: any, index: any) => (
                                      <div key={index}>
                                        {/** both these conventions do the same */}
                                        <FormTextBox
                                          type='text'
                                          labelClassName='col-md-12'
                                          containerClassName='col-md-12'
                                          placeholder='Enter Phone Number'
                                          label='Phone Number'
                                          name={`phoneNumbers.${index}.phonenumber`}
                                          onChange={handleChange}
                                          errors={errors}
                                          touched={touched}
                                          required
                                        />

                                        {index > 0 && (
                                          <div className='col-md-12  justify-content-md-end text-end mb-2'>
                                            <button
                                              type='button'
                                              className='p-2 ps-5 pe-5 btn btn-secondary'
                                              onClick={() => arrayHelpers.remove(index)}
                                            >
                                              Remove
                                            </button>
                                          </div>
                                        )}
                                      </div>
                                    ))
                                  : null}
                                <div className=' d-flex justify-content-md-end mb-2 border-top border-light'>
                                  <button
                                    className='p-2 ps-5 pe-5 btn btn-primary'
                                    type='button'
                                    onClick={() => arrayHelpers.push({phonenumber: ''})}
                                  >
                                    + Add More
                                  </button>
                                </div>
                              </div>
                            )}
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
                          <FormInputMediaManager
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            label='Thumbnail Image'
                            name='thumbImage'
                            setFieldValue={setFieldValue}
                            setImageUrl={setThumbImageUrl}
                            value={values?.thumbImage}
                          />

                          {!isEmpty(values?.thumbImage) ? (
                            <>
                              <li className='listing'>
                                <div className='thumbImageBlock'>
                                  <button
                                    type='button'
                                    title='Remove'
                                    className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                                    onClick={() => {
                                      setThumbImageUrl('')
                                      setFieldValue('thumbImage', '')
                                    }}
                                  >
                                    Delete
                                  </button>

                                  <img
                                    className='thumbImage w-100 h-100'
                                    src={`${imageBaseUrl}/${values?.thumbImage}`}
                                    alt=''
                                  />
                                </div>
                              </li>
                            </>
                          ) : null}
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Website Link'
                            label='Website Link'
                            name='websiteLink'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
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
export default AddMerchantManager
