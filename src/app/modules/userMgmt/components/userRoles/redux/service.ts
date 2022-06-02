import axios from 'axios'
import { ParamsModel } from 'src/app/modules/common/Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const ADD_USER_ROLE = `${API_URL}/user-role`
export const GET_USERS_ROLE = `${API_URL}/user-role`

import { RoleModel } from '../../../Model'

export const service = {
  getUserRole: (params?: ParamsModel) => {
    return axios.get(GET_USERS_ROLE, { params })
  },

  addUserRole: (body: RoleModel) => {
    return axios.post(ADD_USER_ROLE, body)
  },

  updateUserRole: (body: RoleModel, id: string) => {
    return axios.put(`${ADD_USER_ROLE}/${id}`, body)
  },
}
