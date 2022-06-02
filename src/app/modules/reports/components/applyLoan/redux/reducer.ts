import {Action} from 'redux'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialApplyLoanState: IApplyLoanState = {
  data: {
    loanApply: [],
    meta: {},
  },
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IApplyLoanState {
  data?: {
    loanApply?: {[key: string]: number | string}[]
    meta?: {[key: string]: number}
  }
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IApplyLoanState = initialApplyLoanState,
  action: ActionWithPayload<IApplyLoanState>
) => {
  switch (action.type) {
    //GET memberType DATA
    case actionTypes.GET_APPLY_LOAN_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_APPLY_LOAN_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_APPLY_LOAN_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET Municipality DATA
    case actionTypes.GET_MUNICIPALITY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_MUNICIPALITY_SUCCESS: {
      return {...state, loading: false}
    }

    case actionTypes.GET_MUNICIPALITY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add memberType
    case actionTypes.ADD_APPLY_LOAN_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_APPLY_LOAN_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_APPLY_LOAN_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.RESET_APPLY_LOAN: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update memberType
    case actionTypes.UPDATE_APPLY_LOAN_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_APPLY_LOAN_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_APPLY_LOAN_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_APPLY_LOAN_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_APPLY_LOAN_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_APPLY_LOAN_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_APPLY_LOAN_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_APPLY_LOAN_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_APPLY_LOAN_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_APPLY_LOAN_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_APPLY_LOAN_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_APPLY_LOAN_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_APPLY_LOAN_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_APPLY_LOAN_SUCCESS: {
      const changedData: any = action.payload?.data?.loanApply
      let newData = state?.data?.loanApply?.map((data) => {
        if (data?.id === changedData[0]?.id) {
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
        data: {...state, meta: state?.data?.meta, memberType: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_APPLY_LOAN_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_APPLY_LOAN_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_APPLY_LOAN_SUCCESS: {
      const changedData: any = action.payload?.data?.loanApply
      let newData = state?.data?.loanApply?.map((data) => {
        if (data?.id === changedData[0]?.id) {
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
        data: {...state, meta: state?.data?.meta, memberType: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_APPLY_LOAN_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    default:
      return state
  }
}
