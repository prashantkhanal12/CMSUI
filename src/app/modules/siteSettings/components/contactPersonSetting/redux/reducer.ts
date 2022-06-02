import {Action} from 'redux'
import {ContactPersonModel} from '../Model/ContactPersonModel'

import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialContactPersonState: IContactPersonState = {
  data: {
    contactPersonSetting: [],
    meta: [],
  },
  sortContactPersonData: [],

  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IContactPersonState {
  data?: {
    contactPersonSetting?: ContactPersonModel[]
    meta?: {[key: string]: string | number}[]
  }
  sortContactPersonData?: IContactPersonState[]
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IContactPersonState = initialContactPersonState,
  action: ActionWithPayload<IContactPersonState>
) => {
  switch (action.type) {
    //GET Member DATA
    case actionTypes.GET_CONTACT_PERSON_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_CONTACT_PERSON_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_CONTACT_PERSON_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add Member
    case actionTypes.ADD_CONTACT_PERSON_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_CONTACT_PERSON_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_CONTACT_PERSON_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.RESET_CONTACT_PERSON: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update Member
    case actionTypes.UPDATE_CONTACT_PERSON_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_CONTACT_PERSON_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_CONTACT_PERSON_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_CONTACT_PERSON_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_CONTACT_PERSON_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_CONTACT_PERSON_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }
    // sort
    case actionTypes.SORT_CONTACT_PERSON_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_CONTACT_PERSON_SUCCESS: {
      return {
        ...state,
        sortContactPersonData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_CONTACT_PERSON_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_CONTACT_PERSON_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortContactPersonData: [],
      }
    }

    default:
      return state
  }
}
