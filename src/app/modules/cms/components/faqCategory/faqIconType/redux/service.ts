import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_FAQ_ICON_TYPE = `${API_URL}/faq-icon-type`

export const service = {
  getFaqIconType: (params: ParamsModel) => {
    return axios.get(GET_FAQ_ICON_TYPE, {params})
  },
}
