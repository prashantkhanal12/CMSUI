import {Action} from 'redux'
import {UpdateNotesModel} from '../Model'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialUpdateNotesState: IUpdateNotesState = {
  data: {
    excerptRateCategory: [],
  },
  excerptRateData: {},
  loading: false,
  success: false,
  editSuccess: false,
}
export interface IUpdateNotesState {
  data: {
    excerptRateCategory: {[key: string]: string | number}[]
  }
  excerptRateData: UpdateNotesModel
  loading: false
  success: false
  editSuccess: false
}

export const reducer = (
  state: IUpdateNotesState = initialUpdateNotesState,
  action: ActionWithPayload<IUpdateNotesState>
) => {
  switch (action.type) {
    case actionTypes.GET_UPDATE_NOTES_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_UPDATE_NOTES_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.GET_UPDATE_NOTES_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.GET_UPDATE_NOTES_WITH_DATA_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_UPDATE_NOTES_WITH_DATA_SUCCESS: {
      return {...state, excerptRateData: action.payload, loading: false}
    }

    case actionTypes.GET_UPDATE_NOTES_WITH_DATA_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add Update Notice  Reducer
    case actionTypes.ADD_UPDATE_NOTES_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_UPDATE_NOTES_SUCCESS: {
      return {...state, data: action?.payload?.data, success: true, loading: false}
    }

    case actionTypes.ADD_UPDATE_NOTES_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.ADD_UPDATE_NOTES_RESET: {
      return {...state, success: false, data: [], loading: false}
    }

    //update Update Notice
    case actionTypes.UPDATE_UPDATE_NOTES_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_UPDATE_NOTES_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_UPDATE_NOTES_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.UPDATE_UPDATE_NOTES_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    default:
      return state
  }
}
