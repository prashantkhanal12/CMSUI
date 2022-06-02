import {Action} from 'redux'
import {OptionModel} from '../Model'
import {NoticesModel} from '../Model/NoticesModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialNoticesState: INoticesState = {
  data: {
    notice: [],
    meta: {},
  },
  deleteSuccess: false,
  loading: false,
  success: false,
}

export interface INoticesState {
  data?: {
    notice?: NoticesModel[]
    meta?: {[key: string]: number}
  }
  activateSuccess?: boolean
  deactivateSuccess?: boolean
  singleActivateSuccess?: boolean
  singleDeactivateSuccess?: boolean
  deleteSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: INoticesState = initialNoticesState,
  action: ActionWithPayload<INoticesState>
) => {
  switch (action.type) {
    //GET NOTICES DATA
    case actionTypes.GET_NOTICES_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_NOTICES_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_NOTICES_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add SUB CATEGORY

    case actionTypes.ADD_NOTICES_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_NOTICES_SUCCESS: {
      return {
        ...state,
        data: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_NOTICES_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.ADD_NOTICES_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update news
    case actionTypes.UPDATE_NOTICES_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_NOTICES_SUCCESS: {
      return {
        ...state,
        data: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_NOTICES_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_NOTICES_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_NOTICES_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_NOTICES_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Singer activate branchless banking
    //Activate Users
    case actionTypes.SINGLE_ACTIVATE_NOTICES_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_NOTICES_SUCCESS: {
      return {...state, activateSuccess: true, loading: false}
    }
    case actionTypes.SINGLE_ACTIVATE_NOTICES_FINISH: {
      return {...state, activateSuccess: false, loading: false}
    }

    case actionTypes.SINGLE_DEACTIVATE_NOTICES_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.SINGLE_DEACTIVATE_NOTICES_SUCCESS: {
      return {...state, deactivateSuccess: true, loading: false}
    }

    case actionTypes.SINGLE_DEACTIVATE_NOTICES_FINISH: {
      return {...state, deactivateSuccess: false, loading: false}
    }

    default:
      return state
  }
}
