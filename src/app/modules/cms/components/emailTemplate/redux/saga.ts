import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {ParamsModel} from 'src/app/modules/common/Model'
import {EmailTemplateModel} from '../Model'

function* getEmailTemplateSaga(action: ActionModel) {
  try {
    const params: ParamsModel = action.payload
    yield delay(500)
    const response: ResponseModel = yield call(service.getEmailTemplate, params)
    yield put(actions.getEmailTemplateSuccess(response?.data?.data))
    yield put(actions.getEmailTemplateFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getEmailTemplateFinish())
  }
}

function* addEmailTemplateSaga(action: ActionModel) {
  try {
    const body = action.payload
    const response: ResponseModel = yield call(service.addEmailTemplate, body)
    yield put(actions.addEmailTemplateSuccess(response.data?.data))
    yield put(actions.addEmailTemplateFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.addEmailTemplateFinish())
  }
}

function* updateEmailTemplateSaga(action: ActionModel) {
  try {
    const body: EmailTemplateModel = action.payload
    const response: ResponseModel = yield call(
      service.updateEmailTemplate,
      body,
      action.payload?.id
    )
    yield put(actions.updateEmailTemplateSuccess(response.data?.data))
    yield put(actions.updateEmailTemplateFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.updateEmailTemplateFinish())
  }
}

function* deleteEmailTemplateSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteEmailTemplate, body)

    yield put(actions.deleteEmailTemplateSuccess(response.data?.data))
    yield put(actions.deleteEmailTemplateFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.deleteEmailTemplateFinish())
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_EMAIL_TEMPLATE_START, getEmailTemplateSaga)
  yield takeLatest(actionTypes.ADD_EMAIL_TEMPLATE_START, addEmailTemplateSaga)
  yield takeLatest(actionTypes.UPDATE_EMAIL_TEMPLATE_START, updateEmailTemplateSaga)
  yield takeLatest(actionTypes.DELETE_EMAIL_TEMPLATE_START, deleteEmailTemplateSaga)
}
