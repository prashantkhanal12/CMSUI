import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {DocumentSubCategoryModel} from '../Model/DocumentSubCategoryModel'
import {ParamsModel} from 'src/app/modules/common/Model'
import {SortDocumentSubCategoryActionModel, SortDocumentSubCategoryModel} from '../Model'

function* getDocumentSubCategorySaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getDocumentSubCategory, params)
    yield put(actions.getDocumentSubCategorySuccess(response?.data?.data))
    yield put(actions.getDocumentSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getDocumentSubCategoryFinish())
  }
}

function* getAllDocumentSubCategorySaga(action: ActionModel) {
  try {
    const id: any = action.payload
    const response: ResponseModel = yield call(service.getAllDocumentSubCategory, id)
    yield put(actions.getAllDocumentSubCategorySuccess(response?.data?.data))
    yield put(actions.getAllDocumentSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllDocumentSubCategoryFinish())
  }
}

function* addDocumentSubCategorySaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addDocumentSubCategory, body)
    yield put(actions.addDocumentSubCategorySuccess(response.data?.data))
    yield put(actions.addDocumentSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addDocumentSubCategoryFinish())
  }
}

function* enableDocumentSubCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableDocumentSubCategory, selectedUsers)
    yield put(actions.enableDocumentSubCategorySuccess(response?.data))
    yield put(actions.enableDocumentSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableDocumentSubCategoryFinish())
  }
}

function* disableDocumentSubCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableDocumentSubCategory, selectedUsers)
    yield put(actions.disableDocumentSubCategorySuccess(response?.data))
    yield put(actions.disableDocumentSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableDocumentSubCategoryFinish())
  }
}

function* singleEnableDocumentSubCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.singleEnableDocumentSubCategory,
      selectedUsers
    )
    yield put(actions.singleEnableDocumentSubCategorySuccess(response?.data))
    yield put(actions.singleEnableDocumentSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableDocumentSubCategoryFinish())
  }
}

function* singleDisableDocumentSubCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.singleDisableDocumentSubCategory,
      selectedUsers
    )
    yield put(actions.singleDisableDocumentSubCategorySuccess(response?.data))
    yield put(actions.singleDisableDocumentSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableDocumentSubCategoryFinish())
  }
}

function* updateDocumentSubCategorySaga(action: ActionModel) {
  try {
    const body: DocumentSubCategoryModel = action.payload
    const response: ResponseModel = yield call(
      service.updateDocumentSubCategory,
      body,
      action.payload?.id
    )
    yield put(actions.updateDocumentSubCategorySuccess(response.data?.data))
    yield put(actions.updateDocumentSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateDocumentSubCategoryFinish())
  }
}

function* deleteDocumentSubCategorySaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteDocumentSubCategory, body)
    yield put(actions.deleteDocumentSubCategorySuccess(response.data?.data))
    yield put(actions.deleteDocumentSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteDocumentSubCategoryFinish())
  }
}

function* sortDocumentSubCategory(action: SortDocumentSubCategoryActionModel) {
  try {
    const body: SortDocumentSubCategoryModel = action.payload
    const response: ResponseModel = yield call(service.sortDocumentSubCategory, body)

    yield put({
      type: actionTypes.SORT_DOCUMENT_SUB_CATEGORY_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_DOCUMENT_SUB_CATEGORY_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_DOCUMENT_SUB_CATEGORY_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_DOCUMENT_SUB_CATEGORY_START, getDocumentSubCategorySaga)
  yield takeLatest(actionTypes.GET_ALL_DOCUMENT_SUB_CATEGORY_START, getAllDocumentSubCategorySaga)
  yield takeLatest(actionTypes.ADD_DOCUMENT_SUB_CATEGORY_START, addDocumentSubCategorySaga)
  yield takeLatest(actionTypes.UPDATE_DOCUMENT_SUB_CATEGORY_START, updateDocumentSubCategorySaga)
  yield takeLatest(actionTypes.DELETE_DOCUMENT_SUB_CATEGORY_START, deleteDocumentSubCategorySaga)
  yield takeLatest(actionTypes.ENABLE_DOCUMENT_SUB_CATEGORY_REQUEST, enableDocumentSubCategorySaga)
  yield takeLatest(
    actionTypes.DISABLE_DOCUMENT_SUB_CATEGORY_REQUEST,
    disableDocumentSubCategorySaga
  )
  yield takeLatest(
    actionTypes.SINGLE_ENABLE_DOCUMENT_SUB_CATEGORY_REQUEST,
    singleEnableDocumentSubCategorySaga
  )
  yield takeLatest(
    actionTypes.SINGLE_DISABLE_DOCUMENT_SUB_CATEGORY_REQUEST,
    singleDisableDocumentSubCategorySaga
  )
  yield takeLatest(actionTypes.SORT_DOCUMENT_SUB_CATEGORY_START, sortDocumentSubCategory)
}
