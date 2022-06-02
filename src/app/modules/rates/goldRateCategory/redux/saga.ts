import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'

function* getGoldRateCategorySaga(action: ActionModel) {
  try {
    const params: any = action.payload?.params
    yield delay(500)
    const response: ResponseModel = yield call(service.getGoldRateCategory, params)
    const data: any = response?.data
    yield put(actions.getGoldRateCategorySuccess(data))
  } catch (error: any) {
    yield put(actions.getGoldRateCategoryError(error))
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_GOLD_RATE_CATEGORY_START, getGoldRateCategorySaga)
}
