import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteModel} from '../Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const NEWS = `${API_URL}/news`

export const service = {
  getNews: (params: ParamsModel) => {
    return axios.get(NEWS, {params})
  },

  addNews: (data: any) => {
    return axios.post(NEWS, data)
  },

  updateNews: (body: any, id: string) => {
    return axios.patch(`${NEWS}/${id}`, body)
  },

  deleteNews: (data: DeleteModel) => {
    return axios.delete(NEWS, {data})
  },
  singleActivateNews: (id: any) => {
    return axios.patch(`${NEWS}/enable`, id)
  },

  singleDeactivateNews: (id: any) => {
    return axios.patch(`${NEWS}/disable`, id)
  },
}
