import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {
  ProductComparisonCategoryModel,
  SortProductComparisonActionModel,
  SortProductComparisonModel,
} from '../Model/ProductComparisonCategoryModel'
import {ParamsModel} from 'src/app/modules/common/Model'

function* getProductComparisonCategorySaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload

    yield delay(500)
    const response: ResponseModel = yield call(service.getProductComparisonCategory, params)
    yield put(actions.getProductComparisonCategorySuccess(response?.data?.data))
    yield put(actions.getProductComparisonCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getProductComparisonCategoryFinish())
  }
}

function* getAllProductComparisonCategorySaga() {
  try {
    const response: ResponseModel = yield call(service.getAllProductComparisonCategory)
    yield put(actions.getAllProductComparisonCategorySuccess(response?.data?.data))
    yield put(actions.getAllProductComparisonCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllProductComparisonCategoryFinish())
  }
}

function* addProductComparisonCategorySaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addProductComparisonCategory, body)
    yield put(actions.addProductComparisonCategorySuccess(response.data?.data))
    yield put(actions.addProductComparisonCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addProductComparisonCategoryFinish())
  }
}

function* enableProductComparisonCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.enableProductComparisonCategory,
      selectedUsers
    )
    yield put(actions.enableProductComparisonCategorySuccess(response?.data))
    yield put(actions.enableProductComparisonCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableProductComparisonCategoryFinish())
  }
}

function* disableProductComparisonCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.disableProductComparisonCategory,
      selectedUsers
    )
    yield put(actions.disableProductComparisonCategorySuccess(response?.data))
    yield put(actions.disableProductComparisonCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableProductComparisonCategoryFinish())
  }
}

function* singleEnableProductComparisonCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.singleEnableProductComparisonCategory,
      selectedUsers
    )
    yield put(actions.singleEnableProductComparisonCategorySuccess(response?.data))
    yield put(actions.singleEnableProductComparisonCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableProductComparisonCategoryFinish())
  }
}

function* singleDisableProductComparisonCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.singleDisableProductComparisonCategory,
      selectedUsers
    )
    yield put(actions.singleDisableProductComparisonCategorySuccess(response?.data))
    yield put(actions.singleDisableProductComparisonCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableProductComparisonCategoryFinish())
  }
}

function* updateProductComparisonCategorySaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(
      service.updateProductComparisonCategory,
      body,
      action.payload?.id
    )
    yield put(actions.updateProductComparisonCategorySuccess(response.data?.data))
    yield put(actions.updateProductComparisonCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateProductComparisonCategoryFinish())
  }
}

function* deleteProductComparisonCategorySaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteProductComparisonCategory, body)
    yield put(actions.deleteProductComparisonCategorySuccess(response.data?.data))
    yield put(actions.deleteProductComparisonCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteProductComparisonCategoryFinish())
  }
}

function* sortProductComparison(action: SortProductComparisonActionModel) {
  try {
    const body: SortProductComparisonModel = action.payload
    const response: ResponseModel = yield call(service.sortProductComparison, body)

    yield put({
      type: actionTypes.SORT_PRODUCT_COMPARISON_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_PRODUCT_COMPARISON_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_PRODUCT_COMPARISON_FINISH})
  }
}

export function* saga() {
  yield takeLatest(
    actionTypes.GET_PRODUCT_COMPARISON_CATEGORY_START,
    getProductComparisonCategorySaga
  )
  yield takeLatest(
    actionTypes.GET_ALL_PRODUCT_COMPARISON_CATEGORY_START,
    getAllProductComparisonCategorySaga
  )
  yield takeLatest(
    actionTypes.ADD_PRODUCT_COMPARISON_CATEGORY_START,
    addProductComparisonCategorySaga
  )
  yield takeLatest(
    actionTypes.UPDATE_PRODUCT_COMPARISON_CATEGORY_START,
    updateProductComparisonCategorySaga
  )
  yield takeLatest(
    actionTypes.DELETE_PRODUCT_COMPARISON_CATEGORY_START,
    deleteProductComparisonCategorySaga
  )
  yield takeLatest(
    actionTypes.ENABLE_PRODUCT_COMPARISON_CATEGORY_REQUEST,
    enableProductComparisonCategorySaga
  )
  yield takeLatest(
    actionTypes.DISABLE_PRODUCT_COMPARISON_CATEGORY_REQUEST,
    disableProductComparisonCategorySaga
  )
  yield takeLatest(
    actionTypes.SINGLE_ENABLE_PRODUCT_COMPARISON_CATEGORY_REQUEST,
    singleEnableProductComparisonCategorySaga
  )
  yield takeLatest(
    actionTypes.SINGLE_DISABLE_PRODUCT_COMPARISON_CATEGORY_REQUEST,
    singleDisableProductComparisonCategorySaga
  )
  yield takeLatest(actionTypes.SORT_PRODUCT_COMPARISON_START, sortProductComparison)
}
