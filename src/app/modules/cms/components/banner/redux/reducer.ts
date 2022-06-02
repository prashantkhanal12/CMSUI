import {Action} from 'redux'
import {BannerModel} from '../Model'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialBannerState: IBannerState = {
  data: {
    banner: [],
    meta: {},
  },
  sortBannerData: [],
  bannerList: {banner: []},
  loading: false,
  success: false,
  editSuccess: false,
  activateSuccess: false,
  deactivateSuccess: false,
  deleteSuccess: false,
  toggleLoading: false,
  singleActivateSuccess: false,
  singleDeactivateSuccess: false,
}

export interface IBannerState {
  data: {
    banner: {[key: string]: number | string}[]
    meta: {[key: string]: number}
  }
  sortBannerData?: IBannerState[]
  bannerList?: {banner: BannerModel[] | any}
  loading: false
  success: false
  editSuccess: false
  activateSuccess: false
  deactivateSuccess: false
  deleteSuccess: false
  toggleLoading: false
  singleActivateSuccess: false
  singleDeactivateSuccess: false
}

export const reducer = (
  state: IBannerState = initialBannerState,
  action: ActionWithPayload<IBannerState>
) => {
  switch (action.type) {
    //Get Banner Reducer
    case actionTypes.GET_BANNER_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_BANNER_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.GET_BANNER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Get Banner Reducer
    case actionTypes.GET_ALL_BANNER_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_BANNER_SUCCESS: {
      return {
        ...state,
        data: action.payload?.data,
        bannerList: action.payload?.data,
        loading: false,
      }
    }

    case actionTypes.GET_ALL_BANNER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }
    //Add Banner Reducer
    case actionTypes.ADD_BANNER_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_BANNER_SUCCESS: {
      const bannerData = action.payload
      return {...state, success: true, loading: false}
    }

    case actionTypes.ADD_BANNER_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.ADD_BANNER_RESET: {
      return {...state, success: false, data: [], loading: false}
    }

    //update Banner
    case actionTypes.UPDATE_BANNER_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_BANNER_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_BANNER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.UPDATE_BANNER_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }
    //Delete Banner
    case actionTypes.DELETE_BANNER_START: {
      return {...state, loading: true, deleteSuccess: false}
    }

    case actionTypes.DELETE_BANNER_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_BANNER_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Activate Banners
    case actionTypes.ACTIVATE_BANNER_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ACTIVATE_BANNER_SUCCESS: {
      return {...state, activateSuccess: true, loading: false}
    }
    case actionTypes.ACTIVATE_BANNER_FINISH: {
      return {...state, activateSuccess: false, loading: false}
    }

    //Single Activate Banner
    case actionTypes.SINGLE_ACTIVATE_BANNER_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_BANNER_SUCCESS: {
      const changedData: any = action.payload?.data?.banner
      let newData = state?.data?.banner?.map((data) => {
        if (data?.id === changedData[0]?.id) {
          return {
            ...data,
            status: !data?.status,
          }
        } else {
          return data
        }
      })

      return {
        ...state,
        data: {...state, meta: state?.data?.meta, banner: newData},
        singleActivateSuccess: true,
        toggleLoading: false,
      }
    }
    case actionTypes.SINGLE_ACTIVATE_BANNER_FINISH: {
      return {...state, singleActivateSuccess: false, toggleLoading: false}
    }

    //Deactivate Banner
    case actionTypes.DEACTIVATE_BANNER_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DEACTIVATE_BANNER_SUCCESS: {
      return {...state, deactivateSuccess: true, loading: false}
    }

    case actionTypes.DEACTIVATE_BANNER_FINISH: {
      return {...state, deactivateSuccess: false, loading: false}
    }

    case actionTypes.SINGLE_DEACTIVATE_BANNER_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DEACTIVATE_BANNER_SUCCESS: {
      const changedData: any = action.payload?.data?.banner
      let newData = state?.data?.banner?.map((data) => {
        if (data?.id === changedData[0]?.id) {
          return {
            ...data,
            status: !data?.status,
          }
        } else {
          return data
        }
      })

      return {
        ...state,
        data: {...state, meta: state?.data?.meta, banner: newData},
        singleDeactivateSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DEACTIVATE_BANNER_FINISH: {
      return {...state, singleDeactivateSuccess: false, toggleLoading: false}
    }

    // sort
    case actionTypes.SORT_BANNER_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_BANNER_SUCCESS: {
      return {
        ...state,
        sortBannerData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_BANNER_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_BANNER_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortBannerData: [],
      }
    }
    default:
      return state
  }
}
