import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {SortServiceManagerModel} from '../Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_SERVICE_MANAGER = `${API_URL}/service-manager`
export const GET_SERVICE_MANAGER_LIST = `${API_URL}/service-manager/list`
export const GET_SERVICE_REVIEW_OPTION = `${API_URL}/service-review-option`
export const GET_SERVICE_POPULARITY = `${API_URL}/service-popularity`
export const GET_SERVICE_LEAD_FORM = `${API_URL}/service-lead-form-option`
export const GET_SERVICE_MEDIA_TYPE = `${API_URL}/service-media-type`
export const GET_SERVICE_FEATURES_OPTION = `${API_URL}/service-feature-option`
export const GET_FAQ_OPTION = `${API_URL}/service-faq-option`
export const GET_SERVICE_DOCUMENT_OPTION = `${API_URL}/service-document-option`

export const GET_SERVICE_APPLY_NOW_OPTION = `${API_URL}/service-apply-now-option`
export const GET_SERVICE_RELATED_OPTION = `${API_URL}/service-related-option`
export const GET_SERVICE_MANAGER_ENABLE = `${API_URL}/service-manager/enable`
export const GET_SERVICE_MANAGER_DISABLE = `${API_URL}/service-manager/disable`

export const service = {
  //GET
  getServiceManager: (params: ParamsModel) => {
    return axios.get(GET_SERVICE_MANAGER, {params})
  },

  getServiceManagerListSaga: () => {
    return axios.get(GET_SERVICE_MANAGER_LIST)
  },

  addServiceManager: (body: any) => {
    return axios.post(GET_SERVICE_MANAGER, body)
  },

  updateServiceManager: (body: any, id: string) => {
    return axios.patch(`${GET_SERVICE_MANAGER}/${id}`, body)
  },

  //options
  getServiceReviewOption: () => {
    return axios.get(GET_SERVICE_REVIEW_OPTION)
  },

  getServicePopularity: () => {
    return axios.get(GET_SERVICE_POPULARITY)
  },

  getMediaType: () => {
    return axios.get(GET_SERVICE_MEDIA_TYPE)
  },

  getServicesFeaturesOption: () => {
    return axios.get(GET_SERVICE_FEATURES_OPTION)
  },

  getServiceDocumentOption: () => {
    return axios.get(GET_SERVICE_DOCUMENT_OPTION)
  },

  getServicesLeadForm: () => {
    return axios.get(GET_SERVICE_LEAD_FORM)
  },

  getFaqOption: () => {
    return axios.get(GET_FAQ_OPTION)
  },

  getServiceApplyNowOption: () => {
    return axios.get(GET_SERVICE_APPLY_NOW_OPTION)
  },

  getServiceRelatedOption: () => {
    return axios.get(GET_SERVICE_RELATED_OPTION)
  },

  // DELETE
  deleteServiceManager: (data: {serviceManagerId: Array<{id: string}>}) => {
    return axios.delete(GET_SERVICE_MANAGER, {data})
  },

  // ENABLE
  enableServiceManager: (data: {serviceManagerId: Array<{id: string}>}) => {
    return axios.patch(GET_SERVICE_MANAGER_ENABLE, data)
  },

  // DISABLE
  disableServiceManager: (data: {serviceManagerId: Array<{id: string}>}) => {
    return axios.patch(GET_SERVICE_MANAGER_DISABLE, data)
  },
  sortServiceManager: (body: SortServiceManagerModel) => {
    return axios.patch(`${GET_SERVICE_MANAGER}/sort`, body)
  },
}
