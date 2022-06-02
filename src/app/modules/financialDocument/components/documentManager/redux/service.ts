import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteDocumentModel, SortDocumentModel} from '../Model'
import {DocumentModel} from '../Model/DocumentModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const DOCUMENT_DATA_API = `${API_URL}/document`

export const service = {
  getDocument: (params: ParamsModel) => {
    return axios.get(DOCUMENT_DATA_API, {params})
  },
  getFiscalYear: () => {
    return axios.get(`${DOCUMENT_DATA_API}/fiscal-year`)
  },
  getQuater: () => {
    return axios.get(`${API_URL}/quater`)
  },
  getAllDocument: () => {
    return axios.get(`${DOCUMENT_DATA_API}/list`)
  },
  addDocument: (data: any) => {
    return axios.post(DOCUMENT_DATA_API, data)
  },

  updateDocument: (body: DocumentModel, id: string) => {
    return axios.patch(`${DOCUMENT_DATA_API}/${id}`, body)
  },

  deleteDocument: (data: DeleteDocumentModel) => {
    return axios.delete(DOCUMENT_DATA_API, {data})
  },

  enableDocument: (data: Array<string>) => {
    const selectedDocument = {
      documentId: data,
    }
    return axios.patch(`${DOCUMENT_DATA_API}/enable`, selectedDocument)
  },

  disableDocument: (data: Array<string>) => {
    const selectedDocument = {
      documentId: data,
    }
    return axios.patch(`${DOCUMENT_DATA_API}/disable`, selectedDocument)
  },

  singleEnableDocument: (data: Array<string>) => {
    const selectedDocument = {
      documentId: [data],
    }
    return axios.patch(`${DOCUMENT_DATA_API}/enable`, selectedDocument)
  },

  singleDisableDocument: (data: Array<string>) => {
    const selectedDocument = {
      documentId: [data],
    }
    return axios.patch(`${DOCUMENT_DATA_API}/disable`, selectedDocument)
  },

  sortDocument: (body: SortDocumentModel) => {
    return axios.patch(`${DOCUMENT_DATA_API}/sort`, body)
  },
}
