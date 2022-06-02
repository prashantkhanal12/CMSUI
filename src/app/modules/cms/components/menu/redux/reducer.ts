import {Action} from 'redux'
import {MenuOptionModal} from '../Model'
import {MenuModal} from '../Model/MenuModal'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialMenuState: IMenuState = {
  visibilityOption: [],
  menuIconType: [],
  menuLinkType: [],
  menuStatus: [],
  menuType: [],
  topMenu: [],
  data: {
    menu: [],
    meta: [],
  },
  menuList: [],
  sortMenuData: [],
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IMenuState {
  visibilityOption?: MenuOptionModal[]
  menuIconType?: MenuOptionModal[]
  menuLinkType?: MenuOptionModal[]
  menuStatus?: MenuOptionModal[]
  menuType?: MenuOptionModal[]
  topMenu?: MenuOptionModal[]
  data?: {
    menu?: MenuModal[] | any
    meta?: {[key: string]: string | number}[]
  }
  menuList?: MenuModal[] | any
  sortMenuData?: IMenuState[]
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IMenuState = initialMenuState,
  action: ActionWithPayload<IMenuState>
) => {
  switch (action.type) {
    //GET MENU ICON TYPE REDUCER
    case actionTypes.GET_MENU_ICON_TYPE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_MENU_ICON_TYPE_SUCCESS: {
      return {
        ...state,
        menuIconType: action.payload?.menuIconType,
        loading: false,
      }
    }

    case actionTypes.GET_MENU_ICON_TYPE_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    //GET MENU LINK TYPE REDUCER
    case actionTypes.GET_MENU_LINK_TYPE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_MENU_LINK_TYPE_SUCCESS: {
      return {
        ...state,
        menuLinkType: action.payload?.menuLinkType,
        loading: false,
      }
    }

    case actionTypes.GET_MENU_LINK_TYPE_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    //GET MENU STATUS REDUCER
    case actionTypes.GET_MENU_STATUS_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_MENU_STATUS_SUCCESS: {
      return {
        ...state,
        menuStatus: action.payload?.menuStatus,
        loading: false,
      }
    }

    case actionTypes.GET_MENU_STATUS_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    //GET MENU TYPE REDUCER
    case actionTypes.GET_MENU_TYPE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_MENU_TYPE_SUCCESS: {
      return {
        ...state,
        menuType: action.payload?.menuType,
        loading: false,
      }
    }

    case actionTypes.GET_MENU_TYPE_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    //GET TOP MENU REDUCER
    case actionTypes.GET_TOP_MENU_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_TOP_MENU_SUCCESS: {
      return {
        ...state,
        topMenu: action.payload?.topMenu,
        loading: false,
      }
    }

    case actionTypes.GET_TOP_MENU_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    //GET VISIBILITY STATUS REDUCER
    case actionTypes.GET_MENU_VISIBILITY_STATUS_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_MENU_VISIBILITY_STATUS_SUCCESS: {
      return {
        ...state,
        visibilityOption: action.payload?.visibilityOption,
        loading: false,
      }
    }

    case actionTypes.GET_MENU_VISIBILITY_STATUS_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    //GET MENU REDUCER
    case actionTypes.GET_MENU_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_MENU_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    }

    case actionTypes.GET_MENU_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    //GET MENU REDUCER
    case actionTypes.GET_ALL_MENU_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_MENU_SUCCESS: {
      return {
        ...state,
        menuList: action.payload,
        loading: false,
      }
    }

    case actionTypes.GET_ALL_MENU_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    //ADD MENU REDUCER
    case actionTypes.ADD_MENU_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_MENU_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        success: true,
      }
    }

    case actionTypes.ADD_MENU_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.ADD_MENU_RESET: {
      return {...state, data: [], success: false, loading: false}
    }

    //UPDATE MENU REDUCER
    case actionTypes.UPDATE_MENU_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_MENU_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        success: true,
      }
    }

    case actionTypes.UPDATE_MENU_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }
    //Delete
    case actionTypes.DELETE_MENU_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_MENU_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_MENU_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_MENU_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_MENU_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_MENU_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_MENU_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_MENU_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_MENU_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_MENU_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_MENU_SUCCESS: {
      const changedData: any = action.payload?.data?.menu
      let newData = state?.data?.menu?.map((data: any) => {
        if (data?.id === changedData[0]?.id) {
          return {
            ...data,
            status: changedData[0]?.status,
          }
        } else {
          return data
        }
      })
      return {
        ...state,
        data: {...state, meta: state?.data?.meta, menu: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_MENU_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_MENU_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_MENU_SUCCESS: {
      const changedData: any = action.payload?.data?.menu
      let newData = state?.data?.menu?.map((data: any) => {
        if (data?.id === changedData[0]?.id) {
          return {
            ...data,
            status: changedData[0]?.status,
          }
        } else {
          return data
        }
      })

      return {
        ...state,
        data: {...state, meta: state?.data?.meta, menu: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_MENU_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    // sort
    case actionTypes.SORT_MENU_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_MENU_SUCCESS: {
      return {
        ...state,
        sortMenuData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_MENU_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_MENU_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortMenuData: [],
      }
    }
    default:
      return state
  }
}
