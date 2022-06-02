import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ParamsModel} from 'src/app/modules/common/Model'
import {FunctionalAreaModel, SortFunctionalAreaModel, SortFunctionalAreaActionModel} from '../Model'

function* getPositionSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getFunctionalArea, params)
    yield put(actions.getFunctionalAreaSuccess(response?.data?.data))
    yield put(actions.getFunctionalAreaFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getFunctionalAreaFinish())
  }
}

function* addFunctionalAreaSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addFunctionalArea, body)
    yield put(actions.addFunctionalAreaSuccess(response.data?.data))
    yield put(actions.addFunctionalAreaFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addFunctionalAreaFinish())
  }
}

function* enableFunctionalAreaSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableFunctionalArea, selectedUsers)
    yield put(actions.enableFunctionalAreaSuccess(response?.data))
    yield put(actions.enableFunctionalAreaFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableFunctionalAreaFinish())
  }
}

function* disableFunctionalAreaSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableFunctionalArea, selectedUsers)
    yield put(actions.disableFunctionalAreaSuccess(response?.data))
    yield put(actions.disableFunctionalAreaFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.disableFunctionalAreaFinish())
  }
}

function* singleEnableFunctionalAreaSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableFunctionalArea, selectedUsers)
    yield put(actions.singleEnableFunctionalAreaSuccess(response?.data))
    yield put(actions.singleEnableFunctionalAreaFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableFunctionalAreaFinish())
  }
}

function* singleDisableFunctionalAreaSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableFunctionalArea, selectedUsers)
    yield put(actions.singleDisableFunctionalAreaSuccess(response?.data))
    yield put(actions.singleDisableFunctionalAreaFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableFunctionalAreaFinish())
  }
}

function* updateFunctionalAreaSaga(action: ActionModel) {
  try {
    const body: FunctionalAreaModel = action.payload
    const response: ResponseModel = yield call(
      service.updateFunctionalArea,
      body,
      action.payload?.id
    )
    yield put(actions.updateFunctionalAreaSuccess(response.data?.data))
    yield put(actions.updateFunctionalAreaFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateFunctionalAreaFinish())
  }
}

function* deleteFunctionalAreaSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteFunctionalArea, body)

    yield put(actions.deleteFunctionalAreaSuccess(response.data?.data))
    yield put(actions.deleteFunctionalAreaFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteFunctionalAreaFinish())
  }
}

//Get Gallery saga
function* getAllFunctionalAreaSaga(action: ActionModel) {
  try {
    const response: ResponseModel = yield call(service.getAllFunctionalArea)
    const data: any = response?.data
    yield put(actions.getAllFunctionalAreaSuccess(data))
  } catch (error: any) {
    if (error.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: error.response.data.message})
    }
    yield put(actions.getAllFunctionalAreaError())
  }
}

function* sortFunctionalArea(action: SortFunctionalAreaActionModel) {
  try {
    const body: SortFunctionalAreaModel = action.payload
    const response: ResponseModel = yield call(service.sortFunctionalArea, body)

    yield put({
      type: actionTypes.SORT_FUNCTIONALAREA_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_FUNCTIONALAREA_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_FUNCTIONALAREA_FINISH})
  }
}
export function* saga() {
  yield takeLatest(actionTypes.GET_FUNCTIONALAREA_START, getAllFunctionalAreaSaga)
  yield takeLatest(actionTypes.ADD_FUNCTIONALAREA_START, addFunctionalAreaSaga)
  yield takeLatest(actionTypes.UPDATE_FUNCTIONALAREA_START, updateFunctionalAreaSaga)
  yield takeLatest(actionTypes.DELETE_FUNCTIONALAREA_START, deleteFunctionalAreaSaga)
  yield takeLatest(actionTypes.ENABLE_FUNCTIONALAREA_REQUEST, enableFunctionalAreaSaga)
  yield takeLatest(actionTypes.DISABLE_FUNCTIONALAREA_REQUEST, disableFunctionalAreaSaga)
  yield takeLatest(
    actionTypes.SINGLE_ACTIVATE_FUNCTIONALAREA_REQUEST,
    singleEnableFunctionalAreaSaga
  )
  yield takeLatest(
    actionTypes.SINGLE_DEACTIVATE_FUNCTIONALAREA_REQUEST,
    singleDisableFunctionalAreaSaga
  )
  yield takeLatest(actionTypes.GET_ALL_FUNCTIONALAREA_START, getAllFunctionalAreaSaga)
  yield takeLatest(actionTypes.SORT_FUNCTIONALAREA_START, sortFunctionalArea)
}
