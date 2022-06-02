import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteDocumentSubCategoryModel, SortDocumentSubCategoryModel} from '../Model'
import {DocumentSubCategoryModel} from '../Model/DocumentSubCategoryModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const DOCUMENT_SUB_CATEGORY_API = `${API_URL}/document-sub-category`

export const service = {
  getDocumentSubCategory: (params: ParamsModel) => {
    return axios.get(DOCUMENT_SUB_CATEGORY_API, {params})
  },
  getAllDocumentSubCategory: (id: string) => {
    return axios.get(`${DOCUMENT_SUB_CATEGORY_API}/list?documentCategoryId=${id}`)
  },

  addDocumentSubCategory: (data: any) => {
    return axios.post(DOCUMENT_SUB_CATEGORY_API, data)
  },

  updateDocumentSubCategory: (body: DocumentSubCategoryModel, id: string) => {
    return axios.patch(`${DOCUMENT_SUB_CATEGORY_API}/${id}`, body)
  },

  deleteDocumentSubCategory: (data: DeleteDocumentSubCategoryModel) => {
    return axios.delete(DOCUMENT_SUB_CATEGORY_API, {data})
  },

  enableDocumentSubCategory: (data: Array<string>) => {
    const selectedDocumentSubCategory = {
      documentSubCategoryId: data,
    }
    return axios.patch(`${DOCUMENT_SUB_CATEGORY_API}/enable`, selectedDocumentSubCategory)
  },

  disableDocumentSubCategory: (data: Array<string>) => {
    const selectedDocumentSubCategory = {
      documentSubCategoryId: data,
    }
    return axios.patch(`${DOCUMENT_SUB_CATEGORY_API}/disable`, selectedDocumentSubCategory)
  },

  singleEnableDocumentSubCategory: (data: Array<string>) => {
    const selectedDocumentSubCategory = {
      documentSubCategoryId: [data],
    }
    return axios.patch(`${DOCUMENT_SUB_CATEGORY_API}/enable`, selectedDocumentSubCategory)
  },

  singleDisableDocumentSubCategory: (data: Array<string>) => {
    const selectedDocumentSubCategory = {
      documentSubCategoryId: [data],
    }
    return axios.patch(`${DOCUMENT_SUB_CATEGORY_API}/disable`, selectedDocumentSubCategory)
  },

  sortDocumentSubCategory: (body: SortDocumentSubCategoryModel) => {
    return axios.patch(`${DOCUMENT_SUB_CATEGORY_API}/sort`, body)
  },
}
