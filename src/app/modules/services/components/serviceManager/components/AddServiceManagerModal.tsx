import {useEffect, useState} from 'react'
import {Form, Formik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import Modal from 'rsuite/Modal'
import {Tab, Tabs} from 'react-bootstrap-v5'
import * as Yup from 'yup'

// includes
import Media from './Media'
import Features from './Features'
import {ServiceManagerType, ServiceOptionType} from '../Model'
import * as services from 'src/app/modules/services'
import {GeneralComponent} from './GeneralComponent'
import PageHeaderSettings from './PageHeaderSettings'
import {StateParamsModel} from 'src/app/modules/common/Model'
import {FaqCategoryModel} from 'src/app/modules/cms/components/faqCategory/Model'
import {FaqComponent} from 'src/app/modules/products/components/productManager/component/productTabComponents/FaqComponent'
import {ApplyNowComponent} from 'src/app/modules/products/components/productManager/component/productTabComponents/ApplyNowComponent'
import {AdditionalSection} from 'src/app/modules/products/components/productManager/component/productTabComponents/AdditionalSection'
import {RelatedComponent} from 'src/app/modules/products/components/productManager/component/productTabComponents/RelatedProductsComp'
import {RequiredDocumentsComponent} from 'src/app/modules/products/components/productManager/component/productTabComponents/RequiredDocumentComp'
import {isEmpty} from 'lodash'
import {toast} from 'react-toastify'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const initialValidationSchema = {
  title: Yup.string().required('Title is required'),
  serviceCategoryId: Yup.string().required('Category is required'),
  shortDescription: Yup.string()
    .required('Short Description is required')
    .max(250, 'Short Description exceeds 250 words')
    .nullable(),
  description: Yup.string().required('Description is required'),
  status: Yup.boolean().required('Status is required'),
  serviceFeatureId: Yup.string().required('Service feature is required'),
  shortDescriptionNp: Yup.string()
    .max(250, 'Short Description Nepali exceeds 250 words')
    .nullable(),
  media: Yup.array().of(
    Yup.object().shape({
      thumbImage: Yup.string().required('Thumbnail image is required').nullable(),
      mediaTypeId: Yup.string().required('Media Type is required').nullable(),
    })
  ),
  faqOptionId: Yup.string().required('FAQ option is required'),
  serviceDocumentId: Yup.string().required('Required document option is required'),
  serviceRelatedId: Yup.string().required('Service related option is required'),
  serviceApplyId: Yup.string().required('Service Apply option is required'),
  serviceLeadFormId: Yup.string().required('Service Lead Form is required'),
  reviewId: Yup.string().required('Review is required'),
}

const AddServiceManagerModal = ({
  open,
  params,
  handleClose,
  actionType,
  editSelectedData,
}: Props) => {
  const dispatch = useDispatch()

  const {
    serviceReviewOption,
    servicePopularity,
    serviceLeadFormOption,
    serviceMediaType,
    serviceFeatureOption,
    serviceFaqOption,
    serviceDocumentOption,

    serviceApplyNowOption,
    serviceRelatedOption,
    reviewAndRatingOption,

    serviceManagerList,
    loading,
    success,
    addUpdateResp,
  } = useSelector((state: any) => state.serviceManager)

  const {
    data: {faqCategory},
  } = useSelector((state: any) => state.faqCategory)

  const {serviceTag} = useSelector((state: any) => state.serviceTag)
  const {serviceCategory} = useSelector((state: any) => state.serviceCategoryOne)

  const [validationSchema, setValidationSchema] = useState(initialValidationSchema)
  const [stateChanged, setStateChanged] = useState(false)
  useEffect(() => {
    setStateChanged(!stateChanged)
  }, [validationSchema])

  //Create options from API for FormSelect
  const serviceReviewOptions = serviceReviewOption?.map((items: ServiceOptionType) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))
  const serviceTagOptions = serviceTag?.map((items: ServiceOptionType) => ({
    label: items.name,
    value: items.id,
  }))
  const serviceCategoryOptions = serviceCategory?.map((items: ServiceOptionType) => ({
    label: items.name,
    value: items.id,
  }))
  const servicePopularityOptions = servicePopularity?.map((items: ServiceOptionType) => ({
    label: items.displayName,
    value: items.id,
  }))
  const serviceLeadFormOptions = serviceLeadFormOption?.map((items: ServiceOptionType) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))
  const serviceMediaTypeOptions = serviceMediaType?.map((items: ServiceOptionType) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))
  const serviceFeatureOptions = serviceFeatureOption?.map((items: ServiceOptionType) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))
  const serviceDocumentOptions = serviceDocumentOption?.map((items: ServiceOptionType) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))

  const faqOptionOptions = serviceFaqOption?.map((items: ServiceOptionType) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))

  const faqCategoryOptions = faqCategory?.map((items: FaqCategoryModel) => ({
    label: items.name,
    value: items.id,
  }))

  const reviewAndRatingOptions = reviewAndRatingOption?.map((items: ServiceOptionType) => ({
    label: items.displayName,
    value: items.id,
  }))

  const serviceRelatedOptions = serviceRelatedOption?.map((items: ServiceOptionType) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))

  const serviceApplyNowOptions = serviceApplyNowOption?.map((items: ServiceOptionType) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))

  const serviceManagerOptions = serviceManagerList.map((items: ServiceManagerType) => ({
    label: items.title,
    value: items.id,
  }))

  useEffect(() => {
    if (success && !isEmpty(addUpdateResp)) {
      isEmpty(editSelectedData)
        ? toast.success('Service Manager added successfully')
        : toast.success('Service Manager edited successfully')
      isEmpty(editSelectedData)
        ? dispatch(services.serviceManager.actions.addServiceManagerReset())
        : dispatch(services.serviceManager.actions.updateServiceManagerReset())
      dispatch(services?.serviceManager?.actions.getServiceManager())
      handleClose()
    }
  }, [success, addUpdateResp])

  return (
    <div className='modal-container'>
      <Modal
        open={open}
        onClose={handleClose}
        className='w-75'
        style={{minHeight: '90vh'}}
        backdrop='static'
        keyboard={false}
        enforceFocus={false}
      >
        <Modal.Header>
          <Modal.Title>{actionType} Service Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{minHeight: '80vh'}}>
          <div>
            <Formik
              validationSchema={Yup.object().shape(validationSchema)}
              initialValues={{
                title: '',
                title_np: '',
                slug: '',
                serviceCategoryId: '',
                shortDescription: '',
                shortDescriptionNp: '',
                description: '',
                descriptionNp: '',
                status: false,
                review: '',
                reviewId: '',
                media: [
                  {
                    thumbImage: null,
                    mediaTypeId: null,
                    image: null,
                    iframe: null,
                  },
                ],
                serviceFeatureId: '',
                featuredInHomepage: '',
                featureData: [
                  {
                    title: null,
                    titleNp: null,
                    description: null,
                    descriptionNp: null,
                    helpText: null,
                    helpTextNp: null,
                  },
                ],
                features: [
                  {
                    description: '',
                    descriptionNp: '',
                    order: '',
                  },
                ],
                faqOptionId: '',
                faqId: '',
                serviceDocumentId: '',
                serviceLeadFormId: '',
                documentData: {
                  title: null,
                  titleNp: null,
                  description: null,
                  descriptionNp: null,
                },

                documents: [{description: '', descriptionNp: ''}],
                serviceApplyId: '',
                applyData: {
                  text: null,
                  textNp: null,
                  firstButtonText: null,
                  firstButtonTextNp: null,
                  firstButtonLink: null,
                  secondButtonText: null,
                  secondButtonTextNp: null,
                  secondButtonLink: null,
                },
                serviceRelatedId: '',
                relatedData: {
                  serviceId: '',
                  text: null,
                  textNp: null,
                  subText: null,
                  subTextNp: null,
                  buttonText: null,
                  buttonTextNp: null,
                  buttonLink: null,
                },
                additionalData: [{text: '', textNp: '', description: '', descriptionNp: ''}],
                tags: [],
                pageHeader: [
                  {
                    id: null,
                    headerImage: null,
                    tagLine: null,
                    tagLineNp: null,
                    firstCtaButton: null,
                    firstCtaButtonNp: null,
                    firstCtaButtonLink: null,
                    secondCtaButton: null,
                    secondCtaButtonNp: null,
                    secondCtaButtonLink: null,
                  },
                ],
              }}
              onSubmit={(values) => {
                const formData = {
                  ...values,
                  slug: !isEmpty(editSelectedData)
                    ? editSelectedData?.slug
                    : values?.title.replace(/\s/g, '-').toLowerCase(),
                  featuredInHomepage: values.featuredInHomepage === 'yes' ? true : false,
                  applyData: [
                    {
                      text: values.applyData.text,
                      textNp: values.applyData.textNp,
                      firstButtonText: values.applyData.firstButtonText,
                      firstButtonTextNp: values.applyData.firstButtonTextNp,
                      firstButtonLink: values.applyData.firstButtonLink,
                      secondButtonText: values.applyData.secondButtonText,
                      secondButtonTextNp: values.applyData.secondButtonTextNp,
                      secondButtonLink: values.applyData.secondButtonLink,
                    },
                  ],
                  relatedData: [
                    {
                      serviceId: values.relatedData.serviceId,
                      text: values.relatedData.text,
                      textNp: values.relatedData.textNp,
                      subText: values.relatedData.subText,
                      subTextNp: values.relatedData.subTextNp,
                      buttonText: values.relatedData.buttonText,
                      buttonTextNp: values.relatedData.buttonTextNp,
                      buttonLink: values.relatedData.buttonLink,
                    },
                  ],
                  documentData: [
                    {
                      title: values.documentData.title,
                      titleNp: values.documentData.titleNp,
                      description: values.documentData.description,
                      descriptionNp: values.documentData.descriptionNp,
                    },
                  ],
                  additionalData: values?.additionalData?.map(
                    (item: {[key: string]: string | number}) => ({
                      ...item,
                      id: !isEmpty(editSelectedData) ? item.id : null,
                    })
                  ),
                  features: !isEmpty(values?.features)
                    ? values?.features?.map((item: {[key: string]: string}) => ({
                        ...item,
                        id: !isEmpty(editSelectedData) ? item.id : null,
                      }))
                    : [
                        {
                          description: null,
                          descriptionNp: null,
                          order: null,
                        },
                      ],
                  documents: !isEmpty(values?.documents)
                    ? values?.documents?.map((item: {[key: string]: string | number}) => ({
                        ...item,
                        id: !isEmpty(editSelectedData) ? item.id : null,
                      }))
                    : [{description: null, descriptionNp: null}],
                  tags: !isEmpty(values?.tags)
                    ? values?.tags?.map((item: string) => ({
                        id: item,
                      }))
                    : null,
                }
                if (!isEmpty(editSelectedData)) {
                  dispatch(
                    services.serviceManager.actions.updateServiceManager(
                      formData,
                      editSelectedData?.id
                    )
                  )
                } else {
                  dispatch(services.serviceManager.actions.addServiceManager(formData))
                }
              }}
            >
              {({touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'title',
                      'title_np',
                      'slug',
                      'serviceCategoryId',
                      'shortDescription',
                      'shortDescriptionNp',
                      'description',
                      'descriptionNp',
                      'status',
                      'servicePopularityId',
                      'serviceLeadFormId',
                      'reviewId',
                      'review',
                      'media',
                      'serviceFeatureId',
                      'featuredInHomepage',
                      'featureData',
                      'features',
                      'faqOptionId',
                      'faqId',
                      'serviceDocumentId',
                      'documentData',
                      'documents',
                      'parentId',
                      'serviceApplyId',
                      'applyData',
                      'serviceRelatedId',
                      'relatedData',
                      'additionalData',
                      'tags',
                      'pageHeader',
                    ]
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                  }
                  if (actionType === 'Add') {
                    setFieldValue(
                      'serviceLeadFormId',
                      serviceLeadFormOptions
                        ?.filter((items: any) => items.systemName === 'no')
                        .map((item: any) => item.value)
                        .toString(),
                      false
                    )
                    setFieldValue(
                      'reviewId',
                      serviceReviewOptions
                        ?.filter((items: any) => items.systemName === 'no')
                        .map((item: any) => item.value)
                        .toString(),
                      false
                    )
                    setFieldValue(
                      'media[0].mediaTypeId',
                      serviceMediaTypeOptions
                        ?.filter((items: any) => items.systemName === 'image')
                        .map((item: any) => item.value)
                        .toString(),
                      false
                    )
                    setFieldValue(
                      'serviceFeatureId',
                      serviceFeatureOptions
                        ?.filter((items: any) => items.systemName === 'no')
                        .map((item: any) => item.value)
                        .toString(),
                      false
                    )
                    setFieldValue(
                      'faqOptionId',
                      faqOptionOptions
                        ?.filter((items: any) => items.systemName === 'no')
                        .map((item: any) => item.value)
                        .toString(),
                      false
                    )
                    setFieldValue(
                      'serviceDocumentId',
                      serviceDocumentOptions
                        ?.filter((items: any) => items.systemName === 'no')
                        .map((item: any) => item.value)
                        .toString(),
                      false
                    )
                    setFieldValue(
                      'serviceRelatedId',
                      serviceRelatedOptions
                        ?.filter((items: any) => items.systemName === 'no')
                        .map((item: any) => item.value)
                        .toString(),
                      false
                    )
                    setFieldValue(
                      'serviceApplyId',
                      serviceApplyNowOptions
                        ?.filter((items: any) => items.systemName === 'no')
                        .map((item: any) => item.value)
                        .toString(),
                      false
                    )
                  }
                }, [])

                return (
                  <Form>
                    <div className='card-body border-top'>
                      <div className=''>
                        <div className='row'>
                          <Tabs
                            defaultActiveKey='general'
                            id='uncontrolled-tab-example'
                            className='mb-5'
                          >
                            <Tab eventKey='general' title='General'>
                              <div className='card-body bg-white'>
                                <GeneralComponent
                                  handleChange={handleChange}
                                  touched={touched}
                                  errors={errors}
                                  serviceReviewOptions={serviceReviewOptions}
                                  serviceTagOptions={serviceTagOptions}
                                  serviceCategoryOptions={serviceCategoryOptions}
                                  servicePopularityOptions={servicePopularityOptions}
                                  serviceLeadFormOptions={serviceLeadFormOptions}
                                  reviewAndRatingOptions={reviewAndRatingOptions}
                                  editSelectedData={editSelectedData}
                                  values={values}
                                  setValidationSchema={setValidationSchema}
                                  validationSchema={validationSchema}
                                  serviceFeatureOptions={serviceFeatureOptions}
                                  setFieldValue={setFieldValue}
                                />
                              </div>
                            </Tab>
                            <Tab eventKey='pageHeader' title='Page Header Setting'>
                              <div className='card-body bg-white'>
                                <PageHeaderSettings
                                  handleChange={handleChange}
                                  touched={touched}
                                  errors={errors}
                                  setFieldValue={setFieldValue}
                                  values={values}
                                />
                              </div>
                            </Tab>
                            <Tab eventKey='media' title='Media'>
                              <div className='card-body bg-white'>
                                <Media
                                  handleChange={handleChange}
                                  touched={touched}
                                  errors={errors}
                                  setFieldValue={setFieldValue}
                                  values={values}
                                  serviceMediaTypeOptions={serviceMediaTypeOptions}
                                />
                              </div>
                            </Tab>
                            <Tab eventKey='features' title='Features'>
                              <div className='card-body bg-white'>
                                <Features
                                  handleChange={handleChange}
                                  touched={touched}
                                  errors={errors}
                                  serviceFeatureOptions={serviceFeatureOptions}
                                  values={values}
                                  setValidationSchema={setValidationSchema}
                                  validationSchema={validationSchema}
                                  editSelectedData={editSelectedData}
                                  setFieldValue={setFieldValue}
                                />
                              </div>
                            </Tab>
                            <Tab eventKey='faqSection' title='FAQ Section'>
                              <div className='card-body bg-white'>
                                <FaqComponent
                                  handleChange={handleChange}
                                  touched={touched}
                                  errors={errors}
                                  values={values}
                                  faqCategoryOptions={faqCategoryOptions}
                                  faqOption={faqOptionOptions}
                                  validationState={validationSchema}
                                  setValidationState={setValidationSchema}
                                  setFieldValue={setFieldValue}
                                />
                              </div>
                            </Tab>
                            <Tab eventKey='requiredDocument' title='Required Documents'>
                              <div className='card-body bg-white'>
                                <RequiredDocumentsComponent
                                  handleChange={handleChange}
                                  touched={touched}
                                  errors={errors}
                                  values={values}
                                  editSelectedData={editSelectedData}
                                  documentOptions={serviceDocumentOptions}
                                  validationState={validationSchema}
                                  setValidationState={setValidationSchema}
                                  optionName='serviceDocumentId'
                                  setFieldValue={setFieldValue}
                                />
                              </div>
                            </Tab>
                            <Tab eventKey='relatedProducts' title='Related Products'>
                              <div className='card-body bg-white'>
                                <RelatedComponent
                                  handleChange={handleChange}
                                  touched={touched}
                                  errors={errors}
                                  values={values}
                                  editSelectedData={editSelectedData}
                                  relatedOptions={serviceRelatedOptions}
                                  managerOptions={serviceManagerOptions}
                                  validationState={validationSchema}
                                  setValidationState={setValidationSchema}
                                  optionName='serviceRelatedId'
                                  optionTitle='Services'
                                  relatedOptionIdName='serviceId'
                                  setFieldValue={setFieldValue}
                                />
                              </div>
                            </Tab>
                            <Tab eventKey='applyNow' title='Apply Now'>
                              <div className='card-body bg-white'>
                                <ApplyNowComponent
                                  handleChange={handleChange}
                                  touched={touched}
                                  errors={errors}
                                  values={values}
                                  applyNowOptions={serviceApplyNowOptions}
                                  validationState={validationSchema}
                                  setValidationState={setValidationSchema}
                                  optionName='serviceApplyId'
                                  setFieldValue={setFieldValue}
                                />
                              </div>
                            </Tab>
                            <Tab eventKey='additionalSection' title='Additional Section'>
                              <div className='card-body bg-white'>
                                <AdditionalSection
                                  handleChange={handleChange}
                                  touched={touched}
                                  errors={errors}
                                  values={values}
                                  editSelectedData={editSelectedData}
                                />
                              </div>
                            </Tab>
                          </Tabs>
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
                      </div>
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
export default AddServiceManagerModal
