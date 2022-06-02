import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteServiceSubTypeModel} from '../Model'
import {ServiceSubTypeModel} from '../Model/ServiceSubTypeModel'
import {actionTypes} from './constants'
export const actions = {
  // get ServiceSubType
  getAllServiceSubType: () => ({
    type: actionTypes.GET_ALL_SERVICE_SUB_TYPE_START,
  }),
  getAllServiceSubTypeSuccess: (data: ServiceSubTypeModel) => ({
    type: actionTypes.GET_ALL_SERVICE_SUB_TYPE_SUCCESS,
    payload: data,
  }),
  getAllServiceSubTypeFinish: () => ({
    type: actionTypes.GET_ALL_SERVICE_SUB_TYPE_FINISH,
  }),

  // get ServiceSubType DATA
  getServiceSubType: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_SERVICE_SUB_TYPE_START,
    payload: params,
  }),
  getServiceSubTypeSuccess: (data: ServiceSubTypeModel) => ({
    type: actionTypes.GET_SERVICE_SUB_TYPE_SUCCESS,
    payload: data,
  }),
  getServiceSubTypeFinish: () => ({
    type: actionTypes.GET_SERVICE_SUB_TYPE_FINISH,
  }),

  // create key
  addServiceSubType: (data: ServiceSubTypeModel) => ({
    type: actionTypes.ADD_SERVICE_SUB_TYPE_START,
    payload: data,
  }),
  addServiceSubTypeSuccess: (task: any) => ({
    type: actionTypes.ADD_SERVICE_SUB_TYPE_SUCCESS,
    payload: task,
  }),
  addServiceSubTypeFinish: () => ({
    type: actionTypes.ADD_SERVICE_SUB_TYPE_FINISH,
  }),
  resetServiceSubType: () => ({
    type: actionTypes.RESET_SERVICE_TYPE,
  }),

  //Update ServiceSubType
  updateServiceSubType: (data: ServiceSubTypeModel, id: string) => ({
    type: actionTypes.UPDATE_SERVICE_SUB_TYPE_START,
    payload: data,
    id,
  }),

  updateServiceSubTypeSuccess: (data: ServiceSubTypeModel) => ({
    type: actionTypes.UPDATE_SERVICE_SUB_TYPE_SUCCESS,
    payload: data,
  }),

  updateServiceSubTypeFinish: () => ({
    type: actionTypes.UPDATE_SERVICE_SUB_TYPE_FINISH,
  }),

  // delete key
  deleteServiceSubType: (data: DeleteServiceSubTypeModel[]) => ({
    type: actionTypes.DELETE_SERVICE_SUB_TYPE_START,
    payload: {serviceSubType: data},
  }),
  deleteServiceSubTypeSuccess: (data: any) => ({
    type: actionTypes.DELETE_SERVICE_SUB_TYPE_SUCCESS,
    payload: data,
  }),
  deleteServiceSubTypeFinish: () => ({
    type: actionTypes.DELETE_SERVICE_SUB_TYPE_FINISH,
  }),

  //Enable ServiceSubType
  enableServiceSubType: (data: any) => ({
    type: actionTypes.ENABLE_SERVICE_SUB_TYPE_REQUEST,
    payload: {data},
  }),

  enableServiceSubTypeSuccess: (task: any) => ({
    type: actionTypes.ENABLE_SERVICE_SUB_TYPE_SUCCESS,
    payload: task,
  }),
  enableServiceSubTypeFinish: () => ({
    type: actionTypes.ENABLE_SERVICE_SUB_TYPE_FINISH,
  }),

  //Disable ServiceSubType
  disableServiceSubType: (data: any) => ({
    type: actionTypes.DISABLE_SERVICE_SUB_TYPE_REQUEST,
    payload: {data},
  }),

  disableServiceSubTypeSuccess: (task: any) => ({
    type: actionTypes.DISABLE_SERVICE_SUB_TYPE_SUCCESS,
    payload: task,
  }),
  disableServiceSubTypeFinish: () => ({
    type: actionTypes.DISABLE_SERVICE_SUB_TYPE_FINISH,
  }),

  //Enable ServiceSubType
  singleEnableServiceSubType: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_SERVICE_SUB_TYPE_REQUEST,
    payload: {data},
  }),

  singleEnableServiceSubTypeSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_SERVICE_SUB_TYPE_SUCCESS,
    payload: task,
  }),
  singleEnableServiceSubTypeFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_SERVICE_SUB_TYPE_FINISH,
  }),

  //Disable ServiceSubType
  singleDisableServiceSubType: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_SERVICE_SUB_TYPE_REQUEST,
    payload: {data},
  }),

  singleDisableServiceSubTypeSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_SERVICE_SUB_TYPE_SUCCESS,
    payload: task,
  }),
  singleDisableServiceSubTypeFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_SERVICE_SUB_TYPE_FINISH,
  }),
}
