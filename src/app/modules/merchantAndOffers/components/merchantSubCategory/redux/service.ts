import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteMerchantSubCategoryModel, SortMerchantSubCategoryModel} from '../Model'
import {MerchantSubCategoryModel} from '../Model/MerchantSubCategoryModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const MERCHANT_SUB_CATEGORY_DATA = `${API_URL}/merchantsubcategory`

export const service = {
  getMerchantSubCategory: (params: ParamsModel) => {
    return axios.get(MERCHANT_SUB_CATEGORY_DATA, {params})
  },
  getAllMerchantSubCategory: (id: any) => {
    return axios.get(`${MERCHANT_SUB_CATEGORY_DATA}/list?category=${id}`)
  },

  addMerchantSubCategory: (data: any) => {
    return axios.post(MERCHANT_SUB_CATEGORY_DATA, data)
  },

  updateMerchantSubCategory: (body: MerchantSubCategoryModel, id: string) => {
    return axios.put(`${MERCHANT_SUB_CATEGORY_DATA}/${id}`, body)
  },

  deleteMerchantSubCategory: (data: DeleteMerchantSubCategoryModel) => {
    return axios.delete(MERCHANT_SUB_CATEGORY_DATA, {data})
  },

  enableMerchantSubCategory: (data: Array<string>) => {
    const selectedMerchantSubCategory = {
      merchantSubCategoryId: data,
    }
    return axios.patch(`${MERCHANT_SUB_CATEGORY_DATA}/enable`, selectedMerchantSubCategory)
  },

  disableMerchantSubCategory: (data: Array<string>) => {
    const selectedMerchantSubCategory = {
      merchantSubCategoryId: data,
    }
    return axios.patch(`${MERCHANT_SUB_CATEGORY_DATA}/disable`, selectedMerchantSubCategory)
  },

  singleEnableMerchantSubCategory: (data: Array<string>) => {
    const selectedMerchantSubCategory = {
      merchantSubCategoryId: [data],
    }
    return axios.patch(`${MERCHANT_SUB_CATEGORY_DATA}/enable`, selectedMerchantSubCategory)
  },

  singleDisableMerchantSubCategory: (data: Array<string>) => {
    const selectedMerchantSubCategory = {
      merchantSubCategoryId: [data],
    }
    return axios.patch(`${MERCHANT_SUB_CATEGORY_DATA}/disable`, selectedMerchantSubCategory)
  },
  sortMerchantSubCategory: (body: SortMerchantSubCategoryModel) => {
    return axios.patch(`${MERCHANT_SUB_CATEGORY_DATA}/sort`, body)
  },
}
