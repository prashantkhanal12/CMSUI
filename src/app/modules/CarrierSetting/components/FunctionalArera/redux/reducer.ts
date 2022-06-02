import {Action} from 'redux'
import {FunctionalAreaModel} from '../Model'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialFunctionalAreaState: IFunctionalAreaState = {
  data: {
    functionalArea: [],
    meta: {},
  },
  sortFunctionalAreaData: [],
  functionalAreaList: {functionalArea: []},
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IFunctionalAreaState {
  data: {
    functionalArea: {[key: string]: number | string}[]
    meta: {[key: string]: number}
  }
  sortFunctionalAreaData?: IFunctionalAreaState[]
  functionalAreaList?: {functionalArea: FunctionalAreaModel[] | any}
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IFunctionalAreaState = initialFunctionalAreaState,
  action: ActionWithPayload<IFunctionalAreaState>
) => {
  switch (action.type) {
    //GET Position Data
    case actionTypes.GET_FUNCTIONALAREA_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_FUNCTIONALAREA_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_FUNCTIONALAREA_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add Positon
    case actionTypes.ADD_FUNCTIONALAREA_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_FUNCTIONALAREA_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_FUNCTIONALAREA_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.ADD_FUNCTIONALAREA_RESET: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update PPPPOSITION
    case actionTypes.UPDATE_FUNCTIONALAREA_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_FUNCTIONALAREA_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_FUNCTIONALAREA_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_FUNCTIONALAREA_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_FUNCTIONALAREA_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_FUNCTIONALAREA_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_FUNCTIONALAREA_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_FUNCTIONALAREA_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_FUNCTIONALAREA_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_FUNCTIONALAREA_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_FUNCTIONALAREA_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_FUNCTIONALAREA_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ACTIVATE_FUNCTIONALAREA_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_FUNCTIONALAREA_SUCCESS: {
      const changedData: any = action.payload?.data?.functionalArea
      let newData = state?.data?.functionalArea?.map((data) => {
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
        data: {...state?.data?.meta, position: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ACTIVATE_FUNCTIONALAREA_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_ACTIVATE_FUNCTIONALAREA_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ACTIVATE_FUNCTIONALAREA_SUCCESS: {
      const changedData: any = action.payload?.data?.functionalArea
      let newData = state?.data?.functionalArea?.map((data) => {
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
        data: {...state?.data?.meta, position: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ACTIVATE_FUNCTIONALAREA_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    //Get Gallery Reducer
    case actionTypes.GET_ALL_FUNCTIONALAREA_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_FUNCTIONALAREA_SUCCESS: {
      return {
        ...state,
        data: action.payload?.data,
        functionalAreaList: action.payload?.data,
        loading: false,
      }
    }

    case actionTypes.GET_ALL_FUNCTIONALAREA_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    // sort
    case actionTypes.SORT_FUNCTIONALAREA_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_FUNCTIONALAREA_SUCCESS: {
      return {
        ...state,
        sortFunctionalAreaData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_FUNCTIONALAREA_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_FUNCTIONALAREA_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortFunctionalAreaData: [],
      }
    }
    default:
      return state
  }
}
