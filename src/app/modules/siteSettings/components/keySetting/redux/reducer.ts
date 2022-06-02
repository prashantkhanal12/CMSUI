import {Action} from 'redux'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialKeyState: IKeyState = {
  data: {
    keySetting: [],
    meta: [],
  },
  loading: false,
  success: false,
  deleteSuccess: false,
}

export interface IKeyState {
  data: {
    keySetting?: {[key: string]: string | number}[]
    meta?: {[key: string]: number | undefined}[]
  }
  loading?: boolean
  deleteSuccess?: boolean
  success?: boolean
}

export const reducer = (
  state: IKeyState = initialKeyState,
  action: ActionWithPayload<IKeyState>
) => {
  switch (action.type) {
    case actionTypes.GET_KEY_SETTING_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_KEY_SETTING_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.GET_KEY_SETTING_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.CREATE_KEY_START: {
      return {...state, loading: true, keyDetail: action.payload}
    }

    case actionTypes.CREATE_KEY_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.CREATE_KEY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.CREATE_KEY_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    case actionTypes.UPDATE_KEY_START: {
      return {
        ...state,
        loading: true,
      }
    }

    case actionTypes.UPDATE_KEY_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_KEY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.UPDATE_KEY_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    case actionTypes.DELETE_KEY_START: {
      return {...state, loading: true, deleteSuccess: false}
    }

    case actionTypes.DELETE_KEY_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_KEY_FINISH: {
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
