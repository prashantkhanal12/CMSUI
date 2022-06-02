import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {BranchlessModel} from './../Model/BranchlessModel'
import {ParamsModel} from 'src/app/modules/common/Model'

// get branchless banking
function* getBranchlessBanking(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    const response: ResponseModel = yield call(service.getBranchlessBanking, params)
    yield put(actions.getBranchlessBankingSuccess(response?.data))
    yield put({type: actionTypes.GET_BRANCHLESS_BANKING_FINISH})
  } catch (err: any) {
    yield put(actions.getBranchlessBankingError(err))
  }
}

// add branchless banking
function* addBranchlessBanking(action: ActionModel) {
  try {
    const body: BranchlessModel = action.payload
    const response: ResponseModel = yield call(service.postBranchlessBanking, body)

    yield put({type: actionTypes.ADD_BRANCHLESS_BANKING_SUCCESS, payload: response.data})
    yield put({type: actionTypes.ADD_BRANCHLESS_BANKING_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.ADD_BRANCHLESS_BANKING_FINISH})
  }
}

function* updateBranchlessBanking(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.updateBranchlessBanking,
      body,
      action.payload?.id
    )
    yield put({type: actionTypes.UPDATE_BRANCHLESS_BANKING_SUCCESS, payload: response.data})
    yield put({type: actionTypes.UPDATE_BRANCHLESS_BANKING_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.UPDATE_BRANCHLESS_BANKING_FINISH})
  }
}

function* deleteBranchlessBanking(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteBranchlessBanking, body)
    yield put({type: actionTypes.DELETE_BRANCHLESS_BANKING_SUCCESS, payload: response.data})
    yield put({type: actionTypes.DELETE_BRANCHLESS_BANKING_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.DELETE_BRANCHLESS_BANKING_FINISH})
  }
}

function* singleActivateBranchlessBanking(action: ActionModel) {
  try {
    const selectedBranchlessBanking: any = action.payload
    const response: ResponseModel = yield call(
      service.singleActivateBranchlessBanking,
      selectedBranchlessBanking
    )
    yield put({
      type: actionTypes.SINGLE_ACTIVATE_BRANCHLESS_BANKING_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SINGLE_ACTIVATE_BRANCHLESS_BANKING_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_ACTIVATE_BRANCHLESS_BANKING_FINISH})
  }
}

function* singleDeactivateBranchlessBanking(action: ActionModel) {
  try {
    const selectedBranchlessBanking: any = action.payload
    const response: ResponseModel = yield call(
      service.singleDeactivateBranchlessBanking,
      selectedBranchlessBanking
    )

    yield put({
      type: actionTypes.SINGLE_DEACTIVATE_BRANCHLESS_BANKING_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SINGLE_DEACTIVATE_BRANCHLESS_BANKING_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_DEACTIVATE_BRANCHLESS_BANKING_FINISH})
  }
}

//Get branchless file
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

export function* saga() {
  yield takeLatest(actionTypes.GET_BRANCHLESS_BANKING_START, getBranchlessBanking)
  yield takeLatest(actionTypes.ADD_BRANCHLESS_BANKING_START, addBranchlessBanking)
  yield takeLatest(actionTypes.UPDATE_BRANCHLESS_BANKING_START, updateBranchlessBanking)
  yield takeLatest(actionTypes.DELETE_BRANCHLESS_BANKING_START, deleteBranchlessBanking)
  yield takeLatest(
    actionTypes.SINGLE_ACTIVATE_BRANCHLESS_BANKING_REQUEST,
    singleActivateBranchlessBanking
  )
  yield takeLatest(
    actionTypes.SINGLE_DEACTIVATE_BRANCHLESS_BANKING_REQUEST,
    singleDeactivateBranchlessBanking
  )
  yield takeLatest(actionTypes.EXPORT_BRANCHLESS_FILE_START, exportFileSaga)
}
