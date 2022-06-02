import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {
  ProductCategoryModel,
  SortProductActionModel,
  SortProductCategoryModel,
} from '../Model/ProductCategoryModel'
import {ParamsModel} from 'src/app/modules/common/Model'

function* getProductCategorySaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload

    yield delay(500)
    const response: ResponseModel = yield call(service.getProductCategory, params)
    yield put(actions.getProductCategorySuccess(response?.data?.data))
    yield put(actions.getProductCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getProductCategoryFinish())
  }
}

function* getAllProductCategorySaga() {
  try {
    const response: ResponseModel = yield call(service.getAllProductCategory)
    yield put(actions.getAllProductCategorySuccess(response?.data?.data))
    yield put(actions.getAllProductCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllProductCategoryFinish())
  }
}

function* addProductCategorySaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addProductCategory, body)
    yield put(actions.addProductCategorySuccess(response.data?.data))
    yield put(actions.addProductCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addProductCategoryFinish())
  }
}

function* enableProductCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableProductCategory, selectedUsers)
    yield put(actions.enableProductCategorySuccess(response?.data))
    yield put(actions.enableProductCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableProductCategoryFinish())
  }
}

function* disableProductCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableProductCategory, selectedUsers)
    yield put(actions.disableProductCategorySuccess(response?.data))
    yield put(actions.disableProductCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableProductCategoryFinish())
  }
}

function* singleEnableProductCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableProductCategory, selectedUsers)
    yield put(actions.singleEnableProductCategorySuccess(response?.data))
    yield put(actions.singleEnableProductCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableProductCategoryFinish())
  }
}

function* singleDisableProductCategorySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableProductCategory, selectedUsers)
    yield put(actions.singleDisableProductCategorySuccess(response?.data))
    yield put(actions.singleDisableProductCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableProductCategoryFinish())
  }
}

function* updateProductCategorySaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(
      service.updateProductCategory,
      body,
      action.payload?.id
    )
    yield put(actions.updateProductCategorySuccess(response.data?.data))
    yield put(actions.updateProductCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateProductCategoryFinish())
  }
}

function* deleteProductCategorySaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteProductCategory, body)
    yield put(actions.deleteProductCategorySuccess(response.data?.data))
    yield put(actions.deleteProductCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteProductCategoryFinish())
  }
}

function* sortProductCategory(action: SortProductActionModel) {
  try {
    const body: SortProductCategoryModel = action.payload
    const response: ResponseModel = yield call(service.sortProductCategory, body)

    yield put({
      type: actionTypes.SORT_PRODUCT_CATEGORY_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_PRODUCT_CATEGORY_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_PRODUCT_CATEGORY_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_PRODUCT_CATEGORY_START, getProductCategorySaga)
  yield takeLatest(actionTypes.GET_ALL_PRODUCT_CATEGORY_START, getAllProductCategorySaga)
  yield takeLatest(actionTypes.ADD_PRODUCT_CATEGORY_START, addProductCategorySaga)
  yield takeLatest(actionTypes.UPDATE_PRODUCT_CATEGORY_START, updateProductCategorySaga)
  yield takeLatest(actionTypes.DELETE_PRODUCT_CATEGORY_START, deleteProductCategorySaga)
  yield takeLatest(actionTypes.ENABLE_PRODUCT_CATEGORY_REQUEST, enableProductCategorySaga)
  yield takeLatest(actionTypes.DISABLE_PRODUCT_CATEGORY_REQUEST, disableProductCategorySaga)
  yield takeLatest(
    actionTypes.SINGLE_ENABLE_PRODUCT_CATEGORY_REQUEST,
    singleEnableProductCategorySaga
  )
  yield takeLatest(
    actionTypes.SINGLE_DISABLE_PRODUCT_CATEGORY_REQUEST,
    singleDisableProductCategorySaga
  )
  yield takeLatest(actionTypes.SORT_PRODUCT_CATEGORY_START, sortProductCategory)
}
