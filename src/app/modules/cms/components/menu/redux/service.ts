import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {SortMenuModel} from '../Model'
import {MenuModal} from '../Model/MenuModal'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_MENU_ICON_TYPE = `${API_URL}/menu-icon-type`
export const GET_MENU_LINK_TYPE = `${API_URL}/menu-link-type`
export const GET_MENU_STATUS = `${API_URL}/menu-status`
export const GET_MENU_TYPE = `${API_URL}/menu-type`
export const GET_MENU_VISIBILITY_STATUS = `${API_URL}/menu-visibility-status`
export const GET_TOP_MENU = `${API_URL}/top-menu`
export const MENU_API = `${API_URL}/menu`

export const service = {
  //GET MENU ICON TYPE SERVICE
  getMenuIcon: () => {
    return axios.get(GET_MENU_ICON_TYPE)
  },
  //GET MENU LINK TYPE SERVICE
  getMenuLink: () => {
    return axios.get(GET_MENU_LINK_TYPE)
  },
  //GET MENU STATUS SERVICE
  getMenuStatus: () => {
    return axios.get(GET_MENU_STATUS)
  },
  //GET MENU TYPE SERVICE
  getMenuType: () => {
    return axios.get(GET_MENU_TYPE)
  },
  //GET MENU VISIBILITY STATUS SERVICE
  getMenuVisibilityStatus: () => {
    return axios.get(GET_MENU_VISIBILITY_STATUS)
  },
  //GET TOP MENU SERVICE
  getTopMenu: () => {
    return axios.get(GET_TOP_MENU)
  },
  //GET TOP MENU SERVICE
  getMenu: (params: ParamsModel) => {
    return axios.get(MENU_API, {params})
  },

  getAllMenu: (params: ParamsModel) => {
    return axios.get(`${MENU_API}/list`, {params})
  },
  //ADD MENU SERVICE
  addMenu: (data: MenuModal) => {
    return axios.post(MENU_API, data)
  },

  updateMenu: (data: MenuModal, id: string) => {
    return axios.put(`${MENU_API}/${id}`, data)
  },

  deleteMenu: (data: {id: string}) => {
    return axios.delete(`${API_URL}/bulk-delete-menu`, {data})
  },

  enableMenu: (data: Array<string>) => {
    const selectedMenu = {
      menu: data,
    }
    return axios.put(`${API_URL}/bulk-update-menu-status-active`, selectedMenu)
  },

  disableMenu: (data: Array<string>) => {
    const selectedMenu = {
      menu: data,
    }
    return axios.put(`${API_URL}/bulk-update-menu-status-inactive`, selectedMenu)
  },

  singleEnableMenu: (data: Array<string>) => {
    const selectedMenu = {
      menu: [data],
    }
    return axios.put(`${API_URL}/bulk-update-menu-status-active`, selectedMenu)
  },

  singleDisableMenu: (data: Array<string>) => {
    const selectedMenu = {
      menu: [data],
    }
    return axios.put(`${API_URL}/bulk-update-menu-status-inactive`, selectedMenu)
  },

  sortMenu: (body: SortMenuModel) => {
    return axios.patch(`${MENU_API}/sort`, body)
  },
}
