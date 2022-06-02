import {Action} from 'redux'
import {CmsCategoriesModel} from '../Model/CmsCategoriesModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialCmsCategoriesState: ICmsCategoriesState = {
  data: {
    category: [],
    meta: {},
  },
  sortCategoriesData: [],
  deleteSuccess: false,
  loading: false,
  success: false,
}

export interface ICmsCategoriesState {
  data: {
    category: CmsCategoriesModel[]
    meta: {[key: string]: number}
  }
  sortCategoriesData: CmsCategoriesModel[]
  activateSuccess?: boolean
  deactivateSuccess?: boolean
  singleActivateSuccess?: boolean
  singleDeactivateSuccess?: boolean
  deleteSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: ICmsCategoriesState = initialCmsCategoriesState,
  action: ActionWithPayload<ICmsCategoriesState>
) => {
  switch (action.type) {
    //GET SPECIFI_CMS_CATEGORIES DATA
    case actionTypes.GET_SPECIFIC_CMS_CATEGORIES_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SPECIFIC_CMS_CATEGORIES_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_SPECIFIC_CMS_CATEGORIES_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }
    //GET CMS_CATEGORIES DATA
    case actionTypes.GET_CMS_CATEGORIES_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_CMS_CATEGORIES_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_CMS_CATEGORIES_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add CMS CATEGORIES

    case actionTypes.ADD_CMS_CATEGORIES_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_CMS_CATEGORIES_SUCCESS: {
      return {
        ...state,
        data: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_CMS_CATEGORIES_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.ADD_CMS_CATEGORIES_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update category
    case actionTypes.UPDATE_CMS_CATEGORIES_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_CMS_CATEGORIES_SUCCESS: {
      return {
        ...state,
        data: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_CMS_CATEGORIES_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_CMS_CATEGORIES_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_CMS_CATEGORIES_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_CMS_CATEGORIES_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Singer activate branchless banking
    //Activate Users
    case actionTypes.SINGLE_ACTIVATE_CMS_CATEGORIES_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_CMS_CATEGORIES_SUCCESS: {
      return {...state, activateSuccess: true, loading: false}
    }
    case actionTypes.SINGLE_ACTIVATE_CMS_CATEGORIES_FINISH: {
      return {...state, activateSuccess: false, loading: false}
    }

    case actionTypes.SINGLE_DEACTIVATE_CMS_CATEGORIES_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.SINGLE_DEACTIVATE_CMS_CATEGORIES_SUCCESS: {
      return {...state, deactivateSuccess: true, loading: false}
    }

    case actionTypes.SINGLE_DEACTIVATE_CMS_CATEGORIES_FINISH: {
      return {...state, deactivateSuccess: false, loading: false}
    }

    // sort
    case actionTypes.SORT_CATEGORIES_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_CATEGORIES_SUCCESS: {
      return {
        ...state,
        sortCategoriesData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_CATEGORIES_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_CATEGORIES_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortCategoriesData: [],
      }
    }

    default:
      return state
  }
}
