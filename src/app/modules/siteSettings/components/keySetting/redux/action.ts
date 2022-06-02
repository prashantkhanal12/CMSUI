import {DeleteKeyModel, KeyModel} from '../Model'
import {actionTypes} from './constants'
import {IKeyState} from './reducer'
import {ParamsModel} from 'src/app/modules/common/Model'
export const actions = {
  // get key
  getKey: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_KEY_SETTING_START,
    payload: {params},
  }),
  getKeySuccess: (data: IKeyState) => ({
    type: actionTypes.GET_KEY_SETTING_SUCCESS,
    payload: data,
  }),
  getKeyFinish: () => ({
    type: actionTypes.GET_KEY_SETTING_FINISH,
  }),

  // create key
  createKey: (data: KeyModel) => ({
    type: actionTypes.CREATE_KEY_START,
    payload: data,
  }),
  createKeySuccess: (task: any) => ({
    type: actionTypes.CREATE_KEY_SUCCESS,
    payload: task,
  }),
  createKeyFinish: () => ({
    type: actionTypes.CREATE_KEY_FINISH,
  }),
  createKeyReset: () => ({
    type: actionTypes.CREATE_KEY_RESET,
  }),

  // update key
  updateKey: (data: KeyModel, id: string) => ({
    type: actionTypes.UPDATE_KEY_START,
    payload: {data, id},
  }),
  updateKeySuccess: (task: any) => ({
    type: actionTypes.UPDATE_KEY_SUCCESS,
    payload: task,
  }),
  updateKeyFinish: () => ({
    type: actionTypes.UPDATE_KEY_FINISH,
  }),
  updateKeyReset: () => ({
    type: actionTypes.UPDATE_KEY_RESET,
  }),

  // UPDATE key
  deleteKey: (data: DeleteKeyModel[]) => ({
    type: actionTypes.DELETE_KEY_START,
    payload: {keySettingId: data},
  }),
  deleteKeySuccess: (data: any) => ({
    type: actionTypes.DELETE_KEY_SUCCESS,
    payload: data,
  }),
  deleteKeyFinish: () => ({
    type: actionTypes.DELETE_KEY_FINISH,
  }),
}
