import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteServiceTypeModel} from '../Model'
import {ServiceTypeModel} from '../Model/ServiceTypeModel'
import {actionTypes} from './constants'
export const actions = {
  // get ServiceType
  getAllServiceType: () => ({
    type: actionTypes.GET_ALL_SERVICE_TYPE_START,
  }),
  getAllServiceTypeSuccess: (data: ServiceTypeModel) => ({
    type: actionTypes.GET_ALL_SERVICE_TYPE_SUCCESS,
    payload: data,
  }),
  getAllServiceTypeFinish: () => ({
    type: actionTypes.GET_ALL_SERVICE_TYPE_FINISH,
  }),

  // get ServiceType DATA
  getServiceType: (params: ParamsModel | {status: number} = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_SERVICE_TYPE_START,
    payload: params,
  }),
  getServiceTypeSuccess: (data: ServiceTypeModel) => ({
    type: actionTypes.GET_SERVICE_TYPE_SUCCESS,
    payload: data,
  }),
  getServiceTypeFinish: () => ({
    type: actionTypes.GET_SERVICE_TYPE_FINISH,
  }),

  // create key
  addServiceType: (data: ServiceTypeModel) => ({
    type: actionTypes.ADD_SERVICE_TYPE_START,
    payload: data,
  }),
  addServiceTypeSuccess: (task: any) => ({
    type: actionTypes.ADD_SERVICE_TYPE_SUCCESS,
    payload: task,
  }),
  addServiceTypeFinish: () => ({
    type: actionTypes.ADD_SERVICE_TYPE_FINISH,
  }),
  resetServiceType: () => ({
    type: actionTypes.RESET_SERVICE_TYPE,
  }),

  //Update ServiceType
  updateServiceType: (data: ServiceTypeModel, id: string) => ({
    type: actionTypes.UPDATE_SERVICE_TYPE_START,
    payload: data,
    id,
  }),

  updateServiceTypeSuccess: (data: ServiceTypeModel) => ({
    type: actionTypes.UPDATE_SERVICE_TYPE_SUCCESS,
    payload: data,
  }),

  updateServiceTypeFinish: () => ({
    type: actionTypes.UPDATE_SERVICE_TYPE_FINISH,
  }),

  // delete key
  deleteServiceType: (data: DeleteServiceTypeModel[]) => ({
    type: actionTypes.DELETE_SERVICE_TYPE_START,
    payload: {Type: data},
  }),
  deleteServiceTypeSuccess: (data: any) => ({
    type: actionTypes.DELETE_SERVICE_TYPE_SUCCESS,
    payload: data,
  }),
  deleteServiceTypeFinish: () => ({
    type: actionTypes.DELETE_SERVICE_TYPE_FINISH,
  }),

  //Enable ServiceType
  enableServiceType: (data: any) => ({
    type: actionTypes.ENABLE_SERVICE_TYPE_REQUEST,
    payload: {data},
  }),

  enableServiceTypeSuccess: (task: any) => ({
    type: actionTypes.ENABLE_SERVICE_TYPE_SUCCESS,
    payload: task,
  }),
  enableServiceTypeFinish: () => ({
    type: actionTypes.ENABLE_SERVICE_TYPE_FINISH,
  }),

  //Disable ServiceType
  disableServiceType: (data: any) => ({
    type: actionTypes.DISABLE_SERVICE_TYPE_REQUEST,
    payload: {data},
  }),

  disableServiceTypeSuccess: (task: any) => ({
    type: actionTypes.DISABLE_SERVICE_TYPE_SUCCESS,
    payload: task,
  }),
  disableServiceTypeFinish: () => ({
    type: actionTypes.DISABLE_SERVICE_TYPE_FINISH,
  }),

  //Enable ServiceType
  singleEnableServiceType: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_SERVICE_TYPE_REQUEST,
    payload: {data},
  }),

  singleEnableServiceTypeSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_SERVICE_TYPE_SUCCESS,
    payload: task,
  }),
  singleEnableServiceTypeFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_SERVICE_TYPE_FINISH,
  }),

  //Disable ServiceType
  singleDisableServiceType: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_SERVICE_TYPE_REQUEST,
    payload: {data},
  }),

  singleDisableServiceTypeSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_SERVICE_TYPE_SUCCESS,
    payload: task,
  }),
  singleDisableServiceTypeFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_SERVICE_TYPE_FINISH,
  }),
}
