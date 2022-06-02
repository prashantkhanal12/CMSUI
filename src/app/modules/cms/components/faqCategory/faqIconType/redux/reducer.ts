import {Action} from 'redux'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialFaqIconTypeState: IFaqIconTypeState = {
  data: {
    faqIconType: [],
  },
  loading: false,
  success: false,
  deleteSuccess: false,
}
export interface IFaqIconTypeState {
  data: {
    faqIconType: {[key: string]: string | number}[]
  }
  loading?: boolean
  deleteSuccess?: boolean
  success?: boolean
}

export const reducer = (
  state: IFaqIconTypeState = initialFaqIconTypeState,
  action: ActionWithPayload<IFaqIconTypeState>
) => {
  switch (action.type) {
    case actionTypes.GET_FAQ_ICON_TYPE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_FAQ_ICON_TYPE_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.GET_FAQ_ICON_TYPE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    default:
      return state
  }
}
