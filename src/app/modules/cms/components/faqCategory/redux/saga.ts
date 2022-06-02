import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {FaqParamsModel, SortFaqCategoryActionModel, SortFaqCategoryModel} from '../Model'

function* getFaqCategorySaga(action: ActionModel) {
  try {
    const params: any = action.payload?.params
    yield delay(500)
    const response: ResponseModel = yield call(service.getFaqCategory, params)
    const data: any = response?.data
    yield put(actions.getFaqCategorySuccess(data))
  } catch (error: any) {
    yield put(actions.getFaqCategoryError(error))
  }
}

function* getAllFaqCategorySaga(action: ActionModel) {
  try {
    const params: FaqParamsModel = action.payload
    const response: ResponseModel = yield call(service.getAllFaqCategory, params)
    const data: any = response?.data
    yield put(actions.getAllFaqCategorySuccess(data))
    yield put(actions.getAllFaqCategoryError())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllFaqCategoryError())
  }
}

//Create Faq Category Saga
function* createFaqCategorySaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.addFaqCategory, body)
    yield put({type: actionTypes.ADD_FAQ_CATEGORY_SUCCESS, payload: response.data})
    yield put({type: actionTypes.ADD_FAQ_CATEGORY_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.ADD_FAQ_CATEGORY_FINISH})
  }
}

//Update Faq Category
function* updateFaqCategorySaga(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(service.updateFaqCategory, body, action.payload?.id)
    yield put({type: actionTypes.UPDATE_FAQ_CATEGORY_SUCCESS, payload: response.data})
    yield put({type: actionTypes.UPDATE_FAQ_CATEGORY_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.UPDATE_FAQ_CATEGORY_FINISH})
  }
}

//Activate Deactivate Road Block Popup Saga
function* activateFaqCategorySaga(action: ActionModel) {
  try {
    const selectedFaqCategory: any = action.payload?.data
    const response: ResponseModel = yield call(service.activateFaqCategory, selectedFaqCategory)
    yield put({type: actionTypes.ACTIVATE_FAQ_CATEGORY_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.ACTIVATE_FAQ_CATEGORY_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.ACTIVATE_FAQ_CATEGORY_FINISH})
  }
}

function* singleActivateFaqCategorySaga(action: ActionModel) {
  try {
    const selectedFaqCategory: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.singleActivateFaqCategory,
      selectedFaqCategory
    )

    yield put({type: actionTypes.SINGLE_ACTIVATE_FAQ_CATEGORY_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.SINGLE_ACTIVATE_FAQ_CATEGORY_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_ACTIVATE_FAQ_CATEGORY_FINISH})
  }
}

function* deactivateFaqCategorySaga(action: ActionModel) {
  try {
    const selectedFaqCategory: any = action.payload?.data
    const response: ResponseModel = yield call(service.deactivateFaqCategory, selectedFaqCategory)

    yield put({type: actionTypes.DEACTIVATE_FAQ_CATEGORY_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.DEACTIVATE_FAQ_CATEGORY_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.DEACTIVATE_FAQ_CATEGORY_FINISH})
  }
}

function* singleDeactivateFaqCategorySaga(action: ActionModel) {
  try {
    const selectedFaqCategory: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.singleDeactivateFaqCategory,
      selectedFaqCategory
    )
    yield put({type: actionTypes.SINGLE_ACTIVATE_FAQ_CATEGORY_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.SINGLE_ACTIVATE_FAQ_CATEGORY_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_ACTIVATE_FAQ_CATEGORY_FINISH})
  }
}

function* deleteFaqCategorySaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteFaqCategory, body)
    yield put({type: actionTypes.DELETE_FAQ_CATEGORY_SUCCESS})
    yield put({type: actionTypes.DELETE_FAQ_CATEGORY_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.DELETE_FAQ_CATEGORY_FINISH})
  }
}

function* sortFaqCategory(action: SortFaqCategoryActionModel) {
  try {
    const body: SortFaqCategoryModel = action.payload
    const response: ResponseModel = yield call(service.sortFaqCategory, body)

    yield put({
      type: actionTypes.SORT_FAQ_CATEGORY_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_FAQ_CATEGORY_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_FAQ_CATEGORY_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_FAQ_CATEGORY_START, getFaqCategorySaga)
  yield takeLatest(actionTypes.GET_ALL_FAQ_CATEGORY_START, getAllFaqCategorySaga)
  yield takeLatest(actionTypes.ADD_FAQ_CATEGORY_REQUEST, createFaqCategorySaga)
  yield takeLatest(actionTypes.UPDATE_FAQ_CATEGORY_START, updateFaqCategorySaga)
  yield takeLatest(actionTypes.ACTIVATE_FAQ_CATEGORY_REQUEST, activateFaqCategorySaga)
  yield takeLatest(actionTypes.SINGLE_ACTIVATE_FAQ_CATEGORY_REQUEST, singleActivateFaqCategorySaga)
  yield takeLatest(actionTypes.DEACTIVATE_FAQ_CATEGORY_REQUEST, deactivateFaqCategorySaga)
  yield takeLatest(
    actionTypes.SINGLE_DEACTIVATE_FAQ_CATEGORY_REQUEST,
    singleDeactivateFaqCategorySaga
  )
  yield takeLatest(actionTypes.DELETE_FAQ_CATEGORY_START, deleteFaqCategorySaga)
  yield takeLatest(actionTypes.SORT_FAQ_CATEGORY_START, sortFaqCategory)
}
