import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {OptionModel} from '../Model'
import {OperationInchargeModel} from '../Model/OperationInchargeModel'
import {ParamsModel} from 'src/app/modules/common/Model'

// get branchless banking
function* getOperationIncharge(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    const response: ResponseModel = yield call(service.getOperationIncharge, params)
    yield put(actions.getOperationInchargeSuccess(response?.data))
    yield put({type: actionTypes.GET_OPERATION_INCHARGE_FINISH})
  } catch (err: any) {
    yield put(actions.getOperationInchargeError(err))
  }
}

// add branchless banking
function* addOperationIncharge(action: ActionModel) {
  try {
    const body: OperationInchargeModel = action.payload
    const response: ResponseModel = yield call(service.postOperationIncharge, body)

    yield put({type: actionTypes.ADD_OPERATION_INCHARGE_SUCCESS, payload: response.data})
    yield put({type: actionTypes.ADD_OPERATION_INCHARGE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.ADD_OPERATION_INCHARGE_FINISH})
  }
}

function* updateOperationIncharge(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.updateOperationIncharge,
      body,
      action.payload?.id
    )
    yield put({type: actionTypes.UPDATE_OPERATION_INCHARGE_SUCCESS, payload: response.data})
    yield put({type: actionTypes.UPDATE_OPERATION_INCHARGE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.UPDATE_OPERATION_INCHARGE_FINISH})
  }
}

function* deleteOperationIncharge(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteOperationIncharge, body)
    yield put({type: actionTypes.DELETE_OPERATION_INCHARGE_SUCCESS, payload: response.data})
    yield put({type: actionTypes.DELETE_OPERATION_INCHARGE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.DELETE_OPERATION_INCHARGE_FINISH})
  }
}

function* singleActivateOperationIncharge(action: ActionModel) {
  try {
    const selectedOperationIncharge: any = action.payload
    const response: ResponseModel = yield call(
      service.singleActivateOperationIncharge,
      selectedOperationIncharge
    )
    yield put({
      type: actionTypes.SINGLE_ACTIVATE_OPERATION_INCHARGE_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SINGLE_ACTIVATE_OPERATION_INCHARGE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_ACTIVATE_OPERATION_INCHARGE_FINISH})
  }
}

function* singleDeactivateOperationIncharge(action: ActionModel) {
  try {
    const selectedOperationIncharge: any = action.payload
    const response: ResponseModel = yield call(
      service.singleDeactivateOperationIncharge,
      selectedOperationIncharge
    )

    yield put({
      type: actionTypes.SINGLE_DEACTIVATE_OPERATION_INCHARGE_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SINGLE_DEACTIVATE_OPERATION_INCHARGE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_DEACTIVATE_OPERATION_INCHARGE_FINISH})
  }
}

// //Get branchless file
function* exportFileSaga(action: ActionModel) {
  try {
    const fileName: any = action.payload.fileName
    yield delay(500)
    const data: any = action.payload.params
    const response: ResponseModel = yield call(service.exportFile, fileName, data)
    const responseData: any = response?.data
    yield put(actions.exportFileSuccess(responseData))
  } catch (error: any) {
    yield put(actions.exportFileError(error))
  }
}

function* importOperationInchargeSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.importOperationIncharge, body)
    yield put(actions.importOperationInchargeSuccess(response.data?.data))
    yield put(actions.importOperationInchargeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.importOperationInchargeFinish())
  }
}
export function* saga() {
  yield takeLatest(actionTypes.GET_OPERATION_INCHARGE_START, getOperationIncharge)
  yield takeLatest(actionTypes.ADD_OPERATION_INCHARGE_START, addOperationIncharge)
  yield takeLatest(actionTypes.UPDATE_OPERATION_INCHARGE_START, updateOperationIncharge)
  yield takeLatest(actionTypes.DELETE_OPERATION_INCHARGE_START, deleteOperationIncharge)
  yield takeLatest(
    actionTypes.SINGLE_ACTIVATE_OPERATION_INCHARGE_REQUEST,
    singleActivateOperationIncharge
  )
  yield takeLatest(
    actionTypes.SINGLE_DEACTIVATE_OPERATION_INCHARGE_REQUEST,
    singleDeactivateOperationIncharge
  )
  yield takeLatest(actionTypes.EXPORT_FILE_START, exportFileSaga)
  yield takeLatest(actionTypes.IMPORT_OPERATION_INCHARGE_START, importOperationInchargeSaga)
}
