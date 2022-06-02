import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions, nav_visiblity, moduleActions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from '../../../../../../cms/helpers/Models/ResponseModel'
import {service} from './service'
import {IModuleState} from '..'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {
  ActionModelEnableDisable,
  ModuleStatusType,
  SortModuleActionModel,
  SortModuleManagerModel,
  ToogleStatusType,
} from '../Model'
import {SortActionModel} from 'src/app/modules/cms/components/categories/Model'

function* getSocialIntSaga() {
  try {
    const response: ResponseModel = yield call(service.getSocialIntegration)
    const data: IModuleState = response?.data?.data
    yield put(actions.getSocialIntegrationSuccess(data))
    yield put(actions.getSocialIntegrationFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getSocialIntegrationFinish())
  }
}

function* getNavVisibilitySaga() {
  try {
    const response: ResponseModel = yield call(service.getNavVisibility)
    const data: IModuleState = response?.data?.data
    yield put(nav_visiblity.getNavVisibilitySuccess(data))
    yield put(actions.getSocialIntegrationFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getSocialIntegrationFinish())
  }
}

function* addModuleSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addModule, body)
    const data: IModuleState = response?.data?.data
    yield put(moduleActions.addModuleSuccess(data))
    yield put(moduleActions.addModuleFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(moduleActions.addModuleFinish())
  }
}

function* updateModuleSaga(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(service.updateModule, body, action.payload?.id)
    yield put(moduleActions.updateModuleSuccess(response.data?.data))
    yield put(moduleActions.updateModuleFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(moduleActions.updateModuleFinish())
  }
}

function* getModuleSaga(action: ActionModel) {
  try {
    const params: any = action.payload?.params
    yield delay(500)
    const response: ResponseModel = yield call(service.getModule, params)
    const data: IModuleState = response?.data?.data
    yield put(moduleActions.getModuleSuccess(data))
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(moduleActions.getModuleFinish())
  }
}

function* getAllModuleSaga() {
  try {
    const response: ResponseModel = yield call(service.getAllModule)
    const data: IModuleState = response?.data?.data
    yield put(moduleActions.getAllModuleSuccess(data))
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(moduleActions.getAllModuleFinish())
  }
}

function* toggleNaviagationStatus(action: ActionModel) {
  try {
    yield delay(500)
    const body: ToogleStatusType = action.payload
    const response: ResponseModel = yield call(service.toggleNaviagationStatus, body)
    const data: IModuleState = response?.data?.data
    yield put(moduleActions.toggleNaviationStatusModuleSuccess(data))
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(moduleActions.toggleNaviationStatusModuleFinish())
  }
}

function* toggleSocialIntStatus(action: ActionModel) {
  try {
    yield delay(500)
    const body: ToogleStatusType = action.payload
    const response: ResponseModel = yield call(service.toggleSocialIntStatus, body)
    const data: IModuleState = response?.data?.data
    yield put(moduleActions.toggleSocialIntStatusModuleSuccess(data))
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(moduleActions.toggleSocialIntStatusModuleFinish())
  }
}

function* enableModuleStatus(action: ActionModelEnableDisable) {
  try {
    yield delay(500)
    const body: ModuleStatusType = action.payload
    const response: ResponseModel = yield call(service.enableModuleStatus, body)
    const data: IModuleState = response?.data?.data
    yield put(moduleActions.enableModuleStatusSuccess(data))
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(moduleActions.enableModuleStatusFinish())
  }
}

function* disableModuleStatus(action: ActionModelEnableDisable) {
  try {
    yield delay(500)
    const body: ModuleStatusType = action.payload
    const response: ResponseModel = yield call(service.disableModuleStatus, body)
    const data: IModuleState = response?.data?.data
    yield put(moduleActions.disableModuleStatusSuccess(data))
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(moduleActions.disableModuleStatusFinish())
  }
}

function* sortModuleManager(action: SortModuleActionModel) {
  try {
    const body: SortModuleManagerModel = action.payload
    const response: ResponseModel = yield call(service.sortModuleManager, body)

    yield put({
      type: actionTypes.SORT_MODULE_MANAGER_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_MODULE_MANAGER_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_MODULE_MANAGER_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_SOCIAL_INTEGRATION_START, getSocialIntSaga)
  yield takeLatest(actionTypes.GET_NAV_VISIBILITY_START, getNavVisibilitySaga)
  yield takeLatest(actionTypes.ADD_MODULE_START, addModuleSaga)
  yield takeLatest(actionTypes.UPDATE_MODULE_START, updateModuleSaga)
  yield takeLatest(actionTypes.GET_MODULE_START, getModuleSaga)
  yield takeLatest(actionTypes.GET_ALL_MODULE_START, getAllModuleSaga)
  yield takeLatest(actionTypes.TOOGLE_NAVIGATION_STATUS_START, toggleNaviagationStatus)
  yield takeLatest(actionTypes.TOOGLE_SOCIAL_INT_STATUS_START, toggleSocialIntStatus)
  yield takeLatest(actionTypes.ENABLE_MODULE_STATUS_START, enableModuleStatus)
  yield takeLatest(actionTypes.DISABLE_MODULE_STATUS_START, disableModuleStatus)
  yield takeLatest(actionTypes.SORT_MODULE_MANAGER_START, sortModuleManager)
}
