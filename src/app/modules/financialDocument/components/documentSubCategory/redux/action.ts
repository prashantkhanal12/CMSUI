import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteDocumentSubCategoryModel, SortDocumentSubCategoryModel} from '../Model'
import {DocumentSubCategoryModel} from '../Model/DocumentSubCategoryModel'
import {actionTypes} from './constants'
export const actions = {
  // get DocumentSubCategory
  getAllDocumentSubCategory: (id: string = '') => ({
    type: actionTypes.GET_ALL_DOCUMENT_SUB_CATEGORY_START,
    payload: id,
  }),
  getAllDocumentSubCategorySuccess: (data: DocumentSubCategoryModel) => ({
    type: actionTypes.GET_ALL_DOCUMENT_SUB_CATEGORY_SUCCESS,
    payload: data,
  }),
  getAllDocumentSubCategoryFinish: () => ({
    type: actionTypes.GET_ALL_DOCUMENT_SUB_CATEGORY_FINISH,
  }),

  // get DocumentSubCategory DATA
  getDocumentSubCategory: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_DOCUMENT_SUB_CATEGORY_START,
    payload: params,
  }),
  getDocumentSubCategorySuccess: (data: DocumentSubCategoryModel) => ({
    type: actionTypes.GET_DOCUMENT_SUB_CATEGORY_SUCCESS,
    payload: data,
  }),
  getDocumentSubCategoryFinish: () => ({
    type: actionTypes.GET_DOCUMENT_SUB_CATEGORY_FINISH,
  }),

  // create key
  addDocumentSubCategory: (data: DocumentSubCategoryModel) => ({
    type: actionTypes.ADD_DOCUMENT_SUB_CATEGORY_START,
    payload: data,
  }),
  addDocumentSubCategorySuccess: (task: any) => ({
    type: actionTypes.ADD_DOCUMENT_SUB_CATEGORY_SUCCESS,
    payload: task,
  }),
  addDocumentSubCategoryFinish: () => ({
    type: actionTypes.ADD_DOCUMENT_SUB_CATEGORY_FINISH,
  }),
  resetDocumentSubCategory: () => ({
    type: actionTypes.RESET_DOCUMENT_SUB_CATEGORY,
  }),

  //Update DocumentSubCategory
  updateDocumentSubCategory: (data: DocumentSubCategoryModel, id: string) => ({
    type: actionTypes.UPDATE_DOCUMENT_SUB_CATEGORY_START,
    payload: data,
    id,
  }),

  updateDocumentSubCategorySuccess: (data: DocumentSubCategoryModel) => ({
    type: actionTypes.UPDATE_DOCUMENT_SUB_CATEGORY_SUCCESS,
    payload: data,
  }),

  updateDocumentSubCategoryFinish: () => ({
    type: actionTypes.UPDATE_DOCUMENT_SUB_CATEGORY_FINISH,
  }),

  // delete key
  deleteDocumentSubCategory: (data: DeleteDocumentSubCategoryModel[]) => ({
    type: actionTypes.DELETE_DOCUMENT_SUB_CATEGORY_START,
    payload: {documentSubCategoryId: data},
  }),
  deleteDocumentSubCategorySuccess: (data: any) => ({
    type: actionTypes.DELETE_DOCUMENT_SUB_CATEGORY_SUCCESS,
    payload: data,
  }),
  deleteDocumentSubCategoryFinish: () => ({
    type: actionTypes.DELETE_DOCUMENT_SUB_CATEGORY_FINISH,
  }),

  //Enable DocumentSubCategory
  enableDocumentSubCategory: (data: any) => ({
    type: actionTypes.ENABLE_DOCUMENT_SUB_CATEGORY_REQUEST,
    payload: {data},
  }),

  enableDocumentSubCategorySuccess: (task: any) => ({
    type: actionTypes.ENABLE_DOCUMENT_SUB_CATEGORY_SUCCESS,
    payload: task,
  }),
  enableDocumentSubCategoryFinish: () => ({
    type: actionTypes.ENABLE_DOCUMENT_SUB_CATEGORY_FINISH,
  }),

  //Disable DocumentSubCategory
  disableDocumentSubCategory: (data: any) => ({
    type: actionTypes.DISABLE_DOCUMENT_SUB_CATEGORY_REQUEST,
    payload: {data},
  }),

  disableDocumentSubCategorySuccess: (task: any) => ({
    type: actionTypes.DISABLE_DOCUMENT_SUB_CATEGORY_SUCCESS,
    payload: task,
  }),
  disableDocumentSubCategoryFinish: () => ({
    type: actionTypes.DISABLE_DOCUMENT_SUB_CATEGORY_FINISH,
  }),

  //Enable DocumentSubCategory
  singleEnableDocumentSubCategory: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_DOCUMENT_SUB_CATEGORY_REQUEST,
    payload: {data},
  }),

  singleEnableDocumentSubCategorySuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_DOCUMENT_SUB_CATEGORY_SUCCESS,
    payload: task,
  }),
  singleEnableDocumentSubCategoryFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_DOCUMENT_SUB_CATEGORY_FINISH,
  }),

  //Disable DocumentSubCategory
  singleDisableDocumentSubCategory: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_DOCUMENT_SUB_CATEGORY_REQUEST,
    payload: {data},
  }),

  singleDisableDocumentSubCategorySuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_DOCUMENT_SUB_CATEGORY_SUCCESS,
    payload: task,
  }),
  singleDisableDocumentSubCategoryFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_DOCUMENT_SUB_CATEGORY_FINISH,
  }),

  // sort
  sortDocumentSubCategory: (data: SortDocumentSubCategoryModel) => ({
    type: actionTypes.SORT_DOCUMENT_SUB_CATEGORY_START,
    payload: data,
  }),
  sortDocumentSubCategorySuccess: (data: Array<DocumentSubCategoryModel>) => ({
    type: actionTypes.SORT_DOCUMENT_SUB_CATEGORY_SUCCESS,
    payload: data,
  }),
  sortDocumentSubCategoryFinish: () => ({
    type: actionTypes.SORT_DOCUMENT_SUB_CATEGORY_FINISH,
  }),
  sortDocumentSubCategoryReset: () => ({
    type: actionTypes.SORT_DOCUMENT_SUB_CATEGORY_RESET,
  }),
}
