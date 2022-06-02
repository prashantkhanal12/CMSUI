import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {SortMemberActionModel, SortMemberModel} from '../Model'
import {MemberModel} from '../Model/MemberModel'
import {ParamsModel} from 'src/app/modules/common/Model'

function* getMemberSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getMember, params)
    yield put(actions.getMemberSuccess(response?.data?.data))
    yield put(actions.getMemberFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getMemberFinish())
  }
}

function* getAllMemberSaga() {
  try {
    const response: ResponseModel = yield call(service.getAllMember)
    yield put(actions.getAllMemberSuccess(response?.data?.data))
    yield put(actions.getAllMemberFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllMemberFinish())
  }
}

function* getFeaturedMemberSaga() {
  try {
    const response: ResponseModel = yield call(service.getFeaturedMember)
    yield put(actions.getFeaturedMemberSuccess(response?.data?.data))
    yield put(actions.getFeaturedMemberFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getFeaturedMemberFinish())
  }
}

function* addMemberSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addMember, body)
    yield put(actions.addMemberSuccess(response.data?.data))
    yield put(actions.addMemberFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addMemberFinish())
  }
}

function* enableMemberSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableMember, selectedUsers)
    yield put(actions.enableMemberSuccess(response?.data))
    yield put(actions.enableMemberFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableMemberFinish())
  }
}

function* disableMemberSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableMember, selectedUsers)
    yield put(actions.disableMemberSuccess(response?.data))
    yield put(actions.disableMemberFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableMemberFinish())
  }
}

function* singleEnableMemberSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableMember, selectedUsers)
    yield put(actions.singleEnableMemberSuccess(response?.data))
    yield put(actions.singleEnableMemberFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableMemberFinish())
  }
}

function* singleDisableMemberSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableMember, selectedUsers)
    yield put(actions.singleDisableMemberSuccess(response?.data))
    yield put(actions.singleDisableMemberFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableMemberFinish())
  }
}

function* updateMemberSaga(action: ActionModel) {
  try {
    const body: MemberModel = action.payload
    const response: ResponseModel = yield call(service.updateMember, body, action.payload?.id)
    yield put(actions.updateMemberSuccess(response.data?.data))
    yield put(actions.updateMemberFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateMemberFinish())
  }
}

function* deleteMemberSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteMember, body)
    yield put(actions.deleteMemberSuccess(response.data?.data))
    yield put(actions.deleteMemberFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteMemberFinish())
  }
}

function* sortMember(action: SortMemberActionModel) {
  try {
    const body: SortMemberModel = action.payload
    const response: ResponseModel = yield call(service.sortMember, body)

    yield put({
      type: actionTypes.SORT_MEMBER_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_MEMBER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_MEMBER_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_MEMBER_START, getMemberSaga)
  yield takeLatest(actionTypes.GET_ALL_MEMBER_START, getAllMemberSaga)
  yield takeLatest(actionTypes.GET_FEATURED_MEMBER_START, getFeaturedMemberSaga)
  yield takeLatest(actionTypes.ADD_MEMBER_START, addMemberSaga)
  yield takeLatest(actionTypes.UPDATE_MEMBER_START, updateMemberSaga)
  yield takeLatest(actionTypes.DELETE_MEMBER_START, deleteMemberSaga)
  yield takeLatest(actionTypes.ENABLE_MEMBER_REQUEST, enableMemberSaga)
  yield takeLatest(actionTypes.DISABLE_MEMBER_REQUEST, disableMemberSaga)
  yield takeLatest(actionTypes.SINGLE_ENABLE_MEMBER_REQUEST, singleEnableMemberSaga)
  yield takeLatest(actionTypes.SINGLE_DISABLE_MEMBER_REQUEST, singleDisableMemberSaga)
  yield takeLatest(actionTypes.SORT_MEMBER_START, sortMember)
}
