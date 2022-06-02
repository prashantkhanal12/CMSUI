import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteEmailTemplateModel, EmailTemplateModel} from '../Model'
import {actionTypes} from './constants'
export const actions = {
  // get Email Template DATA
  getEmailTemplate: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_EMAIL_TEMPLATE_START,
    payload: params,
  }),
  getEmailTemplateSuccess: (data: EmailTemplateModel) => ({
    type: actionTypes.GET_EMAIL_TEMPLATE_SUCCESS,
    payload: data,
  }),
  getEmailTemplateFinish: () => ({
    type: actionTypes.GET_EMAIL_TEMPLATE_FINISH,
  }),

  // create Email Template
  addEmailTemplate: (data: EmailTemplateModel) => ({
    type: actionTypes.ADD_EMAIL_TEMPLATE_START,
    payload: data,
  }),
  addEmailTemplateSuccess: (task: any) => ({
    type: actionTypes.ADD_EMAIL_TEMPLATE_SUCCESS,
    payload: task,
  }),
  addEmailTemplateFinish: () => ({
    type: actionTypes.ADD_EMAIL_TEMPLATE_FINISH,
  }),
  resetEmailTemplate: () => ({
    type: actionTypes.RESET_EMAIL_TEMPLATE,
  }),

  //Update Email Template
  updateEmailTemplate: (data: EmailTemplateModel, id: string) => ({
    type: actionTypes.UPDATE_EMAIL_TEMPLATE_START,
    payload: data,
    id,
  }),

  updateEmailTemplateSuccess: (data: EmailTemplateModel) => ({
    type: actionTypes.UPDATE_EMAIL_TEMPLATE_SUCCESS,
    payload: data,
  }),

  updateEmailTemplateFinish: () => ({
    type: actionTypes.UPDATE_EMAIL_TEMPLATE_FINISH,
  }),

  // delete Email Template
  deleteEmailTemplate: (data: DeleteEmailTemplateModel[]) => ({
    type: actionTypes.DELETE_EMAIL_TEMPLATE_START,
    payload: {emailTemplateId: data},
  }),
  deleteEmailTemplateSuccess: (data: any) => ({
    type: actionTypes.DELETE_EMAIL_TEMPLATE_SUCCESS,
    payload: data,
  }),
  deleteEmailTemplateFinish: () => ({
    type: actionTypes.DELETE_EMAIL_TEMPLATE_FINISH,
  }),
}
