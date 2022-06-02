import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {ErrorMessage, FieldArray, Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import * as Yup from 'yup'

import * as merchantRedux from '../../merchantManager'
import * as offerRedux from '../index'
import * as place from 'src/app/modules/common'
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
  title: Yup.string().required('Offer title is required'),
  titleNp: Yup.string().required('Offer title in nepali is required'),
  status: Yup.string().required('Status is required'),
  shortDescription: Yup.string().max(250, 'Short Description exceeds 250 words').nullable(),
  shortDescriptionNp: Yup.string()
    .max(250, 'Short Description Nepali exceeds 250 words')
    .nullable(),
  categoryId: Yup.string().required('Category is required'),
  merchantId: Yup.string().required('Merchant is required'),
  offerAdresses: Yup.array().of(
    Yup.object().shape({
      provinceId: Yup.string().required('Province is required'),
      districtId: Yup.string().required('District is required'),
      address: Yup.string().required('Address is required'),
      addressNp: Yup.string().required('Address nepali is required'),
      latitude: Yup.string().required('Latitude is required'),
      longitude: Yup.string().required('Longitude is required'),
    })
  ),
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
        .matches(/^(98|97)([0-9]{8})$/, 'Enter valid mobile number')
        .max(10, 'Mobile number should not exceed 10 digits'),
    })
  ),
  publishedDate: Yup.string().required('Published date is required').nullable(),
  initiationDate: Yup.string().required('Initiation date is required').nullable(),
  tillDate: Yup.string().required('Till date is required').nullable(),
})

const AddOffer = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const {discountType, loading, success} = useSelector((state: any) => state.offers)
  const [offersCategory, setOffersCategory] = useState('')
  const [offersValue, setOffersValue] = useState('')
  const [thumbImageUrl, setThumbImageUrl] = useState('')
  const [provinceValue, setProvinceValue] = useState('')
  const [location, setLocation] = useState({lat: '', lng: ''})

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
    data: {merchant},
  } = useSelector((state: any) => state.merchantManager)

  useEffect(() => {
    dispatch(categoryTypeRedux.action.getCategoryType())
    dispatch(offerRedux.actions.getDiscountType())
    dispatch(merchantRedux.actions.getAllMerchantManager())
  }, [])

  useEffect(() => {
    const merchantCatType = categoryType?.filter(
      (item: {[key: string]: string}) => item.display_name === 'Offers'
    )
    setOffersCategory(merchantCatType[0]?.id)
  }, [categoryType])

  useEffect(() => {
    if (!isEmpty(offersCategory)) {
      dispatch(categoriesRedux.categories.actions.getSpecificCmsCategories(offersCategory))
    }
  }, [offersCategory])

  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]

  const categoryOptions = category?.map((items: any) => ({
    label: items.name,
    value: items.id,
  }))

  const discountTypeOptions = discountType?.map((items: any) => ({
    label: items.displayName,
    value: items.id,
  }))

  const merchantOptions = merchant?.map((merchants: any) => ({
    label: merchants.name,
    value: merchants.id,
  }))

  useEffect(() => {
    if (success) {
      dispatch(offerRedux?.actions.getOffer(params))
      isEmpty(editSelectedData)
        ? toast.success('Offer added successfully')
        : toast.success('Offer edited successfully')
      dispatch(offerRedux?.actions?.resetOffer())
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
          <Modal.Title>{actionType} Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                title: '',
                titleNp: '',
                slug: '',
                status: '',
                merchantId: '',
                categoryId: '',
                publishedDate: null,
                initiationDate: null,
                tillDate: null,
                thumbImage: '',
                discountTypeId: '',
                discount: '',
                link: '',
                description: '',
                descriptionNp: '',
                shortDescription: '',
                shortDescriptionNp: '',
                mobileNumbers: [{mobilenumber: ''}],
                phoneNumbers: [{phonenumber: ''}],
                offerAdresses: [
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
              onSubmit={(values, {setSubmitting}) => {
                const formData = {
                  ...values,
                  offerAdresses: values?.offerAdresses?.map((item: {[key: string]: string}) => ({
                    ...item,
                    id: item?.id ? item.id : null,
                    longitude: item?.longitude ? item?.longitude.toString() : '',
                    latitude: item?.latitude ? item?.latitude.toString() : '',
                  })),
                  mobileNumbers: values?.mobileNumbers?.map((item: {[key: string]: string}) => ({
                    ...item,
                    id: item?.id ? item.id : null,
                  })),
                  phoneNumbers: values?.phoneNumbers?.map((item: {[key: string]: string}) => ({
                    ...item,
                    id: item?.id ? item.id : null,
                  })),
                  publishedDate: values?.publishedDate
                    ? moment(values?.publishedDate).format('YYYY-MM-DD')
                    : null,
                  initiationDate: values?.initiationDate
                    ? moment(values?.initiationDate).format('YYYY-MM-DD')
                    : null,
                  tillDate: values?.tillDate ? moment(values?.tillDate).format('YYYY-MM-DD') : null,

                  slug: !isEmpty(editSelectedData)
                    ? editSelectedData?.slug
                    : values?.title.replace(/\s/g, '-').toLowerCase(),
                  status: values?.status === 'Active' ? true : false,
                }

                if (!isEmpty(editSelectedData)) {
                  dispatch(offerRedux.actions.updateOffer(formData, editSelectedData?.id))
                } else {
                  dispatch(offerRedux.actions.addOffer(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'description',
                      'descriptionNp',
                      'shortDescription',
                      'shortDescriptionNp',
                      'id',
                      'title',
                      'titleNp',
                      'slug',
                      'categoryId',
                      'merchantId',
                      'initiationDate',
                      'thumbImage',
                      'link',
                      'publishedDate',
                      'discount',
                      'mobileNumbers',
                      'tillDate',
                      'discountTypeId',

                      'phoneNumbers',
                      'offerAdresses',
                    ]
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue(
                      'publishedDate',
                      editSelectedData?.publishedDate
                        ? moment(editSelectedData?.publishedDate, 'YYYY-MM-DD').toDate()
                        : null,
                      false
                    )
                    setFieldValue(
                      'initiationDate',
                      editSelectedData?.initiationDate
                        ? moment(editSelectedData?.initiationDate, 'YYYY-MM-DD').toDate()
                        : null,
                      false
                    )
                    setFieldValue(
                      'tillDate',
                      editSelectedData?.tillDate
                        ? moment(editSelectedData?.tillDate, 'YYYY-MM-DD').toDate()
                        : null,
                      false
                    )

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
                            required
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select'
                            label='Merchant'
                            name='merchantId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={merchantOptions}
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
                            placeholder='Enter Title'
                            label='Title (EN)'
                            name='title'
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
                            placeholder='Title (NP)'
                            label='Title (NP)'
                            name='titleNp'
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
                                : values?.title.replace(/\s/g, '-').toLowerCase()
                            }
                          />
                        </div>
                      </div>
                      <div className='row'>
                        <FieldArray
                          name='offerAdresses'
                          render={(arrayHelpers) => (
                            <div>
                              {values.offerAdresses && values.offerAdresses.length > 0
                                ? values.offerAdresses.map((friend: any, index: any) => (
                                    <div className='row' key={index}>
                                      <div className='col-md-6 col-xs-12'>
                                        <FormSelect
                                          labelClassName='col-md-12'
                                          containerClassName='col-md-12'
                                          placeholder='Please select province'
                                          label='Province'
                                          name={`offerAdresses.${index}.provinceId`}
                                          onChange={handleChange}
                                          errors={errors}
                                          touched={touched}
                                          options={provinceOptions}
                                          values={values}
                                          setFieldValue={setFieldValue}
                                          arrValue={values.offerAdresses[index].provinceId}
                                          required
                                        />
                                      </div>
                                      {!isEmpty(values?.offerAdresses[index].provinceId)
                                        ? setProvinceValue(values?.offerAdresses[index].provinceId)
                                        : ''}
                                      <div className='col-md-6 col-xs-12'>
                                        <FormSelect
                                          labelClassName='col-md-12'
                                          containerClassName='col-md-12'
                                          placeholder='Please select district'
                                          label='District'
                                          name={`offerAdresses.${index}.districtId`}
                                          disabled={
                                            values?.offerAdresses[index].provinceId ? false : true
                                          }
                                          onChange={handleChange}
                                          errors={errors}
                                          touched={touched}
                                          options={districtOptions}
                                          values={values}
                                          setFieldValue={setFieldValue}
                                          arrValue={values?.offerAdresses[index].districtId}
                                          required
                                        />
                                      </div>

                                      <div className='col-md-6 col-xs-12'>
                                        <FormTextBox
                                          type='text'
                                          labelClassName='col-md-12'
                                          containerClassName='col-md-12'
                                          placeholder='Enter Address'
                                          label='Address (EN)'
                                          name={`offerAdresses.${index}.address`}
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
                                          placeholder='Enter Address (NP)'
                                          label='Address (NP)'
                                          name={`offerAdresses.${index}.addressNp`}
                                          onChange={handleChange}
                                          errors={errors}
                                          touched={touched}
                                          required
                                        />
                                      </div>
                                      <MapView
                                        lngName={`offerAdresses.${index}.longitude`}
                                        latName={`offerAdresses.${index}.latitude`}
                                        setFieldValue={setFieldValue}
                                        location={{
                                          lat: values.offerAdresses[index].latitude,
                                          lng: values.offerAdresses[index].longitude,
                                        }}
                                      />

                                      <div className='col-md-6 col-xs-12'>
                                        <FormTextBox
                                          type='text'
                                          labelClassName='col-md-12'
                                          containerClassName='col-md-12'
                                          placeholder='Enter Longitude'
                                          label='Longitude'
                                          name={`offerAdresses.${index}.longitude`}
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
                                          placeholder='Enter Latitude'
                                          label='Latitude'
                                          name={`offerAdresses.${index}.latitude`}
                                          onChange={handleChange}
                                          errors={errors}
                                          touched={touched}
                                          required
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
                          <FormDatepicker
                            labelClassName='col-12'
                            containerClassName='col-12 '
                            label='Published date'
                            name='publishedDate'
                            placeholderText='Please select a Published date'
                            setFieldValue={setFieldValue}
                            value={values.publishedDate || false}
                            errors={errors}
                            touched={touched}
                            showIcon={true}
                            required
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormDatepicker
                            labelClassName='col-12'
                            containerClassName='col-12 '
                            label='Offer Initiation date'
                            name='initiationDate'
                            placeholderText='Please select a initiation date'
                            setFieldValue={setFieldValue}
                            value={values.initiationDate || false}
                            errors={errors}
                            touched={touched}
                            showIcon={true}
                            required
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormDatepicker
                            labelClassName='col-12'
                            containerClassName='col-12 '
                            minDate={values.initiationDate}
                            label='Till Date'
                            name='tillDate'
                            placeholderText='Please select a till date'
                            setFieldValue={setFieldValue}
                            value={values.tillDate || false}
                            errors={errors}
                            touched={touched}
                            showIcon={true}
                            disabled={values.initiationDate ? false : true}
                            required
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select'
                            label='Discount Type'
                            name='discountTypeId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={discountTypeOptions}
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Discount'
                            label='Discount'
                            name='discount'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
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
                            note='Recommended Image size of 600*600px'
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
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Short Description (EN)'
                            name='shortDescription'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.shortDescription : ''
                            }
                            handleChange={handleChange}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Short Description (NP)'
                            name='shortDescriptionNp'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.shortDescriptionNp : ''
                            }
                            handleChange={handleChange}
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
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Link'
                            label='Link'
                            name='link'
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
export default AddOffer
