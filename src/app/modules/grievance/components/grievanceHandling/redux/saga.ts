import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ParamsModel} from 'src/app/modules/common/Model'

function* getGrievanceSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getGrievance, params)
    yield put(actions.getGrievanceSuccess(response?.data?.data))
    yield put(actions.getGrievanceFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getGrievanceFinish())
  }
}

//Get branchless file
function* exportGrievanceFileSaga(action: ActionModel) {
  try {
    const fileName: any = action.payload.fileName
    const params: any = action.payload.params
    const response: ResponseModel = yield call(service.exportGrievanceFile, fileName, params)
    const responseData: any = response?.data
    yield put(actions.exportFileSuccess(responseData))
    yield put(actions.exportFileError())
  } catch (error: any) {
    if (error.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: error.response.data.message})
    }
    yield put(actions.exportFileError())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_GRIEVANCE_START, getGrievanceSaga)
  yield takeLatest(actionTypes.EXPORT_GRIEVANCE_FILE_START, exportGrievanceFileSaga)
}
