import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'

function* getFaqIconTypeSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.getFaqIconType, body)
    yield put({type: actionTypes.GET_FAQ_ICON_TYPE_SUCCESS, payload: response.data})
    yield put({type: actionTypes.GET_FAQ_ICON_TYPE_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.GET_FAQ_ICON_TYPE_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_FAQ_ICON_TYPE_START, getFaqIconTypeSaga)
}
