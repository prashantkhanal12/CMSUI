import {Action} from 'redux'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialUserRoleState: IUserRoleState = {
  data: {
    role: [],
    meta: {},
  },
  loading: false,
  success: false,
  deleteSuccess: false,
}

export interface IUserRoleState {
  data: {
    role?: {[key: string]: string | number}[]
    meta?: {[key: string]: string | number}
  }
  loading?: boolean
  success?: boolean
  deleteSuccess: boolean
}

export const reducer = (
  state: IUserRoleState = initialUserRoleState,
  action: ActionWithPayload<IUserRoleState>
) => {
  switch (action.type) {
    case actionTypes.ADD_ROLE_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_ROLE_SUCCESS: {
      const roleData = action.payload
      return {...state, data: roleData, success: true, loading: false}
    }

    case actionTypes.ADD_ROLE_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.ADD_ROLE_RESET: {
      return {...state, data: [], success: false, loading: false}
    }

    case actionTypes.GET_ROLE_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ROLE_SUCCESS: {
      const getRoleData = action.payload
      return {...state, data: getRoleData, loading: false}
    }

    case actionTypes.GET_ROLE_FINISH: {
      return {...state, loading: false}
    }

    case actionTypes.DELETE_ROLE_REQUEST: {
      return {...state, deleteSuccess: false, loading: true}
    }

    case actionTypes.DELETE_ROLE_SUCCESS: {
      return {...state, deleteSuccess: true, loading: false}
    }

    case actionTypes.DELETE_ROLE_FINISH: {
      return {...state, deleteSuccess: false, loading: false}
    }

    //Update Reducer
    case actionTypes.UPDATE_ROLE_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_ROLE_SUCCESS: {
      const updatedData = action.payload
      return {...state, data: updatedData, success: true, loading: false}
    }

    case actionTypes.UPDATE_ROLE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.UPDATE_ROLE_RESET: {
      return {...state, data: [], success: false, loading: false}
    }

    default:
      return state
  }
}
