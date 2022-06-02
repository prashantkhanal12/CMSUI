import {Action} from 'redux'
import {ProductTagModel} from '../Model/ProductTagModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialProductTagState: IProductTagState = {
  data: {
    productTag: [],
    meta: [],
  },
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IProductTagState {
  data?: {
    productTag?: ProductTagModel[]
    meta?: {[key: string]: string | number}[]
  }
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IProductTagState = initialProductTagState,
  action: ActionWithPayload<IProductTagState>
) => {
  switch (action.type) {
    case actionTypes.GET_ALL_PRODUCT_TAG_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_PRODUCT_TAG_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_ALL_PRODUCT_TAG_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET ProductTag DATA
    case actionTypes.GET_PRODUCT_TAG_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PRODUCT_TAG_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_PRODUCT_TAG_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add ProductTag
    case actionTypes.ADD_PRODUCT_TAG_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_PRODUCT_TAG_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_PRODUCT_TAG_FINISH: {
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

    //Update ProductTag
    case actionTypes.UPDATE_PRODUCT_TAG_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_PRODUCT_TAG_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_PRODUCT_TAG_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_PRODUCT_TAG_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_PRODUCT_TAG_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_PRODUCT_TAG_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_PRODUCT_TAG_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_PRODUCT_TAG_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_PRODUCT_TAG_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_PRODUCT_TAG_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_PRODUCT_TAG_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_PRODUCT_TAG_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_PRODUCT_TAG_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_PRODUCT_TAG_SUCCESS: {
      const changedData: any = action.payload?.data?.productTag
      let newData = state?.data?.productTag?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, productTag: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_PRODUCT_TAG_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_PRODUCT_TAG_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_PRODUCT_TAG_SUCCESS: {
      const changedData: any = action.payload?.data?.productTag
      let newData = state?.data?.productTag?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, productTag: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_PRODUCT_TAG_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    default:
      return state
  }
}
