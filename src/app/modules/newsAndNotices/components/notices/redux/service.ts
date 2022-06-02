import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteModel} from '../Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const NOTICES = `${API_URL}/notice`

export const service = {
  getNotice: (params: ParamsModel) => {
    return axios.get(NOTICES, {params})
  },

  addNotice: (data: any) => {
    return axios.post(NOTICES, data)
  },

  updateNotice: (body: any, id: string) => {
    return axios.patch(`${NOTICES}/${id}`, body)
  },

  deleteNotice: (data: DeleteModel) => {
    return axios.delete(NOTICES, {data})
  },
  singleActivateNotice: (id: any) => {
    return axios.patch(`${NOTICES}/enable`, id)
  },

  singleDeactivateNotice: (id: any) => {
    return axios.patch(`${NOTICES}/disable`, id)
  },
}
