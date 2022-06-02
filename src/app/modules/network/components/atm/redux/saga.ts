import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ParamsModel} from 'src/app/modules/common/Model'
import {AtmModel} from '../Model/AtmModel'

function* getAtmDataSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getAtmData, params)
    yield put(actions.getAtmDataSuccess(response?.data?.data))
    yield put(actions.getAtmDataFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAtmDataFinish())
  }
}

function* addAtmSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addAtm, body)
    yield put(actions.addAtmSuccess(response.data?.data))
    yield put(actions.addAtmFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addAtmFinish())
  }
}

function* enableAtmSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableAtm, selectedUsers)
    yield put(actions.enableAtmSuccess(response?.data))
    yield put(actions.enableAtmFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableAtmFinish())
  }
}

function* disableAtmSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableAtm, selectedUsers)
    yield put(actions.disableAtmSuccess(response?.data))
    yield put(actions.disableAtmFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableAtmFinish())
  }
}

function* singleEnableAtmSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableAtm, selectedUsers)
    yield put(actions.singleEnableAtmSuccess(response?.data))
    yield put(actions.singleEnableAtmFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableAtmFinish())
  }
}

function* singleDisableAtmSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableAtm, selectedUsers)
    yield put(actions.singleDisableAtmSuccess(response?.data))
    yield put(actions.singleDisableAtmFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableAtmFinish())
  }
}

function* importAtmSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.importAtm, body)
    yield put(actions.importAtmSuccess(response.data?.data))
    yield put(actions.importAtmFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.importAtmFinish())
  }
}

function* updateAtmSaga(action: ActionModel) {
  try {
    const body: AtmModel = action.payload
    const response: ResponseModel = yield call(service.updateAtm, body, action.payload?.id)
    yield put(actions.updateAtmSuccess(response.data?.data))
    yield put(actions.updateAtmFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateAtmFinish())
  }
}

function* deleteAtmSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteAtm, body)
    yield put(actions.deleteAtmSuccess(response.data?.data))
    yield put(actions.deleteAtmFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteAtmFinish())
  }
}

//Get Atmless file
function* exportFileSaga(action: ActionModel) {
  try {
    const fileName: any = action.payload.fileName
    yield delay(500)
    const data: any = action.payload.params
    const response: ResponseModel = yield call(service.exportFile, fileName, data)
    const responseData: any = response?.data
    yield put(actions.exportFileSuccess(responseData))
    yield put(actions.exportFileError())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.exportFileError())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_ATM_DATA_START, getAtmDataSaga)
  yield takeLatest(actionTypes.ADD_ATM_START, addAtmSaga)
  yield takeLatest(actionTypes.UPDATE_ATM_START, updateAtmSaga)
  yield takeLatest(actionTypes.DELETE_ATM_START, deleteAtmSaga)
  yield takeLatest(actionTypes.ENABLE_ATM_REQUEST, enableAtmSaga)
  yield takeLatest(actionTypes.DISABLE_ATM_REQUEST, disableAtmSaga)
  yield takeLatest(actionTypes.SINGLE_ENABLE_ATM_REQUEST, singleEnableAtmSaga)
  yield takeLatest(actionTypes.SINGLE_DISABLE_ATM_REQUEST, singleDisableAtmSaga)
  yield takeLatest(actionTypes.EXPORT_ATM_FILE_START, exportFileSaga)
  yield takeLatest(actionTypes.IMPORT_ATM_START, importAtmSaga)
}
