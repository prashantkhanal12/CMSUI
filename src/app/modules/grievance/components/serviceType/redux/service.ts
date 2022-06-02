import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteServiceTypeModel} from '../Model'
import {ServiceTypeModel} from '../Model/ServiceTypeModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const SERVICE_TYPE = `${API_URL}/grievance/service-type`

export const service = {
  getServiceType: (params: ParamsModel) => {
    return axios.get(SERVICE_TYPE, {params})
  },
  getAllServiceType: () => {
    return axios.get(`${SERVICE_TYPE}/list`)
  },

  addServiceType: (data: any) => {
    return axios.post(SERVICE_TYPE, data)
  },

  updateServiceType: (body: ServiceTypeModel, id: string) => {
    return axios.put(`${SERVICE_TYPE}/${id}`, body)
  },

  deleteServiceType: (data: DeleteServiceTypeModel) => {
    return axios.delete(`${SERVICE_TYPE}/bulk-delete`, {data})
  },

  enableServiceType: (data: Array<string>) => {
    const selectedServiceType = {
      Type: data,
    }
    return axios.put(`${SERVICE_TYPE}/bulk-active`, selectedServiceType)
  },

  disableServiceType: (data: Array<string>) => {
    const selectedServiceType = {
      Type: data,
    }
    return axios.put(`${SERVICE_TYPE}/bulk-inactive`, selectedServiceType)
  },

  singleEnableServiceType: (data: Array<string>) => {
    const selectedServiceType = {
      Type: [data],
    }
    return axios.put(`${SERVICE_TYPE}/bulk-active`, selectedServiceType)
  },

  singleDisableServiceType: (data: Array<string>) => {
    const selectedServiceType = {
      Type: [data],
    }
    return axios.put(`${SERVICE_TYPE}/bulk-inactive`, selectedServiceType)
  },
}
