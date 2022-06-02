import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {IModuleModel, ModuleStatusType, SortModuleManagerModel, ToogleStatusType} from '../Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_SOCIAL_INTEGRATION = `${API_URL}/module-social-integration`
export const GET_NAV_VISIBILITY = `${API_URL}/module-navigation-visibility-status`
export const ADD_MODULE = `${API_URL}/module`
export const UPDATE_MODULE = `${API_URL}/module`
export const GET_MODULE = `${API_URL}/module`
export const GET_ALL_MODULE = `${API_URL}/module/list`
export const TOGGLE_NAVIGATION_STATUS = `${API_URL}/module/set-navigation-status`
export const TOGGLE_SOCIAL_INT_STATUS = `${API_URL}/module/set-social-integration-status`
export const ENABLE_MODULE_STATUS = `${API_URL}/module/enable`
export const DISABLE_MODULE_STATUS = `${API_URL}/module/disable`

export const service = {
  getSocialIntegration: () => {
    return axios.get(GET_SOCIAL_INTEGRATION)
  },

  getNavVisibility: () => {
    return axios.get(GET_NAV_VISIBILITY)
  },

  addModule: (body: {[key: string]: string}) => {
    return axios.post(ADD_MODULE, body)
  },

  updateModule: (body: IModuleModel, id: string) => {
    return axios.patch(`${UPDATE_MODULE}/${id}`, body)
  },

  getModule: (params: ParamsModel) => {
    return axios.get(GET_MODULE, {params})
  },

  getAllModule: () => {
    return axios.get(GET_ALL_MODULE)
  },

  toggleNaviagationStatus: (body: ToogleStatusType) => {
    return axios.patch(TOGGLE_NAVIGATION_STATUS, body)
  },

  toggleSocialIntStatus: (body: ToogleStatusType) => {
    return axios.patch(TOGGLE_SOCIAL_INT_STATUS, body)
  },

  enableModuleStatus: (body: ModuleStatusType) => {
    return axios.patch(ENABLE_MODULE_STATUS, body)
  },

  disableModuleStatus: (body: ModuleStatusType) => {
    return axios.patch(DISABLE_MODULE_STATUS, body)
  },
  sortModuleManager: (body: SortModuleManagerModel) => {
    return axios.patch(`${API_URL}/sort-module`, body)
  },
}
