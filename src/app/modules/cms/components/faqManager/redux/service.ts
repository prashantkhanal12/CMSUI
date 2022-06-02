import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {FaqManagerModel} from '../Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_FAQ_MANAGER = `${API_URL}/faq-qna`
export const UPDATE_FAQ_MANAGER = `${API_URL}/faq-qna/createUpdate`

export const service = {
  getFaqManager: (params: ParamsModel, id: string) => {
    return axios.get(`${GET_FAQ_MANAGER}?faqCategoryId=${id}`, {params})
  },

  addFaqManager: (data: any) => {
    return axios.patch(UPDATE_FAQ_MANAGER, data)
  },

  updateFaqManager: (body: FaqManagerModel, id: string) => {
    return axios.patch(`${UPDATE_FAQ_MANAGER}/${id}`, body)
  },
}
