import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DocumentCategoryModel} from '../Model/DocumentCategoryModel'
import { SortDocumentCategoryActionModel, SortDocumentCategoryModel } from '../Model'

function* getDocumentCategorySaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getDocumentCategory, params)
    yield put(actions.getDocumentCategorySuccess(response?.data?.data))
    yield put(actions.getDocumentCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getDocumentCategoryFinish())
  }
}

function* getAllDocumentCategorySaga() {
  try {
    const response: ResponseModel = yield call(service.getAllDocumentCategory)
    yield put(actions.getAllDocumentCategorySuccess(response?.data?.data))
    yield put(actions.getAllDocumentCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllDocumentCategoryFinish())
  }
}

function* addDocumentCategorySaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addDocumentCategory, body)
    yield put(actions.addDocumentCategorySuccess(response.data?.data))
    yield put(actions.addDocumentCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addDocumentCategoryFinish())
  }
}

function* enableDocumentCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableDocumentCategory, selectedUsers)
    yield put(actions.enableDocumentCategorySuccess(response?.data))
    yield put(actions.enableDocumentCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableDocumentCategoryFinish())
  }
}

function* disableDocumentCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableDocumentCategory, selectedUsers)
    yield put(actions.disableDocumentCategorySuccess(response?.data))
    yield put(actions.disableDocumentCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableDocumentCategoryFinish())
  }
}

function* singleEnableDocumentCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableDocumentCategory, selectedUsers)
    yield put(actions.singleEnableDocumentCategorySuccess(response?.data))
    yield put(actions.singleEnableDocumentCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableDocumentCategoryFinish())
  }
}

function* singleDisableDocumentCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableDocumentCategory, selectedUsers)
    yield put(actions.singleDisableDocumentCategorySuccess(response?.data))
    yield put(actions.singleDisableDocumentCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableDocumentCategoryFinish())
  }
}

function* updateDocumentCategorySaga(action: ActionModel) {
  try {
    const body: DocumentCategoryModel = action.payload
    const response: ResponseModel = yield call(
      service.updateDocumentCategory,
      body,
      action.payload?.id
    )
    yield put(actions.updateDocumentCategorySuccess(response.data?.data))
    yield put(actions.updateDocumentCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateDocumentCategoryFinish())
  }
}

function* deleteDocumentCategorySaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteDocumentCategory, body)
    yield put(actions.deleteDocumentCategorySuccess(response.data?.data))
    yield put(actions.deleteDocumentCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteDocumentCategoryFinish())
  }
}

function* sortDocumentCategory(action: SortDocumentCategoryActionModel) {
  try {
    const body: SortDocumentCategoryModel = action.payload
    const response: ResponseModel = yield call(service.sortDocumentCategory, body)

    yield put({
      type: actionTypes.SORT_DOCUMENT_CATEGORY_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_DOCUMENT_CATEGORY_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_DOCUMENT_CATEGORY_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_DOCUMENT_CATEGORY_START, getDocumentCategorySaga)
  yield takeLatest(actionTypes.GET_ALL_DOCUMENT_CATEGORY_START, getAllDocumentCategorySaga)
  yield takeLatest(actionTypes.ADD_DOCUMENT_CATEGORY_START, addDocumentCategorySaga)
  yield takeLatest(actionTypes.UPDATE_DOCUMENT_CATEGORY_START, updateDocumentCategorySaga)
  yield takeLatest(actionTypes.DELETE_DOCUMENT_CATEGORY_START, deleteDocumentCategorySaga)
  yield takeLatest(actionTypes.ENABLE_DOCUMENT_CATEGORY_REQUEST, enableDocumentCategorySaga)
  yield takeLatest(actionTypes.DISABLE_DOCUMENT_CATEGORY_REQUEST, disableDocumentCategorySaga)
  yield takeLatest(
    actionTypes.SINGLE_ENABLE_DOCUMENT_CATEGORY_REQUEST,
    singleEnableDocumentCategorySaga
  )
  yield takeLatest(
    actionTypes.SINGLE_DISABLE_DOCUMENT_CATEGORY_REQUEST,
    singleDisableDocumentCategorySaga
  )

  yield takeLatest(actionTypes.SORT_DOCUMENT_CATEGORY_START, sortDocumentCategory)
}
