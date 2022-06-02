import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {ProductTagModel} from '../Model/ProductTagModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const PRODUCT_TAG_DATA = `${API_URL}/producttag`

export const service = {
  getProductTag: (params: ParamsModel) => {
    return axios.get(PRODUCT_TAG_DATA, {params})
  },
  getAllProductTag: () => {
    return axios.get(`${PRODUCT_TAG_DATA}/list`)
  },

  addProductTag: (data: any) => {
    return axios.post(PRODUCT_TAG_DATA, data)
  },

  updateProductTag: (body: ProductTagModel, id: string) => {
    return axios.put(`${PRODUCT_TAG_DATA}/${id}`, body)
  },

  deleteProductTag: (data: {id: string}) => {
    return axios.delete(PRODUCT_TAG_DATA, {data})
  },

  enableProductTag: (data: Array<string>) => {
    const selectedProductTag = {
      productTagId: data,
    }
    return axios.patch(`${PRODUCT_TAG_DATA}/enable`, selectedProductTag)
  },

  disableProductTag: (data: Array<string>) => {
    const selectedProductTag = {
      productTagId: data,
    }
    return axios.patch(`${PRODUCT_TAG_DATA}/disable`, selectedProductTag)
  },

  singleEnableProductTag: (data: Array<string>) => {
    const selectedProductTag = {
      productTagId: [data],
    }
    return axios.patch(`${PRODUCT_TAG_DATA}/enable`, selectedProductTag)
  },

  singleDisableProductTag: (data: Array<string>) => {
    const selectedProductTag = {
      productTagId: [data],
    }
    return axios.patch(`${PRODUCT_TAG_DATA}/disable`, selectedProductTag)
  },
}
