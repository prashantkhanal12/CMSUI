import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {BannerModel, SortBannerModel} from '../Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_BANNER = `${API_URL}/banner`
export const ADD_BANNER = `${API_URL}/banner`
export const ACTIVATE_BANNERS = `${API_URL}/banner/enable`
export const DEACTIVATE_BANNERS = `${API_URL}/banner/disable`
export const DELETE_BANNER = `${API_URL}/banner`

export const service = {
  getBanner: (params: ParamsModel) => {
    return axios.get(GET_BANNER, {params})
  },
  getAllBanner: () => {
    return axios.get(`${GET_BANNER}/list`)
  },

  addBanner: (data: any) => {
    return axios.post(ADD_BANNER, data)
  },

  activateBanner: (data: Array<string>) => {
    const formData = {
      bannerId: data,
    }
    return axios.patch(ACTIVATE_BANNERS, formData)
  },

  singleActivateBanner: (data: Array<string>) => {
    const formData = {
      bannerId: [data],
    }
    return axios.patch(ACTIVATE_BANNERS, formData)
  },
  singleDeactivateBanner: (data: Array<string>) => {
    const formData = {
      bannerId: [data],
    }
    return axios.patch(DEACTIVATE_BANNERS, formData)
  },

  deactivateBanner: (data: Array<string>) => {
    const formData = {
      bannerId: data,
    }
    return axios.patch(DEACTIVATE_BANNERS, formData)
  },

  updateBanner: (body: BannerModel, id: string) => {
    return axios.patch(`${ADD_BANNER}/${id}`, body)
  },

  deleteBanner: (data: BannerModel) => {
    return axios.delete(DELETE_BANNER, {data})
  },
  sortBanner: (body: SortBannerModel) => {
    return axios.patch(`${GET_BANNER}/sort`, body)
  },
}
