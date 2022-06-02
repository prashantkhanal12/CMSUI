import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteModel, OptionModel, SortNewSubCategoryModel} from '../Model'
import {actionTypes} from './constants'
import { ISubCategoryState } from './reducer'
// import {ISubCategoryState} from './reducer'
// import {SubCategoryModel} from '../Model/SubCategoryModel'
export const actions = {
  getSpecificSubCategory: (id: string = '') => ({
    type: actionTypes.GET_SPECIFIC_SUB_CATEGORY_START,
    payload: id,
  }),

  getSpecificSubCategorySuccess: (data: {[key: string]: string}) => ({
    type: actionTypes.GET_SPECIFIC_SUB_CATEGORY_SUCCESS,
    payload: data,
  }),
  getSpecificSubCategoryFinish: () => ({
    type: actionTypes.GET_SPECIFIC_SUB_CATEGORY_FINISH,
  }),
  getSpecificSubCategoryError: (error: unknown) => ({
    type: actionTypes.GET_SPECIFIC_SUB_CATEGORY_FINISH,
    payload: {error},
  }),

  // GET BRANCHLESS BANKING
  getSubCategory: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_SUB_CATEGORY_START,
    payload: params,
  }),

  getSubCategorySuccess: (data: any) => ({
    type: actionTypes.GET_SUB_CATEGORY_SUCCESS,
    payload: data,
  }),
  getSubCategoryFinish: () => ({
    type: actionTypes.GET_SUB_CATEGORY_FINISH,
  }),
  getSubCategoryError: (error: unknown) => ({
    type: actionTypes.GET_SUB_CATEGORY_FINISH,
    payload: {error},
  }),

  // create branchless banking
  addSubCategory: (data: any) => ({
    type: actionTypes.ADD_SUB_CATEGORY_START,
    payload: data,
  }),
  addSubCategorySuccess: (task: any) => ({
    type: actionTypes.ADD_SUB_CATEGORY_SUCCESS,
    payload: task,
  }),
  addSubCategoryFinish: () => ({
    type: actionTypes.ADD_SUB_CATEGORY_FINISH,
  }),
  addSubCategoryReset: () => ({
    type: actionTypes.ADD_SUB_CATEGORY_RESET,
  }),

  // update operation incharge

  updateSubCategory: (data: any, id: string) => ({
    type: actionTypes.UPDATE_SUB_CATEGORY_START,
    payload: {data, id},
  }),
  updateSubCategorySuccess: (task: any) => ({
    type: actionTypes.UPDATE_SUB_CATEGORY_SUCCESS,
    payload: task,
  }),
  updateSubCategoryFinish: () => ({
    type: actionTypes.UPDATE_SUB_CATEGORY_FINISH,
  }),
  updateSubCategoryReset: () => ({
    type: actionTypes.UPDATE_SUB_CATEGORY_RESET,
  }),

  // DELETE operation incharge
  deleteSubCategory: (data: DeleteModel[]) => ({
    type: actionTypes.DELETE_SUB_CATEGORY_START,
    payload: {subCategoryId: data},
  }),
  deleteSubCategorySuccess: (data: any) => ({
    type: actionTypes.DELETE_SUB_CATEGORY_SUCCESS,
    payload: data,
  }),
  deleteSubCategoryFinish: () => ({
    type: actionTypes.DELETE_SUB_CATEGORY_FINISH,
  }),
  // Active cms categories
  activateSubCategory: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_ACTIVATE_SUB_CATEGORY_REQUEST,
    payload: {subCategoryId: id},
  }),
  //  deactive cms categories
  deactivateSubCategory: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_DEACTIVATE_SUB_CATEGORY_REQUEST,
    payload: {subCategoryId: id},
  }),
  // single active cms categories
  singleActivateSubCategory: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_ACTIVATE_SUB_CATEGORY_REQUEST,
    payload: {subCategoryId: [id]},
  }),
  // single deactive cms categories
  singleDeactivateSubCategory: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_DEACTIVATE_SUB_CATEGORY_REQUEST,
    payload: {subCategoryId: [id]},
  }),

  // sort
  sortNewSubCategory: (data: SortNewSubCategoryModel) => ({
    type: actionTypes.SORT_NEWS_SUB_CATEGORY_START,
    payload: data,
  }),
  sortNewSubCategorySuccess: (data: Array<ISubCategoryState>) => ({
    type: actionTypes.SORT_NEWS_SUB_CATEGORY_SUCCESS,
    payload: data,
  }),
  sortNewSubCategoryFinish: () => ({
    type: actionTypes.SORT_NEWS_SUB_CATEGORY_FINISH,
  }),
  sortNewSubCategoryReset: () => ({
    type: actionTypes.SORT_NEWS_SUB_CATEGORY_RESET,
  }),
}
