import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteMerchantSubCategoryModel, SortMerchantSubCategoryModel} from '../Model'
import {MerchantSubCategoryModel} from '../Model/MerchantSubCategoryModel'
import {actionTypes} from './constants'
export const actions = {
  // get MerchantSubCategory
  getAllMerchantSubCategory: (id: string = '') => ({
    type: actionTypes.GET_ALL_MERCHANT_SUB_CATEGORY_START,
    payload: id,
  }),
  getAllMerchantSubCategorySuccess: (data: MerchantSubCategoryModel) => ({
    type: actionTypes.GET_ALL_MERCHANT_SUB_CATEGORY_SUCCESS,
    payload: data,
  }),
  getAllMerchantSubCategoryFinish: () => ({
    type: actionTypes.GET_ALL_MERCHANT_SUB_CATEGORY_FINISH,
  }),

  // get MerchantSubCategory DATA
  getMerchantSubCategory: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_MERCHANT_SUB_CATEGORY_START,
    payload: params,
  }),
  getMerchantSubCategorySuccess: (data: MerchantSubCategoryModel) => ({
    type: actionTypes.GET_MERCHANT_SUB_CATEGORY_SUCCESS,
    payload: data,
  }),
  getMerchantSubCategoryFinish: () => ({
    type: actionTypes.GET_MERCHANT_SUB_CATEGORY_FINISH,
  }),

  // create key
  addMerchantSubCategory: (data: MerchantSubCategoryModel | any) => ({
    type: actionTypes.ADD_MERCHANT_SUB_CATEGORY_START,
    payload: data,
  }),
  addMerchantSubCategorySuccess: (task: any) => ({
    type: actionTypes.ADD_MERCHANT_SUB_CATEGORY_SUCCESS,
    payload: task,
  }),
  addMerchantSubCategoryFinish: () => ({
    type: actionTypes.ADD_MERCHANT_SUB_CATEGORY_FINISH,
  }),
  resetMerchantSubCategory: () => ({
    type: actionTypes.RESET_MERCHANT_SUB_CATEGORY,
  }),

  //Update MerchantSubCategory
  updateMerchantSubCategory: (data: MerchantSubCategoryModel | any, id: string) => ({
    type: actionTypes.UPDATE_MERCHANT_SUB_CATEGORY_START,
    payload: {data, id},
  }),

  updateMerchantSubCategorySuccess: (data: MerchantSubCategoryModel | any) => ({
    type: actionTypes.UPDATE_MERCHANT_SUB_CATEGORY_SUCCESS,
    payload: data,
  }),

  updateMerchantSubCategoryFinish: () => ({
    type: actionTypes.UPDATE_MERCHANT_SUB_CATEGORY_FINISH,
  }),

  // delete key
  deleteMerchantSubCategory: (data: DeleteMerchantSubCategoryModel[]) => ({
    type: actionTypes.DELETE_MERCHANT_SUB_CATEGORY_START,
    payload: {merchantSubCategoryId: data},
  }),
  deleteMerchantSubCategorySuccess: (data: any) => ({
    type: actionTypes.DELETE_MERCHANT_SUB_CATEGORY_SUCCESS,
    payload: data,
  }),
  deleteMerchantSubCategoryFinish: () => ({
    type: actionTypes.DELETE_MERCHANT_SUB_CATEGORY_FINISH,
  }),

  //Enable MerchantSubCategory
  enableMerchantSubCategory: (data: any) => ({
    type: actionTypes.ENABLE_MERCHANT_SUB_CATEGORY_REQUEST,
    payload: {data},
  }),

  enableMerchantSubCategorySuccess: (task: any) => ({
    type: actionTypes.ENABLE_MERCHANT_SUB_CATEGORY_SUCCESS,
    payload: task,
  }),
  enableMerchantSubCategoryFinish: () => ({
    type: actionTypes.ENABLE_MERCHANT_SUB_CATEGORY_FINISH,
  }),

  //Disable MerchantSubCategory
  disableMerchantSubCategory: (data: any) => ({
    type: actionTypes.DISABLE_MERCHANT_SUB_CATEGORY_REQUEST,
    payload: {data},
  }),

  disableMerchantSubCategorySuccess: (task: any) => ({
    type: actionTypes.DISABLE_MERCHANT_SUB_CATEGORY_SUCCESS,
    payload: task,
  }),
  disableMerchantSubCategoryFinish: () => ({
    type: actionTypes.DISABLE_MERCHANT_SUB_CATEGORY_FINISH,
  }),

  //Enable MerchantSubCategory
  singleEnableMerchantSubCategory: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_MERCHANT_SUB_CATEGORY_REQUEST,
    payload: {data},
  }),

  singleEnableMerchantSubCategorySuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_MERCHANT_SUB_CATEGORY_SUCCESS,
    payload: task,
  }),
  singleEnableMerchantSubCategoryFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_MERCHANT_SUB_CATEGORY_FINISH,
  }),

  //Disable MerchantSubCategory
  singleDisableMerchantSubCategory: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_MERCHANT_SUB_CATEGORY_REQUEST,
    payload: {data},
  }),

  singleDisableMerchantSubCategorySuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_MERCHANT_SUB_CATEGORY_SUCCESS,
    payload: task,
  }),
  singleDisableMerchantSubCategoryFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_MERCHANT_SUB_CATEGORY_FINISH,
  }),

  // sort
  sortMerchantSubCategory: (data: SortMerchantSubCategoryModel) => ({
    type: actionTypes.SORT_MERCHANT_SUB_CATEGORY_START,
    payload: data,
  }),
  sortMerchantSubCategorySuccess: (data: Array<MerchantSubCategoryModel>) => ({
    type: actionTypes.SORT_MERCHANT_SUB_CATEGORY_SUCCESS,
    payload: data,
  }),
  sortMerchantSubCategoryFinish: () => ({
    type: actionTypes.SORT_MERCHANT_SUB_CATEGORY_FINISH,
  }),
  sortMerchantSubCategoryReset: () => ({
    type: actionTypes.SORT_MERCHANT_SUB_CATEGORY_RESET,
  }),
}
