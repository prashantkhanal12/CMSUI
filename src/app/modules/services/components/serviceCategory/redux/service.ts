import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteServiceCategoryModel, ServiceCategoryModel, SortServiceCategoryModel} from '../Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_SERVICE_CATEGORY = `${API_URL}/service-category`

export const service = {
  getServiceCategory: (params: ParamsModel) => {
    return axios.get(GET_SERVICE_CATEGORY, {params})
  },

  getServiceCategoryList: () => {
    return axios.get(`${GET_SERVICE_CATEGORY}/list`)
  },

  addServiceCategory: (data: any) => {
    return axios.post(GET_SERVICE_CATEGORY, data)
  },

  updateServiceCategory: (body: ServiceCategoryModel, id: string) => {
    return axios.patch(`${GET_SERVICE_CATEGORY}/${id}`, body)
  },

  deleteServiceCategory: (data: DeleteServiceCategoryModel) => {
    return axios.delete(GET_SERVICE_CATEGORY, {data})
  },

  enableServiceCategory: (data: Array<string>) => {
    const selectedServiceCategory = {
      serviceCategoryId: data,
    }
    return axios.patch(`${GET_SERVICE_CATEGORY}/enable`, selectedServiceCategory)
  },

  disableServiceCategory: (data: Array<string>) => {
    const selectedServiceCategory = {
      serviceCategoryId: data,
    }
    return axios.patch(`${GET_SERVICE_CATEGORY}/disable`, selectedServiceCategory)
  },

  singleEnableServiceCategory: (data: Array<string>) => {
    const selectedServiceCategory = {
      serviceCategoryId: [data],
    }
    return axios.patch(`${GET_SERVICE_CATEGORY}/enable`, selectedServiceCategory)
  },

  singleDisableServiceCategory: (data: Array<string>) => {
    const selectedServiceCategory = {
      serviceCategoryId: [data],
    }
    return axios.patch(`${GET_SERVICE_CATEGORY}/disable`, selectedServiceCategory)
  },

  sortServiceCategory: (body: SortServiceCategoryModel) => {
    return axios.patch(`${GET_SERVICE_CATEGORY}/sort`, body)
  },
}
