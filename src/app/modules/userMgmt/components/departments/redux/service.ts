import axios from 'axios'
import {DeleteDepartmentModel, DepartmentModel} from '../Model'
import {ParamsModel} from 'src/app/modules/common/Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const DEPARTMENT = `${API_URL}/department`

export const service = {
  getDepartment: (params: ParamsModel) => {
    return axios.get(DEPARTMENT, {params})
  },

  postDepartment: (body: DepartmentModel) => {
    return axios.post(DEPARTMENT, body)
  },

  updateDepartment: (body: DepartmentModel, id: string) => {
    return axios.put(`${DEPARTMENT}/${id}`, body)
  },

  deleteDepartment: (data: DeleteDepartmentModel) => {
    return axios.delete(`${DEPARTMENT}/bulk-delete`, {data})
  },

  singleActivatedDepartment: (body: any) => {
    return axios.put(`${DEPARTMENT}/bulk-active`, body)
  },

  singleDeactivatedDepartment: (body: any) => {
    return axios.put(`${DEPARTMENT}/bulk-inactive`, body)
  },
}
