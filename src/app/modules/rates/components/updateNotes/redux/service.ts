import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {UpdateNotesModel} from '../Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_UPDATE_NOTES = `${API_URL}/excerpt-category`
export const GET_UPDATE_NOTES_WITH_DATA = `${API_URL}/excerpt`
export const UPDATE_NOTES = `${API_URL}/excerpt`

export const service = {
  getUpdateNotes: () => {
    return axios.get(GET_UPDATE_NOTES)
  },

  getUpdateNotesWithData: (params: string) => {
    return axios.get(`${GET_UPDATE_NOTES_WITH_DATA}/${params}`)
  },

  addUpdateNotes: (data: any) => {
    return axios.patch(UPDATE_NOTES, data)
  },

  updateUpdateNotes: (body: UpdateNotesModel, id: string) => {
    return axios.patch(`${UPDATE_NOTES}/${id}`, body)
  },
}
