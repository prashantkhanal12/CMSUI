import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteDocumentModel, SortDocumentModel} from '../Model'
import {DocumentModel} from '../Model/DocumentModel'
import {actionTypes} from './constants'
export const actions = {
  // get Document
  getAllDocument: () => ({
    type: actionTypes.GET_ALL_DOCUMENT_START,
  }),
  getAllDocumentSuccess: (data: DocumentModel) => ({
    type: actionTypes.GET_ALL_DOCUMENT_SUCCESS,
    payload: data,
  }),
  getAllDocumentFinish: () => ({
    type: actionTypes.GET_ALL_DOCUMENT_FINISH,
  }),

  // get Document DATA
  getDocument: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_DOCUMENT_START,
    payload: params,
  }),
  getDocumentSuccess: (data: DocumentModel) => ({
    type: actionTypes.GET_DOCUMENT_SUCCESS,
    payload: data,
  }),
  getDocumentFinish: () => ({
    type: actionTypes.GET_DOCUMENT_FINISH,
  }),

  // get FiscalYear DATA
  getFiscalYear: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_FISCAL_YEAR_START,
    payload: params,
  }),
  getFiscalYearSuccess: (data: {[key: string]: string}) => ({
    type: actionTypes.GET_FISCAL_YEAR_SUCCESS,
    payload: data,
  }),
  getFiscalYearFinish: () => ({
    type: actionTypes.GET_FISCAL_YEAR_FINISH,
  }),

  // get Qater DATA
  getQuater: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_QUATER_START,
    payload: params,
  }),
  getQuaterSuccess: (data: {[key: string]: string}) => ({
    type: actionTypes.GET_QUATER_SUCCESS,
    payload: data,
  }),
  getQuaterFinish: () => ({
    type: actionTypes.GET_QUATER_FINISH,
  }),

  // create key
  addDocument: (data: DocumentModel) => ({
    type: actionTypes.ADD_DOCUMENT_START,
    payload: data,
  }),
  addDocumentSuccess: (task: any) => ({
    type: actionTypes.ADD_DOCUMENT_SUCCESS,
    payload: task,
  }),
  addDocumentFinish: () => ({
    type: actionTypes.ADD_DOCUMENT_FINISH,
  }),
  resetDocument: () => ({
    type: actionTypes.RESET_DOCUMENT,
  }),

  //Update Document
  updateDocument: (data: DocumentModel, id: string) => ({
    type: actionTypes.UPDATE_DOCUMENT_START,
    payload: data,
    id,
  }),

  updateDocumentSuccess: (data: DocumentModel) => ({
    type: actionTypes.UPDATE_DOCUMENT_SUCCESS,
    payload: data,
  }),

  updateDocumentFinish: () => ({
    type: actionTypes.UPDATE_DOCUMENT_FINISH,
  }),

  // delete key
  deleteDocument: (data: DeleteDocumentModel[]) => ({
    type: actionTypes.DELETE_DOCUMENT_START,
    payload: {documentId: data},
  }),
  deleteDocumentSuccess: (data: any) => ({
    type: actionTypes.DELETE_DOCUMENT_SUCCESS,
    payload: data,
  }),
  deleteDocumentFinish: () => ({
    type: actionTypes.DELETE_DOCUMENT_FINISH,
  }),

  //Enable Document
  enableDocument: (data: any) => ({
    type: actionTypes.ENABLE_DOCUMENT_REQUEST,
    payload: {data},
  }),

  enableDocumentSuccess: (task: any) => ({
    type: actionTypes.ENABLE_DOCUMENT_SUCCESS,
    payload: task,
  }),
  enableDocumentFinish: () => ({
    type: actionTypes.ENABLE_DOCUMENT_FINISH,
  }),

  //Disable Document
  disableDocument: (data: any) => ({
    type: actionTypes.DISABLE_DOCUMENT_REQUEST,
    payload: {data},
  }),

  disableDocumentSuccess: (task: any) => ({
    type: actionTypes.DISABLE_DOCUMENT_SUCCESS,
    payload: task,
  }),
  disableDocumentFinish: () => ({
    type: actionTypes.DISABLE_DOCUMENT_FINISH,
  }),

  //Enable Document
  singleEnableDocument: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_DOCUMENT_REQUEST,
    payload: {data},
  }),

  singleEnableDocumentSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_DOCUMENT_SUCCESS,
    payload: task,
  }),
  singleEnableDocumentFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_DOCUMENT_FINISH,
  }),

  //Disable Document
  singleDisableDocument: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_DOCUMENT_REQUEST,
    payload: {data},
  }),

  singleDisableDocumentSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_DOCUMENT_SUCCESS,
    payload: task,
  }),
  singleDisableDocumentFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_DOCUMENT_FINISH,
  }),

  // sort
  sortDocument: (data: SortDocumentModel) => ({
    type: actionTypes.SORT_DOCUMENT_START,
    payload: data,
  }),
  sortDocumentSuccess: (data: Array<DocumentModel>) => ({
    type: actionTypes.SORT_DOCUMENT_SUCCESS,
    payload: data,
  }),
  sortDocumentFinish: () => ({
    type: actionTypes.SORT_DOCUMENT_FINISH,
  }),
  sortDocumentReset: () => ({
    type: actionTypes.SORT_DOCUMENT_RESET,
  }),
}
