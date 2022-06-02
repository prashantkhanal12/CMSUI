import {ParamsModel} from 'src/app/modules/common/Model'
import {ProductOptionModel, SortProductManagerModel} from '../Model'
import {ProductManagerModel} from '../Model/ProductManagerModel'
import {actionTypes} from './constants'
export const actions = {
  // get ProductManager
  getAllProductManager: (id: string = '') => ({
    type: actionTypes.GET_ALL_PRODUCT_MANAGER_START,
    payload: id,
  }),
  getAllProductManagerSuccess: (data: ProductManagerModel | any) => ({
    type: actionTypes.GET_ALL_PRODUCT_MANAGER_SUCCESS,
    payload: data,
  }),
  getAllProductManagerFinish: () => ({
    type: actionTypes.GET_ALL_PRODUCT_MANAGER_FINISH,
  }),

  // get ProductManager
  getProductManagerByTag: (id: string = '') => ({
    type: actionTypes.GET_PRODUCT_MANAGER_BY_TAG_START,
    payload: id,
  }),
  getProductManagerByTagSuccess: (data: ProductManagerModel | any) => ({
    type: actionTypes.GET_PRODUCT_MANAGER_BY_TAG_SUCCESS,
    payload: data,
  }),
  getProductManagerByTagFinish: () => ({
    type: actionTypes.GET_PRODUCT_MANAGER_BY_TAG_FINISH,
  }),

  // get product ComparisonStatus
  getProductComparisonStatus: () => ({
    type: actionTypes.GET_PRODUCT_COMPARISON_STATUS_START,
  }),
  getProductComparisonStatusSuccess: (data: {productComparisonStatus: ProductOptionModel[]}) => ({
    type: actionTypes.GET_PRODUCT_COMPARISON_STATUS_SUCCESS,
    payload: data,
  }),
  getProductComparisonStatusFinish: () => ({
    type: actionTypes.GET_PRODUCT_COMPARISON_STATUS_FINISH,
  }),

  // get product popularity
  getProductPopularity: () => ({
    type: actionTypes.GET_PRODUCT_POPULARITY_START,
  }),
  getProductPopularitySuccess: (data: {productPopularity: ProductOptionModel[]}) => ({
    type: actionTypes.GET_PRODUCT_POPULARITY_SUCCESS,
    payload: data,
  }),
  getProductPopularityFinish: () => ({
    type: actionTypes.GET_PRODUCT_POPULARITY_FINISH,
  }),

  // get product Apply Now Option
  getProductApplyNowOption: () => ({
    type: actionTypes.GET_PRODUCT_APPLY_NOW_OPTION_START,
  }),
  getProductApplyNowOptionSuccess: (data: {productApplyNowOption: ProductOptionModel[]}) => ({
    type: actionTypes.GET_PRODUCT_APPLY_NOW_OPTION_SUCCESS,
    payload: data,
  }),
  getProductApplyNowOptionFinish: () => ({
    type: actionTypes.GET_PRODUCT_APPLY_NOW_OPTION_FINISH,
  }),

  // get product Review Option
  getProductReviewOption: () => ({
    type: actionTypes.GET_PRODUCT_REVIEW_OPTION_START,
  }),
  getProductReviewOptionSuccess: (data: {productReviewOption: ProductOptionModel[]}) => ({
    type: actionTypes.GET_PRODUCT_REVIEW_OPTION_SUCCESS,
    payload: data,
  }),
  getProductReviewOptionFinish: () => ({
    type: actionTypes.GET_PRODUCT_REVIEW_OPTION_FINISH,
  }),

  // get product Related Option
  getProductRelatedOption: () => ({
    type: actionTypes.GET_PRODUCT_RELATED_OPTION_START,
  }),
  getProductRelatedOptionSuccess: (data: {productRelatedOption: ProductOptionModel[]}) => ({
    type: actionTypes.GET_PRODUCT_RELATED_OPTION_SUCCESS,
    payload: data,
  }),
  getProductRelatedOptionFinish: () => ({
    type: actionTypes.GET_PRODUCT_RELATED_OPTION_FINISH,
  }),

  // get product MediaType
  getProductMediaType: () => ({
    type: actionTypes.GET_PRODUCT_MEDIA_TYPE_START,
  }),
  getProductMediaTypeSuccess: (data: {productMediaType: ProductOptionModel[]}) => ({
    type: actionTypes.GET_PRODUCT_MEDIA_TYPE_SUCCESS,
    payload: data,
  }),
  getProductMediaTypeFinish: () => ({
    type: actionTypes.GET_PRODUCT_MEDIA_TYPE_FINISH,
  }),

  // get product LeadFormOption
  getProductLeadFormOption: () => ({
    type: actionTypes.GET_PRODUCT_LEAD_FORM_OPTION_START,
  }),
  getProductLeadFormOptionSuccess: (data: {productLeadFormOption: ProductOptionModel[]}) => ({
    type: actionTypes.GET_PRODUCT_LEAD_FORM_OPTION_SUCCESS,
    payload: data,
  }),
  getProductLeadFormOptionFinish: () => ({
    type: actionTypes.GET_PRODUCT_LEAD_FORM_OPTION_FINISH,
  }),

  // get product InterestRateOption
  getProductInterestRateOption: () => ({
    type: actionTypes.GET_PRODUCT_INTEREST_RATE_OPTION_START,
  }),
  getProductInterestRateOptionSuccess: (data: {
    productInterestRateOption: ProductOptionModel[]
  }) => ({
    type: actionTypes.GET_PRODUCT_INTEREST_RATE_OPTION_SUCCESS,
    payload: data,
  }),
  getProductInterestRateOptionFinish: () => ({
    type: actionTypes.GET_PRODUCT_INTEREST_RATE_OPTION_FINISH,
  }),

  // get product FeatureOption
  getProductFeatureOption: () => ({
    type: actionTypes.GET_PRODUCT_FEATURE_OPTION_START,
  }),
  getProductFeatureOptionSuccess: (data: {productFeatureOption: ProductOptionModel[]}) => ({
    type: actionTypes.GET_PRODUCT_FEATURE_OPTION_SUCCESS,
    payload: data,
  }),
  getProductFeatureOptionFinish: () => ({
    type: actionTypes.GET_PRODUCT_FEATURE_OPTION_FINISH,
  }),

  // get product FaqOption
  getProductFaqOption: () => ({
    type: actionTypes.GET_PRODUCT_FAQ_OPTION_START,
  }),
  getProductFaqOptionSuccess: (data: {productFaqOption: ProductOptionModel[]}) => ({
    type: actionTypes.GET_PRODUCT_FAQ_OPTION_SUCCESS,
    payload: data,
  }),
  getProductFaqOptionFinish: () => ({
    type: actionTypes.GET_PRODUCT_FAQ_OPTION_FINISH,
  }),

  // get product DocumentOption
  getProductDocumentOption: () => ({
    type: actionTypes.GET_PRODUCT_DOCUMENT_OPTION_START,
  }),
  getProductDocumentOptionSuccess: (data: {productDocumentOption: ProductOptionModel[]}) => ({
    type: actionTypes.GET_PRODUCT_DOCUMENT_OPTION_SUCCESS,
    payload: data,
  }),
  getProductDocumentOptionFinish: () => ({
    type: actionTypes.GET_PRODUCT_DOCUMENT_OPTION_FINISH,
  }),

  // get product CompetitorStatus
  getProductCompetitorStatus: () => ({
    type: actionTypes.GET_PRODUCT_COMPETITOR_STATUS_START,
  }),
  getProductCompetitorStatusSuccess: (data: {productCompetitorStatus: ProductOptionModel[]}) => ({
    type: actionTypes.GET_PRODUCT_COMPETITOR_STATUS_SUCCESS,
    payload: data,
  }),
  getProductCompetitorStatusFinish: () => ({
    type: actionTypes.GET_PRODUCT_COMPETITOR_STATUS_FINISH,
  }),
  // get ProductManager DATA
  getProductManager: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_PRODUCT_MANAGER_START,
    payload: params,
  }),
  getProductManagerSuccess: (data: ProductManagerModel | any) => ({
    type: actionTypes.GET_PRODUCT_MANAGER_SUCCESS,
    payload: data,
  }),
  getProductManagerFinish: () => ({
    type: actionTypes.GET_PRODUCT_MANAGER_FINISH,
  }),

  // create key
  addProductManager: (data: ProductManagerModel | any) => ({
    type: actionTypes.ADD_PRODUCT_MANAGER_START,
    payload: data,
  }),
  addProductManagerSuccess: (task: ProductManagerModel | any) => ({
    type: actionTypes.ADD_PRODUCT_MANAGER_SUCCESS,
    payload: task,
  }),
  addProductManagerFinish: () => ({
    type: actionTypes.ADD_PRODUCT_MANAGER_FINISH,
  }),
  resetProductManager: () => ({
    type: actionTypes.RESET_PRODUCT_TAG,
  }),

  //Update ProductManager
  updateProductManager: (data: ProductManagerModel | any, id: string) => ({
    type: actionTypes.UPDATE_PRODUCT_MANAGER_START,
    payload: data,
    id,
  }),

  updateProductManagerSuccess: (data: any) => ({
    type: actionTypes.UPDATE_PRODUCT_MANAGER_SUCCESS,
    payload: data,
  }),

  updateProductManagerFinish: () => ({
    type: actionTypes.UPDATE_PRODUCT_MANAGER_FINISH,
  }),

  // delete key
  deleteProductManager: (data: {id: string}[]) => ({
    type: actionTypes.DELETE_PRODUCT_MANAGER_START,
    payload: {productManagerId: data},
  }),
  deleteProductManagerSuccess: (data: any) => ({
    type: actionTypes.DELETE_PRODUCT_MANAGER_SUCCESS,
    payload: data,
  }),
  deleteProductManagerFinish: () => ({
    type: actionTypes.DELETE_PRODUCT_MANAGER_FINISH,
  }),

  //Enable ProductManager
  enableProductManager: (data: {id: string}[]) => ({
    type: actionTypes.ENABLE_PRODUCT_MANAGER_REQUEST,
    payload: {data},
  }),

  enableProductManagerSuccess: (task: any) => ({
    type: actionTypes.ENABLE_PRODUCT_MANAGER_SUCCESS,
    payload: task,
  }),
  enableProductManagerFinish: () => ({
    type: actionTypes.ENABLE_PRODUCT_MANAGER_FINISH,
  }),

  //Disable ProductManager
  disableProductManager: (data: {id: string}[]) => ({
    type: actionTypes.DISABLE_PRODUCT_MANAGER_REQUEST,
    payload: {data},
  }),

  disableProductManagerSuccess: (task: any) => ({
    type: actionTypes.DISABLE_PRODUCT_MANAGER_SUCCESS,
    payload: task,
  }),
  disableProductManagerFinish: () => ({
    type: actionTypes.DISABLE_PRODUCT_MANAGER_FINISH,
  }),

  //Enable ProductManager
  singleEnableProductManager: (data: {id: string}) => ({
    type: actionTypes.SINGLE_ENABLE_PRODUCT_MANAGER_REQUEST,
    payload: {data},
  }),

  singleEnableProductManagerSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_PRODUCT_MANAGER_SUCCESS,
    payload: task,
  }),
  singleEnableProductManagerFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_PRODUCT_MANAGER_FINISH,
  }),

  //Disable ProductManager
  singleDisableProductManager: (data: {id: string}) => ({
    type: actionTypes.SINGLE_DISABLE_PRODUCT_MANAGER_REQUEST,
    payload: {data},
  }),

  singleDisableProductManagerSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_PRODUCT_MANAGER_SUCCESS,
    payload: task,
  }),
  singleDisableProductManagerFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_PRODUCT_MANAGER_FINISH,
  }),

  // sort
  sortProductManager: (data: SortProductManagerModel) => ({
    type: actionTypes.SORT_PRODUCT_MANAGER_START,
    payload: data,
  }),
  sortProductManagerSuccess: (data: Array<ProductManagerModel>) => ({
    type: actionTypes.SORT_PRODUCT_MANAGER_SUCCESS,
    payload: data,
  }),
  sortProductManagerFinish: () => ({
    type: actionTypes.SORT_PRODUCT_MANAGER_FINISH,
  }),
  sortProductManagerReset: () => ({
    type: actionTypes.SORT_PRODUCT_MANAGER_RESET,
  }),
}
