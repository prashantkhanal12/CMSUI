import {Action} from 'redux'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialformDownloadState: IformDownloadState = {
  data: {
    formDownload: [],
    meta: [],
  },
  sortFormDownloadData: [],
  formDownloadList: {formDownload: []},
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IformDownloadState {
  data?: {
    formDownload?: any
    meta?: {[key: string]: string | number}[]
  }
  sortFormDownloadData?: IformDownloadState[]
  formDownloadList?: {formDownload: any}
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IformDownloadState = initialformDownloadState,
  action: ActionWithPayload<IformDownloadState>
) => {
  switch (action.type) {
    case actionTypes.GET_ALL_FORMS_DOWNLOAD_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_FORMS_DOWNLOAD_SUCCESS: {
      return {...state, data: action.payload, formDownloadList: action.payload, loading: false}
    }

    case actionTypes.GET_ALL_FORMS_DOWNLOAD_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET formDownload DATA
    case actionTypes.GET_FORMS_DOWNLOAD_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_FORMS_DOWNLOAD_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_FORMS_DOWNLOAD_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add formDownload
    case actionTypes.ADD_FORMS_DOWNLOAD_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_FORMS_DOWNLOAD_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_FORMS_DOWNLOAD_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.RESET_FORMS_DOWNLOAD: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update formDownload
    case actionTypes.UPDATE_FORMS_DOWNLOAD_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_FORMS_DOWNLOAD_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_FORMS_DOWNLOAD_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_FORMS_DOWNLOAD_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_FORMS_DOWNLOAD_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_FORMS_DOWNLOAD_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_FORMS_DOWNLOAD_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_FORMS_DOWNLOAD_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_FORMS_DOWNLOAD_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_FORMS_DOWNLOAD_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_FORMS_DOWNLOAD_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_FORMS_DOWNLOAD_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_FORMS_DOWNLOAD_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_FORMS_DOWNLOAD_SUCCESS: {
      const changedData: any = action.payload?.data?.formDownload
      let newData = state?.data?.formDownload?.map((data: any) => {
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
        data: {...state, meta: state?.data?.meta, formDownload: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_FORMS_DOWNLOAD_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_FORMS_DOWNLOAD_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_FORMS_DOWNLOAD_SUCCESS: {
      const changedData: any = action.payload?.data?.formDownload
      let newData = state?.data?.formDownload?.map((data: any) => {
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
        data: {...state, meta: state?.data?.meta, formDownload: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_FORMS_DOWNLOAD_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    // sort
    case actionTypes.SORT_FORMS_DOWNLOAD_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_FORMS_DOWNLOAD_SUCCESS: {
      return {
        ...state,
        sortformDownloadData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_FORMS_DOWNLOAD_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_FORMS_DOWNLOAD_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortformDownloadData: [],
      }
    }

    default:
      return state
  }
}
