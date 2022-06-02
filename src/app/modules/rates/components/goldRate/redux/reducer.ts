import {Action} from 'redux'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialGoldRateState: IGoldRateState = {
  data: {
    goldRate: [],
    goldCategory: [],
    meta: {},
  },
  editSuccess: false,
  loading: false,
  success: false,
  deleteSuccess: false,
  toggleLoading: false,
  activateSuccess: false,
  deactivateSuccess: false,
  singleActivateSuccess: false,
  singleDeactivateSuccess: false,
  importSuccess: false,
}

export interface IGoldRateState {
  data: {
    goldRate: {[key: string]: string | number}[]
    goldCategory: {[key: string]: string | number}[]
    meta: {[key: string]: number}
  }
  loading?: boolean
  deleteSuccess?: boolean
  success?: boolean
  activateSuccess?: boolean
  toggleLoading?: boolean
  deactivateSuccess?: boolean
  singleActivateSuccess?: boolean
  singleDeactivateSuccess?: boolean
  editSuccess?: boolean
  importSuccess?: boolean
}

export const reducer = (
  state: IGoldRateState = initialGoldRateState,
  action: ActionWithPayload<IGoldRateState>
) => {
  switch (action.type) {
    case actionTypes.GET_GOLD_RATE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_GOLD_RATE_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.GET_GOLD_RATE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Create Gold Rate
    case actionTypes.CREATE_GOLD_RATE_START: {
      return {...state, loading: true}
    }

    case actionTypes.CREATE_GOLD_RATE_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        editSuccess: true,
        loading: false,
      }
    }

    case actionTypes.CREATE_GOLD_RATE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.CREATE_GOLD_RATE_RESET: {
      return {
        ...state,
        data: [],
        editSuccess: false,
      }
    }

    //Activate Gold Rate
    case actionTypes.ACTIVATE_GOLD_RATE_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ACTIVATE_GOLD_RATE_SUCCESS: {
      return {...state, activateSuccess: true, loading: false}
    }
    case actionTypes.ACTIVATE_GOLD_RATE_FINISH: {
      return {...state, activateSuccess: false, loading: false}
    }

    //Single Activate Users
    case actionTypes.SINGLE_ACTIVATE_GOLD_RATE_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_GOLD_RATE_SUCCESS: {
      const changedData: any = action.payload?.data
      let newData = state?.data?.goldRate?.map((data) => {
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
        data: {...state?.data?.meta, goldRate: newData},
        singleActivateSuccess: true,
        toggleLoading: false,
      }
    }
    case actionTypes.SINGLE_ACTIVATE_GOLD_RATE_FINISH: {
      return {...state, singleActivateSuccess: false, toggleLoading: false}
    }

    //Deactivate Gold Rate
    case actionTypes.DEACTIVATE_GOLD_RATE_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DEACTIVATE_GOLD_RATE_SUCCESS: {
      return {...state, deactivateSuccess: true, loading: false}
    }

    case actionTypes.DEACTIVATE_GOLD_RATE_FINISH: {
      return {...state, deactivateSuccess: false, loading: false}
    }

    //Single Deactivate User
    case actionTypes.SINGLE_DEACTIVATE_GOLD_RATE_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DEACTIVATE_GOLD_RATE_SUCCESS: {
      const changedData: any = action.payload?.data
      let newData = state?.data?.goldRate?.map((data) => {
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
        data: {...state?.data?.meta, goldRate: newData},
        singleDeactivateSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DEACTIVATE_GOLD_RATE_FINISH: {
      return {...state, singleDeactivateSuccess: false, toggleLoading: false}
    }

    //Import gold rate file
    case actionTypes.IMPORT_GOLD_RATE_START: {
      return {...state, loading: true}
    }

    case actionTypes.IMPORT_GOLD_RATE_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        importSuccess: true,
      }
    }

    case actionTypes.IMPORT_GOLD_RATE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false, importSuccess: false}
    }

    //Update Gold Rate
    case actionTypes.UPDATE_GOLD_RATE_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_GOLD_RATE_SUCCESS: {
      return {
        ...state,
        editSuccess: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_GOLD_RATE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.UPDATE_GOLD_RATE_RESET: {
      return {
        ...state,
        data: [],
        editSuccess: false,
      }
    }

    //Delete Gold Rate
    case actionTypes.DELETE_GOLD_RATE_START: {
      return {...state, loading: true, deleteSuccess: false}
    }

    case actionTypes.DELETE_GOLD_RATE_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_GOLD_RATE_FINISH: {
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
const initialGoldRateFileState: IGoldRateFileState = {
  data: {
    file: {},
  },
  loading: false,
  success: false,
}

export interface IGoldRateFileState {
  data: {
    file: {[key: string]: number}
  }
  loading?: boolean
  success?: boolean
}

export const reducer1 = (
  state: IGoldRateFileState = initialGoldRateFileState,
  action: ActionWithPayload<IGoldRateFileState>
) => {
  switch (action.type) {
    case actionTypes.GET_GOLD_RATE_FILE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_GOLD_RATE_FILE_SUCCESS: {
      return {...state, exportSuccess: true, loading: false}
    }

    case actionTypes.GET_GOLD_RATE_FILE_FINISH: {
      const error = action.payload
      return {...state, error, exportSuccess: false, loading: false}
    }

    default:
      return state
  }
}
