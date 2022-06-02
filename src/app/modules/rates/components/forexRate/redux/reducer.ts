import {Action} from 'redux'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialForexRateState: IForexRateState = {
  data: {
    forexRate: [],
    forexCategory: [],
    meta: {},
  },
  loading: false,
  success: false,
  editSuccess: false,
  activateSuccess: false,
  deactivateSuccess: false,
  deleteSuccess: false,
  toggleLoading: false,
  singleActivateSuccess: false,
}

export interface IForexRateState {
  data: {
    forexRate: {[key: string]: string | number}[]
    forexCategory: {[key: string]: string | number}[]
    meta: {[key: string]: number}
  }
  loading?: boolean
  success?: boolean
  editSuccess?: boolean
  activateSuccess?: boolean
  deactivateSuccess?: boolean
  deleteSuccess?: boolean
  toggleLoading?: boolean
  singleActivateSuccess?: boolean
}

export const reducer = (
  state: IForexRateState = initialForexRateState,
  action: ActionWithPayload<IForexRateState>
) => {
  switch (action.type) {
    case actionTypes.GET_FOREX_RATE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_FOREX_RATE_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.GET_FOREX_RATE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Create Forex Rate
    case actionTypes.CREATE_FOREX_RATE_START: {
      return {...state, loading: true}
    }

    case actionTypes.CREATE_FOREX_RATE_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        editSuccess: true,
        loading: false,
      }
    }

    case actionTypes.CREATE_FOREX_RATE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.CREATE_FOREX_RATE_RESET: {
      return {
        ...state,
        data: [],
        editSuccess: false,
      }
    }
    //Activate Forex Rate
    case actionTypes.ACTIVATE_FOREX_RATE_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ACTIVATE_FOREX_RATE_SUCCESS: {
      return {...state, activateSuccess: true, loading: false}
    }
    case actionTypes.ACTIVATE_FOREX_RATE_FINISH: {
      return {...state, activateSuccess: false, loading: false}
    }

    //Single Activate Users
    case actionTypes.SINGLE_ACTIVATE_FOREX_RATE_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_FOREX_RATE_SUCCESS: {
      const changedData: any = action.payload?.data
      let newData = state?.data?.forexRate?.map((data) => {
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
        data: {...state?.data?.meta, forexRate: newData},
        singleActivateSuccess: true,
        toggleLoading: false,
      }
    }
    case actionTypes.SINGLE_ACTIVATE_FOREX_RATE_FINISH: {
      return {...state, singleActivateSuccess: false, toggleLoading: false}
    }

    //Deactivate Gold Rate
    case actionTypes.DEACTIVATE_FOREX_RATE_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DEACTIVATE_FOREX_RATE_SUCCESS: {
      return {...state, deactivateSuccess: true, loading: false}
    }

    case actionTypes.DEACTIVATE_FOREX_RATE_FINISH: {
      return {...state, deactivateSuccess: false, loading: false}
    }

    //Single Deactivate User
    case actionTypes.SINGLE_DEACTIVATE_FOREX_RATE_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DEACTIVATE_FOREX_RATE_SUCCESS: {
      const changedData: any = action.payload?.data
      let newData = state?.data?.forexRate?.map((data) => {
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
        data: {...state?.data?.meta, forexRate: newData},
        deactivateSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DEACTIVATE_FOREX_RATE_FINISH: {
      return {...state, deactivateSuccess: false, toggleLoading: false}
    }

    //Update forex Rate
    case actionTypes.UPDATE_FOREX_RATE_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_FOREX_RATE_SUCCESS: {
      return {
        ...state,
        editSuccess: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_FOREX_RATE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.UPDATE_FOREX_RATE_RESET: {
      return {
        ...state,
        data: [],
        editSuccess: false,
      }
    }

    //Import forex rate file
    case actionTypes.IMPORT_FOREX_RATE_START: {
      return {...state, loading: true}
    }

    case actionTypes.IMPORT_FOREX_RATE_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        success: true,
      }
    }

    case actionTypes.IMPORT_FOREX_RATE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false, success: false}
    }

    //Delete forex rate
    case actionTypes.DELETE_FOREX_RATE_START: {
      return {...state, loading: true, deleteSuccess: false}
    }

    case actionTypes.DELETE_FOREX_RATE_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_FOREX_RATE_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    default:
      return state
  }
}

//For file uplaod
const initialForexRateFileState: IForexRateFileState = {
  data: {
    file: {},
  },
  loading: false,
  success: false,
}

export interface IForexRateFileState {
  data: {
    file: {[key: string]: number}
  }
  loading?: boolean
  success?: boolean
}

export const reducer1 = (
  state: IForexRateFileState = initialForexRateFileState,
  action: ActionWithPayload<IForexRateFileState>
) => {
  switch (action.type) {
    case actionTypes.GET_FOREX_RATE_FILE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_FOREX_RATE_FILE_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.GET_FOREX_RATE_FILE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    default:
      return state
  }
}
