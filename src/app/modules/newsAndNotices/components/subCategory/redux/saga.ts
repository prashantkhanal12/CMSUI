import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ParamsModel} from 'src/app/modules/common/Model'
import {SortNewSubCategoryModel, SortSubCategoryActionModel} from '../Model'

function* getSpecificSubCategorySaga(action: ActionModel) {
  try {
    const params: any = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getSpeficSubCategory, params)
    yield put(actions.getSpecificSubCategorySuccess(response?.data?.data))
    yield put(actions.getSpecificSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getSpecificSubCategoryFinish())
  }
}

function* getSubCategorySaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getSubCategory, params)
    yield put(actions.getSubCategorySuccess(response?.data?.data))
    yield put(actions.getSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getSubCategoryFinish())
  }
}

function* addSubCategorySaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addSubCategory, body)
    yield put(actions.addSubCategorySuccess(response.data?.data))
    yield put(actions.addSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addSubCategoryFinish())
  }
}

function* updateSubCategorySaga(action: ActionModel) {
  try {
    const body: any = action.payload.data
    const response: ResponseModel = yield call(service.updateSubCategory, body, action.payload?.id)
    yield put(actions.updateSubCategorySuccess(response.data?.data))
    yield put(actions.updateSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateSubCategoryFinish())
  }
}

function* deleteSubCategorySaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteSubCategory, body)
    yield put(actions.deleteSubCategorySuccess(response.data?.data))
    yield put(actions.deleteSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteSubCategoryFinish())
  }
}

function* singleActivateSubCategory(action: ActionModel) {
  try {
    const selectedOperationIncharge: any = action.payload
    const response: ResponseModel = yield call(
      service.singleActivateSubCategory,
      selectedOperationIncharge
    )
    yield put({
      type: actionTypes.SINGLE_ACTIVATE_SUB_CATEGORY_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SINGLE_ACTIVATE_SUB_CATEGORY_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_ACTIVATE_SUB_CATEGORY_FINISH})
  }
}

function* singleDeactivateSubCategory(action: ActionModel) {
  try {
    const selectedOperationIncharge: any = action.payload
    const response: ResponseModel = yield call(
      service.singleDeactivateSubCategory,
      selectedOperationIncharge
    )

    yield put({
      type: actionTypes.SINGLE_DEACTIVATE_SUB_CATEGORY_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SINGLE_DEACTIVATE_SUB_CATEGORY_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_DEACTIVATE_SUB_CATEGORY_FINISH})
  }
}

function* sortNewsSubCategory(action: SortSubCategoryActionModel) {
  try {
    const body: SortNewSubCategoryModel = action.payload
    const response: ResponseModel = yield call(service.sortNewsSubCategory, body)

    yield put({
      type: actionTypes.SORT_NEWS_SUB_CATEGORY_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_NEWS_SUB_CATEGORY_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_NEWS_SUB_CATEGORY_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_SPECIFIC_SUB_CATEGORY_START, getSpecificSubCategorySaga)
  yield takeLatest(actionTypes.GET_SUB_CATEGORY_START, getSubCategorySaga)
  yield takeLatest(actionTypes.ADD_SUB_CATEGORY_START, addSubCategorySaga)
  yield takeLatest(actionTypes.UPDATE_SUB_CATEGORY_START, updateSubCategorySaga)
  yield takeLatest(actionTypes.DELETE_SUB_CATEGORY_START, deleteSubCategorySaga)
  yield takeLatest(actionTypes.SINGLE_ACTIVATE_SUB_CATEGORY_REQUEST, singleActivateSubCategory)
  yield takeLatest(actionTypes.SINGLE_DEACTIVATE_SUB_CATEGORY_REQUEST, singleDeactivateSubCategory)
  yield takeLatest(actionTypes.SORT_NEWS_SUB_CATEGORY_START, sortNewsSubCategory)
}
