import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ParamsModel} from 'src/app/modules/common/Model'

function* getNewsSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getNews, params)
    yield put(actions.getNewsSuccess(response?.data?.data))
    yield put(actions.getNewsFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getNewsFinish())
  }
}

function* addNewsSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addNews, body)
    yield put(actions.addNewsSuccess(response.data?.data))
    yield put(actions.addNewsFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addNewsFinish())
  }
}

function* updateNewsSaga(action: ActionModel) {
  try {
    const body: any = action.payload.data
    const response: ResponseModel = yield call(service.updateNews, body, action.payload?.id)
    yield put(actions.updateNewsSuccess(response.data?.data))
    yield put(actions.updateNewsFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateNewsFinish())
  }
}

function* deleteNewsSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteNews, body)
    yield put(actions.deleteNewsSuccess(response.data?.data))
    yield put(actions.deleteNewsFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteNewsFinish())
  }
}

function* singleActivateNews(action: ActionModel) {
  try {
    const selectedOperationIncharge: any = action.payload
    const response: ResponseModel = yield call(
      service.singleActivateNews,
      selectedOperationIncharge
    )
    yield put({
      type: actionTypes.SINGLE_ACTIVATE_NEWS_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SINGLE_ACTIVATE_NEWS_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_ACTIVATE_NEWS_FINISH})
  }
}

function* singleDeactivateNews(action: ActionModel) {
  try {
    const selectedOperationIncharge: any = action.payload
    const response: ResponseModel = yield call(
      service.singleDeactivateNews,
      selectedOperationIncharge
    )

    yield put({
      type: actionTypes.SINGLE_DEACTIVATE_NEWS_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SINGLE_DEACTIVATE_NEWS_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_DEACTIVATE_NEWS_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_NEWS_START, getNewsSaga)
  yield takeLatest(actionTypes.ADD_NEWS_START, addNewsSaga)
  yield takeLatest(actionTypes.UPDATE_NEWS_START, updateNewsSaga)
  yield takeLatest(actionTypes.DELETE_NEWS_START, deleteNewsSaga)
  yield takeLatest(actionTypes.SINGLE_ACTIVATE_NEWS_REQUEST, singleActivateNews)
  yield takeLatest(actionTypes.SINGLE_DEACTIVATE_NEWS_REQUEST, singleDeactivateNews)
}
