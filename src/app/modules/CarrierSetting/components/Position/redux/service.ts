import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeletePositionModel, PositionModel, SortPositionModel} from '../Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_POSITION = `${API_URL}/position`

export const service = {
  getPosition: (params: ParamsModel) => {
    return axios.get(GET_POSITION, {params})
  },

  addPosition: (data: any) => {
    return axios.post(GET_POSITION, data)
  },

  updatePosition: (body: PositionModel, id: string) => {
    return axios.put(`${GET_POSITION}/${id}`, body)
  },

  deletePosition: (data: DeletePositionModel) => {
    return axios.delete(GET_POSITION, {data})
  },

  enablePosition: (data: Array<string>) => {
    const selectedPosition = {
      positionId: data,
    }
    return axios.patch(`${GET_POSITION}/enable`, selectedPosition)
  },

  disablePosition: (data: Array<string>) => {
    const selectedPosition = {
      positionId: data,
    }
    return axios.patch(`${GET_POSITION}/disable`, selectedPosition)
  },

  singleEnablePosition: (data: Array<string>) => {
    const selectedPosition = {
      positionId: [data],
    }
    return axios.patch(`${GET_POSITION}/enable`, selectedPosition)
  },

  singleDisablePosition: (data: Array<string>) => {
    const selectedPosition = {
      positionId: [data],
    }
    return axios.patch(`${GET_POSITION}/disable`, selectedPosition)
  },

  getAllPosition: () => {
    return axios.get(`${GET_POSITION}/list`)
  },
  sortPosition: (body: SortPositionModel) => {
    return axios.patch(`${GET_POSITION}/sort`, body)
  },
}
