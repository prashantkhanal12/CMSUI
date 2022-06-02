import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteGalleryModel, GalleryModel, SortGalleryModel} from '../Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_GALLERY = `${API_URL}/gallery`

export const service = {
  getGallery: (params: ParamsModel) => {
    return axios.get(GET_GALLERY, {params})
  },

  addGallery: (data: any) => {
    return axios.post(GET_GALLERY, data)
  },

  updateGallery: (body: GalleryModel, id: string) => {
    return axios.put(`${GET_GALLERY}/${id}`, body)
  },

  deleteGallery: (data: DeleteGalleryModel) => {
    return axios.delete(GET_GALLERY, {data})
  },

  enableGallery: (data: Array<string>) => {
    const selectedGallery = {
      albumId: data,
    }
    return axios.patch(`${GET_GALLERY}/enable`, selectedGallery)
  },

  disableGallery: (data: Array<string>) => {
    const selectedGallery = {
      albumId: data,
    }
    return axios.patch(`${GET_GALLERY}/disable`, selectedGallery)
  },

  singleEnableGallery: (data: Array<string>) => {
    const selectedGallery = {
      albumId: [data],
    }
    return axios.patch(`${GET_GALLERY}/enable`, selectedGallery)
  },

  singleDisableGallery: (data: Array<string>) => {
    const selectedGallery = {
      albumId: [data],
    }
    return axios.patch(`${GET_GALLERY}/disable`, selectedGallery)
  },

  getAllGallery: () => {
    return axios.get(`${GET_GALLERY}/list`)
  },
  sortGallery: (body: SortGalleryModel) => {
    return axios.patch(`${GET_GALLERY}/sort`, body)
  },
}
