import {Action} from 'redux'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialServiceCategoryStateState: IServiceCategoryState = {
  data: {
    serviceCategory: [],
    meta: {},
  },
  serviceCategory: [],
  sortServiceCategoryData: [],
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IServiceCategoryState {
  data: {
    serviceCategory: {[key: string]: number | string}[]
    meta: {[key: string]: number}
  }
  sortServiceCategoryData?: IServiceCategoryState[]
  serviceCategory: {[key: string]: number | string}[]
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IServiceCategoryState = initialServiceCategoryStateState,
  action: ActionWithPayload<IServiceCategoryState>
) => {
  switch (action.type) {
    //GET Service Category
    case actionTypes.GET_SERVICE_CATEGORY_DATA_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SERVICE_CATEGORY_DATA_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_SERVICE_CATEGORY_DATA_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add Service Category
    case actionTypes.ADD_SERVICE_CATEGORY_DATA_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_SERVICE_CATEGORY_DATA_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_SERVICE_CATEGORY_DATA_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.RESET_SERVICE_CATEGORY_DATA: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update Service Category
    case actionTypes.UPDATE_SERVICE_CATEGORY_DATA_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_SERVICE_CATEGORY_DATA_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_SERVICE_CATEGORY_DATA_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_SERVICE_CATEGORY_DATA_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_SERVICE_CATEGORY_DATA_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_SERVICE_CATEGORY_DATA_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_SERVICE_CATEGORY_DATA_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_SERVICE_CATEGORY_DATA_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_SERVICE_CATEGORY_DATA_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_SERVICE_CATEGORY_DATA_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_SERVICE_CATEGORY_DATA_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_SERVICE_CATEGORY_DATA_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_SERVICE_CATEGORY_DATA_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_SERVICE_CATEGORY_DATA_SUCCESS: {
      const changedData: any = action.payload?.data?.serviceCategory
      let newData = state?.data?.serviceCategory?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, service: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_SERVICE_CATEGORY_DATA_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_SERVICE_CATEGORY_DATA_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_SERVICE_CATEGORY_DATA_SUCCESS: {
      const changedData: any = action.payload?.data?.serviceCategory
      let newData = state?.data?.serviceCategory?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, service: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_SERVICE_CATEGORY_DATA_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    //GET Service Category list
    case actionTypes.GET_SERVICE_CATEGORY_LIST_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SERVICE_CATEGORY_LIST_SUCCESS: {
      return {...state, serviceCategory: action.payload?.serviceCategory, loading: false}
    }

    case actionTypes.GET_SERVICE_CATEGORY_LIST_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    // sort
    case actionTypes.SORT_SERVICE_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_SERVICE_CATEGORY_SUCCESS: {
      return {
        ...state,
        sortServiceCategoryData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_SERVICE_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_SERVICE_CATEGORY_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortServiceCategoryData: [],
      }
    }
    default:
      return state
  }
}
