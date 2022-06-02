import axios from 'axios'
import {isEmpty} from 'lodash'
import {ParamsModel} from 'src/app/modules/common/Model'
import { SortProductManagerModel } from '../Model'
import {ProductManagerModel} from '../Model/ProductManagerModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const PRODUCT_MANAGER_DATA = `${API_URL}/product-manager`

export const service = {
  getProductPopularity: () => {
    return axios.get(`${API_URL}/product-popularity`)
  },
  getProductComparisonStatus: () => {
    return axios.get(`${API_URL}/product-comparison-status`)
  },
  getProductApplyNowOption: () => {
    return axios.get(`${API_URL}/product-apply-now-option`)
  },
  getProductCompetitorStatus: () => {
    return axios.get(`${API_URL}/product-competitor-status`)
  },
  getProductDocumentOption: () => {
    return axios.get(`${API_URL}/product-document-option`)
  },
  getProductFaqOption: () => {
    return axios.get(`${API_URL}/product-faq-option`)
  },
  getProductFeatureOption: () => {
    return axios.get(`${API_URL}/product-feature-option`)
  },
  getProductInterestRateOption: () => {
    return axios.get(`${API_URL}/product-interest-rate-option`)
  },
  getProductLeadFormOption: () => {
    return axios.get(`${API_URL}/product-lead-form-option`)
  },
  getProductMediaType: () => {
    return axios.get(`${API_URL}/product-media-type`)
  },
  getProductRelatedOption: () => {
    return axios.get(`${API_URL}/product-related-option`)
  },
  getProductReviewOption: () => {
    return axios.get(`${API_URL}/product-review-option`)
  },
  getProductManager: (params: ParamsModel) => {
    return axios.get(PRODUCT_MANAGER_DATA, {params})
  },
  getAllProductManager: (id: any) => {
    if (!isEmpty(id)) {
      return axios.get(`${PRODUCT_MANAGER_DATA}/list?excludeProductManagerId=${id}`)
    } else {
      return axios.get(`${PRODUCT_MANAGER_DATA}/list`)
    }
  },

  getProductManagerByTag: (id: any) => {
    return axios.get(`${PRODUCT_MANAGER_DATA}/list?productTagId=${id}`)
  },

  addProductManager: (data: any) => {
    return axios.post(PRODUCT_MANAGER_DATA, data)
  },

  updateProductManager: (body: ProductManagerModel, id: string) => {
    return axios.patch(`${PRODUCT_MANAGER_DATA}/${id}`, body)
  },

  deleteProductManager: (data: {id: string}) => {
    return axios.delete(PRODUCT_MANAGER_DATA, {data})
  },

  enableProductManager: (data: Array<string>) => {
    const selectedProductManager = {
      productManagerId: data,
    }
    return axios.patch(`${PRODUCT_MANAGER_DATA}/enable`, selectedProductManager)
  },

  disableProductManager: (data: Array<string>) => {
    const selectedProductManager = {
      productManagerId: data,
    }
    return axios.patch(`${PRODUCT_MANAGER_DATA}/disable`, selectedProductManager)
  },

  singleEnableProductManager: (data: Array<string>) => {
    const selectedProductManager = {
      productManagerId: [data],
    }
    return axios.patch(`${PRODUCT_MANAGER_DATA}/enable`, selectedProductManager)
  },

  singleDisableProductManager: (data: Array<string>) => {
    const selectedProductManager = {
      productManagerId: [data],
    }
    return axios.patch(`${PRODUCT_MANAGER_DATA}/disable`, selectedProductManager)
  },

  sortProductManager: (body: SortProductManagerModel) => {
    return axios.patch(`${PRODUCT_MANAGER_DATA}/sort`, body)
  },
}
