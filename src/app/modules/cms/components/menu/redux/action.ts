import {ParamsModel} from 'src/app/modules/common/Model'
import {AllMenuModel, MenuOptionModal, SortMenuModel} from '../Model'
import {MenuModal} from '../Model/MenuModal'
import {actionTypes} from './constants'

export const actions = {
  //GET MENU ICON TYPE ACTIONS
  getMenuIconType: () => ({type: actionTypes.GET_MENU_ICON_TYPE_START}),

  getMenuIconSuccess: (data: MenuOptionModal) => ({
    type: actionTypes.GET_MENU_ICON_TYPE_SUCCESS,
    payload: data,
  }),
  getMenuIconError: () => ({
    type: actionTypes.GET_MENU_ICON_TYPE_FINISH,
  }),

  //GET MENU LINK TYPE ACTIONS
  getMenuLinkType: () => ({type: actionTypes.GET_MENU_LINK_TYPE_START}),

  getMenuLinkSuccess: (data: MenuOptionModal) => ({
    type: actionTypes.GET_MENU_LINK_TYPE_SUCCESS,
    payload: data,
  }),
  getMenuLinkError: () => ({
    type: actionTypes.GET_MENU_LINK_TYPE_FINISH,
  }),

  //GET MENU STATUS ACTIONS
  getMenuStatus: () => ({type: actionTypes.GET_MENU_STATUS_START}),

  getMenuStatusSuccess: (data: MenuOptionModal) => ({
    type: actionTypes.GET_MENU_STATUS_SUCCESS,
    payload: data,
  }),
  getMenuStatusError: () => ({
    type: actionTypes.GET_MENU_STATUS_FINISH,
  }),

  //GET MENU TYPE ACTIONS
  getMenuType: () => ({type: actionTypes.GET_MENU_TYPE_START}),

  getMenuTypeSuccess: (data: MenuOptionModal) => ({
    type: actionTypes.GET_MENU_TYPE_SUCCESS,
    payload: data,
  }),
  getMenuTypeError: () => ({
    type: actionTypes.GET_MENU_TYPE_FINISH,
  }),

  //GET MENU VISIBILITY STATUS ACTIONS
  getMenuVisibilityStatus: () => ({type: actionTypes.GET_MENU_VISIBILITY_STATUS_START}),

  getMenuVisibilityStatusSuccess: (data: MenuOptionModal) => ({
    type: actionTypes.GET_MENU_VISIBILITY_STATUS_SUCCESS,
    payload: data,
  }),
  getMenuVisibilityStatusError: () => ({
    type: actionTypes.GET_MENU_VISIBILITY_STATUS_FINISH,
  }),

  //GET MENU TYPE ACTIONS
  getTopMenu: () => ({type: actionTypes.GET_TOP_MENU_START}),

  getTopMenuSuccess: (data: MenuOptionModal) => ({
    type: actionTypes.GET_TOP_MENU_SUCCESS,
    payload: data,
  }),
  getTopMenuError: () => ({
    type: actionTypes.GET_TOP_MENU_FINISH,
  }),

  //GET MENU ACTIONS
  getMenu: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_MENU_START,
    payload: params,
  }),

  getMenuSuccess: (data: MenuOptionModal) => ({
    type: actionTypes.GET_MENU_SUCCESS,
    payload: data,
  }),
  getMenuError: () => ({
    type: actionTypes.GET_MENU_FINISH,
  }),

  //GET MENU ACTIONS
  getAllMenu: (params: AllMenuModel = {}) => ({
    type: actionTypes.GET_ALL_MENU_START,
    payload: params,
  }),

  getAllMenuSuccess: (data: MenuOptionModal) => ({
    type: actionTypes.GET_ALL_MENU_SUCCESS,
    payload: data,
  }),
  getAllMenuError: () => ({
    type: actionTypes.GET_ALL_MENU_FINISH,
  }),

  //ADD MENU ACTIONS
  addMenu: (data: MenuModal | any) => ({type: actionTypes.ADD_MENU_START, payload: data}),

  addMenuSuccess: (data: MenuOptionModal) => ({
    type: actionTypes.ADD_MENU_SUCCESS,
    payload: data,
  }),
  addMenuError: () => ({
    type: actionTypes.ADD_MENU_FINISH,
  }),

  resetMenu: () => ({type: actionTypes.ADD_MENU_RESET}),

  //UPDATE MENU ACTIONS
  updateMenu: (data: MenuModal | any, id: string) => ({
    type: actionTypes.UPDATE_MENU_START,
    payload: {data, id},
  }),

  updateMenuSuccess: (data: MenuOptionModal) => ({
    type: actionTypes.UPDATE_MENU_SUCCESS,
    payload: data,
  }),
  updateMenuError: () => ({
    type: actionTypes.UPDATE_MENU_FINISH,
  }),

  // delete MENU
  deleteMenu: (data: {id: string}[]) => ({
    type: actionTypes.DELETE_MENU_START,
    payload: {menu: data},
  }),
  deleteMenuSuccess: (data: any) => ({
    type: actionTypes.DELETE_MENU_SUCCESS,
    payload: data,
  }),
  deleteMenuFinish: () => ({
    type: actionTypes.DELETE_MENU_FINISH,
  }),

  //Enable Menu
  enableMenu: (data: any) => ({type: actionTypes.ENABLE_MENU_REQUEST, payload: {data}}),

  enableMenuSuccess: (task: any) => ({
    type: actionTypes.ENABLE_MENU_SUCCESS,
    payload: task,
  }),
  enableMenuFinish: () => ({
    type: actionTypes.ENABLE_MENU_FINISH,
  }),

  //Disable Menu
  disableMenu: (data: any) => ({type: actionTypes.DISABLE_MENU_REQUEST, payload: {data}}),

  disableMenuSuccess: (task: any) => ({
    type: actionTypes.DISABLE_MENU_SUCCESS,
    payload: task,
  }),
  disableMenuFinish: () => ({
    type: actionTypes.DISABLE_MENU_FINISH,
  }),

  //Enable Menu
  singleEnableMenu: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_MENU_REQUEST,
    payload: {data},
  }),

  singleEnableMenuSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_MENU_SUCCESS,
    payload: task,
  }),
  singleEnableMenuFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_MENU_FINISH,
  }),

  //Disable Menu
  singleDisableMenu: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_MENU_REQUEST,
    payload: {data},
  }),

  singleDisableMenuSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_MENU_SUCCESS,
    payload: task,
  }),
  singleDisableMenuFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_MENU_FINISH,
  }),

  // sort
  sortMenu: (data: SortMenuModel | any) => ({
    type: actionTypes.SORT_MENU_START,
    payload: data,
  }),
  sortMenuSuccess: (data: Array<MenuModal>) => ({
    type: actionTypes.SORT_MENU_SUCCESS,
    payload: data,
  }),
  sortMenuFinish: () => ({
    type: actionTypes.SORT_MENU_FINISH,
  }),
  sortMenuReset: () => ({
    type: actionTypes.SORT_MENU_RESET,
  }),
}
