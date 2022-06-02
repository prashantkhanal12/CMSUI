import {Action} from 'redux'
import {DocumentSubCategoryModel} from '../Model/DocumentSubCategoryModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialDocumentSubCategoryState: IDocumentSubCategoryState = {
  data: {
    documentSubCategory: [],
    meta: [],
  },
  sortDocumentSubCategoryData: [],
  documentSubCategoryList: {documentSubCategory: []},
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IDocumentSubCategoryState {
  data?: {
    documentSubCategory?: DocumentSubCategoryModel[]
    meta?: {[key: string]: string | number}[]
  }
  sortDocumentSubCategoryData?: IDocumentSubCategoryState[]
  documentSubCategoryList?: {documentSubCategory: DocumentSubCategoryModel[]}
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IDocumentSubCategoryState = initialDocumentSubCategoryState,
  action: ActionWithPayload<IDocumentSubCategoryState>
) => {
  switch (action.type) {
    case actionTypes.GET_ALL_DOCUMENT_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_DOCUMENT_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        documentSubCategoryList: action.payload,
        loading: false,
      }
    }

    case actionTypes.GET_ALL_DOCUMENT_SUB_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET DocumentSubCategory DATA
    case actionTypes.GET_DOCUMENT_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_DOCUMENT_SUB_CATEGORY_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_DOCUMENT_SUB_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add DocumentSubCategory
    case actionTypes.ADD_DOCUMENT_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_DOCUMENT_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_DOCUMENT_SUB_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.RESET_DOCUMENT_SUB_CATEGORY: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update DocumentSubCategory
    case actionTypes.UPDATE_DOCUMENT_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_DOCUMENT_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_DOCUMENT_SUB_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_DOCUMENT_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_DOCUMENT_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_DOCUMENT_SUB_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_DOCUMENT_SUB_CATEGORY_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_DOCUMENT_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_DOCUMENT_SUB_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_DOCUMENT_SUB_CATEGORY_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_DOCUMENT_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_DOCUMENT_SUB_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_DOCUMENT_SUB_CATEGORY_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_DOCUMENT_SUB_CATEGORY_SUCCESS: {
      const changedData: any = action.payload?.data?.documentSubCategory
      let newData = state?.data?.documentSubCategory?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, documentSubCategory: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_DOCUMENT_SUB_CATEGORY_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_DOCUMENT_SUB_CATEGORY_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_DOCUMENT_SUB_CATEGORY_SUCCESS: {
      const changedData: any = action.payload?.data?.documentSubCategory
      let newData = state?.data?.documentSubCategory?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, documentSubCategory: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_DOCUMENT_SUB_CATEGORY_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    // sort
    case actionTypes.SORT_DOCUMENT_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_DOCUMENT_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        sortDocumentSubCategoryData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_DOCUMENT_SUB_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_DOCUMENT_SUB_CATEGORY_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortDocumentSubCategoryData: [],
      }
    }
    default:
      return state
  }
}
