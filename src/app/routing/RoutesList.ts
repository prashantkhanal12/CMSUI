import {lazy} from 'react'

import BackendSettings from '../modules/siteSettings/components/backendSettings/components'
import ContactSetting from '../modules/siteSettings/components/contactSettings/ContactSetting'
import HomepageSetting from '../modules/siteSettings/components/homepageSettings/HomepageSetting'
import ModuleManager from '../modules/siteSettings/components/moduleManager/components/ModuleManager'
import UserManagementIndex from '../modules/userMgmt/components/users/components/users'
import Departments from '../modules/userMgmt/components/departments/components'
import UserRoleManagementIndex from '../modules/userMgmt/components/userRoles/UserRole'
import RoleManagementIndex from '../modules/userMgmt/components/roles/components/RoleMgmt'
import Settings from '../modules/siteSettings/components/settings/components'
import GroupSettings from '../modules/siteSettings/components/settings/groupSetting/components'
import SmtpSettings from '../modules/siteSettings/components/smtpSetting/components'
import KeySettings from '../modules/siteSettings/components/keySetting/components'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import GoldRates from '../modules/rates/components/goldRate/components'
import {RouteComponentProps} from 'react-router-dom'
import MenuManager from '../modules/cms/components/menu/components'
import ContentManager from 'src/app/modules/cms/components/content/components/index'
import Categories from 'src/app/modules/cms/components/categories/components'
import ForexRates from '../modules/rates/components/forexRate/components'
import BranchComponent from '../modules/network/components/branch/component'
import BranchlessComponent from '../modules/network/components/branchless/component'
import OperationIncharge from '../modules/network/components/operationIncharge/components'
import Banner from '../modules/cms/components/banner/components'
import CustomerTestimonialsComponent from '../modules/cms/components/customer-testimonials/components'
import AtmComponent from '../modules/network/components/atm/component'
import Csr from '../modules/cms/components/csr/components'

import News from '../modules/newsAndNotices/components/news/components'
import Notices from '../modules/newsAndNotices/components/notices/components'
import SubCategory from '../modules/newsAndNotices/components/subCategory/components'
import BranchManagerComponent from '../modules/network/components/branchManager/component'
import TextPopup from '../modules/cms/components/textPopup/components'
import MemberTypeComponent from '../modules/membership/components/memberType/component'
import RoadBlockPopup from '../modules/cms/components/roadblockPopup/components'
import MemberComponent from '../modules/membership/components/member/component'
import ServiceCategoryComponent from '../modules/grievance/components/serviceCategory/component'
import MemberSubTypeComponent from '../modules/membership/components/memberSubType/component'
import FaqCategory from '../modules/cms/components/faqCategory/components'
import ServiceTypeComponent from '../modules/grievance/components/serviceType/component'
import ServiceSubTypeComponent from '../modules/grievance/components/serviceSubType/component'
import DocumentCategoryComponent from '../modules/financialDocument/components/documentCategory/component'
import DocumentSubCategoryComponent from '../modules/financialDocument/components/documentSubCategory/component'
import DocumentManagerComponent from '../modules/financialDocument/components/documentManager/component'
import FaqManager from '../modules/cms/components/faqManager/components'
import MerchantSubCategoryComponent from '../modules/merchantAndOffers/components/merchantSubCategory/component'
import MerchantManagerComponent from '../modules/merchantAndOffers/components/merchantManager/component'
import Gallery from '../modules/cms/components/gallery/components'
import OfferComponent from '../modules/merchantAndOffers/components/offers/component'
import InterestRate from '../modules/rates/components/interestRate/components'
import ProductCategoryComponent from '../modules/products/components/productCategory/component'
import ProductTagComponent from '../modules/products/components/productTag/component'
import ProductComparisonCategoryComponent from '../modules/products/components/productComparisonCategory/component'
import ProductComparisonSubCategoryComponent from '../modules/products/components/productComparisonSubCategory/component'
import ProductManagerComponent from '../modules/products/components/productManager/component'
import GrievanceHandlingComponent from '../modules/grievance/components/grievanceHandling/component'
import ServiceCategoryOne from '../modules/services/components/serviceCategory/components'
import ServiceTag from '../modules/services/components/serviceTag/components'
import ApplyLoan from '../modules/reports/components/applyLoan/components'
import EmailTemplate from '../modules/cms/components/emailTemplate/components'
import applyforMembership from '../modules/cms/components/applyforMembership/components'
import FormDownloadComponent from '../modules/formsAndDownload/components/formsDownload/component'
import QUALIFICATION from 'src/app/modules/CarrierSetting/components/Qualification/components'
import ContactPersonComponent from '../modules/siteSettings/components/contactPersonSetting/component'
import Position from 'src/app/modules/CarrierSetting/components/Position/components'
import FunctionalArea from 'src/app/modules/CarrierSetting/components/FunctionalArera/components'

const ServiceManager = lazy(
  () => import('../modules/services/components/serviceManager/components')
)

export interface RouteModel {
  path?: any
  component?: React.ComponentType<RouteComponentProps>
  exact?: boolean
}

export const RouteList = [
  {
    path: '/dashboard',
    component: DashboardWrapper,
    exact: true,
  },
  {
    path: '/cms/content',
    component: ContentManager,
    exact: true,
  },
  {
    path: '/report/apply-loan',
    component: ApplyLoan,
    exact: true,
  },
  {
    path: '/service/service-category',
    component: ServiceCategoryOne,
    exact: true,
  },
  {
    path: '/service/service-tag',
    component: ServiceTag,
    exact: true,
  },
  {
    path: '/cms/menu-manager',
    component: MenuManager,
    exact: true,
  },
  {
    path: '/cms/banner',
    component: Banner,
    exact: true,
  },
  {
    path: '/cms/csr',
    component: Csr,
    exact: true,
  },
  {
    path: '/popup/text-popup',
    component: TextPopup,
    exact: true,
  },
  {
    path: '/career-setting/position',
    component: Position,
    exact: true,
  },
  {
    path: '/popup/road-block-popup',
    component: RoadBlockPopup,
    exact: true,
  },
  {
    path: '/cms/manage-faqs',
    component: FaqCategory,
    exact: true,
  },
  {
    path: '/cms/update-faqs/:id',
    component: FaqManager,
    exact: true,
  },
  {
    path: '/cms/email-template',
    component: EmailTemplate,
    exact: true,
  },
  {
    path: '/dashbord/cms/gallery',
    component: Gallery,
    exact: true,
  },
  {
    path: '/rates/interest-rate',
    component: InterestRate,
    exact: true,
  },
  {
    path: '/cms/customer-testimonials',
    component: CustomerTestimonialsComponent,
    exact: true,
  },
  {
    path: '/usermanagement/users',
    component: UserManagementIndex,
    exact: true,
  },
  {
    path: '/usermanagement/user-role',
    component: UserRoleManagementIndex,
    exact: true,
  },
  {
    path: '/usermanagement/role',
    component: RoleManagementIndex,
    exact: true,
  },
  {
    path: '/usermanagement/departments',
    component: Departments,
    exact: true,
  },
  {
    path: '/sitesetting/module',
    component: ModuleManager,
    exact: true,
  },
  {
    path: '/sitesetting/contact-setting',
    component: ContactSetting,
    exact: true,
  },
  {
    path: '/sitesetting/homepage-setting',
    component: HomepageSetting,
    exact: true,
  },
  {
    path: '/sitesetting/backend-setting',
    component: BackendSettings,
    exact: true,
  },
  {
    path: '/sitesetting/setting',
    component: Settings,
    exact: true,
  },
  {
    path: '/sitesetting/smtp-setting',
    component: SmtpSettings,
    exact: true,
  },
  {
    path: '/sitesetting/key-setting',
    component: KeySettings,
    exact: true,
  },

  {
    path: '/rates/gold-rates',
    component: GoldRates,
    exact: true,
  },
  {
    path: '/rates/forex-rates',
    component: ForexRates,
    exact: true,
  },
  {
    path: '/network/branch',
    component: BranchComponent,
    exact: true,
  },
  {
    path: '/network/branch-manager',
    component: BranchManagerComponent,
    exact: true,
  },
  {
    path: '/network/atm',
    component: AtmComponent,
    exact: true,
  },
  {
    path: '/network/branchless-banking',
    component: BranchlessComponent,
    exact: true,
  },
  {
    path: '/network/operation-incharge',
    component: OperationIncharge,
    exact: true,
  },
  {
    path: '/news-and-notices/news',
    component: News,
    exact: true,
  },
  {
    path: '/news-and-notices/notices',
    component: Notices,
    exact: true,
  },
  {
    path: '/news-and-notices/sub-category',
    component: SubCategory,
    exact: true,
  },
  {
    path: '/cms/categories',
    component: Categories,
    exact: true,
  },

  //MemberShip Module
  {
    path: '/membership/member-type',
    component: MemberTypeComponent,
    exact: true,
  },
  {
    path: '/membership/member-sub-type',
    component: MemberSubTypeComponent,
    exact: true,
  },
  {
    path: '/membership/member',
    component: MemberComponent,
    exact: true,
  },

  //Grievance Module
  {
    path: '/grievance/service-category',
    component: ServiceCategoryComponent,
    exact: true,
  },
  {
    path: '/grievance/service-type',
    component: ServiceTypeComponent,
    exact: true,
  },
  {
    path: '/grievance/service-sub-type',
    component: ServiceSubTypeComponent,
    exact: true,
  },
  {
    path: '/grievance/grievance-manager',
    component: GrievanceHandlingComponent,
    exact: true,
  },

  //Document Handling
  {
    path: '/document/document-category',
    component: DocumentCategoryComponent,
    exact: true,
  },
  {
    path: '/document/document-sub-category',
    component: DocumentSubCategoryComponent,
    exact: true,
  },
  {
    path: '/document/manage-document',
    component: DocumentManagerComponent,
    exact: true,
  },

  //Merchant and Offers
  {
    path: '/merchant-and-offers/merchant-sub-category',
    component: MerchantSubCategoryComponent,
    exact: true,
  },

  {
    path: '/merchant-and-offers/merchant',
    component: MerchantManagerComponent,
    exact: true,
  },
  {
    path: '/merchant-and-offers/offers',
    component: OfferComponent,
    exact: true,
  },

  //Products
  {
    path: '/products/product-category',
    component: ProductCategoryComponent,
    exact: true,
  },
  {
    path: '/products/product-tags',
    component: ProductTagComponent,
    exact: true,
  },
  {
    path: '/products/product-comparison-category',
    component: ProductComparisonCategoryComponent,
    exact: true,
  },
  {
    path: '/products/product-comparison-sub-category',
    component: ProductComparisonSubCategoryComponent,
    exact: true,
  },
  {
    path: '/products/product-manager',
    component: ProductManagerComponent,
    exact: true,
  },
  {
    path: '/service/service-category',
    component: ServiceCategoryOne,
    exact: true,
  },
  {
    path: '/service/service-tag',
    component: ServiceTag,
    exact: true,
  },
  {
    path: '/service/service-manager',
    component: ServiceManager,
    exact: true,
  },
  {
    path: '/cms/apply-for-membership',
    component: applyforMembership,
    exact: true,
  },
  {
    path: '/cms/forms-and-download',
    component: FormDownloadComponent,
    exact: true,
  },
  {
    path: '/career-setting/qualification',
    component: QUALIFICATION,
    exact: true,
  },
  {
    path: '/career-setting/functional-area',
    component: FunctionalArea,
    exact: true,
  },
]
