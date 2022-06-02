import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {Form, Formik} from 'formik'
import {Tab, Tabs} from 'react-bootstrap-v5'

import {toast} from 'react-toastify'
import * as Yup from 'yup'
import * as faqCategoryRedux from 'src/app/modules/cms/components/faqCategory/redux'
import * as productManagerRedux from '../index'
import * as productCategoryRedux from '../../productCategory'
import * as productTagRedux from '../../productTag'
import {StateParamsModel} from 'src/app/modules/common/Model'

import Modal from 'rsuite/Modal'
import {ProductCategoryModel} from '../../productCategory/Model/ProductCategoryModel'

//Tab Component
import {GeneralComponent} from './productTabComponents/GeneralComponent'
import {ProductTagModel} from '../../productTag/Model/ProductTagModel'
import {ProductOptionModel} from '../Model'
import {PageHeaderSettingComponent} from './productTabComponents/PageHeaderSettingComponent'
import {MediaComponent} from './productTabComponents/MediaComponent'
import {FeaturesComponent} from './productTabComponents/FeaturesComponent'
import {RequiredDocumentsComponent} from './productTabComponents/RequiredDocumentComp'
import {RelatedComponent} from './productTabComponents/RelatedProductsComp'
import {ApplyNowComponent} from './productTabComponents/ApplyNowComponent'
import {AdditionalSection} from './productTabComponents/AdditionalSection'
import {ComparisonParamComponent} from './productTabComponents/ComparisonComponent'
import {FaqComponent} from './productTabComponents/FaqComponent'
import {FaqCategoryModel} from 'src/app/modules/cms/components/faqCategory/Model'
import {ProductManagerModel} from '../Model/ProductManagerModel'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = {
  title: Yup.string().required('Name is required'),
  faqOptionId: Yup.string().required('Faq option is required'),
  media: Yup.object().shape({
    mediaTypeId: Yup.string().required('Media Type is required'),
  }),
  interestRateId: Yup.string().required('Interest rate is required'),
  shortDescription: Yup.string().max(250, 'Short Description exceeds 250 words').nullable(),
  shortDescriptionNp: Yup.string()
    .max(250, 'Short Description Nepali exceeds 250 words')
    .nullable(),
  productApplyId: Yup.string().required('Product apply field is required'),
  productCategoryId: Yup.string().required('Product category field is required'),
  productComparisonId: Yup.string().required('Product comparison field is required'),
  productDocumentId: Yup.string().required('Product document field is required'),
  productFeatureId: Yup.string().required('Product feature field is required'),
  productLeadFormId: Yup.string().required('Product lead form field is required'),
  productRelatedId: Yup.string().required('Product related field is required'),
  reviewId: Yup.string().required('Product review data field is required'),
  featuredInHomepage: Yup.string().required('Feature in homepage field is required'),
  competitorStatusId: Yup.string().required('Competitor status field is required'),
  tags: Yup.string().required('Tag field is required'),
}

const AddProductManager = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()

  const [validationState, setValidationState] = useState(FORM_VALIDATION)
  const {
    productPopularity,
    productComparisonStatus,
    productApplyNowOption,
    productCompetitorStatus,
    productDocumentOption,
    productFaqOption,
    productFeatureOption,
    productInterestRateOption,
    productLeadFormOption,
    productMediaType,
    productRelatedOption,
    productReviewOption,
    allProductManager,
    loading,
    success,
  } = useSelector((state: any) => state.productManager)
  const {
    data: {productCategory},
  } = useSelector((state: any) => state.productCategory)
  const {
    data: {productTag},
  } = useSelector((state: any) => state.productTag)

  const {
    data: {faqCategory},
  } = useSelector((state: any) => state.faqCategory)

  useEffect(() => {
    dispatch(faqCategoryRedux.actions.getAllFaqCategory({status: true}))
    dispatch(productManagerRedux.actions.getProductPopularity())
    dispatch(productManagerRedux.actions.getProductComparisonStatus())
    dispatch(productManagerRedux.actions.getProductApplyNowOption())
    dispatch(productManagerRedux.actions.getProductCompetitorStatus())
    dispatch(productManagerRedux.actions.getProductDocumentOption())
    dispatch(productManagerRedux.actions.getProductFaqOption())
    dispatch(productManagerRedux.actions.getProductFeatureOption())
    dispatch(productManagerRedux.actions.getProductInterestRateOption())
    dispatch(productManagerRedux.actions.getProductLeadFormOption())
    dispatch(productManagerRedux.actions.getProductMediaType())
    dispatch(productManagerRedux.actions.getProductRelatedOption())
    dispatch(productManagerRedux.actions.getProductReviewOption())
    dispatch(productCategoryRedux.actions.getAllProductCategory())
    dispatch(productTagRedux.actions.getAllProductTag())
  }, [])
  useEffect(() => {
    if (!isEmpty(editSelectedData?.id)) {
      dispatch(productManagerRedux.actions.getAllProductManager(editSelectedData.id))
    } else {
      dispatch(productManagerRedux.actions.getAllProductManager(editSelectedData.id))
    }
  }, [])
  const statusOptions = [
    {label: 'Active', value: 'Active'},
    {label: 'Inactive', value: 'Inactive'},
  ]

  const productManagerOptions = allProductManager?.productManager?.map(
    (items: ProductManagerModel) => ({
      label: items.title,
      value: items.id,
    })
  )

  const productCategoryOptions = productCategory?.map((items: ProductCategoryModel) => ({
    label: items.name,
    value: items.id,
  }))

  const productTagOptions = productTag?.map((items: ProductTagModel) => ({
    label: items.name,
    value: items.id,
  }))

  const productPopularityOptions = productPopularity?.map((items: ProductOptionModel) => ({
    label: items.displayName,
    value: items.id,
  }))

  const productComparisonStatusOptions = productComparisonStatus?.map(
    (items: ProductOptionModel) => ({
      label: items.displayName,
      value: items.id,
      systemName: items.systemName,
    })
  )

  const productApplyNowOptions = productApplyNowOption?.map((items: ProductOptionModel) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))

  const productCompetitorStatusOptions = productCompetitorStatus?.map(
    (items: ProductOptionModel) => ({
      label: items.displayName,
      value: items.id,
    })
  )

  const productDocumentOptions = productDocumentOption?.map((items: ProductOptionModel) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))

  const productFaqOptions = productFaqOption?.map((items: ProductOptionModel) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))

  const productFeatureOptions = productFeatureOption?.map((items: ProductOptionModel) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))

  const productInterestRateOptions = productInterestRateOption?.map(
    (items: ProductOptionModel) => ({
      label: items.displayName,
      value: items.id,
    })
  )

  const productLeadFormOptions = productLeadFormOption?.map((items: ProductOptionModel) => ({
    label: items.displayName,
    value: items.id,
  }))

  const productMediaTypeOptions = productMediaType?.map((items: ProductOptionModel) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))

  const productRelatedOptions = productRelatedOption?.map((items: ProductOptionModel) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))

  const productReviewOptions = productReviewOption?.map((items: ProductOptionModel) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))

  const faqCategoryOptions = faqCategory?.map((items: FaqCategoryModel) => ({
    label: items.name,
    value: items.id,
  }))

  useEffect(() => {
    if (success) {
      dispatch(productManagerRedux?.actions.getProductManager(params))
      isEmpty(editSelectedData)
        ? toast.success('Product manager added successfully')
        : toast.success('Product manager edited successfully')
      dispatch(productManagerRedux?.actions?.resetProductManager())
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
        enforceFocus={false}
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{actionType} Product Manager</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{minHeight: '80vh'}}>
          <div>
            <Formik
              initialValues={{
                title: '',
                applyData: {
                  text: '',
                  textNp: '',
                  firstButtonText: '',
                  firstButtonTextNp: '',
                  firstButtonLink: '',
                  secondButtonText: '',
                  secondButtonTextNp: '',
                  secondButtonLink: '',
                },
                competitorStatusId: '',
                description: '',
                descriptionNp: '',
                shortDescription: '',
                shortDescriptionNp: '',
                documentData: {
                  title: '',
                  titleNp: '',
                  description: '',
                  descriptionNp: '',
                },
                documents: [{description: '', descriptionNp: ''}],
                faqOptionId: '',
                featureData: {
                  title: '',
                  titleNp: '',
                  description: '',
                  descriptionNp: '',
                  helpText: '',
                  helpTextNp: '',
                },
                comparisonData: [],
                features: [{description: '', descriptionNp: ''}],
                additionalData: [{text: '', textNp: '', description: '', descriptionNp: ''}],
                interestRateId: '',
                media: {
                  thumbImage: '',
                  mediaTypeId: '',
                  image: '',
                  iframe: '',
                },
                pageHeader: {
                  headerImage: '',
                  tagLine: '',
                  tagLineNp: '',
                  firstCtaButton: '',
                  firstCtaButtonNp: '',
                  firstCtaButtonLink: '',
                  secondCtaButton: '',
                  secondCtaButtonNp: '',
                  secondCtaButtonLink: '',
                },
                productApplyId: '',
                productCategoryId: '',
                productComparisonId: '',
                productDocumentId: '',
                productFeatureId: '',
                productLeadFormId: '',
                productRelatedId: '',
                relatedData: {
                  productId: '',
                  text: '',
                  textNp: '',
                  subText: '',
                  subTextNp: '',
                  buttonText: '',
                  buttonTextNp: '',
                  buttonLink: '',
                },
                reviewId: '',
                faqId: '',
                tags: '',
                featuredInHomepage: '',
                status: '',
                slug: '',
              }}
              validationSchema={Yup.object().shape(validationState)}
              onSubmit={(values) => {
                const formData = {
                  ...values,
                  slug: !isEmpty(editSelectedData)
                    ? editSelectedData?.slug
                    : values?.title.replace(/\s/g, '-').toLowerCase(),
                  featuredInHomepage: values.featuredInHomepage === 'yes' ? true : false,
                  features: !isEmpty(values?.features)
                    ? values?.features?.map((items: {[key: string]: string}) => ({
                        ...items,
                        id: !isEmpty(editSelectedData) ? items.id : null,
                      }))
                    : [{description: '', descriptionNp: ''}],
                  documents: !isEmpty(values?.documents)
                    ? values?.documents?.map((documents: {[key: string]: string}) => ({
                        ...documents,
                        id: !isEmpty(editSelectedData) ? documents.id : null,
                      }))
                    : [{description: '', descriptionNp: ''}],
                  tags: [{id: values.tags}],
                  pageHeader: [
                    {
                      headerImage: values.pageHeader.headerImage,
                      tagLine: values.pageHeader.tagLine,
                      tagLineNp: values.pageHeader.tagLineNp,
                      firstCtaButton: values.pageHeader.firstCtaButton,
                      firstCtaButtonNp: values.pageHeader.firstCtaButtonNp,
                      firstCtaButtonLink: values.pageHeader.firstCtaButtonLink,
                      secondCtaButton: values.pageHeader.secondCtaButton,
                      secondCtaButtonNp: values.pageHeader.secondCtaButtonNp,
                      secondCtaButtonLink: values.pageHeader.secondCtaButtonLink,
                    },
                  ],
                  media: [
                    {
                      thumbImage: values.media.thumbImage,
                      mediaTypeId: values.media.mediaTypeId,
                      image: values.media.image,
                      iframe: values.media.iframe,
                    },
                  ],
                  featureData: [
                    {
                      title: values.featureData.title,
                      titleNp: values.featureData.titleNp,
                      description: values.featureData.description,
                      descriptionNp: values.featureData.descriptionNp,
                      helpText: values.featureData.helpText,
                      helpTextNp: values.featureData.helpTextNp,
                    },
                  ],
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
                      productId: values.relatedData.productId,
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
                  additionalData: values?.additionalData?.map((item: {[key: string]: string}) => ({
                    ...item,
                    id: !isEmpty(editSelectedData) ? item.id : null,
                  })),
                  status: true,
                }

                if (!isEmpty(editSelectedData)) {
                  dispatch(
                    productManagerRedux.actions.updateProductManager(formData, editSelectedData?.id)
                  )
                } else {
                  dispatch(productManagerRedux.actions.addProductManager(formData))
                }
              }}
            >
              {({touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'id',
                      'title',
                      'title_np',
                      'slug',
                      'description',
                      'descriptionNp',
                      'shortDescriptionNp',
                      'shortDescription',
                      'productCategoryId',
                      'tags',
                      'productPopularityId',
                      'interestRateId',
                      'productLeadFormId',
                      'reviewId',
                      'review',
                      'competitorStatusId',
                      'pageHeader',
                      'media',
                      'productFeatureId',
                      'faqOptionId',
                      'faqId',
                      'productDocumentId',
                      'productRelatedId',
                      'documentData',
                      'documents',
                      'featureData',
                      'features',
                      'productApplyId',
                      'applyData',
                      'additionalData',
                      'productComparisonId',
                      'comparisonData',
                    ]
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue(
                      'featuredInHomepage',
                      editSelectedData?.featuredInHomepage === true ? 'yes' : 'no',
                      false
                    )
                    setFieldValue(`media.mediaTypeId`, editSelectedData?.mediaTypeId, false)
                  }
                }, [])

                return (
                  <Form>
                    <div className='card-body border-top pt-5'>
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
                                values={values}
                                editSelectedData={editSelectedData}
                                productCategoryOptions={productCategoryOptions}
                                productTagOptions={productTagOptions}
                                productPopularityOptions={productPopularityOptions}
                                leadFormOptions={productLeadFormOptions}
                                interestRateOptions={productInterestRateOptions}
                                reviewOptions={productReviewOptions}
                                competitorOptions={productCompetitorStatusOptions}
                                setFieldValue={setFieldValue}
                              />
                            </div>
                          </Tab>
                          <Tab eventKey='pageHeaderSettings' title='Page Header Settings'>
                            <div className='card-body bg-white'>
                              <PageHeaderSettingComponent
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                                values={values}
                                editSelectedData={editSelectedData}
                                setFieldValue={setFieldValue}
                              />
                            </div>
                          </Tab>
                          <Tab eventKey='mediaSection' title='Media'>
                            <div className='card-body bg-white'>
                              <MediaComponent
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                                values={values}
                                editSelectedData={editSelectedData}
                                mediaTypeOptions={productMediaTypeOptions}
                                setFieldValue={setFieldValue}
                              />
                            </div>
                          </Tab>
                          <Tab eventKey='featuresSection' title='Features'>
                            <div className='card-body bg-white'>
                              <FeaturesComponent
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                                values={values}
                                editSelectedData={editSelectedData}
                                featuresOption={productFeatureOptions}
                                validationState={validationState}
                                setValidationState={setValidationState}
                                setFieldValue={setFieldValue}
                              />
                            </div>
                          </Tab>
                          <Tab eventKey='faqSection' title='Faq'>
                            <div className='card-body bg-white'>
                              <FaqComponent
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                                values={values}
                                faqCategoryOptions={faqCategoryOptions}
                                faqOption={productFaqOptions}
                                validationState={validationState}
                                setValidationState={setValidationState}
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
                                documentOptions={productDocumentOptions}
                                validationState={validationState}
                                setValidationState={setValidationState}
                                optionName='productDocumentId'
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
                                relatedOptions={productRelatedOptions}
                                managerOptions={productManagerOptions}
                                validationState={validationState}
                                setValidationState={setValidationState}
                                optionName='productRelatedId'
                                optionTitle='Products'
                                relatedOptionIdName='productId'
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
                                applyNowOptions={productApplyNowOptions}
                                validationState={validationState}
                                setValidationState={setValidationState}
                                optionName='productApplyId'
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
                          <Tab eventKey='comparisonStatus' title='Comparison Parameters'>
                            <div className='card-body bg-white'>
                              <ComparisonParamComponent
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                                values={values}
                                setFieldValue={setFieldValue}
                                editSelectedData={editSelectedData}
                                productComparisonStatusOptions={productComparisonStatusOptions}
                              />
                            </div>
                          </Tab>
                        </Tabs>
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
export default AddProductManager
