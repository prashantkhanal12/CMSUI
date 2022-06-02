import axios from 'axios'
import { ParamsModel } from 'src/app/modules/common/Model'
import { DeleteModel, SortCategoriesModel } from '../Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const CMS_CATEGORIES = `${API_URL}/category`

export const service = {
  getSpeficCmsCategories: (id: string) => {
    return axios.get(`${CMS_CATEGORIES}/list/${id}`)
  },
  getCmsCategories: (params: ParamsModel) => {
    return axios.get(CMS_CATEGORIES, { params })
  },

  addCmsCategories: (data: any) => {
    return axios.post(CMS_CATEGORIES, data)
  },

  updateCmsCategories: (body: any, id: string) => {
    return axios.patch(`${CMS_CATEGORIES}/${id}`, body)
  },

  deleteCmsCategories: (data: DeleteModel) => {
    return axios.delete(CMS_CATEGORIES, { data })
  },
  singleActivateCmsCategories: (id: any) => {
    return axios.patch(`${CMS_CATEGORIES}/enable`, id)
  },

  singleDeactivateCmsCategories: (id: any) => {
    return axios.patch(`${CMS_CATEGORIES}/disable`, id)
  },

  sortCategories: (body: SortCategoriesModel) => {
    return axios.patch(`${CMS_CATEGORIES}/sort`, body)
  },
}
