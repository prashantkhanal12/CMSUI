import {ParamsModel, StateParamsModel} from 'src/app/modules/common/Model'
import {DeleteServiceCategoryModel} from '../Model'
import {ServiceCategoryModel} from '../Model/ServiceCategoryModel'
import {actionTypes} from './constants'
export const actions = {
  // get ServiceCategory
  getAllServiceCategory: () => ({
    type: actionTypes.GET_ALL_SERVICE_CATEGORY_START,
  }),
  getAllServiceCategorySuccess: (data: ServiceCategoryModel) => ({
    type: actionTypes.GET_ALL_SERVICE_CATEGORY_SUCCESS,
    payload: data,
  }),
  getAllServiceCategoryFinish: () => ({
    type: actionTypes.GET_ALL_SERVICE_CATEGORY_FINISH,
  }),

  // get ServiceCategory DATA
  getServiceCategory: (params: StateParamsModel | {status: number} = {page: 1, limit: 10} ) => ({
    type: actionTypes.GET_SERVICE_CATEGORY_START,
    payload: params,
  }),
  getServiceCategorySuccess: (data: ServiceCategoryModel) => ({
    type: actionTypes.GET_SERVICE_CATEGORY_SUCCESS,
    payload: data,
  }),
  getServiceCategoryFinish: () => ({
    type: actionTypes.GET_SERVICE_CATEGORY_FINISH,
  }),

  // create key
  addServiceCategory: (data: ServiceCategoryModel) => ({
    type: actionTypes.ADD_SERVICE_CATEGORY_START,
    payload: data,
  }),
  addServiceCategorySuccess: (task: any) => ({
    type: actionTypes.ADD_SERVICE_CATEGORY_SUCCESS,
    payload: task,
  }),
  addServiceCategoryFinish: () => ({
    type: actionTypes.ADD_SERVICE_CATEGORY_FINISH,
  }),
  resetServiceCategory: () => ({
    type: actionTypes.RESET_SERVICE_CATEGORY,
  }),

  //Update ServiceCategory
  updateServiceCategory: (data: ServiceCategoryModel, id: string) => ({
    type: actionTypes.UPDATE_SERVICE_CATEGORY_START,
    payload: data,
    id,
  }),

  updateServiceCategorySuccess: (data: ServiceCategoryModel) => ({
    type: actionTypes.UPDATE_SERVICE_CATEGORY_SUCCESS,
    payload: data,
  }),

  updateServiceCategoryFinish: () => ({
    type: actionTypes.UPDATE_SERVICE_CATEGORY_FINISH,
  }),

  // delete key
  deleteServiceCategory: (data: DeleteServiceCategoryModel[]) => ({
    type: actionTypes.DELETE_SERVICE_CATEGORY_START,
    payload: {category: data},
  }),
  deleteServiceCategorySuccess: (data: any) => ({
    type: actionTypes.DELETE_SERVICE_CATEGORY_SUCCESS,
    payload: data,
  }),
  deleteServiceCategoryFinish: () => ({
    type: actionTypes.DELETE_SERVICE_CATEGORY_FINISH,
  }),

  //Enable ServiceCategory
  enableServiceCategory: (data: any) => ({
    type: actionTypes.ENABLE_SERVICE_CATEGORY_REQUEST,
    payload: {data},
  }),

  enableServiceCategorySuccess: (task: any) => ({
    type: actionTypes.ENABLE_SERVICE_CATEGORY_SUCCESS,
    payload: task,
  }),
  enableServiceCategoryFinish: () => ({
    type: actionTypes.ENABLE_SERVICE_CATEGORY_FINISH,
  }),

  //Disable ServiceCategory
  disableServiceCategory: (data: any) => ({
    type: actionTypes.DISABLE_SERVICE_CATEGORY_REQUEST,
    payload: {data},
  }),

  disableServiceCategorySuccess: (task: any) => ({
    type: actionTypes.DISABLE_SERVICE_CATEGORY_SUCCESS,
    payload: task,
  }),
  disableServiceCategoryFinish: () => ({
    type: actionTypes.DISABLE_SERVICE_CATEGORY_FINISH,
  }),

  //Enable ServiceCategory
  singleEnableServiceCategory: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_SERVICE_CATEGORY_REQUEST,
    payload: {data},
  }),

  singleEnableServiceCategorySuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_SERVICE_CATEGORY_SUCCESS,
    payload: task,
  }),
  singleEnableServiceCategoryFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_SERVICE_CATEGORY_FINISH,
  }),

  //Disable ServiceCategory
  singleDisableServiceCategory: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_SERVICE_CATEGORY_REQUEST,
    payload: {data},
  }),

  singleDisableServiceCategorySuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_SERVICE_CATEGORY_SUCCESS,
    payload: task,
  }),
  singleDisableServiceCategoryFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_SERVICE_CATEGORY_FINISH,
  }),
}
