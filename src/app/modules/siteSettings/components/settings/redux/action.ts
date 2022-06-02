import { SettingTypeModel, SettingFieldModel } from '../Model'
import { actionTypes } from './constants'
import { ISettingTypeState } from './reducer'
import { ParamsModel } from 'src/app/modules/common/Model'

export const actions = {
  // get setting type
  getSettingType: () => ({
    type: actionTypes.GET_SETTING_TYPE_START,
  }),
  getSettingTypeSuccess: (data: ISettingTypeState) => ({
    type: actionTypes.GET_SETTING_TYPE_SUCCESS,
    payload: data,
  }),
  getSettingTypeFinish: () => ({
    type: actionTypes.GET_SETTING_TYPE_FINISH,
  }),

  // SPECIFIC_SETTING_TYPE
  // update setting field
  getSpecifiSettingType: (id: string | undefined, settingTypeName: string) => ({
    type: actionTypes.GET_SPECIFIC_SETTING_TYPE_START,
    payload: { id, settingTypeName },
  }),
  getSpecifiSettingTypeSuccess: (data: any, backendData: {} = {}, settingType: string) => ({
    type: actionTypes.GET_SPECIFIC_SETTING_TYPE_SUCCESS,
    payload: { data, backendData, settingTypeName: settingType },
  }),
  getSpecifiSettingTypeFinish: () => ({
    type: actionTypes.GET_SPECIFIC_SETTING_TYPE_FINISH,
  }),
  // getSpecifiSettingTypeReset: () => ({
  //   type: actionTypes.GET_SPECIFIC_SETTING_TYPE_RESET,
  // }),

  // update setting field
  createSettingField: (data: SettingFieldModel, id: string | undefined) => ({
    type: actionTypes.CREATE_SETTING_FIELD_START,
    payload: { data, id },
  }),
  createSettingFieldSuccess: (task: any) => ({
    type: actionTypes.CREATE_SETTING_FIELD_SUCCESS,
    payload: task,
  }),
  createSettingFieldFinish: () => ({
    type: actionTypes.CREATE_SETTING_FIELD_FINISH,
  }),
  createSettingFieldReset: () => ({
    type: actionTypes.CREATE_SETTING_FIELD_RESET,
  }),
  // update setting field
  updateSettingField: (data: SettingFieldModel, id: string | undefined) => ({
    type: actionTypes.UPDATE_SETTING_FIELD_START,
    payload: { data, id },
  }),
  updateSettingFieldSuccess: (task: any) => ({
    type: actionTypes.UPDATE_SETTING_FIELD_SUCCESS,
    payload: task,
  }),
  updateSettingFieldFinish: () => ({
    type: actionTypes.UPDATE_SETTING_FIELD_FINISH,
  }),
  updateSettingFieldReset: () => ({
    type: actionTypes.UPDATE_SETTING_FIELD_RESET,
  }),
}
