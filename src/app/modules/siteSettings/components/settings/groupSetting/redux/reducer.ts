import { Action } from 'redux'
import { actionTypes } from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialGroupSettingState: IGroupSettingState = {
  data: {
    settingGroup: [],
    meta: {},
  },
  settingGroup: [],
  loading: false,
  success: false,
  deleteSuccess: false,
}

export interface IGroupSettingState {
  data: {
    settingGroup?: { [key: string]: string | number }[]
    meta?: { [key: string]: number }
  }
  settingGroup: { [key: string]: string | number }[]
  loading?: boolean
  deleteSuccess?: boolean
  success?: boolean
}

export const reducer = (
  state: IGroupSettingState = initialGroupSettingState,
  action: ActionWithPayload<IGroupSettingState>
) => {
  switch (action.type) {
    case actionTypes.GET_GROUP_SETTING_START: {
      return { ...state, loading: true }
    }

    case actionTypes.GET_GROUP_SETTING_SUCCESS: {
      return { ...state, data: action.payload?.data, loading: false }
    }

    case actionTypes.GET_GROUP_SETTING_FINISH: {
      const error = action.payload
      return { ...state, error, loading: false }
    }

    case actionTypes.GET_SETTING_GROUP_LIST_START: {
      return { ...state, loading: true }
    }

    case actionTypes.GET_SETTING_GROUP_LIST_SUCCESS: {
      return { ...state, settingGroup: action.payload?.settingGroup, loading: false }
    }

    case actionTypes.GET_SETTING_GROUP_LIST_FINISH: {
      const error = action.payload
      return { ...state, error, loading: false }
    }

    case actionTypes.CREATE_GROUP_START: {
      return { ...state, loading: true, keyDetail: action.payload }
    }

    case actionTypes.CREATE_GROUP_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.CREATE_GROUP_FINISH: {
      const error = action.payload
      return { ...state, error, loading: false }
    }

    case actionTypes.CREATE_GROUP_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    case actionTypes.UPDATE_GROUP_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_GROUP_FINISH: {
      const error = action.payload
      return { ...state, error, loading: false }
    }

    case actionTypes.UPDATE_GROUP_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    case actionTypes.DELETE_GROUP_START: {
      return { ...state, loading: true, deleteSuccess: false }
    }

    case actionTypes.DELETE_GROUP_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_GROUP_FINISH: {
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
