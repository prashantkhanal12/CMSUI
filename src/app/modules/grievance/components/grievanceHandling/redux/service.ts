import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteServiceTypeModel} from '../Model'
import {ServiceTypeModel} from '../Model/ServiceTypeModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const SERVICE_TYPE = `${API_URL}/grievance`

export const service = {
  getGrievance: (params: ParamsModel) => {
    return axios.get(SERVICE_TYPE, {params})
  },

  //export file
  exportGrievanceFile: (fileName: string, params: ParamsModel) => {
    return axios.get(`${SERVICE_TYPE}/export`, {params}).then((response) => {
      const blob = new Blob([response?.data])
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${fileName}.csv`) //or any other extension
      document.body.appendChild(link)
      link.click()
    })
  },
}
