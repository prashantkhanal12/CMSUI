import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ParamsModel} from 'src/app/modules/common/Model'
import {SortFormDownloadActionModel, SortFormDownloadModel} from '../Model'

function* getFormsDownloadSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getFormsDownload, params)
    yield put(actions.getFormsDownloadSuccess(response?.data?.data))
    yield put(actions.getFormsDownloadFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getFormsDownloadFinish())
  }
}

function* getAllFormsDownloadSaga() {
  try {
    const response: ResponseModel = yield call(service.getAllFormsDownload)
    yield put(actions.getAllFormsDownloadSuccess(response?.data?.data))
    yield put(actions.getAllFormsDownloadFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllFormsDownloadFinish())
  }
}

function* addFormsDownloadSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addFormsDownload, body)
    yield put(actions.addFormsDownloadSuccess(response.data?.data))
    yield put(actions.addFormsDownloadFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addFormsDownloadFinish())
  }
}

function* enableFormsDownloadSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableFormsDownload, selectedUsers)
    yield put(actions.enableFormsDownloadSuccess(response?.data))
    yield put(actions.enableFormsDownloadFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableFormsDownloadFinish())
  }
}

function* disableFormsDownloadSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableFormsDownload, selectedUsers)
    yield put(actions.disableFormsDownloadSuccess(response?.data))
    yield put(actions.disableFormsDownloadFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableFormsDownloadFinish())
  }
}

function* singleEnableFormsDownloadSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableFormsDownload, selectedUsers)
    yield put(actions.singleEnableFormsDownloadSuccess(response?.data))
    yield put(actions.singleEnableFormsDownloadFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableFormsDownloadFinish())
  }
}

function* singleDisableFormsDownloadSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableFormsDownload, selectedUsers)
    yield put(actions.singleDisableFormsDownloadSuccess(response?.data))
    yield put(actions.singleDisableFormsDownloadFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableFormsDownloadFinish())
  }
}

function* updateFormsDownloadSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(
      service.updateFormsDownload,
      body,
      action.payload?.id
    )
    yield put(actions.updateFormsDownloadSuccess(response.data?.data))
    yield put(actions.updateFormsDownloadFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateFormsDownloadFinish())
  }
}

function* deleteFormsDownloadSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteFormsDownload, body)
    yield put(actions.deleteFormsDownloadSuccess(response.data?.data))
    yield put(actions.deleteFormsDownloadFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteFormsDownloadFinish())
  }
}

function* sortFormsDownload(action: SortFormDownloadActionModel) {
  try {
    const body: SortFormDownloadModel = action.payload
    const response: ResponseModel = yield call(service.sortFormsDownload, body)

    yield put({
      type: actionTypes.SORT_FORMS_DOWNLOAD_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_FORMS_DOWNLOAD_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_FORMS_DOWNLOAD_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_FORMS_DOWNLOAD_START, getFormsDownloadSaga)
  yield takeLatest(actionTypes.GET_ALL_FORMS_DOWNLOAD_START, getAllFormsDownloadSaga)
  yield takeLatest(actionTypes.ADD_FORMS_DOWNLOAD_START, addFormsDownloadSaga)
  yield takeLatest(actionTypes.UPDATE_FORMS_DOWNLOAD_START, updateFormsDownloadSaga)
  yield takeLatest(actionTypes.DELETE_FORMS_DOWNLOAD_START, deleteFormsDownloadSaga)
  yield takeLatest(actionTypes.ENABLE_FORMS_DOWNLOAD_REQUEST, enableFormsDownloadSaga)
  yield takeLatest(actionTypes.DISABLE_FORMS_DOWNLOAD_REQUEST, disableFormsDownloadSaga)
  yield takeLatest(actionTypes.SINGLE_ENABLE_FORMS_DOWNLOAD_REQUEST, singleEnableFormsDownloadSaga)
  yield takeLatest(
    actionTypes.SINGLE_DISABLE_FORMS_DOWNLOAD_REQUEST,
    singleDisableFormsDownloadSaga
  )
  yield takeLatest(actionTypes.SORT_FORMS_DOWNLOAD_START, sortFormsDownload)
}
