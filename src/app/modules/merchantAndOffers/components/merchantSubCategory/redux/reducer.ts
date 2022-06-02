import {Action} from 'redux'
import {MerchantSubCategoryModel} from '../Model/MerchantSubCategoryModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialMerchantSubCategoryState: IMerchantSubCategoryState = {
  data: {
    merchantSubCategory: [],
    meta: [],
  },
  sortMerchantSubCategoryData: [],
  merchantSubCategoryList: {merchantSubCategory: []},
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IMerchantSubCategoryState {
  data?: {
    merchantSubCategory?: MerchantSubCategoryModel[]
    meta?: {[key: string]: string | number}[]
  }
  sortMerchantSubCategoryData?: IMerchantSubCategoryState[]
  merchantSubCategoryList?: {merchantSubCategory: MerchantSubCategoryModel[]}
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IMerchantSubCategoryState = initialMerchantSubCategoryState,
  action: ActionWithPayload<IMerchantSubCategoryState>
) => {
  switch (action.type) {
    case actionTypes.GET_ALL_MERCHANT_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_MERCHANT_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        merchantSubCategoryList: action.payload,
        loading: false,
      }
    }

    case actionTypes.GET_ALL_MERCHANT_SUB_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET MerchantSubCategory DATA
    case actionTypes.GET_MERCHANT_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_MERCHANT_SUB_CATEGORY_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_MERCHANT_SUB_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add MerchantSubCategory
    case actionTypes.ADD_MERCHANT_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_MERCHANT_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_MERCHANT_SUB_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.RESET_MERCHANT_SUB_CATEGORY: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update MerchantSubCategory
    case actionTypes.UPDATE_MERCHANT_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_MERCHANT_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_MERCHANT_SUB_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_MERCHANT_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_MERCHANT_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_MERCHANT_SUB_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_MERCHANT_SUB_CATEGORY_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_MERCHANT_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_MERCHANT_SUB_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_MERCHANT_SUB_CATEGORY_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_MERCHANT_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_MERCHANT_SUB_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_MERCHANT_SUB_CATEGORY_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_MERCHANT_SUB_CATEGORY_SUCCESS: {
      const changedData: any = action.payload?.data?.merchantSubCategory
      let newData = state?.data?.merchantSubCategory?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, merchantSubCategory: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_MERCHANT_SUB_CATEGORY_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_MERCHANT_SUB_CATEGORY_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_MERCHANT_SUB_CATEGORY_SUCCESS: {
      const changedData: any = action.payload?.data?.merchantSubCategory
      let newData = state?.data?.merchantSubCategory?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, merchantSubCategory: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_MERCHANT_SUB_CATEGORY_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    // sort
    case actionTypes.SORT_MERCHANT_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_MERCHANT_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        sortMerchantSubCategoryData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_MERCHANT_SUB_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_MERCHANT_SUB_CATEGORY_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortMerchantSubCategoryData: [],
      }
    }

    default:
      return state
  }
}
