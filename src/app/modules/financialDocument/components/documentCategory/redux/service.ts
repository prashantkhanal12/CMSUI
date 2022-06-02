import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteDocumentCategoryModel, SortDocumentCategoryModel} from '../Model'
import {DocumentCategoryModel} from '../Model/DocumentCategoryModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const DOCUMENT_CATEGORY_API = `${API_URL}/document-category`

export const service = {
  getDocumentCategory: (params: ParamsModel) => {
    return axios.get(DOCUMENT_CATEGORY_API, {params})
  },
  getAllDocumentCategory: () => {
    return axios.get(`${DOCUMENT_CATEGORY_API}/list`)
  },

  addDocumentCategory: (data: any) => {
    return axios.post(DOCUMENT_CATEGORY_API, data)
  },

  updateDocumentCategory: (body: DocumentCategoryModel, id: string) => {
    return axios.patch(`${DOCUMENT_CATEGORY_API}/${id}`, body)
  },

  deleteDocumentCategory: (data: DeleteDocumentCategoryModel) => {
    return axios.delete(DOCUMENT_CATEGORY_API, {data})
  },

  enableDocumentCategory: (data: Array<string>) => {
    const selectedDocumentCategory = {
      documentCategoryId: data,
    }
    return axios.patch(`${DOCUMENT_CATEGORY_API}/enable`, selectedDocumentCategory)
  },

  disableDocumentCategory: (data: Array<string>) => {
    const selectedDocumentCategory = {
      documentCategoryId: data,
    }
    return axios.patch(`${DOCUMENT_CATEGORY_API}/disable`, selectedDocumentCategory)
  },

  singleEnableDocumentCategory: (data: Array<string>) => {
    const selectedDocumentCategory = {
      documentCategoryId: [data],
    }
    return axios.patch(`${DOCUMENT_CATEGORY_API}/enable`, selectedDocumentCategory)
  },

  singleDisableDocumentCategory: (data: Array<string>) => {
    const selectedDocumentCategory = {
      documentCategoryId: [data],
    }
    return axios.patch(`${DOCUMENT_CATEGORY_API}/disable`, selectedDocumentCategory)
  },

  sortDocumentCategory: (body: SortDocumentCategoryModel) => {
    return axios.patch(`${DOCUMENT_CATEGORY_API}/sort`, body)
  },
}
