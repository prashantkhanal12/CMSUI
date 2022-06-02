import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteServiceTagModel, ServiceTagModel, SortServiceTagModel} from '../Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_SERVICE_TAG = `${API_URL}/service-tag`

export const service = {
  getServiceTag: (params: ParamsModel) => {
    return axios.get(GET_SERVICE_TAG, {params})
  },

  addServiceTag: (data: any) => {
    return axios.post(GET_SERVICE_TAG, data)
  },

  updateServiceTag: (body: ServiceTagModel, id: string) => {
    return axios.patch(`${GET_SERVICE_TAG}/${id}`, body)
  },

  deleteServiceTag: (data: DeleteServiceTagModel) => {
    return axios.delete(GET_SERVICE_TAG, {data})
  },

  enableServiceTag: (data: Array<string>) => {
    const selectedServiceTag = {
      serviceTagId: data,
    }
    return axios.patch(`${GET_SERVICE_TAG}/enable`, selectedServiceTag)
  },

  disableServiceTag: (data: Array<string>) => {
    const selectedServiceTag = {
      serviceTagId: data,
    }
    return axios.patch(`${GET_SERVICE_TAG}/disable`, selectedServiceTag)
  },

  singleEnableServiceTag: (data: Array<string>) => {
    const selectedServiceTag = {
      serviceTagId: [data],
    }
    return axios.patch(`${GET_SERVICE_TAG}/enable`, selectedServiceTag)
  },

  singleDisableServiceTag: (data: Array<string>) => {
    const selectedServiceTag = {
      serviceTagId: [data],
    }
    return axios.patch(`${GET_SERVICE_TAG}/disable`, selectedServiceTag)
  },

  getServiceTagList: (params: any) => {
    return axios.get(`${GET_SERVICE_TAG}/list`, {params})
  },

  sortServiceTag: (body: SortServiceTagModel) => {
    return axios.patch(`${GET_SERVICE_TAG}/sort`, body)
  },
}
