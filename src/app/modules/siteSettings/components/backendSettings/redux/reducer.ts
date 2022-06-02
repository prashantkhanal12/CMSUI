import { Action } from 'redux'
import { actionTypes } from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}
export interface ISettingTypeState {
  data: {
    settingType?: { [key: string]: string | number }[]
  }
  loading?: boolean
  success?: boolean
}

const initialKeyState: ISettingTypeState = {
  data: {
    settingType: [],
  },
  loading: false,
  success: false,
}

export const reducer = (
  state: ISettingTypeState = initialKeyState,
  action: ActionWithPayload<ISettingTypeState>
) => {
  switch (action.type) {
    case actionTypes.GET_BACKEND_SETTING_START: {
      return { ...state, loading: true }
    }

    case actionTypes.GET_BACKEND_SETTING_SUCCESS: {
      return { ...state, data: action.payload?.data, loading: false }
    }

    case actionTypes.GET_BACKEND_SETTING_FINISH: {
      const error = action.payload
      return { ...state, error, loading: false }
    }

    default:
      return state
  }
}
