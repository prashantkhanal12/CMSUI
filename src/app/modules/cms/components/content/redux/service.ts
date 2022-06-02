import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {ContentModel} from '../Model/ContentModal'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_APPLY_NOW_SECTION = `${API_URL}/content-option/apply-now-section`
export const GET_BANNER = `${API_URL}/content-option/banner`
export const GET_COLLAPSIBLE_SECTION = `${API_URL}/content-option/collapsible-section`
export const GET_FAQ_OPTION = `${API_URL}/content-option/faq-option`
export const GET_HELP_SECTION = `${API_URL}/content-option/help-section`
export const GET_LEAD_FORM = `${API_URL}/content-option/lead-form`
export const GET_PAGE_HEADER = `${API_URL}/content-option/page-header`
export const GET_PRODUCT_OPTION = `${API_URL}/content-option/product-option`
export const GET_REVIEW_AND_RATING = `${API_URL}/content-option/review-and-rating`
export const CONTENT_API = `${API_URL}/content`

export const service = {
  //GET APPLY NOW SECTION SERVICE
  getApplyNowSection: () => {
    return axios.get(GET_APPLY_NOW_SECTION)
  },
  //GET BANNER SERVICE
  getConstantBanner: () => {
    return axios.get(GET_BANNER)
  },
  //GET COLLAPSIBLE SECTION SERVICE
  getCollapsibleSection: () => {
    return axios.get(GET_COLLAPSIBLE_SECTION)
  },
  //GET FAQ OPTION SERVICE
  getFaqOption: () => {
    return axios.get(GET_FAQ_OPTION)
  },
  //GET HELP SECTION SERVICE
  getHelpSection: () => {
    return axios.get(GET_HELP_SECTION)
  },
  //GET LEAD FORM SERVICE
  getLeadForm: () => {
    return axios.get(GET_LEAD_FORM)
  },
  //GET PAGE HEADER SERVICE
  getPageHeader: () => {
    return axios.get(GET_PAGE_HEADER)
  },
  //GET PRODUCT OPTION SERVICE
  getProductOption: () => {
    return axios.get(GET_PRODUCT_OPTION)
  },
  //GET REVIEW AND RATING SERVICE
  getReviewAndRating: () => {
    return axios.get(GET_REVIEW_AND_RATING)
  },

  getContentData: (params: ParamsModel) => {
    return axios.get(CONTENT_API, {params})
  },

  getContentDataByCategoryId: (id: string | any) => {
    return axios.get(`${CONTENT_API}/list?categoryId=${id}`)
  },
  //ADD CONTENT SERVICE
  addContent: (data: ContentModel) => {
    return axios.post(CONTENT_API, data)
  },

  updateContent: (body: ContentModel, id: string) => {
    return axios.patch(`${CONTENT_API}/${id}`, body)
  },

  deleteContent: (data: {id: string}) => {
    return axios.delete(CONTENT_API, {data})
  },

  enableContent: (data: Array<string>) => {
    const selectedContent = {
      contentId: data,
    }
    return axios.patch(`${CONTENT_API}/enable`, selectedContent)
  },

  disableContent: (data: Array<string>) => {
    const selectedContent = {
      contentId: data,
    }
    return axios.patch(`${CONTENT_API}/disable`, selectedContent)
  },

  singleEnableContent: (data: Array<string>) => {
    const selectedContent = {
      contentId: [data],
    }
    return axios.patch(`${CONTENT_API}/enable`, selectedContent)
  },

  singleDisableContent: (data: Array<string>) => {
    const selectedContent = {
      contentId: [data],
    }
    return axios.patch(`${CONTENT_API}/disable`, selectedContent)
  },
}
