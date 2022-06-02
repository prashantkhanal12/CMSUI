import {ParamsModel} from 'src/app/modules/common/Model'
import {CsrOptionModel, DeleteModel, SortCsrModel} from '../Model'
import {actionTypes} from './constants'

export const actions = {
  //*  GET CSR File Type
  getCsrFileType: () => ({
    type: actionTypes.GET_CSR_FILE_TYPE_START,
  }),

  getCsrFileTypeSuccess: (data: CsrOptionModel[]) => ({
    type: actionTypes.GET_CSR_FILE_TYPE_SUCCESS,
    payload: data,
  }),
  getCsrFileTypeFinish: () => ({
    type: actionTypes.GET_CSR_FILE_TYPE_FINISH,
  }),

  //*  GET CSR Data
  getCsrData: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_CSR_DATA_START,
    payload: params,
  }),

  getCsrDataSuccess: (data: {[key: string]: string}) => ({
    type: actionTypes.GET_CSR_DATA_SUCCESS,
    payload: data,
  }),
  getCsrDataFinish: () => ({
    type: actionTypes.GET_CSR_DATA_FINISH,
  }),

  //*  GET CSR List
  getCsrList: () => ({
    type: actionTypes.GET_CSR_LIST_START,
  }),

  getCsrListSuccess: (data: any) => ({
    type: actionTypes.GET_CSR_LIST_SUCCESS,
    payload: data,
  }),
  getCsrListFinish: () => ({
    type: actionTypes.GET_CSR_LIST_FINISH,
  }),
  getCsrListError: (error: unknown) => ({
    type: actionTypes.GET_CSR_LIST_FINISH,
    payload: {error},
  }),

  // * ADD CRS Item
  addCsrItem: (data: any) => ({
    type: actionTypes.ADD_CSR_ITEM_START,
    payload: data,
  }),
  addCsrItemSuccess: (task: any) => ({
    type: actionTypes.ADD_CSR_ITEM_SUCCESS,
    payload: task,
  }),
  addCsrItemFinish: () => ({
    type: actionTypes.ADD_CSR_ITEM_FINISH,
  }),
  addCsrItemReset: () => ({
    type: actionTypes.ADD_CSR_ITEM_RESET,
  }),

  //*  UPDATE CSR Item
  updateCsrItem: (data: any, id: string) => ({
    type: actionTypes.UPDATE_CSR_ITEM_START,
    payload: {data, id},
  }),
  updateCsrItemSuccess: (task: any) => ({
    type: actionTypes.UPDATE_CSR_ITEM_SUCCESS,
    payload: task,
  }),
  updateCsrItemFinish: () => ({
    type: actionTypes.UPDATE_CSR_ITEM_FINISH,
  }),
  updateCsrItemReset: () => ({
    type: actionTypes.UPDATE_CSR_ITEM_RESET,
  }),

  //*  DELETE CSR Item
  deleteCsrItem: (data: DeleteModel[]) => ({
    type: actionTypes.DELETE_BULK_CSR_START,
    payload: {csr: data},
  }),
  deleteCsrItemSuccess: (data: any) => ({
    type: actionTypes.DELETE_BULK_CSR_SUCCESS,
    payload: data,
  }),
  deleteCsrItemFinish: () => ({
    type: actionTypes.DELETE_BULK_CSR_FINISH,
  }),

  //activate Csr
  activateCsr: (data: any) => ({type: actionTypes.ACTIVATE_CSR_START, payload: {data}}),

  activateCsrSuccess: (task: any) => ({
    type: actionTypes.ACTIVATE_CSR_SUCCESS,
    payload: task,
  }),
  activateCsrFinish: () => ({
    type: actionTypes.ACTIVATE_CSR_FINISH,
  }),

  //deactivate Csr
  deactivateCsr: (data: any) => ({type: actionTypes.DEACTIVATE_CSR_START, payload: {data}}),

  deactivateCsrSuccess: (task: any) => ({
    type: actionTypes.DEACTIVATE_CSR_SUCCESS,
    payload: task,
  }),
  deactivateCsrFinish: () => ({
    type: actionTypes.DEACTIVATE_CSR_FINISH,
  }),

  //activate Csr
  singleActivateCsr: (data: any) => ({
    type: actionTypes.SINGLE_ACTIVATE_CSR_START,
    payload: {data},
  }),

  singleActivateCsrSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ACTIVATE_CSR_SUCCESS,
    payload: task,
  }),
  singleActivateCsrFinish: () => ({
    type: actionTypes.SINGLE_ACTIVATE_CSR_FINISH,
  }),

  //deactivate Csr
  singleDeactivateCsr: (data: any) => ({
    type: actionTypes.SINGLE_DEACTIVATE_CSR_START,
    payload: {data},
  }),

  singleDeactivateCsrSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DEACTIVATE_CSR_SUCCESS,
    payload: task,
  }),
  singleDeactivateCsrFinish: () => ({
    type: actionTypes.SINGLE_DEACTIVATE_CSR_FINISH,
  }),

  // sort csr
  // sort category
  sortCsr: (data: SortCsrModel) => ({
    type: actionTypes.SORT_CSR_START,
    payload: {data},
  }),
  sortCsrSuccess: (data: Array<SortCsrModel>) => ({
    type: actionTypes.SORT_CSR_SUCCESS,
    payload: {data},
  }),
  sortCsrFinish: () => ({
    type: actionTypes.SORT_CSR_FINISH,
  }),
  sortCsrReset: () => ({
    type: actionTypes.SORT_CSR_RESET,
  }),
}
