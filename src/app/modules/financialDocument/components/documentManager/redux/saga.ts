import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {DocumentModel} from '../Model/DocumentModel'
import {ParamsModel} from 'src/app/modules/common/Model'
import {SortDocumentActionModel, SortDocumentModel} from '../Model'

function* getDocumentSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getDocument, params)
    yield put(actions.getDocumentSuccess(response?.data?.data))
    yield put(actions.getDocumentFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getDocumentFinish())
  }
}

function* getFiscalYearSaga() {
  try {
    const response: ResponseModel = yield call(service.getFiscalYear)
    yield put(actions.getFiscalYearSuccess(response?.data?.data))
    yield put(actions.getFiscalYearFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getFiscalYearFinish())
  }
}

function* getQuaterSaga() {
  try {
    const response: ResponseModel = yield call(service.getQuater)
    yield put(actions.getQuaterSuccess(response?.data?.data))
    yield put(actions.getQuaterFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getQuaterFinish())
  }
}

function* getAllDocumentSaga() {
  try {
    const response: ResponseModel = yield call(service.getAllDocument)
    yield put(actions.getAllDocumentSuccess(response?.data?.data))
    yield put(actions.getAllDocumentFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllDocumentFinish())
  }
}

function* addDocumentSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addDocument, body)
    yield put(actions.addDocumentSuccess(response.data?.data))
    yield put(actions.addDocumentFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addDocumentFinish())
  }
}

function* enableDocumentSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableDocument, selectedUsers)
    yield put(actions.enableDocumentSuccess(response?.data))
    yield put(actions.enableDocumentFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableDocumentFinish())
  }
}

function* disableDocumentSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableDocument, selectedUsers)
    yield put(actions.disableDocumentSuccess(response?.data))
    yield put(actions.disableDocumentFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableDocumentFinish())
  }
}

function* singleEnableDocumentSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableDocument, selectedUsers)
    yield put(actions.singleEnableDocumentSuccess(response?.data))
    yield put(actions.singleEnableDocumentFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableDocumentFinish())
  }
}

function* singleDisableDocumentSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableDocument, selectedUsers)
    yield put(actions.singleDisableDocumentSuccess(response?.data))
    yield put(actions.singleDisableDocumentFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableDocumentFinish())
  }
}

function* updateDocumentSaga(action: ActionModel) {
  try {
    const body: DocumentModel = action.payload
    const response: ResponseModel = yield call(service.updateDocument, body, action.payload?.id)
    yield put(actions.updateDocumentSuccess(response.data?.data))
    yield put(actions.updateDocumentFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateDocumentFinish())
  }
}

function* deleteDocumentSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteDocument, body)
    yield put(actions.deleteDocumentSuccess(response.data?.data))
    yield put(actions.deleteDocumentFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteDocumentFinish())
  }
}

function* sortDocument(action: SortDocumentActionModel) {
  try {
    const body: SortDocumentModel = action.payload
    const response: ResponseModel = yield call(service.sortDocument, body)

    yield put({
      type: actionTypes.SORT_DOCUMENT_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_DOCUMENT_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_DOCUMENT_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_DOCUMENT_START, getDocumentSaga)
  yield takeLatest(actionTypes.GET_FISCAL_YEAR_START, getFiscalYearSaga)
  yield takeLatest(actionTypes.GET_QUATER_START, getQuaterSaga)
  yield takeLatest(actionTypes.GET_ALL_DOCUMENT_START, getAllDocumentSaga)
  yield takeLatest(actionTypes.ADD_DOCUMENT_START, addDocumentSaga)
  yield takeLatest(actionTypes.UPDATE_DOCUMENT_START, updateDocumentSaga)
  yield takeLatest(actionTypes.DELETE_DOCUMENT_START, deleteDocumentSaga)
  yield takeLatest(actionTypes.ENABLE_DOCUMENT_REQUEST, enableDocumentSaga)
  yield takeLatest(actionTypes.DISABLE_DOCUMENT_REQUEST, disableDocumentSaga)
  yield takeLatest(actionTypes.SINGLE_ENABLE_DOCUMENT_REQUEST, singleEnableDocumentSaga)
  yield takeLatest(actionTypes.SINGLE_DISABLE_DOCUMENT_REQUEST, singleDisableDocumentSaga)
  yield takeLatest(actionTypes.SORT_DOCUMENT_START, sortDocument)
}
