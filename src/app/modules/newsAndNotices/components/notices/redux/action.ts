import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteModel, OptionModel} from '../Model'
import {actionTypes} from './constants'
export const actions = {
  // GET NOTICES
  getNotice: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_NOTICES_START,
    payload: params,
  }),

  getNoticeSuccess: (data: any) => ({
    type: actionTypes.GET_NOTICES_SUCCESS,
    payload: data,
  }),
  getNoticeFinish: () => ({
    type: actionTypes.GET_NOTICES_FINISH,
  }),
  getNoticeError: (error: unknown) => ({
    type: actionTypes.GET_NOTICES_FINISH,
    payload: {error},
  }),

  // create NOTICES
  addNotice: (data: any) => ({
    type: actionTypes.ADD_NOTICES_START,
    payload: data,
  }),
  addNoticeSuccess: (task: any) => ({
    type: actionTypes.ADD_NOTICES_SUCCESS,
    payload: task,
  }),
  addNoticeFinish: () => ({
    type: actionTypes.ADD_NOTICES_FINISH,
  }),
  addNoticeReset: () => ({
    type: actionTypes.ADD_NOTICES_RESET,
  }),

  // update NOTICES

  updateNotice: (data: any, id: string) => ({
    type: actionTypes.UPDATE_NOTICES_START,
    payload: {data, id},
  }),
  updateNoticeSuccess: (task: any) => ({
    type: actionTypes.UPDATE_NOTICES_SUCCESS,
    payload: task,
  }),
  updateNoticeFinish: () => ({
    type: actionTypes.UPDATE_NOTICES_FINISH,
  }),
  updateNoticeReset: () => ({
    type: actionTypes.UPDATE_NOTICES_RESET,
  }),

  // DELETE NOTICES
  deleteNotice: (data: DeleteModel[]) => ({
    type: actionTypes.DELETE_NOTICES_START,
    payload: {noticeId: data},
  }),
  deleteNoticeSuccess: (data: any) => ({
    type: actionTypes.DELETE_NOTICES_SUCCESS,
    payload: data,
  }),
  deleteNoticeFinish: () => ({
    type: actionTypes.DELETE_NOTICES_FINISH,
  }),
  // Active NOTICES
  activateNotice: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_ACTIVATE_NOTICES_REQUEST,
    payload: {noticeId: id},
  }),
  //  deactive NOTICES
  deactivateNotice: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_DEACTIVATE_NOTICES_REQUEST,
    payload: {noticeId: id},
  }),
  // single active NOTICES
  singleActivateNotice: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_ACTIVATE_NOTICES_REQUEST,
    payload: {noticeId: [id]},
  }),
  // single deactive NOTICES
  singleDeactivateNotice: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_DEACTIVATE_NOTICES_REQUEST,
    payload: {noticeId: [id]},
  }),
}
