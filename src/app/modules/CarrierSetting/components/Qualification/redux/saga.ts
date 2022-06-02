import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ParamsModel} from 'src/app/modules/common/Model'

function* getQualificationSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getQualification, params)
    yield put(actions.getQualificationSuccess(response?.data?.data))
    yield put(actions.getQualificationFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getQualificationFinish())
  }
}

function* addQualificationSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addQualification, body)
    yield put(actions.addQualificationSuccess(response.data?.data))
    yield put(actions.addQualificationFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addQualificationFinish())
  }
}

function* updateQualificationSaga(action: ActionModel) {
  try {
    const body: any = action.payload.data
    const response: ResponseModel = yield call(
      service.updateQualification,
      body,
      action.payload?.id
    )
    yield put(actions.updateQualificationSuccess(response.data?.data))
    yield put(actions.updateQualificationFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateQualificationFinish())
  }
}

function* deleteQualificationSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteQualification, body)
    yield put(actions.deleteQualificationSuccess(response.data?.data))
    yield put(actions.deleteQualificationFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteQualificationFinish())
  }
}
function* enableQualificationSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.activateQualification, selectedUsers)
    yield put(actions.enableActivateSuccess(response?.data))
    yield put(actions.enableQualificationFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableQualificationFinish())
  }
}

function* disableQualificationSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.deactivateQualification, selectedUsers)
    yield put(actions.enableDeactivateSuccess(response?.data))
    yield put(actions.enableDeactivateFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableDeactivateFinish())
  }
}

function* singleActivateQualification(action: ActionModel) {
  try {
    const selectedOperationIncharge: any = action.payload
    const response: ResponseModel = yield call(
      service.singleActivateQualification,
      selectedOperationIncharge
    )
    yield put({
      type: actionTypes.SINGLE_ACTIVATE_QUALIFICATION_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SINGLE_ACTIVATE_QUALIFICATION_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_ACTIVATE_QUALIFICATION_FINISH})
  }
}

function* singleDeactivateQualification(action: ActionModel) {
  try {
    const selectedOperationIncharge: any = action.payload
    const response: ResponseModel = yield call(
      service.singleDeactivateQualification,
      selectedOperationIncharge
    )

    yield put({
      type: actionTypes.SINGLE_DEACTIVATE_QUALIFICATION_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SINGLE_ACTIVATE_QUALIFICATION_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_ACTIVATE_QUALIFICATION_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_QUALIFICATION_START, getQualificationSaga)
  yield takeLatest(actionTypes.ADD_QUALIFICATION_START, addQualificationSaga)
  yield takeLatest(actionTypes.UPDATE_QUALIFICATION_START, updateQualificationSaga)
  yield takeLatest(actionTypes.DELETE_QUALIFICATION_START, deleteQualificationSaga)
  yield takeLatest(actionTypes.SINGLE_ACTIVATE_QUALIFICATION_FINISH, singleActivateQualification)
  yield takeLatest(
    actionTypes.SINGLE_DEACTIVATE_QUALIFICATION_REQUEST,
    singleDeactivateQualification
  )
  yield takeLatest(actionTypes.ENABLE_QUALIFICATION_REQUEST, enableQualificationSaga)
  yield takeLatest(actionTypes.DISABLE_QUALIFICATION_REQUEST, disableQualificationSaga)
}
