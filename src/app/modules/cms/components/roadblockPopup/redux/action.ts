import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteRoadBlockPopupModel, RoadBlockPopupModel, SortRoadBlockModel} from '../Model'
import {actionTypes} from './constants'
import {IRoadBlockPopupState} from './reducer'

export const actions = {
  // get RoadBlock Popup
  getRoadBlockPopup: (params: ParamsModel = {page: 1, limit: 10}) => {
    return {
      type: actionTypes.GET_ROAD_BLOCK_POPUP_START,
      payload: {params},
    }
  },
  getRoadBlockPopupSuccess: (data: IRoadBlockPopupState) => ({
    type: actionTypes.GET_ROAD_BLOCK_POPUP_SUCCESS,
    payload: data,
  }),
  getRoadBlockPopupError: (data: IRoadBlockPopupState) => ({
    type: actionTypes.GET_ROAD_BLOCK_POPUP_FINISH,
    payload: data,
  }),

  //Add RoadBlock Popup
  CreateRoadBlockPopup: (data: RoadBlockPopupModel) => ({
    type: actionTypes.ADD_ROAD_BLOCK_POPUP_REQUEST,
    payload: data,
  }),

  createRoadBlockPopupSuccess: (task: any) => ({
    type: actionTypes.ADD_ROAD_BLOCK_POPUP_SUCCESS,
    payload: task,
  }),
  createRoadBlockPopupFinish: (errorMsg: any) => ({
    type: actionTypes.ADD_ROAD_BLOCK_POPUP_FINISH,
    payload: errorMsg,
  }),
  createRoadBlockPopupReset: () => ({
    type: actionTypes.ADD_ROAD_BLOCK_POPUP_RESET,
  }),

  //Activate and Deactivate Bulk RoadBlock Popup
  activateRoadBlockPopup: (data: any) => ({
    type: actionTypes.ACTIVATE_ROAD_BLOCK_POPUP_REQUEST,
    payload: {data},
  }),
  deactivateRoadBlockPopup: (data: any) => ({
    type: actionTypes.DEACTIVATE_ROAD_BLOCK_POPUP_REQUEST,
    payload: {data},
  }),

  //Single Activate and Deactivate RoadBlock Popup
  singleActivateRoadBlockPopup: (data: any) => ({
    type: actionTypes.SINGLE_ACTIVATE_ROAD_BLOCK_POPUP_REQUEST,
    payload: {data},
  }),

  singleDeactivateRoadBlockPopup: (data: any) => ({
    type: actionTypes.SINGLE_DEACTIVATE_ROAD_BLOCK_POPUP_REQUEST,
    payload: {data},
  }),

  // update RoadBlock Popup
  updateRoadBlockPopup: (data: RoadBlockPopupModel, id: string) => ({
    type: actionTypes.UPDATE_ROAD_BLOCK_POPUP_START,
    payload: {data, id},
  }),

  //delete and reset RoadBlock Popup
  deleteRoadBlockPopup: (data: DeleteRoadBlockPopupModel[]) => ({
    type: actionTypes.DELETE_ROAD_BLOCK_POPUP_START,
    payload: {popup: data},
  }),

  // sort
  sortRoadBlock: (data: SortRoadBlockModel) => ({
    type: actionTypes.SORT_ROAD_BLOCK_START,
    payload: data,
  }),
  sortRoadBlockSuccess: (data: Array<RoadBlockPopupModel>) => ({
    type: actionTypes.SORT_ROAD_BLOCK_SUCCESS,
    payload: data,
  }),
  sortRoadBlockFinish: () => ({
    type: actionTypes.SORT_ROAD_BLOCK_FINISH,
  }),
  sortRoadBlockReset: () => ({
    type: actionTypes.SORT_ROAD_BLOCK_RESET,
  }),

  // List of road block
  getAllRoadBlock: () => {
    return {
      type: actionTypes.GET_ALL_ROAD_BLOCK_START,
    }
  },
  getAllRoadBlockSuccess: (data: IRoadBlockPopupState) => ({
    type: actionTypes.GET_ALL_ROAD_BLOCK_SUCCESS,
    payload: data,
  }),
  getAllRoadBlockError: () => ({
    type: actionTypes.GET_ALL_ROAD_BLOCK_FINISH,
  }),
}
