import {Action} from 'redux'
import {PositionModel} from '../Model'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialPostionState: IPositionState = {
  data: {
    position: [],
    meta: {},
  },
  sortPositionData: [],
  positionList: {position: []},
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IPositionState {
  data: {
    position: {[key: string]: number | string}[]
    meta: {[key: string]: number}
  }
  sortPositionData?: IPositionState[]
  positionList?: {position: PositionModel[] | any}
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IPositionState = initialPostionState,
  action: ActionWithPayload<IPositionState>
) => {
  switch (action.type) {
    //GET Position Data
    case actionTypes.GET_POSITION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_POSITION_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_POSITION_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add Positon
    case actionTypes.ADD_POSITION_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_POSITION_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_POSITION_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.ADD_POSITION_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update PPPPOSITION
    case actionTypes.UPDATE_POSITION_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_POSITION_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_POSITION_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_POSITION_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_POSITION_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_POSITION_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_POSITION_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_POSITION_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_POSITION_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_POSITION_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_POSITION_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_POSITION_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ACTIVATE_POSITION_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_POSITION_SUCCESS: {
      const changedData: any = action.payload?.data?.position
      let newData = state?.data?.position?.map((data) => {
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
        data: {...state?.data?.meta, position: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ACTIVATE_POSITION_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_ACTIVATE_POSITION_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DEACTIVATE_POSITION_SUCCESS: {
      const changedData: any = action.payload?.data?.position
      let newData = state?.data?.position?.map((data) => {
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
        data: {...state?.data?.meta, position: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ACTIVATE_POSITION_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    //Get Gallery Reducer
    case actionTypes.GET_ALL_POSITION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_POSITION_SUCCESS: {
      return {
        ...state,
        data: action.payload?.data,
        positionList: action.payload?.data,
        loading: false,
      }
    }

    case actionTypes.GET_ALL_POSITION_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    // sort
    case actionTypes.SORT_POSITION_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_POSITION_SUCCESS: {
      return {
        ...state,
        sortPositionData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_POSITION_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_POSITION_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortPositionData: [],
      }
    }
    default:
      return state
  }
}
