import {useEffect, useState} from 'react'
import {Form, Formik} from 'formik'
import * as Yup from 'yup'
import * as cms from 'src/app/modules/cms'
import * as bannerRedux from 'src/app/modules/cms/components/banner/redux'
import * as productRedux from 'src/app/modules/products'
import * as categoryTypeRedux from 'src/app/modules/common'
import * as categories from 'src/app/modules/cms/components/categories'
import * as faqCategoryRedux from 'src/app/modules/cms/components/faqCategory/redux'
import {useDispatch, useSelector} from 'react-redux'
import Modal from 'rsuite/Modal'
import {StateParamsModel} from 'src/app/modules/common/Model'
import {isEmpty} from 'lodash'
import {IContentState} from '../redux/reducer'
import {CategoryModel, ContentOptionModal} from '../Model'
import {Tab, Tabs} from 'react-bootstrap-v5'
import {GeneralComponent} from './TabComponents/GeneralComponent'
import {toast} from 'react-toastify'
import {FaqComponent} from './TabComponents/FaqComponent'
import CollapsibleSection from './TabComponents/CollapsibleSection'
import {ProductComponent} from './TabComponents/ProductComponent'
import {HelpSection} from './TabComponents/HelpSection'
import {ApplyNowSection} from './TabComponents/ApplyNowSection'
import {BannerModel} from '../../banner/Model'
import {FaqCategoryModel} from '../../faqCategory/Model'
import {ProductManagerModel} from 'src/app/modules/products/components/productManager/Model/ProductManagerModel'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = {
  content_name: Yup.string().required('Content name is required'),
  categoryId: Yup.string().required('Category option is required'),
  description: Yup.string().required('Description is required'),
  show_lead_form_id: Yup.string().required('Show lead option is required'),
  enable_page_header_id: Yup.string().required('Enable page header option is required'),
  show_banner_id: Yup.string().required('Show banner option is required'),
  show_review_id: Yup.string().required('Review option is required'),
  faqOptionId: Yup.string().required('Faq option is required'),
  show_collapsible_id: Yup.string().required('Show collapsible option is required'),
  collapsible_title: Yup.string().required('Collapsible title is required'),
  productSectionId: Yup.string().required('Show product option is required'),
  helpSectionId: Yup.string().required('Show help option is required'),
  applySectionId: Yup.string().required('Show aply now option is required'),
}

const AddMenuModal = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const [contentCategory, setContentCategory] = useState('')
  const [validationState, setValidationState] = useState(FORM_VALIDATION)
  const {
    applyNowSection,
    contentBannerOption,
    collapsibleSection,
    faqSection,
    helpSection,
    contentLeadFormOption,
    pageHeaderOption,
    productSection,
    reviewAndRatingOption,
    loading,
    success,
  } = useSelector((state: IContentState | any) => state.content)

  const {
    data: {faqCategory},
  } = useSelector((state: any) => state.faqCategory)

  const {
    allProductManager: {productManager},
  } = useSelector((state: any) => state.productManager)

  const {
    data: {categoryType},
  } = useSelector((state: any) => state.categoryType)

  const {menuList} = useSelector((state: any) => state.menuManager)

  const {
    data: {banner},
  } = useSelector((state: any) => state.banner)

  const {
    data: {category},
  } = useSelector((state: any) => state.categories)

  useEffect(() => {
    dispatch(categoryTypeRedux.action.getCategoryType())
  }, [])

  useEffect(() => {
    const contentCatType = categoryType?.filter(
      (item: {[key: string]: string}) => item.system_name === 'content'
    )
    setContentCategory(contentCatType[0]?.id)
  }, [categoryType])

  useEffect(() => {
    if (!isEmpty(contentCategory)) {
      dispatch(categories.actions.getSpecificCmsCategories(contentCategory))
    }
  }, [contentCategory])

  useEffect(() => {
    dispatch(cms.content.actions.getApplyNowSection())
    dispatch(cms.content.actions.getConstantBanner())
    dispatch(cms.content.actions.getCollapsibleSection())
    dispatch(cms.content.actions.getFaqOption())
    dispatch(cms.content.actions.getHelpSection())
    dispatch(cms.content.actions.getLeadForm())
    dispatch(cms.content.actions.getPageHeader())
    dispatch(cms.content.actions.getProductOption())
    dispatch(cms.content.actions.getReviewAndRating())
    dispatch(bannerRedux.actions.getAllBanner())
    dispatch(cms.menu.actions.getAllMenu())
    dispatch(faqCategoryRedux.actions.getAllFaqCategory({status: true}))
    dispatch(productRedux.productManager.actions.getAllProductManager())
  }, [])

  //Create options from API for FormSelect

  const menuOptions = menuList?.menu?.map((items: any) => ({
    label: items.tableViewName,
    value: items.id,
    children: items?.children?.map((child: any) => ({
      label: child.tableViewName,
      value: child.id,
    })),
  }))

  const applyNowSectionOptions = applyNowSection?.map((items: ContentOptionModal) => ({
    label: items.displayName,
    systemName: items.systemName,

    value: items.id,
  }))
  const categoryOptions = category?.map((items: CategoryModel) => ({
    label: items.name,
    value: items.id,
  }))

  const productDataOptions = productManager?.map((items: ProductManagerModel) => ({
    label: items.title,
    value: items.id,
  }))

  const bannerOptions = contentBannerOption?.map((items: ContentOptionModal) => ({
    label: items.displayName,
    systemName: items.systemName,
    value: items.id,
  }))
  const bannerData = banner?.map((items: BannerModel) => ({
    label: items.title,
    value: items.id,
  }))

  const faqCategoryOptions = faqCategory?.map((items: FaqCategoryModel) => ({
    label: items.name,
    value: items.id,
  }))

  const collapsibleSectionOptions = collapsibleSection?.map((items: ContentOptionModal) => ({
    label: items.displayName,
    systemName: items.systemName,
    value: items.id,
  }))
  const faqOptionOptions = faqSection?.map((items: ContentOptionModal) => ({
    label: items.displayName,
    systemName: items.systemName,
    value: items.id,
  }))
  const helpSectionOptions = helpSection?.map((items: ContentOptionModal) => ({
    label: items.displayName,
    systemName: items.systemName,
    value: items.id,
  }))
  const leadFormOptions = contentLeadFormOption?.map((items: ContentOptionModal) => ({
    label: items.displayName,
    systemName: items.systemName,

    value: items.id,
  }))
  const pageHeaderOptions = pageHeaderOption?.map((items: ContentOptionModal) => ({
    label: items.displayName,
    systemName: items.systemName,

    value: items.id,
  }))
  const productOption = productSection?.map((items: ContentOptionModal) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))
  const reviewAndRatingOptions = reviewAndRatingOption?.map((items: ContentOptionModal) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))

  useEffect(() => {
    if (success) {
      isEmpty(editSelectedData)
        ? toast.success('Content added successfully')
        : toast.success('Content edited successfully')
      dispatch(cms.content.actions.resetContent())
      handleClose()
    }
  }, [success])

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
          <Modal.Title>{actionType} Content</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{minHeight: '80vh'}}>
          <div>
            <Formik
              validationSchema={Yup.object().shape(validationState)}
              initialValues={{
                slug: '',
                collapsibleData: [{title: '', title_np: '', description: '', description_np: ''}],
                helpSection: {
                  text: '',
                  text_np: '',
                  sub_text: '',
                  sub_text_np: '',
                  image: '',
                  image_np: '',
                  first_button_text: '',
                  first_button_text_np: '',
                  first_button_link: '',
                  second_button_text: '',
                  second_button_text_np: '',
                  second_button_link: '',
                },
                applySection: {
                  text: '',
                  text_np: '',
                  first_button_text: '',
                  first_button_text_np: '',
                  first_button_link: '',
                  second_button_text: '',
                  second_button_text_np: '',
                  second_button_link: '',
                },
                menuId: '',
                productData: {
                  productId: '',
                  text: '',
                  text_np: '',
                  sub_text: '',
                  sub_text_np: '',
                  button_text: '',
                  button_text_np: '',
                  button_link: '',
                },
                rating: '',
                content_name: '',
                categoryId: '',
                description: '',
                show_lead_form_id: '',
                enable_page_header_id: '',
                show_banner_id: '',
                show_review_id: '',
                faqOptionId: '',
                show_collapsible_id: '',
                collapsible_title: '',
                productSectionId: '',
                helpSectionId: '',
                applySectionId: '',
              }}
              onSubmit={(values) => {
                const formData = {
                  ...values,
                  helpSection: [
                    {
                      text: values.helpSection.text,
                      text_np: values.helpSection.text_np,
                      sub_text: values.helpSection.sub_text,
                      sub_text_np: values.helpSection.sub_text_np,
                      image: values.helpSection.image,
                      image_np: values.helpSection.image_np,
                      first_button_text: values.helpSection.first_button_text,
                      first_button_text_np: values.helpSection.first_button_text_np,
                      first_button_link: values.helpSection.first_button_link,
                      second_button_text: values.helpSection.second_button_text,
                      second_button_text_np: values.helpSection.second_button_text_np,
                      second_button_link: values.helpSection.second_button_link,
                    },
                  ],
                  applySection: [
                    {
                      text: values.applySection.text,
                      text_np: values.applySection.text_np,
                      first_button_text: values.applySection.first_button_text,
                      first_button_text_np: values.applySection.first_button_text_np,
                      first_button_link: values.applySection.first_button_link,
                      second_button_text: values.applySection.second_button_text,
                      second_button_text_np: values.applySection.second_button_text_np,
                      second_button_link: values.applySection.second_button_link,
                    },
                  ],
                  productData: [
                    {
                      productId: values.productData.productId,
                      text: values.productData.text,
                      text_np: values.productData.text_np,
                      sub_text: values.productData.sub_text,
                      sub_text_np: values.productData.sub_text_np,
                      button_text: values.productData.button_text,
                      button_text_np: values.productData.button_text_np,
                      button_link: values.productData.button_link,
                    },
                  ],
                  collapsibleData: values?.collapsibleData?.map(
                    (item: {[key: string]: string}) => ({
                      ...item,
                      id: !isEmpty(editSelectedData) ? item.id : null,
                    })
                  ),
                  slug: !isEmpty(editSelectedData)
                    ? editSelectedData?.slug
                    : values?.content_name.replace(/\s/g, '-').toLowerCase(),
                }
                if (!isEmpty(editSelectedData)) {
                  dispatch(cms.content.actions.updateContent(formData, editSelectedData?.id))
                } else {
                  dispatch(cms.content.actions.addContent(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'id',
                      'content_name',
                      'content_name_np',
                      'description',
                      'descriptionNp',
                      'slug',
                      'categoryId',
                      'show_lead_form_id',
                      'enable_page_header_id',
                      'show_banner_id',
                      'show_review_id',
                      'show_collapsible_id',
                      'collapsible_title',
                      'collapsible_title_np',
                      'collapsibleData',
                      'rating',
                      'menuId',
                      'bannerId',
                      'faqOptionId',
                      'faqId',
                      'helpSectionId',
                      'helpSection',
                      'applySectionId',
                      'applySection',
                      'productSectionId',
                      'productData',
                      'modelType',
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
                                  values={values}
                                  bannerOptions={bannerOptions}
                                  bannerData={bannerData}
                                  menuOptions={menuOptions}
                                  leadFormOptions={leadFormOptions}
                                  pageHeaderOptions={pageHeaderOptions}
                                  categoryOptions={categoryOptions}
                                  reviewAndRatingOptions={reviewAndRatingOptions}
                                  editSelectedData={editSelectedData}
                                  validationState={validationState}
                                  setValidationState={setValidationState}
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
                                  faqOptionOptions={faqOptionOptions}
                                  faqCategoryOptions={faqCategoryOptions}
                                  validationState={validationState}
                                  setValidationState={setValidationState}
                                  setFieldValue={setFieldValue}
                                />
                              </div>
                            </Tab>
                            <Tab eventKey='collapsibleSection' title='Collapsible Section'>
                              <div className='card-body bg-white'>
                                <CollapsibleSection
                                  handleChange={handleChange}
                                  touched={touched}
                                  errors={errors}
                                  values={values}
                                  editSelectedData={editSelectedData}
                                  collapsibleSectionOptions={collapsibleSectionOptions}
                                  validationState={validationState}
                                  setValidationState={setValidationState}
                                  setFieldValue={setFieldValue}
                                />
                              </div>
                            </Tab>
                            <Tab eventKey='productSection' title='Product Section'>
                              <div className='card-body bg-white'>
                                <ProductComponent
                                  handleChange={handleChange}
                                  touched={touched}
                                  errors={errors}
                                  values={values}
                                  productOptionOptions={productOption}
                                  productDataOptions={productDataOptions}
                                  validationState={validationState}
                                  setValidationState={setValidationState}
                                  setFieldValue={setFieldValue}
                                />
                              </div>
                            </Tab>
                            <Tab eventKey='helpSection' title='Help Section'>
                              <div className='card-body bg-white'>
                                <HelpSection
                                  handleChange={handleChange}
                                  touched={touched}
                                  errors={errors}
                                  values={values}
                                  setFieldValue={setFieldValue}
                                  helpSectionOptions={helpSectionOptions}
                                  validationState={validationState}
                                  setValidationState={setValidationState}
                                />
                              </div>
                            </Tab>
                            <Tab eventKey='applyNowSection' title='Apply Now Section'>
                              <div className='card-body bg-white'>
                                <ApplyNowSection
                                  handleChange={handleChange}
                                  touched={touched}
                                  errors={errors}
                                  values={values}
                                  applyNowSectionOptions={applyNowSectionOptions}
                                  validationState={validationState}
                                  setValidationState={setValidationState}
                                  setFieldValue={setFieldValue}
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
export default AddMenuModal
