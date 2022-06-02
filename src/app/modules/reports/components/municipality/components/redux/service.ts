import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_MUNICIPALITY = `${API_URL}/municipality`

export const service = {
  getMunicipality: (params: ParamsModel) => {
    return axios.get(GET_MUNICIPALITY, {params})
  },
}
