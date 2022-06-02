import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {ProductCategoryModel, SortProductCategoryModel} from '../Model/ProductCategoryModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const PRODUCT_CATEGORY_API = `${API_URL}/productcategory`

export const service = {
  getProductCategory: (params: ParamsModel) => {
    return axios.get(PRODUCT_CATEGORY_API, {params})
  },
  getAllProductCategory: () => {
    return axios.get(`${PRODUCT_CATEGORY_API}/list`)
  },

  addProductCategory: (data: any) => {
    return axios.post(PRODUCT_CATEGORY_API, data)
  },

  updateProductCategory: (body: ProductCategoryModel, id: string) => {
    return axios.put(`${PRODUCT_CATEGORY_API}/${id}`, body)
  },

  deleteProductCategory: (data: {id: string}) => {
    return axios.delete(PRODUCT_CATEGORY_API, {data})
  },

  enableProductCategory: (data: Array<string>) => {
    const selectedProductCategory = {
      productCategoryId: data,
    }
    return axios.patch(`${PRODUCT_CATEGORY_API}/enable`, selectedProductCategory)
  },

  disableProductCategory: (data: Array<string>) => {
    const selectedProductCategory = {
      productCategoryId: data,
    }
    return axios.patch(`${PRODUCT_CATEGORY_API}/disable`, selectedProductCategory)
  },

  singleEnableProductCategory: (data: Array<string>) => {
    const selectedProductCategory = {
      productCategoryId: [data],
    }
    return axios.patch(`${PRODUCT_CATEGORY_API}/enable`, selectedProductCategory)
  },

  singleDisableProductCategory: (data: Array<string>) => {
    const selectedProductCategory = {
      productCategoryId: [data],
    }
    return axios.patch(`${PRODUCT_CATEGORY_API}/disable`, selectedProductCategory)
  },
  sortProductCategory: (body: SortProductCategoryModel) => {
    return axios.patch(`${PRODUCT_CATEGORY_API}/sort`, body)
  },
}
