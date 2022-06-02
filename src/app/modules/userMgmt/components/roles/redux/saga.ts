import {call, put, delay, takeLatest} from 'redux-saga/effects'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {actions} from '..'
import {RoleModel} from '../../../Model'
import {DeleteRoleModel} from '../Model'
import {actionTypes} from './constants'
import {service} from './service'
import * as auth from 'src/app/modules/auth/index'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'

function* addRole(action: ActionModel) {
  try {
    const body: RoleModel = action.payload
    const response: ResponseModel = yield call(service.addRole, body)
    const roleData = response?.data?.data
    yield put(actions.createRoleSuccess(roleData))
    yield put(actions.createRoleFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.createRoleFinish(err))
  }
}

function* updateRole(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(service.updateRole, body, action.payload?.id)
    const roleUpdateData = response?.data?.data
    yield put(actions.updateRoleSuccess(roleUpdateData))
    yield put(auth?.actions?.requestUser())
    yield put(actions.updateRoleFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateRoleFinish(err))
  }
}

function* getRole(action: ActionModel) {
  try {
    const params: any = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getRole, params)
    const roleData = response?.data?.data
    yield put(actions.getRoleSuccess(roleData))
    yield put(actions.getRoleFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getRoleFinish(err))
  }
}

function* deleteRole(action: ActionModel) {
  try {
    const body: DeleteRoleModel = action.payload
    const response: ResponseModel = yield call(service.deleteRole, body)
    const roleData = response?.data?.data
    yield put(actions.deleteRoleSuccess(roleData))
    yield put(actions.deleteRoleFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteRoleFinish(err))
  }
}

export function* saga() {
  yield takeLatest(actionTypes.ADD_ROLE_REQUEST, addRole)
  yield takeLatest(actionTypes.GET_ROLE_REQUEST, getRole)
  yield takeLatest(actionTypes.DELETE_ROLE_REQUEST, deleteRole)
  yield takeLatest(actionTypes.UPDATE_ROLE_REQUEST, updateRole)
}
