import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteQualificationModel, QualificationModel} from '../Model'
import {actionTypes} from './constants'
// import {INewsState} from './reducer'
// import {NewsModel} from '../Model/NewsModel'
export const actions = {
  // GET NEWS
  getQualification: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_QUALIFICATION_START,
    payload: params,
  }),

  getQualificationSuccess: (data: any) => ({
    type: actionTypes.GET_QUALIFICATION_SUCCESS,
    payload: data,
  }),
  getQualificationFinish: () => ({
    type: actionTypes.GET_QUALIFICATION_FINISH,
  }),
  getQualificationError: (error: unknown) => ({
    type: actionTypes.GET_QUALIFICATION_FINISH,
    payload: {error},
  }),

  // create NEWS
  addQualification: (data: any) => ({
    type: actionTypes.ADD_QUALIFICATION_START,
    payload: data,
  }),
  addQualificationSuccess: (task: any) => ({
    type: actionTypes.ADD_QUALIFICATION_SUCCESS,
    payload: task,
  }),
  addQualificationFinish: () => ({
    type: actionTypes.ADD_QUALIFICATION_FINISH,
  }),
  addQualificationReset: () => ({
    type: actionTypes.ADD_QUALIFICATION_RESET,
  }),

  // update NEWS

  updateQualification: (data: any, id: string) => ({
    type: actionTypes.UPDATE_QUALIFICATION_START,
    payload: {data, id},
  }),
  updateQualificationSuccess: (task: any) => ({
    type: actionTypes.UPDATE_QUALIFICATION_SUCCESS,
    payload: task,
  }),
  updateQualificationFinish: () => ({
    type: actionTypes.UPDATE_QUALIFICATION_FINISH,
  }),
  updateQualificationReset: () => ({
    type: actionTypes.UPDATE_QUALIFICATION_RESET,
  }),

  // DELETE qualification
  deleteQualification: (data: DeleteQualificationModel[]) => ({
    type: actionTypes.DELETE_QUALIFICATION_START,
    payload: {qualificationId: data},
  }),
  deleteQualificationSuccess: (data: any) => ({
    type: actionTypes.DELETE_QUALIFICATION_SUCCESS,
    payload: data,
  }),
  deleteQualificationFinish: () => ({
    type: actionTypes.DELETE_QUALIFICATION_FINISH,
  }),
  // Active Qualification
  activateQualification: (id: {[key: string]: any}) => ({
    type: actionTypes.SINGLE_ACTIVATE_QUALIFICATION_REQUEST,
    payload: {qualificationId: id},
  }),
  enableActivateSuccess: (task: any) => ({
    type: actionTypes.ENABLE_QUALIFICATION_SUCCESS,
    payload: task,
  }),
  enableQualificationFinish: () => ({
    type: actionTypes.ENABLE_QUALIFICATION_FINISH,
  }),
  //  deactive Qulification
  deactivateQualification: (id: {[key: string]: any}) => ({
    type: actionTypes.DISABLE_QUALIFICATION_REQUEST,
    payload: {qualificationId: id},
  }),
  enableDeactivateSuccess: (task: any) => ({
    type: actionTypes.DISABLE_QUALIFICATION_SUCCESS,
    payload: task,
  }),
  enableDeactivateFinish: () => ({
    type: actionTypes.DISABLE_QUALIFICATION_FINISH,
  }),
  // single active NEWS
  singleActivateQualification: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_ACTIVATE_QUALIFICATION_REQUEST,
    payload: {qualificationId: [id]},
  }),
  singleActivateQualificationSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ACTIVATE_QUALIFICATION_SUCCESS,
    payload: task,
  }),
  singleActivateQualificationFinish: () => ({
    type: actionTypes.SINGLE_ACTIVATE_QUALIFICATION_SUCCESS,
  }),
  // single deactive NEWS
  singleDeactivateQualification: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_DEACTIVATE_QUALIFICATION_REQUEST,
    payload: {qualificationId: [id]},
  }),
  singleDeactivateQualificationSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ACTIVATE_QUALIFICATION_SUCCESS,
    payload: task,
  }),
  singleDeactivateQualificationFinish: () => ({
    type: actionTypes.SINGLE_DEACTIVATE_QUALIFICATION_FINISH,
  }),
}
