import {Action} from 'redux'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialMunicipalityState: IMunicipalityState = {
  data: {
    municipality: [],
  },

  loading: false,
  success: false,
}

export interface IMunicipalityState {
  data?: {
    municipality?: {[key: string]: number | string}[]
  }
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IMunicipalityState = initialMunicipalityState,
  action: ActionWithPayload<IMunicipalityState>
) => {
  switch (action.type) {
    //GET Municipality DATA
    case actionTypes.GET_MUNICIPALITY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_MUNICIPALITY_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_MUNICIPALITY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    default:
      return state
  }
}
