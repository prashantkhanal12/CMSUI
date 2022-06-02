import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'

import {MerchantSubCategoryModel} from '../Model/MerchantSubCategoryModel'
import {ParamsModel} from 'src/app/modules/common/Model'
import {SortMerchantSubCategoryActionModel, SortMerchantSubCategoryModel} from '../Model'

function* getMerchantSubCategorySaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getMerchantSubCategory, params)
    yield put(actions.getMerchantSubCategorySuccess(response?.data?.data))
    yield put(actions.getMerchantSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getMerchantSubCategoryFinish())
  }
}

function* getAllMerchantSubCategorySaga(action: ActionModel) {
  try {
    const response: ResponseModel = yield call(service.getAllMerchantSubCategory, action.payload)
    yield put(actions.getAllMerchantSubCategorySuccess(response?.data?.data))
    yield put(actions.getAllMerchantSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllMerchantSubCategoryFinish())
  }
}

function* addMerchantSubCategorySaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addMerchantSubCategory, body)
    yield put(actions.addMerchantSubCategorySuccess(response.data?.data))
    yield put(actions.addMerchantSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addMerchantSubCategoryFinish())
  }
}

function* enableMerchantSubCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableMerchantSubCategory, selectedUsers)
    yield put(actions.enableMerchantSubCategorySuccess(response?.data))
    yield put(actions.enableMerchantSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableMerchantSubCategoryFinish())
  }
}

function* disableMerchantSubCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableMerchantSubCategory, selectedUsers)
    yield put(actions.disableMerchantSubCategorySuccess(response?.data))
    yield put(actions.disableMerchantSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableMerchantSubCategoryFinish())
  }
}

function* singleEnableMerchantSubCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.singleEnableMerchantSubCategory,
      selectedUsers
    )
    yield put(actions.singleEnableMerchantSubCategorySuccess(response?.data))
    yield put(actions.singleEnableMerchantSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableMerchantSubCategoryFinish())
  }
}

function* singleDisableMerchantSubCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.singleDisableMerchantSubCategory,
      selectedUsers
    )
    yield put(actions.singleDisableMerchantSubCategorySuccess(response?.data))
    yield put(actions.singleDisableMerchantSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableMerchantSubCategoryFinish())
  }
}

function* updateMerchantSubCategorySaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(
      service.updateMerchantSubCategory,
      body.data,
      action.payload?.id
    )
    yield put(actions.updateMerchantSubCategorySuccess(response.data?.data))
    yield put(actions.updateMerchantSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateMerchantSubCategoryFinish())
  }
}

function* deleteMerchantSubCategorySaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteMerchantSubCategory, body)
    yield put(actions.deleteMerchantSubCategorySuccess(response.data?.data))
    yield put(actions.deleteMerchantSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteMerchantSubCategoryFinish())
  }
}

function* sortMerchantSubCategory(action: SortMerchantSubCategoryActionModel) {
  try {
    const body: SortMerchantSubCategoryModel = action.payload
    const response: ResponseModel = yield call(service.sortMerchantSubCategory, body)

    yield put({
      type: actionTypes.SORT_MERCHANT_SUB_CATEGORY_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_MERCHANT_SUB_CATEGORY_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_MERCHANT_SUB_CATEGORY_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_MERCHANT_SUB_CATEGORY_START, getMerchantSubCategorySaga)
  yield takeLatest(actionTypes.GET_ALL_MERCHANT_SUB_CATEGORY_START, getAllMerchantSubCategorySaga)
  yield takeLatest(actionTypes.ADD_MERCHANT_SUB_CATEGORY_START, addMerchantSubCategorySaga)
  yield takeLatest(actionTypes.UPDATE_MERCHANT_SUB_CATEGORY_START, updateMerchantSubCategorySaga)
  yield takeLatest(actionTypes.DELETE_MERCHANT_SUB_CATEGORY_START, deleteMerchantSubCategorySaga)
  yield takeLatest(actionTypes.ENABLE_MERCHANT_SUB_CATEGORY_REQUEST, enableMerchantSubCategorySaga)
  yield takeLatest(
    actionTypes.DISABLE_MERCHANT_SUB_CATEGORY_REQUEST,
    disableMerchantSubCategorySaga
  )
  yield takeLatest(
    actionTypes.SINGLE_ENABLE_MERCHANT_SUB_CATEGORY_REQUEST,
    singleEnableMerchantSubCategorySaga
  )
  yield takeLatest(
    actionTypes.SINGLE_DISABLE_MERCHANT_SUB_CATEGORY_REQUEST,
    singleDisableMerchantSubCategorySaga
  )
  yield takeLatest(actionTypes.SORT_MERCHANT_SUB_CATEGORY_START, sortMerchantSubCategory)
}
