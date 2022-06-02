import axios from 'axios'
import {SettingTypeModel} from '../Model'
import {ParamsModel} from 'src/app/modules/common/Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_KEY = `${API_URL}/setting-type`
export const POST_KEY = `${API_URL}/setting-type`

export const service = {
  getSettingType: (params: ParamsModel) => {
    return axios.get(GET_KEY, {params})
  },
}
