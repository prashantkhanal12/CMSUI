import {Action} from 'redux'
import {OfferManagerModel} from '../Model/OfferManagerModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialOfferState: IOfferState = {
  data: {
    offer: [],
    meta: [],
  },
  sortOfferManagerData: [],
  offerManagerList: {Offer: []},
  discountType: [],
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IOfferState {
  data?: {
    offer?: OfferManagerModel[]
    meta?: {[key: string]: string | number}[]
  }
  sortOfferManagerData?: IOfferState[]
  offerManagerList?: {Offer: OfferManagerModel[]}
  discountType?: {[key: string]: string}[]
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IOfferState = initialOfferState,
  action: ActionWithPayload<IOfferState>
) => {
  switch (action.type) {
    case actionTypes.GET_ALL_OFFER_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_OFFER_SUCCESS: {
      return {...state, data: action.payload, offerManagerList: action.payload, loading: false}
    }

    case actionTypes.GET_ALL_OFFER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET DISCOUNT_TYPE DATA
    case actionTypes.GET_DISCOUNT_TYPE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_DISCOUNT_TYPE_SUCCESS: {
      return {...state, discountType: action.payload?.discountType, loading: false}
    }

    case actionTypes.GET_DISCOUNT_TYPE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET Offer DATA
    case actionTypes.GET_OFFER_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_OFFER_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_OFFER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add Offer
    case actionTypes.ADD_OFFER_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_OFFER_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_OFFER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.RESET_OFFER: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update Offer
    case actionTypes.UPDATE_OFFER_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_OFFER_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_OFFER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_OFFER_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_OFFER_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_OFFER_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_OFFER_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_OFFER_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_OFFER_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_OFFER_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_OFFER_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_OFFER_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_OFFER_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_OFFER_SUCCESS: {
      const changedData: any = action.payload?.data?.offer
      let newData = state?.data?.offer?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, offer: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_OFFER_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_OFFER_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_OFFER_SUCCESS: {
      const changedData: any = action.payload?.data?.offer
      let newData = state?.data?.offer?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, offer: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_OFFER_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    // sort
    case actionTypes.SORT_OFFER_MANAGER_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_OFFER_MANAGER_SUCCESS: {
      return {
        ...state,
        sortOfferManagerData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_OFFER_MANAGER_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_OFFER_MANAGER_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortOfferManagerData: [],
      }
    }

    default:
      return state
  }
}
