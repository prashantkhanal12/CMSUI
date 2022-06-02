import {Action} from 'redux'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialInterestRateState: IInterestRateState = {
  data: {
    interestRate: [],
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

export interface IInterestRateState {
  data?: {
    interestRate?: {[key: string]: number | string}[]
    meta: {[key: string]: number}
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
  state: IInterestRateState = initialInterestRateState,
  action: ActionWithPayload<IInterestRateState>
) => {
  switch (action.type) {
    //GET INTEREST RATE Data
    case actionTypes.GET_INTEREST_RATE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_INTEREST_RATE_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_INTEREST_RATE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add INTEREST RATE
    case actionTypes.ADD_INTEREST_RATE_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_INTEREST_RATE_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_INTEREST_RATE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.RESET_INTEREST_RATE_TYPE: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update INTEREST RATE
    case actionTypes.UPDATE_INTEREST_RATE_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_INTEREST_RATE_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_INTEREST_RATE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_INTEREST_RATE_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_INTEREST_RATE_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_INTEREST_RATE_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_INTEREST_RATE_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_INTEREST_RATE_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_INTEREST_RATE_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_INTEREST_RATE_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_INTEREST_RATE_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_INTEREST_RATE_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_INTEREST_RATE_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_INTEREST_RATE_SUCCESS: {
      const changedData: any = action.payload?.data?.interestRate
      let newData = state?.data?.interestRate?.map((data) => {
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
        data: {...state?.data?.meta, interestRate: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_INTEREST_RATE_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_INTEREST_RATE_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_INTEREST_RATE_SUCCESS: {
      const changedData: any = action.payload?.data?.interestRate
      let newData = state?.data?.interestRate?.map((data) => {
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
        data: {...state?.data?.meta, interestRate: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_INTEREST_RATE_FINISH: {
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

const initialInterestRateLoanFileState: IInterestRateLoanFileState = {
  data: {
    file: {},
  },
  loading: false,
  success: false,
}

export interface IInterestRateLoanFileState {
  data: {
    file: {[key: string]: number}
  }
  loading?: boolean
  success?: boolean
}

export const reducer1 = (
  state: IInterestRateLoanFileState = initialInterestRateLoanFileState,
  action: ActionWithPayload<IInterestRateLoanFileState>
) => {
  switch (action.type) {
    case actionTypes.GET_INTEREST_RATE_LOAN_FILE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_INTEREST_RATE_LOAN_FILE_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.GET_INTEREST_RATE_LOAN_FILE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Get Deposit interest rate
    case actionTypes.GET_INTEREST_RATE_DEPOSIT_FILE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_INTEREST_RATE_DEPOSIT_FILE_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.GET_INTEREST_RATE_DEPOSIT_FILE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    default:
      return state
  }
}
