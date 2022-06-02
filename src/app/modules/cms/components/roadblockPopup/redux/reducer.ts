import {Action} from 'redux'
import {RoadBlockPopupModel} from '../Model'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialRoadBlockPopupState: IRoadBlockPopupState = {
  data: {
    popup: [],
    meta: {},
  },
  sortRoadBlockData: [],
  roadBlockList: {popup: []},
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

export interface IRoadBlockPopupState {
  data: {
    popup: {[key: string]: number | string}[]
    meta: {[key: string]: number}
  }
  sortRoadBlockData?: []
  roadBlockList?: {popup: RoadBlockPopupModel[] | any}
  loading?: boolean
  success?: boolean
  editSuccess?: boolean
  activateSuccess?: boolean
  deactivateSuccess?: boolean
  deleteSuccess?: boolean
  toggleLoading?: boolean
  singleActivateSuccess?: boolean
  singleDeactivateSuccess?: boolean
}

export const reducer = (
  state: IRoadBlockPopupState = initialRoadBlockPopupState,
  action: ActionWithPayload<IRoadBlockPopupState>
) => {
  switch (action.type) {
    //Get All Road Block List Reducer
    case actionTypes.GET_ALL_ROAD_BLOCK_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_ROAD_BLOCK_SUCCESS: {
      return {
        ...state,
        data: action.payload?.data,
        roadBlockLists: action.payload?.data,
        loading: false,
      }
    }

    case actionTypes.GET_ALL_ROAD_BLOCK_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }
    //Get Road Block Popup Reducer
    case actionTypes.GET_ROAD_BLOCK_POPUP_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ROAD_BLOCK_POPUP_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.GET_ROAD_BLOCK_POPUP_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add Road Block Reducer
    case actionTypes.ADD_ROAD_BLOCK_POPUP_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_ROAD_BLOCK_POPUP_SUCCESS: {
      return {...state, data: action?.payload?.data, success: true, loading: false}
    }

    case actionTypes.ADD_ROAD_BLOCK_POPUP_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.ADD_ROAD_BLOCK_POPUP_RESET: {
      return {...state, success: false, data: [], loading: false}
    }

    //update Road Block
    case actionTypes.UPDATE_ROAD_BLOCK_POPUP_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_ROAD_BLOCK_POPUP_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_ROAD_BLOCK_POPUP_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.UPDATE_ROAD_BLOCK_POPUP_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }
    //Delete Road Block
    case actionTypes.DELETE_ROAD_BLOCK_POPUP_START: {
      return {...state, loading: true, deleteSuccess: false}
    }

    case actionTypes.DELETE_ROAD_BLOCK_POPUP_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_ROAD_BLOCK_POPUP_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Activate Road Block
    case actionTypes.ACTIVATE_ROAD_BLOCK_POPUP_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ACTIVATE_ROAD_BLOCK_POPUP_SUCCESS: {
      return {...state, activateSuccess: true, loading: false}
    }
    case actionTypes.ACTIVATE_ROAD_BLOCK_POPUP_FINISH: {
      return {...state, activateSuccess: false, loading: false}
    }

    //Single Activate Road Block
    case actionTypes.SINGLE_ACTIVATE_ROAD_BLOCK_POPUP_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_ROAD_BLOCK_POPUP_SUCCESS: {
      const changedData: any = action.payload?.data?.popup
      let newData = state?.data?.popup?.map((data) => {
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
        data: {...state?.data?.meta, textPopup: newData},
        singleActivateSuccess: true,
        toggleLoading: false,
      }
    }
    case actionTypes.SINGLE_ACTIVATE_ROAD_BLOCK_POPUP_FINISH: {
      return {...state, singleActivateSuccess: false, toggleLoading: false}
    }

    //Deactivate Road Block
    case actionTypes.DEACTIVATE_ROAD_BLOCK_POPUP_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DEACTIVATE_ROAD_BLOCK_POPUP_SUCCESS: {
      return {...state, deactivateSuccess: true, loading: false}
    }

    case actionTypes.DEACTIVATE_ROAD_BLOCK_POPUP_FINISH: {
      return {...state, deactivateSuccess: false, loading: false}
    }

    case actionTypes.SINGLE_DEACTIVATE_ROAD_BLOCK_POPUP_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DEACTIVATE_ROAD_BLOCK_POPUP_SUCCESS: {
      const changedData: any = action.payload?.data?.popup
      let newData = state?.data?.popup?.map((data) => {
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
        data: {...state?.data?.meta, textPopup: newData},
        singleDeactivateSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DEACTIVATE_ROAD_BLOCK_POPUP_FINISH: {
      return {...state, singleDeactivateSuccess: false, toggleLoading: false}
    }
    //Sort Road Block
    case actionTypes.SORT_ROAD_BLOCK_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_ROAD_BLOCK_SUCCESS: {
      return {
        ...state,
        sortRoadBlockData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_ROAD_BLOCK_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_ROAD_BLOCK_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortRoadBlockData: [],
      }
    }

    default:
      return state
  }
}
