import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ParamsModel} from 'src/app/modules/common/Model'
import {BranchManagerModel} from '../Model/BranchManagerModel'

function* getBranchManagerDataSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getBranchManagerData, params)
    yield put(actions.getBranchManagerDataSuccess(response?.data?.data))
    yield put(actions.getBranchManagerDataFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getBranchManagerDataFinish())
  }
}

function* addBranchManagerSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addBranchManager, body)
    yield put(actions.addBranchManagerSuccess(response.data?.data))
    yield put(actions.addBranchManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addBranchManagerFinish())
  }
}

function* enableBranchManagerSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableBranchManager, selectedUsers)
    yield put(actions.enableBranchManagerSuccess(response?.data))
    yield put(actions.enableBranchManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableBranchManagerFinish())
  }
}

function* disableBranchManagerSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableBranchManager, selectedUsers)
    yield put(actions.disableBranchManagerSuccess(response?.data))
    yield put(actions.disableBranchManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableBranchManagerFinish())
  }
}

function* singleEnableBranchManagerSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableBranchManager, selectedUsers)
    yield put(actions.singleEnableBranchManagerSuccess(response?.data))
    yield put(actions.singleEnableBranchManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableBranchManagerFinish())
  }
}

function* singleDisableBranchManagerSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableBranchManager, selectedUsers)
    yield put(actions.singleDisableBranchManagerSuccess(response?.data))
    yield put(actions.singleDisableBranchManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableBranchManagerFinish())
  }
}

function* importBranchManagerSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.importBranchManager, body)
    yield put(actions.importBranchManagerSuccess(response.data?.data))
    yield put(actions.importBranchManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.importBranchManagerFinish())
  }
}

function* updateBranchManagerSaga(action: ActionModel) {
  try {
    const body: BranchManagerModel = action.payload
    const response: ResponseModel = yield call(
      service.updateBranchManager,
      body,
      action.payload?.id
    )
    yield put(actions.updateBranchManagerSuccess(response.data?.data))
    yield put(actions.updateBranchManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateBranchManagerFinish())
  }
}

function* deleteBranchManagerSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteBranchManager, body)
    yield put(actions.deleteBranchManagerSuccess(response.data?.data))
    yield put(actions.deleteBranchManagerFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteBranchManagerFinish())
  }
}

//Get BranchManagerless file
function* exportFileSaga(action: ActionModel) {
  try {
    const fileName: any = action.payload.fileName
    yield delay(500)
    const data: any = action.payload.params
    const response: ResponseModel = yield call(service.exportFile, fileName, data)
    const responseData: any = response?.data
    yield put(actions.exportFileSuccess(responseData))
    yield put(actions.exportFileError())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.exportFileError())
  }
}

function* exportTemplateFileSaga() {
  try {
    const response: ResponseModel = yield call(service.exportTemplateFile)
    const responseData: any = response?.data
    yield put(actions.exportTemplateFileSuccess(responseData))
    yield put(actions.exportTemplateFileError())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.exportTemplateFileError())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_BRANCH_MANAGER_DATA_START, getBranchManagerDataSaga)
  yield takeLatest(actionTypes.ADD_BRANCH_MANAGER_START, addBranchManagerSaga)
  yield takeLatest(actionTypes.UPDATE_BRANCH_MANAGER_START, updateBranchManagerSaga)
  yield takeLatest(actionTypes.DELETE_BRANCH_MANAGER_START, deleteBranchManagerSaga)
  yield takeLatest(actionTypes.ENABLE_BRANCH_MANAGER_REQUEST, enableBranchManagerSaga)
  yield takeLatest(actionTypes.DISABLE_BRANCH_MANAGER_REQUEST, disableBranchManagerSaga)
  yield takeLatest(actionTypes.SINGLE_ENABLE_BRANCH_MANAGER_REQUEST, singleEnableBranchManagerSaga)
  yield takeLatest(
    actionTypes.SINGLE_DISABLE_BRANCH_MANAGER_REQUEST,
    singleDisableBranchManagerSaga
  )
  yield takeLatest(actionTypes.EXPORT_BRANCH_MANAGER_FILE_START, exportFileSaga)
  yield takeLatest(actionTypes.EXPORT_BRANCH_MANAGER_TEMPLATE_FILE_START, exportTemplateFileSaga)
  yield takeLatest(actionTypes.IMPORT_BRANCH_MANAGER_START, importBranchManagerSaga)
}
