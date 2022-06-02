import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ParamsModel} from 'src/app/modules/common/Model'
import {PositionModel, SortPositionActionModel, SortPositionModel} from '../Model'

function* getPositionSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getPosition, params)
    yield put(actions.getPositionSuccess(response?.data?.data))
    yield put(actions.getPositionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getPositionFinish())
  }
}

function* addPositionSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addPosition, body)
    yield put(actions.addPositionSuccess(response.data?.data))
    yield put(actions.addPositionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addPositionFinish())
  }
}

function* enablePositionSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enablePosition, selectedUsers)
    yield put(actions.enablePositionSuccess(response?.data))
    yield put(actions.enablePositionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enablePositionFinish())
  }
}

function* disablePositionSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disablePosition, selectedUsers)
    yield put(actions.disablePositionSuccess(response?.data))
    yield put(actions.disablePositionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.disablePositionFinish())
  }
}

function* singleEnablePositionSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnablePosition, selectedUsers)
    yield put(actions.singleEnablePositionSuccess(response?.data))
    yield put(actions.singleEnablePositionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnablePositionFinish())
  }
}

function* singleDisablePositionSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisablePosition, selectedUsers)
    yield put(actions.singleDisablePositionSuccess(response?.data))
    yield put(actions.singleDisablePositionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisablePositionFinish())
  }
}

function* updatePositionSaga(action: ActionModel) {
  try {
    const body: PositionModel = action.payload
    const response: ResponseModel = yield call(service.updatePosition, body, action.payload?.id)
    yield put(actions.updatePositionSuccess(response.data?.data))
    yield put(actions.updatePositionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updatePositionFinish())
  }
}

function* deletePositionSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deletePosition, body)

    yield put(actions.deletePositionSuccess(response.data?.data))
    yield put(actions.deletePositionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deletePositionFinish())
  }
}

//Get Gallery saga
function* getAllPositionSaga(action: ActionModel) {
  try {
    const response: ResponseModel = yield call(service.getAllPosition)
    const data: any = response?.data
    yield put(actions.getAllPositionSuccess(data))
  } catch (error: any) {
    if (error.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: error.response.data.message})
    }
    yield put(actions.getAllPositionError())
  }
}

function* sortPosition(action: SortPositionActionModel) {
  try {
    const body: SortPositionModel = action.payload
    const response: ResponseModel = yield call(service.sortPosition, body)

    yield put({
      type: actionTypes.SORT_POSITION_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_POSITION_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_POSITION_FINISH})
  }
}
export function* saga() {
  yield takeLatest(actionTypes.GET_POSITION_START, getPositionSaga)
  yield takeLatest(actionTypes.ADD_POSITION_START, addPositionSaga)
  yield takeLatest(actionTypes.UPDATE_POSITION_START, updatePositionSaga)
  yield takeLatest(actionTypes.DELETE_POSITION_START, deletePositionSaga)
  yield takeLatest(actionTypes.ENABLE_POSITION_REQUEST, enablePositionSaga)
  yield takeLatest(actionTypes.DISABLE_POSITION_REQUEST, disablePositionSaga)
  yield takeLatest(actionTypes.SINGLE_ACTIVATE_POSITION_REQUEST, singleEnablePositionSaga)
  yield takeLatest(actionTypes.SINGLE_DEACTIVATE_POSITION_REQUEST, singleDisablePositionSaga)
  yield takeLatest(actionTypes.GET_ALL_POSITION_START, getAllPositionSaga)
  yield takeLatest(actionTypes.SORT_POSITION_START, sortPosition)
}
