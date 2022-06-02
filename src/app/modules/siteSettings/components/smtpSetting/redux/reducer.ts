import {Action} from 'redux'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialSmtpState: ISmtpState = {
  data: {
    smtpSetting: [],
    meta: {},
  },
  encryption: [],
  loading: false,
  success: false,
  deleteSuccess: false,
}

export interface ISmtpState {
  data: {
    smtpSetting: {[key: string]: string | number}[]
    meta: {[key: string]: number}
  }
  encryption: {[key: string]: string}[]
  loading?: boolean
  deleteSuccess?: boolean
  success?: boolean
}

export const reducer = (
  state: ISmtpState = initialSmtpState,
  action: ActionWithPayload<ISmtpState>
) => {
  switch (action.type) {
    case actionTypes.GET_SMTP_SETTING_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SMTP_SETTING_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.GET_SMTP_SETTING_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.GET_SMTP_ENCRYPTION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SMTP_ENCRYPTION_SUCCESS: {
      return {...state, encryption: action.payload?.encryption, loading: false}
    }

    case actionTypes.GET_SMTP_ENCRYPTION_FINISH: {
      return {...state, loading: false}
    }

    case actionTypes.CREATE_SMTP_START: {
      return {...state, loading: true}
    }

    case actionTypes.CREATE_SMTP_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.CREATE_SMTP_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.CREATE_SMTP_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    case actionTypes.UPDATE_SMTP_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_SMTP_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_SMTP_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.UPDATE_SMTP_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    case actionTypes.DELETE_SMTP_START: {
      return {...state, loading: true, deleteSuccess: false}
    }

    case actionTypes.DELETE_SMTP_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_SMTP_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    default:
      return state
  }
}
