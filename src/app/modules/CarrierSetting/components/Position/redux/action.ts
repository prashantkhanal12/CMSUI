import {ParamsModel} from 'src/app/modules/common/Model'
import {DeletePositionModel, PositionModel, SortPositionModel} from '../Model'
import {actionTypes} from './constants'
import {IPositionState} from './reducer'
export const actions = {
  // get Gallery DATA
  getPosition: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_POSITION_START,
    payload: params,
  }),
  getPositionSuccess: (data: PositionModel) => ({
    type: actionTypes.GET_POSITION_SUCCESS,
    payload: data,
  }),
  getPositionFinish: () => ({
    type: actionTypes.GET_POSITION_FINISH,
  }),

  // create key
  addPosition: (data: PositionModel) => ({
    type: actionTypes.ADD_POSITION_START,
    payload: data,
  }),
  addPositionSuccess: (task: any) => ({
    type: actionTypes.ADD_POSITION_SUCCESS,
    payload: task,
  }),
  addPositionFinish: () => ({
    type: actionTypes.ADD_POSITION_FINISH,
  }),
  resetPosition: () => ({
    type: actionTypes.ADD_POSITION_RESET,
  }),

  //Update Gallery
  updatePosition: (data: PositionModel, id: string) => ({
    type: actionTypes.UPDATE_POSITION_START,
    payload: data,
    id,
  }),

  updatePositionSuccess: (data: PositionModel) => ({
    type: actionTypes.UPDATE_POSITION_SUCCESS,
    payload: data,
  }),

  updatePositionFinish: () => ({
    type: actionTypes.UPDATE_POSITION_FINISH,
  }),

  // delete key
  deletePosition: (data: DeletePositionModel[]) => ({
    type: actionTypes.DELETE_POSITION_START,
    payload: {positionId: data},
  }),
  deletePositionSuccess: (data: any) => ({
    type: actionTypes.DELETE_POSITION_SUCCESS,
    payload: data,
  }),
  deletePositionFinish: () => ({
    type: actionTypes.DELETE_POSITION_FINISH,
  }),

  //Enable Gallery
  enablePosition: (data: any) => ({
    type: actionTypes.ENABLE_POSITION_REQUEST,
    payload: {data},
  }),

  enablePositionSuccess: (task: any) => ({
    type: actionTypes.ENABLE_POSITION_SUCCESS,
    payload: task,
  }),
  enablePositionFinish: () => ({
    type: actionTypes.ENABLE_POSITION_FINISH,
  }),

  //Disable Gallery
  disablePosition: (data: any) => ({
    type: actionTypes.DISABLE_POSITION_REQUEST,
    payload: {data},
  }),

  disablePositionSuccess: (task: any) => ({
    type: actionTypes.DISABLE_POSITION_SUCCESS,
    payload: task,
  }),
  disablePositionFinish: () => ({
    type: actionTypes.DISABLE_POSITION_FINISH,
  }),

  //Enable Gallery
  singleEnablePosition: (data: any) => ({
    type: actionTypes.SINGLE_DEACTIVATE_POSITION_REQUEST,
    payload: {data},
  }),

  singleEnablePositionSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DEACTIVATE_POSITION_SUCCESS,
    payload: task,
  }),
  singleEnablePositionFinish: () => ({
    type: actionTypes.SINGLE_DEACTIVATE_POSITION_FINISH,
  }),

  //Disable Gallery
  singleDisablePosition: (data: any) => ({
    type: actionTypes.SINGLE_DEACTIVATE_POSITION_REQUEST,
    payload: {data},
  }),

  singleDisablePositionSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DEACTIVATE_POSITION_SUCCESS,
    payload: task,
  }),
  singleDisablePositionFinish: () => ({
    type: actionTypes.SINGLE_DEACTIVATE_POSITION_FINISH,
  }),

  // get Gallery
  getAllPosition: () => {
    return {
      type: actionTypes.GET_ALL_POSITION_START,
    }
  },
  getAllPositionSuccess: (data: IPositionState) => ({
    type: actionTypes.GET_ALL_POSITION_SUCCESS,
    payload: data,
  }),
  getAllPositionError: () => ({
    type: actionTypes.GET_ALL_POSITION_FINISH,
  }),

  // sort
  sortPosition: (data: SortPositionModel | any) => ({
    type: actionTypes.SORT_POSITION_START,
    payload: data,
  }),
  sortPositionSuccess: (data: Array<PositionModel>) => ({
    type: actionTypes.SORT_POSITION_SUCCESS,
    payload: data,
  }),
  sortPositionFinish: () => ({
    type: actionTypes.SORT_POSITION_FINISH,
  }),
  sortPositionReset: () => ({
    type: actionTypes.SORT_POSITION_RESET,
  }),
}
