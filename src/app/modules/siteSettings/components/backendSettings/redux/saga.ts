import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ISettingTypeState} from './reducer'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'

function* getSettingTypeSaga(action: ActionModel) {
  try {
    const params: any = action.payload?.params
    yield delay(500)
    const response: ResponseModel = yield call(service.getSettingType, params)
    const data: ISettingTypeState = response?.data
    yield put(actions.getSettingTypeSuccess(data))
    yield put(actions.getSettingTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getSettingTypeFinish())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_BACKEND_SETTING_START, getSettingTypeSaga)
}
