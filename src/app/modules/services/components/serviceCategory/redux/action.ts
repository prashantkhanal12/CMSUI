import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteServiceCategoryModel, ServiceCategoryModel, SortServiceCategoryModel} from '../Model'
import {actionTypes} from './constants'
export const actions = {
  // get Service Category DATA
  getServiceCategory: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_SERVICE_CATEGORY_DATA_START,
    payload: params,
  }),
  getServiceCategorySuccess: (data: any) => ({
    type: actionTypes.GET_SERVICE_CATEGORY_DATA_SUCCESS,
    payload: data,
  }),
  getServiceCategoryFinish: () => ({
    type: actionTypes.GET_SERVICE_CATEGORY_DATA_FINISH,
  }),

  // create Service Category
  addServiceCategory: (data: ServiceCategoryModel) => ({
    type: actionTypes.ADD_SERVICE_CATEGORY_DATA_START,
    payload: data,
  }),
  addServiceCategorySuccess: (task: any) => ({
    type: actionTypes.ADD_SERVICE_CATEGORY_DATA_SUCCESS,
    payload: task,
  }),
  addServiceCategoryFinish: () => ({
    type: actionTypes.ADD_SERVICE_CATEGORY_DATA_FINISH,
  }),
  resetServiceCategory: () => ({
    type: actionTypes.RESET_SERVICE_CATEGORY_DATA,
  }),

  //Update Service Category
  updateServiceCategory: (data: ServiceCategoryModel, id: string) => ({
    type: actionTypes.UPDATE_SERVICE_CATEGORY_DATA_START,
    payload: data,
    id,
  }),

  updateServiceCategorySuccess: (data: ServiceCategoryModel) => ({
    type: actionTypes.UPDATE_SERVICE_CATEGORY_DATA_SUCCESS,
    payload: data,
  }),

  updateServiceCategoryFinish: () => ({
    type: actionTypes.UPDATE_SERVICE_CATEGORY_DATA_FINISH,
  }),

  // delete Service Category
  deleteServiceCategory: (data: DeleteServiceCategoryModel[]) => ({
    type: actionTypes.DELETE_SERVICE_CATEGORY_DATA_START,
    payload: {serviceCategoryId: data},
  }),
  deleteServiceCategorySuccess: (data: any) => ({
    type: actionTypes.DELETE_SERVICE_CATEGORY_DATA_SUCCESS,
    payload: data,
  }),
  deleteServiceCategoryFinish: () => ({
    type: actionTypes.DELETE_SERVICE_CATEGORY_DATA_FINISH,
  }),

  //Enable Service Category
  enableServiceCategory: (data: any) => ({
    type: actionTypes.ENABLE_SERVICE_CATEGORY_DATA_REQUEST,
    payload: {data},
  }),

  enableServiceCategorySuccess: (task: any) => ({
    type: actionTypes.ENABLE_SERVICE_CATEGORY_DATA_SUCCESS,
    payload: task,
  }),
  enableServiceCategoryFinish: () => ({
    type: actionTypes.ENABLE_SERVICE_CATEGORY_DATA_FINISH,
  }),

  //Disable Service Category
  disableServiceCategory: (data: any) => ({
    type: actionTypes.DISABLE_SERVICE_CATEGORY_DATA_REQUEST,
    payload: {data},
  }),

  disableServiceCategorySuccess: (task: any) => ({
    type: actionTypes.DISABLE_SERVICE_CATEGORY_DATA_SUCCESS,
    payload: task,
  }),
  disableServiceCategoryFinish: () => ({
    type: actionTypes.DISABLE_SERVICE_CATEGORY_DATA_FINISH,
  }),

  //Enable Service Category
  singleEnableServiceCategory: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_SERVICE_CATEGORY_DATA_REQUEST,
    payload: {data},
  }),

  singleEnableServiceCategorySuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_SERVICE_CATEGORY_DATA_SUCCESS,
    payload: task,
  }),
  singleEnableServiceCategoryFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_SERVICE_CATEGORY_DATA_FINISH,
  }),

  //Disable Service Category
  singleDisableServiceCategory: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_SERVICE_CATEGORY_DATA_REQUEST,
    payload: {data},
  }),

  singleDisableServiceCategorySuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_SERVICE_CATEGORY_DATA_SUCCESS,
    payload: task,
  }),
  singleDisableServiceCategoryFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_SERVICE_CATEGORY_DATA_FINISH,
  }),

  // get Service Category DATA
  getServiceCategoryList: () => ({
    type: actionTypes.GET_SERVICE_CATEGORY_LIST_START,
  }),
  getServiceCategoryListSuccess: (data: any) => ({
    type: actionTypes.GET_SERVICE_CATEGORY_LIST_SUCCESS,
    payload: data,
  }),
  getServiceCategoryListFinish: () => ({
    type: actionTypes.GET_SERVICE_CATEGORY_LIST_FINISH,
  }),

  // sort
  sortServiceCategory: (data: SortServiceCategoryModel) => ({
    type: actionTypes.SORT_SERVICE_CATEGORY_START,
    payload: data,
  }),
  sortServiceCategorySuccess: (data: Array<ServiceCategoryModel>) => ({
    type: actionTypes.SORT_SERVICE_CATEGORY_SUCCESS,
    payload: data,
  }),
  sortServiceCategoryFinish: () => ({
    type: actionTypes.SORT_SERVICE_CATEGORY_FINISH,
  }),
  sortServiceCategoryReset: () => ({
    type: actionTypes.SORT_SERVICE_CATEGORY_RESET,
  }),
}
