import { call, put, takeLatest, delay } from 'redux-saga/effects'
import { actions } from './action'
import { actionTypes } from './constants'
import { ResponseModel } from 'src/cms/helpers/Models/ResponseModel'
import { service } from './service'
import { ActionModel } from 'src/cms/helpers/Models/ActionModel'
import { globalActionTypes } from 'src/app/modules/errors/redux/constants'
import { MoveCopyBodyType } from '../Model'

function* getMediaListSaga(action: ActionModel) {
  try {
    const params: any = action.payload?.params
    yield delay(500)
    const response: ResponseModel = yield call(service.getMediaList, params)
    const data: any = response?.data?.data
    yield put(actions.getMediaListSuccess(data))
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put(actions.getMediaListFinish())
  }
}

function* getMediaHierarchySaga(action: ActionModel) {
  try {
    yield delay(500)
    const response: ResponseModel = yield call(service.getMediaHierarchy)
    const data: any = response?.data?.data
    yield put(actions.getMediaHierarchySuccess(data))
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put(actions.getMediaHierarchyFinish())
  }
}

function* addNewFolder(action: ActionModel) {
  try {
    yield delay(500)
    const body: any = action.payload
    const response: ResponseModel = yield call(service.addNewFolder, body)
    yield put(actions.addNewFolderSuccess(response.data?.data))
    yield put(actions.addNewFolderFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put(actions.addNewFolderFinish())
  }
}

function* addFiles(action: ActionModel) {
  try {
    yield delay(500)
    const body: any = action.payload?.data
    const options: any = action.payload?.options
    const response: ResponseModel = yield call(service.addFiles, body, options)
    yield put(actions.addFilesSuccess(response.data?.data))
    yield put(actions.addFilesFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put(actions.addFilesFinish(err.response.data.message))
  }
}

function* renameFileFolder(action: ActionModel) {
  try {
    yield delay(500)
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(service.renameFileFolder, body)
    yield put(actions.renameFileFolderSuccess(response.data?.data))
    yield put(actions.renameFileFolderFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put(actions.renameFileFolderFinish(err.response.data.message))
  }
}

function* deleteFolderFilesSaga(action: ActionModel) {
  try {
    yield delay(500)
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteFolderFiles, body)
    yield put(actions.deleteFolderFilesSuccess(response.data?.data))
    yield put(actions.deleteFolderFilesFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({ type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message })
    }
    yield put(actions.deleteFolderFilesFinish())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_MEDIA_LIST_START, getMediaListSaga)
  yield takeLatest(actionTypes.GET_MEDIA_HIERARCHY_START, getMediaHierarchySaga)
  yield takeLatest(actionTypes.ADD_NEW_FOLDER_START, addNewFolder)
  yield takeLatest(actionTypes.DELETE_FOLDER_FILES_START, deleteFolderFilesSaga)
  yield takeLatest(actionTypes.ADD_FILES_START, addFiles)
  yield takeLatest(actionTypes.RENAME_FILE_FOLDER_START, renameFileFolder)
}
