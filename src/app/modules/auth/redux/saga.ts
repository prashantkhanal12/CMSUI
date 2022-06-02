import {call, delay, put, takeLatest} from 'redux-saga/effects'
import {actions} from './actions'
import {actionTypes} from './constants'
import * as ModuleConstant from 'src/app/modules/siteSettings'
import {ResponseModel} from '../../../../cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from '../../../../cms/helpers/Models/ActionModel'
import {globalActionTypes} from '../../errors/redux/constants'
import {UserModel} from '../models/UserModel'
import {useHistory} from 'react-router-dom'
import {isEmpty} from 'lodash'

function* loginSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.login, body)
    const accessToken: string = response?.data?.data?.token
    yield put({type: actionTypes.LOGIN_SUCCESS, payload: {accessToken}})
    yield put(actions.requestUser(accessToken))

    yield put({type: actionTypes.LOGIN_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.LOGIN_FINISH})
  }
}

function* firstLoginCheck(action: ActionModel) {
  try {
    const email = action.payload
    const response: ResponseModel = yield call(service.firstLogin, email)
    const userId: string = response?.data?.data?.id
    const firstLogin: string = response?.data?.data?.firstLogin
    yield put({type: actionTypes.FIRST_LOGIN_SUCCESS, payload: {userId, firstLogin}})
    yield put({type: actionTypes.FIRST_LOGIN_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.FIRST_LOGIN_FINISH})
  }
}

function* setPassword(action: ActionModel) {
  try {
    const data = action.payload
    const response: ResponseModel = yield call(service.setPasswordService, data)
    yield put({type: actionTypes.SET_PASSWORD_SUCCESS, payload: {response}})
    yield delay(500)
    yield put({type: actionTypes.SET_PASSWORD_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SET_PASSWORD_FINISH})
  }
}

function* resetPassword(action: ActionModel) {
  try {
    const data = action.payload
    const response: ResponseModel = yield call(service.resetPasswordService, data)
    yield put({type: actionTypes.RESET_PASSWORD_SUCCESS, payload: {response}})
    yield delay(500)
    yield put({type: actionTypes.RESET_PASSWORD_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.RESET_PASSWORD_FINISH})
  }
}

function* userRequested(action: ActionModel) {
  const accessToken = action.payload
  try {
    const data: {data: UserModel} = yield service.getUserByToken()
    yield put(actions.fulfillUser(data?.data))
    yield put(actions.getUserModule())
  } catch (err: any) {

    if (err.response.status === 400) {
      window.location.href = `/auth/update-password/${accessToken}`
    }
  }
}

function* forgotPassword(action: ActionModel) {
  try {
    const data = action.payload
    const response: ResponseModel = yield call(service.requestPassword, data)
    yield put({type: actionTypes.FORGOT_PASSWORD_SUCCESS, payload: {response}})
    yield put({type: actionTypes.FORGOT_PASSWORD_FINISH})
    // { response.status === 200 ? window.location.href = '/auth/success' : null }
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.FORGOT_PASSWORD_FINISH})
  }
}

function* getUserModule(action: ActionModel) {
  try {
    const response: ResponseModel = yield call(service.getModuleData)
    const moduleData = response?.data?.data?.module
    yield put({type: actionTypes.GET_DB_MODULE_SUCCESS, payload: {moduleData}})
    yield put({type: actionTypes.GET_DB_MODULE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.GET_DB_MODULE_FINISH})
  }
}

function* getGuestToken() {
  try {
    yield delay(100)
    const response: ResponseModel = yield call(service.getGuestToken)
    const token: string = response?.data?.data?.token
    yield put(actions.getGuestTokenSuccess(token))
  } catch (err: any) {
    yield put(actions.getGuestTokenFinish(err))
  }
}

export function* saga() {
  yield takeLatest(actionTypes.LOGIN_REQUEST, loginSaga)
  yield takeLatest(actionTypes.FIRST_LOGIN_REQUEST, firstLoginCheck)
  yield takeLatest(actionTypes.SET_PASSWORD_REQUEST, setPassword)
  yield takeLatest(actionTypes.RESET_PASSWORD_REQUEST, resetPassword)
  yield takeLatest(actionTypes.FORGOT_PASSWORD_REQUEST, forgotPassword)
  yield takeLatest(actionTypes.USER_REQUESTED, userRequested)
  yield takeLatest(actionTypes.GET_DB_MODULE_REQUEST, getUserModule)
  yield takeLatest(actionTypes.GET_GUEST_TOKEN_START, getGuestToken)
}
