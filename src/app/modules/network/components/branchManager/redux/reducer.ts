import {Action} from 'redux'
import {BranchManagerModel} from '../Model/BranchManagerModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialBranchManagerState: IBranchManagerState = {
  data: {
    manager: [],
    bankManager: [],
    meta: [],
  },
  importSuccess: false,
  exportSuccess: false,
  templateExport: false,
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IBranchManagerState {
  data?: {
    manager?: BranchManagerModel[]
    bankManager?: BranchManagerModel[]
    meta?: {[key: string]: string | number}[]
  }

  deleteSuccess?: boolean
  templateExport?: boolean
  importSuccess?: boolean
  exportSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IBranchManagerState = initialBranchManagerState,
  action: ActionWithPayload<IBranchManagerState>
) => {
  switch (action.type) {
    //GET ATM DATA
    case actionTypes.GET_BRANCH_MANAGER_DATA_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_BRANCH_MANAGER_DATA_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_BRANCH_MANAGER_DATA_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add ATM

    case actionTypes.ADD_BRANCH_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_BRANCH_MANAGER_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_BRANCH_MANAGER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.RESET_BRANCH_MANAGER: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update Branch
    case actionTypes.UPDATE_BRANCH_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_BRANCH_MANAGER_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_BRANCH_MANAGER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_BRANCH_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_BRANCH_MANAGER_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_BRANCH_MANAGER_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_BRANCH_MANAGER_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_BRANCH_MANAGER_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_BRANCH_MANAGER_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //Enable
    case actionTypes.DISABLE_BRANCH_MANAGER_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_BRANCH_MANAGER_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_BRANCH_MANAGER_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }

    //Enable
    case actionTypes.SINGLE_ENABLE_BRANCH_MANAGER_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_BRANCH_MANAGER_SUCCESS: {
      const changedData: any = action.payload?.data?.bankManager
      let newData = state?.data?.manager?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, manager: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_BRANCH_MANAGER_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_BRANCH_MANAGER_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_BRANCH_MANAGER_SUCCESS: {
      const changedData: any = action.payload?.data?.bankManager
      let newData = state?.data?.manager?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, manager: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_BRANCH_MANAGER_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    //Import
    case actionTypes.IMPORT_BRANCH_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.IMPORT_BRANCH_MANAGER_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        importSuccess: true,
      }
    }

    case actionTypes.IMPORT_BRANCH_MANAGER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false, importSuccess: false}
    }

    case actionTypes.EXPORT_BRANCH_MANAGER_FILE_START: {
      return {...state, loading: true}
    }

    case actionTypes.EXPORT_BRANCH_MANAGER_FILE_SUCCESS: {
      return {...state, data: action.payload?.data, exportSuccess: true, loading: false}
    }

    case actionTypes.EXPORT_BRANCH_MANAGER_FILE_FINISH: {
      const error = action.payload
      return {...state, error, exportSuccess: false, loading: false}
    }

    case actionTypes.EXPORT_BRANCH_MANAGER_TEMPLATE_FILE_START: {
      return {...state, loading: true}
    }

    case actionTypes.EXPORT_BRANCH_MANAGER_TEMPLATE_FILE_SUCCESS: {
      return {...state, templateExport: true, loading: false}
    }

    case actionTypes.EXPORT_BRANCH_MANAGER_TEMPLATE_FILE_FINISH: {
      const error = action.payload
      return {...state, error, templateExport: false, loading: false}
    }

    default:
      return state
  }
}
