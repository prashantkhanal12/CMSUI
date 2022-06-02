import {ParamsModel} from 'src/app/modules/common/Model'
import {
  DeleteFunctionalAreaModel,
  FunctionalAreaModel,
  SortFunctionalAreaActionModel,
} from '../Model'
import {actionTypes} from './constants'
import {IFunctionalAreaState} from './reducer'
export const actions = {
  // get Gallery DATA
  getFunctionalArea: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_FUNCTIONALAREA_START,
    payload: params,
  }),
  getFunctionalAreaSuccess: (data: FunctionalAreaModel) => ({
    type: actionTypes.GET_FUNCTIONALAREA_SUCCESS,
    payload: data,
  }),
  getFunctionalAreaFinish: () => ({
    type: actionTypes.GET_FUNCTIONALAREA_FINISH,
  }),

  // create key
  addFunctionalArea: (data: FunctionalAreaModel) => ({
    type: actionTypes.ADD_FUNCTIONALAREA_START,
    payload: data,
  }),
  addFunctionalAreaSuccess: (task: any) => ({
    type: actionTypes.ADD_FUNCTIONALAREA_SUCCESS,
    payload: task,
  }),
  addFunctionalAreaFinish: () => ({
    type: actionTypes.ADD_FUNCTIONALAREA_FINISH,
  }),
  resetFunctionalArea: () => ({
    type: actionTypes.ADD_FUNCTIONALAREA_RESET,
  }),

  //Update Gallery
  updateFunctionalArea: (data: FunctionalAreaModel, id: string) => ({
    type: actionTypes.UPDATE_FUNCTIONALAREA_START,
    payload: data,
    id,
  }),

  updateFunctionalAreaSuccess: (data: FunctionalAreaModel) => ({
    type: actionTypes.UPDATE_FUNCTIONALAREA_SUCCESS,
    payload: data,
  }),

  updateFunctionalAreaFinish: () => ({
    type: actionTypes.UPDATE_FUNCTIONALAREA_FINISH,
  }),

  // delete key
  deleteFunctionalArea: (data: DeleteFunctionalAreaModel[]) => ({
    type: actionTypes.DELETE_FUNCTIONALAREA_START,
    payload: {functionalAreaId: data},
  }),
  deleteFunctionalAreaSuccess: (data: any) => ({
    type: actionTypes.DELETE_FUNCTIONALAREA_SUCCESS,
    payload: data,
  }),
  deleteFunctionalAreaFinish: () => ({
    type: actionTypes.DELETE_FUNCTIONALAREA_FINISH,
  }),

  //Enable Gallery
  enableFunctionalArea: (data: any) => ({
    type: actionTypes.ENABLE_FUNCTIONALAREA_REQUEST,
    payload: {data},
  }),

  enableFunctionalAreaSuccess: (task: any) => ({
    type: actionTypes.ENABLE_FUNCTIONALAREA_SUCCESS,
    payload: task,
  }),
  enableFunctionalAreaFinish: () => ({
    type: actionTypes.ENABLE_FUNCTIONALAREA_FINISH,
  }),

  //Disable Gallery
  disableFunctionalArea: (data: any) => ({
    type: actionTypes.DISABLE_FUNCTIONALAREA_REQUEST,
    payload: {data},
  }),

  disableFunctionalAreaSuccess: (task: any) => ({
    type: actionTypes.DISABLE_FUNCTIONALAREA_SUCCESS,
    payload: task,
  }),
  disableFunctionalAreaFinish: () => ({
    type: actionTypes.DISABLE_FUNCTIONALAREA_FINISH,
  }),

  //Enable Gallery
  singleEnableFunctionalArea: (data: any) => ({
    type: actionTypes.SINGLE_DEACTIVATE_FUNCTIONALAREA_REQUEST,
    payload: {data},
  }),

  singleEnableFunctionalAreaSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DEACTIVATE_FUNCTIONALAREA_SUCCESS,
    payload: task,
  }),
  singleEnableFunctionalAreaFinish: () => ({
    type: actionTypes.SINGLE_DEACTIVATE_FUNCTIONALAREA_FINISH,
  }),

  //Disable Gallery
  singleDisableFunctionalArea: (data: any) => ({
    type: actionTypes.SINGLE_DEACTIVATE_FUNCTIONALAREA_REQUEST,
    payload: {data},
  }),

  singleDisableFunctionalAreaSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DEACTIVATE_FUNCTIONALAREA_SUCCESS,
    payload: task,
  }),
  singleDisableFunctionalAreaFinish: () => ({
    type: actionTypes.SINGLE_DEACTIVATE_FUNCTIONALAREA_FINISH,
  }),

  // get Gallery
  getAllFunctionalArea: () => {
    return {
      type: actionTypes.GET_ALL_FUNCTIONALAREA_START,
    }
  },
  getAllFunctionalAreaSuccess: (data: IFunctionalAreaState) => ({
    type: actionTypes.GET_ALL_FUNCTIONALAREA_SUCCESS,
    payload: data,
  }),
  getAllFunctionalAreaError: () => ({
    type: actionTypes.GET_ALL_FUNCTIONALAREA_FINISH,
  }),

  // sort
  sortFunctionalArea: (data: SortFunctionalAreaActionModel) => ({
    type: actionTypes.SORT_FUNCTIONALAREA_START,
    payload: data,
  }),
  sortFunctionalAreaSuccess: (data: Array<FunctionalAreaModel>) => ({
    type: actionTypes.SORT_FUNCTIONALAREA_SUCCESS,
    payload: data,
  }),
  sortFunctionalAreaFinish: () => ({
    type: actionTypes.SORT_FUNCTIONALAREA_FINISH,
  }),
  sortFunctionalAreaReset: () => ({
    type: actionTypes.SORT_FUNCTIONALAREA_RESET,
  }),
}
