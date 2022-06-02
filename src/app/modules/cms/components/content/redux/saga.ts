import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from '../../../../../../cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ContentModel} from '../Model/ContentModal'
import {ParamsModel} from 'src/app/modules/common/Model'

function* getApplyNowSectionSaga() {
  //GET APPLY NOW SECTION SAGA
  try {
    const response: ResponseModel = yield call(service.getApplyNowSection)
    yield put(actions.getApplyNowSectionSuccess(response?.data?.data))
  } catch (err: any) {
    yield put(actions.getApplyNowSectionError(err))
  }
}

function* getConstantBannerSaga() {
  //GET BANNER SAGA
  try {
    const response: ResponseModel = yield call(service.getConstantBanner)
    yield put(actions.getConstantBannerSuccess(response?.data?.data))
  } catch (err: any) {
    yield put(actions.getConstantBannerError(err))
  }
}

function* getCollapsibleSectionSaga() {
  //GET COLLAPSIBLE SECTION SAGA
  try {
    const response: ResponseModel = yield call(service.getCollapsibleSection)
    yield put(actions.getCollapsibleSectionSuccess(response?.data?.data))
  } catch (err: any) {
    yield put(actions.getCollapsibleSectionError(err))
  }
}

function* getFaqOptionSaga() {
  //GET FAQ OPTION SAGA
  try {
    const response: ResponseModel = yield call(service.getFaqOption)
    yield put(actions.getFaqOptionSuccess(response?.data?.data))
  } catch (err: any) {
    yield put(actions.getFaqOptionError(err))
  }
}

function* getHelpSectionSaga() {
  //GET HELP SECTION SAGA
  try {
    const response: ResponseModel = yield call(service.getHelpSection)
    yield put(actions.getHelpSectionSuccess(response?.data?.data))
  } catch (err: any) {
    yield put(actions.getHelpSectionError(err))
  }
}

function* getLeadFormSaga() {
  //GET LEAD FORM SAGA
  try {
    const response: ResponseModel = yield call(service.getLeadForm)
    yield put(actions.getLeadFormSuccess(response?.data?.data))
  } catch (err: any) {
    yield put(actions.getLeadFormError(err))
  }
}

function* getPageHeaderSaga() {
  //GET PAGE HEADER SAGA
  try {
    const response: ResponseModel = yield call(service.getPageHeader)
    yield put(actions.getPageHeaderSuccess(response?.data?.data))
  } catch (err: any) {
    yield put(actions.getPageHeaderError(err))
  }
}

function* getProductOptionSaga() {
  //GET PRODUCT OPTION SAGA
  try {
    const response: ResponseModel = yield call(service.getProductOption)
    yield put(actions.getProductOptionSuccess(response?.data?.data))
  } catch (err: any) {
    yield put(actions.getProductOptionError(err))
  }
}

function* getReviewAndRatingSaga() {
  //GET REVIEW AND RATING SAGA
  try {
    const response: ResponseModel = yield call(service.getReviewAndRating)
    yield put(actions.getReviewAndRatingSuccess(response?.data?.data))
  } catch (err: any) {
    yield put(actions.getReviewAndRatingError(err))
  }
}

function* getContentDataSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload

    yield delay(500)
    const response: ResponseModel = yield call(service.getContentData, params)
    yield put(actions.getContentDataSuccess(response?.data?.data))
    yield put(actions.getContentDataFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getContentDataFinish())
  }
}

function* getContentDataByCategoryIdSaga(action: ActionModel) {
  try {
    const id = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getContentDataByCategoryId, id)
    yield put(actions.getContentDataByCategoryIdSuccess(response?.data?.data))
    yield put(actions.getContentDataByCategoryIdFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getContentDataByCategoryIdFinish())
  }
}

function* addContentSaga(action: ActionModel) {
  //GET MENU LINK TYPE SAGA
  try {
    const body: ContentModel = action.payload
    const response: ResponseModel = yield call(service.addContent, body)
    yield put(actions.addContentSuccess(response?.data?.data))
  } catch (err: any) {
    yield put(actions.addContentError(err))
  }
}

function* enableContentSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableContent, selectedUsers)
    yield put(actions.enableContentSuccess(response?.data))
    yield put(actions.enableContentFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableContentFinish())
  }
}

function* disableContentSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableContent, selectedUsers)
    yield put(actions.disableContentSuccess(response?.data))
    yield put(actions.disableContentFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableContentFinish())
  }
}

function* singleEnableContentSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableContent, selectedUsers)
    yield put(actions.singleEnableContentSuccess(response?.data))
    yield put(actions.singleEnableContentFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableContentFinish())
  }
}

function* singleDisableContentSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableContent, selectedUsers)
    yield put(actions.singleDisableContentSuccess(response?.data))
    yield put(actions.singleDisableContentFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableContentFinish())
  }
}

function* updateContentSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.updateContent, body, action.payload?.id)
    yield put(actions.updateContentSuccess(response.data?.data))
    yield put(actions.updateContentFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateContentFinish())
  }
}

function* deleteContentSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteContent, body)
    yield put(actions.deleteContentSuccess(response.data?.data))
    yield put(actions.deleteContentFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteContentFinish())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_APPLY_NOW_SECTION_START, getApplyNowSectionSaga)

  yield takeLatest(actionTypes.GET_CONSTANTBANNER_START, getConstantBannerSaga)
  yield takeLatest(actionTypes.GET_COLLAPSIBLE_SECTION_START, getCollapsibleSectionSaga)
  yield takeLatest(actionTypes.GET_FAQ_OPTION_START, getFaqOptionSaga)
  yield takeLatest(actionTypes.GET_HELP_SECTION_START, getHelpSectionSaga)
  yield takeLatest(actionTypes.GET_LEAD_FORM_START, getLeadFormSaga)
  yield takeLatest(actionTypes.GET_PAGE_HEADER_START, getPageHeaderSaga)
  yield takeLatest(actionTypes.GET_PRODUCT_OPTION_START, getProductOptionSaga)
  yield takeLatest(actionTypes.GET_REVIEW_AND_RATING_START, getReviewAndRatingSaga)
  yield takeLatest(actionTypes.GET_CONTENT_DATA_START, getContentDataSaga)
  yield takeLatest(
    actionTypes.GET_CONTENT_DATA_BY_CATEGORY_ID_START,
    getContentDataByCategoryIdSaga
  )
  yield takeLatest(actionTypes.ADD_CONTENT_START, addContentSaga)
  yield takeLatest(actionTypes.UPDATE_CONTENT_DATA_START, updateContentSaga)
  yield takeLatest(actionTypes.DELETE_CONTENT_DATA_START, deleteContentSaga)
  yield takeLatest(actionTypes.ENABLE_CONTENT_DATA_REQUEST, enableContentSaga)
  yield takeLatest(actionTypes.DISABLE_CONTENT_DATA_REQUEST, disableContentSaga)
  yield takeLatest(actionTypes.SINGLE_ENABLE_CONTENT_DATA_REQUEST, singleEnableContentSaga)
  yield takeLatest(actionTypes.SINGLE_DISABLE_CONTENT_DATA_REQUEST, singleDisableContentSaga)
}
