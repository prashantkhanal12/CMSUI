import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteTextPopupModel, SortTextPopupModel, TextPopupModel} from '../Model'
import {actionTypes} from './constants'
import {ITextPopupState} from './reducer'

export const actions = {
  // get TextPopup
  getTextPopup: (params: ParamsModel = {page: 1, limit: 10}) => {
    return {
      type: actionTypes.GET_TEXT_POPUP_START,
      payload: {params},
    }
  },
  getTextPopupSuccess: (data: ITextPopupState) => ({
    type: actionTypes.GET_TEXT_POPUP_SUCCESS,
    payload: data,
  }),
  getTextPopupError: (data: ITextPopupState) => ({
    type: actionTypes.GET_TEXT_POPUP_FINISH,
    payload: data,
  }),

  //Add TextPopup
  CreateTextPopup: (data: TextPopupModel) => ({
    type: actionTypes.ADD_TEXT_POPUP_REQUEST,
    payload: data,
  }),

  createTextPopupSuccess: (task: any) => ({
    type: actionTypes.ADD_TEXT_POPUP_SUCCESS,
    payload: task,
  }),
  createTextPopupFinish: (errorMsg: any) => ({
    type: actionTypes.ADD_TEXT_POPUP_FINISH,
    payload: errorMsg,
  }),
  createTextPopupReset: () => ({
    type: actionTypes.ADD_TEXT_POPUP_RESET,
  }),

  //Activate and Deactivate Bulk TextPopup
  activateTextPopup: (data: any) => ({
    type: actionTypes.ACTIVATE_TEXT_POPUP_REQUEST,
    payload: {data},
  }),
  deactivateTextPopup: (data: any) => ({
    type: actionTypes.DEACTIVATE_TEXT_POPUP_REQUEST,
    payload: {data},
  }),

  //Single Activate and Deactivate TextPopup
  singleActivateTextPopup: (data: any) => ({
    type: actionTypes.SINGLE_ACTIVATE_TEXT_POPUP_REQUEST,
    payload: {data},
  }),

  singleDeactivateTextPopup: (data: any) => ({
    type: actionTypes.SINGLE_DEACTIVATE_TEXT_POPUP_REQUEST,
    payload: {data},
  }),

  // update TextPopup
  updateTextPopup: (data: TextPopupModel, id: string) => ({
    type: actionTypes.UPDATE_TEXT_POPUP_START,
    payload: {data, id},
  }),

  //delete and reset TextPopup
  deleteTextPopup: (data: DeleteTextPopupModel[]) => ({
    type: actionTypes.DELETE_TEXT_POPUP_START,
    payload: {popup: data},
  }),

  // sort
  sortTextPopup: (data: SortTextPopupModel) => ({
    type: actionTypes.SORT_TEXT_POPUP_START,
    payload: data,
  }),
  sortTextPopupSuccess: (data: Array<TextPopupModel>) => ({
    type: actionTypes.SORT_TEXT_POPUP_SUCCESS,
    payload: data,
  }),
  sortTextPopupFinish: () => ({
    type: actionTypes.SORT_TEXT_POPUP_FINISH,
  }),
  sortTextPopupReset: () => ({
    type: actionTypes.SORT_TEXT_POPUP_RESET,
  }),
}
