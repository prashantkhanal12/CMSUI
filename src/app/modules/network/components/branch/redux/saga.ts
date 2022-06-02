import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {OptionModel} from '../Model'
import {BranchModel} from '../Model/BranchModel'
import {ParamsModel} from 'src/app/modules/common/Model'
import {IBranchState} from './reducer'

function* getBranchCategory() {
  try {
    const response: ResponseModel = yield call(service.getBranchCategory)
    yield put(actions.getBranchCategorySuccess(response?.data?.data))
    yield put(actions.getBranchCategoryFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getBranchCategoryFinish())
  }
}

function* getExtendedHoursSaga() {
  try {
    const response: ResponseModel = yield call(service.getExtendedHours)
    yield put(actions.getExtendedHourSuccess(response?.data?.data))
    yield put(actions.getExtendedHourFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getExtendedHourFinish())
  }
}

function* getBranchDataSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getBranchData, params)
    yield put(actions.getBranchDataSuccess(response?.data?.data))
    yield put(actions.getBranchDataFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getBranchDataFinish())
  }
}

function* getAllBranchDataSaga() {
  try {
    const response: ResponseModel = yield call(service.getAllBranchData)
    yield put(actions.getAllBranchListSuccess(response?.data?.data))
    yield put(actions.getAllBranchListFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getBranchDataFinish())
  }
}

function* addBranchSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addBranch, body)
    yield put(actions.addBranchSuccess(response.data?.data))
    yield put(actions.addBranchFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addBranchFinish())
  }
}

function* enableBranchSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableBranch, selectedUsers)
    yield put(actions.enableBranchSuccess(response?.data))
    yield put(actions.enableBranchFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableBranchFinish())
  }
}

function* disableBranchSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableBranch, selectedUsers)
    yield put(actions.disableBranchSuccess(response?.data))
    yield put(actions.disableBranchFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableBranchFinish())
  }
}

function* singleEnableBranchSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableBranch, selectedUsers)
    yield put(actions.singleEnableBranchSuccess(response?.data))
    yield put(actions.singleEnableBranchFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableBranchFinish())
  }
}

function* singleDisableBranchSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableBranch, selectedUsers)
    yield put(actions.singleDisableBranchSuccess(response?.data))
    yield put(actions.singleDisableBranchFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableBranchFinish())
  }
}

function* importBranchSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.importBranch, body)
    yield put(actions.importBranchSuccess(response.data?.data))
    yield put(actions.importBranchFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.importBranchFinish())
  }
}

function* updateBranchSaga(action: ActionModel) {
  try {
    const body: BranchModel = action.payload
    const response: ResponseModel = yield call(service.updateBranch, body, action.payload?.id)
    yield put(actions.updateBranchSuccess(response.data?.data))
    yield put(actions.updateBranchFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateBranchFinish())
  }
}

function* deleteBranchSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteBranch, body)
    yield put(actions.deleteBranchSuccess(response.data?.data))
    yield put(actions.deleteBranchFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteBranchFinish())
  }
}

//Get branchless file
function* exportFileSaga(action: ActionModel) {
  try {
    const fileName: any = action.payload.fileName
    yield delay(500)
    const data: any = action.payload.params
    const response: ResponseModel = yield call(service.exportFile, fileName, data)
    const responseData: any = response?.data
    yield put(actions.exportFileSuccess(responseData))
    yield put(actions.exportFileError())
  } catch (error: any) {
    yield put(actions.exportFileError())
  }
}

function* exportTemplateFileSaga() {
  try {
    const response: ResponseModel = yield call(service.exportTemplateFile)
    const responseData: any = response?.data
    yield put(actions.exportTemplateFileSuccess(responseData))
    yield put(actions.exportTemplateFileFinish())
  } catch (error: any) {
    if (error.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: error.response.data.message})
    }
    yield put(actions.exportTemplateFileFinish())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_BRANCH_CATEGORY_START, getBranchCategory)
  yield takeLatest(actionTypes.GET_EXTENDED_HOURS_START, getExtendedHoursSaga)
  yield takeLatest(actionTypes.GET_BRANCH_DATA_START, getBranchDataSaga)
  yield takeLatest(actionTypes.GET_ALL_BRANCH_DATA_START, getAllBranchDataSaga)
  yield takeLatest(actionTypes.ADD_BRANCH_START, addBranchSaga)
  yield takeLatest(actionTypes.UPDATE_BRANCH_START, updateBranchSaga)
  yield takeLatest(actionTypes.DELETE_BRANCH_START, deleteBranchSaga)
  yield takeLatest(actionTypes.ENABLE_BRANCH_REQUEST, enableBranchSaga)
  yield takeLatest(actionTypes.DISABLE_BRANCH_REQUEST, disableBranchSaga)
  yield takeLatest(actionTypes.SINGLE_ENABLE_BRANCH_REQUEST, singleEnableBranchSaga)
  yield takeLatest(actionTypes.SINGLE_DISABLE_BRANCH_REQUEST, singleDisableBranchSaga)
  yield takeLatest(actionTypes.EXPORT_BRANCH_FILE_START, exportFileSaga)
  yield takeLatest(actionTypes.EXPORT_BRANCH_TEMPLATE_FILE_START, exportTemplateFileSaga)
  yield takeLatest(actionTypes.IMPORT_BRANCH_START, importBranchSaga)
}
