import {Action} from 'redux'
import {GalleryModel} from '../Model'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialGalleryState: IGalleryState = {
  data: {
    album: [],
    meta: {},
  },
  sortGalleryData: [],
  galleryList: {album: []},
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IGalleryState {
  data: {
    album: {[key: string]: number | string}[]
    meta: {[key: string]: number}
  }
  sortGalleryData?: IGalleryState[]
  galleryList?: {album: GalleryModel[] | any}
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IGalleryState = initialGalleryState,
  action: ActionWithPayload<IGalleryState>
) => {
  switch (action.type) {
    //GET Gallery Data
    case actionTypes.GET_GALLERY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_GALLERY_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_GALLERY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add Gallery
    case actionTypes.ADD_GALLERY_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_GALLERY_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_GALLERY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.RESET_GALLERY_TYPE: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update Gallery
    case actionTypes.UPDATE_GALLERY_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_GALLERY_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_GALLERY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_GALLERY_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_GALLERY_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_GALLERY_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_GALLERY_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_GALLERY_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_GALLERY_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_GALLERY_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_GALLERY_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_GALLERY_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_GALLERY_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_GALLERY_SUCCESS: {
      const changedData: any = action.payload?.data?.album
      let newData = state?.data?.album?.map((data) => {
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
        data: {...state?.data?.meta, album: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_GALLERY_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_GALLERY_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_GALLERY_SUCCESS: {
      const changedData: any = action.payload?.data?.album
      let newData = state?.data?.album?.map((data) => {
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
        data: {...state?.data?.meta, album: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_GALLERY_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    //Get Gallery Reducer
    case actionTypes.GET_ALL_GALLERY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_GALLERY_SUCCESS: {
      return {
        ...state,
        data: action.payload?.data,
        galleryList: action.payload?.data,
        loading: false,
      }
    }

    case actionTypes.GET_ALL_GALLERY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    // sort
    case actionTypes.SORT_GALLERY_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_GALLERY_SUCCESS: {
      return {
        ...state,
        sortGalleryData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_GALLERY_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_GALLERY_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortGalleryData: [],
      }
    }
    default:
      return state
  }
}
