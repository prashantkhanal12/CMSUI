import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {
  ProductComparisonSubCategoryModel,
  SortProductComparisonSubModel,
} from '../Model/ProductComparisonSubCategoryModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const PRODUCT_CATEGORY_API = `${API_URL}/productcomparisonsubcategory`

export const service = {
  getProductComparisonSubCategory: (params: ParamsModel) => {
    return axios.get(PRODUCT_CATEGORY_API, {params})
  },
  getAllProductComparisonSubCategory: () => {
    return axios.get(`${PRODUCT_CATEGORY_API}/list`)
  },

  addProductComparisonSubCategory: (data: any) => {
    return axios.post(PRODUCT_CATEGORY_API, data)
  },

  updateProductComparisonSubCategory: (body: ProductComparisonSubCategoryModel, id: string) => {
    return axios.put(`${PRODUCT_CATEGORY_API}/${id}`, body)
  },

  deleteProductComparisonSubCategory: (data: {id: string}) => {
    return axios.delete(PRODUCT_CATEGORY_API, {data})
  },

  enableProductComparisonSubCategory: (data: Array<string>) => {
    const selectedProductComparisonSubCategory = {
      productComparisonSubCategoryId: data,
    }
    return axios.patch(`${PRODUCT_CATEGORY_API}/enable`, selectedProductComparisonSubCategory)
  },

  disableProductComparisonSubCategory: (data: Array<string>) => {
    const selectedProductComparisonSubCategory = {
      productComparisonSubCategoryId: data,
    }
    return axios.patch(`${PRODUCT_CATEGORY_API}/disable`, selectedProductComparisonSubCategory)
  },

  singleEnableProductComparisonSubCategory: (data: Array<string>) => {
    const selectedProductComparisonSubCategory = {
      productComparisonSubCategoryId: [data],
    }
    return axios.patch(`${PRODUCT_CATEGORY_API}/enable`, selectedProductComparisonSubCategory)
  },

  singleDisableProductComparisonSubCategory: (data: Array<string>) => {
    const selectedProductComparisonSubCategory = {
      productComparisonSubCategoryId: [data],
    }
    return axios.patch(`${PRODUCT_CATEGORY_API}/disable`, selectedProductComparisonSubCategory)
  },

  sortProductComparisonSub: (body: SortProductComparisonSubModel) => {
    return axios.patch(`${PRODUCT_CATEGORY_API}/sort`, body)
  },
}
