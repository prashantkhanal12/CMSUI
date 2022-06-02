import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'

import * as auth from 'src/app/modules/auth'
import * as profile from 'src/app/modules/profileComponent'
import {globalErrorReducer} from 'src/app/modules/errors/redux/reducer'
import * as siteModule from 'src/app/modules/siteSettings'
import * as userManagement from 'src/app/modules/userMgmt'
import * as userRole from 'src/app/modules/userMgmt/components/userRoles'
import * as departments from 'src/app/modules/userMgmt/components/departments'
import * as rolePermission from 'src/app/modules/common'
import * as cms from 'src/app/modules/cms'
import * as newsAndNotices from 'src/app/modules/newsAndNotices'
import * as goldRate from 'src/app/modules/rates/components/goldRate'
import * as forexRate from 'src/app/modules/rates/components/forexRate'
import * as interestRate from 'src/app/modules/rates/components/interestRate'
import * as goldRateCategory from 'src/app/modules/rates/goldRateCategory/redux'
import * as forexRateCategory from 'src/app/modules/rates/forexRateCategory/redux'
import * as updateNotes from 'src/app/modules/rates/components/updateNotes'
import * as network from 'src/app/modules/network'
import * as membership from 'src/app/modules/membership'
import * as financialDocument from 'src/app/modules/financialDocument'
import * as grievanceHandling from 'src/app/modules/grievance'
import * as merchant from 'src/app/modules/merchantAndOffers'
import * as products from 'src/app/modules/products'
import * as banner from 'src/app/modules/cms/components/banner/redux'
import * as customerTestimonials from 'src/app/modules/cms/components/customer-testimonials/redux'
import * as textPopup from 'src/app/modules/cms/components/textPopup/redux'
import * as roadBlockPopup from 'src/app/modules/cms/components/roadblockPopup/redux'
import * as mediaManager from 'src/app/modules/common/components/fileManager'
import * as faqCategory from 'src/app/modules/cms/components/faqCategory/redux'
import * as faqManager from 'src/app/modules/cms/components/faqManager/redux'
import * as faqIconType from 'src/app/modules/cms/components/faqCategory/faqIconType/redux'
import * as csr from 'src/app/modules/cms/components/csr'
import * as gallery from 'src/app/modules/cms/components/gallery/redux'
import * as serviceCategoryOne from 'src/app/modules/services/components/serviceCategory/redux'
import * as serviceTag from 'src/app/modules/services/components/serviceTag/redux'
import * as applyLoan from 'src/app/modules/reports/components/applyLoan/redux'
import * as municipality from 'src/app/modules/reports/components/municipality/components/redux'
import * as emailTemplate from 'src/app/modules/cms/components/emailTemplate/redux'
import * as services from 'src/app/modules/services'
import * as formsDownload from 'src/app/modules/formsAndDownload'
import * as Qualification from 'src/app/modules/CarrierSetting/components/Qualification/redux'
import * as position from 'src/app/modules/CarrierSetting/components/Position/redux'
import * as functionalArea from 'src/app/modules/CarrierSetting/components/FunctionalArera/redux'

export const rootReducer = combineReducers({
  auth: auth.reducer,
  globalError: globalErrorReducer,
  smtp: siteModule.smtp.reducer,
  key: siteModule.key.reducer,
  groupSetting: siteModule.groupSetting.reducer,
  settingType: siteModule.settings.reducer,
  userManagement: userManagement.reducer,
  module: siteModule.module.reducer,
  permission: rolePermission.reducer,
  place: rolePermission.placeReducer,
  categoryType: rolePermission.categoryTypeReducer,
  customerTestimonialMediaType: rolePermission.mediaTypeReducer,
  role: userManagement.roles.reducer,
  userRoles: userRole.reducer,
  departments: departments.reducer,
  profile: profile.reducer,
  menuManager: cms.menu.reducer,
  content: cms.content.reducer,
  categories: cms.categories.reducer,
  //Rate
  goldRate: goldRate.reducer,
  goldRateFile: goldRate.reducer1,
  goldRateCategory: goldRateCategory.reducer,
  forexRate: forexRate.reducer,
  forexRateFile: forexRate.reducer1,
  forexRateCategory: forexRateCategory.reducer,
  interestRate: interestRate.reducer,
  updateNotes: updateNotes.reducer,
  //Branch
  branch: network.branch.reducer,
  branchless: network.branchless.reducer,
  manager: network.branchManager.reducer,
  atm: network.atm.reducer,
  exportBranchlessBankingFile: network.branchless.reducer1,
  operationIncharge: network.operationIncharge.reducer,
  exportOperationIncharge: network.operationIncharge.reducer1,
  //CMS
  banner: banner.reducer,
  emailTemplate: emailTemplate.reducer,
  textPopup: textPopup.reducer,
  roadBlockPopup: roadBlockPopup.reducer,
  faqCategory: faqCategory.reducer,
  faqManager: faqManager.reducer,
  gallery: gallery.reducer,

  customerTestimonials: customerTestimonials.reducer,
  subCategory: newsAndNotices.subCategory.reducer,
  news: newsAndNotices.news.reducer,
  notices: newsAndNotices.notices.reducer,

  //Membership
  memberType: membership.memberType.reducer,
  memberSubType: membership.memberSubType.reducer,
  member: membership.member.reducer,
  mediaManager: mediaManager.reducer,
  faqIconType: faqIconType.reducer,

  //Service
  serviceCategoryOne: serviceCategoryOne.reducer,
  serviceTag: serviceTag.reducer,
  //Grievance Handling
  serviceCategory: grievanceHandling.serviceCategory.reducer,
  serviceType: grievanceHandling.serviceType.reducer,
  serviceSubType: grievanceHandling.serviceSubType.reducer,
  grievance: grievanceHandling.grievance.reducer,

  //Financial Document Handling
  documentCategory: financialDocument.documentCategory.reducer,
  documentSubCategory: financialDocument.documentSubCategory.reducer,
  manageDocument: financialDocument.manageDocument.reducer,

  //Merchant and Offers
  merchantSubCategory: merchant.merchantSubCategory.reducer,
  merchantManager: merchant.merchantManager.reducer,
  offers: merchant.offers.reducer,

  //Products
  productCategory: products.productCategory.reducer,
  productTag: products.productTag.reducer,
  productComparisonCategory: products.productComparisonCategory.reducer,
  productComparisonSubCategory: products.productComparisonSubCategory.reducer,
  productManager: products.productManager.reducer,

  //mediaManager: mediaManager.reducer,
  csr: csr.reducer,
  //Loan
  applyLoan: applyLoan.reducer,
  serviceManager: services.serviceManager.reducer,
  municipality: municipality.reducer,

  //Forms and Download
  formsAndDownload: formsDownload.formAndDownload.reducer,
  // qualification
  Qualification: Qualification.reducer,
  // position: position.reducer,
  position: position.reducer,

  functionalArea: functionalArea.reducer,

  //Contact Person
  contactPerson: siteModule.contactPerson.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  yield all([
    auth.saga(),
    siteModule.smtp.saga(),
    siteModule.key.saga(),
    siteModule.settings.saga(),
    siteModule.groupSetting.saga(),
    siteModule.module.saga(),
    userRole.saga(),
    departments.saga(),
    rolePermission.saga(),
    userManagement.saga(),
    userManagement.roles.saga(),
    profile.saga(),
    cms.menu.saga(),
    cms.content.saga(),
    cms.categories.saga(),
    //Rate
    goldRate.saga(),
    goldRateCategory.saga(),
    forexRate.saga(),
    forexRateCategory.saga(),
    interestRate.saga(),
    updateNotes.saga(),
    //Network
    network.branch.saga(),
    network.atm.saga(),
    network.branchless.saga(),
    network.operationIncharge.saga(),
    network.branchManager.saga(),
    banner.saga(),
    customerTestimonials.saga(),
    newsAndNotices.subCategory.saga(),
    newsAndNotices.news.saga(),
    newsAndNotices.notices.saga(),
    textPopup.saga(),
    roadBlockPopup.saga(),
    //Membership
    membership.memberType.saga(),
    membership.memberSubType.saga(),
    membership.member.saga(),
    mediaManager.saga(),
    faqCategory.saga(),
    faqManager.saga(),
    faqIconType.saga(),

    //Grievance Handling
    grievanceHandling.serviceCategory.saga(),
    grievanceHandling.serviceType.saga(),
    grievanceHandling.serviceSubType.saga(),
    grievanceHandling.grievance.saga(),
    csr.saga(),
    //Financial Document Handling
    financialDocument.documentCategory.saga(),
    financialDocument.documentSubCategory.saga(),
    financialDocument.manageDocument.saga(),

    //Merchant and Offers
    merchant.merchantSubCategory.saga(),
    merchant.merchantManager.saga(),
    merchant.offers.saga(),
    // Products
    products.productCategory.saga(),
    products.productTag.saga(),
    products.productComparisonCategory.saga(),
    products.productComparisonSubCategory.saga(),
    products.productManager.saga(),
    //
    gallery.saga(),
    //Service
    serviceCategoryOne.saga(),
    serviceTag.saga(),
    //Loan
    applyLoan.saga(),
    emailTemplate.saga(),
    services.serviceManager.saga(),
    municipality.saga(),
    formsDownload.formAndDownload.saga(),
    Qualification.saga(),
    position.saga(),
    functionalArea.saga(),
    //Contact Person
    siteModule.contactPerson.saga(),
  ])
}
