import {userInfo} from 'os'
import {Action} from 'redux'
import {actionTypes} from './constants'
import {PasswordModel} from '../ProfileModels'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

/* const initialUserUpdateState: IUserUpdateState = {
  loading: false,
  success: false,
  data: {
    user:{},
    meta:[]
  },
} */

const initialPasswordState: IPasswordState = {
  loading: false,
  success: false,
  data: {},
}

export interface IPasswordState {
  loading?: boolean
  success?: boolean
  data?: PasswordModel
}

export const reducer = (
  state: IPasswordState = initialPasswordState,
  action: ActionWithPayload<IPasswordState>
) => {
  switch (action.type) {
    //Add Users

    //update users
    case actionTypes.UPDATE_PASSWORD_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_PASSWORD_SUCCESS: {
      return {
        ...state,
        data: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_PASSWORD_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.UPDATE_PASSWORD_RESET: {
      return {
        ...state,
        success: false,
      }
    }

    default:
      return state
  }
}
