import {Action} from 'redux'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialServiceTagStateState: IServiceTagState = {
  data: {
    serviceTag: [],
    meta: {},
  },
  serviceTag: [],
  sortServiceTagData: [],
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IServiceTagState {
  data?: {
    serviceTag?: {[key: string]: number | string}[]
    meta: {[key: string]: number}
  }
  serviceTag: {[key: string]: number | string}[]
  sortServiceTagData?: IServiceTagState[]
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IServiceTagState = initialServiceTagStateState,
  action: ActionWithPayload<IServiceTagState>
) => {
  switch (action.type) {
    //GET Service Tag
    case actionTypes.GET_SERVICE_TAG_DATA_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SERVICE_TAG_DATA_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_SERVICE_TAG_DATA_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add Service Tag
    case actionTypes.ADD_SERVICE_TAG_DATA_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_SERVICE_TAG_DATA_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_SERVICE_TAG_DATA_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.RESET_SERVICE_TAG_DATA: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update Service Tag
    case actionTypes.UPDATE_SERVICE_TAG_DATA_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_SERVICE_TAG_DATA_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_SERVICE_TAG_DATA_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_SERVICE_TAG_DATA_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_SERVICE_TAG_DATA_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_SERVICE_TAG_DATA_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_SERVICE_TAG_DATA_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_SERVICE_TAG_DATA_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_SERVICE_TAG_DATA_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_SERVICE_TAG_DATA_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_SERVICE_TAG_DATA_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_SERVICE_TAG_DATA_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_SERVICE_TAG_DATA_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_SERVICE_TAG_DATA_SUCCESS: {
      const changedData: any = action.payload?.data?.serviceTag
      let newData = state?.data?.serviceTag?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, serviceTag: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_SERVICE_TAG_DATA_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_SERVICE_TAG_DATA_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_SERVICE_TAG_DATA_SUCCESS: {
      const changedData: any = action.payload?.data?.serviceTag
      let newData = state?.data?.serviceTag?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, serviceTag: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_SERVICE_TAG_DATA_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    //GET Service Tag list
    case actionTypes.GET_SERVICE_TAG_LIST_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SERVICE_TAG_LIST_SUCCESS: {
      return {...state, serviceTag: action.payload?.serviceTag, loading: false}
    }

    case actionTypes.GET_SERVICE_TAG_LIST_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    // sort
    case actionTypes.SORT_SERVICE_TAG_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_SERVICE_TAG_SUCCESS: {
      return {
        ...state,
        sortServiceTagData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_SERVICE_TAG_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_SERVICE_TAG_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortServiceTagData: [],
      }
    }

    default:
      return state
  }
}
