import {Action} from 'redux'
import {QualificationModel} from '../Model'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialQaulificationState: IQualificationState = {
  data: {
    qualification: [],
    meta: {},
  },
  deleteSuccess: false,
  loading: false,
  success: false,
}

export interface IQualificationState {
  data?: {
    qualification?: QualificationModel[]
    meta?: {[key: string]: number}
  }
  activateSuccess?: boolean
  deactivateSuccess?: boolean
  singleActivateSuccess?: boolean
  singleDeactivateSuccess?: boolean
  deleteSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IQualificationState = initialQaulificationState,
  action: ActionWithPayload<IQualificationState>
) => {
  switch (action.type) {
    //GET Qualification DATA
    case actionTypes.GET_QUALIFICATION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_QUALIFICATION_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_QUALIFICATION_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add Qualification SUB CATEGORY
    case actionTypes.ADD_QUALIFICATION_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_QUALIFICATION_SUCCESS: {
      return {
        ...state,
        data: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_QUALIFICATION_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.ADD_QUALIFICATION_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update Qualification
    case actionTypes.UPDATE_QUALIFICATION_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_QUALIFICATION_SUCCESS: {
      return {
        ...state,
        data: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_QUALIFICATION_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_QUALIFICATION_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_QUALIFICATION_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_QUALIFICATION_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_QUALIFICATION_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_QUALIFICATION_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_QUALIFICATION_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_QUALIFICATION_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_QUALIFICATION_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_QUALIFICATION_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //SINGLE Enable
    case actionTypes.SINGLE_ACTIVATE_QUALIFICATION_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_QUALIFICATION_SUCCESS: {
      const changedData: any = action.payload?.data?.qualification
      let newData = state?.data?.qualification?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, member: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ACTIVATE_QUALIFICATION_REQUEST: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //SINGLE Disable
    case actionTypes.SINGLE_ACTIVATE_QUALIFICATION_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_QUALIFICATION_SUCCESS: {
      const changedData: any = action.payload?.data?.qualification
      let newData = state?.data?.qualification?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, member: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DEACTIVATE_QUALIFICATION_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    default:
      return state
  }
}
