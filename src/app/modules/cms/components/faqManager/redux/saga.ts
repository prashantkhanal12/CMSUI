import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'

function* getFaqManagerSaga(action: ActionModel) {
  try {
    const params: any = action.payload?.params
    const categoryId: any = action.payload?.id
    yield delay(500)
    const response: ResponseModel = yield call(service.getFaqManager, params, categoryId)
    const data: any = response?.data
    yield put(actions.getFaqManagerSuccess(data))
  } catch (error: any) {
    yield put(actions.getFaqManagerError(error))
  }
}

//Create Faq Manager Saga
function* createFaqManagerSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.addFaqManager, body)
    yield put({type: actionTypes.ADD_FAQ_MANAGER_SUCCESS, payload: response.data})
    yield put({type: actionTypes.ADD_FAQ_MANAGER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.ADD_FAQ_MANAGER_FINISH})
  }
}

//Update Faq Manager
function* updateFaqManagerSaga(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(service.updateFaqManager, body, action.payload?.id)
    yield put({type: actionTypes.UPDATE_FAQ_MANAGER_SUCCESS, payload: response.data})
    yield put({type: actionTypes.UPDATE_FAQ_MANAGER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.UPDATE_FAQ_MANAGER_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_FAQ_MANAGER_START, getFaqManagerSaga)
  yield takeLatest(actionTypes.ADD_FAQ_MANAGER_REQUEST, createFaqManagerSaga)
  yield takeLatest(actionTypes.UPDATE_FAQ_MANAGER_START, updateFaqManagerSaga)
}
