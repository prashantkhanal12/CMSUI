import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteModel, SortNewSubCategoryModel} from '../Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const SUB_CATEGORY = `${API_URL}/sub-category`

export const service = {
  getSpeficSubCategory: (id: string) => {
    return axios.get(`${SUB_CATEGORY}/list/${id}`)
  },
  getSubCategory: (params: ParamsModel) => {
    return axios.get(SUB_CATEGORY, {params})
  },

  addSubCategory: (data: any) => {
    return axios.post(SUB_CATEGORY, data)
  },

  updateSubCategory: (body: any, id: string) => {
    return axios.patch(`${SUB_CATEGORY}/${id}`, body)
  },

  deleteSubCategory: (data: DeleteModel) => {
    return axios.delete(SUB_CATEGORY, {data})
  },
  singleActivateSubCategory: (id: any) => {
    return axios.patch(`${SUB_CATEGORY}/enable`, id)
  },

  singleDeactivateSubCategory: (id: any) => {
    return axios.patch(`${SUB_CATEGORY}/disable`, id)
  },

  sortNewsSubCategory: (body: SortNewSubCategoryModel) => {
    return axios.patch(`${SUB_CATEGORY}/sort`, body)
  },
}
