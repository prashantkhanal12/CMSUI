import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from '../../../../../../cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {MenuModal} from '../Model/MenuModal'
import {ParamsModel} from 'src/app/modules/common/Model'
import {SortMenuActionModel, SortMenuModel} from '../Model'

function* getMenuIconTypeSaga() {
  //GET MENU ICON TYPE SAGA
  try {
    const response: ResponseModel = yield call(service.getMenuIcon)
    yield put(actions.getMenuIconSuccess(response?.data?.data))
    yield put(actions.getMenuIconError())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getMenuIconError())
  }
}

function* getMenuLinkTypeSaga() {
  //GET MENU LINK TYPE SAGA
  try {
    const response: ResponseModel = yield call(service.getMenuLink)
    yield put(actions.getMenuLinkSuccess(response?.data?.data))
    yield put(actions.getMenuLinkError())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getMenuLinkError())
  }
}

function* getMenuStatusSaga() {
  //GET MENU LINK TYPE SAGA
  try {
    const response: ResponseModel = yield call(service.getMenuStatus)
    yield put(actions.getMenuStatusSuccess(response?.data?.data))
    yield put(actions.getMenuStatusError())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getMenuStatusError())
  }
}

function* getMenuTypeSaga() {
  //GET MENU LINK TYPE SAGA
  try {
    const response: ResponseModel = yield call(service.getMenuType)
    yield put(actions.getMenuTypeSuccess(response?.data?.data))
    yield put(actions.getMenuTypeError())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getMenuTypeError())
  }
}

function* getVisibilityStatusSaga() {
  //GET MENU LINK TYPE SAGA
  try {
    const response: ResponseModel = yield call(service.getMenuVisibilityStatus)
    yield put(actions.getMenuVisibilityStatusSuccess(response?.data?.data))
    yield put(actions.getMenuVisibilityStatusError())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getMenuVisibilityStatusError())
  }
}

function* getTopMenuSaga() {
  //GET MENU LINK TYPE SAGA
  try {
    const response: ResponseModel = yield call(service.getTopMenu)
    yield put(actions.getTopMenuSuccess(response?.data?.data))
    yield put(actions.getTopMenuError())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getTopMenuError())
  }
}

function* getMenuSaga(action: ActionModel) {
  //GET MENU LINK TYPE SAGA
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getMenu, params)
    yield put(actions.getMenuSuccess(response?.data?.data))
    yield put(actions.getMenuError())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getMenuError())
  }
}

function* getAllMenuSaga(action: ActionModel) {
  //GET MENU LINK TYPE SAGA
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getAllMenu, params)
    yield put(actions.getAllMenuSuccess(response?.data?.data))
    yield put(actions.getAllMenuError())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllMenuError())
  }
}

function* addMenuSaga(action: ActionModel) {
  //GET MENU LINK TYPE SAGA
  try {
    const body: MenuModal = action.payload
    const response: ResponseModel = yield call(service.addMenu, body)
    yield put(actions.addMenuSuccess(response?.data?.data))
    yield put(actions.addMenuError())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addMenuError())
  }
}

function* updateMenuSaga(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(service.updateMenu, body, action.payload?.id)
    yield put(actions.updateMenuSuccess(response?.data?.data))
    yield put(actions.updateMenuError())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateMenuError())
  }
}

function* enableMenuSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.enableMenu, selectedUsers)
    yield put(actions.enableMenuSuccess(response?.data))
    yield put(actions.enableMenuFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableMenuFinish())
  }
}

function* disableMenuSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.disableMenu, selectedUsers)
    yield put(actions.disableMenuSuccess(response?.data))
    yield put(actions.disableMenuFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.enableMenuFinish())
  }
}

function* singleEnableMenuSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleEnableMenu, selectedUsers)
    yield put(actions.singleEnableMenuSuccess(response?.data))
    yield put(actions.singleEnableMenuFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleEnableMenuFinish())
  }
}

function* singleDisableMenuSaga(action: ActionModel) {
  try {
    const selectedUsers: any = action.payload?.data
    const response: ResponseModel = yield call(service.singleDisableMenu, selectedUsers)
    yield put(actions.singleDisableMenuSuccess(response?.data))
    yield put(actions.singleDisableMenuFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.singleDisableMenuFinish())
  }
}
function* deleteMenuSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteMenu, body)
    yield put(actions.deleteMenuSuccess(response.data?.data))
    yield put(actions.deleteMenuFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteMenuFinish())
  }
}

function* sortMenu(action: SortMenuActionModel) {
  try {
    const body: SortMenuModel = action.payload
    const response: ResponseModel = yield call(service.sortMenu, body)

    yield put({
      type: actionTypes.SORT_MENU_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_MENU_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_MENU_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_MENU_ICON_TYPE_START, getMenuIconTypeSaga)
  yield takeLatest(actionTypes.GET_MENU_LINK_TYPE_START, getMenuLinkTypeSaga)
  yield takeLatest(actionTypes.GET_MENU_STATUS_START, getMenuStatusSaga)
  yield takeLatest(actionTypes.GET_MENU_TYPE_START, getMenuTypeSaga)
  yield takeLatest(actionTypes.GET_MENU_VISIBILITY_STATUS_START, getVisibilityStatusSaga)
  yield takeLatest(actionTypes.GET_TOP_MENU_START, getTopMenuSaga)
  yield takeLatest(actionTypes.GET_MENU_START, getMenuSaga)
  yield takeLatest(actionTypes.GET_ALL_MENU_START, getAllMenuSaga)
  yield takeLatest(actionTypes.ADD_MENU_START, addMenuSaga)
  yield takeLatest(actionTypes.UPDATE_MENU_START, updateMenuSaga)
  yield takeLatest(actionTypes.DELETE_MENU_START, deleteMenuSaga)
  yield takeLatest(actionTypes.ENABLE_MENU_REQUEST, enableMenuSaga)
  yield takeLatest(actionTypes.DISABLE_MENU_REQUEST, disableMenuSaga)
  yield takeLatest(actionTypes.SINGLE_ENABLE_MENU_REQUEST, singleEnableMenuSaga)
  yield takeLatest(actionTypes.SINGLE_DISABLE_MENU_REQUEST, singleDisableMenuSaga)
  yield takeLatest(actionTypes.SORT_MENU_START, sortMenu)
}
