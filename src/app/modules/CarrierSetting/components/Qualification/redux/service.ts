import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {QualificationModel, DeleteQualificationModel} from '../Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const QUALIFICATION = `${API_URL}/qualification`

export const service = {
  getQualification: (params: ParamsModel) => {
    return axios.get(QUALIFICATION, {params})
  },
  getAllQualification: () => {
    return axios.get(`${QUALIFICATION}`)
  },

  addQualification: (data: any) => {
    return axios.post(QUALIFICATION, data)
  },

  activateQualification: (data: Array<string>) => {
    const formData = {
      qualificationId: data,
    }
    return axios.patch(`${QUALIFICATION}/enable`, formData)
  },

  singleActivateQualification: (data: Array<string>) => {
    const formData = {
      qualificationId: [data],
    }
    return axios.patch(`${QUALIFICATION}/enable`, formData)
  },
  singleDeactivateQualification: (data: Array<string>) => {
    const formData = {
      qualificationId: [data],
    }
    return axios.patch(`${QUALIFICATION}/disable`, formData)
  },

  deactivateQualification: (data: Array<string>) => {
    const formData = {
      qualificationId: data,
    }
    return axios.patch(`${QUALIFICATION}/disable`, formData)
  },

  updateQualification: (body: QualificationModel, id: string) => {
    return axios.put(`${QUALIFICATION}/${id}`, body)
  },

  deleteQualification: (data: QualificationModel) => {
    return axios.delete(QUALIFICATION, {data})
  },
}
