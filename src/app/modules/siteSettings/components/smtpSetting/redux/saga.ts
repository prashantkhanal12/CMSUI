import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'

function* getSmtpSaga(action: ActionModel) {
  try {
    const params: any = action.payload?.params
    yield delay(500)
    const response: ResponseModel = yield call(service.getSmtpSetting, params)
    const data: any = response?.data
    yield put(actions.getSmtpSuccess(data))
    yield put(actions.getSmtpEncryptionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getSmtpError(err))
  }
}

function* getSmtpEncryptionSaga() {
  try {
    const response: ResponseModel = yield call(service.getSmtpEncryption)
    const data: any = response?.data?.data
    yield put(actions.getSmtpEncryptionSuccess(data))
    yield put(actions.getSmtpEncryptionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getSmtpEncryptionFinish())
  }
}
function* createSmtp(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.postSmtp, body)
    yield put(actions.createSmtpSuccess(response.data))
    yield put(actions.createSmtpFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.createSmtpFinish())
  }
}

function* updateSmtp(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(service.updateSmtp, body, action.payload?.id)
    yield put(actions.updateSmtpSuccess(response.data))
    yield put(actions.updateSmtpFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateSmtpFinish())
  }
}

function* deleteSmtpSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteSmtp, body)
    yield put(actions.deleteSmtpSuccess(response.data))
    yield put(actions.deleteSmtpFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteSmtpFinish())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_SMTP_SETTING_START, getSmtpSaga)
  yield takeLatest(actionTypes.GET_SMTP_ENCRYPTION_START, getSmtpEncryptionSaga)
  yield takeLatest(actionTypes.CREATE_SMTP_START, createSmtp)
  yield takeLatest(actionTypes.DELETE_SMTP_START, deleteSmtpSaga)
  yield takeLatest(actionTypes.UPDATE_SMTP_START, updateSmtp)
}
