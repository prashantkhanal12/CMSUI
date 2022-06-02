import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ProductTagModel} from '../Model/ProductTagModel'
import {ParamsModel} from 'src/app/modules/common/Model'

function* getProductTagSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload

    yield delay(500)
    const response: ResponseModel = yield call(service.getProductTag, params)
    yield put(actions.getProductTagSuccess(response?.data?.data))
    yield put(actions.getProductTagFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getProductTagFinish())
  }
}

function* getAllProductTagSaga() {
  try {
    const response: ResponseModel = yield call(service.getAllProductTag)
    yield put(actions.getAllProductTagSuccess(response?.data?.data))
    yield put(actions.getAllProductTagFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllProductTagFinish())
  }
}

function* addProductTagSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addProductTag, body)
    yield put(actions.addProductTagSuccess(response.data?.data))
    yield put(actions.addProductTagFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addProductTagFinish())
  }
}

function* enableProductTagSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableProductTag, selectedUsers)
    yield put(actions.enableProductTagSuccess(response?.data))
    yield put(actions.enableProductTagFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableProductTagFinish())
  }
}

function* disableProductTagSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableProductTag, selectedUsers)
    yield put(actions.disableProductTagSuccess(response?.data))
    yield put(actions.disableProductTagFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableProductTagFinish())
  }
}

function* singleEnableProductTagSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableProductTag, selectedUsers)
    yield put(actions.singleEnableProductTagSuccess(response?.data))
    yield put(actions.singleEnableProductTagFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableProductTagFinish())
  }
}

function* singleDisableProductTagSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableProductTag, selectedUsers)
    yield put(actions.singleDisableProductTagSuccess(response?.data))
    yield put(actions.singleDisableProductTagFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableProductTagFinish())
  }
}

function* updateProductTagSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.updateProductTag, body, action.payload?.id)
    yield put(actions.updateProductTagSuccess(response.data?.data))
    yield put(actions.updateProductTagFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateProductTagFinish())
  }
}

function* deleteProductTagSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteProductTag, body)
    yield put(actions.deleteProductTagSuccess(response.data?.data))
    yield put(actions.deleteProductTagFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteProductTagFinish())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_PRODUCT_TAG_START, getProductTagSaga)
  yield takeLatest(actionTypes.GET_ALL_PRODUCT_TAG_START, getAllProductTagSaga)
  yield takeLatest(actionTypes.ADD_PRODUCT_TAG_START, addProductTagSaga)
  yield takeLatest(actionTypes.UPDATE_PRODUCT_TAG_START, updateProductTagSaga)
  yield takeLatest(actionTypes.DELETE_PRODUCT_TAG_START, deleteProductTagSaga)
  yield takeLatest(actionTypes.ENABLE_PRODUCT_TAG_REQUEST, enableProductTagSaga)
  yield takeLatest(actionTypes.DISABLE_PRODUCT_TAG_REQUEST, disableProductTagSaga)
  yield takeLatest(actionTypes.SINGLE_ENABLE_PRODUCT_TAG_REQUEST, singleEnableProductTagSaga)
  yield takeLatest(actionTypes.SINGLE_DISABLE_PRODUCT_TAG_REQUEST, singleDisableProductTagSaga)
}
