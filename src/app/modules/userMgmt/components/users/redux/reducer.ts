import {userInfo} from 'os'
import {Action} from 'redux'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialUserState: IUserState = {
  loading: false,
  toggleLoading: false,
  success: false,
  activateSuccess: false,
  deactivateSuccess: false,
  singleActivateSuccess: false,
  singleDeactivateSuccess: false,
  deleteSuccess: false,
  data: {
    user: [],
    meta: {},
  },
}

export interface IUserState {
  loading?: boolean
  toggleLoading?: boolean
  success?: boolean
  activateSuccess?: boolean
  deactivateSuccess?: boolean
  singleActivateSuccess?: boolean
  singleDeactivateSuccess?: boolean
  deleteSuccess?: boolean
  data: {
    user: {[key: string]: string | number}[]
    meta: {[key: string]: number}
  }
}

export const reducer = (
  state: IUserState = initialUserState,
  action: ActionWithPayload<IUserState>
) => {
  switch (action.type) {
    //Add Users
    case actionTypes.ADD_USER_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_USER_SUCCESS: {
      const userData = action.payload
      return {...state, success: true, loading: false}
    }

    case actionTypes.ADD_USER_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.ADD_USER_RESET: {
      return {...state, success: false, data: [], loading: false}
    }

    //Get Reducers
    case actionTypes.GET_USER_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.GET_USER_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }
    case actionTypes.GET_USER_FINISH: {
      return {...state, loading: false}
    }

    //Activate Users
    case actionTypes.ACTIVATE_USERS_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ACTIVATE_USERS_SUCCESS: {
      return {...state, activateSuccess: true, loading: false}
    }
    case actionTypes.ACTIVATE_USERS_FINISH: {
      return {...state, activateSuccess: false, loading: false}
    }

    //Single Activate Users
    case actionTypes.SINGLE_ACTIVATE_USER_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_USER_SUCCESS: {
      const changedData: any = action.payload?.data
      let newData = state?.data?.user?.map((data) => {
        if (data?.id === changedData?.id) {
          return {
            ...data,
            status: !data?.status,
          }
        } else {
          return data
        }
      })

      return {
        ...state,
        data: {...state, meta: state?.data?.meta, user: newData},
        singleActivateSuccess: true,
        toggleLoading: false,
      }
    }
    case actionTypes.SINGLE_ACTIVATE_USER_FINISH: {
      return {...state, singleActivateSuccess: false, toggleLoading: false}
    }

    //Deactivate User
    case actionTypes.DEACTIVATE_USERS_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DEACTIVATE_USERS_SUCCESS: {
      return {...state, deactivateSuccess: true, loading: false}
    }

    case actionTypes.DEACTIVATE_USERS_FINISH: {
      return {...state, deactivateSuccess: false, loading: false}
    }

    //Singer Deactivate User
    case actionTypes.SINGLE_DEACTIVATE_USER_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DEACTIVATE_USER_SUCCESS: {
      const changedData: any = action.payload?.data
      let newData = state?.data?.user?.map((data) => {
        if (data?.id === changedData?.id) {
          return {
            ...data,
            status: !data?.status,
          }
        } else {
          return data
        }
      })

      return {
        ...state,
        data: {...state, meta: state?.data?.meta, user: newData},
        singleDeactivateSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DEACTIVATE_USER_FINISH: {
      return {...state, singleDeactivateSuccess: false, toggleLoading: false}
    }

    //Delete User
    case actionTypes.DELETE_USER_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_USER_SUCCESS: {
      return {...state, deleteSuccess: true, loading: false}
    }
    case actionTypes.DELETE_USER_FINISH: {
      return {...state, deleteSuccess: false, loading: false}
    }

    //update users
    case actionTypes.UPDATE_USER_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_USER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.UPDATE_USER_RESET: {
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
