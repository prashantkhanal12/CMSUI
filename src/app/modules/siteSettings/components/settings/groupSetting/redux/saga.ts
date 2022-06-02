import { call, put, takeLatest, select } from 'redux-saga/effects'
import { actions } from './action'
import { actionTypes } from './constants'
import { ResponseModel } from 'src/cms/helpers/Models/ResponseModel'
import { service } from './service'
import { IGroupSettingState } from './reducer'
import { ActionModel } from 'src/cms/helpers/Models/ActionModel'
import { globalActionTypes } from 'src/app/modules/errors/redux/constants'

function* getKeySaga(action: ActionModel) {
  try {
    const params: any = action.payload?.params
    const response: ResponseModel = yield call(service.getKeySetting, params)
    const data: any = response?.data
    yield put(actions.getKeySuccess(data))
    yield put(actions.getKeyFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put(actions.getKeyFinish())
  }
}

function* getGroupListSaga() {
  try {
    const response: ResponseModel = yield call(service.getGroupListSaga)
    const data: any = response?.data?.data
    yield put(actions.getSettingGroupListSuccess(data))
    yield put(actions.getSettingGroupListFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put(actions.getSettingGroupListFinish())
  }
}

function* CreateKey(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.postKey, body)
    yield put(actions.createKeySuccess(response.data))
    yield put(actions.createKeyFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put(actions.createKeyFinish())
  }
}

function* updateKey(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(service.updateKey, body, action.payload?.id)
    yield put(actions.updateKeySuccess(response.data))
    yield put(actions.updateKeyFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put(actions.updateKeyFinish())
  }
}

function* deleteKeySaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteKey, body)
    yield put(actions.deleteKeySuccess(response.data))
    yield put(actions.deleteKeyFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put(actions.deleteKeyFinish())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_GROUP_SETTING_START, getKeySaga)
  yield takeLatest(actionTypes.GET_SETTING_GROUP_LIST_START, getGroupListSaga)
  yield takeLatest(actionTypes.CREATE_GROUP_START, CreateKey)
  yield takeLatest(actionTypes.DELETE_GROUP_START, deleteKeySaga)
  yield takeLatest(actionTypes.UPDATE_GROUP_START, updateKey)
}
