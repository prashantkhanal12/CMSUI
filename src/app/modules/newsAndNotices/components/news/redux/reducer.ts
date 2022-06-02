import {Action} from 'redux'
import {OptionModel} from '../Model'
import {NewsModel} from '../Model/NewsModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialNewsState: INewsState = {
  data: {
    news: [],
    meta: {},
  },
  deleteSuccess: false,
  loading: false,
  success: false,
}

export interface INewsState {
  data?: {
    news?: NewsModel[]
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
  state: INewsState = initialNewsState,
  action: ActionWithPayload<INewsState>
) => {
  switch (action.type) {
    //GET NEWS DATA
    case actionTypes.GET_NEWS_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_NEWS_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_NEWS_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add SUB CATEGORY

    case actionTypes.ADD_NEWS_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_NEWS_SUCCESS: {
      return {
        ...state,
        data: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_NEWS_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.ADD_NEWS_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update news
    case actionTypes.UPDATE_NEWS_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_NEWS_SUCCESS: {
      return {
        ...state,
        data: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_NEWS_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_NEWS_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_NEWS_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_NEWS_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Singer activate branchless banking
    //Activate Users
    case actionTypes.SINGLE_ACTIVATE_NEWS_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_NEWS_SUCCESS: {
      return {...state, activateSuccess: true, loading: false}
    }
    case actionTypes.SINGLE_ACTIVATE_NEWS_FINISH: {
      return {...state, activateSuccess: false, loading: false}
    }

    case actionTypes.SINGLE_DEACTIVATE_NEWS_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.SINGLE_DEACTIVATE_NEWS_SUCCESS: {
      return {...state, deactivateSuccess: true, loading: false}
    }

    case actionTypes.SINGLE_DEACTIVATE_NEWS_FINISH: {
      return {...state, deactivateSuccess: false, loading: false}
    }

    default:
      return state
  }
}
