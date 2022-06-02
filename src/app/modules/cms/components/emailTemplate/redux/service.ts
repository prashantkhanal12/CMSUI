import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteEmailTemplateModel, EmailTemplateModel} from '../Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_EMAIL_TEMPLATE = `${API_URL}/email-template`

export const service = {
  getEmailTemplate: (params: ParamsModel) => {
    return axios.get(GET_EMAIL_TEMPLATE, {params})
  },

  addEmailTemplate: (data: any) => {
    return axios.post(GET_EMAIL_TEMPLATE, data)
  },

  updateEmailTemplate: (body: EmailTemplateModel, id: string) => {
    return axios.put(`${GET_EMAIL_TEMPLATE}/${id}`, body)
  },

  deleteEmailTemplate: (data: DeleteEmailTemplateModel) => {
    return axios.delete(GET_EMAIL_TEMPLATE, {data})
  },
}
