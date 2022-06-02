export interface ProductOptionModel {
  id: string
  systemName: string
  displayName: string
}
export interface SortProductManagerModel {
  productManagerId: Array<{id: string}>
}

export interface SortProductManagerActionModel {
  payload: SortProductManagerModel
  type: {[key: string]: string}
}

export interface ProductComparisonStatusResponseModel {
  config: {[key: string]: string}
  data: {data: {productComparisonStatus: ProductOptionModel[]}}
  status: number
  statusText: string
}
export interface ProductPopularityResponseModel {
  config: {[key: string]: string}
  data: {data: {productPopularity: ProductOptionModel[]}}
  status: number
  statusText: string
}

export interface ProductApplyNowOptionResponseModel {
  config: {[key: string]: string}
  data: {data: {productApplyNowOption: ProductOptionModel[]}}
  status: number
  statusText: string
}

export interface ProductReviewOptionResponseModel {
  config: {[key: string]: string}
  data: {data: {productReviewOption: ProductOptionModel[]}}
  status: number
  statusText: string
}

export interface ProductRelatedOptionResponseModel {
  config: {[key: string]: string}
  data: {data: {productRelatedOption: ProductOptionModel[]}}
  status: number
  statusText: string
}

export interface ProductMediaTypeResponseModel {
  config: {[key: string]: string}
  data: {data: {productMediaType: ProductOptionModel[]}}
  status: number
  statusText: string
}
export interface ProductLeadFormOptionResponseModel {
  config: {[key: string]: string}
  data: {data: {productLeadFormOption: ProductOptionModel[]}}
  status: number
  statusText: string
}
export interface ProductInterestRateOptionResponseModel {
  config: {[key: string]: string}
  data: {data: {productInterestRateOption: ProductOptionModel[]}}
  status: number
  statusText: string
}

export interface ProductFeatureOptionResponseModel {
  config: {[key: string]: string}
  data: {data: {productFeatureOption: ProductOptionModel[]}}
  status: number
  statusText: string
}

export interface ProductFaqOptionResponseModel {
  config: {[key: string]: string}
  data: {data: {productFaqOption: ProductOptionModel[]}}
  status: number
  statusText: string
}

export interface ProductDocumentOptionResponseModel {
  config: {[key: string]: string}
  data: {data: {productDocumentOption: ProductOptionModel[]}}
  status: number
  statusText: string
}

export interface ProductCompetitorStatusResponseModel {
  config: {[key: string]: string}
  data: {data: {productCompetitorStatus: ProductOptionModel[]}}
  status: number
  statusText: string
}
