import {Action} from 'redux'
import {AnyMessageParams} from 'yup/lib/types'
import {ServiceManagerType, ServiceOptionType, ServiceManagerDataType} from '../Model'
import {ContentModel} from '../Model/ContentModal'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialContentState: IServiceManagerState = {
  data: {
    serviceManager: [],
    meta: {
      current_page: 0,
      perPage: 10,
      total: 0,
    },
  },
  addUpdateResp: {},
  serviceManagerList: [],
  serviceReviewOption: [],
  servicePopularity: [],
  serviceLeadFormOption: [],
  serviceMediaType: [],
  serviceFeatureOption: [],
  serviceFaqOption: [],
  serviceDocumentOption: [],
  serviceApplyNowOption: [],
  serviceRelatedOption: [],
  sortServiceManagerData: [],
  enableResp: {},
  disableResp: {},
  deleteResp: {},
  loading: false,
  success: false,
}

export interface IServiceManagerState {
  data: ServiceManagerDataType
  addUpdateResp: any
  sortServiceManagerData?: IServiceManagerState[]
  serviceManagerList: Array<ServiceManagerType> | any
  serviceReviewOption: ServiceOptionType[]
  servicePopularity: ServiceOptionType[]
  serviceLeadFormOption?: ServiceOptionType[]
  serviceMediaType?: ServiceOptionType[]
  serviceFeatureOption?: ServiceOptionType[]
  serviceFaqOption?: ServiceOptionType[]
  serviceDocumentOption: ServiceOptionType[]
  serviceApplyNowOption?: ServiceOptionType[]
  serviceRelatedOption?: ServiceOptionType[]
  enableResp: any
  disableResp: any
  deleteResp:
    | {
        message: string
      }
    | {}
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IServiceManagerState = initialContentState,
  action: ActionWithPayload<IServiceManagerState>
) => {
  switch (action.type) {
    //GET SERVICE MANAGER
    case actionTypes.GET_SERVICE_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SERVICE_MANAGER_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    }
    case actionTypes.GET_SERVICE_MANAGER_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    // GET LIST
    case actionTypes.GET_SERVICE_MANAGER_LIST_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.GET_SERVICE_MANAGER_LIST_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SERVICE_MANAGER_LIST_SUCCESS: {
      return {
        ...state,
        serviceManagerList: action.payload,
        loading: false,
      }
    }

    // ADD SERVICE MANAGER
    case actionTypes.ADD_SERVICE_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_SERVICE_MANAGER_SUCCESS: {
      return {
        ...state,
        addUpdateResp: action.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_SERVICE_MANAGER_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.ADD_SERVICE_MANAGER_RESET: {
      const error = action.payload
      return {...state, error, success: false, addUpdateResp: {}, loading: false}
    }

    // UPDATE SERVICE MANAGER
    case actionTypes.UPDATE_SERVICE_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_SERVICE_MANAGER_SUCCESS: {
      return {
        ...state,
        addUpdateResp: action.payload,
        success: true,
        loading: false,
      }
    }
    case actionTypes.UPDATE_SERVICE_MANAGER_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.UPDATE_SERVICE_MANAGER_RESET: {
      const error = action.payload
      return {...state, error, success: false, addUpdateResp: [], loading: false}
    }

    // SERVICE OPTIONS
    case actionTypes.GET_SERVICE_REVIEW_OPTIONS_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SERVICE_REVIEW_OPTIONS_SUCCESS: {
      return {
        ...state,
        serviceReviewOption: action.payload?.serviceReviewOption,
        loading: false,
      }
    }

    case actionTypes.GET_SERVICE_REVIEW_OPTIONS_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.GET_SERVICE_POPULARITY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SERVICE_POPULARITY_SUCCESS: {
      return {
        ...state,
        servicePopularity: action.payload?.servicePopularity,
        loading: false,
      }
    }

    case actionTypes.GET_SERVICE_POPULARITY_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.GET_SERVICES_LEAD_FORM_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SERVICES_LEAD_FORM_SUCCESS: {
      return {
        ...state,
        serviceLeadFormOption: action.payload?.serviceLeadFormOption,
        loading: false,
      }
    }

    case actionTypes.GET_SERVICES_LEAD_FORM_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.GET_SERVICES_MEDIA_TYPE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SERVICES_MEDIA_TYPE_SUCCESS: {
      return {
        ...state,
        serviceMediaType: action.payload?.serviceMediaType,
        loading: false,
      }
    }

    case actionTypes.GET_SERVICES_MEDIA_TYPE_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.GET_SERVICES_FEATURES_OPTION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SERVICES_FEATURES_OPTION_SUCCESS: {
      return {
        ...state,
        serviceFeatureOption: action.payload?.serviceFeatureOption,
        loading: false,
      }
    }

    case actionTypes.GET_SERVICES_FEATURES_OPTION_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    //GET FAQ OPTION REDUCER
    case actionTypes.GET_SERVICE_FAQ_OPTION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SERVICE_FAQ_OPTION_SUCCESS: {
      return {
        ...state,
        serviceFaqOption: action.payload?.serviceFaqOption,
        loading: false,
      }
    }

    case actionTypes.GET_SERVICE_FAQ_OPTION_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    //GET Service DocumentOption
    case actionTypes.GET_SERVICE_DOCUMENT_OPTION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SERVICE_DOCUMENT_OPTION_SUCCESS: {
      return {
        ...state,
        serviceDocumentOption: action.payload?.serviceDocumentOption,
        loading: false,
      }
    }

    case actionTypes.GET_SERVICE_DOCUMENT_OPTION_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.GET_SERVICE_RELATED_OPTION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SERVICE_RELATED_OPTION_SUCCESS: {
      return {...state, serviceRelatedOption: action.payload?.serviceRelatedOption, loading: false}
    }

    case actionTypes.GET_SERVICE_RELATED_OPTION_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.GET_SERVICE_APPLY_NOW_OPTION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SERVICE_APPLY_NOW_OPTION_SUCCESS: {
      return {
        ...state,
        serviceApplyNowOption: action.payload?.serviceApplyNowOption,
        loading: false,
      }
    }

    case actionTypes.GET_SERVICE_APPLY_NOW_OPTION_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    // DELETE SERVICE MANAGER
    case actionTypes.DELETE_SERVICE_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_SERVICE_MANAGER_SUCCESS: {
      return {
        ...state,
        deleteResp: action.payload,
        success: true,
        loading: false,
      }
    }
    case actionTypes.DELETE_SERVICE_MANAGER_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }
    case actionTypes.DELETE_SERVICE_MANAGER_RESET: {
      const error = action.payload
      return {...state, error, deleteResp: {}, success: false, loading: false}
    }

    // ENABLE SERVICE MANAGER
    case actionTypes.ENABLE_SERVICE_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_SERVICE_MANAGER_SUCCESS: {
      return {
        ...state,
        enableResp: action.payload,
        success: true,
        loading: false,
      }
    }
    case actionTypes.ENABLE_SERVICE_MANAGER_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }
    case actionTypes.ENABLE_SERVICE_MANAGER_RESET: {
      const error = action.payload
      return {...state, error, success: false, enableResp: {}, loading: false}
    }

    // DISABLE SERVICE MANAGER
    case actionTypes.DISABLE_SERVICE_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_SERVICE_MANAGER_SUCCESS: {
      return {
        ...state,
        disableResp: action.payload,
        success: true,
        loading: false,
      }
    }
    case actionTypes.DISABLE_SERVICE_MANAGER_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }
    case actionTypes.DISABLE_SERVICE_MANAGER_RESET: {
      const error = action.payload
      return {...state, error, disableResp: {}, success: false, loading: false}
    }
    // sort
    case actionTypes.SORT_SERVICE_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_SERVICE_MANAGER_SUCCESS: {
      return {
        ...state,
        sortServiceManagerData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_SERVICE_MANAGER_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_SERVICE_MANAGER_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortServiceManagerData: [],
      }
    }

    default:
      return state
  }
}
