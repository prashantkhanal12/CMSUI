import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ParamsModel} from 'src/app/modules/common/Model'
import {GalleryModel, SortGalleryActionModel, SortGalleryModel} from '../Model'

function* getGallerySaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getGallery, params)
    yield put(actions.getGallerySuccess(response?.data?.data))
    yield put(actions.getGalleryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getGalleryFinish())
  }
}

function* addGallerySaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addGallery, body)
    yield put(actions.addGallerySuccess(response.data?.data))
    yield put(actions.addGalleryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addGalleryFinish())
  }
}

function* enableGallerySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableGallery, selectedUsers)
    yield put(actions.enableGallerySuccess(response?.data))
    yield put(actions.enableGalleryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableGalleryFinish())
  }
}

function* disableGallerySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableGallery, selectedUsers)
    yield put(actions.disableGallerySuccess(response?.data))
    yield put(actions.disableGalleryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.disableGalleryFinish())
  }
}

function* singleEnableGallerySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableGallery, selectedUsers)
    yield put(actions.singleEnableGallerySuccess(response?.data))
    yield put(actions.singleEnableGalleryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableGalleryFinish())
  }
}

function* singleDisableGallerySaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableGallery, selectedUsers)
    yield put(actions.singleDisableGallerySuccess(response?.data))
    yield put(actions.singleDisableGalleryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableGalleryFinish())
  }
}

function* updateGallerySaga(action: ActionModel) {
  try {
    const body: GalleryModel = action.payload
    const response: ResponseModel = yield call(service.updateGallery, body, action.payload?.id)
    yield put(actions.updateGallerySuccess(response.data?.data))
    yield put(actions.updateGalleryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateGalleryFinish())
  }
}

function* deleteGallerySaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteGallery, body)

    yield put(actions.deleteGallerySuccess(response.data?.data))
    yield put(actions.deleteGalleryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteGalleryFinish())
  }
}

//Get Gallery saga
function* getAllGallerySaga(action: ActionModel) {
  try {
    const response: ResponseModel = yield call(service.getAllGallery)
    const data: any = response?.data
    yield put(actions.getAllGallerySuccess(data))
  } catch (error: any) {
    if (error.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: error.response.data.message})
    }
    yield put(actions.getAllGalleryError())
  }
}

function* sortGallery(action: SortGalleryActionModel) {
  try {
    const body: SortGalleryModel = action.payload
    const response: ResponseModel = yield call(service.sortGallery, body)

    yield put({
      type: actionTypes.SORT_GALLERY_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_GALLERY_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_GALLERY_FINISH})
  }
}
export function* saga() {
  yield takeLatest(actionTypes.GET_GALLERY_START, getGallerySaga)
  /*   yield takeLatest(actionTypes.GET_GALLERY_START, getAllGallerySaga) */
  yield takeLatest(actionTypes.ADD_GALLERY_START, addGallerySaga)
  yield takeLatest(actionTypes.UPDATE_GALLERY_START, updateGallerySaga)
  yield takeLatest(actionTypes.DELETE_GALLERY_START, deleteGallerySaga)
  yield takeLatest(actionTypes.ENABLE_GALLERY_REQUEST, enableGallerySaga)
  yield takeLatest(actionTypes.DISABLE_GALLERY_REQUEST, disableGallerySaga)
  yield takeLatest(actionTypes.SINGLE_ENABLE_GALLERY_REQUEST, singleEnableGallerySaga)
  yield takeLatest(actionTypes.SINGLE_DISABLE_GALLERY_REQUEST, singleDisableGallerySaga)
  yield takeLatest(actionTypes.GET_ALL_GALLERY_START, getAllGallerySaga)
  yield takeLatest(actionTypes.SORT_GALLERY_START, sortGallery)
}
