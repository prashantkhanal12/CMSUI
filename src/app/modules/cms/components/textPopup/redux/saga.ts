import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {SortTextPopupActionModel, SortTextPopupModel} from '../Model'

//Get Banner saga
function* getTextPopupSaga(action: ActionModel) {
  try {
    const params: any = action.payload?.params
    yield delay(500)
    const response: ResponseModel = yield call(service.getTextPopup, params)
    const data: any = response?.data
    yield put(actions.getTextPopupSuccess(data))
  } catch (error: any) {
    yield put(actions.getTextPopupError(error))
  }
}

//Create TextPopup
function* createTextPopupSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.addTextPopup, body)
    yield put({type: actionTypes.ADD_TEXT_POPUP_SUCCESS, payload: response.data})
    yield put({type: actionTypes.ADD_TEXT_POPUP_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.ADD_TEXT_POPUP_FINISH})
  }
}

//Update TextPopup
function* updateTextPopup(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(service.updateTextPopup, body, action.payload?.id)
    yield put({type: actionTypes.UPDATE_TEXT_POPUP_SUCCESS, payload: response.data})
    yield put({type: actionTypes.UPDATE_TEXT_POPUP_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.UPDATE_TEXT_POPUP_FINISH})
  }
}

//Activate Deactivate TextPopup Saga
function* activateTextPopupSaga(action: ActionModel) {
  try {
    const selectedBanners: any = action.payload?.data
    const response: ResponseModel = yield call(service.activateTextPopup, selectedBanners)
    yield put({type: actionTypes.ACTIVATE_TEXT_POPUP_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.ACTIVATE_TEXT_POPUP_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.ACTIVATE_TEXT_POPUP_FINISH})
  }
}

function* singleActivateTextPopupSaga(action: ActionModel) {
  try {
    const selectedBanner: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleActivateTextPopup, selectedBanner)

    yield put({type: actionTypes.SINGLE_ACTIVATE_TEXT_POPUP_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.SINGLE_ACTIVATE_TEXT_POPUP_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_ACTIVATE_TEXT_POPUP_FINISH})
  }
}

function* deactivateTextPopupSaga(action: ActionModel) {
  try {
    const selectedBanner: any = action.payload?.data
    const response: ResponseModel = yield call(service.deactivateTextPopup, selectedBanner)

    yield put({type: actionTypes.DEACTIVATE_TEXT_POPUP_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.DEACTIVATE_TEXT_POPUP_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.DEACTIVATE_TEXT_POPUP_FINISH})
  }
}

function* singleDeactivateTextPopupSaga(action: ActionModel) {
  try {
    const selectedBanner: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDeactivateTextPopup, selectedBanner)
    yield put({type: actionTypes.SINGLE_ACTIVATE_TEXT_POPUP_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.SINGLE_ACTIVATE_TEXT_POPUP_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_ACTIVATE_TEXT_POPUP_FINISH})
  }
}

function* deleteTextPopupSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteTextPopup, body)
    yield put({type: actionTypes.DELETE_TEXT_POPUP_SUCCESS})
    yield put({type: actionTypes.DELETE_TEXT_POPUP_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.DELETE_TEXT_POPUP_FINISH})
  }
}

function* sortTextPopup(action: SortTextPopupActionModel) {
  try {
    const body: SortTextPopupModel = action.payload
    const response: ResponseModel = yield call(service.sortTextPopup, body)

    yield put({
      type: actionTypes.SORT_TEXT_POPUP_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_TEXT_POPUP_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_TEXT_POPUP_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_TEXT_POPUP_START, getTextPopupSaga)
  yield takeLatest(actionTypes.ADD_TEXT_POPUP_REQUEST, createTextPopupSaga)
  yield takeLatest(actionTypes.UPDATE_TEXT_POPUP_START, updateTextPopup)
  yield takeLatest(actionTypes.DELETE_TEXT_POPUP_START, deleteTextPopupSaga)
  yield takeLatest(actionTypes.ACTIVATE_TEXT_POPUP_REQUEST, activateTextPopupSaga)
  yield takeLatest(actionTypes.DEACTIVATE_TEXT_POPUP_REQUEST, deactivateTextPopupSaga)
  yield takeLatest(actionTypes.SINGLE_ACTIVATE_TEXT_POPUP_REQUEST, singleActivateTextPopupSaga)
  yield takeLatest(actionTypes.SINGLE_DEACTIVATE_TEXT_POPUP_REQUEST, singleDeactivateTextPopupSaga)
  yield takeLatest(actionTypes.SORT_TEXT_POPUP_START, sortTextPopup)
}
