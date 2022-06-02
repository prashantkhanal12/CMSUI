export interface ProductManagerModel {
  id?: string
  title: string
  titleNp: string
  slug: string
  status: boolean | string
  order?: string
  productCategoryId?: string
  productCategory?: {[key: string]: string}
  shortDescription: string
  shortDescriptionNp: string
  description: string
  descriptionNp: string
  featuredInHomepage: boolean
  tags: {[key: string]: string}[]
  productPopularityId?: string
  productPopularity?: {[key: string]: string}
  productLeadForm?: {[key: string]: string}
  productLeadFormId?: string
  reviewId?: string
  productReview?: {[key: string]: string}
  rating?: string
  review?: string
  showInterestRateId?: string
  competitorStatusId?: string
  competitorStatus?: {[key: string]: string}
  interestRateId?: string
  pageHeader: {[key: string]: string}[]
  media: {[key: string]: string}[]
  productFeatureId?: string
  featureData: {[key: string]: string}[]
  productFeature: {[key: string]: string}[]
  features: {[key: string]: string}[]
  productFaq: {[key: string]: string}
  faq: {[key: string]: string}
  faqOptionId: string
  faqId?: string
  productDocumentId: string
  documentData: {[key: string]: string}[]
  productDocument?: {[key: string]: string}
  documents: {[key: string]: string}[]
  productRelatedId?: string
  productRelated?: {[key: string]: string}
  relatedData: {[key: string]: string}[]
  productApplyId: string
  productTags?: {productTag?: {[key: string]: string}[]}
  productApplyNow?: {[key: string]: string}
  applyData: {[key: string]: string}[]
  additionalData: {[key: string]: string}[]
  productComparisonId?: string
  comparisonData: {[key: string]: string}[]
  mediaSetting?: {[key: string]: string}
  featureSetting?: {[key: string]: string}
  documentSetting?: {[key: string]: string}
  additionalSetting?: {[key: string]: string}
  applyNowSetting?: {[key: string]: string}
  relatedSetting?: {[key: string]: string}
  interestRateOption?: {[key: string]: string}
  comparisonStatus?: {[key: string]: string}
  modelType?: string
}
