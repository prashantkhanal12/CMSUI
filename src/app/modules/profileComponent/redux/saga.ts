import {call, delay, put, takeLatest} from 'redux-saga/effects'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {PasswordModel} from '../ProfileModels'
import {actions} from './actions'
import {actionTypes} from './constants'
import {IPasswordState} from './reducer'
import {service} from './service'

function* updatePassword(action: any) {
  try {
    const body: PasswordModel = action.payload.data
    const accessToken: string = action.payload.param
    const response: ResponseModel = yield call(service.updatePassword, body, accessToken)

    yield put(actions.updatePasswordSuccess(response))
    yield put(actions.updatePasswordFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updatePasswordFinish())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.UPDATE_PASSWORD_START, updatePassword)
}
