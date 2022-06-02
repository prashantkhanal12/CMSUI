import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteRoleModel, RoleModel} from '../Model'
import {actionTypes} from './constants'

export const actions = {
  // create role
  createRole: (data: RoleModel) => ({
    type: actionTypes.ADD_ROLE_REQUEST,
    payload: data,
  }),
  createRoleSuccess: (data: any) => ({
    type: actionTypes.ADD_ROLE_SUCCESS,
    payload: data,
  }),
  createRoleFinish: (errorMsg?: any) => ({
    type: actionTypes.ADD_ROLE_FINISH,
    payload: errorMsg,
  }),
  createRoleReset: () => ({
    type: actionTypes.ADD_ROLE_RESET,
  }),

  // update role
  upateRole: (data: RoleModel, id: string) => ({
    type: actionTypes.UPDATE_ROLE_REQUEST,
    payload: {data, id},
  }),
  updateRoleSuccess: (data: any) => ({
    type: actionTypes.UPDATE_ROLE_SUCCESS,
    payload: data,
  }),
  updateRoleFinish: (errorMsg?: any) => ({
    type: actionTypes.UPDATE_ROLE_FINISH,
    payload: errorMsg,
  }),
  updateRoleReset: () => ({
    type: actionTypes.UPDATE_ROLE_RESET,
  }),

  // GET role
  getRole: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_ROLE_REQUEST,
    payload: params,
  }),
  getRoleSuccess: (data: any) => ({
    type: actionTypes.GET_ROLE_SUCCESS,
    payload: data,
  }),
  getRoleFinish: (errorMsg?: any) => ({
    type: actionTypes.GET_ROLE_FINISH,
    payload: errorMsg,
  }),

  // DELETE role
  deleteRole: (data: DeleteRoleModel[]) => ({
    type: actionTypes.DELETE_ROLE_REQUEST,
    payload: {roleId: data},
  }),
  deleteRoleSuccess: (data: any) => ({
    type: actionTypes.DELETE_ROLE_SUCCESS,
    payload: data,
  }),
  deleteRoleFinish: (errorMsg?: any) => ({
    type: actionTypes.DELETE_ROLE_FINISH,
    payload: errorMsg,
  }),
}
