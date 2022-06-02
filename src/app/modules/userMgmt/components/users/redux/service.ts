import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteUserModel, UserModel} from '../Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_USERS = `${API_URL}/user`
export const ADD_USER = `${API_URL}/create-user`
export const ACTIVATE_USERS = `${API_URL}/user/enable`
export const ACTIVATE_USER = `${API_URL}/user`
export const DEACTIVATE_USERS = `${API_URL}/user/disable`
export const UPDATE_USERS = `${API_URL}/update-user`
export const DELETE_USER = `${API_URL}/user/destroy`

export const service = {
  // Server should return AuthModel

  getUsers: (params: ParamsModel) => {
    return axios.get(GET_USERS, {params})
  },

  addUser: (data: any) => {
    return axios.post(ADD_USER, data)
  },

  activateUsers: (data: Array<string>) => {
    const formData = {
      userId: data,
    }
    return axios.patch(ACTIVATE_USERS, formData)
  },

  singleActivateUser: (id: string) => {
    return axios.patch(`${ACTIVATE_USER}/${id}/enable`)
  },

  singleDeactivateUser: (id: string) => {
    return axios.patch(`${ACTIVATE_USER}/${id}/disable`)
  },

  deactivateUsers: (data: Array<string>) => {
    const formData = {
      userId: data,
    }
    return axios.patch(DEACTIVATE_USERS, formData)
  },

  updateUser: (body: UserModel, id: string) => {
    return axios.put(`${UPDATE_USERS}/${id}`, body)
  },

  deleteUsers: (data: DeleteUserModel) => {
    return axios.delete(DELETE_USER, {data})
  },
}
