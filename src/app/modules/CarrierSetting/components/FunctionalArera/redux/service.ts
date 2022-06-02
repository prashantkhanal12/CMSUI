import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteFunctionalAreaModel, FunctionalAreaModel, SortFunctionalAreaModel} from '../Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_FUNCTIONALAREA = `${API_URL}/functionalarea`

export const service = {
  getFunctionalArea: (params: ParamsModel) => {
    return axios.get(GET_FUNCTIONALAREA, {params})
  },

  addFunctionalArea: (data: any) => {
    return axios.post(GET_FUNCTIONALAREA, data)
  },

  updateFunctionalArea: (body: FunctionalAreaModel, id: string) => {
    return axios.put(`${GET_FUNCTIONALAREA}/${id}`, body)
  },

  deleteFunctionalArea: (data: DeleteFunctionalAreaModel) => {
    return axios.delete(GET_FUNCTIONALAREA, {data})
  },

  enableFunctionalArea: (data: Array<string>) => {
    const selectedFunctionalArera = {
      functionalAreaId: data,
    }
    return axios.patch(`${GET_FUNCTIONALAREA}/enable`, selectedFunctionalArera)
  },

  disableFunctionalArea: (data: Array<string>) => {
    const selectedFunctionalArera = {
      functionalAreaId: data,
    }
    return axios.patch(`${GET_FUNCTIONALAREA}/disable`, selectedFunctionalArera)
  },

  singleEnableFunctionalArea: (data: Array<string>) => {
    const selectedFunctionalArera = {
      functionalAreaId: [data],
    }
    return axios.patch(`${GET_FUNCTIONALAREA}/enable`, selectedFunctionalArera)
  },

  singleDisableFunctionalArea: (data: Array<string>) => {
    const selectedFunctionalArera = {
      functionalAreaId: [data],
    }
    return axios.patch(`${GET_FUNCTIONALAREA}/disable`, selectedFunctionalArera)
  },

  getAllFunctionalArea: () => {
    return axios.get(`${GET_FUNCTIONALAREA}`)
  },
  sortFunctionalArea: (body: SortFunctionalAreaModel) => {
    return axios.patch(`${GET_FUNCTIONALAREA}/sort`, body)
  },
}
