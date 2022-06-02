import {Action} from 'redux'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialFaqManagerState: IFaqManagerState = {
  data: {
    faqQuestion: [],
    meta: {},
  },

  loading: false,
  success: false,
  editSuccess: false,
}
export interface IFaqManagerState {
  data: {
    faqQuestion: {[key: string]: string | number}[]
    meta: {[key: string]: number}
  }
  loading: false
  success: false
  editSuccess: false
}

export const reducer = (
  state: IFaqManagerState = initialFaqManagerState,
  action: ActionWithPayload<IFaqManagerState>
) => {
  switch (action.type) {
    case actionTypes.GET_FAQ_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_FAQ_MANAGER_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.GET_FAQ_MANAGER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add Faq Manager  Reducer
    case actionTypes.ADD_FAQ_MANAGER_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_FAQ_MANAGER_SUCCESS: {
      return {...state, data: action?.payload?.data, success: true, loading: false}
    }

    case actionTypes.ADD_FAQ_MANAGER_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.ADD_FAQ_MANAGER_RESET: {
      return {...state, success: false, data: [], loading: false}
    }

    //update Faq Manager
    case actionTypes.UPDATE_FAQ_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_FAQ_MANAGER_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_FAQ_MANAGER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.UPDATE_FAQ_MANAGER_RESET: {
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
