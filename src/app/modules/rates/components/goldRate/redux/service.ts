import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteGoldRateModel, GoldRateModel} from '../Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_GOLD_RATE = `${API_URL}/gold-rate`
export const POST_GOLD_RATE = `${API_URL}/gold-rate`
export const GET_GOLD_RATE_CATEGORY = `${API_URL}/gold-rate-category`
export const ACTIVATE_GOLD_RATES = `${API_URL}/gold-rate/enable`
export const DEACTIVATE_GOLD_RATE = `${API_URL}/gold-rate/disable`
export const ACTIVATE_GOLD_RATE = `${API_URL}/gold-rate`
export const DELETE_GOLD_RATE = `${API_URL}/gold-rate/destroy`
export const GET_GOLD_RATE_FILE = `${API_URL}/gold-rate/get-sample`
export const IMPORT_GOLD_RATE = `${API_URL}/gold-rate/store-from-file`

export const service = {
  getGoldRateCategory: (params: ParamsModel) => {
    return axios.get(GET_GOLD_RATE_CATEGORY, {params})
  },

  getGoldRate: (params: ParamsModel) => {
    return axios.get(GET_GOLD_RATE, {params})
  },

  //Get file
  getGoldRateFile: (fileName: string) => {
    return axios.get(`${GET_GOLD_RATE_FILE}/${fileName}`).then((response) => {
      const url = response?.data?.data?.file
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `Gold_Rate.${fileName}`) //or any other extension
      document.body.appendChild(link)
      link.click()
    })
  },

  //Post forex rate
  postGoldRate: (body: GoldRateModel) => {
    return axios.post(POST_GOLD_RATE, body)
  },

  //Activate Deactivate
  activateGoldRate: (data: Array<string>) => {
    const formData = {
      goldRateId: data,
    }
    return axios.patch(ACTIVATE_GOLD_RATES, formData)
  },

  //Latest needed
  singleActivateGoldRate: (id: string) => {
    return axios.patch(`${ACTIVATE_GOLD_RATE}/${id}/enable`)
  },

  singleDeactivateGoldRate: (id: string) => {
    return axios.patch(`${ACTIVATE_GOLD_RATE}/${id}/disable`)
  },

  deactivateGoldRate: (data: Array<string>) => {
    const formData = {
      goldRateId: data,
    }
    return axios.patch(DEACTIVATE_GOLD_RATE, formData)
  },

  //Import File from Pc
  importGoldRate: (data: any) => {
    return axios.post(IMPORT_GOLD_RATE, data)
  },

  //Update Gold Rate
  updateGoldRate: (body: GoldRateModel, id: string) => {
    return axios.patch(`${POST_GOLD_RATE}/${id}`, body)
  },

  //Delete Gold Rate
  deleteGoldRate: (data: DeleteGoldRateModel) => {
    return axios.delete(DELETE_GOLD_RATE, {data})
  },
}
