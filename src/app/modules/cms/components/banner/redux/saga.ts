import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import { SortBannerActionModel, SortBannerModel } from '../Model'

//Get Banner saga
function* getBannerSaga(action: ActionModel) {
  try {
    const params: any = action.payload?.params
    yield delay(500)
    const response: ResponseModel = yield call(service.getBanner, params)
    const data: any = response?.data
    yield put(actions.getBannerSuccess(data))
  } catch (error: any) {
    yield put(actions.getBannerError(error))
  }
}

//Get Banner saga
function* getAllBannerSaga(action: ActionModel) {
  try {
    const response: ResponseModel = yield call(service.getAllBanner)
    const data: any = response?.data
    yield put(actions.getAllBannerSuccess(data))
  } catch (error: any) {
    if (error.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: error.response.data.message})
    }
    yield put(actions.getAllBannerError())
  }
}

//Create Banner
function* createBannerSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.addBanner, body)
    yield put({type: actionTypes.ADD_BANNER_SUCCESS, payload: response.data})
    yield put({type: actionTypes.ADD_BANNER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.ADD_BANNER_FINISH})
  }
}

//Update Banner
function* updateBanner(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(service.updateBanner, body, action.payload?.id)
    yield put({type: actionTypes.UPDATE_BANNER_SUCCESS, payload: response.data})
    yield put({type: actionTypes.UPDATE_BANNER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.UPDATE_BANNER_FINISH})
  }
}

//Activate Deactivate Banner Saga
function* activateBannerSaga(action: ActionModel) {
  try {
    const selectedBanners: any = action.payload?.data
    const response: ResponseModel = yield call(service.activateBanner, selectedBanners)
    yield put({type: actionTypes.ACTIVATE_BANNER_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.ACTIVATE_BANNER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.ACTIVATE_BANNER_FINISH})
  }
}

function* singleActivateBannerSaga(action: ActionModel) {
  try {
    const selectedBanner: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleActivateBanner, selectedBanner)

    yield put({type: actionTypes.SINGLE_ACTIVATE_BANNER_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.SINGLE_ACTIVATE_BANNER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_ACTIVATE_BANNER_FINISH})
  }
}

function* deactivateBannerSaga(action: ActionModel) {
  try {
    const selectedBanner: any = action.payload?.data
    const response: ResponseModel = yield call(service.deactivateBanner, selectedBanner)

    yield put({type: actionTypes.DEACTIVATE_BANNER_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.DEACTIVATE_BANNER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.DEACTIVATE_BANNER_FINISH})
  }
}

function* singleDeactivateBannerSaga(action: ActionModel) {
  try {
    const selectedBanner: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDeactivateBanner, selectedBanner)
    yield put({type: actionTypes.SINGLE_DEACTIVATE_BANNER_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.SINGLE_DEACTIVATE_BANNER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_DEACTIVATE_BANNER_FINISH})
  }
}

function* deleteBannerSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteBanner, body)
    yield put({type: actionTypes.DELETE_BANNER_SUCCESS})
    yield put({type: actionTypes.DELETE_BANNER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.DELETE_BANNER_FINISH})
  }
}

function* sortBanner(action: SortBannerActionModel) {
  try {
    const body: SortBannerModel = action.payload
    const response: ResponseModel = yield call(service.sortBanner, body)

    yield put({
      type: actionTypes.SORT_BANNER_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_BANNER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_BANNER_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_BANNER_START, getBannerSaga)
  yield takeLatest(actionTypes.GET_ALL_BANNER_START, getAllBannerSaga)
  yield takeLatest(actionTypes.ADD_BANNER_REQUEST, createBannerSaga)
  yield takeLatest(actionTypes.UPDATE_BANNER_START, updateBanner)
  yield takeLatest(actionTypes.DELETE_BANNER_START, deleteBannerSaga)
  yield takeLatest(actionTypes.ACTIVATE_BANNER_REQUEST, activateBannerSaga)
  yield takeLatest(actionTypes.DEACTIVATE_BANNER_REQUEST, deactivateBannerSaga)
  yield takeLatest(actionTypes.SINGLE_ACTIVATE_BANNER_REQUEST, singleActivateBannerSaga)
  yield takeLatest(actionTypes.SINGLE_DEACTIVATE_BANNER_REQUEST, singleDeactivateBannerSaga)
  yield takeLatest(actionTypes.SORT_BANNER_START, sortBanner)
}
