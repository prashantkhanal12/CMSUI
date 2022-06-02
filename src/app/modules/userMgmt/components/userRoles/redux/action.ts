import {ParamsModel} from 'src/app/modules/common/Model'
import {RoleModel, userRoleFormModel} from '../../../Model'
import {actionTypes} from './constants'
import {IUserRoleState} from './reducer'

export const actions = {
  // get userRole
  getUserRole: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_USER_ROLE_REQUEST,
    payload: {params},
  }),

  getUserRoleSuccess: (data: IUserRoleState) => ({
    type: actionTypes.GET_USER__ROLE_SUCCESS,
    payload: data,
  }),
  getUserRoleFinish: () => ({
    type: actionTypes.GET_USER_ROLE_FINISH,
  }),

  // create userRole
  CreateUserRole: (data: RoleModel) => ({
    type: actionTypes.ADD_USER_ROLE_REQUEST,
    payload: data,
  }),

  createUserRoleSuccess: (task: any) => ({
    type: actionTypes.ADD_USER_ROLE_SUCCESS,
    payload: task,
  }),
  createUserRoleFinish: (errorMsg?: any) => ({
    type: actionTypes.ADD_USER_ROLE_FINISH,
    payload: errorMsg,
  }),
  createUserRoleReset: () => ({
    type: actionTypes.ADD_USER_ROLE_RESET,
  }),

  // update UserRole
  updateUserRole: (data: {roles: userRoleFormModel[]}, id: string) => ({
    type: actionTypes.UPDATE_USER_ROLE_START,
    payload: {data, id},
  }),
  updateUserRoleSuccess: (task: any) => ({
    type: actionTypes.UPDATE_USER_ROLE_SUCCESS,
    payload: task,
  }),
  updateUserRoleFinish: () => ({
    type: actionTypes.UPDATE_USER_ROLE_FINISH,
  }),
  updateUserRoleReset: () => ({
    type: actionTypes.UPDATE_USER_ROLE_RESET,
  }),
}
