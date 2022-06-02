import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteForexRateModel, ForexRateModel} from '../Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_FOREX_RATE = `${API_URL}/forex-rate`
export const POST_FOREX_RATE = `${API_URL}/forex-rate`
export const ACTIVATE_FOREX_RATES = `${API_URL}/forex-rate/enable`
export const DEACTIVATE_FOREX_RATE = `${API_URL}/forex-rate/disable`
export const ACTIVATE_FOREX_RATE = `${API_URL}/forex-rate`
export const DELETE_FOREX_RATE = `${API_URL}/forex-rate/destroy`
export const GET_FOREX_RATE_FILE = `${API_URL}/forex-rate/get-sample`
export const IMPORT_FOREX_RATE = `${API_URL}/forex-rate/store-from-file`

export const service = {
  getForexRate: (params: ParamsModel) => {
    return axios.get(GET_FOREX_RATE, {params})
  },

  //Get file
  getForexRateFile: (fileName: string) => {
    return axios.get(`${GET_FOREX_RATE_FILE}/${fileName}`).then((response) => {
      const url = response?.data?.data?.file
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `Forex_rate.${fileName}`) //or any other extension
      document.body.appendChild(link)
      link.click()
    })
  },

  //Activate Deactivate
  activateForexRate: (data: Array<string>) => {
    const formData = {
      forexRateId: data,
    }
    return axios.patch(ACTIVATE_FOREX_RATES, formData)
  },

  //Activatae Deactivate post
  singleActivateForexRate: (id: string) => {
    return axios.patch(`${ACTIVATE_FOREX_RATE}/${id}/enable`)
  },

  singleDeactivateForexRate: (id: string) => {
    return axios.patch(`${ACTIVATE_FOREX_RATE}/${id}/disable`)
  },

  deactivateForexRate: (data: Array<string>) => {
    const formData = {
      forexRateId: data,
    }
    return axios.patch(DEACTIVATE_FOREX_RATE, formData)
  },

  //Import File from Pc
  importForexRate: (data: any) => {
    return axios.post(IMPORT_FOREX_RATE, data)
  },

  //post forex rate
  postForexRate: (body: ForexRateModel) => {
    return axios.post(POST_FOREX_RATE, body)
  },

  updateForexRate: (body: ForexRateModel, id: string) => {
    return axios.patch(`${POST_FOREX_RATE}/${id}`, body)
  },

  deleteForexRate: (data: DeleteForexRateModel) => {
    return axios.delete(DELETE_FOREX_RATE, {data})
  },
}
