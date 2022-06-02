import { actionTypes } from './constants'
import { ParamsModel } from 'src/app/modules/common/Model'
import { DeleteModel, SortCategoriesModel } from '../Model'
import { CmsCategoriesModel } from '../Model/CmsCategoriesModel'

export const actions = {
  // GET category
  getSpecificCmsCategories: (id: string = '') => ({
    type: actionTypes.GET_SPECIFIC_CMS_CATEGORIES_START,
    payload: id,
  }),

  getSpecificCmsCategoriesSuccess: (data: { [key: string]: string }) => ({
    type: actionTypes.GET_SPECIFIC_CMS_CATEGORIES_SUCCESS,
    payload: data,
  }),
  getSpecificCmsCategoriesFinish: () => ({
    type: actionTypes.GET_SPECIFIC_CMS_CATEGORIES_FINISH,
  }),
  getSpecificCmsCategoriesError: (error: unknown) => ({
    type: actionTypes.GET_SPECIFIC_CMS_CATEGORIES_FINISH,
    payload: { error },
  }),
  // GET category
  getCmsCategories: (params: ParamsModel = { page: 1, limit: 10 }) => ({
    type: actionTypes.GET_CMS_CATEGORIES_START,
    payload: params,
  }),

  getCmsCategoriesSuccess: (data: any) => ({
    type: actionTypes.GET_CMS_CATEGORIES_SUCCESS,
    payload: data,
  }),
  getCmsCategoriesFinish: () => ({
    type: actionTypes.GET_CMS_CATEGORIES_FINISH,
  }),
  getCmsCategoriesError: (error: unknown) => ({
    type: actionTypes.GET_CMS_CATEGORIES_FINISH,
    payload: { error },
  }),

  // create category
  addCmsCategories: (data: any) => ({
    type: actionTypes.ADD_CMS_CATEGORIES_START,
    payload: data,
  }),
  addCmsCategoriesSuccess: (task: any) => ({
    type: actionTypes.ADD_CMS_CATEGORIES_SUCCESS,
    payload: task,
  }),
  addCmsCategoriesFinish: () => ({
    type: actionTypes.ADD_CMS_CATEGORIES_FINISH,
  }),
  addCmsCategoriesReset: () => ({
    type: actionTypes.ADD_CMS_CATEGORIES_RESET,
  }),

  // update category

  updateCmsCategories: (data: any, id: string) => ({
    type: actionTypes.UPDATE_CMS_CATEGORIES_START,
    payload: { data, id },
  }),
  updateCmsCategoriesSuccess: (task: any) => ({
    type: actionTypes.UPDATE_CMS_CATEGORIES_SUCCESS,
    payload: task,
  }),
  updateCmsCategoriesFinish: () => ({
    type: actionTypes.UPDATE_CMS_CATEGORIES_FINISH,
  }),
  updateCmsCategoriesReset: () => ({
    type: actionTypes.UPDATE_CMS_CATEGORIES_RESET,
  }),

  // DELETE category
  deleteCmsCategories: (data: DeleteModel[]) => ({
    type: actionTypes.DELETE_CMS_CATEGORIES_START,
    payload: { categoryId: data },
  }),
  deleteCmsCategoriesSuccess: (data: any) => ({
    type: actionTypes.DELETE_CMS_CATEGORIES_SUCCESS,
    payload: data,
  }),
  deleteCmsCategoriesFinish: () => ({
    type: actionTypes.DELETE_CMS_CATEGORIES_FINISH,
  }),

  // Active cms categories
  activateCmsCategories: (id: { [key: string]: string }) => ({
    type: actionTypes.SINGLE_ACTIVATE_CMS_CATEGORIES_REQUEST,
    payload: { categoryId: id },
  }),
  //  deactive cms categories
  deactivateCmsCategories: (id: { [key: string]: string }) => ({
    type: actionTypes.SINGLE_DEACTIVATE_CMS_CATEGORIES_REQUEST,
    payload: { categoryId: id },
  }),
  // single active cms categories
  singleActivateCmsCategories: (id: { [key: string]: string }) => ({
    type: actionTypes.SINGLE_ACTIVATE_CMS_CATEGORIES_REQUEST,
    payload: { categoryId: [id] },
  }),
  // single deactive cms categories
  singleDeactivateCmsCategories: (id: { [key: string]: string }) => ({
    type: actionTypes.SINGLE_DEACTIVATE_CMS_CATEGORIES_REQUEST,
    payload: { categoryId: [id] },
  }),

  // sort category
  sortCategories: (data: SortCategoriesModel) => ({
    type: actionTypes.SORT_CATEGORIES_START,
    payload: data,
  }),
  sortCategoriesSuccess: (data: Array<CmsCategoriesModel>) => ({
    type: actionTypes.SORT_CATEGORIES_SUCCESS,
    payload: data,
  }),
  sortCategoriesFinish: () => ({
    type: actionTypes.SORT_CATEGORIES_FINISH,
  }),
  sortCategoriesReset: () => ({
    type: actionTypes.SORT_CATEGORIES_RESET,
  }),
}
