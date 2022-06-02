import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ParamsModel} from 'src/app/modules/common/Model'
import {ServiceTagModel, SortServiceTagActionModel, SortServiceTagModel} from '../Model'

function* getServiceTagSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getServiceTag, params)
    yield put(actions.getServiceTagSuccess(response?.data?.data))
    yield put(actions.getServiceTagFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getServiceTagFinish())
  }
}

function* addServiceTagSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addServiceTag, body)
    yield put(actions.addServiceTagSuccess(response.data?.data))
    yield put(actions.addServiceTagFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addServiceTagFinish())
  }
}

function* enableServiceTagSaga(action: ActionModel) {
  try {
    const selectedServiceCategory: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableServiceTag, selectedServiceCategory)
    yield put(actions.enableServiceTagSuccess(response?.data))
    yield put(actions.enableServiceTagFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableServiceTagFinish())
  }
}

function* disableServiceTagSaga(action: ActionModel) {
  try {
    const selectedServiceCategory: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableServiceTag, selectedServiceCategory)
    yield put(actions.disableServiceTagSuccess(response?.data))
    yield put(actions.disableServiceTagFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.disableServiceTagFinish())
  }
}

function* singleEnableServiceTagSaga(action: ActionModel) {
  try {
    const selectedServiceCategory: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.singleEnableServiceTag,
      selectedServiceCategory
    )
    yield put(actions.singleEnableServiceTagSuccess(response?.data))
    yield put(actions.singleEnableServiceTagFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableServiceTagFinish())
  }
}

function* singleDisableServiceTagSaga(action: ActionModel) {
  try {
    const selectedServiceCategory: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.singleDisableServiceTag,
      selectedServiceCategory
    )
    yield put(actions.singleDisableServiceTagSuccess(response?.data))
    yield put(actions.singleDisableServiceTagFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableServiceTagFinish())
  }
}

function* updateServiceTagSaga(action: ActionModel) {
  try {
    const body: ServiceTagModel = action.payload
    const response: ResponseModel = yield call(service.updateServiceTag, body, action.payload?.id)
    yield put(actions.updateServiceTagSuccess(response.data?.data))
    yield put(actions.updateServiceTagFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateServiceTagFinish())
  }
}

function* deleteServiceTagSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteServiceTag, body)

    yield put(actions.deleteServiceTagSuccess(response.data?.data))
    yield put(actions.deleteServiceTagFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteServiceTagFinish())
  }
}

function* getServiceTagListSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getServiceTagList, params)
    yield put(actions.getServiceTagListSuccess(response?.data?.data))
    yield put(actions.getServiceTagListFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getServiceTagFinish())
  }
}

function* sortServiceTag(action: SortServiceTagActionModel) {
  try {
    const body: SortServiceTagModel = action.payload
    const response: ResponseModel = yield call(service.sortServiceTag, body)

    yield put({
      type: actionTypes.SORT_SERVICE_TAG_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_SERVICE_TAG_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_SERVICE_TAG_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_SERVICE_TAG_DATA_START, getServiceTagSaga)
  yield takeLatest(actionTypes.ADD_SERVICE_TAG_DATA_START, addServiceTagSaga)
  yield takeLatest(actionTypes.UPDATE_SERVICE_TAG_DATA_START, updateServiceTagSaga)
  yield takeLatest(actionTypes.DELETE_SERVICE_TAG_DATA_START, deleteServiceTagSaga)
  yield takeLatest(actionTypes.ENABLE_SERVICE_TAG_DATA_REQUEST, enableServiceTagSaga)
  yield takeLatest(actionTypes.DISABLE_SERVICE_TAG_DATA_REQUEST, disableServiceTagSaga)
  yield takeLatest(actionTypes.SINGLE_ENABLE_SERVICE_TAG_DATA_REQUEST, singleEnableServiceTagSaga)
  yield takeLatest(actionTypes.SINGLE_DISABLE_SERVICE_TAG_DATA_REQUEST, singleDisableServiceTagSaga)
  yield takeLatest(actionTypes.GET_SERVICE_TAG_LIST_START, getServiceTagListSaga)
  yield takeLatest(actionTypes.SORT_SERVICE_TAG_START, sortServiceTag)
}
