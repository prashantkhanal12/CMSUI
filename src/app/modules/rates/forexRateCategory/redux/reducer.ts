import {Action} from 'redux'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialForexRateCategoryState: IForexRateCategoryState = {
  data: {
    forexRateCategory: [],
  },
  loading: false,
  success: false,
  deleteSuccess: false,
}
export interface IForexRateCategoryState {
  data: {
    forexRateCategory: {[key: string]: string | number}[]
  }
  loading?: boolean
  deleteSuccess?: boolean
  success?: boolean
}

export const reducer = (
  state: IForexRateCategoryState = initialForexRateCategoryState,
  action: ActionWithPayload<IForexRateCategoryState>
) => {
  switch (action.type) {
    case actionTypes.GET_FOREX_RATE_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_FOREX_RATE_CATEGORY_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.GET_FOREX_RATE_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    default:
      return state
  }
}
