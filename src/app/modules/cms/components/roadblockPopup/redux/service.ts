import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteRoadBlockPopupModel, RoadBlockPopupModel, SortRoadBlockModel} from '../Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_ROAD_BLOCK_POPUP = `${API_URL}/road-block-popup`
export const ADD_ROAD_BLOCK_POPUP = `${API_URL}/road-block-popup`
export const ACTIVATE_ROAD_BLOCK_POPUP = `${API_URL}/road-block-popup/bulk-active`
export const DEACTIVATE_ROAD_BLOCK_POPUP = `${API_URL}/road-block-popup/bulk-inactive`
export const DELETE_ROAD_BLOCK_POPUP = `${API_URL}/road-block-popup/bulk-delete`

export const service = {
  getRoadBlockPopup: (params: ParamsModel) => {
    return axios.get(GET_ROAD_BLOCK_POPUP, {params})
  },

  addRoadBlockPopup: (data: any) => {
    return axios.post(ADD_ROAD_BLOCK_POPUP, data)
  },

  activateRoadBlockPopup: (data: Array<string>) => {
    const formData = {
      popup: data,
    }
    return axios.put(ACTIVATE_ROAD_BLOCK_POPUP, formData)
  },

  singleActivateRoadBlockPopup: (data: Array<string>) => {
    const formData = {
      popup: [data],
    }
    return axios.put(ACTIVATE_ROAD_BLOCK_POPUP, formData)
  },
  singleDeactivateRoadBlockPopup: (data: Array<string>) => {
    const formData = {
      popup: [data],
    }
    return axios.put(DEACTIVATE_ROAD_BLOCK_POPUP, formData)
  },

  deactivateRoadBlockPopup: (data: Array<string>) => {
    const formData = {
      popup: data,
    }
    return axios.put(DEACTIVATE_ROAD_BLOCK_POPUP, formData)
  },

  updateRoadBlockPopup: (body: RoadBlockPopupModel, id: string) => {
    return axios.put(`${ADD_ROAD_BLOCK_POPUP}/${id}`, body)
  },

  deleteRoadBlockPopup: (data: DeleteRoadBlockPopupModel) => {
    return axios.delete(DELETE_ROAD_BLOCK_POPUP, {data})
  },

  getAllRoadBlock: () => {
    return axios.get(`${GET_ROAD_BLOCK_POPUP}/list`)
  },
  sortRoadBlock: (body: SortRoadBlockModel) => {
    return axios.put(`${GET_ROAD_BLOCK_POPUP}/sort`, body)
  },
}
