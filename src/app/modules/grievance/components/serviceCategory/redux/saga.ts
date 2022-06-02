import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ServiceCategoryModel} from '../Model/ServiceCategoryModel'
import {ParamsModel} from 'src/app/modules/common/Model'

function* getServiceCategorySaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getServiceCategory, params)
    yield put(actions.getServiceCategorySuccess(response?.data?.data))
    yield put(actions.getServiceCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getServiceCategoryFinish())
  }
}

function* getAllServiceCategorySaga() {
  try {
    const response: ResponseModel = yield call(service.getAllServiceCategory)
    yield put(actions.getAllServiceCategorySuccess(response?.data?.data))
    yield put(actions.getAllServiceCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllServiceCategoryFinish())
  }
}

function* addServiceCategorySaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addServiceCategory, body)
    yield put(actions.addServiceCategorySuccess(response.data?.data))
    yield put(actions.addServiceCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addServiceCategoryFinish())
  }
}

function* enableServiceCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableServiceCategory, selectedUsers)
    yield put(actions.enableServiceCategorySuccess(response?.data))
    yield put(actions.enableServiceCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableServiceCategoryFinish())
  }
}

function* disableServiceCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableServiceCategory, selectedUsers)
    yield put(actions.disableServiceCategorySuccess(response?.data))
    yield put(actions.disableServiceCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableServiceCategoryFinish())
  }
}

function* singleEnableServiceCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableServiceCategory, selectedUsers)
    yield put(actions.singleEnableServiceCategorySuccess(response?.data))
    yield put(actions.singleEnableServiceCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableServiceCategoryFinish())
  }
}

function* singleDisableServiceCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableServiceCategory, selectedUsers)
    yield put(actions.singleDisableServiceCategorySuccess(response?.data))
    yield put(actions.singleDisableServiceCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableServiceCategoryFinish())
  }
}

function* updateServiceCategorySaga(action: ActionModel) {
  try {
    const body: ServiceCategoryModel = action.payload
    const response: ResponseModel = yield call(
      service.updateServiceCategory,
      body,
      action.payload?.id
    )
    yield put(actions.updateServiceCategorySuccess(response.data?.data))
    yield put(actions.updateServiceCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateServiceCategoryFinish())
  }
}

function* deleteServiceCategorySaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteServiceCategory, body)
    yield put(actions.deleteServiceCategorySuccess(response.data?.data))
    yield put(actions.deleteServiceCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteServiceCategoryFinish())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_SERVICE_CATEGORY_START, getServiceCategorySaga)
  yield takeLatest(actionTypes.GET_ALL_SERVICE_CATEGORY_START, getAllServiceCategorySaga)
  yield takeLatest(actionTypes.ADD_SERVICE_CATEGORY_START, addServiceCategorySaga)
  yield takeLatest(actionTypes.UPDATE_SERVICE_CATEGORY_START, updateServiceCategorySaga)
  yield takeLatest(actionTypes.DELETE_SERVICE_CATEGORY_START, deleteServiceCategorySaga)
  yield takeLatest(actionTypes.ENABLE_SERVICE_CATEGORY_REQUEST, enableServiceCategorySaga)
  yield takeLatest(actionTypes.DISABLE_SERVICE_CATEGORY_REQUEST, disableServiceCategorySaga)
  yield takeLatest(
    actionTypes.SINGLE_ENABLE_SERVICE_CATEGORY_REQUEST,
    singleEnableServiceCategorySaga
  )
  yield takeLatest(
    actionTypes.SINGLE_DISABLE_SERVICE_CATEGORY_REQUEST,
    singleDisableServiceCategorySaga
  )
}
