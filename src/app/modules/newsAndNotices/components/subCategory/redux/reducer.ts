import {Action} from 'redux'
import {OptionModel} from '../Model'
import {SubCategoryModel} from '../Model/SubCategoryModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialSubCategoryState: ISubCategoryState = {
  data: {
    subCategory: [],
    meta: {},
  },
  deleteSuccess: false,
  sortNewsSubCategoryData: [],

  loading: false,
  success: false,
}

export interface ISubCategoryState {
  data: {
    subCategory: SubCategoryModel[]
    meta: {[key: string]: number}
  }
  activateSuccess?: boolean
  deactivateSuccess?: boolean
  singleActivateSuccess?: boolean
  singleDeactivateSuccess?: boolean
  deleteSuccess?: boolean
  sortNewsSubCategoryData: ISubCategoryState[]
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: ISubCategoryState = initialSubCategoryState,
  action: ActionWithPayload<ISubCategoryState>
) => {
  switch (action.type) {
    //GET SPECIFI_SUB_CATEGORY DATA
    case actionTypes.GET_SPECIFIC_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SPECIFIC_SUB_CATEGORY_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_SPECIFIC_SUB_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET SUB_CATEGORY DATA
    case actionTypes.GET_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_SUB_CATEGORY_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_SUB_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add SUB CATEGORY

    case actionTypes.ADD_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_SUB_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.ADD_SUB_CATEGORY_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update subCategory
    case actionTypes.UPDATE_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_SUB_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_SUB_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Singer activate branchless banking
    //Activate Users
    case actionTypes.SINGLE_ACTIVATE_SUB_CATEGORY_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_SUB_CATEGORY_SUCCESS: {
      return {...state, activateSuccess: true, loading: false}
    }
    case actionTypes.SINGLE_ACTIVATE_SUB_CATEGORY_FINISH: {
      return {...state, activateSuccess: false, loading: false}
    }

    case actionTypes.SINGLE_DEACTIVATE_SUB_CATEGORY_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.SINGLE_DEACTIVATE_SUB_CATEGORY_SUCCESS: {
      return {...state, deactivateSuccess: true, loading: false}
    }

    case actionTypes.SINGLE_DEACTIVATE_SUB_CATEGORY_FINISH: {
      return {...state, deactivateSuccess: false, loading: false}
    }

    // sort
    case actionTypes.SORT_NEWS_SUB_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_NEWS_SUB_CATEGORY_SUCCESS: {
      return {
        ...state,
        sortNewsSubCategoryData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_NEWS_SUB_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_NEWS_SUB_CATEGORY_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortNewsSubCategoryData: [],
      }
    }

    default:
      return state
  }
}
