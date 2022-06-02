import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'

function* getUpdateNotesSaga() {
  try {
    const response: ResponseModel = yield call(service.getUpdateNotes)
    const data: any = response?.data
    yield put(actions.getUpdateNotesSuccess(data))
  } catch (error: any) {
    if (error.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: error.response.data.message})
    }
    yield put(actions.getUpdateNotesError(error))
  }
}

function* getUpdateNotesWithDataSaga(action: ActionModel) {
  try {
    const params: any = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getUpdateNotesWithData, params)
    const data: any = response?.data
    yield put(actions.getUpdateNotesWithDataSuccess(data))
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getUpdateNotesWithDataFinish())
  }
}

//Create Update Notes Saga
function* createUpdateNotesSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.addUpdateNotes, body)
    yield put({type: actionTypes.ADD_UPDATE_NOTES_SUCCESS, payload: response.data})
    yield put({type: actionTypes.ADD_UPDATE_NOTES_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.ADD_UPDATE_NOTES_FINISH})
  }
}

//Update Update Notes
function* updateUpdateNotesSaga(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(service.updateUpdateNotes, body, action.payload?.id)
    yield put({type: actionTypes.UPDATE_UPDATE_NOTES_SUCCESS, payload: response.data})
    yield put({type: actionTypes.UPDATE_UPDATE_NOTES_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.UPDATE_UPDATE_NOTES_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_UPDATE_NOTES_START, getUpdateNotesSaga)
  yield takeLatest(actionTypes.GET_UPDATE_NOTES_WITH_DATA_START, getUpdateNotesWithDataSaga)
  yield takeLatest(actionTypes.ADD_UPDATE_NOTES_REQUEST, createUpdateNotesSaga)
  yield takeLatest(actionTypes.UPDATE_UPDATE_NOTES_START, updateUpdateNotesSaga)
}
