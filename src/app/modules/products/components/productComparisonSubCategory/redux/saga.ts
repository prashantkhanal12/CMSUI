import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {
  ProductComparisonSubCategoryModel,
  SortProductComparisonSubActionModel,
  SortProductComparisonSubModel,
} from '../Model/ProductComparisonSubCategoryModel'
import {ParamsModel} from 'src/app/modules/common/Model'

function* getProductComparisonSubCategorySaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload

    yield delay(500)
    const response: ResponseModel = yield call(service.getProductComparisonSubCategory, params)
    yield put(actions.getProductComparisonSubCategorySuccess(response?.data?.data))
    yield put(actions.getProductComparisonSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getProductComparisonSubCategoryFinish())
  }
}

function* getAllProductComparisonSubCategorySaga() {
  try {
    const response: ResponseModel = yield call(service.getAllProductComparisonSubCategory)
    yield put(actions.getAllProductComparisonSubCategorySuccess(response?.data?.data))
    yield put(actions.getAllProductComparisonSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllProductComparisonSubCategoryFinish())
  }
}

function* addProductComparisonSubCategorySaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addProductComparisonSubCategory, body)
    yield put(actions.addProductComparisonSubCategorySuccess(response.data?.data))
    yield put(actions.addProductComparisonSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addProductComparisonSubCategoryFinish())
  }
}

function* enableProductComparisonSubCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.enableProductComparisonSubCategory,
      selectedUsers
    )
    yield put(actions.enableProductComparisonSubCategorySuccess(response?.data))
    yield put(actions.enableProductComparisonSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableProductComparisonSubCategoryFinish())
  }
}

function* disableProductComparisonSubCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.disableProductComparisonSubCategory,
      selectedUsers
    )
    yield put(actions.disableProductComparisonSubCategorySuccess(response?.data))
    yield put(actions.disableProductComparisonSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableProductComparisonSubCategoryFinish())
  }
}

function* singleEnableProductComparisonSubCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.singleEnableProductComparisonSubCategory,
      selectedUsers
    )
    yield put(actions.singleEnableProductComparisonSubCategorySuccess(response?.data))
    yield put(actions.singleEnableProductComparisonSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableProductComparisonSubCategoryFinish())
  }
}

function* singleDisableProductComparisonSubCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.singleDisableProductComparisonSubCategory,
      selectedUsers
    )
    yield put(actions.singleDisableProductComparisonSubCategorySuccess(response?.data))
    yield put(actions.singleDisableProductComparisonSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableProductComparisonSubCategoryFinish())
  }
}

function* updateProductComparisonSubCategorySaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(
      service.updateProductComparisonSubCategory,
      body,
      action.payload?.id
    )
    yield put(actions.updateProductComparisonSubCategorySuccess(response.data?.data))
    yield put(actions.updateProductComparisonSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateProductComparisonSubCategoryFinish())
  }
}

function* deleteProductComparisonSubCategorySaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteProductComparisonSubCategory, body)
    yield put(actions.deleteProductComparisonSubCategorySuccess(response.data?.data))
    yield put(actions.deleteProductComparisonSubCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteProductComparisonSubCategoryFinish())
  }
}

function* sortProductComparisonSub(action: SortProductComparisonSubActionModel) {
  try {
    const body: SortProductComparisonSubModel = action.payload
    const response: ResponseModel = yield call(service.sortProductComparisonSub, body)

    yield put({
      type: actionTypes.SORT_PRODUCT_COMPARISON_SUB_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_PRODUCT_COMPARISON_SUB_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_PRODUCT_COMPARISON_SUB_FINISH})
  }
}

export function* saga() {
  yield takeLatest(
    actionTypes.GET_PRODUCT_COMPARISON_SUB_CATEGORY_START,
    getProductComparisonSubCategorySaga
  )
  yield takeLatest(
    actionTypes.GET_ALL_PRODUCT_COMPARISON_SUB_CATEGORY_START,
    getAllProductComparisonSubCategorySaga
  )
  yield takeLatest(
    actionTypes.ADD_PRODUCT_COMPARISON_SUB_CATEGORY_START,
    addProductComparisonSubCategorySaga
  )
  yield takeLatest(
    actionTypes.UPDATE_PRODUCT_COMPARISON_SUB_CATEGORY_START,
    updateProductComparisonSubCategorySaga
  )
  yield takeLatest(
    actionTypes.DELETE_PRODUCT_COMPARISON_SUB_CATEGORY_START,
    deleteProductComparisonSubCategorySaga
  )
  yield takeLatest(
    actionTypes.ENABLE_PRODUCT_COMPARISON_SUB_CATEGORY_REQUEST,
    enableProductComparisonSubCategorySaga
  )
  yield takeLatest(
    actionTypes.DISABLE_PRODUCT_COMPARISON_SUB_CATEGORY_REQUEST,
    disableProductComparisonSubCategorySaga
  )
  yield takeLatest(
    actionTypes.SINGLE_ENABLE_PRODUCT_COMPARISON_SUB_CATEGORY_REQUEST,
    singleEnableProductComparisonSubCategorySaga
  )
  yield takeLatest(
    actionTypes.SINGLE_DISABLE_PRODUCT_COMPARISON_SUB_CATEGORY_REQUEST,
    singleDisableProductComparisonSubCategorySaga
  )
  yield takeLatest(actionTypes.SORT_PRODUCT_COMPARISON_SUB_START, sortProductComparisonSub)
}
