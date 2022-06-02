import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {actions} from './action'
import {actionTypes} from './constants'
import {ResponseModel} from 'src/cms/helpers/Models/ResponseModel'
import {service} from './service'
import {ActionModel} from 'src/cms/helpers/Models/ActionModel'
import {globalActionTypes} from 'src/app/modules/errors/redux/constants'
import {SortCustomerTestimonialActionModel, SortCustomerTestimonialModel} from '../Model'

//Get Customer Testimonials saga
function* getCustomerTestimonialsSaga(action: ActionModel) {
  try {
    const params: any = action.payload?.params
    yield delay(500)
    const response: ResponseModel = yield call(service.getCustomerTestimonials, params)
    const data: any = response?.data
    yield put(actions.getCustomerTestimonialsSuccess(data))
  } catch (error: any) {
    yield put(actions.getCustomerTestimonialsError(error))
  }
}

//Create Customer Testimonials
function* createCustomerTestimonialsSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.addCustomerTestimonials, body)
    yield put({type: actionTypes.ADD_CUSTOMER_TESTIMONIALS_SUCCESS, payload: response.data})
    yield put({type: actionTypes.ADD_CUSTOMER_TESTIMONIALS_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.ADD_CUSTOMER_TESTIMONIALS_FINISH})
  }
}

//Update Customer Testimonials
function* updateCustomerTestimonials(action: ActionModel) {
  try {
    const body: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.updateCustomerTestimonials,
      body,
      action.payload?.id
    )
    yield put({type: actionTypes.UPDATE_CUSTOMER_TESTIMONIALS_SUCCESS, payload: response.data})
    yield put({type: actionTypes.UPDATE_CUSTOMER_TESTIMONIALS_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.UPDATE_CUSTOMER_TESTIMONIALS_FINISH})
  }
}

//Activate Deactivate Customer Testimonials Saga
function* activateCustomerTestimonialsSaga(action: ActionModel) {
  try {
    const selectedCustomerTestimonials: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.activateCustomerTestimonials,
      selectedCustomerTestimonials
    )
    yield put({type: actionTypes.ACTIVATE_CUSTOMER_TESTIMONIALS_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.ACTIVATE_CUSTOMER_TESTIMONIALS_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.ACTIVATE_CUSTOMER_TESTIMONIALS_FINISH})
  }
}

function* singleActivateCustomerTestimonialsSaga(action: ActionModel) {
  try {
    const selectedCUSTOMER_TESTIMONIALS: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.singleActivateCustomerTestimonials,
      selectedCUSTOMER_TESTIMONIALS
    )

    yield put({
      type: actionTypes.SINGLE_ACTIVATE_CUSTOMER_TESTIMONIALS_SUCCESS,
      payload: response?.data,
    })
    yield put({type: actionTypes.SINGLE_ACTIVATE_CUSTOMER_TESTIMONIALS_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_ACTIVATE_CUSTOMER_TESTIMONIALS_FINISH})
  }
}

function* deactivateCustomerTestimonialsSaga(action: ActionModel) {
  try {
    const selectedCUSTOMER_TESTIMONIALS: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.deactivateCustomerTestimonials,
      selectedCUSTOMER_TESTIMONIALS
    )

    yield put({type: actionTypes.DEACTIVATE_CUSTOMER_TESTIMONIALS_SUCCESS, payload: response?.data})
    yield put({type: actionTypes.DEACTIVATE_CUSTOMER_TESTIMONIALS_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.DEACTIVATE_CUSTOMER_TESTIMONIALS_FINISH})
  }
}

function* singleDeactivateCustomerTestimonialsSaga(action: ActionModel) {
  try {
    const selectedCUSTOMER_TESTIMONIALS: any = action.payload?.data
    const response: ResponseModel = yield call(
      service.singleDeactivateCustomerTestimonials,
      selectedCUSTOMER_TESTIMONIALS
    )
    yield put({
      type: actionTypes.SINGLE_DEACTIVATE_CUSTOMER_TESTIMONIALS_SUCCESS,
      payload: response?.data,
    })
    yield put({type: actionTypes.SINGLE_DEACTIVATE_CUSTOMER_TESTIMONIALS_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SINGLE_DEACTIVATE_CUSTOMER_TESTIMONIALS_FINISH})
  }
}

function* deleteCustomerTestimonialsSaga(action: ActionModel) {
  try {
    const body: any = action.payload
    const response: ResponseModel = yield call(service.deleteCustomerTestimonials, body)
    yield put({type: actionTypes.DELETE_CUSTOMER_TESTIMONIALS_SUCCESS})
    yield put({type: actionTypes.DELETE_CUSTOMER_TESTIMONIALS_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.DELETE_CUSTOMER_TESTIMONIALS_FINISH})
  }
}

function* getAllCustomerTestimonialSaga() {
  try {
    const response: ResponseModel = yield call(service.getAllCustomerTestimonial)
    yield put(actions.getAllCustomerTestimonialSuccess(response?.data?.data))
    yield put(actions.getAllCustomerTestimonialFinish())
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put(actions.getAllCustomerTestimonialFinish())
  }
}

function* sortCustomerTestimonial(action: SortCustomerTestimonialActionModel) {
  try {
    const body: SortCustomerTestimonialModel = action.payload
    const response: ResponseModel = yield call(service.sortCustomerTestimonial, body)

    yield put({
      type: actionTypes.SORT_CUSTOMER_TESTIMONIALS_SUCCESS,
      payload: response?.data?.data,
    })
    yield put({type: actionTypes.SORT_CUSTOMER_TESTIMONIALS_FINISH})
  } catch (err: any) {
    if (err.response) {
      yield put({type: globalActionTypes.GLOBAL_ERROR, payload: err.response.data.message})
    }
    yield put({type: actionTypes.SORT_CUSTOMER_TESTIMONIALS_FINISH})
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GET_CUSTOMER_TESTIMONIALS_START, getCustomerTestimonialsSaga)
  yield takeLatest(actionTypes.ADD_CUSTOMER_TESTIMONIALS_REQUEST, createCustomerTestimonialsSaga)
  yield takeLatest(actionTypes.UPDATE_CUSTOMER_TESTIMONIALS_START, updateCustomerTestimonials)
  yield takeLatest(actionTypes.DELETE_CUSTOMER_TESTIMONIALS_START, deleteCustomerTestimonialsSaga)
  yield takeLatest(
    actionTypes.ACTIVATE_CUSTOMER_TESTIMONIALS_REQUEST,
    activateCustomerTestimonialsSaga
  )
  yield takeLatest(
    actionTypes.DEACTIVATE_CUSTOMER_TESTIMONIALS_REQUEST,
    deactivateCustomerTestimonialsSaga
  )
  yield takeLatest(
    actionTypes.SINGLE_ACTIVATE_CUSTOMER_TESTIMONIALS_REQUEST,
    singleActivateCustomerTestimonialsSaga
  )
  yield takeLatest(
    actionTypes.SINGLE_DEACTIVATE_CUSTOMER_TESTIMONIALS_REQUEST,
    singleDeactivateCustomerTestimonialsSaga
  )
  yield takeLatest(actionTypes.GET_ALL_CUSTOMER_TESTIMONIALS_START, getAllCustomerTestimonialSaga)
  yield takeLatest(actionTypes.SORT_CUSTOMER_TESTIMONIALS_START, sortCustomerTestimonial)
}
