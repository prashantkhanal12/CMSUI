import { call, put, takeLatest, delay } from 'redux-saga/effects'
import { actions } from './action'
import { actionTypes } from './constants'
import { ResponseModel } from 'src/cms/helpers/Models/ResponseModel'
import { service } from './service'
import { ActionModel } from 'src/cms/helpers/Models/ActionModel'
import { globalActionTypes } from 'src/app/modules/errors/redux/constants'
import { ParamsModel } from 'src/app/modules/common/Model'
import { SortActionModel, SortCategoriesModel } from '../Model'

function* getSpecificCmsCategoriesSaga(action: ActionModel) {
  try {
    const params: any = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getSpeficCmsCategories, params)
    yield put(actions.getSpecificCmsCategoriesSuccess(response?.data?.data))
    yield put(actions.getSpecificCmsCategoriesFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put(actions.getSpecificCmsCategoriesFinish())
  }
}
function* getCmsCategoriesSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getCmsCategories, params)
    yield put(actions.getCmsCategoriesSuccess(response?.data?.data))
    yield put(actions.getCmsCategoriesFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put(actions.getCmsCategoriesFinish())
  }
}

function* addCmsCategoriesSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addCmsCategories, body)
    yield put(actions.addCmsCategoriesSuccess(response.data?.data))
    yield put(actions.addCmsCategoriesFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put(actions.addCmsCategoriesFinish())
  }
}

function* updateCmsCategoriesSaga(action: ActionModel) {
  try {
    const body: any = action.payload.data
    const response: ResponseModel = yield call(
      service.updateCmsCategories,
      body,
      action.payload?.id
    )
    yield put(actions.updateCmsCategoriesSuccess(response.data?.data))
    yield put(actions.updateCmsCategoriesFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put(actions.updateCmsCategoriesFinish())
  }
}

function* deleteCmsCategoriesSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteCmsCategories, body)
    yield put(actions.deleteCmsCategoriesSuccess(response.data?.data))
    yield put(actions.deleteCmsCategoriesFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put(actions.deleteCmsCategoriesFinish())
  }
}

function* singleActivateCmsCategories(action: ActionModel) {
  try {
    const selectedOperationIncharge: any = action.payload
    const response: ResponseModel = yield call(
      service.singleActivateCmsCategories,
      selectedOperationIncharge
    )
    yield put({
      type: actionTypes.SINGLE_ACTIVATE_CMS_CATEGORIES_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({ type: actionTypes.SINGLE_ACTIVATE_CMS_CATEGORIES_FINISH })
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put({ type: actionTypes.SINGLE_ACTIVATE_CMS_CATEGORIES_FINISH })
  }
}

function* singleDeactivateCmsCategories(action: ActionModel) {
  try {
    const selectedOperationIncharge: any = action.payload
    const response: ResponseModel = yield call(
      service.singleDeactivateCmsCategories,
      selectedOperationIncharge
    )

    yield put({
      type: actionTypes.SINGLE_DEACTIVATE_CMS_CATEGORIES_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({ type: actionTypes.SINGLE_DEACTIVATE_CMS_CATEGORIES_FINISH })
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put({ type: actionTypes.SINGLE_DEACTIVATE_CMS_CATEGORIES_FINISH })
  }
}

function* sortCategories(action: SortActionModel) {
  try {
    const body: SortCategoriesModel = action.payload
    const response: ResponseModel = yield call(
      service.sortCategories,
      body
    )

    yield put({
      type: actionTypes.SORT_CATEGORIES_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({ type: actionTypes.SORT_CATEGORIES_FINISH })
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put({ type: actionTypes.SORT_CATEGORIES_FINISH })
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_SPECIFIC_CMS_CATEGORIES_START, getSpecificCmsCategoriesSaga)
  yield takeLatest(actionTypes.GET_CMS_CATEGORIES_START, getCmsCategoriesSaga)
  yield takeLatest(actionTypes.ADD_CMS_CATEGORIES_START, addCmsCategoriesSaga)
  yield takeLatest(actionTypes.UPDATE_CMS_CATEGORIES_START, updateCmsCategoriesSaga)
  yield takeLatest(actionTypes.DELETE_CMS_CATEGORIES_START, deleteCmsCategoriesSaga)
  yield takeLatest(actionTypes.SINGLE_ACTIVATE_CMS_CATEGORIES_REQUEST, singleActivateCmsCategories)
  yield takeLatest(
    actionTypes.SINGLE_DEACTIVATE_CMS_CATEGORIES_REQUEST,
    singleDeactivateCmsCategories
  )
  yield takeLatest(actionTypes.SORT_CATEGORIES_START, sortCategories)
}
