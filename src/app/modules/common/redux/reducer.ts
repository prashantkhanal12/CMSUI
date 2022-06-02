import {Action} from 'redux'
import {actionTypes} from './constant'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

const initialUserRolePermissionState: IUserRolePermissionState = {
  data: {
    permission: [],
  },
  loading: false,
}

export interface IUserRolePermissionState {
  data: {
    permission?: {[key: string]: string | number}[]
  }
  loading?: boolean
}

export const reducer = (
  state: IUserRolePermissionState = initialUserRolePermissionState,
  action: ActionWithPayload<IUserRolePermissionState>
) => {
  switch (action.type) {
    case actionTypes.GET_USER_ROLE_PERMISSION_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.GET_USER__ROLE_PERMISSION_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }
    case actionTypes.GET_USER_ROLE_PERMISSION_FINISH: {
      return {...state, loading: false}
    }

    default:
      return state
  }
}

const initialPlaceState: IPlaceState = {
  district: [],
  province: [],
  loading: false,
}

export interface IPlaceState {
  district?: {[key: string]: string | number}[]
  province?: {[key: string]: string | number}[]
  loading?: boolean
}

export const placeReducer = (
  state: IPlaceState = initialPlaceState,
  action: ActionWithPayload<IPlaceState>
) => {
  switch (action.type) {
    case actionTypes.GET_DISTRICT_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.GET_DISTRICT_SUCCESS: {
      return {...state, district: action.payload?.district, loading: false}
    }
    case actionTypes.GET_DISTRICT_FINISH: {
      return {...state, loading: false}
    }

    case actionTypes.GET_PROVINCE_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.GET_PROVINCE_SUCCESS: {
      return {...state, province: action.payload?.province, loading: false}
    }
    case actionTypes.GET_PROVINCE_FINISH: {
      return {...state, loading: false}
    }

    default:
      return state
  }
}

export interface ICategoryTypeState {
  data: {
    categoryType?: {[key: string]: string | number}[]
  }
  loading?: boolean
}

const initialCategoryTypeState: ICategoryTypeState = {
  data: {
    categoryType: [],
  },
  loading: false,
}

export const categoryTypeReducer = (
  state: ICategoryTypeState = initialCategoryTypeState,
  action: ActionWithPayload<ICategoryTypeState>
) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORY_TYPE_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.GET_CATEGORY_TYPE_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }
    case actionTypes.GET_CATEGORY_TYPE_FINISH: {
      return {...state, loading: false}
    }

    default:
      return state
  }
}

// media type
export interface IMediaTypeState {
  data: {
    mediaType?: {[key: string]: string | number}[]
  }
  loading?: boolean
}

const initialMediaTypeState: IMediaTypeState = {
  data: {
    mediaType: [],
  },
  loading: false,
}

export const mediaTypeReducer = (
  state: IMediaTypeState = initialMediaTypeState,
  action: ActionWithPayload<IMediaTypeState>
) => {
  switch (action.type) {
    case actionTypes.GET_MEDIA_TYPE_REQUEST: {
      return {...state, loading: true}
    }

    case actionTypes.GET_MEDIA_TYPE_SUCCESS: {
      return {...state, data: action.payload, loading: false}
    }
    case actionTypes.GET_MEDIA_TYPE_FINISH: {
      return {...state, loading: false}
    }

    default:
      return state
  }
}
