import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteServiceSubTypeModel} from '../Model'
import {ServiceSubTypeModel} from '../Model/ServiceSubTypeModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const SERVICE_SUB_TYPE = `${API_URL}/grievance/service-sub-type`

export const service = {
  getServiceSubType: (params: ParamsModel) => {
    return axios.get(SERVICE_SUB_TYPE, {params})
  },
  getAllServiceSubType: () => {
    return axios.get(`${SERVICE_SUB_TYPE}/list`)
  },

  addServiceSubType: (data: any) => {
    return axios.post(SERVICE_SUB_TYPE, data)
  },

  updateServiceSubType: (body: ServiceSubTypeModel, id: string) => {
    return axios.put(`${SERVICE_SUB_TYPE}/${id}`, body)
  },

  deleteServiceSubType: (data: DeleteServiceSubTypeModel) => {
    return axios.delete(`${SERVICE_SUB_TYPE}/bulk-delete`, {data})
  },

  enableServiceSubType: (data: Array<string>) => {
    const selectedServiceSubType = {
      serviceSubType: data,
    }
    return axios.put(`${SERVICE_SUB_TYPE}/bulk-active`, selectedServiceSubType)
  },

  disableServiceSubType: (data: Array<string>) => {
    const selectedServiceSubType = {
      serviceSubType: data,
    }
    return axios.put(`${SERVICE_SUB_TYPE}/bulk-inactive`, selectedServiceSubType)
  },

  singleEnableServiceSubType: (data: Array<string>) => {
    const selectedServiceSubType = {
      serviceSubType: [data],
    }
    return axios.put(`${SERVICE_SUB_TYPE}/bulk-active`, selectedServiceSubType)
  },

  singleDisableServiceSubType: (data: Array<string>) => {
    const selectedServiceSubType = {
      serviceSubType: [data],
    }
    return axios.put(`${SERVICE_SUB_TYPE}/bulk-inactive`, selectedServiceSubType)
  },
}
