import axios from 'axios'
import { DeleteFolderType, MediaParams, MoveCopyBodyType } from '../Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_MEDIA_LIST = `${API_URL}/media-manager`
export const GET_MEDIA_HIERARCHY = `${API_URL}/media-manager/hierarchy`
export const ADD_FOLDER = `${API_URL}/media-manager/storeFolder`
export const ADD_FILES = `${API_URL}/media-manager/storeFile`
export const DELETE_FOLDER_FILES = `${API_URL}/media-manager`

export const service = {
  getMediaList: (params: MediaParams) => {
    return axios.get(GET_MEDIA_LIST, { params })
  },

  getMediaHierarchy: () => {
    return axios.get(GET_MEDIA_HIERARCHY)
  },

  addNewFolder: (body: MediaParams) => {
    return axios.post(ADD_FOLDER, body)
  },

  addFiles: (body: FormData, options: any) => {
    return axios.post(`${ADD_FILES}`, body, options)
  },

  renameFileFolder: (body: MoveCopyBodyType) => {
    return axios.patch(GET_MEDIA_LIST, body)
  },

  deleteFolderFiles: (data: DeleteFolderType) => {
    return axios.delete(DELETE_FOLDER_FILES, { data })
  },
}