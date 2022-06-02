import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {IDepartmentState} from './reducer'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'

function* getKeySaga(action: ActionModel) {
  try {
    const params: any = action.payload?.params
    yield delay(500)
    const response: ResponseModel = yield call(service.getDepartment, params)
    const data = response?.data
    yield put(actions.getDepartmentSuccess(data))
    yield put({type: actionTypes.GET_DEPARTMENT_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.GET_DEPARTMENT_FINISH})
  }
}

function* CreateKey(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.postDepartment, body)
    yield put({type: actionTypes.ADD_DEPARTMENT_SUCCESS, payload: response.data})
    yield put({type: actionTypes.ADD_DEPARTMENT_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.ADD_DEPARTMENT_FINISH})
  }
}

function* updateKey(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(service.updateDepartment, body, action.payload?.id)
    yield put({type: actionTypes.UPDATE_DEPARTMENT_SUCCESS, payload: response.data})
    yield put({type: actionTypes.UPDATE_DEPARTMENT_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.UPDATE_DEPARTMENT_FINISH})
  }
}

function* deleteKeySaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteDepartment, body)
    yield put({type: actionTypes.DELETE_DEPARTMENT_SUCCESS, payload: response.data})
    yield put({type: actionTypes.DELETE_DEPARTMENT_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.DELETE_DEPARTMENT_FINISH})
  }
}

function* singleActivateDepartment(action: ActionModel) {
  try {
    const selectedDepartment: any = action.payload
    yield delay(100)
    const response: ResponseModel = yield call(
      service.singleActivatedDepartment,
      selectedDepartment
    )
    yield put({
      type: actionTypes.SINGLE_ACTIVATE_DEPARTMENT_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SINGLE_ACTIVATE_DEPARTMENT_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_ACTIVATE_DEPARTMENT_FINISH})
  }
}

function* singleDeactivateDepartment(action: ActionModel) {
  try {
    const selectedDepartment: any = action.payload
    yield delay(100)
    const response: ResponseModel = yield call(
      service.singleDeactivatedDepartment,
      selectedDepartment
    )

    yield put({
      type: actionTypes.SINGLE_DEACTIVATE_DEPARTMENT_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SINGLE_DEACTIVATE_DEPARTMENT_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_DEACTIVATE_DEPARTMENT_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_DEPARTMENT_START, getKeySaga)
  yield takeLatest(actionTypes.ADD_DEPARTMENT_START, CreateKey)
  yield takeLatest(actionTypes.DELETE_DEPARTMENT_START, deleteKeySaga)
  yield takeLatest(actionTypes.UPDATE_DEPARTMENT_START, updateKey)
  yield takeLatest(actionTypes.SINGLE_ACTIVATE_DEPARTMENT_REQUEST, singleActivateDepartment)
  yield takeLatest(actionTypes.SINGLE_DEACTIVATE_DEPARTMENT_REQUEST, singleDeactivateDepartment)
}
