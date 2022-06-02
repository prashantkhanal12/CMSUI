import {ParamsModel} from 'src/app/modules/common/Model'
import {
  ProductComparisonSubCategoryModel,
  SortProductComparisonSubModel,
} from '../Model/ProductComparisonSubCategoryModel'
import {actionTypes} from './constants'
export const actions = {
  // get ProductComparisonSubCategory
  getAllProductComparisonSubCategory: () => ({
    type: actionTypes.GET_ALL_PRODUCT_COMPARISON_SUB_CATEGORY_START,
  }),
  getAllProductComparisonSubCategorySuccess: (data: ProductComparisonSubCategoryModel | any) => ({
    type: actionTypes.GET_ALL_PRODUCT_COMPARISON_SUB_CATEGORY_SUCCESS,
    payload: data,
  }),
  getAllProductComparisonSubCategoryFinish: () => ({
    type: actionTypes.GET_ALL_PRODUCT_COMPARISON_SUB_CATEGORY_FINISH,
  }),

  // get ProductComparisonSubCategory DATA
  getProductComparisonSubCategory: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_PRODUCT_COMPARISON_SUB_CATEGORY_START,
    payload: params,
  }),
  getProductComparisonSubCategorySuccess: (data: ProductComparisonSubCategoryModel | any) => ({
    type: actionTypes.GET_PRODUCT_COMPARISON_SUB_CATEGORY_SUCCESS,
    payload: data,
  }),
  getProductComparisonSubCategoryFinish: () => ({
    type: actionTypes.GET_PRODUCT_COMPARISON_SUB_CATEGORY_FINISH,
  }),

  // create key
  addProductComparisonSubCategory: (data: ProductComparisonSubCategoryModel | any) => ({
    type: actionTypes.ADD_PRODUCT_COMPARISON_SUB_CATEGORY_START,
    payload: data,
  }),
  addProductComparisonSubCategorySuccess: (task: any) => ({
    type: actionTypes.ADD_PRODUCT_COMPARISON_SUB_CATEGORY_SUCCESS,
    payload: task,
  }),
  addProductComparisonSubCategoryFinish: () => ({
    type: actionTypes.ADD_PRODUCT_COMPARISON_SUB_CATEGORY_FINISH,
  }),
  resetProductComparisonSubCategory: () => ({
    type: actionTypes.RESET_PRODUCT_TAG,
  }),

  //Update ProductComparisonSubCategory
  updateProductComparisonSubCategory: (
    data: ProductComparisonSubCategoryModel | any,
    id: string
  ) => ({
    type: actionTypes.UPDATE_PRODUCT_COMPARISON_SUB_CATEGORY_START,
    payload: data,
    id,
  }),

  updateProductComparisonSubCategorySuccess: (data: ProductComparisonSubCategoryModel | any) => ({
    type: actionTypes.UPDATE_PRODUCT_COMPARISON_SUB_CATEGORY_SUCCESS,
    payload: data,
  }),

  updateProductComparisonSubCategoryFinish: () => ({
    type: actionTypes.UPDATE_PRODUCT_COMPARISON_SUB_CATEGORY_FINISH,
  }),

  // delete key
  deleteProductComparisonSubCategory: (data: {id: string}[]) => ({
    type: actionTypes.DELETE_PRODUCT_COMPARISON_SUB_CATEGORY_START,
    payload: {productComparisonSubCategoryId: data},
  }),
  deleteProductComparisonSubCategorySuccess: (data: any) => ({
    type: actionTypes.DELETE_PRODUCT_COMPARISON_SUB_CATEGORY_SUCCESS,
    payload: data,
  }),
  deleteProductComparisonSubCategoryFinish: () => ({
    type: actionTypes.DELETE_PRODUCT_COMPARISON_SUB_CATEGORY_FINISH,
  }),

  //Enable ProductComparisonSubCategory
  enableProductComparisonSubCategory: (data: any) => ({
    type: actionTypes.ENABLE_PRODUCT_COMPARISON_SUB_CATEGORY_REQUEST,
    payload: {data},
  }),

  enableProductComparisonSubCategorySuccess: (task: any) => ({
    type: actionTypes.ENABLE_PRODUCT_COMPARISON_SUB_CATEGORY_SUCCESS,
    payload: task,
  }),
  enableProductComparisonSubCategoryFinish: () => ({
    type: actionTypes.ENABLE_PRODUCT_COMPARISON_SUB_CATEGORY_FINISH,
  }),

  //Disable ProductComparisonSubCategory
  disableProductComparisonSubCategory: (data: any) => ({
    type: actionTypes.DISABLE_PRODUCT_COMPARISON_SUB_CATEGORY_REQUEST,
    payload: {data},
  }),

  disableProductComparisonSubCategorySuccess: (task: any) => ({
    type: actionTypes.DISABLE_PRODUCT_COMPARISON_SUB_CATEGORY_SUCCESS,
    payload: task,
  }),
  disableProductComparisonSubCategoryFinish: () => ({
    type: actionTypes.DISABLE_PRODUCT_COMPARISON_SUB_CATEGORY_FINISH,
  }),

  //Enable ProductComparisonSubCategory
  singleEnableProductComparisonSubCategory: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_PRODUCT_COMPARISON_SUB_CATEGORY_REQUEST,
    payload: {data},
  }),

  singleEnableProductComparisonSubCategorySuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_PRODUCT_COMPARISON_SUB_CATEGORY_SUCCESS,
    payload: task,
  }),
  singleEnableProductComparisonSubCategoryFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_PRODUCT_COMPARISON_SUB_CATEGORY_FINISH,
  }),

  //Disable ProductComparisonSubCategory
  singleDisableProductComparisonSubCategory: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_PRODUCT_COMPARISON_SUB_CATEGORY_REQUEST,
    payload: {data},
  }),

  singleDisableProductComparisonSubCategorySuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_PRODUCT_COMPARISON_SUB_CATEGORY_SUCCESS,
    payload: task,
  }),
  singleDisableProductComparisonSubCategoryFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_PRODUCT_COMPARISON_SUB_CATEGORY_FINISH,
  }),

  // sort
  sortProductComparisonSub: (data: SortProductComparisonSubModel) => ({
    type: actionTypes.SORT_PRODUCT_COMPARISON_SUB_START,
    payload: data,
  }),
  sortProductComparisonSubSuccess: (data: Array<ProductComparisonSubCategoryModel>) => ({
    type: actionTypes.SORT_PRODUCT_COMPARISON_SUB_SUCCESS,
    payload: data,
  }),
  sortProductComparisonSubFinish: () => ({
    type: actionTypes.SORT_PRODUCT_COMPARISON_SUB_FINISH,
  }),
  sortProductComparisonSubReset: () => ({
    type: actionTypes.SORT_PRODUCT_COMPARISON_SUB_RESET,
  }),
}
