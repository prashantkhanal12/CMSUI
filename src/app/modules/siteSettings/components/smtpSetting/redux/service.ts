import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteSmtpModel, SmtpModel} from '../Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_SMTP = `${API_URL}/smtp-setting`
export const POST_SMTP = `${API_URL}/smtp-setting`

export const service = {
  getSmtpSetting: (params: ParamsModel) => {
    return axios.get(GET_SMTP, {params})
  },

  getSmtpEncryption: () => {
    return axios.get(`${GET_SMTP}/encryption`)
  },

  postSmtp: (body: SmtpModel) => {
    return axios.post(POST_SMTP, body)
  },

  updateSmtp: (body: SmtpModel, id: string) => {
    return axios.patch(`${POST_SMTP}/${id}`, body)
  },

  deleteSmtp: (data: DeleteSmtpModel) => {
    return axios.delete(POST_SMTP, {data})
  },
}
