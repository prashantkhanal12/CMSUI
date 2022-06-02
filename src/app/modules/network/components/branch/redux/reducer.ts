import {Action} from 'redux'
import {OptionModel} from '../Model'
import {BranchModel} from '../Model/BranchModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialBranchState: IBranchState = {
  category: [],
  branchExtendedHourStatus: [],
  data: {
    branch: [],
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

export interface IBranchState {
  data?: {
    branch?: BranchModel[]
    meta?: {[key: string]: string | number}[]
  }
  category?: OptionModel[]
  branchExtendedHourStatus?: OptionModel[]
  exportSuccess?: boolean
  templateExport?: boolean
  deleteSuccess?: boolean
  importSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IBranchState = initialBranchState,
  action: ActionWithPayload<IBranchState>
) => {
  switch (action.type) {
    case actionTypes.GET_BRANCH_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_BRANCH_CATEGORY_SUCCESS: {
      return {...state, category: action.payload?.category, loading: false}
    }

    case actionTypes.GET_BRANCH_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //EXTENDED HOURS
    case actionTypes.GET_EXTENDED_HOURS_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_EXTENDED_HOURS_SUCCESS: {
      return {
        ...state,
        branchExtendedHourStatus: action.payload?.branchExtendedHourStatus,
        loading: false,
      }
    }

    case actionTypes.GET_EXTENDED_HOURS_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET BRANCH DATA
    case actionTypes.GET_BRANCH_DATA_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_BRANCH_DATA_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_BRANCH_DATA_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET ALL BRANCH DATA
    case actionTypes.GET_ALL_BRANCH_DATA_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_BRANCH_DATA_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_ALL_BRANCH_DATA_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add Branch
    case actionTypes.ADD_BRANCH_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_BRANCH_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_BRANCH_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.RESET_BRANCH: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update Branch
    case actionTypes.UPDATE_BRANCH_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_BRANCH_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_BRANCH_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_BRANCH_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_BRANCH_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_BRANCH_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_BRANCH_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_BRANCH_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_BRANCH_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_BRANCH_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_BRANCH_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_BRANCH_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }

    //Enable
    case actionTypes.SINGLE_ENABLE_BRANCH_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_BRANCH_SUCCESS: {
      const changedData: any = action.payload?.data?.branch
      let newData = state?.data?.branch?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, branch: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_BRANCH_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_BRANCH_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_BRANCH_SUCCESS: {
      const changedData: any = action.payload?.data?.branch
      let newData = state?.data?.branch?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, branch: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_BRANCH_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    //Import
    case actionTypes.IMPORT_BRANCH_START: {
      return {...state, loading: true}
    }

    case actionTypes.IMPORT_BRANCH_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        importSuccess: true,
      }
    }

    case actionTypes.IMPORT_BRANCH_FINISH: {
      const error = action.payload
      return {...state, error, loading: false, importSuccess: false}
    }

    case actionTypes.EXPORT_BRANCH_FILE_START: {
      return {...state, loading: true}
    }

    case actionTypes.EXPORT_BRANCH_FILE_SUCCESS: {
      return {...state, exportSuccess: true, loading: false}
    }

    case actionTypes.EXPORT_BRANCH_FILE_FINISH: {
      const error = action.payload
      return {...state, error, exportSuccess: false, loading: false}
    }

    case actionTypes.EXPORT_BRANCH_TEMPLATE_FILE_START: {
      return {...state, loading: true}
    }

    case actionTypes.EXPORT_BRANCH_TEMPLATE_FILE_SUCCESS: {
      return {...state, templateExport: true, loading: false}
    }

    case actionTypes.EXPORT_BRANCH_TEMPLATE_FILE_FINISH: {
      const error = action.payload
      return {...state, error, templateExport: false, loading: false}
    }

    default:
      return state
  }
}
