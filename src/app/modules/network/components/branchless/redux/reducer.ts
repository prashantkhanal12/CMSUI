import {Action} from 'redux'
import {BranchlessModel} from '../Model/BranchlessModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialBranchState: IBranchlessState = {
  data: {
    branchlessBanking: [],
    meta: {},
  },
  loading: false,
  success: false,
  deleteSuccess: false,
}

export interface IBranchlessState {
  data: {
    branchlessBanking: BranchlessModel[]
    meta: {[key: string]: number}
  }
  activateSuccess?: boolean
  deactivateSuccess?: boolean
  singleActivateSuccess?: boolean
  singleDeactivateSuccess?: boolean
  loading?: boolean
  success?: boolean
  deleteSuccess?: boolean
}

export const reducer = (
  state: IBranchlessState = initialBranchState,
  action: ActionWithPayload<IBranchlessState>
) => {
  switch (action.type) {
    case actionTypes.GET_BRANCHLESS_BANKING_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_BRANCHLESS_BANKING_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.GET_BRANCHLESS_BANKING_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.ADD_BRANCHLESS_BANKING_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_BRANCHLESS_BANKING_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_BRANCHLESS_BANKING_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.ADD_BRANCHLESS_BANKING_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    case actionTypes.UPDATE_BRANCHLESS_BANKING_START: {
      return {
        ...state,
        loading: true,
      }
    }

    case actionTypes.UPDATE_BRANCHLESS_BANKING_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_BRANCHLESS_BANKING_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.UPDATE_BRANCHLESS_BANKING_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    case actionTypes.DELETE_BRANCHLESS_BANKING_START: {
      return {...state, loading: true, deleteSuccess: false}
    }

    case actionTypes.DELETE_BRANCHLESS_BANKING_SUCCESS: {
      return {
        ...state,
        loading: false,
        deleteSuccess: true,
      }
    }

    case actionTypes.DELETE_BRANCHLESS_BANKING_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Singer activate branchless banking

    case actionTypes.SINGLE_ACTIVATE_BRANCHLESS_BANKING_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_BRANCHLESS_BANKING_SUCCESS: {
      const changedData: any = action.payload
      let newData = state?.data?.branchlessBanking?.map((data) => {
        if (data?.id === changedData?.branchlessBanking[0]?.id) {
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
        data: {...state, meta: state?.data?.meta, branchlessBanking: newData},
        singleActivateSuccess: true,
        toggleLoading: false,
      }
    }
    case actionTypes.SINGLE_ACTIVATE_BRANCHLESS_BANKING_FINISH: {
      return {...state, singleActivateSuccess: false, toggleLoading: false}
    }

    //Singer Deactivate branchless banking
    case actionTypes.SINGLE_DEACTIVATE_BRANCHLESS_BANKING_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DEACTIVATE_BRANCHLESS_BANKING_SUCCESS: {
      const changedData: any = action.payload
      let newData = state?.data?.branchlessBanking?.map((data) => {
        if (data?.id === changedData?.branchlessBanking[0]?.id) {
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
        data: {...state, meta: state?.data?.meta, branchlessBanking: newData},
        singleDeactivateSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DEACTIVATE_BRANCHLESS_BANKING_FINISH: {
      return {...state, singleDeactivateSuccess: false, toggleLoading: false}
    }

    default:
      return state
  }
}

const initialExportFileState: IExportFileState = {
  data: {
    file: {},
  },
  loading: false,
  success: false,
}

export interface IExportFileState {
  data: {
    file: {[key: string]: number}
  }
  loading?: boolean
  success?: boolean
}

export const reducer1 = (
  state: IExportFileState = initialExportFileState,
  action: ActionWithPayload<IExportFileState>
) => {
  switch (action.type) {
    case actionTypes.EXPORT_BRANCHLESS_FILE_START: {
      return {...state, loading: true}
    }

    case actionTypes.EXPORT_BRANCHLESS_FILE_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.EXPORT_BRANCHLESS_FILE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    default:
      return state
  }
}
