import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteBranchManagerModel} from '../Model'
import {BranchManagerModel} from '../Model/BranchManagerModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_BRANCH_MANAGER_DATA = `${API_URL}/branch-manager`
export const IMPORT_BRANCH_MANAGER = `${API_URL}/branch-manager`

export const service = {
  getBranchManagerData: (params: ParamsModel) => {
    return axios.get(GET_BRANCH_MANAGER_DATA, {params})
  },

  addBranchManager: (data: any) => {
    return axios.post(GET_BRANCH_MANAGER_DATA, data)
  },

  updateBranchManager: (body: BranchManagerModel, id: string) => {
    return axios.put(`${GET_BRANCH_MANAGER_DATA}/${id}`, body)
  },

  deleteBranchManager: (data: DeleteBranchManagerModel) => {
    return axios.delete(`${GET_BRANCH_MANAGER_DATA}/bulk-delete`, {data})
  },

  enableBranchManager: (data: Array<string>) => {
    const selectedBranchManager = {
      manager: data,
    }
    return axios.put(`${GET_BRANCH_MANAGER_DATA}/bulk-active`, selectedBranchManager)
  },

  disableBranchManager: (data: Array<string>) => {
    const selectedBranchManager = {
      manager: data,
    }
    return axios.put(`${GET_BRANCH_MANAGER_DATA}/bulk-inactive`, selectedBranchManager)
  },

  singleEnableBranchManager: (data: Array<string>) => {
    const selectedBranchManager = {
      manager: [data],
    }
    return axios.put(`${GET_BRANCH_MANAGER_DATA}/bulk-active`, selectedBranchManager)
  },

  singleDisableBranchManager: (data: Array<string>) => {
    const selectedBranchManager = {
      manager: [data],
    }
    return axios.put(`${GET_BRANCH_MANAGER_DATA}/bulk-inactive`, selectedBranchManager)
  },

  //export file
  exportFile: (fileName: string, data: any) => {
    return (
      axios
        // .get(`${GET_BRANCH_MANAGER_DATA}/export?search=${data?.search || ''}&fileFormat=${fileType}`)
        .get(`${GET_BRANCH_MANAGER_DATA}/export`)
        .then((response) => {
          const blob = new Blob([response?.data])
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', `${fileName}.csv`) //or any other extension
          document.body.appendChild(link)
          link.click()
        })
    )
  },

  exportTemplateFile: () => {
    return (
      axios
        // .get(`${GET_BRANCH_MANAGER_DATA}/export?search=${data?.search || ''}&fileFormat=${fileType}`)
        .get(`${GET_BRANCH_MANAGER_DATA}/sample-file`)
        .then((response) => {
          const url = response.data?.data?.file
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', '') //or any other extension
          document.body.appendChild(link)
          link.click()
        })
    )
  },

  importBranchManager: (data: any) => {
    return axios.post(`${IMPORT_BRANCH_MANAGER}/import`, data)
  },
}
