import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

//Formik/Rsuite Imports
import {Form, Formik} from 'formik'
import Modal from 'rsuite/Modal'
import PanelGroup from 'rsuite/PanelGroup'
import Panel from 'rsuite/Panel'
//Misc
import {BasicMenuInfo} from './BasicMenuInfo'
import {isEmpty} from 'lodash'
import {toast} from 'react-toastify'
import * as Yup from 'yup'
//Model and Component Import
import {ProductCategoryModel} from 'src/app/modules/products/components/productCategory/Model/ProductCategoryModel'
import {StateParamsModel} from 'src/app/modules/common/Model'
import {MenuOptionModal} from '../Model'
import {IMenuState} from '../redux/reducer'
import PageHeaderComponent from './PageHeaderComponent'
//Redux Import
import * as cms from 'src/app/modules/cms'
import * as productRedux from 'src/app/modules/products'
import * as categoryTypeRedux from 'src/app/modules/common'
import * as categories from 'src/app/modules/cms/components/categories'
import * as contentRedux from 'src/app/modules/cms/components/content'
import * as serviceManagerRedux from 'src/app/modules/services/components/serviceManager'
import {ContentModel} from '../../content/Model/ContentModal'
import {ServiceCategoryModel} from 'src/app/modules/grievance/components/serviceCategory/Model/ServiceCategoryModel'
import {ProductManagerModel} from 'src/app/modules/products/components/productManager/Model/ProductManagerModel'
import {MenuModal} from '../Model/MenuModal'

type Props = {
  open: boolean
  params: StateParamsModel
  setParams: any
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string().required('Menu title is required'),
  status: Yup.string().required('Status is required'),
  hideInWebsite: Yup.string().required('Hide in website field is required'),
  slug: Yup.string().required('Slug is required'),
  menuLinkType: Yup.string().required('Menu link type field is required'),
  menuType: Yup.string().required('Menu type field is required'),
  shortDescription: Yup.string().max(250, 'Short Description exceeds 250 words').nullable(),
  shortDescriptionNp: Yup.string()
    .max(250, 'Short Description Nepali exceeds 250 words')
    .nullable(),
})

const AddMenuModal = ({
  open,
  params,
  setParams,
  handleClose,
  actionType,
  editSelectedData,
}: Props) => {
  const dispatch = useDispatch()
  const [contentCategoryId, setContentCategoryId] = useState('')
  const [selectedContentCat, setSelectedContentCat] = useState('')
  const {
    menuIconType,
    menuLinkType,
    menuStatus,
    menuType,
    topMenu,
    visibilityOption,
    loading,
    success,
    data: {meta},
    menuList,
  } = useSelector((state: IMenuState | any) => state.menuManager)

  useEffect(() => {
    dispatch(cms.menu.actions.getAllMenu())
  }, [])

  const {
    allProductManager: {productManager},
  } = useSelector((state: IMenuState | any) => state.productManager)

  const {
    data: {content},
  } = useSelector((state: IMenuState | any) => state.content)

  const {serviceManagerList} = useSelector((state: IMenuState | any) => state.serviceManager)

  const {
    data: {categoryType},
  } = useSelector((state: any) => state.categoryType)
  const {
    data: {category},
  } = useSelector((state: any) => state.categories)

  useEffect(() => {
    const contentCategoryType = categoryType?.filter(
      (item: {[key: string]: string}) => item.system_name === 'content'
    )
    setContentCategoryId(contentCategoryType[0]?.id)
  }, [categoryType])

  useEffect(() => {
    if (!isEmpty(contentCategoryId)) {
      dispatch(categories.actions.getSpecificCmsCategories(contentCategoryId))
    }
  }, [contentCategoryId])

  useEffect(() => {
    dispatch(productRedux.productManager.actions.getAllProductManager())
    dispatch(serviceManagerRedux.actions.getServiceManagerList())
    dispatch(categoryTypeRedux.action.getCategoryType())
    dispatch(cms.menu.actions.getMenuVisibilityStatus())
    dispatch(cms.menu.actions.getMenuIconType())
    dispatch(cms.menu.actions.getMenuLinkType())
    dispatch(cms.menu.actions.getMenuStatus())
    dispatch(cms.menu.actions.getMenuType())
    dispatch(cms.menu.actions.getTopMenu())
  }, [])

  useEffect(() => {
    if (!isEmpty(selectedContentCat)) {
      dispatch(contentRedux.actions.getContentDataByCategoryId(selectedContentCat))
    }
  }, [selectedContentCat])

  //Create options from API for FormSelect
  const menuOptions = menuList?.menu?.map((items: any) => ({
    label: items.tableViewName,
    value: items.id,
    children: items?.children?.map((child: any) => ({
      label: child.tableViewName,
      value: child.id,
    })),
  }))

  const productDataOptions = productManager?.map((items: ProductManagerModel) => ({
    label: items.title,
    value: items.id,
  }))

  const contentCategoryOptions = category?.map((items: {[key: string]: string}) => ({
    label: items.name,
    value: items.id,
  }))

  const serviceDataOptions = serviceManagerList?.map((items: any) => ({
    label: items.title,
    value: items.id,
  }))

  const contentDataOptions = content?.map((items: ContentModel) => ({
    label: items.title,
    value: items.id,
  }))

  const iconTypeOptions = menuIconType?.map((items: MenuOptionModal) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))
  const linkTypeOptions = menuLinkType?.map((items: MenuOptionModal) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))

  const menuStatusOptions = menuStatus?.map((items: MenuOptionModal) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))
  const menuTypeOptions = menuType?.map((items: MenuOptionModal) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))
  const topMenuOptions = topMenu?.map((items: MenuOptionModal) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))
  const visibilityStatusOptions = visibilityOption?.map((items: MenuOptionModal) => ({
    label: items.displayName,
    value: items.id,
    systemName: items.systemName,
  }))

  useEffect(() => {
    if (success) {
      dispatch(cms.menu.actions.getMenu())
      isEmpty(editSelectedData)
        ? toast.success('Menu added successfully')
        : toast.success('Menu edited successfully')
      dispatch(cms.menu.actions.resetMenu())
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
          <Modal.Title>{actionType} Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body className='flexibleContainer'>
          <div>
            <Formik
              initialValues={{
                parentId: '',
                name: '',
                nameNp: '',
                slug: '',
                iconType: '',
                menuIcon: '',
                menuImage: '',
                menuType: '',
                featuredImage: '',
                featuredImageText: '',
                featuredImageTextNp: '',
                featuredImageUrl: '',
                status: '',
                menuLinkType: '',
                productId: '',
                contentId: '',
                url: '',
                file: '',
                serviceId: '',
                metaTitle: '',
                metaKeyword: '',
                metaDescription: '',
                headerImage: '',
                headerShortDescription: '',
                headerShortDescriptionNp: '',
                firstButtonText: '',
                firstButtonTextNp: '',
                firstButtonLink: '',
                secondButtonText: '',
                secondButtonTextNp: '',
                secondButtonLink: '',
                showNotificationBell: false,
                showToLoggedInUserOnly: false,
                hideInWebsite: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values, {setSubmitting}) => {
                const formData = {
                  ...values
                }
                if (!isEmpty(editSelectedData)) {
                  dispatch(cms.menu.actions.updateMenu(formData, editSelectedData?.id))
                } else {
                  dispatch(cms.menu.actions.addMenu(formData))
                }
              }}
            >
              {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'contentData',
                      'contentId',
                      'featuredImage',
                      'featuredImageText',
                      'featuredImageTextNp',
                      'featuredImageUrl',
                      'file',
                      'firstButtonLink',
                      'firstButtonText',
                      'firstButtonTextNp',
                      'headerImage',
                      'headerShortDescription',
                      'headerShortDescriptionNp',
                      'hideInWebsite',
                      'iconType',
                      'id',
                      'menuIcon',
                      'menuImage',
                      'menuLinkType',
                      'menuType',
                      'metaKeyword',
                      'metaTitle',
                      'name',
                      'nameNp',
                      'orderId',
                      'parentId',
                      'productId',
                      'secondButtonLink',
                      'secondButtonText',
                      'secondButtonTextNp',
                      'serviceId',
                      'showNotificationBell',
                      'showToLoggedInUserOnly',
                      'slug',
                      'status',
                      'tableViewName',
                      'url',
                    ]
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                  }
                }, [])

                return (
                  <Form>
                    <div className='card-body border-top'>
                      <div className=''>
                        <div className='row'>
                          <PanelGroup accordion>
                            <Panel
                              header='Basic Menu Info'
                              style={{
                                overflow: 'visible',
                              }}
                              defaultExpanded
                            >
                              <BasicMenuInfo
                                iconTypeOptions={iconTypeOptions}
                                linkTypeOptions={linkTypeOptions}
                                menuStatusOptions={menuStatusOptions}
                                menuTypeOptions={menuTypeOptions}
                                topMenuOptions={topMenuOptions}
                                menuOptions={menuOptions}
                                contentDataOptions={contentDataOptions}
                                productDataOptions={productDataOptions}
                                contentCategoryOptions={contentCategoryOptions}
                                setSelectedContentCat={setSelectedContentCat}
                                serviceDataOptions={serviceDataOptions}
                                editSelectedData={editSelectedData}
                                visibilityStatusOptions={visibilityStatusOptions}
                                handleChange={handleChange}
                                setFieldValue={setFieldValue}
                                touched={touched}
                                values={values}
                                errors={errors}
                              />
                            </Panel>
                            <Panel header='Page Header Settings'>
                              <PageHeaderComponent
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                                setFieldValue={setFieldValue}
                                values={values}
                                editSelectedData={editSelectedData}
                              />
                            </Panel>
                          </PanelGroup>
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
