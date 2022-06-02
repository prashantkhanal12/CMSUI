import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteUserModel, UserModel} from '../Model'
import {actionTypes} from './constants'

export const actions = {
  addUsers: (data: {[key: string]: string | boolean}) => ({
    type: actionTypes.ADD_USER_REQUEST,
    payload: {data},
  }),

  deleteUsers: (data: DeleteUserModel[]) => ({
    type: actionTypes.DELETE_USER_REQUEST,
    payload: {userId: data},
  }),
  resetUsers: () => ({
    type: actionTypes.ADD_USER_RESET,
  }),

  getUsers: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_USER_REQUEST,
    payload: {params},
  }),

  activateUsers: (data: any) => ({type: actionTypes.ACTIVATE_USERS_REQUEST, payload: {data}}),

  singleActivateUser: (data: string) => ({
    type: actionTypes.SINGLE_ACTIVATE_USER_REQUEST,
    payload: data,
  }),

  singleDeactivateUser: (id: string) => ({
    type: actionTypes.SINGLE_DEACTIVATE_USER_REQUEST,
    payload: id,
  }),

  deactivateUsers: (data: any) => ({type: actionTypes.DEACTIVATE_USERS_REQUEST, payload: {data}}),

  // update Users
  updateUsers: (data: UserModel, id: string) => ({
    type: actionTypes.UPDATE_USER_START,
    payload: {data, id},
  }),
  updateUserReset: () => ({
    type: actionTypes.UPDATE_USER_RESET,
  }),
}
