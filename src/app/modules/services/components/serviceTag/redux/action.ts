import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteServiceTagModel, ServiceTagModel, SortServiceTagModel} from '../Model'
import {actionTypes} from './constants'
export const actions = {
  // get Service Tag DATA
  getServiceTag: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_SERVICE_TAG_DATA_START,
    payload: params,
  }),
  getServiceTagSuccess: (data: any) => ({
    type: actionTypes.GET_SERVICE_TAG_DATA_SUCCESS,
    payload: data,
  }),
  getServiceTagFinish: () => ({
    type: actionTypes.GET_SERVICE_TAG_DATA_FINISH,
  }),

  // create Service Tag
  addServiceTag: (data: ServiceTagModel) => ({
    type: actionTypes.ADD_SERVICE_TAG_DATA_START,
    payload: data,
  }),
  addServiceTagSuccess: (task: any) => ({
    type: actionTypes.ADD_SERVICE_TAG_DATA_SUCCESS,
    payload: task,
  }),
  addServiceTagFinish: () => ({
    type: actionTypes.ADD_SERVICE_TAG_DATA_FINISH,
  }),
  resetServiceTag: () => ({
    type: actionTypes.RESET_SERVICE_TAG_DATA,
  }),

  //Update Service Tag
  updateServiceTag: (data: ServiceTagModel, id: string) => ({
    type: actionTypes.UPDATE_SERVICE_TAG_DATA_START,
    payload: data,
    id,
  }),

  updateServiceTagSuccess: (data: ServiceTagModel) => ({
    type: actionTypes.UPDATE_SERVICE_TAG_DATA_SUCCESS,
    payload: data,
  }),

  updateServiceTagFinish: () => ({
    type: actionTypes.UPDATE_SERVICE_TAG_DATA_FINISH,
  }),

  // delete Service Tag
  deleteServiceTag: (data: DeleteServiceTagModel[]) => ({
    type: actionTypes.DELETE_SERVICE_TAG_DATA_START,
    payload: {serviceTagId: data},
  }),
  deleteServiceTagSuccess: (data: any) => ({
    type: actionTypes.DELETE_SERVICE_TAG_DATA_SUCCESS,
    payload: data,
  }),
  deleteServiceTagFinish: () => ({
    type: actionTypes.DELETE_SERVICE_TAG_DATA_FINISH,
  }),

  //Enable Service Tag
  enableServiceTag: (data: any) => ({
    type: actionTypes.ENABLE_SERVICE_TAG_DATA_REQUEST,
    payload: {data},
  }),

  enableServiceTagSuccess: (task: any) => ({
    type: actionTypes.ENABLE_SERVICE_TAG_DATA_SUCCESS,
    payload: task,
  }),
  enableServiceTagFinish: () => ({
    type: actionTypes.ENABLE_SERVICE_TAG_DATA_FINISH,
  }),

  //Disable Service Tag
  disableServiceTag: (data: any) => ({
    type: actionTypes.DISABLE_SERVICE_TAG_DATA_REQUEST,
    payload: {data},
  }),

  disableServiceTagSuccess: (task: any) => ({
    type: actionTypes.DISABLE_SERVICE_TAG_DATA_SUCCESS,
    payload: task,
  }),
  disableServiceTagFinish: () => ({
    type: actionTypes.DISABLE_SERVICE_TAG_DATA_FINISH,
  }),

  //Enable Service Tag
  singleEnableServiceTag: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_SERVICE_TAG_DATA_REQUEST,
    payload: {data},
  }),

  singleEnableServiceTagSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_SERVICE_TAG_DATA_SUCCESS,
    payload: task,
  }),
  singleEnableServiceTagFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_SERVICE_TAG_DATA_FINISH,
  }),

  //Disable Service Tag
  singleDisableServiceTag: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_SERVICE_TAG_DATA_REQUEST,
    payload: {data},
  }),

  singleDisableServiceTagSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_SERVICE_TAG_DATA_SUCCESS,
    payload: task,
  }),
  singleDisableServiceTagFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_SERVICE_TAG_DATA_FINISH,
  }),

  // get Service Tag list
  getServiceTagList: (params: {serviceCategoryId?: string} = {}) => ({
    type: actionTypes.GET_SERVICE_TAG_LIST_START,
    payload: params,
  }),
  getServiceTagListSuccess: (data: any) => ({
    type: actionTypes.GET_SERVICE_TAG_LIST_SUCCESS,
    payload: data,
  }),
  getServiceTagListFinish: () => ({
    type: actionTypes.GET_SERVICE_TAG_LIST_FINISH,
  }),

  // sort
  sortServiceTag: (data: SortServiceTagModel) => ({
    type: actionTypes.SORT_SERVICE_TAG_START,
    payload: data,
  }),
  sortServiceTagSuccess: (data: Array<ServiceTagModel>) => ({
    type: actionTypes.SORT_SERVICE_TAG_SUCCESS,
    payload: data,
  }),
  sortServiceTagFinish: () => ({
    type: actionTypes.SORT_SERVICE_TAG_FINISH,
  }),
  sortServiceTagReset: () => ({
    type: actionTypes.SORT_SERVICE_TAG_RESET,
  }),
}
