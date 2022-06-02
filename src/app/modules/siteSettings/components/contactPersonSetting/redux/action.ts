import {ParamsModel} from 'src/app/modules/common/Model'
import { SortContactPersonModel } from '../Model'
import {ContactPersonModel, DeleteContactPersonModel} from '../Model/ContactPersonModel'
import {actionTypes} from './constants'
export const actions = {
  // get ContactPerson DATA
  getContactPerson: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_CONTACT_PERSON_START,
    payload: params,
  }),
  getContactPersonSuccess: (data: ContactPersonModel) => ({
    type: actionTypes.GET_CONTACT_PERSON_SUCCESS,
    payload: data,
  }),
  getContactPersonFinish: () => ({
    type: actionTypes.GET_CONTACT_PERSON_FINISH,
  }),

  // create key
  addContactPerson: (data: ContactPersonModel) => ({
    type: actionTypes.ADD_CONTACT_PERSON_START,
    payload: data,
  }),
  addContactPersonSuccess: (task: any) => ({
    type: actionTypes.ADD_CONTACT_PERSON_SUCCESS,
    payload: task,
  }),
  addContactPersonFinish: () => ({
    type: actionTypes.ADD_CONTACT_PERSON_FINISH,
  }),
  resetContactPerson: () => ({
    type: actionTypes.RESET_CONTACT_PERSON,
  }),

  //Update ContactPerson
  updateContactPerson: (data: ContactPersonModel, id: string) => ({
    type: actionTypes.UPDATE_CONTACT_PERSON_START,
    payload: {data, id},
  }),

  updateContactPersonSuccess: (data: ContactPersonModel) => ({
    type: actionTypes.UPDATE_CONTACT_PERSON_SUCCESS,
    payload: data,
  }),

  updateContactPersonFinish: () => ({
    type: actionTypes.UPDATE_CONTACT_PERSON_FINISH,
  }),

  // delete key
  deleteContactPerson: (data: DeleteContactPersonModel[]) => ({
    type: actionTypes.DELETE_CONTACT_PERSON_START,
    payload: {contactPersonSettingId: data},
  }),
  deleteContactPersonSuccess: (data: any) => ({
    type: actionTypes.DELETE_CONTACT_PERSON_SUCCESS,
    payload: data,
  }),
  deleteContactPersonFinish: () => ({
    type: actionTypes.DELETE_CONTACT_PERSON_FINISH,
  }),

  // sort
  sortContactPerson: (data: SortContactPersonModel) => ({
    type: actionTypes.SORT_CONTACT_PERSON_START,
    payload: data,
  }),
  sortContactPersonSuccess: (data: Array<ContactPersonModel>) => ({
    type: actionTypes.SORT_CONTACT_PERSON_SUCCESS,
    payload: data,
  }),
  sortContactPersonFinish: () => ({
    type: actionTypes.SORT_CONTACT_PERSON_FINISH,
  }),
  sortContactPersonReset: () => ({
    type: actionTypes.SORT_CONTACT_PERSON_RESET,
  }),
}
