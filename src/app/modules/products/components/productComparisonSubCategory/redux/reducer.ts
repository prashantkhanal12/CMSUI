import {Action} from 'redux'
import {ProductComparisonSubCategoryModel} from '../Model/ProductComparisonSubCategoryModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialProductComparisonSubCategoryState: IProductComparisonSubCategoryState = {
  data: {
    productComparisonSubCategory: [],
    meta: [],
  },
  productComparisonSubCategoryList: [],
  sortProductComparisonSubData: [],
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IProductComparisonSubCategoryState {
  data?: {
    productComparisonSubCategory?: ProductComparisonSubCategoryModel[]
    meta?: {[key: string]: string | number}[]
  }
  productComparisonSubCategoryList?: ProductComparisonSubCategoryModel[]
  sortProductComparisonSubData: IProductComparisonSubCategoryState[]
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IProductComparisonSubCategoryState = initialProductComparisonSubCategoryState,
  action: ActionWithPayload<IProductComparisonSubCategoryState>
) => {
  switch (action.type) {
    case actionTypes.GET_ALL_PRODUCT_COMPARISON_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_PRODUCT_COMPARISON_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        productComparisonSubCategoryList: action.payload,
        loading: false,
      }
    }

    case actionTypes.GET_ALL_PRODUCT_COMPARISON_SUB_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET ProductComparisonSubCategory DATA
    case actionTypes.GET_PRODUCT_COMPARISON_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PRODUCT_COMPARISON_SUB_CATEGORY_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_PRODUCT_COMPARISON_SUB_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add ProductComparisonSubCategory
    case actionTypes.ADD_PRODUCT_COMPARISON_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_PRODUCT_COMPARISON_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_PRODUCT_COMPARISON_SUB_CATEGORY_FINISH: {
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

    //Update ProductComparisonSubCategory
    case actionTypes.UPDATE_PRODUCT_COMPARISON_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_PRODUCT_COMPARISON_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_PRODUCT_COMPARISON_SUB_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_PRODUCT_COMPARISON_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_PRODUCT_COMPARISON_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_PRODUCT_COMPARISON_SUB_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_PRODUCT_COMPARISON_SUB_CATEGORY_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_PRODUCT_COMPARISON_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_PRODUCT_COMPARISON_SUB_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_PRODUCT_COMPARISON_SUB_CATEGORY_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_PRODUCT_COMPARISON_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_PRODUCT_COMPARISON_SUB_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_PRODUCT_COMPARISON_SUB_CATEGORY_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_PRODUCT_COMPARISON_SUB_CATEGORY_SUCCESS: {
      const changedData: any = action.payload?.data?.productComparisonSubCategory
      let newData = state?.data?.productComparisonSubCategory?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, productComparisonSubCategory: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_PRODUCT_COMPARISON_SUB_CATEGORY_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_PRODUCT_COMPARISON_SUB_CATEGORY_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_PRODUCT_COMPARISON_SUB_CATEGORY_SUCCESS: {
      const changedData: any = action.payload?.data?.productComparisonSubCategory
      let newData = state?.data?.productComparisonSubCategory?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, productComparisonSubCategory: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_PRODUCT_COMPARISON_SUB_CATEGORY_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    // sort
    case actionTypes.SORT_PRODUCT_COMPARISON_SUB_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_PRODUCT_COMPARISON_SUB_SUCCESS: {
      return {
        ...state,
        sortProductComparisonSubData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_PRODUCT_COMPARISON_SUB_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_PRODUCT_COMPARISON_SUB_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortProductComparisonSubData: [],
      }
    }

    default:
      return state
  }
}
