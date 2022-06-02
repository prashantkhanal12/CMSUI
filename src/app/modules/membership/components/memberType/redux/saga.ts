import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {MemberTypeModel} from '../Model/MemberTypeModel'
import {ParamsModel} from 'src/app/modules/common/Model'
import { SortMemberTypeActionModel, SortMemberTypeModel } from '../Model'

function* getMemberTypeSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getMemberType, params)
    yield put(actions.getMemberTypeSuccess(response?.data?.data))
    yield put(actions.getMemberTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getMemberTypeFinish())
  }
}

function* getAllMemberTypeSaga() {
  try {
    const response: ResponseModel = yield call(service.getAllMemberType)
    yield put(actions.getAllMemberTypeSuccess(response?.data?.data))
    yield put(actions.getAllMemberTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllMemberTypeFinish())
  }
}

function* addMemberTypeSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addMemberType, body)
    yield put(actions.addMemberTypeSuccess(response.data?.data))
    yield put(actions.addMemberTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addMemberTypeFinish())
  }
}

function* enableMemberTypeSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableMemberType, selectedUsers)
    yield put(actions.enableMemberTypeSuccess(response?.data))
    yield put(actions.enableMemberTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableMemberTypeFinish())
  }
}

function* disableMemberTypeSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableMemberType, selectedUsers)
    yield put(actions.disableMemberTypeSuccess(response?.data))
    yield put(actions.disableMemberTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableMemberTypeFinish())
  }
}

function* singleEnableMemberTypeSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableMemberType, selectedUsers)
    yield put(actions.singleEnableMemberTypeSuccess(response?.data))
    yield put(actions.singleEnableMemberTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableMemberTypeFinish())
  }
}

function* singleDisableMemberTypeSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableMemberType, selectedUsers)
    yield put(actions.singleDisableMemberTypeSuccess(response?.data))
    yield put(actions.singleDisableMemberTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableMemberTypeFinish())
  }
}

function* updateMemberTypeSaga(action: ActionModel) {
  try {
    const body: MemberTypeModel = action.payload
    const response: ResponseModel = yield call(service.updateMemberType, body, action.payload?.id)
    yield put(actions.updateMemberTypeSuccess(response.data?.data))
    yield put(actions.updateMemberTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateMemberTypeFinish())
  }
}

function* deleteMemberTypeSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteMemberType, body)
    yield put(actions.deleteMemberTypeSuccess(response.data?.data))
    yield put(actions.deleteMemberTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteMemberTypeFinish())
  }
}

function* sortMemberType(action: SortMemberTypeActionModel) {
  try {
    const body: SortMemberTypeModel = action.payload
    const response: ResponseModel = yield call(service.sortMemberType, body)

    yield put({
      type: actionTypes.SORT_MEMBER_TYPE_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_MEMBER_TYPE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_MEMBER_TYPE_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_MEMBER_TYPE_START, getMemberTypeSaga)
  yield takeLatest(actionTypes.GET_ALL_MEMBER_TYPE_START, getAllMemberTypeSaga)
  yield takeLatest(actionTypes.ADD_MEMBER_TYPE_START, addMemberTypeSaga)
  yield takeLatest(actionTypes.UPDATE_MEMBER_TYPE_START, updateMemberTypeSaga)
  yield takeLatest(actionTypes.DELETE_MEMBER_TYPE_START, deleteMemberTypeSaga)
  yield takeLatest(actionTypes.ENABLE_MEMBER_TYPE_REQUEST, enableMemberTypeSaga)
  yield takeLatest(actionTypes.DISABLE_MEMBER_TYPE_REQUEST, disableMemberTypeSaga)
  yield takeLatest(actionTypes.SINGLE_ENABLE_MEMBER_TYPE_REQUEST, singleEnableMemberTypeSaga)
  yield takeLatest(actionTypes.SINGLE_DISABLE_MEMBER_TYPE_REQUEST, singleDisableMemberTypeSaga)
  yield takeLatest(actionTypes.SORT_MEMBER_TYPE_START, sortMemberType)
}
