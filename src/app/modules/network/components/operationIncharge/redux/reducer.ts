import {Action} from 'redux'
import {OperationInchargeModel} from '../Model/OperationInchargeModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialBranchState: IOperationInchargeState = {
  data: {
    operationIncharge: [],
    meta: {},
  },
  loading: false,
  success: false,
  deleteSuccess: false,
}

export interface IOperationInchargeState {
  data: {
    operationIncharge: OperationInchargeModel[]
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
  state: IOperationInchargeState = initialBranchState,
  action: ActionWithPayload<IOperationInchargeState>
) => {
  switch (action.type) {
    case actionTypes.GET_OPERATION_INCHARGE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_OPERATION_INCHARGE_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.GET_OPERATION_INCHARGE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.ADD_OPERATION_INCHARGE_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_OPERATION_INCHARGE_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_OPERATION_INCHARGE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.ADD_OPERATION_INCHARGE_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    case actionTypes.UPDATE_OPERATION_INCHARGE_START: {
      return {
        ...state,
        loading: true,
      }
    }

    case actionTypes.UPDATE_OPERATION_INCHARGE_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_OPERATION_INCHARGE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.UPDATE_OPERATION_INCHARGE_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    case actionTypes.DELETE_OPERATION_INCHARGE_START: {
      return {...state, loading: true, deleteSuccess: false}
    }

    case actionTypes.DELETE_OPERATION_INCHARGE_SUCCESS: {
      return {
        ...state,
        loading: false,
        deleteSuccess: true,
      }
    }

    case actionTypes.DELETE_OPERATION_INCHARGE_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Singer activate branchless banking
    //Activate Users
    case actionTypes.SINGLE_ACTIVATE_OPERATION_INCHARGE_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_OPERATION_INCHARGE_SUCCESS: {
      return {...state, activateSuccess: true, loading: false}
    }
    case actionTypes.SINGLE_ACTIVATE_OPERATION_INCHARGE_FINISH: {
      return {...state, activateSuccess: false, loading: false}
    }

    case actionTypes.SINGLE_DEACTIVATE_OPERATION_INCHARGE_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.SINGLE_DEACTIVATE_OPERATION_INCHARGE_SUCCESS: {
      return {...state, deactivateSuccess: true, loading: false}
    }

    case actionTypes.SINGLE_DEACTIVATE_OPERATION_INCHARGE_FINISH: {
      return {...state, deactivateSuccess: false, loading: false}
    }

    // case actionTypes.SINGLE_ACTIVATE_OPERATION_INCHARGE_REQUEST: {
    //   return {...state, toggleLoading: true}
    // }

    // case actionTypes.SINGLE_ACTIVATE_OPERATION_INCHARGE_SUCCESS: {
    //   const changedData: any = action.payload
    //   let newData = state?.data?.operationIncharge?.map((data) => {
    //     if (data?.id === changedData?.operationIncharge[0]?.id) {
    //       return {
    //         ...data,
    //         status: !data?.status,
    //       }
    //     } else {
    //       return data
    //     }
    //   })

    //   return {
    //     ...state,
    //     data: {...state?.data?.meta, operationIncharge: newData},
    //     singleActivateSuccess: true,
    //     toggleLoading: false,
    //   }
    // }
    // case actionTypes.SINGLE_ACTIVATE_OPERATION_INCHARGE_FINISH: {
    //   return {...state, singleActivateSuccess: false, toggleLoading: false}
    // }

    //Singer Deactivate branchless banking
    case actionTypes.SINGLE_DEACTIVATE_OPERATION_INCHARGE_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DEACTIVATE_OPERATION_INCHARGE_SUCCESS: {
      const changedData: any = action.payload
      let newData = state?.data?.operationIncharge?.map((data) => {
        if (data?.id === changedData?.operationIncharge[0]?.id) {
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
        data: {...state,meta:state?.data?.meta, operationIncharge: newData},
        singleDeactivateSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DEACTIVATE_OPERATION_INCHARGE_FINISH: {
      return {...state, singleDeactivateSuccess: false, toggleLoading: false}
    }

    //Import
    case actionTypes.IMPORT_OPERATION_INCHARGE_START: {
      return {...state, loading: true}
    }

    case actionTypes.IMPORT_OPERATION_INCHARGE_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        success: true,
      }
    }

    case actionTypes.IMPORT_OPERATION_INCHARGE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false, success: false}
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
    case actionTypes.EXPORT_FILE_START: {
      return {...state, loading: true}
    }

    case actionTypes.EXPORT_FILE_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.EXPORT_FILE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    default:
      return state
  }
}
