import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {SortRoadBlockActionModel, SortRoadBlockModel} from '../Model'

//Get List of Raod Block
function* getAllRoadBlockPopupSaga(action: ActionModel) {
  try {
    const response: ResponseModel = yield call(service.getAllRoadBlock)
    const data: any = response?.data
    yield put(actions.getAllRoadBlockSuccess(data))
  } catch (error: any) {
    if (error.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: error.response.data.message})
    }
    yield put(actions.getAllRoadBlockError())
  }
}

//Get Road Block saga
function* getRoadBlockPopupSaga(action: ActionModel) {
  try {
    const params: any = action.payload?.params
    yield delay(500)
    const response: ResponseModel = yield call(service.getRoadBlockPopup, params)
    const data: any = response?.data
    yield put(actions.getRoadBlockPopupSuccess(data))
  } catch (error: any) {
    yield put(actions.getRoadBlockPopupError(error))
  }
}

//Create Road Block Saga
function* createRoadBlockPopupSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.addRoadBlockPopup, body)
    yield put({type: actionTypes.ADD_ROAD_BLOCK_POPUP_SUCCESS, payload: response.data})
    yield put({type: actionTypes.ADD_ROAD_BLOCK_POPUP_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.ADD_ROAD_BLOCK_POPUP_FINISH})
  }
}

//Update Road Block Popup
function* updateRoadBlockPopup(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.updateRoadBlockPopup,
      body,
      action.payload?.id
    )
    yield put({type: actionTypes.UPDATE_ROAD_BLOCK_POPUP_SUCCESS, payload: response.data})
    yield put({type: actionTypes.UPDATE_ROAD_BLOCK_POPUP_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.UPDATE_ROAD_BLOCK_POPUP_FINISH})
  }
}

//Activate Deactivate Road Block Popup Saga
function* activateRoadBlockPopupSaga(action: ActionModel) {
  try {
    const selectedRoadBlock: any = action.payload?.data
    const response: ResponseModel = yield call(service.activateRoadBlockPopup, selectedRoadBlock)
    yield put({type: actionTypes.ACTIVATE_ROAD_BLOCK_POPUP_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.ACTIVATE_ROAD_BLOCK_POPUP_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.ACTIVATE_ROAD_BLOCK_POPUP_FINISH})
  }
}

function* singleActivateRoadBlockPopupSaga(action: ActionModel) {
  try {
    const selectedBanner: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleActivateRoadBlockPopup, selectedBanner)

    yield put({type: actionTypes.SINGLE_ACTIVATE_ROAD_BLOCK_POPUP_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.SINGLE_ACTIVATE_ROAD_BLOCK_POPUP_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_ACTIVATE_ROAD_BLOCK_POPUP_FINISH})
  }
}

function* deactivateRoadBlockPopupSaga(action: ActionModel) {
  try {
    const selectedRoadBlock: any = action.payload?.data
    const response: ResponseModel = yield call(service.deactivateRoadBlockPopup, selectedRoadBlock)

    yield put({type: actionTypes.DEACTIVATE_ROAD_BLOCK_POPUP_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.DEACTIVATE_ROAD_BLOCK_POPUP_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.DEACTIVATE_ROAD_BLOCK_POPUP_FINISH})
  }
}

function* singleDeactivateRoadBlockPopupSaga(action: ActionModel) {
  try {
    const selectedRoadBlock: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.singleDeactivateRoadBlockPopup,
      selectedRoadBlock
    )
    yield put({type: actionTypes.SINGLE_ACTIVATE_ROAD_BLOCK_POPUP_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.SINGLE_ACTIVATE_ROAD_BLOCK_POPUP_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_ACTIVATE_ROAD_BLOCK_POPUP_FINISH})
  }
}

function* deleteRoadBlockPopupSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteRoadBlockPopup, body)
    yield put({type: actionTypes.DELETE_ROAD_BLOCK_POPUP_SUCCESS})
    yield put({type: actionTypes.DELETE_ROAD_BLOCK_POPUP_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.DELETE_ROAD_BLOCK_POPUP_FINISH})
  }
}

function* sortRoadBlockPopup(action: SortRoadBlockActionModel) {
  try {
    const body: SortRoadBlockModel = action.payload
    const response: ResponseModel = yield call(service.sortRoadBlock, body)

    yield put({
      type: actionTypes.SORT_ROAD_BLOCK_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_ROAD_BLOCK_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_ROAD_BLOCK_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_ROAD_BLOCK_POPUP_START, getRoadBlockPopupSaga)
  yield takeLatest(actionTypes.ADD_ROAD_BLOCK_POPUP_REQUEST, createRoadBlockPopupSaga)
  yield takeLatest(actionTypes.UPDATE_ROAD_BLOCK_POPUP_START, updateRoadBlockPopup)
  yield takeLatest(actionTypes.DELETE_ROAD_BLOCK_POPUP_START, deleteRoadBlockPopupSaga)
  yield takeLatest(actionTypes.ACTIVATE_ROAD_BLOCK_POPUP_REQUEST, activateRoadBlockPopupSaga)
  yield takeLatest(actionTypes.DEACTIVATE_ROAD_BLOCK_POPUP_REQUEST, deactivateRoadBlockPopupSaga)
  yield takeLatest(
    actionTypes.SINGLE_ACTIVATE_ROAD_BLOCK_POPUP_REQUEST,
    singleActivateRoadBlockPopupSaga
  )
  yield takeLatest(
    actionTypes.SINGLE_DEACTIVATE_ROAD_BLOCK_POPUP_REQUEST,
    singleDeactivateRoadBlockPopupSaga
  )
  yield takeLatest(actionTypes.SORT_ROAD_BLOCK_START, sortRoadBlockPopup)
  yield takeLatest(actionTypes.GET_ALL_ROAD_BLOCK_START, getAllRoadBlockPopupSaga)
}
