import {ParamsModel} from 'src/app/modules/common/Model'
import {PasswordModel} from '../ProfileModels'
import {actionTypes} from './constants'

export const actions = {
  // update Users
  updatePassword: (data: PasswordModel, param: string = '') => ({
    type: actionTypes.UPDATE_PASSWORD_START,
    payload: {data, param},
  }),
  updatePasswordSuccess: (password: any) => ({
    type: actionTypes.UPDATE_PASSWORD_SUCCESS,
    payload: password,
  }),
  updatePasswordFinish: () => ({
    type: actionTypes.UPDATE_PASSWORD_FINISH,
  }),
  updatePasswordReset: () => ({
    type: actionTypes.UPDATE_PASSWORD_RESET,
  }),
}
