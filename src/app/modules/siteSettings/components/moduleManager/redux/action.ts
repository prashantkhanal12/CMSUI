import {ParamsModel} from 'src/app/modules/common/Model'
import {IModuleState} from '..'
import {IModuleModel, ModuleStatusType, SortModuleManagerModel, ToogleStatusType} from '../Model'
import {actionTypes} from './constants'

export const actions = {
  getSocialIntegration: () => ({type: actionTypes.GET_SOCIAL_INTEGRATION_START}),

  getSocialIntegrationSuccess: (data: IModuleState) => ({
    type: actionTypes.GET_SOCIAL_INTEGRATION_SUCCESS,
    payload: data,
  }),

  getSocialIntegrationFinish: () => ({
    type: actionTypes.GET_SOCIAL_INTEGRATION_FINISH,
  }),
}

export const nav_visiblity = {
  getNavVisibility: () => ({type: actionTypes.GET_NAV_VISIBILITY_START}),

  getNavVisibilitySuccess: (data: IModuleState) => ({
    type: actionTypes.GET_NAV_VISIBILITY_SUCCESS,
    payload: data,
  }),

  getNavVisibilityFinish: () => ({
    type: actionTypes.GET_NAV_VISIBILITY_FINISH,
  }),
}

export const moduleActions = {
  addModule: (data: {[key: string]: string | boolean}) => ({
    type: actionTypes.ADD_MODULE_START,
    payload: data,
  }),

  addModuleSuccess: (data: IModuleState) => ({
    type: actionTypes.ADD_MODULE_SUCCESS,
    payload: data,
  }),

  addModuleFinish: () => ({
    type: actionTypes.ADD_MODULE_FINISH,
  }),

  addModuleReset: () => ({
    type: actionTypes.ADD_MODULE_RESET,
  }),

  //Update
  updateModule: (data: any, id: string) => ({
    type: actionTypes.UPDATE_MODULE_START,
    payload: {data, id},
  }),

  updateModuleSuccess: (data: IModuleState) => ({
    type: actionTypes.UPDATE_MODULE_SUCCESS,
    payload: data,
  }),

  updateModuleFinish: () => ({
    type: actionTypes.UPDATE_MODULE_FINISH,
  }),

  updateModuleReset: () => ({
    type: actionTypes.UPDATE_MODULE_RESET,
  }),

  getModule: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_MODULE_START,
    payload: {params},
  }),

  getModuleSuccess: (data: IModuleState) => ({
    type: actionTypes.GET_MODULE_SUCCESS,
    payload: data,
  }),

  getModuleFinish: () => ({
    type: actionTypes.GET_MODULE_FINISH,
  }),

  getAllModule: () => ({
    type: actionTypes.GET_ALL_MODULE_START,
  }),

  getAllModuleSuccess: (data: IModuleState) => ({
    type: actionTypes.GET_ALL_MODULE_SUCCESS,
    payload: data,
  }),

  getAllModuleFinish: () => ({
    type: actionTypes.GET_ALL_MODULE_FINISH,
  }),

  toggleNaviationStatusModule: (body: ToogleStatusType) => ({
    type: actionTypes.TOOGLE_NAVIGATION_STATUS_START,
    payload: body,
  }),

  toggleNaviationStatusModuleSuccess: (data: IModuleState) => ({
    type: actionTypes.TOOGLE_NAVIGATION_STATUS_SUCCESS,
    payload: data,
  }),

  toggleNaviationStatusModuleFinish: () => ({
    type: actionTypes.TOOGLE_NAVIGATION_STATUS_FINISH,
  }),

  toggleNaviationStatusModuleReset: () => ({
    type: actionTypes.TOOGLE_NAVIGATION_STATUS_RESET,
  }),

  toggleSocialIntStatusModule: (body: ToogleStatusType) => ({
    type: actionTypes.TOOGLE_SOCIAL_INT_STATUS_START,
    payload: body,
  }),

  toggleSocialIntStatusModuleSuccess: (data: IModuleState) => ({
    type: actionTypes.TOOGLE_SOCIAL_INT_STATUS_SUCCESS,
    payload: data,
  }),

  toggleSocialIntStatusModuleFinish: () => ({
    type: actionTypes.TOOGLE_SOCIAL_INT_STATUS_FINISH,
  }),

  toggleSocialIntStatusModuleReset: () => ({
    type: actionTypes.TOOGLE_SOCIAL_INT_STATUS_RESET,
  }),

  // enable status
  enableModuleStatus: (body: ModuleStatusType) => ({
    type: actionTypes.ENABLE_MODULE_STATUS_START,
    payload: body,
  }),

  enableModuleStatusSuccess: (data: IModuleState) => ({
    type: actionTypes.ENABLE_MODULE_STATUS_SUCCESS,
    payload: data,
  }),

  enableModuleStatusFinish: () => ({
    type: actionTypes.ENABLE_MODULE_STATUS_FINISH,
  }),

  enableModuleStatusReset: () => ({
    type: actionTypes.ENABLE_MODULE_STATUS_RESET,
  }),

  // disable status
  disableModuleStatus: (body: ModuleStatusType) => ({
    type: actionTypes.DISABLE_MODULE_STATUS_START,
    payload: body,
  }),

  disableModuleStatusSuccess: (data: IModuleState) => ({
    type: actionTypes.DISABLE_MODULE_STATUS_SUCCESS,
    payload: data,
  }),

  disableModuleStatusFinish: () => ({
    type: actionTypes.DISABLE_MODULE_STATUS_FINISH,
  }),

  disableModuleStatusReset: () => ({
    type: actionTypes.DISABLE_MODULE_STATUS_RESET,
  }),

  // sort
  sortModuleManager: (data: SortModuleManagerModel) => ({
    type: actionTypes.SORT_MODULE_MANAGER_START,
    payload: data,
  }),
  sortModuleManagerSuccess: (data: Array<IModuleModel>) => ({
    type: actionTypes.SORT_MODULE_MANAGER_SUCCESS,
    payload: data,
  }),
  sortModuleManagerFinish: () => ({
    type: actionTypes.SORT_MODULE_MANAGER_FINISH,
  }),
  sortModuleManagerReset: () => ({
    type: actionTypes.SORT_MODULE_MANAGER_RESET,
  }),
}
