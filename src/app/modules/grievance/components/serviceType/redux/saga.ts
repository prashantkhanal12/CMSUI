import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ServiceTypeModel} from '../Model/ServiceTypeModel'
import {ParamsModel} from 'src/app/modules/common/Model'

function* getServiceTypeSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getServiceType, params)
    yield put(actions.getServiceTypeSuccess(response?.data?.data))
    yield put(actions.getServiceTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getServiceTypeFinish())
  }
}

function* getAllServiceTypeSaga() {
  try {
    const response: ResponseModel = yield call(service.getAllServiceType)
    yield put(actions.getAllServiceTypeSuccess(response?.data?.data))
    yield put(actions.getAllServiceTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllServiceTypeFinish())
  }
}

function* addServiceTypeSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addServiceType, body)
    yield put(actions.addServiceTypeSuccess(response.data?.data))
    yield put(actions.addServiceTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addServiceTypeFinish())
  }
}

function* enableServiceTypeSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableServiceType, selectedUsers)
    yield put(actions.enableServiceTypeSuccess(response?.data))
    yield put(actions.enableServiceTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableServiceTypeFinish())
  }
}

function* disableServiceTypeSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableServiceType, selectedUsers)
    yield put(actions.disableServiceTypeSuccess(response?.data))
    yield put(actions.disableServiceTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableServiceTypeFinish())
  }
}

function* singleEnableServiceTypeSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableServiceType, selectedUsers)
    yield put(actions.singleEnableServiceTypeSuccess(response?.data))
    yield put(actions.singleEnableServiceTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableServiceTypeFinish())
  }
}

function* singleDisableServiceTypeSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableServiceType, selectedUsers)
    yield put(actions.singleDisableServiceTypeSuccess(response?.data))
    yield put(actions.singleDisableServiceTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableServiceTypeFinish())
  }
}

function* updateServiceTypeSaga(action: ActionModel) {
  try {
    const body: ServiceTypeModel = action.payload
    const response: ResponseModel = yield call(service.updateServiceType, body, action.payload?.id)
    yield put(actions.updateServiceTypeSuccess(response.data?.data))
    yield put(actions.updateServiceTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateServiceTypeFinish())
  }
}

function* deleteServiceTypeSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteServiceType, body)
    yield put(actions.deleteServiceTypeSuccess(response.data?.data))
    yield put(actions.deleteServiceTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteServiceTypeFinish())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_SERVICE_TYPE_START, getServiceTypeSaga)
  yield takeLatest(actionTypes.GET_ALL_SERVICE_TYPE_START, getAllServiceTypeSaga)
  yield takeLatest(actionTypes.ADD_SERVICE_TYPE_START, addServiceTypeSaga)
  yield takeLatest(actionTypes.UPDATE_SERVICE_TYPE_START, updateServiceTypeSaga)
  yield takeLatest(actionTypes.DELETE_SERVICE_TYPE_START, deleteServiceTypeSaga)
  yield takeLatest(actionTypes.ENABLE_SERVICE_TYPE_REQUEST, enableServiceTypeSaga)
  yield takeLatest(actionTypes.DISABLE_SERVICE_TYPE_REQUEST, disableServiceTypeSaga)
  yield takeLatest(actionTypes.SINGLE_ENABLE_SERVICE_TYPE_REQUEST, singleEnableServiceTypeSaga)
  yield takeLatest(actionTypes.SINGLE_DISABLE_SERVICE_TYPE_REQUEST, singleDisableServiceTypeSaga)
}
