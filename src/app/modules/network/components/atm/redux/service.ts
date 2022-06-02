import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteAtmModel} from '../Model'
import {AtmModel} from '../Model/AtmModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_ATM_DATA = `${API_URL}/atm`
export const IMPORT_ATM = `${API_URL}/atm/import`

export const service = {
  getAtmData: (params: ParamsModel) => {
    return axios.get(GET_ATM_DATA, {params})
  },

  addAtm: (data: any) => {
    return axios.post(GET_ATM_DATA, data)
  },

  updateAtm: (body: AtmModel, id: string) => {
    return axios.put(`${GET_ATM_DATA}/${id}`, body)
  },

  deleteAtm: (data: DeleteAtmModel) => {
    return axios.delete(`${GET_ATM_DATA}/bulk-delete`, {data})
  },

  enableAtm: (data: Array<string>) => {
    const selectedAtm = {
      atm: data,
    }
    return axios.put(`${GET_ATM_DATA}/bulk-active`, selectedAtm)
  },

  disableAtm: (data: Array<string>) => {
    const selectedAtm = {
      atm: data,
    }
    return axios.put(`${GET_ATM_DATA}/bulk-inactive`, selectedAtm)
  },

  singleEnableAtm: (data: Array<string>) => {
    const selectedAtm = {
      atm: [data],
    }
    return axios.put(`${GET_ATM_DATA}/bulk-active`, selectedAtm)
  },

  singleDisableAtm: (data: Array<string>) => {
    const selectedAtm = {
      atm: [data],
    }
    return axios.put(`${GET_ATM_DATA}/bulk-inactive`, selectedAtm)
  },

  //export file
  exportFile: (fileName: string, data: any) => {
    return axios.get(`${GET_ATM_DATA}/export?search=${data?.search || ''}`).then((response) => {
      const blob = new Blob([response?.data])
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${fileName}.csv`) //or any other extension
      document.body.appendChild(link)
      link.click()
    })
  },

  importAtm: (data: any) => {
    return axios.post(IMPORT_ATM, data)
  },
}
