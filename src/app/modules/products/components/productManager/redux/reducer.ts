import {Action} from 'redux'
import {ProductOptionModel} from '../Model'
import {ProductManagerModel} from '../Model/ProductManagerModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialProductManagerState: IProductManagerState = {
  data: {
    productManager: [],
    meta: [],
  },
  allProductManager: [],
  sortProductManagerData: [],
  productPopularity: [],
  productComparisonStatus: [],
  productApplyNowOption: [],
  productCompetitorStatus: [],
  productDocumentOption: [],
  productFaqOption: [],
  productFeatureOption: [],
  productInterestRateOption: [],
  productLeadFormOption: [],
  productMediaType: [],
  productRelatedOption: [],
  productReviewOption: [],
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IProductManagerState {
  data?: {
    productManager?: ProductManagerModel[]
    meta?: {[key: string]: string | number}[]
  }
  sortProductManagerData: IProductManagerState[]
  productPopularity?: ProductOptionModel[]
  productComparisonStatus?: ProductOptionModel[]
  allProductManager?: ProductManagerModel[]
  productManagerByTag?: ProductManagerModel[]
  productApplyNowOption: ProductOptionModel[]
  productCompetitorStatus: ProductOptionModel[]
  productDocumentOption: ProductOptionModel[]
  productFaqOption: ProductOptionModel[]
  productFeatureOption: ProductOptionModel[]
  productLeadFormOption: ProductOptionModel[]
  productInterestRateOption: ProductOptionModel[]
  productMediaType: ProductOptionModel[]
  productRelatedOption: ProductOptionModel[]
  productReviewOption: ProductOptionModel[]
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IProductManagerState = initialProductManagerState,
  action: ActionWithPayload<IProductManagerState>
) => {
  switch (action.type) {
    case actionTypes.GET_ALL_PRODUCT_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_PRODUCT_MANAGER_SUCCESS: {
      return {...state, allProductManager: action.payload, loading: false}
    }

    case actionTypes.GET_ALL_PRODUCT_MANAGER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.GET_PRODUCT_MANAGER_BY_TAG_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PRODUCT_MANAGER_BY_TAG_SUCCESS: {
      return {...state, allProductManager: action.payload, loading: false}
    }

    case actionTypes.GET_PRODUCT_MANAGER_BY_TAG_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET Product ComparisonStatus
    case actionTypes.GET_PRODUCT_COMPARISON_STATUS_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PRODUCT_COMPARISON_STATUS_SUCCESS: {
      return {
        ...state,
        productComparisonStatus: action.payload?.productComparisonStatus,
        loading: false,
      }
    }

    case actionTypes.GET_PRODUCT_COMPARISON_STATUS_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET Product Popularity
    case actionTypes.GET_PRODUCT_POPULARITY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PRODUCT_POPULARITY_SUCCESS: {
      return {...state, productPopularity: action.payload?.productPopularity, loading: false}
    }

    case actionTypes.GET_PRODUCT_POPULARITY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET Product ApplyNowOption
    case actionTypes.GET_PRODUCT_APPLY_NOW_OPTION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PRODUCT_APPLY_NOW_OPTION_SUCCESS: {
      return {
        ...state,
        productApplyNowOption: action.payload?.productApplyNowOption,
        loading: false,
      }
    }

    case actionTypes.GET_PRODUCT_APPLY_NOW_OPTION_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET Product CompetitorStatus
    case actionTypes.GET_PRODUCT_COMPETITOR_STATUS_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PRODUCT_COMPETITOR_STATUS_SUCCESS: {
      return {
        ...state,
        productCompetitorStatus: action.payload?.productCompetitorStatus,
        loading: false,
      }
    }

    case actionTypes.GET_PRODUCT_COMPETITOR_STATUS_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET Product DocumentOption
    case actionTypes.GET_PRODUCT_DOCUMENT_OPTION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PRODUCT_DOCUMENT_OPTION_SUCCESS: {
      return {
        ...state,
        productDocumentOption: action.payload?.productDocumentOption,
        loading: false,
      }
    }

    case actionTypes.GET_PRODUCT_DOCUMENT_OPTION_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET Product FaqOption
    case actionTypes.GET_PRODUCT_FAQ_OPTION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PRODUCT_FAQ_OPTION_SUCCESS: {
      return {...state, productFaqOption: action.payload?.productFaqOption, loading: false}
    }

    case actionTypes.GET_PRODUCT_FAQ_OPTION_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET Product FeatureOption
    case actionTypes.GET_PRODUCT_FEATURE_OPTION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PRODUCT_FEATURE_OPTION_SUCCESS: {
      return {...state, productFeatureOption: action.payload?.productFeatureOption, loading: false}
    }

    case actionTypes.GET_PRODUCT_FEATURE_OPTION_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET Product InterestRateOption
    case actionTypes.GET_PRODUCT_INTEREST_RATE_OPTION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PRODUCT_INTEREST_RATE_OPTION_SUCCESS: {
      return {
        ...state,
        productInterestRateOption: action.payload?.productInterestRateOption,
        loading: false,
      }
    }

    case actionTypes.GET_PRODUCT_INTEREST_RATE_OPTION_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET Product LeadFormOption
    case actionTypes.GET_PRODUCT_LEAD_FORM_OPTION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PRODUCT_LEAD_FORM_OPTION_SUCCESS: {
      return {
        ...state,
        productLeadFormOption: action.payload?.productLeadFormOption,
        loading: false,
      }
    }

    case actionTypes.GET_PRODUCT_LEAD_FORM_OPTION_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET Product MediaType
    case actionTypes.GET_PRODUCT_MEDIA_TYPE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PRODUCT_MEDIA_TYPE_SUCCESS: {
      return {...state, productMediaType: action.payload?.productMediaType, loading: false}
    }

    case actionTypes.GET_PRODUCT_MEDIA_TYPE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET Product RelatedOption
    case actionTypes.GET_PRODUCT_RELATED_OPTION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PRODUCT_RELATED_OPTION_SUCCESS: {
      return {...state, productRelatedOption: action.payload?.productRelatedOption, loading: false}
    }

    case actionTypes.GET_PRODUCT_RELATED_OPTION_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET Product ReviewOption
    case actionTypes.GET_PRODUCT_REVIEW_OPTION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PRODUCT_REVIEW_OPTION_SUCCESS: {
      return {...state, productReviewOption: action.payload?.productReviewOption, loading: false}
    }

    case actionTypes.GET_PRODUCT_REVIEW_OPTION_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET ProductManager DATA
    case actionTypes.GET_PRODUCT_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PRODUCT_MANAGER_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_PRODUCT_MANAGER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add ProductManager
    case actionTypes.ADD_PRODUCT_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_PRODUCT_MANAGER_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_PRODUCT_MANAGER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.RESET_PRODUCT_TAG: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update ProductManager
    case actionTypes.UPDATE_PRODUCT_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_PRODUCT_MANAGER_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_PRODUCT_MANAGER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_PRODUCT_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_PRODUCT_MANAGER_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_PRODUCT_MANAGER_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_PRODUCT_MANAGER_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_PRODUCT_MANAGER_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_PRODUCT_MANAGER_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_PRODUCT_MANAGER_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_PRODUCT_MANAGER_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_PRODUCT_MANAGER_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_PRODUCT_MANAGER_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_PRODUCT_MANAGER_SUCCESS: {
      const changedData: any = action.payload?.data?.productManager
      let newData = state?.data?.productManager?.map((data) => {
        if (data?.id === changedData[0]?.id) {
          return {
            ...data,
            status: !data?.status,
          }
        } else {
          return data
        }
      })
      return {
        ...state,
        data: {...state, meta: state?.data?.meta, productManager: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_PRODUCT_MANAGER_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_PRODUCT_MANAGER_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_PRODUCT_MANAGER_SUCCESS: {
      const changedData: any = action.payload?.data?.productManager
      let newData = state?.data?.productManager?.map((data) => {
        if (data?.id === changedData[0]?.id) {
          return {
            ...data,
            status: !data?.status,
          }
        } else {
          return data
        }
      })

      return {
        ...state,
        data: {...state, meta: state?.data?.meta, productManager: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_PRODUCT_MANAGER_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    // sort
    case actionTypes.SORT_PRODUCT_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_PRODUCT_MANAGER_SUCCESS: {
      return {
        ...state,
        sortProductManagerData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_PRODUCT_MANAGER_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_PRODUCT_MANAGER_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortProductManagerData: [],
      }
    }

    default:
      return state
  }
}
