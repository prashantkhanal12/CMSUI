import {Action} from 'redux'
import {FaqCategoryModel} from '../Model'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialFaqCategoryState: IFaqCategoryState = {
  data: {
    faqCategory: [],
    meta: {},
  },
  sortFaqCategoryData: [],
  faqCategoryList: {faqCategory: []},
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
export interface IFaqCategoryState {
  data: {
    faqCategory: {[key: string]: string | number}[]
    meta: {[key: string]: number}
  }
  sortFaqCategoryData?: IFaqCategoryState[]
  faqCategoryList?: {faqCategory: FaqCategoryModel[] | any}
  loading: false
  success: false
  editSuccess: false
  activateSuccess: false
  deactivateSuccess: false
  deleteSuccess: false
  toggleLoading: false
  singleActivateSuccess: false
  singleDeactivateSuccess: false
}

export const reducer = (
  state: IFaqCategoryState = initialFaqCategoryState,
  action: ActionWithPayload<IFaqCategoryState>
) => {
  switch (action.type) {
    case actionTypes.GET_ALL_FAQ_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_FAQ_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: action.payload?.data,
        faqCategoryList: action.payload?.data,
        loading: false,
      }
    }

    case actionTypes.GET_ALL_FAQ_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.GET_FAQ_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_FAQ_CATEGORY_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.GET_FAQ_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add Faq Category  Reducer
    case actionTypes.ADD_FAQ_CATEGORY_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_FAQ_CATEGORY_SUCCESS: {
      return {...state, data: action?.payload?.data, success: true, loading: false}
    }

    case actionTypes.ADD_FAQ_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.ADD_FAQ_CATEGORY_RESET: {
      return {...state, success: false, data: [], loading: false}
    }

    //update Faq Category
    case actionTypes.UPDATE_FAQ_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_FAQ_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_FAQ_CATEGORY_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.UPDATE_FAQ_CATEGORY_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }
    //Delete Faq Category
    case actionTypes.DELETE_FAQ_CATEGORY_START: {
      return {...state, loading: true, deleteSuccess: false}
    }

    case actionTypes.DELETE_FAQ_CATEGORY_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_FAQ_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Activate Faq Category
    case actionTypes.ACTIVATE_FAQ_CATEGORY_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ACTIVATE_FAQ_CATEGORY_SUCCESS: {
      return {...state, activateSuccess: true, loading: false}
    }
    case actionTypes.ACTIVATE_FAQ_CATEGORY_FINISH: {
      return {...state, activateSuccess: false, loading: false}
    }

    //Single Activate Faq Category
    case actionTypes.SINGLE_ACTIVATE_FAQ_CATEGORY_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_FAQ_CATEGORY_SUCCESS: {
      const changedData: any = action.payload?.data?.faqCategory
      let newData = state?.data?.faqCategory?.map((data) => {
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
    case actionTypes.SINGLE_ACTIVATE_FAQ_CATEGORY_FINISH: {
      return {...state, singleActivateSuccess: false, toggleLoading: false}
    }

    //Deactivate Faq Category
    case actionTypes.DEACTIVATE_FAQ_CATEGORY_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DEACTIVATE_FAQ_CATEGORY_SUCCESS: {
      return {...state, deactivateSuccess: true, loading: false}
    }

    case actionTypes.DEACTIVATE_FAQ_CATEGORY_FINISH: {
      return {...state, deactivateSuccess: false, loading: false}
    }

    case actionTypes.SINGLE_DEACTIVATE_FAQ_CATEGORY_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DEACTIVATE_FAQ_CATEGORY_SUCCESS: {
      const changedData: any = action.payload?.data?.faqCategory
      let newData = state?.data?.faqCategory?.map((data) => {
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
        data: {...state?.data?.meta, faqCategoryId: newData},
        singleDeactivateSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DEACTIVATE_FAQ_CATEGORY_FINISH: {
      return {...state, singleDeactivateSuccess: false, toggleLoading: false}
    }

    // sort
    case actionTypes.SORT_FAQ_CATEGORY_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_FAQ_CATEGORY_SUCCESS: {
      return {
        ...state,
        sortFaqCategoryData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_FAQ_CATEGORY_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_FAQ_CATEGORY_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortFaqCategoryData: [],
      }
    }

    default:
      return state
  }
}
