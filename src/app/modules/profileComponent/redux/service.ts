import axios from 'axios'
import {isEmpty} from 'lodash'
import {PasswordModel} from '../ProfileModels'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const UPDATE_PASSWORD = `${API_URL}/update-password`

export const service = {
  // Server should return AuthModel

  updatePassword: (body: PasswordModel, accessToken: string) => {
    const axiosInstance = axios.create({
      baseURL: UPDATE_PASSWORD,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!isEmpty(accessToken)) {
      return axiosInstance.post(UPDATE_PASSWORD, body)
    } else {
      return axios.post(UPDATE_PASSWORD, body)
    }
  },
}
