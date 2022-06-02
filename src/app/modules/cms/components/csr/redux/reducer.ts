import {Action} from 'redux'
import {OptionModel} from 'src/app/modules/membership/components/member/Model'
import {CsrModel, CsrOptionModel} from '../Model'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialCsrState: ICsrState = {
  data: {
    csr: [],
    // csrFileOption: [],
    meta: {},
  },
  csrFileType: [],
  csrList: {csr: []},
  sortCsrData: [],
  deleteSuccess: false,
  activateSuccess: false,
  deactivateSuccess: false,
  singleActivateSuccess: false,
  singleDeactivateSuccess: false,
  loading: false,
  success: false,
}

export interface ICsrState {
  data: {
    csr: CsrModel[]
    meta: {[key: string]: number}
  }
  csrFileType: CsrOptionModel[]
  csrList: {csr: CsrModel[] | any}
  sortCsrData: ICsrState[]
  deleteSuccess?: boolean
  activateSuccess?: boolean
  deactivateSuccess?: boolean
  singleActivateSuccess?: boolean
  singleDeactivateSuccess?: boolean
  toggleLoading?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: ICsrState = initialCsrState,
  action: ActionWithPayload<ICsrState>
) => {
  switch (action.type) {
    //* GET CSR_FILE_TYPE DATA
    case actionTypes.GET_CSR_FILE_TYPE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_CSR_FILE_TYPE_SUCCESS: {
      return {...state, csrFileType: action.payload, loading: false}
    }

    case actionTypes.GET_CSR_FILE_TYPE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //* GET CSR_ITEM DATA
    case actionTypes.GET_CSR_DATA_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_CSR_DATA_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_CSR_DATA_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }
    //* GET CSR_LIST DATA
    case actionTypes.GET_CSR_LIST_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_CSR_LIST_SUCCESS: {
      return {...state, csrList: action.payload, loading: false}
    }

    case actionTypes.GET_CSR_LIST_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //* ADD CMS ITEM

    case actionTypes.ADD_CSR_ITEM_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_CSR_ITEM_SUCCESS: {
      return {
        ...state,
        data: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_CSR_ITEM_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.ADD_CSR_ITEM_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //* UPDATE CSR ITEM
    case actionTypes.UPDATE_CSR_ITEM_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_CSR_ITEM_SUCCESS: {
      return {
        ...state,
        data: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_CSR_ITEM_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //* DELETE CSR ITEM
    case actionTypes.DELETE_BULK_CSR_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_BULK_CSR_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_BULK_CSR_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ACTIVATE_CSR_START: {
      return {...state, loading: true}
    }

    case actionTypes.ACTIVATE_CSR_SUCCESS: {
      return {
        ...state,
        activateSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ACTIVATE_CSR_FINISH: {
      return {
        ...state,
        loading: false,
        activateSuccess: false,
      }
    }

    //disable
    case actionTypes.DEACTIVATE_CSR_START: {
      return {...state, loading: true}
    }

    case actionTypes.DEACTIVATE_CSR_SUCCESS: {
      return {
        ...state,
        deactivateSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DEACTIVATE_CSR_FINISH: {
      return {
        ...state,
        loading: false,
        deactivateSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ACTIVATE_CSR_START: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_CSR_SUCCESS: {
      const changedData: any = action.payload?.data?.csr
      let newData = state?.data?.csr?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, csr: newData},
        singleActivateSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ACTIVATE_CSR_FINISH: {
      return {
        ...state,
        singleActivateSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DEACTIVATE_CSR_START: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DEACTIVATE_CSR_SUCCESS: {
      const changedData: any = action.payload?.data?.csr
      let newData = state?.data?.csr?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, csr: newData},
        singleDeactivateSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DEACTIVATE_CSR_FINISH: {
      return {
        ...state,
        singleDeactivateSuccess: false,
        toggleLoading: false,
      }
    }
    // sort
    case actionTypes.SORT_CSR_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_CSR_SUCCESS: {
      return {
        ...state,
        sortCsrData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_CSR_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_CSR_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortCsrData: [],
      }
    }

    default:
      return state
  }
}
