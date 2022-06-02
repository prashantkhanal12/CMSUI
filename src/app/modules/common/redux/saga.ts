import {call, put, takeLatest} from 'redux-saga/effects'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {action} from '..'
import {globalActionTypes} from '../../errors/redux/constants'
import {actionTypes} from './constant'
import {service} from './service'

function* getPermission() {
  try {
    const response: ResponseModel = yield call(service.getPermissions)
    const permissionData = response?.data?.data
    yield put(action.getPermissionSuccess(permissionData))
    yield put(action.getPermissionFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(action.getPermissionFinish())
  }
}

function* getDistrictSaga(actions: ActionModel) {
  try {
    const data: any = actions.payload
    const response: ResponseModel = yield call(service.getDistrict, data)
    const districtData = response?.data?.data
    yield put(action.getDistrictSuccess(districtData))
    yield put(action.getDistrictFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(action.getDistrictFinish())
  }
}

function* getProvinceSaga() {
  try {
    const response: ResponseModel = yield call(service.getProvince)
    const permissionData = response?.data?.data
    yield put(action.getProvinceSuccess(permissionData))
    yield put(action.getProvinceFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(action.getProvinceFinish())
  }
}
function* getCategoryTypeSaga() {
  try {
    const response: ResponseModel = yield call(service.getCategoryType)
    const categoryTypeData = response?.data?.data
    yield put(action.getCategoryTypeSuccess(categoryTypeData))
    yield put(action.getCategoryTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(action.getCategoryTypeFinish())
  }
}
function* getMediaTypeSaga() {
  try {
    const response: ResponseModel = yield call(service.getMediaType)
    const categoryTypeData = response?.data?.data
    yield put(action.getMediaTypeSuccess(categoryTypeData))
    yield put(action.getMediaTypeFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(action.getMediaTypeFinish())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_USER_ROLE_PERMISSION_REQUEST, getPermission)
  yield takeLatest(actionTypes.GET_DISTRICT_REQUEST, getDistrictSaga)
  yield takeLatest(actionTypes.GET_PROVINCE_REQUEST, getProvinceSaga)
  yield takeLatest(actionTypes.GET_CATEGORY_TYPE_REQUEST, getCategoryTypeSaga)
  yield takeLatest(actionTypes.GET_MEDIA_TYPE_REQUEST, getMediaTypeSaga)
}
