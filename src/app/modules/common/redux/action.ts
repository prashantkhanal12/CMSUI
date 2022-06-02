import {ParamsModel} from '../Model'
import {actionTypes} from './constant'
import {IUserRolePermissionState} from './reducer'

export const action = {
  getPermissions: () => ({
    type: actionTypes.GET_USER_ROLE_PERMISSION_REQUEST,
  }),

  getPermissionSuccess: (data: {[key: string]: string}) => ({
    type: actionTypes.GET_USER__ROLE_PERMISSION_SUCCESS,
    payload: data,
  }),
  getPermissionFinish: () => ({
    type: actionTypes.GET_USER_ROLE_PERMISSION_FINISH,
  }),

  //DISTRICT ACTION
  getDistrict: (id: string = '') => ({
    type: actionTypes.GET_DISTRICT_REQUEST,
    payload: id,
  }),

  getDistrictSuccess: (data: {[key: string]: string}) => ({
    type: actionTypes.GET_DISTRICT_SUCCESS,
    payload: data,
  }),
  getDistrictFinish: () => ({
    type: actionTypes.GET_DISTRICT_FINISH,
  }),

  //PROVINCE ACTION
  getProvince: () => ({
    type: actionTypes.GET_PROVINCE_REQUEST,
  }),

  getProvinceSuccess: (data: {[key: string]: string}) => ({
    type: actionTypes.GET_PROVINCE_SUCCESS,
    payload: data,
  }),
  getProvinceFinish: () => ({
    type: actionTypes.GET_PROVINCE_FINISH,
  }),

  //CATEGORY_TYPE ACTION
  getCategoryType: () => ({
    type: actionTypes.GET_CATEGORY_TYPE_REQUEST,
  }),

  getCategoryTypeSuccess: (data: {[key: string]: string}) => ({
    type: actionTypes.GET_CATEGORY_TYPE_SUCCESS,
    payload: data,
  }),
  getCategoryTypeFinish: () => ({
    type: actionTypes.GET_CATEGORY_TYPE_FINISH,
  }),

  //MEDIA TYPE ACTION
  getMediaType: () => ({
    type: actionTypes.GET_MEDIA_TYPE_REQUEST,
  }),

  getMediaTypeSuccess: (data: {[key: string]: string}) => ({
    type: actionTypes.GET_MEDIA_TYPE_SUCCESS,
    payload: data,
  }),
  getMediaTypeFinish: () => ({
    type: actionTypes.GET_MEDIA_TYPE_FINISH,
  }),
}
