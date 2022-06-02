import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {
  DeleteFaqCategoryModel,
  FaqCategoryModel,
  FaqParamsModel,
  SortFaqCategoryModel,
} from '../Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_FAQ_CATEGORY = `${API_URL}/faq-category`
export const ADD_FAQ_CATEGORY = `${API_URL}/faq-category`
export const ACTIVATE_FAQ_CATEGORY = `${API_URL}/faq-category/enable`
export const DEACTIVATE_FAQ_CATEGORY = `${API_URL}/faq-category/disable`
export const DELETE_FAQ_CATEGORY = `${API_URL}/faq-category`
export const service = {
  getAllFaqCategory: (params: FaqParamsModel) => {
    return axios.get(`${GET_FAQ_CATEGORY}/list`, {params})
  },

  getFaqCategory: (params: ParamsModel) => {
    return axios.get(GET_FAQ_CATEGORY, {params})
  },

  addFaqCategory: (data: any) => {
    return axios.post(ADD_FAQ_CATEGORY, data)
  },

  activateFaqCategory: (data: Array<string>) => {
    const formData = {
      faqCategoryId: data,
    }
    return axios.patch(ACTIVATE_FAQ_CATEGORY, formData)
  },

  singleActivateFaqCategory: (data: Array<string>) => {
    const formData = {
      faqCategoryId: [data],
    }
    return axios.patch(ACTIVATE_FAQ_CATEGORY, formData)
  },
  singleDeactivateFaqCategory: (data: Array<string>) => {
    const formData = {
      faqCategoryId: [data],
    }
    return axios.patch(DEACTIVATE_FAQ_CATEGORY, formData)
  },

  deactivateFaqCategory: (data: Array<string>) => {
    const formData = {
      faqCategoryId: data,
    }
    return axios.patch(DEACTIVATE_FAQ_CATEGORY, formData)
  },

  updateFaqCategory: (body: FaqCategoryModel, id: string) => {
    return axios.patch(`${ADD_FAQ_CATEGORY}/${id}`, body)
  },

  deleteFaqCategory: (data: DeleteFaqCategoryModel) => {
    return axios.delete(DELETE_FAQ_CATEGORY, {data})
  },

  sortFaqCategory: (body: SortFaqCategoryModel) => {
    return axios.patch(`${GET_FAQ_CATEGORY}/sort`, body)
  },
}
