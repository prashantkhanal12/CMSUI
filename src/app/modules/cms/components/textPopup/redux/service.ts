import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteTextPopupModel, SortTextPopupModel, TextPopupModel} from '../Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_TEXT_POPUP = `${API_URL}/text-popup`
export const ADD_TEXT_POPUP = `${API_URL}/text-popup`
export const ACTIVATE_TEXT_POPUP = `${API_URL}/text-popup/bulk-active`
export const DEACTIVATE_TEXT_POPUP = `${API_URL}/text-popup/bulk-inactive`
export const DELETE_TEXT_POPUP = `${API_URL}/text-popup/bulk-delete`

export const service = {
  getTextPopup: (params: ParamsModel) => {
    return axios.get(GET_TEXT_POPUP, {params})
  },

  addTextPopup: (data: any) => {
    return axios.post(ADD_TEXT_POPUP, data)
  },

  activateTextPopup: (data: Array<string>) => {
    const formData = {
      popup: data,
    }
    return axios.put(ACTIVATE_TEXT_POPUP, formData)
  },

  singleActivateTextPopup: (data: Array<string>) => {
    const formData = {
      popup: [data],
    }
    return axios.put(ACTIVATE_TEXT_POPUP, formData)
  },
  singleDeactivateTextPopup: (data: Array<string>) => {
    const formData = {
      popup: [data],
    }
    return axios.put(DEACTIVATE_TEXT_POPUP, formData)
  },

  deactivateTextPopup: (data: Array<string>) => {
    const formData = {
      popup: data,
    }
    return axios.put(DEACTIVATE_TEXT_POPUP, formData)
  },

  updateTextPopup: (body: TextPopupModel, id: string) => {
    return axios.put(`${ADD_TEXT_POPUP}/${id}`, body)
  },

  deleteTextPopup: (data: DeleteTextPopupModel) => {
    return axios.delete(DELETE_TEXT_POPUP, {data})
  },

  sortTextPopup: (body: SortTextPopupModel) => {
    return axios.put(`${GET_TEXT_POPUP}/sort`, body)
  },
}
