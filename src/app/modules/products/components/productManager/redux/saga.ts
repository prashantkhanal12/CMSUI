import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ProductManagerModel} from '../Model/ProductManagerModel'
import {ParamsModel} from 'src/app/modules/common/Model'
import {
  ProductApplyNowOptionResponseModel,
  ProductComparisonStatusResponseModel,
  ProductCompetitorStatusResponseModel,
  ProductDocumentOptionResponseModel,
  ProductFaqOptionResponseModel,
  ProductFeatureOptionResponseModel,
  ProductInterestRateOptionResponseModel,
  ProductLeadFormOptionResponseModel,
  ProductMediaTypeResponseModel,
  ProductPopularityResponseModel,
  ProductRelatedOptionResponseModel,
  ProductReviewOptionResponseModel,
  SortProductManagerActionModel,
  SortProductManagerModel,
} from '../Model'

function* getProductManagerSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload

    yield delay(500)
    const response: ResponseModel = yield call(service.getProductManager, params)
    yield put(actions.getProductManagerSuccess(response?.data?.data))
    yield put(actions.getProductManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getProductManagerFinish())
  }
}

function* getProductComparisonStatusSaga() {
  try {
    const response: ProductComparisonStatusResponseModel = yield call(
      service.getProductComparisonStatus
    )
    yield put(actions.getProductComparisonStatusSuccess(response?.data?.data))
    yield put(actions.getProductComparisonStatusFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getProductComparisonStatusFinish())
  }
}

function* getProductPopularitySaga() {
  try {
    const response: ProductPopularityResponseModel = yield call(service.getProductPopularity)
    yield put(actions.getProductPopularitySuccess(response?.data?.data))
    yield put(actions.getProductPopularityFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getProductPopularityFinish())
  }
}

function* getProductApplyNowOptionSaga() {
  try {
    const response: ProductApplyNowOptionResponseModel = yield call(
      service.getProductApplyNowOption
    )
    yield put(actions.getProductApplyNowOptionSuccess(response?.data?.data))
    yield put(actions.getProductApplyNowOptionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getProductApplyNowOptionFinish())
  }
}

function* getProductCompetitorStatusSaga() {
  try {
    const response: ProductCompetitorStatusResponseModel = yield call(
      service.getProductCompetitorStatus
    )
    yield put(actions.getProductCompetitorStatusSuccess(response?.data?.data))
    yield put(actions.getProductCompetitorStatusFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getProductCompetitorStatusFinish())
  }
}

function* getProductDocumentOptionSaga() {
  try {
    const response: ProductDocumentOptionResponseModel = yield call(
      service.getProductDocumentOption
    )
    yield put(actions.getProductDocumentOptionSuccess(response?.data?.data))
    yield put(actions.getProductDocumentOptionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getProductDocumentOptionFinish())
  }
}

function* getProductFaqOptionSaga() {
  try {
    const response: ProductFaqOptionResponseModel = yield call(service.getProductFaqOption)
    yield put(actions.getProductFaqOptionSuccess(response?.data?.data))
    yield put(actions.getProductFaqOptionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getProductFaqOptionFinish())
  }
}

function* getProductFeatureOptionSaga() {
  try {
    const response: ProductFeatureOptionResponseModel = yield call(service.getProductFeatureOption)
    yield put(actions.getProductFeatureOptionSuccess(response?.data?.data))
    yield put(actions.getProductFeatureOptionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getProductFeatureOptionFinish())
  }
}

function* getProductInterestRateOptionSaga() {
  try {
    const response: ProductInterestRateOptionResponseModel = yield call(
      service.getProductInterestRateOption
    )
    yield put(actions.getProductInterestRateOptionSuccess(response?.data?.data))
    yield put(actions.getProductInterestRateOptionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getProductInterestRateOptionFinish())
  }
}

function* getProductLeadFormOptionSaga() {
  try {
    const response: ProductLeadFormOptionResponseModel = yield call(
      service.getProductLeadFormOption
    )
    yield put(actions.getProductLeadFormOptionSuccess(response?.data?.data))
    yield put(actions.getProductLeadFormOptionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getProductLeadFormOptionFinish())
  }
}

function* getProductMediaTypeSaga() {
  try {
    const response: ProductMediaTypeResponseModel = yield call(service.getProductMediaType)
    yield put(actions.getProductMediaTypeSuccess(response?.data?.data))
    yield put(actions.getProductMediaTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getProductMediaTypeFinish())
  }
}

function* getProductRelatedOptionSaga() {
  try {
    const response: ProductRelatedOptionResponseModel = yield call(service.getProductRelatedOption)
    yield put(actions.getProductRelatedOptionSuccess(response?.data?.data))
    yield put(actions.getProductRelatedOptionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getProductRelatedOptionFinish())
  }
}

function* getProductReviewOptionSaga() {
  try {
    const response: ProductReviewOptionResponseModel = yield call(service.getProductReviewOption)
    yield put(actions.getProductReviewOptionSuccess(response?.data?.data))
    yield put(actions.getProductReviewOptionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getProductReviewOptionFinish())
  }
}

function* getAllProductManagerSaga(action: ActionModel) {
  try {
    const id = action.payload
    const response: ResponseModel = yield call(service.getAllProductManager, id)
    yield put(actions.getAllProductManagerSuccess(response?.data?.data))
    yield put(actions.getAllProductManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllProductManagerFinish())
  }
}

function* getProductManagerByTagSaga(action: ActionModel) {
  try {
    const id = action.payload
    const response: ResponseModel = yield call(service.getProductManagerByTag, id)
    yield put(actions.getProductManagerByTagSuccess(response?.data?.data))
    yield put(actions.getProductManagerByTagFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getProductManagerByTagFinish())
  }
}

function* addProductManagerSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addProductManager, body)
    yield put(actions.addProductManagerSuccess(response.data?.data))
    yield put(actions.addProductManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addProductManagerFinish())
  }
}

function* enableProductManagerSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableProductManager, selectedUsers)
    yield put(actions.enableProductManagerSuccess(response?.data))
    yield put(actions.enableProductManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableProductManagerFinish())
  }
}

function* disableProductManagerSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableProductManager, selectedUsers)
    yield put(actions.disableProductManagerSuccess(response?.data))
    yield put(actions.disableProductManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableProductManagerFinish())
  }
}

function* singleEnableProductManagerSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableProductManager, selectedUsers)
    yield put(actions.singleEnableProductManagerSuccess(response?.data))
    yield put(actions.singleEnableProductManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableProductManagerFinish())
  }
}

function* singleDisableProductManagerSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableProductManager, selectedUsers)
    yield put(actions.singleDisableProductManagerSuccess(response?.data))
    yield put(actions.singleDisableProductManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableProductManagerFinish())
  }
}

function* updateProductManagerSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(
      service.updateProductManager,
      body,
      action.payload?.id
    )
    yield put(actions.updateProductManagerSuccess(response.data?.data))
    yield put(actions.updateProductManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateProductManagerFinish())
  }
}

function* deleteProductManagerSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteProductManager, body)
    yield put(actions.deleteProductManagerSuccess(response.data?.data))
    yield put(actions.deleteProductManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteProductManagerFinish())
  }
}

function* sortProductManager(action: SortProductManagerActionModel) {
  try {
    const body: SortProductManagerModel = action.payload
    const response: ResponseModel = yield call(service.sortProductManager, body)

    yield put({
      type: actionTypes.SORT_PRODUCT_MANAGER_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_PRODUCT_MANAGER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_PRODUCT_MANAGER_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_PRODUCT_MANAGER_START, getProductManagerSaga)
  yield takeLatest(actionTypes.GET_PRODUCT_POPULARITY_START, getProductPopularitySaga)
  yield takeLatest(actionTypes.GET_PRODUCT_COMPARISON_STATUS_START, getProductComparisonStatusSaga)
  yield takeLatest(actionTypes.GET_PRODUCT_APPLY_NOW_OPTION_START, getProductApplyNowOptionSaga)
  yield takeLatest(actionTypes.GET_PRODUCT_COMPETITOR_STATUS_START, getProductCompetitorStatusSaga)
  yield takeLatest(actionTypes.GET_PRODUCT_DOCUMENT_OPTION_START, getProductDocumentOptionSaga)
  yield takeLatest(actionTypes.GET_PRODUCT_FAQ_OPTION_START, getProductFaqOptionSaga)
  yield takeLatest(actionTypes.GET_PRODUCT_FEATURE_OPTION_START, getProductFeatureOptionSaga)
  yield takeLatest(
    actionTypes.GET_PRODUCT_INTEREST_RATE_OPTION_START,
    getProductInterestRateOptionSaga
  )
  yield takeLatest(actionTypes.GET_PRODUCT_LEAD_FORM_OPTION_START, getProductLeadFormOptionSaga)
  yield takeLatest(actionTypes.GET_PRODUCT_MEDIA_TYPE_START, getProductMediaTypeSaga)
  yield takeLatest(actionTypes.GET_PRODUCT_RELATED_OPTION_START, getProductRelatedOptionSaga)
  yield takeLatest(actionTypes.GET_PRODUCT_REVIEW_OPTION_START, getProductReviewOptionSaga)
  yield takeLatest(actionTypes.GET_ALL_PRODUCT_MANAGER_START, getAllProductManagerSaga)
  yield takeLatest(actionTypes.GET_PRODUCT_MANAGER_BY_TAG_START, getProductManagerByTagSaga)
  yield takeLatest(actionTypes.ADD_PRODUCT_MANAGER_START, addProductManagerSaga)
  yield takeLatest(actionTypes.UPDATE_PRODUCT_MANAGER_START, updateProductManagerSaga)
  yield takeLatest(actionTypes.DELETE_PRODUCT_MANAGER_START, deleteProductManagerSaga)
  yield takeLatest(actionTypes.ENABLE_PRODUCT_MANAGER_REQUEST, enableProductManagerSaga)
  yield takeLatest(actionTypes.DISABLE_PRODUCT_MANAGER_REQUEST, disableProductManagerSaga)
  yield takeLatest(
    actionTypes.SINGLE_ENABLE_PRODUCT_MANAGER_REQUEST,
    singleEnableProductManagerSaga
  )
  yield takeLatest(
    actionTypes.SINGLE_DISABLE_PRODUCT_MANAGER_REQUEST,
    singleDisableProductManagerSaga
  )
  yield takeLatest(actionTypes.SORT_PRODUCT_MANAGER_START, sortProductManager)
}
