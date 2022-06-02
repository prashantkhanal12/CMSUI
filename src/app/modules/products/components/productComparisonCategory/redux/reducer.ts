import {Action} from 'redux'
import {ProductComparisonCategoryModel} from '../Model/ProductComparisonCategoryModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialProductComparisonCategoryState: IProductComparisonCategoryState = {
  data: {
    productComparisonCategory: [],
    meta: [],
  },
  productComparisonCategoryList: [],
  sortProductComparisonData: [],
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IProductComparisonCategoryState {
  data?: {
    productComparisonCategory?: ProductComparisonCategoryModel[]
    meta?: {[key: string]: string | number}[]
  }
  productComparisonCategoryList?: ProductComparisonCategoryModel[]
  sortProductComparisonData: IProductComparisonCategoryState[]
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IProductComparisonCategoryState = initialProductComparisonCategoryState,
  action: ActionWithPayload<IProductComparisonCategoryState>
) => {
  switch (action.type) {
    case actionTypes.GET_ALL_PRODUCT_COMPARISON_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_PRODUCT_COMPARISON_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        productComparisonCategoryList: action.payload,
        loading: false,
      }
    }

    case actionTypes.GET_ALL_PRODUCT_COMPARISON_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET ProductComparisonCategory DATA
    case actionTypes.GET_PRODUCT_COMPARISON_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PRODUCT_COMPARISON_CATEGORY_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_PRODUCT_COMPARISON_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add ProductComparisonCategory
    case actionTypes.ADD_PRODUCT_COMPARISON_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_PRODUCT_COMPARISON_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_PRODUCT_COMPARISON_CATEGORY_FINISH: {
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

    //Update ProductComparisonCategory
    case actionTypes.UPDATE_PRODUCT_COMPARISON_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_PRODUCT_COMPARISON_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_PRODUCT_COMPARISON_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_PRODUCT_COMPARISON_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_PRODUCT_COMPARISON_CATEGORY_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_PRODUCT_COMPARISON_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_PRODUCT_COMPARISON_CATEGORY_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_PRODUCT_COMPARISON_CATEGORY_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_PRODUCT_COMPARISON_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_PRODUCT_COMPARISON_CATEGORY_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_PRODUCT_COMPARISON_CATEGORY_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_PRODUCT_COMPARISON_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_PRODUCT_COMPARISON_CATEGORY_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_PRODUCT_COMPARISON_CATEGORY_SUCCESS: {
      const changedData: any = action.payload?.data?.productComparisonCategory
      let newData = state?.data?.productComparisonCategory?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, productComparisonCategory: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_PRODUCT_COMPARISON_CATEGORY_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_PRODUCT_COMPARISON_CATEGORY_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_PRODUCT_COMPARISON_CATEGORY_SUCCESS: {
      const changedData: any = action.payload?.data?.productComparisonCategory
      let newData = state?.data?.productComparisonCategory?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, productComparisonCategory: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_PRODUCT_COMPARISON_CATEGORY_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    // sort
    case actionTypes.SORT_PRODUCT_COMPARISON_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_PRODUCT_COMPARISON_SUCCESS: {
      return {
        ...state,
        sortProductComparisonData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_PRODUCT_COMPARISON_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_PRODUCT_COMPARISON_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortProductComparisonData: [],
      }
    }

    default:
      return state
  }
}
