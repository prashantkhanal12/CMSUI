import axios from 'axios'
import {request} from 'http'
import {Route, Switch} from 'react-router-dom'
import {UserModel} from '../models/UserModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

// export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/login`
export const CHECK_FIRST_LOGIN = `${API_URL}/check-user-first-login`
export const SET_PASSWORD = `${API_URL}/set-password`
export const RESET_PASSWORD = `${API_URL}/reset-password`
export const GET_USER_DATA = `${API_URL}/profile`
export const GET_USER_MODULE = `${API_URL}/get-dashboard-module`
export const LOGIN_URL = `${API_URL}/login`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot-password`
export const GET_GUEST_TOKEN = `${API_URL}/guest-login`

export const service = {
  // Server should return AuthModel
  login: (data: any) => {
    const formData = new FormData() // Must be FormData so that the ajax request will be Form post
    Object.keys(data).forEach((k) => {
      formData.append(k, data[k])
    })
    return axios.post(LOGIN_URL, formData)
  },

  firstLogin: (data: any) => {
    return axios.get(`${CHECK_FIRST_LOGIN}?email=${data.email}`)
  },

  setPasswordService: (data: any) => {
    const formData: Object = {
      newPassword: data.password,
      confirmPassword: data.confirmPassword,
    }
    return axios.put(`${SET_PASSWORD}/${data.id}`, formData)
  },

  resetPasswordService: (data: any) => {
    const formData: Object = {
      password: data.password,
      confirmPassword: data.confirmPassword,
    }
    return axios.put(`${RESET_PASSWORD}/${data.id}`, formData)
  },

  getUserByToken: () => {
    return axios.get<UserModel>(GET_USER_DATA)
  },

  getModuleData: () => {
    return axios.get(GET_USER_MODULE)
  },

  // Server should return object => { result: boolean } (Is Email in DB)
  requestPassword: (data: any) => {
    return axios.post(REQUEST_PASSWORD_URL, data)
  },

  getGuestToken: () => {
    return axios.get(GET_GUEST_TOKEN)
  },
}
