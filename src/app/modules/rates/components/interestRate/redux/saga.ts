import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ParamsModel} from 'src/app/modules/common/Model'
import {InterestRateModel} from '../Model'

function* getInterestRateSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getInterestRate, params)
    yield put(actions.getInterestRateSuccess(response?.data?.data))
    yield put(actions.getInterestRateFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getInterestRateFinish())
  }
}

//Get interest rate loan file
function* getInterestRateLoanFileSaga() {
  try {
    const response: ResponseModel = yield call(service.getInterestRateLoanFile)
    const data: any = response?.data
    yield put(actions.getInterestRateLoanFileSuccess(data))
  } catch (error: any) {
    yield put(actions.getInterestRateLoanFileError(error))
  }
}

//Get interest rate deposit file
function* getInterestRateDepositFileSaga() {
  try {
    const response: ResponseModel = yield call(service.getInterestRateDepositFile)
    const data: any = response?.data
    yield put(actions.getInterestRateDepositFileSuccess(data))
  } catch (error: any) {
    yield put(actions.getInterestRateDepositFileError(error))
  }
}

function* addInterestRateSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addInterestRate, body)
    yield put(actions.addInterestRateSuccess(response.data?.data))
    yield put(actions.addInterestRateFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addInterestRateFinish())
  }
}

function* enableInterestRateSaga(action: ActionModel) {
  try {
    const selectedInterestRate: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableInterestRate, selectedInterestRate)
    yield put(actions.enableInterestRateSuccess(response?.data))
    yield put(actions.enableInterestRateFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableInterestRateFinish())
  }
}

function* disableInterestRateSaga(action: ActionModel) {
  try {
    const selectedInterestRate: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableInterestRate, selectedInterestRate)
    yield put(actions.disableInterestRateSuccess(response?.data))
    yield put(actions.disableInterestRateFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.disableInterestRateFinish())
  }
}

function* singleEnableInterestRateSaga(action: ActionModel) {
  try {
    const selectedInterestRate: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.singleEnableInterestRate,
      selectedInterestRate
    )
    yield put(actions.singleEnableInterestRateSuccess(response?.data))
    yield put(actions.singleEnableInterestRateFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableInterestRateFinish())
  }
}

function* singleDisableInterestRateSaga(action: ActionModel) {
  try {
    const selectedInterestRate: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.singleDisableInterestRate,
      selectedInterestRate
    )
    yield put(actions.singleDisableInterestRateSuccess(response?.data))
    yield put(actions.singleDisableInterestRateFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableInterestRateFinish())
  }
}

/* function* updateInterestRateSaga(action: ActionModel) {
  try {
    const body: InterestRateModel = action.payload
    const response: ResponseModel = yield call(service.updateInterestRate, body, action.payload?.id)
    yield put(actions.updateInterestRateSuccess(response.data?.data))
    yield put(actions.updateInterestRateFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateInterestRateFinish())
  }
} */
function* updateInterestRateSaga(action: ActionModel) {
  try {
    const body: InterestRateModel = action.payload
    const params: any = action
    const response: ResponseModel = yield call(service.updateInterestRate, body, params.id)

    yield put(actions.updateInterestRateSuccess(response.data?.data))
    yield put(actions.updateInterestRateFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateInterestRateFinish())
  }
}

function* deleteInterestRateSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteInterestRate, body)

    yield put(actions.deleteInterestRateSuccess(response.data?.data))
    yield put(actions.deleteInterestRateFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteInterestRateFinish())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_INTEREST_RATE_LOAN_FILE_START, getInterestRateLoanFileSaga)
  yield takeLatest(actionTypes.GET_INTEREST_RATE_DEPOSIT_FILE_START, getInterestRateDepositFileSaga)
  yield takeLatest(actionTypes.GET_INTEREST_RATE_START, getInterestRateSaga)
  yield takeLatest(actionTypes.ADD_INTEREST_RATE_START, addInterestRateSaga)
  yield takeLatest(actionTypes.UPDATE_INTEREST_RATE_START, updateInterestRateSaga)
  yield takeLatest(actionTypes.DELETE_INTEREST_RATE_START, deleteInterestRateSaga)
  yield takeLatest(actionTypes.ENABLE_INTEREST_RATE_REQUEST, enableInterestRateSaga)
  yield takeLatest(actionTypes.DISABLE_INTEREST_RATE_REQUEST, disableInterestRateSaga)
  yield takeLatest(actionTypes.SINGLE_ENABLE_INTEREST_RATE_REQUEST, singleEnableInterestRateSaga)
  yield takeLatest(actionTypes.SINGLE_DISABLE_INTEREST_RATE_REQUEST, singleDisableInterestRateSaga)
}
