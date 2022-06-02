import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteSmtpModel, SmtpModel} from '../Model'
import {actionTypes} from './constants'
import {ISmtpState} from './reducer'

export const actions = {
  // get smtp
  getSmtp: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_SMTP_SETTING_START,
    payload: {params},
  }),
  getSmtpSuccess: (data: ISmtpState) => ({
    type: actionTypes.GET_SMTP_SETTING_SUCCESS,
    payload: data,
  }),
  getSmtpError: (error: unknown) => ({
    type: actionTypes.GET_SMTP_SETTING_FINISH,
    payload: {error},
  }),

  // get smtp
  getSmtpEncryption: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_SMTP_ENCRYPTION_START,
    payload: {params},
  }),
  getSmtpEncryptionSuccess: (data: ISmtpState) => ({
    type: actionTypes.GET_SMTP_ENCRYPTION_SUCCESS,
    payload: data,
  }),
  getSmtpEncryptionFinish: () => ({
    type: actionTypes.GET_SMTP_ENCRYPTION_FINISH,
  }),

  // create smtp
  createSmtp: (data: SmtpModel) => ({
    type: actionTypes.CREATE_SMTP_START,
    payload: data,
  }),
  createSmtpSuccess: (task: any) => ({
    type: actionTypes.CREATE_SMTP_SUCCESS,
    payload: task,
  }),
  createSmtpFinish: () => ({
    type: actionTypes.CREATE_SMTP_FINISH,
  }),
  createSmtpReset: () => ({
    type: actionTypes.CREATE_SMTP_RESET,
  }),

  // update smtp
  updateSmtp: (data: SmtpModel, id: string) => ({
    type: actionTypes.UPDATE_SMTP_START,
    payload: {data, id},
  }),
  updateSmtpSuccess: (task: any) => ({
    type: actionTypes.UPDATE_SMTP_SUCCESS,
    payload: task,
  }),
  updateSmtpFinish: () => ({
    type: actionTypes.UPDATE_SMTP_FINISH,
  }),
  updateSmtpReset: () => ({
    type: actionTypes.UPDATE_SMTP_RESET,
  }),

  // delete smtp
  deleteSmtp: (data: DeleteSmtpModel[]) => ({
    type: actionTypes.DELETE_SMTP_START,
    payload: {smtpSettingId: data},
  }),
  deleteSmtpSuccess: (data: any) => ({
    type: actionTypes.DELETE_SMTP_SUCCESS,
    payload: data,
  }),
  deleteSmtpFinish: () => ({
    type: actionTypes.DELETE_SMTP_FINISH,
  }),
}
