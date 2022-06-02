import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ContactPersonModel} from '../Model/ContactPersonModel'
import {ParamsModel} from 'src/app/modules/common/Model'
import {SortContactPersonActionModel, SortContactPersonModel} from '../Model'

function* getContactPersonSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getContactPerson, params)
    yield put(actions.getContactPersonSuccess(response?.data?.data))
    yield put(actions.getContactPersonFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getContactPersonFinish())
  }
}

function* addContactPersonSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addContactPerson, body)
    yield put(actions.addContactPersonSuccess(response.data?.data))
    yield put(actions.addContactPersonFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addContactPersonFinish())
  }
}

function* updateContactPersonSaga(action: ActionModel) {
  try {
    const body: any = action.payload.data
    const response: ResponseModel = yield call(
      service.updateContactPerson,
      body,
      action?.payload?.id
    )
    yield put(actions.updateContactPersonSuccess(response.data?.data))
    yield put(actions.updateContactPersonFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateContactPersonFinish())
  }
}

function* deleteContactPersonSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteContactPerson, body)
    yield put(actions.deleteContactPersonSuccess(response.data?.data))
    yield put(actions.deleteContactPersonFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteContactPersonFinish())
  }
}

function* sortContactPerson(action: SortContactPersonActionModel) {
  try {
    const body: SortContactPersonModel = action.payload
    const response: ResponseModel = yield call(service.sortContactPerson, body)

    yield put({
      type: actionTypes.SORT_CONTACT_PERSON_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_CONTACT_PERSON_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_CONTACT_PERSON_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_CONTACT_PERSON_START, getContactPersonSaga)
  yield takeLatest(actionTypes.ADD_CONTACT_PERSON_START, addContactPersonSaga)
  yield takeLatest(actionTypes.UPDATE_CONTACT_PERSON_START, updateContactPersonSaga)
  yield takeLatest(actionTypes.DELETE_CONTACT_PERSON_START, deleteContactPersonSaga)
  yield takeLatest(actionTypes.SORT_CONTACT_PERSON_START, sortContactPerson)
}
