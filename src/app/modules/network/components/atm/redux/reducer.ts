import {Action} from 'redux'
import {AtmModel} from '../Model/AtmModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialAtmState: IAtmState = {
  data: {
    atm: [],
    meta: [],
  },
  importSuccess: false,
  exportSuccess: false,
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IAtmState {
  data?: {
    atm?: AtmModel[] | undefined
    meta?: {[key: string]: string | number}[]
  }

  deleteSuccess?: boolean
  exportSuccess?: boolean
  importSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IAtmState = initialAtmState,
  action: ActionWithPayload<IAtmState>
) => {
  switch (action.type) {
    //GET ATM DATA
    case actionTypes.GET_ATM_DATA_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ATM_DATA_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_ATM_DATA_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add ATM

    case actionTypes.ADD_ATM_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_ATM_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_ATM_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.RESET_ATM: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update Branch
    case actionTypes.UPDATE_ATM_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_ATM_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_ATM_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_ATM_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_ATM_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_ATM_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_ATM_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_ATM_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_ATM_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //Enable
    case actionTypes.DISABLE_ATM_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_ATM_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_ATM_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }

    //Enable
    case actionTypes.SINGLE_ENABLE_ATM_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_ATM_SUCCESS: {
      const changedData: any = action.payload?.data?.atm
      let newData = state?.data?.atm?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, atm: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_ATM_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_ATM_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_ATM_SUCCESS: {
      const changedData: any = action.payload?.data?.atm
      let newData = state?.data?.atm?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, atm: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_ATM_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    //Import
    case actionTypes.IMPORT_ATM_START: {
      return {...state, loading: true}
    }

    case actionTypes.IMPORT_ATM_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        importSuccess: true,
      }
    }

    case actionTypes.IMPORT_ATM_FINISH: {
      const error = action.payload
      return {...state, error, loading: false, importSuccess: false}
    }

    case actionTypes.EXPORT_ATM_FILE_START: {
      return {...state, loading: true}
    }

    case actionTypes.EXPORT_ATM_FILE_SUCCESS: {
      return {...state, data: action.payload?.data, exportSuccess: true, loading: false}
    }

    case actionTypes.EXPORT_ATM_FILE_FINISH: {
      const error = action.payload
      return {...state, error, exportSuccess: false, loading: false}
    }

    default:
      return state
  }
}
