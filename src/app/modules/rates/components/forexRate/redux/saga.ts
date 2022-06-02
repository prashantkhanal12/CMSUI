import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'

//Get Forex Rate
function* getForexRateSaga(action: ActionModel) {
  try {
    const params: any = action.payload?.params
    yield delay(500)
    const response: ResponseModel = yield call(service.getForexRate, params)
    const data: any = response?.data
    yield put(actions.getForexRateSuccess(data))
  } catch (error: any) {
    yield put(actions.getForexRateError(error))
  }
}

//Get gold rate file
function* getForexRateFileSaga(action: ActionModel) {
  try {
    const fileName: any = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getForexRateFile, fileName)
    const data: any = response?.data
    yield put(actions.getForexRateFileSuccess(data))
  } catch (error: any) {
    yield put(actions.getForexRateFileError(error))
  }
}

//Activate Deactivate Forex Rate
function* activateForexRatesSaga(action: ActionModel) {
  try {
    const selectedForexRate: any = action.payload?.data
    const response: ResponseModel = yield call(service.activateForexRate, selectedForexRate)
    yield put({type: actionTypes.ACTIVATE_FOREX_RATE_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.ACTIVATE_FOREX_RATE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.ACTIVATE_FOREX_RATE_FINISH})
  }
}

//Single Activate
function* singleActivateForexRate(action: ActionModel) {
  try {
    const selectedForexRate: any = action.payload
    const response: ResponseModel = yield call(service.singleActivateForexRate, selectedForexRate)
    yield put({type: actionTypes.SINGLE_ACTIVATE_FOREX_RATE_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.SINGLE_ACTIVATE_FOREX_RATE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_ACTIVATE_FOREX_RATE_FINISH})
  }
}

function* singleDeactivateForex(action: ActionModel) {
  try {
    const selectedGoldRate: any = action.payload
    const response: ResponseModel = yield call(service.singleDeactivateForexRate, selectedGoldRate)
    yield put({type: actionTypes.SINGLE_DEACTIVATE_FOREX_RATE_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.SINGLE_DEACTIVATE_FOREX_RATE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_DEACTIVATE_FOREX_RATE_FINISH})
  }
}

function* deactivateForexRate(action: ActionModel) {
  try {
    const selectedGoldRate: any = action.payload?.data
    const response: ResponseModel = yield call(service.deactivateForexRate, selectedGoldRate)
    yield put({type: actionTypes.DEACTIVATE_FOREX_RATE_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.SINGLE_DEACTIVATE_FOREX_RATE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_DEACTIVATE_FOREX_RATE_FINISH})
  }
}

//Create Forex Rate
function* createForexRateSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.postForexRate, body)
    yield put({type: actionTypes.CREATE_FOREX_RATE_SUCCESS, payload: response.data})
    yield put({type: actionTypes.CREATE_FOREX_RATE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.CREATE_FOREX_RATE_FINISH})
  }
}

//Update Forex Rate
function* updateForexRateSaga(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(service.updateForexRate, body, action.payload?.id)
    yield put({type: actionTypes.UPDATE_FOREX_RATE_SUCCESS, payload: response.data})
    yield put({type: actionTypes.UPDATE_FOREX_RATE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.UPDATE_FOREX_RATE_FINISH})
  }
}

//Import Forex Rate File
function* importForexRateSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.importForexRate, body)
    yield put(actions.importForexRateSuccess(response.data?.data))
    yield put(actions.importForexRateFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.importForexRateFinish())
  }
}

//Delete Forex Rate
function* deleteForexRateSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteForexRate, body)
    yield put({type: actionTypes.DELETE_FOREX_RATE_SUCCESS, payload: response.data})
    yield put({type: actionTypes.DELETE_FOREX_RATE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.DELETE_FOREX_RATE_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_FOREX_RATE_START, getForexRateSaga)
  yield takeLatest(actionTypes.CREATE_FOREX_RATE_START, createForexRateSaga)
  yield takeLatest(actionTypes.UPDATE_FOREX_RATE_START, updateForexRateSaga)
  yield takeLatest(actionTypes.DELETE_FOREX_RATE_START, deleteForexRateSaga)
  yield takeLatest(actionTypes.GET_FOREX_RATE_FILE_START, getForexRateFileSaga)
  yield takeLatest(actionTypes.ACTIVATE_FOREX_RATE_REQUEST, activateForexRatesSaga)
  yield takeLatest(actionTypes.SINGLE_ACTIVATE_FOREX_RATE_REQUEST, singleActivateForexRate)
  yield takeLatest(actionTypes.DEACTIVATE_FOREX_RATE_REQUEST, deactivateForexRate)
  yield takeLatest(actionTypes.SINGLE_DEACTIVATE_FOREX_RATE_REQUEST, singleDeactivateForex)
  yield takeLatest(actionTypes.IMPORT_FOREX_RATE_START, importForexRateSaga)
}
