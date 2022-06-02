import {Action} from 'redux'
import {CustomerTestimonialsModel} from '../Model'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialCustomerTestimonialsState: ICustomerTestimonialsState = {
  data: {
    customerTestimonial: [],
    meta: {},
  },
  sortCustomerTestimonialData: [],
  customerTestimonialList: {customerTestimonial: []},
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

export interface ICustomerTestimonialsState {
  data: {
    customerTestimonial: {[key: string]: number | string}[]
    meta: {[key: string]: number}
  }
  sortCustomerTestimonialData?: ICustomerTestimonialsState[]
  customerTestimonialList?: {customerTestimonial: CustomerTestimonialsModel[] | any}
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
  state: ICustomerTestimonialsState = initialCustomerTestimonialsState,
  action: ActionWithPayload<ICustomerTestimonialsState>
) => {
  switch (action.type) {
    //Get CUSTOMER_TESTIMONIALS Reducer
    case actionTypes.GET_ALL_CUSTOMER_TESTIMONIALS_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_CUSTOMER_TESTIMONIALS_SUCCESS: {
      return {...state, customerTestimonialList: action.payload, loading: false}
    }

    case actionTypes.GET_ALL_CUSTOMER_TESTIMONIALS_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }
    //Get CUSTOMER_TESTIMONIALS Reducer
    case actionTypes.GET_CUSTOMER_TESTIMONIALS_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_CUSTOMER_TESTIMONIALS_SUCCESS: {
      return {...state, data: action.payload?.data, loading: false}
    }

    case actionTypes.GET_CUSTOMER_TESTIMONIALS_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }
    //Add CUSTOMER_TESTIMONIALS Reducer
    case actionTypes.ADD_CUSTOMER_TESTIMONIALS_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_CUSTOMER_TESTIMONIALS_SUCCESS: {
      const CustomerTestimonialsData = action.payload
      return {...state, success: true, loading: false}
    }

    case actionTypes.ADD_CUSTOMER_TESTIMONIALS_FINISH: {
      const error = action.payload
      return {...state, error, success: false, loading: false}
    }

    case actionTypes.ADD_CUSTOMER_TESTIMONIALS_RESET: {
      return {...state, success: false, data: [], loading: false}
    }

    //update CUSTOMER_TESTIMONIALS
    case actionTypes.UPDATE_CUSTOMER_TESTIMONIALS_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_CUSTOMER_TESTIMONIALS_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_CUSTOMER_TESTIMONIALS_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.UPDATE_CUSTOMER_TESTIMONIALS_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }
    //Delete CUSTOMER_TESTIMONIALS
    case actionTypes.DELETE_CUSTOMER_TESTIMONIALS_START: {
      return {...state, loading: true, deleteSuccess: false}
    }

    case actionTypes.DELETE_CUSTOMER_TESTIMONIALS_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_CUSTOMER_TESTIMONIALS_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Activate CUSTOMER_TESTIMONIALSs
    case actionTypes.ACTIVATE_CUSTOMER_TESTIMONIALS_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ACTIVATE_CUSTOMER_TESTIMONIALS_SUCCESS: {
      return {...state, activateSuccess: true, loading: false}
    }
    case actionTypes.ACTIVATE_CUSTOMER_TESTIMONIALS_FINISH: {
      return {...state, activateSuccess: false, loading: false}
    }

    //Single Activate CUSTOMER_TESTIMONIALS
    case actionTypes.SINGLE_ACTIVATE_CUSTOMER_TESTIMONIALS_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_CUSTOMER_TESTIMONIALS_SUCCESS: {
      const changedData: any = action.payload?.data?.customerTestimonial
      let newData = state?.data?.customerTestimonial?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, customerTestimonial: newData},
        singleActivateSuccess: true,
        toggleLoading: false,
      }
    }
    case actionTypes.SINGLE_ACTIVATE_CUSTOMER_TESTIMONIALS_FINISH: {
      return {...state, singleActivateSuccess: false, toggleLoading: false}
    }

    //Deactivate CUSTOMER_TESTIMONIALS
    case actionTypes.DEACTIVATE_CUSTOMER_TESTIMONIALS_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DEACTIVATE_CUSTOMER_TESTIMONIALS_SUCCESS: {
      return {...state, deactivateSuccess: true, loading: false}
    }

    case actionTypes.DEACTIVATE_CUSTOMER_TESTIMONIALS_FINISH: {
      return {...state, deactivateSuccess: false, loading: false}
    }

    case actionTypes.SINGLE_DEACTIVATE_CUSTOMER_TESTIMONIALS_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DEACTIVATE_CUSTOMER_TESTIMONIALS_SUCCESS: {
      const changedData: any = action.payload?.data?.customerTestimonial
      let newData = state?.data?.customerTestimonial?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, customerTestimonial: newData},
        singleDeactivateSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DEACTIVATE_CUSTOMER_TESTIMONIALS_FINISH: {
      return {...state, singleDeactivateSuccess: false, toggleLoading: false}
    }

    // sort
    case actionTypes.SORT_CUSTOMER_TESTIMONIALS_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_CUSTOMER_TESTIMONIALS_SUCCESS: {
      return {
        ...state,
        sortCustomerTestimonialData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_CUSTOMER_TESTIMONIALS_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_CUSTOMER_TESTIMONIALS_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortCustomerTestimonialData: [],
      }
    }
    default:
      return state
  }
}
