import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {
  ServiceManagerResponseType,
  SortServiceManagerActionModel,
  SortServiceManagerModel,
} from '../Model'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {ParamsModel} from 'src/app/modules/common/Model'

function* getServiceManagerSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ServiceManagerResponseType = yield call(service.getServiceManager, params)
    yield put(actions.getServiceManagerSuccess(response?.data?.data))
    yield put(actions.getServiceManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.GET_SERVICE_MANAGER_FINISH})
  }
}

function* getServiceManagerListSaga() {
  try {
    const response: ServiceManagerResponseType = yield call(service.getServiceManagerListSaga)
    yield put(actions.getServiceManagerListSuccess(response?.data?.data?.serviceManager))
    yield put(actions.getServiceManagerListFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getServiceManagerListFinish())
  }
}

function* addServiceManagerSaga(action: any) {
  try {
    const response: ServiceManagerResponseType = yield call(
      service.addServiceManager,
      action.payload
    )
    yield put(actions.addServiceManagerSuccess(response?.data?.data))
    yield put(actions.addServiceManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.GET_SERVICE_MANAGER_FINISH})
  }
}

function* updateServiceManagerSaga(action: any) {
  try {
    const response: ServiceManagerResponseType = yield call(
      service.updateServiceManager,
      action.payload?.body,
      action?.payload?.id
    )
    yield put(actions.updateServiceManagerSuccess(response?.data?.data))
    yield put(actions.updateServiceManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateServiceManagerFinish())
  }
}

function* getServiceReviewOptionSaga() {
  try {
    const response: ResponseModel = yield call(service.getServiceReviewOption)
    yield put(actions.getServiceReviewOptionSuccess(response?.data?.data))
    yield put(actions.getServiceReviewOptionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.GET_SERVICE_MANAGER_FINISH})
  }
}

function* getServicePopularity() {
  try {
    const response: ResponseModel = yield call(service.getServicePopularity)
    yield put(actions.getServicePopularitySuccess(response?.data?.data))
    yield put(actions.getServicePopularityFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getServicePopularityFinish())
  }
}

function* getServiceMediaType() {
  try {
    const response: ResponseModel = yield call(service.getMediaType)
    yield put(actions.getServiceMediaTypeSuccess(response?.data?.data))
    yield put(actions.getServiceMediaTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getServiceMediaTypeFinish())
  }
}

function* getServicesLeadForm() {
  try {
    const response: ResponseModel = yield call(service.getServicesLeadForm)
    yield put(actions.getServicesLeadFormSuccess(response?.data?.data))
    yield put(actions.getServicesLeadFormFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getServicesLeadFormFinish())
  }
}

function* getServicesFeaturesOption() {
  try {
    const response: ResponseModel = yield call(service.getServicesFeaturesOption)
    yield put(actions.getServicesFeaturesOptionSuccess(response?.data?.data))
    yield put(actions.getServicesFeaturesOptionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getServicesFeaturesOptionFinish())
  }
}

function* getFaqOptionSaga() {
  try {
    const response: ResponseModel = yield call(service.getFaqOption)
    yield put(actions.getServiceFaqOptionSuccess(response?.data?.data))
    yield put(actions.getServiceFaqOptionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getServiceFaqOptionFinish())
  }
}

function* getServiceDocumentOptionSaga() {
  try {
    const response: ResponseModel = yield call(service.getServiceDocumentOption)
    yield put(actions.getServiceDocumentOptionSuccess(response?.data?.data))
    yield put(actions.getServiceDocumentOptionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getServiceDocumentOptionFinish())
  }
}

function* getServiceApplyNowOption() {
  try {
    const response: ResponseModel = yield call(service.getServiceApplyNowOption)
    yield put(actions.getServiceApplyNowOptionSuccess(response?.data?.data))
    yield put(actions.getServiceApplyNowOptionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getServiceApplyNowOptionFinish())
  }
}

function* getServiceRelatedOption() {
  try {
    const response: ResponseModel = yield call(service.getServiceRelatedOption)
    yield put(actions.getServiceRelatedOptionSuccess(response?.data?.data))
    yield put(actions.getServiceRelatedOptionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getServiceRelatedOptionFinish())
  }
}

function* deleteServiceManager(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteServiceManager, body)
    yield put(actions.deleteServiceManagerSuccess(response?.data?.data))
    yield put(actions.deleteServiceManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteServiceManagerFinish())
  }
}

function* enableServiceManager(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.enableServiceManager, body)
    yield put(actions.enableServiceManagerSuccess(response?.data?.data))
    yield put(actions.enableServiceManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableServiceManagerFinish())
  }
}

function* disableServiceManager(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.disableServiceManager, body)
    yield put(actions.disableServiceManagerSuccess(response?.data?.data))
    yield put(actions.disableServiceManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.disableServiceManagerFinish())
  }
}

function* sortServiceManager(action: SortServiceManagerActionModel) {
  try {
    const body: SortServiceManagerModel = action.payload
    const response: ResponseModel = yield call(service.sortServiceManager, body)

    yield put({
      type: actionTypes.SORT_SERVICE_MANAGER_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_SERVICE_MANAGER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_SERVICE_MANAGER_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_SERVICE_MANAGER_START, getServiceManagerSaga)
  yield takeLatest(actionTypes.GET_SERVICE_MANAGER_LIST_START, getServiceManagerListSaga)
  yield takeLatest(actionTypes.ADD_SERVICE_MANAGER_START, addServiceManagerSaga)
  yield takeLatest(actionTypes.UPDATE_SERVICE_MANAGER_START, updateServiceManagerSaga)
  yield takeLatest(actionTypes.GET_SERVICE_REVIEW_OPTIONS_START, getServiceReviewOptionSaga)
  yield takeLatest(actionTypes.GET_SERVICE_POPULARITY_START, getServicePopularity)
  yield takeLatest(actionTypes.GET_SERVICES_LEAD_FORM_START, getServicesLeadForm)
  yield takeLatest(actionTypes.GET_SERVICES_MEDIA_TYPE_START, getServiceMediaType)
  yield takeLatest(actionTypes.GET_SERVICES_FEATURES_OPTION_START, getServicesFeaturesOption)
  yield takeLatest(actionTypes.GET_SERVICE_DOCUMENT_OPTION_START, getServiceDocumentOptionSaga)

  yield takeLatest(actionTypes.GET_SERVICE_FAQ_OPTION_START, getFaqOptionSaga)
  yield takeLatest(actionTypes.GET_SERVICE_APPLY_NOW_OPTION_START, getServiceApplyNowOption)
  yield takeLatest(actionTypes.GET_SERVICE_RELATED_OPTION_START, getServiceRelatedOption)
  yield takeLatest(actionTypes.DELETE_SERVICE_MANAGER_START, deleteServiceManager)
  yield takeLatest(actionTypes.ENABLE_SERVICE_MANAGER_START, enableServiceManager)
  yield takeLatest(actionTypes.DISABLE_SERVICE_MANAGER_START, disableServiceManager)
  yield takeLatest(actionTypes.SORT_SERVICE_MANAGER_START, sortServiceManager)
}
