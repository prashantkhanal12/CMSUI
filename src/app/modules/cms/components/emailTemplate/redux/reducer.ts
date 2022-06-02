import {Action} from 'redux'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialEmailTemplateState: IEmailTemplateState = {
  data: {
    template: [],
    meta: {},
  },
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IEmailTemplateState {
  data?: {
    template?: {[key: string]: number | string}[]
    meta: {[key: string]: number}
  }
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IEmailTemplateState = initialEmailTemplateState,
  action: ActionWithPayload<IEmailTemplateState>
) => {
  switch (action.type) {
    //GET Email Template Data
    case actionTypes.GET_EMAIL_TEMPLATE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_EMAIL_TEMPLATE_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_EMAIL_TEMPLATE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add Email Template
    case actionTypes.ADD_EMAIL_TEMPLATE_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_EMAIL_TEMPLATE_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_EMAIL_TEMPLATE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.RESET_EMAIL_TEMPLATE: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update Email Template
    case actionTypes.UPDATE_EMAIL_TEMPLATE_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_EMAIL_TEMPLATE_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_EMAIL_TEMPLATE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete Email Template
    case actionTypes.DELETE_EMAIL_TEMPLATE_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_EMAIL_TEMPLATE_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_EMAIL_TEMPLATE_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    default:
      return state
  }
}
