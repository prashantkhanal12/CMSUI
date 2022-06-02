import axios from 'axios'
import {DeleteKeyModel, KeyModel} from '../Model'
import {ParamsModel} from 'src/app/modules/common/Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_KEY = `${API_URL}/key-setting`
export const POST_KEY = `${API_URL}/key-setting`

export const service = {
  getKeySetting: (params: ParamsModel) => {
    return axios.get(GET_KEY, {params})
  },

  postKey: (body: KeyModel) => {
    return axios.post(POST_KEY, body)
  },

  updateKey: (body: KeyModel, id: string) => {
    return axios.patch(`${POST_KEY}/${id}`, body)
  },

  deleteKey: (data: DeleteKeyModel) => {
    return axios.delete(POST_KEY, {data})
  },

  // postKey: (data: any) => {
  //   return axios.post(POST_KEY, data.values, {
  //     headers: {
  //       Authorization: `
  //           Bearer ${data.accessToken}`,
  //     },
  //   })
  // },
}
