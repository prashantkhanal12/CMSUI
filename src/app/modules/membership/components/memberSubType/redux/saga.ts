import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {OptionModel, SortMemberSubTypeActionModel, SortMemberSubTypeModel} from '../Model'
import {MemberSubTypeModel} from '../Model/MemberSubTypeModel'
import {ParamsModel} from 'src/app/modules/common/Model'
import {IMemberSubTypeState} from './reducer'

function* getMemberSubTypeSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getMemberSubType, params)
    yield put(actions.getMemberSubTypeSuccess(response?.data?.data))
    yield put(actions.getMemberSubTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getMemberSubTypeFinish())
  }
}

function* getAllMemberSubTypeSaga(action: ActionModel) {
  try {
    const id: any = action.payload
    const response: ResponseModel = yield call(service.getAllMemberSubType, id)
    yield put(actions.getAllMemberSubTypeSuccess(response?.data?.data))
    yield put(actions.getAllMemberSubTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllMemberSubTypeFinish())
  }
}

function* addMemberSubTypeSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addMemberSubType, body)
    yield put(actions.addMemberSubTypeSuccess(response.data?.data))
    yield put(actions.addMemberSubTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addMemberSubTypeFinish())
  }
}

function* enableMemberSubTypeSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableMemberSubType, selectedUsers)
    yield put(actions.enableMemberSubTypeSuccess(response?.data))
    yield put(actions.enableMemberSubTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableMemberSubTypeFinish())
  }
}

function* disableMemberSubTypeSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableMemberSubType, selectedUsers)
    yield put(actions.disableMemberSubTypeSuccess(response?.data))
    yield put(actions.disableMemberSubTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableMemberSubTypeFinish())
  }
}

function* singleEnableMemberSubTypeSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableMemberSubType, selectedUsers)
    yield put(actions.singleEnableMemberSubTypeSuccess(response?.data))
    yield put(actions.singleEnableMemberSubTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableMemberSubTypeFinish())
  }
}

function* singleDisableMemberSubTypeSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableMemberSubType, selectedUsers)
    yield put(actions.singleDisableMemberSubTypeSuccess(response?.data))
    yield put(actions.singleDisableMemberSubTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableMemberSubTypeFinish())
  }
}

function* updateMemberSubTypeSaga(action: ActionModel) {
  try {
    const body: MemberSubTypeModel = action.payload
    const response: ResponseModel = yield call(
      service.updateMemberSubType,
      body,
      action.payload?.id
    )
    yield put(actions.updateMemberSubTypeSuccess(response.data?.data))
    yield put(actions.updateMemberSubTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateMemberSubTypeFinish())
  }
}

function* deleteMemberSubTypeSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteMemberSubType, body)
    yield put(actions.deleteMemberSubTypeSuccess(response.data?.data))
    yield put(actions.deleteMemberSubTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteMemberSubTypeFinish())
  }
}

function* sortMemberSubType(action: SortMemberSubTypeActionModel) {
  try {
    const body: SortMemberSubTypeModel = action.payload
    const response: ResponseModel = yield call(service.sortMemberSubType, body)

    yield put({
      type: actionTypes.SORT_MEMBER_SUB_TYPE_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_MEMBER_SUB_TYPE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_MEMBER_SUB_TYPE_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_MEMBER_SUB_TYPE_START, getMemberSubTypeSaga)
  yield takeLatest(actionTypes.GET_ALL_MEMBER_SUB_TYPE_START, getAllMemberSubTypeSaga)
  yield takeLatest(actionTypes.ADD_MEMBER_SUB_TYPE_START, addMemberSubTypeSaga)
  yield takeLatest(actionTypes.UPDATE_MEMBER_SUB_TYPE_START, updateMemberSubTypeSaga)
  yield takeLatest(actionTypes.DELETE_MEMBER_SUB_TYPE_START, deleteMemberSubTypeSaga)
  yield takeLatest(actionTypes.ENABLE_MEMBER_SUB_TYPE_REQUEST, enableMemberSubTypeSaga)
  yield takeLatest(actionTypes.DISABLE_MEMBER_SUB_TYPE_REQUEST, disableMemberSubTypeSaga)
  yield takeLatest(actionTypes.SINGLE_ENABLE_MEMBER_SUB_TYPE_REQUEST, singleEnableMemberSubTypeSaga)
  yield takeLatest(
    actionTypes.SINGLE_DISABLE_MEMBER_SUB_TYPE_REQUEST,
    singleDisableMemberSubTypeSaga
  )
  yield takeLatest(actionTypes.SORT_MEMBER_SUB_TYPE_START, sortMemberSubType)
}
