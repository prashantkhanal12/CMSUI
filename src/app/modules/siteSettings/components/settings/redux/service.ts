import axios from 'axios'
import {SettingTypeModel, SettingFieldModel} from '../Model'
import {ParamsModel} from 'src/app/modules/common/Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_KEY = `${API_URL}/setting-type`

export const SETTING_TYPE_KEY = `${API_URL}/setting/type`

export const service = {
  getSettingType: () => {
    return axios.get(GET_KEY)
  },
  // Returns list of selected setting type settings
  getSpecificSettingType: (id: string) => {
    return axios.get(`${SETTING_TYPE_KEY}/${id}`)
  },
  // create setting by type
  createSettingType: (body: {data: SettingFieldModel[]}, id: string) => {
    return axios.post(`${SETTING_TYPE_KEY}/${id}`, body)
  },
  // Update setting by type
  updateSettingType: (body: {data: SettingFieldModel[]}) => {
    return axios.patch(`${SETTING_TYPE_KEY}`, body)
  },
}
