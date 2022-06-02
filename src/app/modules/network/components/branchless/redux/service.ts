import axios from 'axios'
import {DeleteModel} from '../Model'
import {BranchlessModel} from './../Model/BranchlessModel'
import {ParamsModel} from 'src/app/modules/common/Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_BRANCHLESS_BANKING = `${API_URL}/branchless-banking`

export const service = {
  // get branchless banking
  getBranchlessBanking: (params: ParamsModel) => {
    return axios.get(GET_BRANCHLESS_BANKING, {params})
  },

  // add branchless banking
  postBranchlessBanking: (body: BranchlessModel) => {
    return axios.post(GET_BRANCHLESS_BANKING, body)
  },

  updateBranchlessBanking: (body: BranchlessModel, id: string) => {
    return axios.patch(`${GET_BRANCHLESS_BANKING}/${id}`, body)
  },

  deleteBranchlessBanking: (data: DeleteModel) => {
    return axios.delete(GET_BRANCHLESS_BANKING, {data})
  },

  singleActivateBranchlessBanking: (id: any) => {
    return axios.patch(`${GET_BRANCHLESS_BANKING}/enable`, id)
  },

  singleDeactivateBranchlessBanking: (id: any) => {
    return axios.patch(`${GET_BRANCHLESS_BANKING}/disable`, id)
  },

  //export file
  exportFile: (fileName: string, data: any) => {
    return axios
      .get(`${GET_BRANCHLESS_BANKING}/export?search=${data?.search || ''}`)
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
}
