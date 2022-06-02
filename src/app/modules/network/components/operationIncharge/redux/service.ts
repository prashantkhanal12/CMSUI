import axios from 'axios'
import {DeleteModel} from '../Model'
import {OperationInchargeModel} from '../Model/OperationInchargeModel'
import {ParamsModel} from 'src/app/modules/common/Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const OPERATION_INCHARGE = `${API_URL}/operation-incharge`
export const IMPORT_OPERATION_INCHARGE = `${API_URL}/branch/store-from-file`
export const service = {
  // get branchless banking
  getOperationIncharge: (params: ParamsModel) => {
    return axios.get(OPERATION_INCHARGE, {params})
  },

  // add branchless banking
  postOperationIncharge: (body: OperationInchargeModel) => {
    return axios.post(OPERATION_INCHARGE, body)
  },

  updateOperationIncharge: (body: OperationInchargeModel, id: string) => {
    return axios.patch(`${OPERATION_INCHARGE}/${id}`, body)
  },

  deleteOperationIncharge: (data: DeleteModel) => {
    return axios.delete(OPERATION_INCHARGE, {data})
  },

  singleActivateOperationIncharge: (id: any) => {
    return axios.patch(`${OPERATION_INCHARGE}/enable`, id)
  },

  singleDeactivateOperationIncharge: (id: any) => {
    return axios.patch(`${OPERATION_INCHARGE}/disable`, id)
  },

  //export file
  exportFile: (fileName: string, data: any) => {
    return axios
      .get(`${OPERATION_INCHARGE}/export?search=${data?.search || ''}`)
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

  importOperationIncharge: (data: any) => {
    return axios.post(IMPORT_OPERATION_INCHARGE, data)
  },
}
