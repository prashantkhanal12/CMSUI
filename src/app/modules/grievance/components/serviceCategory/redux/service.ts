import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteServiceCategoryModel} from '../Model'
import {ServiceCategoryModel} from '../Model/ServiceCategoryModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const SERVICE_CATEGORY = `${API_URL}/grievance/service-category`

export const service = {
  getServiceCategory: (params: ParamsModel) => {
    return axios.get(SERVICE_CATEGORY, {params})
  },
  getAllServiceCategory: () => {
    return axios.get(`${SERVICE_CATEGORY}/list`)
  },

  addServiceCategory: (data: any) => {
    return axios.post(SERVICE_CATEGORY, data)
  },

  updateServiceCategory: (body: ServiceCategoryModel, id: string) => {
    return axios.put(`${SERVICE_CATEGORY}/${id}`, body)
  },

  deleteServiceCategory: (data: DeleteServiceCategoryModel) => {
    return axios.delete(`${SERVICE_CATEGORY}/bulk-delete`, {data})
  },

  enableServiceCategory: (data: Array<string>) => {
    const selectedServiceCategory = {
      category: data,
    }
    return axios.put(`${SERVICE_CATEGORY}/bulk-active`, selectedServiceCategory)
  },

  disableServiceCategory: (data: Array<string>) => {
    const selectedServiceCategory = {
      category: data,
    }
    return axios.put(`${SERVICE_CATEGORY}/bulk-inactive`, selectedServiceCategory)
  },

  singleEnableServiceCategory: (data: Array<string>) => {
    const selectedServiceCategory = {
      category: [data],
    }
    return axios.put(`${SERVICE_CATEGORY}/bulk-active`, selectedServiceCategory)
  },

  singleDisableServiceCategory: (data: Array<string>) => {
    const selectedServiceCategory = {
      category: [data],
    }
    return axios.put(`${SERVICE_CATEGORY}/bulk-inactive`, selectedServiceCategory)
  },
}
