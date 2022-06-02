import {Action} from 'redux'
import {ServiceTypeModel} from '../Model/ServiceTypeModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialServiceTypeState: IServiceTypeState = {
  data: {
    grievance: [],
    meta: [],
  },
  loading: false,
  success: false,
}

export interface IServiceTypeState {
  data?: {
    grievance?: ServiceTypeModel[]
    meta?: {[key: string]: string | number}[]
  }

  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IServiceTypeState = initialServiceTypeState,
  action: ActionWithPayload<IServiceTypeState>
) => {
  switch (action.type) {
    case actionTypes.GET_GRIEVANCE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_GRIEVANCE_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_GRIEVANCE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.EXPORT_GRIEVANCE_FILE_START: {
      return {...state, loading: true}
    }

    case actionTypes.EXPORT_GRIEVANCE_FILE_SUCCESS: {
      return {...state, success: true, loading: false}
    }

    case actionTypes.EXPORT_GRIEVANCE_FILE_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    default:
      return state
  }
}
