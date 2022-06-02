import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ServiceSubTypeModel} from '../Model/ServiceSubTypeModel'
import {ParamsModel} from 'src/app/modules/common/Model'

function* getServiceSubTypeSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getServiceSubType, params)
    yield put(actions.getServiceSubTypeSuccess(response?.data?.data))
    yield put(actions.getServiceSubTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getServiceSubTypeFinish())
  }
}

function* getAllServiceSubTypeSaga() {
  try {
    const response: ResponseModel = yield call(service.getAllServiceSubType)
    yield put(actions.getAllServiceSubTypeSuccess(response?.data?.data))
    yield put(actions.getAllServiceSubTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllServiceSubTypeFinish())
  }
}

function* addServiceSubTypeSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addServiceSubType, body)
    yield put(actions.addServiceSubTypeSuccess(response.data?.data))
    yield put(actions.addServiceSubTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addServiceSubTypeFinish())
  }
}

function* enableServiceSubTypeSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableServiceSubType, selectedUsers)
    yield put(actions.enableServiceSubTypeSuccess(response?.data))
    yield put(actions.enableServiceSubTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableServiceSubTypeFinish())
  }
}

function* disableServiceSubTypeSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableServiceSubType, selectedUsers)
    yield put(actions.disableServiceSubTypeSuccess(response?.data))
    yield put(actions.disableServiceSubTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableServiceSubTypeFinish())
  }
}

function* singleEnableServiceSubTypeSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableServiceSubType, selectedUsers)
    yield put(actions.singleEnableServiceSubTypeSuccess(response?.data))
    yield put(actions.singleEnableServiceSubTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableServiceSubTypeFinish())
  }
}

function* singleDisableServiceSubTypeSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableServiceSubType, selectedUsers)
    yield put(actions.singleDisableServiceSubTypeSuccess(response?.data))
    yield put(actions.singleDisableServiceSubTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableServiceSubTypeFinish())
  }
}

function* updateServiceSubTypeSaga(action: ActionModel) {
  try {
    const body: ServiceSubTypeModel = action.payload
    const response: ResponseModel = yield call(
      service.updateServiceSubType,
      body,
      action.payload?.id
    )
    yield put(actions.updateServiceSubTypeSuccess(response.data?.data))
    yield put(actions.updateServiceSubTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateServiceSubTypeFinish())
  }
}

function* deleteServiceSubTypeSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteServiceSubType, body)
    yield put(actions.deleteServiceSubTypeSuccess(response.data?.data))
    yield put(actions.deleteServiceSubTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteServiceSubTypeFinish())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_SERVICE_SUB_TYPE_START, getServiceSubTypeSaga)
  yield takeLatest(actionTypes.GET_ALL_SERVICE_SUB_TYPE_START, getAllServiceSubTypeSaga)
  yield takeLatest(actionTypes.ADD_SERVICE_SUB_TYPE_START, addServiceSubTypeSaga)
  yield takeLatest(actionTypes.UPDATE_SERVICE_SUB_TYPE_START, updateServiceSubTypeSaga)
  yield takeLatest(actionTypes.DELETE_SERVICE_SUB_TYPE_START, deleteServiceSubTypeSaga)
  yield takeLatest(actionTypes.ENABLE_SERVICE_SUB_TYPE_REQUEST, enableServiceSubTypeSaga)
  yield takeLatest(actionTypes.DISABLE_SERVICE_SUB_TYPE_REQUEST, disableServiceSubTypeSaga)
  yield takeLatest(
    actionTypes.SINGLE_ENABLE_SERVICE_SUB_TYPE_REQUEST,
    singleEnableServiceSubTypeSaga
  )
  yield takeLatest(
    actionTypes.SINGLE_DISABLE_SERVICE_SUB_TYPE_REQUEST,
    singleDisableServiceSubTypeSaga
  )
}
