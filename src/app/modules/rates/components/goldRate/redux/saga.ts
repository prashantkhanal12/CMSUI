import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'

//Get Gold Rate
function* getGoldRateSaga(action: ActionModel) {
  try {
    const params: any = action.payload?.params
    yield delay(500)
    const response: ResponseModel = yield call(service.getGoldRate, params)
    const data: any = response?.data
    yield put(actions.getGoldRateSuccess(data))
    yield put(actions.getGoldRateError())
  } catch (error: any) {
    if (error.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: error.response.data.message})
    }
    yield put(actions.getGoldRateError())
  }
}

//Get gold rate file
function* getGoldRateFileSaga(action: ActionModel) {
  try {
    const fileName: any = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getGoldRateFile, fileName)
    const data: any = response?.data
    yield put(actions.getGoldRateFileSuccess(data))
    yield put(actions.getGoldRateFileError())
  } catch (error: any) {
    if (error.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: error.response.data.message})
    }
    yield put(actions.getGoldRateFileError())
  }
}

//Create Gold Rate
function* createGoldRateSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.postGoldRate, body)
    yield put({type: actionTypes.CREATE_GOLD_RATE_SUCCESS, payload: response.data})
    yield put({type: actionTypes.CREATE_GOLD_RATE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.CREATE_GOLD_RATE_FINISH})
  }
}

//Activate Deactivate Gold Rate
function* activateGoldRates(action: ActionModel) {
  try {
    const selectedGoldRate: any = action.payload?.data
    const response: ResponseModel = yield call(service.activateGoldRate, selectedGoldRate)
    yield put({type: actionTypes.ACTIVATE_GOLD_RATE_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.ACTIVATE_GOLD_RATE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.ACTIVATE_GOLD_RATE_FINISH})
  }
}

//Latest two
function* singleActivateGoldRate(action: ActionModel) {
  try {
    const selectedGoldRate: any = action.payload
    const response: ResponseModel = yield call(service.singleActivateGoldRate, selectedGoldRate)
    yield put({type: actionTypes.SINGLE_ACTIVATE_GOLD_RATE_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.SINGLE_ACTIVATE_GOLD_RATE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_ACTIVATE_GOLD_RATE_FINISH})
  }
}

function* singleDeactivateUser(action: ActionModel) {
  try {
    const selectedGoldRate: any = action.payload
    const response: ResponseModel = yield call(service.singleDeactivateGoldRate, selectedGoldRate)
    yield put({type: actionTypes.SINGLE_DEACTIVATE_GOLD_RATE_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.SINGLE_DEACTIVATE_GOLD_RATE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_DEACTIVATE_GOLD_RATE_FINISH})
  }
}

function* deactivateGoldRate(action: ActionModel) {
  try {
    const selectedGoldRate: any = action.payload?.data
    const response: ResponseModel = yield call(service.deactivateGoldRate, selectedGoldRate)
    yield put({type: actionTypes.DEACTIVATE_GOLD_RATE_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.DEACTIVATE_GOLD_RATE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.DEACTIVATE_GOLD_RATE_FINISH})
  }
}

//Import Gold Rate File
function* importGoldRateSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.importGoldRate, body)
    yield put(actions.importGoldRateSuccess(response.data?.data))
    yield put(actions.importGoldRateFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.importGoldRateFinish())
  }
}

//Update Gold Rate
function* updateGoldRateSaga(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(service.updateGoldRate, body, action.payload?.id)
    yield put({type: actionTypes.UPDATE_GOLD_RATE_SUCCESS, payload: response.data})
    yield put({type: actionTypes.UPDATE_GOLD_RATE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.UPDATE_GOLD_RATE_FINISH})
  }
}

function* deleteGoldRateSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteGoldRate, body)
    yield put({type: actionTypes.DELETE_GOLD_RATE_SUCCESS, payload: response.data})
    yield put({type: actionTypes.DELETE_GOLD_RATE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.DELETE_GOLD_RATE_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_GOLD_RATE_START, getGoldRateSaga)
  yield takeLatest(actionTypes.GET_GOLD_RATE_FILE_START, getGoldRateFileSaga)
  yield takeLatest(actionTypes.CREATE_GOLD_RATE_START, createGoldRateSaga)
  yield takeLatest(actionTypes.ACTIVATE_GOLD_RATE_REQUEST, activateGoldRates)
  yield takeLatest(actionTypes.SINGLE_ACTIVATE_GOLD_RATE_REQUEST, singleActivateGoldRate)
  yield takeLatest(actionTypes.DEACTIVATE_GOLD_RATE_REQUEST, deactivateGoldRate)
  yield takeLatest(actionTypes.SINGLE_DEACTIVATE_GOLD_RATE_REQUEST, singleDeactivateUser)
  yield takeLatest(actionTypes.UPDATE_GOLD_RATE_START, updateGoldRateSaga)
  yield takeLatest(actionTypes.DELETE_GOLD_RATE_START, deleteGoldRateSaga)
  yield takeLatest(actionTypes.IMPORT_GOLD_RATE_START, importGoldRateSaga)
}
