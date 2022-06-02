import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteModel} from '../Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const CMS_CSR = `${API_URL}/csr`

export const service = {
  getCsrData: (params: ParamsModel) => {
    return axios.get(CMS_CSR, {params})
  },
  getCsrFileType: () => {
    return axios.get(`${API_URL}/csr-file-type-option`)
  },
  getCsrList: () => {
    return axios.get(`${CMS_CSR}/list`)
  },
  addCsrItem: (data: any) => {
    return axios.post(CMS_CSR, data)
  },

  updateCsrItem: (body: any, id: string) => {
    return axios.put(`${CMS_CSR}/${id}`, body)
  },

  deleteBulkCsr: (data: DeleteModel) => {
    return axios.delete(`${CMS_CSR}/bulk-delete`, {data})
  },

  activateCsr: (data: Array<string>) => {
    const selectedMemberType = {
      csr: data,
    }
    return axios.put(`${CMS_CSR}/bulk-active`, selectedMemberType)
  },

  deactivateCsr: (data: Array<string>) => {
    const selectedMemberType = {
      csr: data,
    }
    return axios.put(`${CMS_CSR}/bulk-inactive`, selectedMemberType)
  },

  singleActivateCsr: (data: Array<string>) => {
    const selectedMemberType = {
      csr: [data],
    }
    return axios.put(`${CMS_CSR}/bulk-active`, selectedMemberType)
  },

  singleDeactivateCsr: (data: Array<string>) => {
    const selectedMemberType = {
      csr: [data],
    }
    return axios.put(`${CMS_CSR}/bulk-inactive`, selectedMemberType)
  },
  sortCategories: (data: Array<string>) => {
    return axios.put(`${CMS_CSR}/sort`, data)
  },
}
