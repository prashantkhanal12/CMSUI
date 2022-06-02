import {Action} from 'redux'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}
/* const initialUserRoleState: IUserRoleState = {
  data: [],
  loading: true,
} */

/* export interface IUserRoleState {
  data: any
  loading?: boolean
} */
const initialUserRoleState: IUserRoleState = {
  loading: false,
  success: false,
  data: {
    userRole: [],
    meta: {},
  },
}

export interface IUserRoleState {
  loading?: boolean
  success?: boolean
  data: {
    userRole: {[key: string]: string | number}[]
    meta: {[key: string]: number}
  }
}

export const reducer = (
  state: IUserRoleState = initialUserRoleState,
  action: ActionWithPayload<IUserRoleState>
) => {
  switch (action.type) {
    case actionTypes.ADD_USER_ROLE_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_USER_ROLE_SUCCESS: {
      const userRoleData = action.payload

      return {...state, success: true, loading: false}
    }

    case actionTypes.ADD_USER_ROLE_FINISH: {
      return {...state, loading: false}
    }

    case actionTypes.GET_USER_ROLE_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.GET_USER__ROLE_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }
    case actionTypes.GET_USER_ROLE_FINISH: {
      return {...state, loading: false}
    }

    case actionTypes.UPDATE_USER_ROLE_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_USER_ROLE_SUCCESS: {
      return {
        ...state,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_USER_ROLE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.UPDATE_USER_ROLE_RESET: {
      return {
        ...state,
        data: [],
        success: false,
        loading: false,
      }
    }

    default:
      return state
  }
}
