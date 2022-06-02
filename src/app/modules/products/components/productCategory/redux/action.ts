import {ParamsModel} from 'src/app/modules/common/Model'
import {ProductCategoryModel, SortProductCategoryModel} from '../Model/ProductCategoryModel'
import {actionTypes} from './constants'
export const actions = {
  // get ProductCategory
  getAllProductCategory: () => ({
    type: actionTypes.GET_ALL_PRODUCT_CATEGORY_START,
  }),
  getAllProductCategorySuccess: (data: ProductCategoryModel | any) => ({
    type: actionTypes.GET_ALL_PRODUCT_CATEGORY_SUCCESS,
    payload: data,
  }),
  getAllProductCategoryFinish: () => ({
    type: actionTypes.GET_ALL_PRODUCT_CATEGORY_FINISH,
  }),

  // get ProductCategory DATA
  getProductCategory: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_PRODUCT_CATEGORY_START,
    payload: params,
  }),
  getProductCategorySuccess: (data: ProductCategoryModel | any) => ({
    type: actionTypes.GET_PRODUCT_CATEGORY_SUCCESS,
    payload: data,
  }),
  getProductCategoryFinish: () => ({
    type: actionTypes.GET_PRODUCT_CATEGORY_FINISH,
  }),

  // create key
  addProductCategory: (data: ProductCategoryModel | any) => ({
    type: actionTypes.ADD_PRODUCT_CATEGORY_START,
    payload: data,
  }),
  addProductCategorySuccess: (task: any) => ({
    type: actionTypes.ADD_PRODUCT_CATEGORY_SUCCESS,
    payload: task,
  }),
  addProductCategoryFinish: () => ({
    type: actionTypes.ADD_PRODUCT_CATEGORY_FINISH,
  }),
  resetProductCategory: () => ({
    type: actionTypes.RESET_PRODUCT_TAG,
  }),

  //Update ProductCategory
  updateProductCategory: (data: ProductCategoryModel | any, id: string) => ({
    type: actionTypes.UPDATE_PRODUCT_CATEGORY_START,
    payload: data,
    id,
  }),

  updateProductCategorySuccess: (data: ProductCategoryModel | any) => ({
    type: actionTypes.UPDATE_PRODUCT_CATEGORY_SUCCESS,
    payload: data,
  }),

  updateProductCategoryFinish: () => ({
    type: actionTypes.UPDATE_PRODUCT_CATEGORY_FINISH,
  }),

  // delete key
  deleteProductCategory: (data: {id: string}[]) => ({
    type: actionTypes.DELETE_PRODUCT_CATEGORY_START,
    payload: {productCategoryId: data},
  }),
  deleteProductCategorySuccess: (data: any) => ({
    type: actionTypes.DELETE_PRODUCT_CATEGORY_SUCCESS,
    payload: data,
  }),
  deleteProductCategoryFinish: () => ({
    type: actionTypes.DELETE_PRODUCT_CATEGORY_FINISH,
  }),

  //Enable ProductCategory
  enableProductCategory: (data: any) => ({
    type: actionTypes.ENABLE_PRODUCT_CATEGORY_REQUEST,
    payload: {data},
  }),

  enableProductCategorySuccess: (task: any) => ({
    type: actionTypes.ENABLE_PRODUCT_CATEGORY_SUCCESS,
    payload: task,
  }),
  enableProductCategoryFinish: () => ({
    type: actionTypes.ENABLE_PRODUCT_CATEGORY_FINISH,
  }),

  //Disable ProductCategory
  disableProductCategory: (data: any) => ({
    type: actionTypes.DISABLE_PRODUCT_CATEGORY_REQUEST,
    payload: {data},
  }),

  disableProductCategorySuccess: (task: any) => ({
    type: actionTypes.DISABLE_PRODUCT_CATEGORY_SUCCESS,
    payload: task,
  }),
  disableProductCategoryFinish: () => ({
    type: actionTypes.DISABLE_PRODUCT_CATEGORY_FINISH,
  }),

  //Enable ProductCategory
  singleEnableProductCategory: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_PRODUCT_CATEGORY_REQUEST,
    payload: {data},
  }),

  singleEnableProductCategorySuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_PRODUCT_CATEGORY_SUCCESS,
    payload: task,
  }),
  singleEnableProductCategoryFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_PRODUCT_CATEGORY_FINISH,
  }),

  //Disable ProductCategory
  singleDisableProductCategory: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_PRODUCT_CATEGORY_REQUEST,
    payload: {data},
  }),

  singleDisableProductCategorySuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_PRODUCT_CATEGORY_SUCCESS,
    payload: task,
  }),
  singleDisableProductCategoryFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_PRODUCT_CATEGORY_FINISH,
  }),

  // sort
  sortProductCategory: (data: SortProductCategoryModel) => ({
    type: actionTypes.SORT_PRODUCT_CATEGORY_START,
    payload: data,
  }),
  sortProductCategorySuccess: (data: Array<ProductCategoryModel>) => ({
    type: actionTypes.SORT_PRODUCT_CATEGORY_SUCCESS,
    payload: data,
  }),
  sortProductCategoryFinish: () => ({
    type: actionTypes.SORT_PRODUCT_CATEGORY_FINISH,
  }),
  sortProductCategoryReset: () => ({
    type: actionTypes.SORT_PRODUCT_CATEGORY_RESET,
  }),
}
