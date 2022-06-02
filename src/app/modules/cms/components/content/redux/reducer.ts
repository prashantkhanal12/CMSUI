import {Action} from 'redux'
import {ContentOptionModal} from '../Model'
import {ContentModel} from '../Model/ContentModal'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialContentState: IContentState = {
  applyNowSection: [],
  contentBannerOption: [],
  collapsibleSection: [],
  faqSection: [],
  helpSection: [],
  contentLeadFormOption: [],
  pageHeaderOption: [],
  productSection: [],
  reviewAndRatingOption: [],
  data: {
    content: [],
    meta: [],
  },
  loading: false,
  success: false,
}

export interface IContentState {
  applyNowSection?: ContentOptionModal[]
  contentBannerOption?: ContentOptionModal[]
  collapsibleSection?: ContentOptionModal[]
  faqSection?: ContentOptionModal[]
  helpSection?: ContentOptionModal[]
  contentLeadFormOption?: ContentOptionModal[]
  pageHeaderOption?: ContentOptionModal[]
  productSection?: ContentOptionModal[]
  reviewAndRatingOption?: ContentOptionModal[]
  data?: {
    content?: ContentModel[]
    meta?: {[key: string]: string | number}[]
  }
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IContentState = initialContentState,
  action: ActionWithPayload<IContentState>
) => {
  switch (action.type) {
    //GET APPLY_NOW_SECTION REDUCER
    case actionTypes.GET_APPLY_NOW_SECTION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_APPLY_NOW_SECTION_SUCCESS: {
      return {
        ...state,
        applyNowSection: action.payload?.applyNowSection,
        loading: false,
      }
    }

    case actionTypes.GET_APPLY_NOW_SECTION_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    //GET BANNER REDUCER
    case actionTypes.GET_CONSTANTBANNER_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_CONSTANTBANNER_SUCCESS: {
      return {
        ...state,
        contentBannerOption: action.payload?.contentBannerOption,
        loading: false,
      }
    }

    case actionTypes.GET_CONSTANTBANNER_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    //GET COLLAPSIBLE SECTION REDUCER
    case actionTypes.GET_COLLAPSIBLE_SECTION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_COLLAPSIBLE_SECTION_SUCCESS: {
      return {
        ...state,
        collapsibleSection: action.payload?.collapsibleSection,
        loading: false,
      }
    }

    case actionTypes.GET_COLLAPSIBLE_SECTION_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    //GET FAQ OPTION REDUCER
    case actionTypes.GET_FAQ_OPTION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_FAQ_OPTION_SUCCESS: {
      return {
        ...state,
        faqSection: action.payload?.faqSection,
        loading: false,
      }
    }

    case actionTypes.GET_FAQ_OPTION_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    //GET HELP FORM REDUCER
    case actionTypes.GET_HELP_SECTION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_HELP_SECTION_SUCCESS: {
      return {
        ...state,
        helpSection: action.payload?.helpSection,
        loading: false,
      }
    }

    case actionTypes.GET_HELP_SECTION_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    //GET LEAD FORM REDUCER
    case actionTypes.GET_LEAD_FORM_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_LEAD_FORM_SUCCESS: {
      return {
        ...state,
        contentLeadFormOption: action.payload?.contentLeadFormOption,
        loading: false,
      }
    }

    case actionTypes.GET_LEAD_FORM_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    //GET PAGE_HEADER REDUCER
    case actionTypes.GET_PAGE_HEADER_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PAGE_HEADER_SUCCESS: {
      return {
        ...state,
        pageHeaderOption: action.payload?.pageHeaderOption,
        loading: false,
      }
    }

    case actionTypes.GET_PAGE_HEADER_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    //GET PRODUCT_OPTION REDUCER
    case actionTypes.GET_PRODUCT_OPTION_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PRODUCT_OPTION_SUCCESS: {
      return {
        ...state,
        productSection: action.payload?.productSection,
        loading: false,
      }
    }

    case actionTypes.GET_PRODUCT_OPTION_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    //GET REVIEW_AND_RATING REDUCER
    case actionTypes.GET_REVIEW_AND_RATING_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_REVIEW_AND_RATING_SUCCESS: {
      return {
        ...state,
        reviewAndRatingOption: action.payload?.reviewAndRatingOption,
        loading: false,
      }
    }

    case actionTypes.GET_REVIEW_AND_RATING_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    //GET Content DATA
    case actionTypes.GET_CONTENT_DATA_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_CONTENT_DATA_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_CONTENT_DATA_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET Content DATA BY CATEGORY ID
    case actionTypes.GET_CONTENT_DATA_BY_CATEGORY_ID_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_CONTENT_DATA_BY_CATEGORY_ID_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_CONTENT_DATA_BY_CATEGORY_ID_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //ADD CONTENT REDUCER
    case actionTypes.ADD_CONTENT_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_CONTENT_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        success: true,
      }
    }

    case actionTypes.ADD_CONTENT_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.RESET_CONTENT: {
      return {...state, data: [], success: false, loading: false}
    }

    //Update content
    case actionTypes.UPDATE_CONTENT_DATA_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_CONTENT_DATA_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_CONTENT_DATA_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_CONTENT_DATA_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_CONTENT_DATA_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_CONTENT_DATA_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_CONTENT_DATA_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_CONTENT_DATA_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_CONTENT_DATA_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_CONTENT_DATA_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_CONTENT_DATA_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_CONTENT_DATA_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_CONTENT_DATA_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_CONTENT_DATA_SUCCESS: {
      const changedData: any = action.payload?.data?.content
      let newData = state?.data?.content?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, content: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_CONTENT_DATA_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_CONTENT_DATA_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_CONTENT_DATA_SUCCESS: {
      const changedData: any = action.payload?.data?.content
      let newData = state?.data?.content?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, content: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_CONTENT_DATA_FINISH: {
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
