import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {IKeyState} from './reducer'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'

function* getKeySaga(action: ActionModel) {
  try {
    const params: any = action.payload?.params
    yield delay(500)
    const response: ResponseModel = yield call(service.getKeySetting, params)
    const data: IKeyState = response?.data
    yield put(actions.getKeySuccess(data))
    yield put(actions.getKeyFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getKeyFinish())
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
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.createKeyFinish())
  }
}

function* updateKey(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(service.updateKey, body, action.payload?.id)
    yield put(actions.updateKeySuccess(response?.data))
    yield put(actions.updateKeyFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
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
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteKeyFinish())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_KEY_SETTING_START, getKeySaga)
  yield takeLatest(actionTypes.CREATE_KEY_START, CreateKey)
  yield takeLatest(actionTypes.DELETE_KEY_START, deleteKeySaga)
  yield takeLatest(actionTypes.UPDATE_KEY_START, updateKey)
}
