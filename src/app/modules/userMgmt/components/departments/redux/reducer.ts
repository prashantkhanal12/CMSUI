import {Action} from 'redux'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialDepartmentState: IDepartmentState = {
  data: {
    department: [],
    meta: {},
  },
  activateSuccess: false,
  deactivateSuccess: false,
  singleActivateSuccess: false,
  singleDeactivateSuccess: false,
  loading: false,
  success: false,
  deleteSuccess: false,
}

export interface IDepartmentState {
  data: {
    department?: {[key: string]: string | number}[]
    meta?: {[key: string]: number}
  }
  activateSuccess: boolean
  deactivateSuccess: boolean
  singleActivateSuccess: boolean
  singleDeactivateSuccess: boolean
  loading?: boolean
  deleteSuccess?: boolean
  success?: boolean
}

export const reducer = (
  state: IDepartmentState = initialDepartmentState,
  action: ActionWithPayload<IDepartmentState>
) => {
  switch (action.type) {
    case actionTypes.GET_DEPARTMENT_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_DEPARTMENT_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.GET_DEPARTMENT_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.ADD_DEPARTMENT_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_DEPARTMENT_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_DEPARTMENT_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.ADD_DEPARTMENT_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    case actionTypes.UPDATE_DEPARTMENT_START: {
      return {
        ...state,
        loading: true,
      }
    }

    case actionTypes.UPDATE_DEPARTMENT_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_DEPARTMENT_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.UPDATE_DEPARTMENT_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    case actionTypes.DELETE_DEPARTMENT_START: {
      return {...state, loading: true, deleteSuccess: false}
    }

    case actionTypes.DELETE_DEPARTMENT_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_DEPARTMENT_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Singer activate branchless banking

    case actionTypes.SINGLE_ACTIVATE_DEPARTMENT_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_DEPARTMENT_SUCCESS: {
      const changedData: any = action.payload
      let newData = state?.data?.department?.map((data) => {
        if (data?.id === changedData?.department[0]?.id) {
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
        data: {...state,meta:state?.data?.meta, department: newData},
        singleActivateSuccess: true,
        toggleLoading: false,
      }
    }
    case actionTypes.SINGLE_ACTIVATE_DEPARTMENT_FINISH: {
      return {...state, singleActivateSuccess: false, toggleLoading: false}
    }

    //Singer Deactivate branchless banking
    case actionTypes.SINGLE_DEACTIVATE_DEPARTMENT_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DEACTIVATE_DEPARTMENT_SUCCESS: {
      const changedData: any = action.payload
      let newData = state?.data?.department?.map((data) => {
        if (data?.id === changedData?.department[0]?.id) {
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
        data: {...state,meta:state?.data?.meta, department: newData},
        singleDeactivateSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DEACTIVATE_DEPARTMENT_FINISH: {
      return {...state, singleDeactivateSuccess: false, toggleLoading: false}
    }

    default:
      return state
  }
}
