import {Action} from 'redux'
import {MerchantManagerModel} from '../Model/MerchantManagerModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialMerchantManagerState: IMerchantManagerState = {
  data: {
    merchant: [],
    meta: [],
  },
  sortMerchantManagerData: [],
  merchantManagerList: {merchant: []},
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IMerchantManagerState {
  data?: {
    merchant?: MerchantManagerModel[]
    meta?: {[key: string]: string | number}[]
  }
  sortMerchantManagerData?: IMerchantManagerState[]
  merchantManagerList?: {merchant: MerchantManagerModel[]}
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IMerchantManagerState = initialMerchantManagerState,
  action: ActionWithPayload<IMerchantManagerState>
) => {
  switch (action.type) {
    case actionTypes.GET_ALL_MERCHANT_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_MERCHANT_MANAGER_SUCCESS: {
      return {...state, data: action.payload, merchantManagerList: action.payload, loading: false}
    }

    case actionTypes.GET_ALL_MERCHANT_MANAGER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET MerchantManager DATA
    case actionTypes.GET_MERCHANT_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_MERCHANT_MANAGER_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_MERCHANT_MANAGER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add MerchantManager
    case actionTypes.ADD_MERCHANT_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_MERCHANT_MANAGER_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_MERCHANT_MANAGER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.RESET_MERCHANT_MANAGER: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update MerchantManager
    case actionTypes.UPDATE_MERCHANT_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_MERCHANT_MANAGER_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_MERCHANT_MANAGER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_MERCHANT_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_MERCHANT_MANAGER_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_MERCHANT_MANAGER_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_MERCHANT_MANAGER_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_MERCHANT_MANAGER_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_MERCHANT_MANAGER_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_MERCHANT_MANAGER_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_MERCHANT_MANAGER_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_MERCHANT_MANAGER_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_MERCHANT_MANAGER_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_MERCHANT_MANAGER_SUCCESS: {
      const changedData: any = action.payload?.data?.merchant
      let newData = state?.data?.merchant?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, merchant: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_MERCHANT_MANAGER_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_MERCHANT_MANAGER_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_MERCHANT_MANAGER_SUCCESS: {
      const changedData: any = action.payload?.data?.merchant
      let newData = state?.data?.merchant?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, merchant: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_MERCHANT_MANAGER_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    // sort
    case actionTypes.SORT_MERCHANT_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_MERCHANT_MANAGER_SUCCESS: {
      return {
        ...state,
        sortMerchantManagerData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_MERCHANT_MANAGER_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_MERCHANT_MANAGER_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortMerchantManagerData: [],
      }
    }

    default:
      return state
  }
}
