import {Action} from 'redux'
import {DocumentModel} from '../Model/DocumentModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialDocumentState: IDocumentState = {
  data: {
    document: [],
    meta: [],
  },
  sortDocumentData: [],
  documentList: {document: []},
  fiscal_year: [],
  quater: [],
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IDocumentState {
  data?: {
    document?: DocumentModel[]
    meta?: {[key: string]: string | number}[]
  }
  sortDocumentData?: IDocumentState[]
  documentList?: {document: DocumentModel[]}
  fiscal_year?: {[key: string]: string}[]
  quater?: {[key: string]: string}[]
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IDocumentState = initialDocumentState,
  action: ActionWithPayload<IDocumentState>
) => {
  switch (action.type) {
    case actionTypes.GET_ALL_DOCUMENT_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_DOCUMENT_SUCCESS: {
      return {...state, data: action.payload, documentList: action.payload, loading: false}
    }

    case actionTypes.GET_ALL_DOCUMENT_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.GET_FISCAL_YEAR_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_FISCAL_YEAR_SUCCESS: {
      return {...state, fiscal_year: action.payload?.fiscal_year, loading: false}
    }

    case actionTypes.GET_FISCAL_YEAR_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.GET_QUATER_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_QUATER_SUCCESS: {
      return {...state, quater: action.payload?.quater, loading: false}
    }

    case actionTypes.GET_QUATER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET Document DATA
    case actionTypes.GET_DOCUMENT_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_DOCUMENT_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_DOCUMENT_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add Document
    case actionTypes.ADD_DOCUMENT_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_DOCUMENT_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_DOCUMENT_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.RESET_DOCUMENT: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update Document
    case actionTypes.UPDATE_DOCUMENT_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_DOCUMENT_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_DOCUMENT_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_DOCUMENT_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_DOCUMENT_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_DOCUMENT_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_DOCUMENT_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_DOCUMENT_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_DOCUMENT_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_DOCUMENT_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_DOCUMENT_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_DOCUMENT_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_DOCUMENT_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_DOCUMENT_SUCCESS: {
      const changedData: any = action.payload?.data?.document
      let newData = state?.data?.document?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, document: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_DOCUMENT_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_DOCUMENT_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_DOCUMENT_SUCCESS: {
      const changedData: any = action.payload?.data?.document
      let newData = state?.data?.document?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, document: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_DOCUMENT_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    // sort
    case actionTypes.SORT_DOCUMENT_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_DOCUMENT_SUCCESS: {
      return {
        ...state,
        sortDocumentData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_DOCUMENT_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_DOCUMENT_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortDocumentData: [],
      }
    }

    default:
      return state
  }
}
