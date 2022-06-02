import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteFormDownloadModel, SortFormDownloadModel} from '../Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const FORMS_DOWNLOAD_DATA = `${API_URL}/download`

export const service = {
  getFormsDownload: (params: ParamsModel) => {
    return axios.get(FORMS_DOWNLOAD_DATA, {params})
  },
  getAllFormsDownload: () => {
    return axios.get(`${FORMS_DOWNLOAD_DATA}/list`)
  },

  addFormsDownload: (data: any) => {
    return axios.post(FORMS_DOWNLOAD_DATA, data)
  },

  updateFormsDownload: (body: any, id: string) => {
    return axios.patch(`${FORMS_DOWNLOAD_DATA}/${id}`, body)
  },

  deleteFormsDownload: (data: DeleteFormDownloadModel) => {
    return axios.delete(FORMS_DOWNLOAD_DATA, {data})
  },

  enableFormsDownload: (data: Array<string>) => {
    const selectedFormDownload = {
      downloadId: data,
    }
    return axios.patch(`${FORMS_DOWNLOAD_DATA}/enable`, selectedFormDownload)
  },

  disableFormsDownload: (data: Array<string>) => {
    const selectedFormDownload = {
      downloadId: data,
    }
    return axios.patch(`${FORMS_DOWNLOAD_DATA}/disable`, selectedFormDownload)
  },

  singleEnableFormsDownload: (data: Array<string>) => {
    const selectedFormDownload = {
      downloadId: [data],
    }
    return axios.patch(`${FORMS_DOWNLOAD_DATA}/enable`, selectedFormDownload)
  },

  singleDisableFormsDownload: (data: Array<string>) => {
    const selectedFormDownload = {
      downloadId: [data],
    }
    return axios.patch(`${FORMS_DOWNLOAD_DATA}/disable`, selectedFormDownload)
  },

  sortFormsDownload: (body: SortFormDownloadModel) => {
    return axios.patch(`${FORMS_DOWNLOAD_DATA}/sort`, body)
  },
}
