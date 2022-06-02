import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ParamsModel} from 'src/app/modules/common/Model'
import {ApplyLoanModel} from '../Model'

function* getApplyLoanSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getApplyLoan, params)
    yield put(actions.getApplyLoanSuccess(response?.data?.data))
    yield put(actions.getApplyLoanFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getApplyLoanFinish())
  }
}

function* getMunicipalitySaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getMunicipality, params)
    yield put(actions.getMunicipalitySuccess(response?.data?.data))
    yield put(actions.getMunicipalityFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getMunicipalityFinish())
  }
}

function* addApplyLoanSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addApplyLoan, body)
    yield put(actions.addApplyLoanSuccess(response.data?.data))
    yield put(actions.addApplyLoanFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addApplyLoanFinish())
  }
}

function* enableMemberTypeSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableApplyLoan, selectedUsers)
    yield put(actions.enableApplyLoanSuccess(response?.data))
    yield put(actions.enableApplyLoanFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableApplyLoanFinish())
  }
}

function* disableApplyLoanSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableApplyLoan, selectedUsers)
    yield put(actions.disableApplyLoanSuccess(response?.data))
    yield put(actions.disableApplyLoanFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableApplyLoanFinish())
  }
}

function* singleEnableApplyLoanSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableApplyLoan, selectedUsers)
    yield put(actions.singleEnableApplyLoanSuccess(response?.data))
    yield put(actions.singleEnableApplyLoanFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableApplyLoanFinish())
  }
}

function* singleDisableApplyLoanSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableApplyLoan, selectedUsers)
    yield put(actions.singleDisableApplyLoanSuccess(response?.data))
    yield put(actions.singleDisableApplyLoanFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableApplyLoanFinish())
  }
}

function* updateApplyLoanSaga(action: ActionModel) {
  try {
    const body: ApplyLoanModel = action.payload
    const params: any = action
    const response: ResponseModel = yield call(service.updateApplyLoan, body, params.id)

    yield put(actions.updateApplyLoanSuccess(response.data?.data))
    yield put(actions.updateApplyLoanFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateApplyLoanFinish())
  }
}

function* deleteApplyLoanSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteApplyLoan, body)
    yield put(actions.deleteApplyLoanSuccess(response.data?.data))
    yield put(actions.deleteApplyLoanFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteApplyLoanFinish())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_APPLY_LOAN_START, getApplyLoanSaga)
  yield takeLatest(actionTypes.GET_MUNICIPALITY_START, getMunicipalitySaga)
  yield takeLatest(actionTypes.ADD_APPLY_LOAN_START, addApplyLoanSaga)
  yield takeLatest(actionTypes.UPDATE_APPLY_LOAN_START, updateApplyLoanSaga)
  yield takeLatest(actionTypes.DELETE_APPLY_LOAN_START, deleteApplyLoanSaga)
  yield takeLatest(actionTypes.ENABLE_APPLY_LOAN_REQUEST, enableMemberTypeSaga)
  yield takeLatest(actionTypes.DISABLE_APPLY_LOAN_REQUEST, disableApplyLoanSaga)
  yield takeLatest(actionTypes.SINGLE_ENABLE_APPLY_LOAN_REQUEST, singleEnableApplyLoanSaga)
  yield takeLatest(actionTypes.SINGLE_DISABLE_APPLY_LOAN_REQUEST, singleDisableApplyLoanSaga)
}
