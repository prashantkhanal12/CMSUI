import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ParamsModel} from 'src/app/modules/common/Model'

function* getNoticeSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getNotice, params)
    yield put(actions.getNoticeSuccess(response?.data?.data))
    yield put(actions.getNoticeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getNoticeFinish())
  }
}

function* addNoticeSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addNotice, body)
    yield put(actions.addNoticeSuccess(response.data?.data))
    yield put(actions.addNoticeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addNoticeFinish())
  }
}

function* updateNoticeSaga(action: ActionModel) {
  try {
    const body: any = action.payload.data
    const response: ResponseModel = yield call(service.updateNotice, body, action.payload?.id)
    yield put(actions.updateNoticeSuccess(response.data?.data))
    yield put(actions.updateNoticeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateNoticeFinish())
  }
}

function* deleteNoticeSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteNotice, body)
    yield put(actions.deleteNoticeSuccess(response.data?.data))
    yield put(actions.deleteNoticeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteNoticeFinish())
  }
}

function* singleActivateNotice(action: ActionModel) {
  try {
    const selectedOperationIncharge: any = action.payload
    const response: ResponseModel = yield call(
      service.singleActivateNotice,
      selectedOperationIncharge
    )
    yield put({
      type: actionTypes.SINGLE_ACTIVATE_NOTICES_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SINGLE_ACTIVATE_NOTICES_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_ACTIVATE_NOTICES_FINISH})
  }
}

function* singleDeactivateNotice(action: ActionModel) {
  try {
    const selectedOperationIncharge: any = action.payload
    const response: ResponseModel = yield call(
      service.singleDeactivateNotice,
      selectedOperationIncharge
    )

    yield put({
      type: actionTypes.SINGLE_DEACTIVATE_NOTICES_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SINGLE_DEACTIVATE_NOTICES_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_DEACTIVATE_NOTICES_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_NOTICES_START, getNoticeSaga)
  yield takeLatest(actionTypes.ADD_NOTICES_START, addNoticeSaga)
  yield takeLatest(actionTypes.UPDATE_NOTICES_START, updateNoticeSaga)
  yield takeLatest(actionTypes.DELETE_NOTICES_START, deleteNoticeSaga)
  yield takeLatest(actionTypes.SINGLE_ACTIVATE_NOTICES_REQUEST, singleActivateNotice)
  yield takeLatest(actionTypes.SINGLE_DEACTIVATE_NOTICES_REQUEST, singleDeactivateNotice)
}
