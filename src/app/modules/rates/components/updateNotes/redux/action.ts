import {ParamsModel} from 'src/app/modules/common/Model'
import {UpdateNotesModel} from '../Model'
import {actionTypes} from './constants'
import {IUpdateNotesState} from './reducer'

export const actions = {
  getUpdateNotes: () => {
    return {
      type: actionTypes.GET_UPDATE_NOTES_START,
    }
  },

  getUpdateNotesSuccess: (data: IUpdateNotesState) => ({
    type: actionTypes.GET_UPDATE_NOTES_SUCCESS,
    payload: data,
  }),

  getUpdateNotesError: (data: IUpdateNotesState) => ({
    type: actionTypes.GET_UPDATE_NOTES_FINISH,
    payload: data,
  }),

  getUpdateNotesWithData: (params: string) => {
    return {
      type: actionTypes.GET_UPDATE_NOTES_WITH_DATA_START,
      payload: params,
    }
  },

  getUpdateNotesWithDataSuccess: (data: UpdateNotesModel) => ({
    type: actionTypes.GET_UPDATE_NOTES_WITH_DATA_SUCCESS,
    payload: data,
  }),

  getUpdateNotesWithDataFinish: () => ({
    type: actionTypes.GET_UPDATE_NOTES_WITH_DATA_FINISH,
  }),

  //Add Update Notes
  CreateUpdateNotes: (data: UpdateNotesModel) => ({
    type: actionTypes.ADD_UPDATE_NOTES_REQUEST,
    payload: data,
  }),

  createUpdateNotesSuccess: (task: any) => ({
    type: actionTypes.ADD_UPDATE_NOTES_SUCCESS,
    payload: task,
  }),
  createUpdateNotesFinish: (errorMsg: any) => ({
    type: actionTypes.ADD_UPDATE_NOTES_FINISH,
    payload: errorMsg,
  }),
  createUpdateNotesReset: () => ({
    type: actionTypes.ADD_UPDATE_NOTES_RESET,
  }),

  // update Update Notes
  updateUpdateNotes: (data: UpdateNotesModel, id: string) => ({
    type: actionTypes.UPDATE_UPDATE_NOTES_START,
    payload: {data, id},
  }),
}
