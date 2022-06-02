import { DeleteKeyModel, KeyModel } from '../Model'
import { actionTypes } from './constants'
import { IGroupSettingState } from './reducer'
import { ParamsModel } from 'src/app/modules/common/Model'
export const actions = {
  // get group
  getKey: (params: ParamsModel = { page: 1, limit: 10 }) => ({
    type: actionTypes.GET_GROUP_SETTING_START,
    payload: { params },
  }),
  getKeySuccess: (data: IGroupSettingState) => ({
    type: actionTypes.GET_GROUP_SETTING_SUCCESS,
    payload: data,
  }),
  getKeyFinish: () => ({
    type: actionTypes.GET_GROUP_SETTING_FINISH,
  }),

  getSettingGroupList: () => ({
    type: actionTypes.GET_SETTING_GROUP_LIST_START,
  }),
  getSettingGroupListSuccess: (data: { settingGroup: Array<{ id: string, name: string }> }) => ({
    type: actionTypes.GET_SETTING_GROUP_LIST_SUCCESS,
    payload: data,
  }),
  getSettingGroupListFinish: () => ({
    type: actionTypes.GET_SETTING_GROUP_LIST_FINISH,
  }),

  // create group
  createKey: (data: KeyModel) => ({
    type: actionTypes.CREATE_GROUP_START,
    payload: data,
  }),
  createKeySuccess: (task: any) => ({
    type: actionTypes.CREATE_GROUP_SUCCESS,
    payload: task,
  }),
  createKeyFinish: () => ({
    type: actionTypes.CREATE_GROUP_FINISH,
  }),
  createKeyReset: () => ({
    type: actionTypes.CREATE_GROUP_RESET,
  }),

  // update group
  updateKey: (data: KeyModel, id: string) => ({
    type: actionTypes.UPDATE_GROUP_START,
    payload: { data, id },
  }),
  updateKeySuccess: (task: any) => ({
    type: actionTypes.UPDATE_GROUP_SUCCESS,
    payload: task,
  }),
  updateKeyFinish: () => ({
    type: actionTypes.UPDATE_GROUP_FINISH,
  }),
  updateKeyReset: () => ({
    type: actionTypes.UPDATE_GROUP_RESET,
  }),

  // UPDATE group
  deleteKey: (data: DeleteKeyModel[]) => ({
    type: actionTypes.DELETE_GROUP_START,
    payload: { groupSettingId: data },
  }),
  deleteKeySuccess: (data: any) => ({
    type: actionTypes.DELETE_GROUP_SUCCESS,
    payload: data,
  }),
  deleteKeyFinish: () => ({
    type: actionTypes.DELETE_GROUP_FINISH,
  }),
}
