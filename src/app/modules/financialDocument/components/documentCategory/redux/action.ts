import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteDocumentCategoryModel, SortDocumentCategoryModel} from '../Model'
import {DocumentCategoryModel} from '../Model/DocumentCategoryModel'
import {actionTypes} from './constants'
export const actions = {
  // get DocumentCategory
  getAllDocumentCategory: () => ({
    type: actionTypes.GET_ALL_DOCUMENT_CATEGORY_START,
  }),
  getAllDocumentCategorySuccess: (data: DocumentCategoryModel) => ({
    type: actionTypes.GET_ALL_DOCUMENT_CATEGORY_SUCCESS,
    payload: data,
  }),
  getAllDocumentCategoryFinish: () => ({
    type: actionTypes.GET_ALL_DOCUMENT_CATEGORY_FINISH,
  }),

  // get DocumentCategory DATA
  getDocumentCategory: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_DOCUMENT_CATEGORY_START,
    payload: params,
  }),
  getDocumentCategorySuccess: (data: DocumentCategoryModel) => ({
    type: actionTypes.GET_DOCUMENT_CATEGORY_SUCCESS,
    payload: data,
  }),
  getDocumentCategoryFinish: () => ({
    type: actionTypes.GET_DOCUMENT_CATEGORY_FINISH,
  }),

  // create key
  addDocumentCategory: (data: DocumentCategoryModel) => ({
    type: actionTypes.ADD_DOCUMENT_CATEGORY_START,
    payload: data,
  }),
  addDocumentCategorySuccess: (task: any) => ({
    type: actionTypes.ADD_DOCUMENT_CATEGORY_SUCCESS,
    payload: task,
  }),
  addDocumentCategoryFinish: () => ({
    type: actionTypes.ADD_DOCUMENT_CATEGORY_FINISH,
  }),
  resetDocumentCategory: () => ({
    type: actionTypes.RESET_DOCUMENT_CATEGORY,
  }),

  //Update DocumentCategory
  updateDocumentCategory: (data: DocumentCategoryModel, id: string) => ({
    type: actionTypes.UPDATE_DOCUMENT_CATEGORY_START,
    payload: data,
    id,
  }),

  updateDocumentCategorySuccess: (data: DocumentCategoryModel) => ({
    type: actionTypes.UPDATE_DOCUMENT_CATEGORY_SUCCESS,
    payload: data,
  }),

  updateDocumentCategoryFinish: () => ({
    type: actionTypes.UPDATE_DOCUMENT_CATEGORY_FINISH,
  }),

  // delete key
  deleteDocumentCategory: (data: DeleteDocumentCategoryModel[]) => ({
    type: actionTypes.DELETE_DOCUMENT_CATEGORY_START,
    payload: {documentCategoryId: data},
  }),
  deleteDocumentCategorySuccess: (data: any) => ({
    type: actionTypes.DELETE_DOCUMENT_CATEGORY_SUCCESS,
    payload: data,
  }),
  deleteDocumentCategoryFinish: () => ({
    type: actionTypes.DELETE_DOCUMENT_CATEGORY_FINISH,
  }),

  //Enable DocumentCategory
  enableDocumentCategory: (data: any) => ({
    type: actionTypes.ENABLE_DOCUMENT_CATEGORY_REQUEST,
    payload: {data},
  }),

  enableDocumentCategorySuccess: (task: any) => ({
    type: actionTypes.ENABLE_DOCUMENT_CATEGORY_SUCCESS,
    payload: task,
  }),
  enableDocumentCategoryFinish: () => ({
    type: actionTypes.ENABLE_DOCUMENT_CATEGORY_FINISH,
  }),

  //Disable DocumentCategory
  disableDocumentCategory: (data: any) => ({
    type: actionTypes.DISABLE_DOCUMENT_CATEGORY_REQUEST,
    payload: {data},
  }),

  disableDocumentCategorySuccess: (task: any) => ({
    type: actionTypes.DISABLE_DOCUMENT_CATEGORY_SUCCESS,
    payload: task,
  }),
  disableDocumentCategoryFinish: () => ({
    type: actionTypes.DISABLE_DOCUMENT_CATEGORY_FINISH,
  }),

  //Enable DocumentCategory
  singleEnableDocumentCategory: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_DOCUMENT_CATEGORY_REQUEST,
    payload: {data},
  }),

  singleEnableDocumentCategorySuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_DOCUMENT_CATEGORY_SUCCESS,
    payload: task,
  }),
  singleEnableDocumentCategoryFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_DOCUMENT_CATEGORY_FINISH,
  }),

  //Disable DocumentCategory
  singleDisableDocumentCategory: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_DOCUMENT_CATEGORY_REQUEST,
    payload: {data},
  }),

  singleDisableDocumentCategorySuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_DOCUMENT_CATEGORY_SUCCESS,
    payload: task,
  }),
  singleDisableDocumentCategoryFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_DOCUMENT_CATEGORY_FINISH,
  }),

  
  // sort
  sortDocumentCategory: (data: SortDocumentCategoryModel) => ({
    type: actionTypes.SORT_DOCUMENT_CATEGORY_START,
    payload: data,
  }),
  sortDocumentCategorySuccess: (data: Array<DocumentCategoryModel>) => ({
    type: actionTypes.SORT_DOCUMENT_CATEGORY_SUCCESS,
    payload: data,
  }),
  sortDocumentCategoryFinish: () => ({
    type: actionTypes.SORT_DOCUMENT_CATEGORY_FINISH,
  }),
  sortDocumentCategoryReset: () => ({
    type: actionTypes.SORT_DOCUMENT_CATEGORY_RESET,
  }),
}
