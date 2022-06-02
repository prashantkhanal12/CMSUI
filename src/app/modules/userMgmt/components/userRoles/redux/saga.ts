import {call, put, delay, takeLatest} from 'redux-saga/effects'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {IBranchState} from 'src/app/modules/network/components/branch'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {IUserRoleState} from '../../roles'
import {actions} from './action'
import {actionTypes} from './constants'
import {service} from './service'

function* createUserRole(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.addUserRole, body)
    const userRoleData = response?.data?.data
    yield put(actions.createUserRoleSuccess(userRoleData))
    yield put(actions.createUserRoleFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.createUserRoleFinish(err))
  }
}

function* getUsersRole(action: ActionModel) {
  try {
    const params: any = action?.payload?.params
    yield delay(500)
    const response: ResponseModel = yield call(service.getUserRole, params)
    const userRoleList: any = response?.data?.data
    yield put(actions.getUserRoleSuccess(userRoleList))
    yield put(actions.getUserRoleFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getUserRoleFinish())
  }
}

function* updateUserRole(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(service.updateUserRole, body, action.payload?.id)
    yield put(actions.updateUserRoleSuccess(response?.data))
    yield put(actions.updateUserRoleFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateUserRoleFinish())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.ADD_USER_ROLE_REQUEST, createUserRole)
  yield takeLatest(actionTypes.GET_USER_ROLE_REQUEST, getUsersRole)
  yield takeLatest(actionTypes.UPDATE_USER_ROLE_START, updateUserRole)
}
