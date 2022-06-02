import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'

import {OfferManagerModel} from '../Model/OfferManagerModel'
import {ParamsModel} from 'src/app/modules/common/Model'
import {SortOfferManagerActionModel, SortOfferManagerModel} from '../Model'

function* getOfferSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getOffer, params)
    yield put(actions.getOfferSuccess(response?.data?.data))
    yield put(actions.getOfferFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getOfferFinish())
  }
}

function* getAllOfferSaga() {
  try {
    const response: ResponseModel = yield call(service.getAllOffer)
    yield put(actions.getAllOfferSuccess(response?.data?.data))
    yield put(actions.getAllOfferFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllOfferFinish())
  }
}

function* getDiscountTypeSaga() {
  try {
    const response: ResponseModel = yield call(service.getDiscountType)
    yield put(actions.getDiscountTypeSuccess(response?.data?.data))
    yield put(actions.getDiscountTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getDiscountTypeFinish())
  }
}

function* addOfferSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addOffer, body)
    yield put(actions.addOfferSuccess(response.data?.data))
    yield put(actions.addOfferFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addOfferFinish())
  }
}

function* enableOfferSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableOffer, selectedUsers)
    yield put(actions.enableOfferSuccess(response?.data))
    yield put(actions.enableOfferFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableOfferFinish())
  }
}

function* disableOfferSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableOffer, selectedUsers)
    yield put(actions.disableOfferSuccess(response?.data))
    yield put(actions.disableOfferFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableOfferFinish())
  }
}

function* singleEnableOfferSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableOffer, selectedUsers)
    yield put(actions.singleEnableOfferSuccess(response?.data))
    yield put(actions.singleEnableOfferFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableOfferFinish())
  }
}

function* singleDisableOfferSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableOffer, selectedUsers)
    yield put(actions.singleDisableOfferSuccess(response?.data))
    yield put(actions.singleDisableOfferFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableOfferFinish())
  }
}

function* updateOfferSaga(action: ActionModel) {
  try {
    const body: OfferManagerModel = action.payload
    const response: ResponseModel = yield call(service.updateOffer, body, action.payload?.id)
    yield put(actions.updateOfferSuccess(response.data?.data))
    yield put(actions.updateOfferFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateOfferFinish())
  }
}

function* deleteOfferSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteOffer, body)
    yield put(actions.deleteOfferSuccess(response.data?.data))
    yield put(actions.deleteOfferFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteOfferFinish())
  }
}

function* sortOfferManager(action: SortOfferManagerActionModel) {
  try {
    const body: SortOfferManagerModel = action.payload
    const response: ResponseModel = yield call(service.sortOfferManager, body)

    yield put({
      type: actionTypes.SORT_OFFER_MANAGER_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_OFFER_MANAGER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_OFFER_MANAGER_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_OFFER_START, getOfferSaga)
  yield takeLatest(actionTypes.GET_DISCOUNT_TYPE_START, getDiscountTypeSaga)
  yield takeLatest(actionTypes.GET_ALL_OFFER_START, getAllOfferSaga)
  yield takeLatest(actionTypes.ADD_OFFER_START, addOfferSaga)
  yield takeLatest(actionTypes.UPDATE_OFFER_START, updateOfferSaga)
  yield takeLatest(actionTypes.DELETE_OFFER_START, deleteOfferSaga)
  yield takeLatest(actionTypes.ENABLE_OFFER_REQUEST, enableOfferSaga)
  yield takeLatest(actionTypes.DISABLE_OFFER_REQUEST, disableOfferSaga)
  yield takeLatest(actionTypes.SINGLE_ENABLE_OFFER_REQUEST, singleEnableOfferSaga)
  yield takeLatest(actionTypes.SINGLE_DISABLE_OFFER_REQUEST, singleDisableOfferSaga)
  yield takeLatest(actionTypes.SORT_OFFER_MANAGER_START, sortOfferManager)
}
