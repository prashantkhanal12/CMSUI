import {call, delay, put, takeLatest} from 'redux-saga/effects'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {actionTypes} from './constants'
import {service} from './service'

function* addUsers(action: ActionModel) {
  try {
    const body = action.payload?.data
    const response: ResponseModel = yield call(service.addUser, body)
    const userData = response?.data?.data
    yield put({type: actionTypes.ADD_USER_SUCCESS, payload: {userData}})
    yield put({type: actionTypes.ADD_USER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.ADD_USER_FINISH})
  }
}

function* deleteUsers(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteUsers, body)
    yield put({type: actionTypes.DELETE_USER_SUCCESS})
    yield put({type: actionTypes.DELETE_USER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.DELETE_USER_FINISH})
  }
}

function* getUsers(action: ActionModel) {
  try {
    const params: any = action.payload?.params
    yield delay(500)
    const response: ResponseModel = yield call(service.getUsers, params)
    const data = response?.data
    yield put({type: actionTypes.GET_USER_SUCCESS, payload: data})
    yield put({type: actionTypes.GET_USER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.GET_USER_FINISH})
  }
}

function* activateUsers(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.activateUsers, selectedUsers)
    yield put({type: actionTypes.ACTIVATE_USERS_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.ACTIVATE_USERS_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.ACTIVATE_USERS_FINISH})
  }
}

function* singleActivateUser(action: ActionModel) {
  try {
    const selectedUser: any = action.payload
    const response: ResponseModel = yield call(service.singleActivateUser, selectedUser)
    yield put({type: actionTypes.SINGLE_ACTIVATE_USER_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.SINGLE_ACTIVATE_USER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_ACTIVATE_USER_FINISH})
  }
}

function* deactivateUsers(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.deactivateUsers, selectedUsers)
    yield put({type: actionTypes.DEACTIVATE_USERS_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.DEACTIVATE_USERS_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.DEACTIVATE_USERS_FINISH})
  }
}

function* singleDeactivateUser(action: ActionModel) {
  try {
    const selectedUser: any = action.payload
    const response: ResponseModel = yield call(service.singleDeactivateUser, selectedUser)
    yield put({type: actionTypes.SINGLE_DEACTIVATE_USER_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.SINGLE_DEACTIVATE_USER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_DEACTIVATE_USER_FINISH})
  }
}

function* updateUsers(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(service.updateUser, body, action.payload?.id)
    yield put({type: actionTypes.UPDATE_USER_SUCCESS, payload: response.data})
    yield put({type: actionTypes.UPDATE_USER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.UPDATE_USER_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.ADD_USER_REQUEST, addUsers)
  yield takeLatest(actionTypes.GET_USER_REQUEST, getUsers)
  yield takeLatest(actionTypes.ACTIVATE_USERS_REQUEST, activateUsers)
  yield takeLatest(actionTypes.SINGLE_ACTIVATE_USER_REQUEST, singleActivateUser)
  yield takeLatest(actionTypes.DEACTIVATE_USERS_REQUEST, deactivateUsers)
  yield takeLatest(actionTypes.SINGLE_DEACTIVATE_USER_REQUEST, singleDeactivateUser)
  yield takeLatest(actionTypes.UPDATE_USER_START, updateUsers)
  yield takeLatest(actionTypes.DELETE_USER_REQUEST, deleteUsers)
}
