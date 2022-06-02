import {Action} from 'redux'
import {ServiceSubTypeModel} from '../Model/ServiceSubTypeModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialServiceSubTypeState: IServiceSubTypeState = {
  data: {
    grievanceServiceSubType: [],
    serviceSubType: [],

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

export interface IServiceSubTypeState {
  data?: {
    grievanceServiceSubType?: ServiceSubTypeModel[]
    serviceSubType?: ServiceSubTypeModel[]
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
  state: IServiceSubTypeState = initialServiceSubTypeState,
  action: ActionWithPayload<IServiceSubTypeState>
) => {
  switch (action.type) {
    case actionTypes.GET_ALL_SERVICE_SUB_TYPE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_SERVICE_SUB_TYPE_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_ALL_SERVICE_SUB_TYPE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET ServiceSubType DATA
    case actionTypes.GET_SERVICE_SUB_TYPE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SERVICE_SUB_TYPE_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_SERVICE_SUB_TYPE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add ServiceSubType
    case actionTypes.ADD_SERVICE_SUB_TYPE_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_SERVICE_SUB_TYPE_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_SERVICE_SUB_TYPE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.RESET_SERVICE_TYPE: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update ServiceSubType
    case actionTypes.UPDATE_SERVICE_SUB_TYPE_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_SERVICE_SUB_TYPE_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_SERVICE_SUB_TYPE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_SERVICE_SUB_TYPE_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_SERVICE_SUB_TYPE_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_SERVICE_SUB_TYPE_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_SERVICE_SUB_TYPE_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_SERVICE_SUB_TYPE_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_SERVICE_SUB_TYPE_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_SERVICE_SUB_TYPE_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_SERVICE_SUB_TYPE_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_SERVICE_SUB_TYPE_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_SERVICE_SUB_TYPE_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_SERVICE_SUB_TYPE_SUCCESS: {
      const changedData: any = action.payload?.data?.serviceSubType
      let newData = state?.data?.grievanceServiceSubType?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, grievanceServiceSubType: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_SERVICE_SUB_TYPE_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_SERVICE_SUB_TYPE_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_SERVICE_SUB_TYPE_SUCCESS: {
      const changedData: any = action.payload?.data?.serviceSubType
      let newData = state?.data?.grievanceServiceSubType?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, grievanceServiceSubType: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_SERVICE_SUB_TYPE_FINISH: {
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
