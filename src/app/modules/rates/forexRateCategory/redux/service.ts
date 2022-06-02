import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_FOREX_RATE_CATEGORY = `${API_URL}/forex-rate-category`

export const service = {
  getForexRateCategory: (params: ParamsModel) => {
    return axios.get(GET_FOREX_RATE_CATEGORY, {params})
  },
}
