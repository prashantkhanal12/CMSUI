import {Action} from 'redux'
import {ProductCategoryModel} from '../Model/ProductCategoryModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialProductCategoryState: IProductCategoryState = {
  data: {
    productCategory: [],
    meta: [],
  },
  sortProductCategoryData: [],
  productCategoryList: {productCategory: []},
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IProductCategoryState {
  data?: {
    productCategory?: ProductCategoryModel[]
    meta?: {[key: string]: string | number}[]
  }
  sortProductCategoryData?: IProductCategoryState[]
  productCategoryList?: {productCategory: ProductCategoryModel[]}
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IProductCategoryState = initialProductCategoryState,
  action: ActionWithPayload<IProductCategoryState>
) => {
  switch (action.type) {
    case actionTypes.GET_ALL_PRODUCT_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_PRODUCT_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        productCategoryList: action.payload,
        loading: false,
      }
    }

    case actionTypes.GET_ALL_PRODUCT_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET ProductCategory DATA
    case actionTypes.GET_PRODUCT_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PRODUCT_CATEGORY_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_PRODUCT_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add ProductCategory
    case actionTypes.ADD_PRODUCT_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_PRODUCT_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_PRODUCT_CATEGORY_FINISH: {
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

    //Update ProductCategory
    case actionTypes.UPDATE_PRODUCT_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_PRODUCT_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_PRODUCT_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_PRODUCT_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_PRODUCT_CATEGORY_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_PRODUCT_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_PRODUCT_CATEGORY_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_PRODUCT_CATEGORY_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_PRODUCT_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_PRODUCT_CATEGORY_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_PRODUCT_CATEGORY_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_PRODUCT_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_PRODUCT_CATEGORY_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_PRODUCT_CATEGORY_SUCCESS: {
      const changedData: any = action.payload?.data?.productCategory
      let newData = state?.data?.productCategory?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, productCategory: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_PRODUCT_CATEGORY_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_PRODUCT_CATEGORY_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_PRODUCT_CATEGORY_SUCCESS: {
      const changedData: any = action.payload?.data?.productCategory
      let newData = state?.data?.productCategory?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, productCategory: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_PRODUCT_CATEGORY_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    // sort
    case actionTypes.SORT_PRODUCT_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_PRODUCT_CATEGORY_SUCCESS: {
      return {
        ...state,
        sortProductCategoryData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_PRODUCT_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_PRODUCT_CATEGORY_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortProductCategoryData: [],
      }
    }

    default:
      return state
  }
}
