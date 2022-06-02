import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {RoleModel} from '../../../Model'
import { DeleteRoleModel } from '../Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const ADD_ROLE = `${API_URL}/role`
export const GET_ROLE = `${API_URL}/role`
export const DELETE_ROLE = `${API_URL}/role`

export const service = {
  addRole: (body: RoleModel) => {
    return axios.post(ADD_ROLE, body)
  },

  updateRole: (body: RoleModel, id: string) => {
    return axios.patch(`${ADD_ROLE}/${id}`, body)
  },
  getRole: (params: ParamsModel) => {
    return axios.get(GET_ROLE, {params})
  },

  deleteRole: (data: DeleteRoleModel) => {
    return axios.delete(DELETE_ROLE, {data})
  },
}
