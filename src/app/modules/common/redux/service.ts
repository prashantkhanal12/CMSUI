import axios from 'axios'
import {ParamsModel} from '../Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_USERS_ROLE_PERMISSION = `${API_URL}/permission/list`
export const GET_DISTRICT = `${API_URL}/district`
export const GET_PROVINCE = `${API_URL}/province`
export const GET_CATEGORY_TYPE = `${API_URL}/category-type`
export const GET_CUSTOMER_TESTIMONIAL_MEDIA_TYPE = `${API_URL}/customer-testimonial-media-type`

export const service = {
  getPermissions: () => {
    return axios.get(GET_USERS_ROLE_PERMISSION)
  },

  getDistrict: (id: string) => {
    return axios.get(`${GET_DISTRICT}?provinceId=${id}`)
  },

  getProvince: () => {
    return axios.get(GET_PROVINCE)
  },
  getCategoryType: () => {
    return axios.get(GET_CATEGORY_TYPE)
  },
  getMediaType: () => {
    return axios.get(GET_CUSTOMER_TESTIMONIAL_MEDIA_TYPE)
  },
}
