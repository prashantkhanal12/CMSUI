import {ParamsModel} from 'src/app/modules/common/Model'
import {ProductTagModel} from '../Model/ProductTagModel'
import {actionTypes} from './constants'
export const actions = {
  // get ProductTag
  getAllProductTag: () => ({
    type: actionTypes.GET_ALL_PRODUCT_TAG_START,
  }),
  getAllProductTagSuccess: (data: ProductTagModel | any) => ({
    type: actionTypes.GET_ALL_PRODUCT_TAG_SUCCESS,
    payload: data,
  }),
  getAllProductTagFinish: () => ({
    type: actionTypes.GET_ALL_PRODUCT_TAG_FINISH,
  }),

  // get ProductTag DATA
  getProductTag: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_PRODUCT_TAG_START,
    payload: params,
  }),
  getProductTagSuccess: (data: ProductTagModel | any) => ({
    type: actionTypes.GET_PRODUCT_TAG_SUCCESS,
    payload: data,
  }),
  getProductTagFinish: () => ({
    type: actionTypes.GET_PRODUCT_TAG_FINISH,
  }),

  // create key
  addProductTag: (data: ProductTagModel | any) => ({
    type: actionTypes.ADD_PRODUCT_TAG_START,
    payload: data,
  }),
  addProductTagSuccess: (task: any) => ({
    type: actionTypes.ADD_PRODUCT_TAG_SUCCESS,
    payload: task,
  }),
  addProductTagFinish: () => ({
    type: actionTypes.ADD_PRODUCT_TAG_FINISH,
  }),
  resetProductTag: () => ({
    type: actionTypes.RESET_PRODUCT_TAG,
  }),

  //Update ProductTag
  updateProductTag: (data: ProductTagModel | any, id: string) => ({
    type: actionTypes.UPDATE_PRODUCT_TAG_START,
    payload: data,
    id,
  }),

  updateProductTagSuccess: (data: ProductTagModel | any) => ({
    type: actionTypes.UPDATE_PRODUCT_TAG_SUCCESS,
    payload: data,
  }),

  updateProductTagFinish: () => ({
    type: actionTypes.UPDATE_PRODUCT_TAG_FINISH,
  }),

  // delete key
  deleteProductTag: (data: {id: string}[]) => ({
    type: actionTypes.DELETE_PRODUCT_TAG_START,
    payload: {productTagId: data},
  }),
  deleteProductTagSuccess: (data: any) => ({
    type: actionTypes.DELETE_PRODUCT_TAG_SUCCESS,
    payload: data,
  }),
  deleteProductTagFinish: () => ({
    type: actionTypes.DELETE_PRODUCT_TAG_FINISH,
  }),

  //Enable ProductTag
  enableProductTag: (data: any) => ({
    type: actionTypes.ENABLE_PRODUCT_TAG_REQUEST,
    payload: {data},
  }),

  enableProductTagSuccess: (task: any) => ({
    type: actionTypes.ENABLE_PRODUCT_TAG_SUCCESS,
    payload: task,
  }),
  enableProductTagFinish: () => ({
    type: actionTypes.ENABLE_PRODUCT_TAG_FINISH,
  }),

  //Disable ProductTag
  disableProductTag: (data: any) => ({
    type: actionTypes.DISABLE_PRODUCT_TAG_REQUEST,
    payload: {data},
  }),

  disableProductTagSuccess: (task: any) => ({
    type: actionTypes.DISABLE_PRODUCT_TAG_SUCCESS,
    payload: task,
  }),
  disableProductTagFinish: () => ({
    type: actionTypes.DISABLE_PRODUCT_TAG_FINISH,
  }),

  //Enable ProductTag
  singleEnableProductTag: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_PRODUCT_TAG_REQUEST,
    payload: {data},
  }),

  singleEnableProductTagSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_PRODUCT_TAG_SUCCESS,
    payload: task,
  }),
  singleEnableProductTagFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_PRODUCT_TAG_FINISH,
  }),

  //Disable ProductTag
  singleDisableProductTag: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_PRODUCT_TAG_REQUEST,
    payload: {data},
  }),

  singleDisableProductTagSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_PRODUCT_TAG_SUCCESS,
    payload: task,
  }),
  singleDisableProductTagFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_PRODUCT_TAG_FINISH,
  }),
}
