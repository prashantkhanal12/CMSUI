import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {CsrResponseModel} from '../Model'

function* getCsrDataSaga(action: ActionModel) {
  try {
    const params: any = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getCsrData, params)
    yield put(actions.getCsrDataSuccess(response?.data?.data))
    yield put(actions.getCsrDataFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getCsrDataFinish())
  }
}

function* getCsrFileTypeSaga() {
  try {
    const response: CsrResponseModel = yield call(service.getCsrFileType)
    yield put(actions.getCsrFileTypeSuccess(response?.data?.data?.csrFileOption))
    yield put(actions.getCsrFileTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getCsrFileTypeFinish())
  }
}

function* getCsrListSaga() {
  try {
    const response: ResponseModel = yield call(service.getCsrList)
    yield put(actions.getCsrListSuccess(response?.data?.data))
    yield put(actions.getCsrListFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getCsrListFinish())
  }
}

function* addCsrItemSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addCsrItem, body)
    yield put(actions.addCsrItemSuccess(response.data?.data))
    yield put(actions.addCsrItemFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addCsrItemFinish())
  }
}

function* updateScrItemSaga(action: ActionModel) {
  try {
    const body: any = action.payload.data
    const response: ResponseModel = yield call(service.updateCsrItem, body, action.payload?.id)
    yield put(actions.updateCsrItemSuccess(response.data?.data))
    yield put(actions.updateCsrItemFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateCsrItemFinish())
  }
}

function* deleteCsrItemSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteBulkCsr, body)
    yield put(actions.deleteCsrItemSuccess(response.data?.data))
    yield put(actions.deleteCsrItemFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteCsrItemFinish())
  }
}

function* activateCsrSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.activateCsr, selectedUsers)
    yield put(actions.activateCsrSuccess(response?.data))
    yield put(actions.activateCsrFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.activateCsrFinish())
  }
}

function* deactivateCsrSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.deactivateCsr, selectedUsers)
    yield put(actions.deactivateCsrSuccess(response?.data))
    yield put(actions.deactivateCsrFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deactivateCsrFinish())
  }
}

function* singleActivateCsrSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleActivateCsr, selectedUsers)
    yield put(actions.singleActivateCsrSuccess(response?.data))
    yield put(actions.singleActivateCsrFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleActivateCsrFinish())
  }
}

function* singleDeactivateCsrSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDeactivateCsr, selectedUsers)
    yield put(actions.singleDeactivateCsrSuccess(response?.data))
    yield put(actions.singleDeactivateCsrFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDeactivateCsrFinish())
  }
}

function* sortCsr(action: any) {
  try {
    const data: any = action.payload?.data
    const response: ResponseModel = yield call(service.sortCategories, data)

    yield put({
      type: actionTypes.SORT_CSR_SUCCESS,
      payload: response?.data,
    })
    yield put({type: actionTypes.SORT_CSR_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_CSR_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_CSR_DATA_START, getCsrDataSaga)
  yield takeLatest(actionTypes.GET_CSR_LIST_START, getCsrListSaga)
  yield takeLatest(actionTypes.GET_CSR_FILE_TYPE_START, getCsrFileTypeSaga)
  yield takeLatest(actionTypes.ADD_CSR_ITEM_START, addCsrItemSaga)
  yield takeLatest(actionTypes.UPDATE_CSR_ITEM_START, updateScrItemSaga)
  yield takeLatest(actionTypes.DELETE_BULK_CSR_START, deleteCsrItemSaga)
  yield takeLatest(actionTypes.ACTIVATE_CSR_START, activateCsrSaga)
  yield takeLatest(actionTypes.DEACTIVATE_CSR_START, deactivateCsrSaga)
  yield takeLatest(actionTypes.SINGLE_ACTIVATE_CSR_START, singleActivateCsrSaga)
  yield takeLatest(actionTypes.SINGLE_DEACTIVATE_CSR_START, singleDeactivateCsrSaga)
  yield takeLatest(actionTypes.SORT_CSR_START, sortCsr)
}
