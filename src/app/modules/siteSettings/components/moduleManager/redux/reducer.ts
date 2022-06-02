import {Action} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { IModuleModel } from '../Model'
/* import { UserModel } from '../models/UserModel' */
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialModuleState: IModuleState = {
  social_integration: [],
  navigation_status: [],
  toggleNavData: {},
  enableDisableStatusData: {},
  module: [],
  data: [],
  sortModuleManagerData: [],
  loading: false,
  success: false,
  deleteSuccess: false,
}

export interface IModuleState {
  social_integration?: {[key: string]: string | number}[]
  navigation_status?: {[key: string]: string | number}[]
  module?: {[key: string]: string | number}[]
  data?: {[key: string]: string | number}[]
  toggleNavData?: {[key: string]: string | number}
  enableDisableStatusData?: {[key: string]: string | number}
  sortModuleManagerData: IModuleModel[]
  loading?: boolean
  success?: boolean
  deleteSuccess?: boolean
}

export const reducer = (
  state: IModuleState = initialModuleState,
  action: ActionWithPayload<IModuleState>
) => {
  switch (action.type) {
    case actionTypes.GET_SOCIAL_INTEGRATION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SOCIAL_INTEGRATION_SUCCESS: {
      return {
        ...state,
        social_integration: action.payload?.social_integration,
        loading: false,
      }
    }

    case actionTypes.GET_SOCIAL_INTEGRATION_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.GET_NAV_VISIBILITY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_NAV_VISIBILITY_SUCCESS: {
      return {...state, navigation_status: action.payload?.navigation_status, loading: false}
    }

    case actionTypes.GET_NAV_VISIBILITY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.ADD_MODULE_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_MODULE_SUCCESS: {
      return {...state, data: action.payload, success: true, loading: false}
    }

    case actionTypes.ADD_MODULE_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.ADD_MODULE_RESET: {
      return {...state, success: false, loading: false}
    }

    //UPDATE REDUCER
    case actionTypes.UPDATE_MODULE_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_MODULE_SUCCESS: {
      return {...state, data: action.payload, success: true, loading: false}
    }

    case actionTypes.UPDATE_MODULE_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.UPDATE_MODULE_RESET: {
      return {...state, success: false, loading: false}
    }

    case actionTypes.GET_MODULE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_MODULE_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_MODULE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.GET_ALL_MODULE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_MODULE_SUCCESS: {
      return {...state, module: action.payload?.module, loading: false}
    }

    case actionTypes.GET_ALL_MODULE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    // toggle status
    case actionTypes.TOOGLE_NAVIGATION_STATUS_START: {
      return {...state, loading: true}
    }

    case actionTypes.TOOGLE_NAVIGATION_STATUS_SUCCESS: {
      return {...state, toggleNavData: action.payload, success: true, loading: false}
    }

    case actionTypes.TOOGLE_NAVIGATION_STATUS_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.TOOGLE_NAVIGATION_STATUS_RESET: {
      return {...state, success: false, loading: false, toggleNavData: {}}
    }

    case actionTypes.TOOGLE_SOCIAL_INT_STATUS_START: {
      return {...state, loading: true}
    }

    case actionTypes.TOOGLE_SOCIAL_INT_STATUS_SUCCESS: {
      return {...state, toggleNavData: action.payload, success: true, loading: false}
    }

    case actionTypes.TOOGLE_SOCIAL_INT_STATUS_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.TOOGLE_SOCIAL_INT_STATUS_RESET: {
      return {...state, success: false, loading: false, toggleNavData: {}}
    }

    // STATUS ENABLE
    case actionTypes.ENABLE_MODULE_STATUS_START: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_MODULE_STATUS_SUCCESS: {
      return {...state, enableDisableStatusData: action.payload, success: true, loading: false}
    }

    case actionTypes.ENABLE_MODULE_STATUS_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.ENABLE_MODULE_STATUS_RESET: {
      return {...state, success: false, loading: false, enableDisableStatusData: {}}
    }

    // STATUS DISABLE
    case actionTypes.DISABLE_MODULE_STATUS_START: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_MODULE_STATUS_SUCCESS: {
      return {...state, enableDisableStatusData: action.payload, success: true, loading: false}
    }

    case actionTypes.DISABLE_MODULE_STATUS_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.DISABLE_MODULE_STATUS_RESET: {
      return {...state, success: false, loading: false, enableDisableStatusData: {}}
    }

    // sort
    case actionTypes.SORT_MODULE_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_MODULE_MANAGER_SUCCESS: {
      return {
        ...state,
        sortModuleManagerData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_MODULE_MANAGER_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_MODULE_MANAGER_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortModuleManagerData: [],
      }
    }

    default:
      return state
  }
}
