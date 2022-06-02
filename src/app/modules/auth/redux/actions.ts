import {access} from 'fs'
import {UserModel} from '../models/UserModel'
import {actionTypes} from './constants'

export const actions = {
  login: (email: string, password: string) => ({
    type: actionTypes.LOGIN_REQUEST,
    payload: {email, password},
  }),
  logout: () => ({type: actionTypes.Logout}),
  checkFirstTimeLogin: (email: string) => ({
    type: actionTypes.FIRST_LOGIN_REQUEST,
    payload: {email},
  }),
  setPassword: (id: string | undefined, password: string, confirmPassword: string) => ({
    type: actionTypes.SET_PASSWORD_REQUEST,
    payload: {id, password, confirmPassword},
  }),

  resetPassword: (id: string | undefined, password: string, confirmPassword: string) => ({
    type: actionTypes.RESET_PASSWORD_REQUEST,
    payload: {id, password, confirmPassword},
  }),

  requestUser: (accessToken: string = '') => ({
    type: actionTypes.USER_REQUESTED,
    payload: accessToken,
  }),

  forgotPassword: (email: string) => ({
    type: actionTypes.FORGOT_PASSWORD_REQUEST,
    payload: {email},
  }),

  fulfillUser: (user: UserModel) => ({type: actionTypes.UserLoaded, payload: {user}}),
  setUser: (user: UserModel) => ({type: actionTypes.SetUser, payload: {user}}),
  store: () => ({type: 'def'}),

  getUserModule: () => ({
    type: actionTypes.GET_DB_MODULE_REQUEST,
  }),

  //Guest token
  getGuestToken: () => ({
    type: actionTypes.GET_GUEST_TOKEN_START,
  }),

  getGuestTokenSuccess: (data: string) => ({
    type: actionTypes.GET_GUEST_TOKEN_SUCCESS,
    payload: {guestToken: data},
  }),
  getGuestTokenFinish: (error: string) => ({
    type: actionTypes.GET_GUEST_TOKEN_FINISH,
    payload: error,
  }),
}
