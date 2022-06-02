import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {MerchantManagerModel} from '../Model/MerchantManagerModel'
import {ParamsModel} from 'src/app/modules/common/Model'
import {SortMerchantManagerModel, SortMerchantManagerActionModel} from '../Model'

function* getMerchantManagerSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getMerchantManager, params)
    yield put(actions.getMerchantManagerSuccess(response?.data?.data))
    yield put(actions.getMerchantManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getMerchantManagerFinish())
  }
}

function* getAllMerchantManagerSaga() {
  try {
    const response: ResponseModel = yield call(service.getAllMerchantManager)
    yield put(actions.getAllMerchantManagerSuccess(response?.data?.data))
    yield put(actions.getAllMerchantManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllMerchantManagerFinish())
  }
}

function* addMerchantManagerSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addMerchantManager, body)
    yield put(actions.addMerchantManagerSuccess(response.data?.data))
    yield put(actions.addMerchantManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addMerchantManagerFinish())
  }
}

function* enableMerchantManagerSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableMerchantManager, selectedUsers)
    yield put(actions.enableMerchantManagerSuccess(response?.data))
    yield put(actions.enableMerchantManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableMerchantManagerFinish())
  }
}

function* disableMerchantManagerSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableMerchantManager, selectedUsers)
    yield put(actions.disableMerchantManagerSuccess(response?.data))
    yield put(actions.disableMerchantManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableMerchantManagerFinish())
  }
}

function* singleEnableMerchantManagerSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableMerchantManager, selectedUsers)
    yield put(actions.singleEnableMerchantManagerSuccess(response?.data))
    yield put(actions.singleEnableMerchantManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableMerchantManagerFinish())
  }
}

function* singleDisableMerchantManagerSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableMerchantManager, selectedUsers)
    yield put(actions.singleDisableMerchantManagerSuccess(response?.data))
    yield put(actions.singleDisableMerchantManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableMerchantManagerFinish())
  }
}

function* updateMerchantManagerSaga(action: ActionModel) {
  try {
    const body: MerchantManagerModel = action.payload
    const response: ResponseModel = yield call(
      service.updateMerchantManager,
      body,
      action.payload?.id
    )
    yield put(actions.updateMerchantManagerSuccess(response.data?.data))
    yield put(actions.updateMerchantManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateMerchantManagerFinish())
  }
}

function* deleteMerchantManagerSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteMerchantManager, body)
    yield put(actions.deleteMerchantManagerSuccess(response.data?.data))
    yield put(actions.deleteMerchantManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteMerchantManagerFinish())
  }
}

function* sortMerchantManager(action: SortMerchantManagerActionModel) {
  try {
    const body: SortMerchantManagerModel = action.payload
    const response: ResponseModel = yield call(service.sortMerchantManager, body)

    yield put({
      type: actionTypes.SORT_MERCHANT_MANAGER_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_MERCHANT_MANAGER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_MERCHANT_MANAGER_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_MERCHANT_MANAGER_START, getMerchantManagerSaga)
  yield takeLatest(actionTypes.GET_ALL_MERCHANT_MANAGER_START, getAllMerchantManagerSaga)
  yield takeLatest(actionTypes.ADD_MERCHANT_MANAGER_START, addMerchantManagerSaga)
  yield takeLatest(actionTypes.UPDATE_MERCHANT_MANAGER_START, updateMerchantManagerSaga)
  yield takeLatest(actionTypes.DELETE_MERCHANT_MANAGER_START, deleteMerchantManagerSaga)
  yield takeLatest(actionTypes.ENABLE_MERCHANT_MANAGER_REQUEST, enableMerchantManagerSaga)
  yield takeLatest(actionTypes.DISABLE_MERCHANT_MANAGER_REQUEST, disableMerchantManagerSaga)
  yield takeLatest(
    actionTypes.SINGLE_ENABLE_MERCHANT_MANAGER_REQUEST,
    singleEnableMerchantManagerSaga
  )
  yield takeLatest(
    actionTypes.SINGLE_DISABLE_MERCHANT_MANAGER_REQUEST,
    singleDisableMerchantManagerSaga
  )
  yield takeLatest(actionTypes.SORT_MERCHANT_MANAGER_START, sortMerchantManager)
}
