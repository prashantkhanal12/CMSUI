import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {
  ProductComparisonCategoryModel,
  SortProductComparisonModel,
} from '../Model/ProductComparisonCategoryModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const PRODUCT_CATEGORY_API = `${API_URL}/productcomparisoncategory`

export const service = {
  getProductComparisonCategory: (params: ParamsModel) => {
    return axios.get(PRODUCT_CATEGORY_API, {params})
  },
  getAllProductComparisonCategory: () => {
    return axios.get(`${PRODUCT_CATEGORY_API}/list`)
  },

  addProductComparisonCategory: (data: any) => {
    return axios.post(PRODUCT_CATEGORY_API, data)
  },

  updateProductComparisonCategory: (body: ProductComparisonCategoryModel, id: string) => {
    return axios.put(`${PRODUCT_CATEGORY_API}/${id}`, body)
  },

  deleteProductComparisonCategory: (data: {id: string}) => {
    return axios.delete(PRODUCT_CATEGORY_API, {data})
  },

  enableProductComparisonCategory: (data: Array<string>) => {
    const selectedProductComparisonCategory = {
      productComparisonCategoryId: data,
    }
    return axios.patch(`${PRODUCT_CATEGORY_API}/enable`, selectedProductComparisonCategory)
  },

  disableProductComparisonCategory: (data: Array<string>) => {
    const selectedProductComparisonCategory = {
      productComparisonCategoryId: data,
    }
    return axios.patch(`${PRODUCT_CATEGORY_API}/disable`, selectedProductComparisonCategory)
  },

  singleEnableProductComparisonCategory: (data: Array<string>) => {
    const selectedProductComparisonCategory = {
      productComparisonCategoryId: [data],
    }
    return axios.patch(`${PRODUCT_CATEGORY_API}/enable`, selectedProductComparisonCategory)
  },

  singleDisableProductComparisonCategory: (data: Array<string>) => {
    const selectedProductComparisonCategory = {
      productComparisonCategoryId: [data],
    }
    return axios.patch(`${PRODUCT_CATEGORY_API}/disable`, selectedProductComparisonCategory)
  },
  sortProductComparison: (body: SortProductComparisonModel) => {
    return axios.patch(`${PRODUCT_CATEGORY_API}/sort`, body)
  },
}
