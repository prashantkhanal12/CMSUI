import {Action} from 'redux'
import {OptionModel} from '../Model'
import {MemberSubTypeModel} from '../Model/MemberSubTypeModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialMemberSubTypeState: IMemberSubTypeState = {
  data: {
    memberSubType: [],
    meta: [],
  },
  sortMemberSubTypeData: [],
  memberSubTypeList: {memberSubType: []},
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IMemberSubTypeState {
  data?: {
    memberSubType?: MemberSubTypeModel[]
    meta?: {[key: string]: string | number}[]
  }
  sortMemberSubTypeData?: IMemberSubTypeState[]
  memberSubTypeList?: {memberSubType: MemberSubTypeModel[]}
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IMemberSubTypeState = initialMemberSubTypeState,
  action: ActionWithPayload<IMemberSubTypeState>
) => {
  switch (action.type) {
    case actionTypes.GET_ALL_MEMBER_SUB_TYPE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_MEMBER_SUB_TYPE_SUCCESS: {
      return {...state, data: action.payload, memberSubTypeList: action.payload, loading: false}
    }

    case actionTypes.GET_ALL_MEMBER_SUB_TYPE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET MemberSubType DATA
    case actionTypes.GET_MEMBER_SUB_TYPE_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_MEMBER_SUB_TYPE_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_MEMBER_SUB_TYPE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add MemberSubType
    case actionTypes.ADD_MEMBER_SUB_TYPE_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_MEMBER_SUB_TYPE_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_MEMBER_SUB_TYPE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.RESET_MEMBER_SUB_TYPE: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update MemberSubType
    case actionTypes.UPDATE_MEMBER_SUB_TYPE_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_MEMBER_SUB_TYPE_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_MEMBER_SUB_TYPE_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_MEMBER_SUB_TYPE_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_MEMBER_SUB_TYPE_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_MEMBER_SUB_TYPE_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_MEMBER_SUB_TYPE_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_MEMBER_SUB_TYPE_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_MEMBER_SUB_TYPE_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_MEMBER_SUB_TYPE_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_MEMBER_SUB_TYPE_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_MEMBER_SUB_TYPE_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_MEMBER_SUB_TYPE_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_MEMBER_SUB_TYPE_SUCCESS: {
      const changedData: any = action.payload?.data?.memberSubType
      let newData = state?.data?.memberSubType?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, memberSubType: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_MEMBER_SUB_TYPE_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_MEMBER_SUB_TYPE_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_MEMBER_SUB_TYPE_SUCCESS: {
      const changedData: any = action.payload?.data?.memberSubType
      let newData = state?.data?.memberSubType?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, memberSubType: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_MEMBER_SUB_TYPE_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    // sort
    case actionTypes.SORT_MEMBER_SUB_TYPE_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_MEMBER_SUB_TYPE_SUCCESS: {
      return {
        ...state,
        sortMemberSubTypeData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_MEMBER_SUB_TYPE_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_MEMBER_SUB_TYPE_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortMemberSubTypeData: [],
      }
    }
    default:
      return state
  }
}
