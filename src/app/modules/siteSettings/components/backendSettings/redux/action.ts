import { actionTypes } from './constants'
import { ISettingTypeState } from './reducer'
import { ParamsModel } from 'src/app/modules/common/Model'

export const actions = {
  // get setting type
  getSettingType: (params: ParamsModel = { page: 1, limit: 10 }) => ({
    type: actionTypes.GET_BACKEND_SETTING_START,
    payload: { params },
  }),
  getSettingTypeSuccess: (data: ISettingTypeState) => ({
    type: actionTypes.GET_BACKEND_SETTING_SUCCESS,
    payload: data,
  }),
  getSettingTypeFinish: () => ({
    type: actionTypes.GET_BACKEND_SETTING_FINISH,

  }),
}
