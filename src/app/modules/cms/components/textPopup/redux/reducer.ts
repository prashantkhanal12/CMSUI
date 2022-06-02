import {Action} from 'redux'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialTextPopupState: ITextPopupState = {
  data: {
    textPopup: [],
    meta: {},
  },
  sortTextPopupData: [],
  loading: false,
  success: false,
  editSuccess: false,
  activateSuccess: false,
  deactivateSuccess: false,
  deleteSuccess: false,
  toggleLoading: false,
  singleActivateSuccess: false,
  singleDeactivateSuccess: false,
}

export interface ITextPopupState {
  data: {
    textPopup: {[key: string]: number | string}[]
    meta: {[key: string]: number}
  }
  sortTextPopupData?: []
  loading?: boolean
  success?: boolean
  editSuccess?: boolean
  activateSuccess?: boolean
  deactivateSuccess?: boolean
  deleteSuccess?: boolean
  toggleLoading?: boolean
  singleActivateSuccess?: boolean
  singleDeactivateSuccess?: boolean
}

export const reducer = (
  state: ITextPopupState = initialTextPopupState,
  action: ActionWithPayload<ITextPopupState>
) => {
  switch (action.type) {
    //Get Text Popup Reducer
    case actionTypes.GET_TEXT_POPUP_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_TEXT_POPUP_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.GET_TEXT_POPUP_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add TextPopup Reducer
    case actionTypes.ADD_TEXT_POPUP_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_TEXT_POPUP_SUCCESS: {
      //const textPopupData = action.payload
      return {...state, data: action?.payload?.data, success: true, loading: false}
    }

    case actionTypes.ADD_TEXT_POPUP_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.ADD_TEXT_POPUP_RESET: {
      return {...state, success: false, data: [], loading: false}
    }

    //update TextPopup
    case actionTypes.UPDATE_TEXT_POPUP_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_TEXT_POPUP_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_TEXT_POPUP_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.UPDATE_TEXT_POPUP_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }
    //Delete TextPopup
    case actionTypes.DELETE_TEXT_POPUP_START: {
      return {...state, loading: true, deleteSuccess: false}
    }

    case actionTypes.DELETE_TEXT_POPUP_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_TEXT_POPUP_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Activate TextPopup
    case actionTypes.ACTIVATE_TEXT_POPUP_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ACTIVATE_TEXT_POPUP_SUCCESS: {
      return {...state, activateSuccess: true, loading: false}
    }
    case actionTypes.ACTIVATE_TEXT_POPUP_FINISH: {
      return {...state, activateSuccess: false, loading: false}
    }

    //Single Activate Textpopup
    case actionTypes.SINGLE_ACTIVATE_TEXT_POPUP_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_TEXT_POPUP_SUCCESS: {
      const changedData: any = action.payload?.data?.textPopup
      let newData = state?.data?.textPopup?.map((data) => {
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
        data: {...state?.data?.meta, textPopup: newData},
        singleActivateSuccess: true,
        toggleLoading: false,
      }
    }
    case actionTypes.SINGLE_ACTIVATE_TEXT_POPUP_FINISH: {
      return {...state, singleActivateSuccess: false, toggleLoading: false}
    }

    //Deactivate TextPopup
    case actionTypes.DEACTIVATE_TEXT_POPUP_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DEACTIVATE_TEXT_POPUP_SUCCESS: {
      return {...state, deactivateSuccess: true, loading: false}
    }

    case actionTypes.DEACTIVATE_TEXT_POPUP_FINISH: {
      return {...state, deactivateSuccess: false, loading: false}
    }

    case actionTypes.SINGLE_DEACTIVATE_TEXT_POPUP_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DEACTIVATE_TEXT_POPUP_SUCCESS: {
      const changedData: any = action.payload?.data?.textPopup
      let newData = state?.data?.textPopup?.map((data) => {
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
        data: {...state?.data?.meta, textPopup: newData},
        singleDeactivateSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DEACTIVATE_TEXT_POPUP_FINISH: {
      return {...state, singleDeactivateSuccess: false, toggleLoading: false}
    }

    //Sort Text Popup
    case actionTypes.SORT_TEXT_POPUP_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_TEXT_POPUP_SUCCESS: {
      return {
        ...state,
        sortTextPopupData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_TEXT_POPUP_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_TEXT_POPUP_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortTextPopupData: [],
      }
    }

    default:
      return state
  }
}
