import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { actions } from './action'
import { actionTypes } from './constants'
import { ResponseModel } from 'src/cms/helpers/Models/ResponseModel'
import { service } from './service'
import { ISettingTypeState } from './reducer'
import { ActionModel } from 'src/cms/helpers/Models/ActionModel'
import { globalActionTypes } from 'src/app/modules/errors/redux/constants'
import { groupBy, mapValues, omit } from 'lodash'

function* getSettingTypeSaga() {
  try {
    const response: ResponseModel = yield call(service.getSettingType)
    const data: ISettingTypeState = response?.data
    yield put(actions.getSettingTypeSuccess(data))
    yield put(actions.getSettingTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put(actions.getSettingTypeFinish())
  }
}

function* getSpecificSettingTypeSaga(action: ActionModel) {
  try {
    const id: string = action.payload?.id
    const settingType: string = action.payload?.settingTypeName
    const response: ResponseModel = yield call(service.getSpecificSettingType, id)

    const dataBackend = mapValues(groupBy(response?.data?.data?.setting, 'group.name'), (obj) =>
      obj.map((item: any) => omit(item, 'group.name'))
    )
    yield put(actions.getSpecifiSettingTypeSuccess(response.data?.data, dataBackend, settingType))
    yield put(actions.getSpecifiSettingTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put(actions.getSpecifiSettingTypeFinish())
  }
}

function* createSettingTypeSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.createSettingType, body.data, body.id)
    yield put(actions.createSettingFieldSuccess(response.data))
    yield put(actions.createSettingFieldFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put(actions.createSettingFieldFinish())
  }
}

function* updateSettingTypeSaga(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(service.updateSettingType, body)
    yield put(actions.updateSettingFieldSuccess(response.data))
    yield put(actions.updateSettingFieldFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put(actions.updateSettingFieldFinish())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_SETTING_TYPE_START, getSettingTypeSaga)
  yield takeEvery(actionTypes.GET_SPECIFIC_SETTING_TYPE_START, getSpecificSettingTypeSaga)
  yield takeLatest(actionTypes.UPDATE_SETTING_FIELD_START, updateSettingTypeSaga)
  yield takeLatest(actionTypes.CREATE_SETTING_FIELD_START, createSettingTypeSaga)
}
