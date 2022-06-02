import { Action } from 'redux'
import { actionTypes } from './constants'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { cloneDeep } from 'lodash'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const persistSetting = JSON.parse(localStorage.getItem('persist:settings') as string)
export interface ISettingTypeState {
  data?: {
    setting?: { [key: string]: string | number }[] | []
    siteSetting?: { [key: string]: string | number }[] | []
    contactSetting?: { [key: string]: string | number }[] | []
    updateSettings?: { [key: string]: string | number } | {}
    settingType?: { [key: string]: string | number }[] | []
    createSettings?: { [key: string]: string | number } | {}
  }
  backendData?: { [key: string]: [] }
  loading?: boolean
  success?: boolean
  updateSuccess?: boolean
  settingType?: { [key: string]: string | number }[] | []
  settingTypeName?: string
}

const initialKeyState: ISettingTypeState = {
  data: {
    settingType: persistSetting?.settingType ? JSON.parse(persistSetting.settingType) : [],
    setting: [],
    siteSetting: [],
    contactSetting: [],
    updateSettings: {},
  },
  backendData: {},
  updateSuccess: false,
  loading: false,
  success: false,
  settingType: persistSetting?.settingType ? JSON.parse(persistSetting.settingType) : [],
  settingTypeName: ''
}

export const reducer = persistReducer(
  {
    storage,
    key: 'settings',
    whitelist: ['settingType', 'backendData'],
  },
  (state: ISettingTypeState = initialKeyState, action: ActionWithPayload<ISettingTypeState>) => {
    switch (action.type) {
      case actionTypes.GET_SETTING_TYPE_START: {
        return { ...state, loading: true }
      }

      case actionTypes.GET_SETTING_TYPE_SUCCESS: {
        return {
          ...state,
          data: { ...state.data, settingType: action.payload?.data?.settingType },
          settingType: action.payload?.data?.settingType,
          loading: false,
        }
      }

      case actionTypes.GET_SETTING_TYPE_FINISH: {
        const error = action.payload
        return { ...state, error, loading: false }
      }

      case actionTypes.GET_SPECIFIC_SETTING_TYPE_START: {
        return { ...state, loading: true }
      }

      case actionTypes.GET_SPECIFIC_SETTING_TYPE_SUCCESS: {
        let newData: any = cloneDeep(state?.data)
        if (action?.payload?.settingTypeName === 'Contact') {
          newData.contactSetting = action.payload?.data?.setting
        } else if (action?.payload?.settingTypeName === 'Site') {
          newData.siteSetting = action.payload?.data?.setting
        } else {
          newData.setting = action.payload?.data?.setting
        }
        return {
          ...state,
          data: newData,
          backendData: action.payload?.settingTypeName === 'Backend' ? action.payload?.backendData : { ...state.backendData },
          loading: false,
        }
      }

      case actionTypes.GET_SPECIFIC_SETTING_TYPE_FINISH: {
        const error = action.payload
        return { ...state, error, loading: false }
      }

      case actionTypes.CREATE_SETTING_FIELD_START: {
        return { ...state, loading: true, settingFieldDetail: action.payload }
      }

      case actionTypes.CREATE_SETTING_FIELD_SUCCESS: {
        return {
          ...state,
          data: { ...state?.data, createSettings: action?.payload?.data },
          success: true,
          loading: false,
        }
      }

      case actionTypes.CREATE_SETTING_FIELD_FINISH: {
        const error = action.payload
        return { ...state, error, loading: false }
      }

      case actionTypes.CREATE_SETTING_FIELD_RESET: {
        const error = action.payload
        return {
          ...state, error, success: false,
          data: { ...state?.data, createSettings: {} }, loading: false
        }
      }

      case actionTypes.UPDATE_SETTING_FIELD_START: {
        return { ...state, loading: true }
      }

      case actionTypes.UPDATE_SETTING_FIELD_SUCCESS: {
        return {
          ...state,
          loading: false,
          updateSuccess: true,
          data: { ...state?.data, updateSettings: action.payload?.data },
        }
      }

      case actionTypes.UPDATE_SETTING_FIELD_FINISH: {
        const error = action.payload
        return { ...state, error, updateSuccess: false, loading: false }
      }

      case actionTypes.UPDATE_SETTING_FIELD_RESET: {
        const error = action.payload
        return {
          ...state,
          error,
          loading: false,
          updateSuccess: false,
          data: { ...state?.data, updateSettings: {} },
        }
      }
      default:
        return state
    }
  }
)
