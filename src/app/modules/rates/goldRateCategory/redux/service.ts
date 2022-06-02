import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_GOLD_RATE_CATEGORY = `${API_URL}/gold-rate-category`

export const service = {
  getGoldRateCategory: (params: ParamsModel) => {
    return axios.get(GET_GOLD_RATE_CATEGORY, {params})
  },
}
