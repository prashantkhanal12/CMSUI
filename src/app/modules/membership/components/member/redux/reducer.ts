import {Action} from 'redux'
import {OptionModel} from '../Model'
import {MemberModel} from '../Model/MemberModel'
import {actionTypes} from './constants'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialMemberState: IMemberState = {
  data: {
    member: [],
    meta: [],
  },
  sortMemberData: [],
  memberList: {member: []},
  memberfeatured: [],
  deleteSuccess: false,
  enableSuccess: false,
  disableSuccess: false,
  singleEnableSuccess: false,
  singleDisableSuccess: false,
  loading: false,
  success: false,
}

export interface IMemberState {
  data?: {
    member?: MemberModel[]
    meta?: {[key: string]: string | number}[]
  }
  sortMemberData?: IMemberState[]
  memberList?: {member: MemberModel[]}
  memberfeatured?: {[key: string]: string | number}[]
  deleteSuccess?: boolean
  enableSuccess?: boolean
  disableSuccess?: boolean
  singleEnableSuccess?: boolean
  singleDisableSuccess?: boolean
  loading?: boolean
  success?: boolean
}

export const reducer = (
  state: IMemberState = initialMemberState,
  action: ActionWithPayload<IMemberState>
) => {
  switch (action.type) {
    case actionTypes.GET_FEATURED_MEMBER_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_FEATURED_MEMBER_SUCCESS: {
      return {...state, memberfeatured: action.payload?.memberfeatured, loading: false}
    }

    case actionTypes.GET_FEATURED_MEMBER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.GET_ALL_MEMBER_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_ALL_MEMBER_SUCCESS: {
      return {...state, data: action.payload, memberList: action.payload, loading: false}
    }

    case actionTypes.GET_ALL_MEMBER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //GET Member DATA
    case actionTypes.GET_MEMBER_START: {
      return {...state, loading: true}
    }

    case actionTypes.GET_MEMBER_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }

    case actionTypes.GET_MEMBER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Add Member
    case actionTypes.ADD_MEMBER_START: {
      return {...state, loading: true}
    }

    case actionTypes.ADD_MEMBER_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.ADD_MEMBER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    case actionTypes.RESET_MEMBER: {
      return {
        ...state,
        data: [],
        success: false,
      }
    }

    //Update Member
    case actionTypes.UPDATE_MEMBER_START: {
      return {...state, loading: true}
    }

    case actionTypes.UPDATE_MEMBER_SUCCESS: {
      return {
        ...state,
        data: action?.payload?.data,
        success: true,
        loading: false,
      }
    }

    case actionTypes.UPDATE_MEMBER_FINISH: {
      const error = action.payload
      return {...state, error, loading: false}
    }

    //Delete
    case actionTypes.DELETE_MEMBER_START: {
      return {...state, loading: true}
    }

    case actionTypes.DELETE_MEMBER_SUCCESS: {
      return {
        ...state,
        deleteSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DELETE_MEMBER_FINISH: {
      return {
        ...state,
        loading: false,
        deleteSuccess: false,
      }
    }

    //Enable
    case actionTypes.ENABLE_MEMBER_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.ENABLE_MEMBER_SUCCESS: {
      return {
        ...state,
        enableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.ENABLE_MEMBER_FINISH: {
      return {
        ...state,
        loading: false,
        enableSuccess: false,
      }
    }

    //disable
    case actionTypes.DISABLE_MEMBER_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.DISABLE_MEMBER_SUCCESS: {
      return {
        ...state,
        disableSuccess: true,
        loading: false,
      }
    }

    case actionTypes.DISABLE_MEMBER_FINISH: {
      return {
        ...state,
        loading: false,
        disableSuccess: false,
      }
    }
    //Enable
    case actionTypes.SINGLE_ENABLE_MEMBER_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_ENABLE_MEMBER_SUCCESS: {
      const changedData: any = action.payload?.data?.member
      let newData = state?.data?.member?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, member: newData},
        singleEnableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_ENABLE_MEMBER_FINISH: {
      return {
        ...state,
        singleEnableSuccess: false,
        toggleLoading: false,
      }
    }

    //Disable
    case actionTypes.SINGLE_DISABLE_MEMBER_REQUEST: {
      return {...state, toggleLoading: true}
    }

    case actionTypes.SINGLE_DISABLE_MEMBER_SUCCESS: {
      const changedData: any = action.payload?.data?.member
      let newData = state?.data?.member?.map((data) => {
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
        data: {...state, meta: state?.data?.meta, member: newData},
        singleDisableSuccess: true,
        toggleLoading: false,
      }
    }

    case actionTypes.SINGLE_DISABLE_MEMBER_FINISH: {
      return {
        ...state,
        singleDisableSuccess: false,
        toggleLoading: false,
      }
    }

    // sort
    case actionTypes.SORT_MEMBER_START: {
      return {...state, loading: true}
    }

    case actionTypes.SORT_MEMBER_SUCCESS: {
      return {
        ...state,
        sortMemberData: action?.payload,
        success: true,
        loading: false,
      }
    }

    case actionTypes.SORT_MEMBER_FINISH: {
      return {
        ...state,
        loading: false,
        success: false,
      }
    }

    case actionTypes.SORT_MEMBER_RESET: {
      return {
        ...state,
        loading: false,
        success: false,
        sortMemberData: [],
      }
    }

    default:
      return state
  }
}
