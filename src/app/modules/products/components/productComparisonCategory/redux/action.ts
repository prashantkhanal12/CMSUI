import {ParamsModel} from 'src/app/modules/common/Model'
import {
  ProductComparisonCategoryModel,
  SortProductComparisonModel,
} from '../Model/ProductComparisonCategoryModel'
import {actionTypes} from './constants'
export const actions = {
  // get ProductComparisonCategory
  getAllProductComparisonCategory: () => ({
    type: actionTypes.GET_ALL_PRODUCT_COMPARISON_CATEGORY_START,
  }),
  getAllProductComparisonCategorySuccess: (data: ProductComparisonCategoryModel | any) => ({
    type: actionTypes.GET_ALL_PRODUCT_COMPARISON_CATEGORY_SUCCESS,
    payload: data,
  }),
  getAllProductComparisonCategoryFinish: () => ({
    type: actionTypes.GET_ALL_PRODUCT_COMPARISON_CATEGORY_FINISH,
  }),

  // get ProductComparisonCategory DATA
  getProductComparisonCategory: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_PRODUCT_COMPARISON_CATEGORY_START,
    payload: params,
  }),
  getProductComparisonCategorySuccess: (data: ProductComparisonCategoryModel | any) => ({
    type: actionTypes.GET_PRODUCT_COMPARISON_CATEGORY_SUCCESS,
    payload: data,
  }),
  getProductComparisonCategoryFinish: () => ({
    type: actionTypes.GET_PRODUCT_COMPARISON_CATEGORY_FINISH,
  }),

  // create key
  addProductComparisonCategory: (data: ProductComparisonCategoryModel | any) => ({
    type: actionTypes.ADD_PRODUCT_COMPARISON_CATEGORY_START,
    payload: data,
  }),
  addProductComparisonCategorySuccess: (task: any) => ({
    type: actionTypes.ADD_PRODUCT_COMPARISON_CATEGORY_SUCCESS,
    payload: task,
  }),
  addProductComparisonCategoryFinish: () => ({
    type: actionTypes.ADD_PRODUCT_COMPARISON_CATEGORY_FINISH,
  }),
  resetProductComparisonCategory: () => ({
    type: actionTypes.RESET_PRODUCT_TAG,
  }),

  //Update ProductComparisonCategory
  updateProductComparisonCategory: (data: ProductComparisonCategoryModel | any, id: string) => ({
    type: actionTypes.UPDATE_PRODUCT_COMPARISON_CATEGORY_START,
    payload: data,
    id,
  }),

  updateProductComparisonCategorySuccess: (data: ProductComparisonCategoryModel | any) => ({
    type: actionTypes.UPDATE_PRODUCT_COMPARISON_CATEGORY_SUCCESS,
    payload: data,
  }),

  updateProductComparisonCategoryFinish: () => ({
    type: actionTypes.UPDATE_PRODUCT_COMPARISON_CATEGORY_FINISH,
  }),

  // delete key
  deleteProductComparisonCategory: (data: {id: string}[]) => ({
    type: actionTypes.DELETE_PRODUCT_COMPARISON_CATEGORY_START,
    payload: {productComparisonCategoryId: data},
  }),
  deleteProductComparisonCategorySuccess: (data: any) => ({
    type: actionTypes.DELETE_PRODUCT_COMPARISON_CATEGORY_SUCCESS,
    payload: data,
  }),
  deleteProductComparisonCategoryFinish: () => ({
    type: actionTypes.DELETE_PRODUCT_COMPARISON_CATEGORY_FINISH,
  }),

  //Enable ProductComparisonCategory
  enableProductComparisonCategory: (data: any) => ({
    type: actionTypes.ENABLE_PRODUCT_COMPARISON_CATEGORY_REQUEST,
    payload: {data},
  }),

  enableProductComparisonCategorySuccess: (task: any) => ({
    type: actionTypes.ENABLE_PRODUCT_COMPARISON_CATEGORY_SUCCESS,
    payload: task,
  }),
  enableProductComparisonCategoryFinish: () => ({
    type: actionTypes.ENABLE_PRODUCT_COMPARISON_CATEGORY_FINISH,
  }),

  //Disable ProductComparisonCategory
  disableProductComparisonCategory: (data: any) => ({
    type: actionTypes.DISABLE_PRODUCT_COMPARISON_CATEGORY_REQUEST,
    payload: {data},
  }),

  disableProductComparisonCategorySuccess: (task: any) => ({
    type: actionTypes.DISABLE_PRODUCT_COMPARISON_CATEGORY_SUCCESS,
    payload: task,
  }),
  disableProductComparisonCategoryFinish: () => ({
    type: actionTypes.DISABLE_PRODUCT_COMPARISON_CATEGORY_FINISH,
  }),

  //Enable ProductComparisonCategory
  singleEnableProductComparisonCategory: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_PRODUCT_COMPARISON_CATEGORY_REQUEST,
    payload: {data},
  }),

  singleEnableProductComparisonCategorySuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_PRODUCT_COMPARISON_CATEGORY_SUCCESS,
    payload: task,
  }),
  singleEnableProductComparisonCategoryFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_PRODUCT_COMPARISON_CATEGORY_FINISH,
  }),

  //Disable ProductComparisonCategory
  singleDisableProductComparisonCategory: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_PRODUCT_COMPARISON_CATEGORY_REQUEST,
    payload: {data},
  }),

  singleDisableProductComparisonCategorySuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_PRODUCT_COMPARISON_CATEGORY_SUCCESS,
    payload: task,
  }),
  singleDisableProductComparisonCategoryFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_PRODUCT_COMPARISON_CATEGORY_FINISH,
  }),

  // sort
  sortProductComparison: (data: SortProductComparisonModel) => ({
    type: actionTypes.SORT_PRODUCT_COMPARISON_START,
    payload: data,
  }),
  sortProductComparisonSuccess: (data: Array<ProductComparisonCategoryModel>) => ({
    type: actionTypes.SORT_PRODUCT_COMPARISON_SUCCESS,
    payload: data,
  }),
  sortProductComparisonFinish: () => ({
    type: actionTypes.SORT_PRODUCT_COMPARISON_FINISH,
  }),
  sortProductComparisonReset: () => ({
    type: actionTypes.SORT_PRODUCT_COMPARISON_RESET,
  }),
}
