import {Action} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {RolePermissionsModel, UserModel} from '../models/UserModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const persistAuth = JSON.parse(localStorage.getItem('persist:auth') as string)

const initialAuthState: IAuthState = {
  loading: false,
  success: false,
  user: undefined,
  accessToken: persistAuth?.accessToken ? JSON.parse(persistAuth.accessToken) : undefined,
  data: {},
  userId: persistAuth?.userId ? JSON.parse(persistAuth.userId) : undefined,
  firstLogin: persistAuth?.firstLogin === 'true' ? true : false,
  setNewPasswordSuccess: false,
  resetNewPasswordSuccess: false,
  module: persistAuth?.module ? JSON.parse(persistAuth.module) : undefined,
  rolePermissions: persistAuth?.user ? JSON.parse(persistAuth.user)?.data?.role : undefined,
  guestToken: persistAuth?.guestToken ? JSON.parse(persistAuth.guestToken) : undefined,
}

export interface IAuthState {
  loading?: boolean
  success?: boolean
  user?: UserModel
  accessToken?: string
  data?: any
  userId?: string
  firstLogin?: boolean
  setNewPasswordSuccess?: boolean
  resetNewPasswordSuccess?: boolean
  module?: any
  rolePermissions?: RolePermissionsModel
  guestToken?: string
}

export const reducer = persistReducer(
  {
    storage,
    key: 'auth',
    whitelist: [
      'user',
      'accessToken',
      'userId',
      'loading',
      'firstLogin',
      'data',
      'module',
      'guestToken',
    ],
  },
  (state: IAuthState = initialAuthState, action: ActionWithPayload<IAuthState>) => {
    switch (action.type) {
      case actionTypes.LOGIN_REQUEST: {
        return {...state, loading: true}
      }

      case actionTypes.LOGIN_SUCCESS: {
        const accessToken = action.payload?.accessToken
        return {...state, accessToken, loading: false}
      }

      case actionTypes.LOGIN_FINISH: {
        return {...state, loading: false}
      }

      case actionTypes.FIRST_LOGIN_REQUEST: {
        return {...state, loading: true}
      }
      case actionTypes.FIRST_LOGIN_SUCCESS: {
        const userId = action.payload?.userId
        const firstLogin = action.payload?.firstLogin
        return {...state, data: action.payload, userId, firstLogin, loading: false}
      }

      case actionTypes.FIRST_LOGIN_FINISH: {
        return {...state, loading: false}
      }

      case actionTypes.SET_PASSWORD_REQUEST: {
        return {...state, loading: true, setNewPasswordSuccess: false}
      }

      case actionTypes.SET_PASSWORD_SUCCESS: {
        return {
          ...state,
          data: action.payload,
          firstLogin: false,
          loading: false,
          setNewPasswordSuccess: true,
        }
      }

      case actionTypes.SET_PASSWORD_FINISH: {
        return {...state, loading: false, setNewPasswordSuccess: false}
      }

      case actionTypes.RESET_PASSWORD_REQUEST: {
        return {...state, loading: true, resetNewPasswordSuccess: false}
      }

      case actionTypes.RESET_PASSWORD_SUCCESS: {
        return {
          ...state,
          data: action.payload,
          loading: false,
          resetNewPasswordSuccess: true,
        }
      }

      case actionTypes.RESET_PASSWORD_FINISH: {
        return {...state, loading: false, resetNewPasswordSuccess: false}
      }

      case actionTypes.FORGOT_PASSWORD_REQUEST: {
        return {...state, loading: true}
      }

      case actionTypes.FORGOT_PASSWORD_SUCCESS: {
        return {...state, data: action.payload, success: true, loading: false}
      }

      case actionTypes.FORGOT_PASSWORD_FINISH: {
        return {...state, data: {}, success: false, loading: false}
      }

      case actionTypes.Logout: {
        return {...initialAuthState, accessToken: undefined, module: undefined}
      }

      case actionTypes.UserLoaded: {
        const user = action.payload?.user
        return {...state, user, rolePermissions: user?.data?.role}
      }

      case actionTypes.SetUser: {
        const user = action.payload?.user
        return {...state, user}
      }

      case actionTypes.GET_DB_MODULE_REQUEST: {
        return {...state, loading: true}
      }

      case actionTypes.GET_DB_MODULE_SUCCESS: {
        return {...state, module: action.payload, loading: false}
      }

      case actionTypes.GET_DB_MODULE_FINISH: {
        return {...state, loading: false}
      }

      case actionTypes.GET_GUEST_TOKEN_START: {
        return {...state, loading: true}
      }

      case actionTypes.GET_GUEST_TOKEN_SUCCESS: {
        return {...state, guestToken: action.payload?.guestToken, loading: false}
      }
      case actionTypes.GET_GUEST_TOKEN_FINISH: {
        return {...state, loading: false}
      }

      default:
        return state
    }
  }
)
