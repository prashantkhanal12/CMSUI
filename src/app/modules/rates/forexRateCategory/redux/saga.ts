import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'

function* getForexRateCategorySaga(action: ActionModel) {
  try {
    const params: any = action.payload?.params
    yield delay(500)
    const response: ResponseModel = yield call(service.getForexRateCategory, params)
    const data: any = response?.data
    yield put(actions.getForexRateCategorySuccess(data))
  } catch (error: any) {
    yield put(actions.getForexRateCategoryError(error))
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_FOREX_RATE_CATEGORY_START, getForexRateCategorySaga)
}
