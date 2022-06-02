import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteMerchantManagerModel, SortMerchantManagerModel} from '../Model'
import {MerchantManagerModel} from '../Model/MerchantManagerModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const MERCHANT_MANAGER_DATA = `${API_URL}/merchant`

export const service = {
  getMerchantManager: (params: ParamsModel) => {
    return axios.get(MERCHANT_MANAGER_DATA, {params})
  },
  getAllMerchantManager: () => {
    return axios.get(`${MERCHANT_MANAGER_DATA}/list`)
  },

  addMerchantManager: (data: any) => {
    return axios.post(MERCHANT_MANAGER_DATA, data)
  },

  updateMerchantManager: (body: MerchantManagerModel, id: string) => {
    return axios.put(`${MERCHANT_MANAGER_DATA}/${id}`, body)
  },

  deleteMerchantManager: (data: DeleteMerchantManagerModel) => {
    return axios.delete(MERCHANT_MANAGER_DATA, {data})
  },

  enableMerchantManager: (data: Array<string>) => {
    const selectedMerchantManager = {
      merchantId: data,
    }
    return axios.patch(`${MERCHANT_MANAGER_DATA}/enable`, selectedMerchantManager)
  },

  disableMerchantManager: (data: Array<string>) => {
    const selectedMerchantManager = {
      merchantId: data,
    }
    return axios.patch(`${MERCHANT_MANAGER_DATA}/disable`, selectedMerchantManager)
  },

  singleEnableMerchantManager: (data: Array<string>) => {
    const selectedMerchantManager = {
      merchantId: [data],
    }
    return axios.patch(`${MERCHANT_MANAGER_DATA}/enable`, selectedMerchantManager)
  },

  singleDisableMerchantManager: (data: Array<string>) => {
    const selectedMerchantManager = {
      merchantId: [data],
    }
    return axios.patch(`${MERCHANT_MANAGER_DATA}/disable`, selectedMerchantManager)
  },
  sortMerchantManager: (body: SortMerchantManagerModel) => {
    return axios.patch(`${MERCHANT_MANAGER_DATA}/sort`, body)
  },
}
