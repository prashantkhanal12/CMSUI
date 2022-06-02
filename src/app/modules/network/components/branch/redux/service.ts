import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteBranchModel} from '../Model'
import {BranchModel} from '../Model/BranchModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_BRANCH_CATEGORY = `${API_URL}/district-category-option`
export const GET_EXTENDED_HOURS = `${API_URL}/branch-extended-hours-status`
export const GET_BRANCH_DATA = `${API_URL}/branch`
export const IMPORT_BRANCH = `${API_URL}/branch/store-from-file`

export const service = {
  getBranchCategory: () => {
    return axios.get(GET_BRANCH_CATEGORY)
  },

  getExtendedHours: () => {
    return axios.get(GET_EXTENDED_HOURS)
  },

  getBranchData: (params: ParamsModel) => {
    return axios.get(GET_BRANCH_DATA, {params})
  },
  getAllBranchData: () => {
    return axios.get(`${GET_BRANCH_DATA}/list`)
  },

  addBranch: (data: any) => {
    return axios.post(GET_BRANCH_DATA, data)
  },

  updateBranch: (body: BranchModel, id: string) => {
    return axios.patch(`${GET_BRANCH_DATA}/${id}`, body)
  },

  deleteBranch: (data: DeleteBranchModel) => {
    return axios.delete(GET_BRANCH_DATA, {data})
  },

  enableBranch: (data: Array<string>) => {
    const selectedBranch = {
      branchId: data,
    }
    return axios.patch(`${GET_BRANCH_DATA}/enable`, selectedBranch)
  },

  disableBranch: (data: Array<string>) => {
    const selectedBranch = {
      branchId: data,
    }
    return axios.patch(`${GET_BRANCH_DATA}/disable`, selectedBranch)
  },

  singleEnableBranch: (data: Array<string>) => {
    const selectedBranch = {
      branchId: [data],
    }
    return axios.patch(`${GET_BRANCH_DATA}/enable`, selectedBranch)
  },

  singleDisableBranch: (data: Array<string>) => {
    const selectedBranch = {
      branchId: [data],
    }
    return axios.patch(`${GET_BRANCH_DATA}/disable`, selectedBranch)
  },

  //export file
  exportFile: (fileName: string, data: any) => {
    return axios
      .get(`${GET_BRANCH_DATA}/export?search=${data?.search || ''}&fileFormat=csv`)
      .then((response) => {
        const blob = new Blob([response?.data])
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${fileName}.csv`) //or any other extension
        document.body.appendChild(link)
        link.click()
      })
  },

  exportTemplateFile: () => {
    return axios.get(`${GET_BRANCH_DATA}/get-sample`).then((response) => {
      // const blob = new Blob([response?.data])
      // const url = window.URL.createObjectURL(blob)
      const url = response?.data?.data?.file
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', '') //or any other extension
      document.body.appendChild(link)
      link.click()
    })
  },

  importBranch: (data: any) => {
    return axios.post(IMPORT_BRANCH, data)
  },
}
