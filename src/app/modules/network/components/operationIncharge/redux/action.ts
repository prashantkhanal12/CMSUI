import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteModel, OptionModel} from '../Model'
import {actionTypes} from './constants'
import {IOperationInchargeState, IExportFileState} from './reducer'
import {OperationInchargeModel} from '../Model/OperationInchargeModel'
export const actions = {
  // GET BRANCHLESS BANKING
  getOperationIncharge: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_OPERATION_INCHARGE_START,
    payload: params,
  }),

  getOperationInchargeSuccess: (data: any) => ({
    type: actionTypes.GET_OPERATION_INCHARGE_SUCCESS,
    payload: data,
  }),
  getOperationInchargeError: (error: unknown) => ({
    type: actionTypes.GET_OPERATION_INCHARGE_FINISH,
    payload: {error},
  }),

  // create branchless banking
  addOperationIncharge: (data: OperationInchargeModel) => ({
    type: actionTypes.ADD_OPERATION_INCHARGE_START,
    payload: data,
  }),
  addOperationInchargeSuccess: (task: any) => ({
    type: actionTypes.ADD_OPERATION_INCHARGE_SUCCESS,
    payload: task,
  }),
  addOperationInchargeFinish: (errorMsg: any) => ({
    type: actionTypes.ADD_OPERATION_INCHARGE_FINISH,
    payload: errorMsg,
  }),
  addOperationInchargeReset: () => ({
    type: actionTypes.ADD_OPERATION_INCHARGE_RESET,
  }),

  // update operation incharge

  updateOperationIncharge: (data: OperationInchargeModel, id: string) => ({
    type: actionTypes.UPDATE_OPERATION_INCHARGE_START,
    payload: {data, id},
  }),
  updateOperationInchargeSuccess: (task: any) => ({
    type: actionTypes.UPDATE_OPERATION_INCHARGE_SUCCESS,
    payload: task,
  }),
  updateOperationInchargeFinish: (errorMsg: any) => ({
    type: actionTypes.UPDATE_OPERATION_INCHARGE_FINISH,
    payload: errorMsg,
  }),
  updateOperationInchargeReset: () => ({
    type: actionTypes.UPDATE_OPERATION_INCHARGE_RESET,
  }),

  // DELETE operation incharge
  deleteOperationIncharge: (data: DeleteModel[]) => ({
    type: actionTypes.DELETE_OPERATION_INCHARGE_START,
    payload: {operationInchargeId: data},
  }),
  deleteOperationInchargeSuccess: (data: any) => ({
    type: actionTypes.DELETE_OPERATION_INCHARGE_SUCCESS,
    payload: data,
  }),
  deleteOperationInchargeFinish: (errorMsg: any) => ({
    type: actionTypes.DELETE_OPERATION_INCHARGE_FINISH,
    payload: errorMsg,
  }),
  // Active branchless banking
  activateOperationIncharge: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_ACTIVATE_OPERATION_INCHARGE_REQUEST,
    payload: {operationInchargeId: id},
  }),
  //  deactive branchless banking
  deactivateOperationIncharge: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_DEACTIVATE_OPERATION_INCHARGE_REQUEST,
    payload: {operationInchargeId: id},
  }),
  // single active branchless banking
  singleActivateOperationIncharge: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_ACTIVATE_OPERATION_INCHARGE_REQUEST,
    payload: {operationInchargeId: [id]},
  }),
  // single deactive branchless banking
  singleDeactivateOperationIncharge: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_DEACTIVATE_OPERATION_INCHARGE_REQUEST,
    payload: {operationInchargeId: [id]},
  }),

  // //Export file csv/slsx
  exportFile: (fileName: string, params: ParamsModel) => {
    return {
      type: actionTypes.EXPORT_FILE_START,
      payload: {fileName, params},
    }
  },

  exportFileSuccess: (data: IExportFileState) => ({
    type: actionTypes.EXPORT_FILE_SUCCESS,
    payload: data,
  }),
  exportFileError: (data: IExportFileState) => ({
    type: actionTypes.EXPORT_FILE_FINISH,
    payload: data,
  }),

  // IMPORT OPERATION_INCHARGE
  importOperationIncharge: (data: any) => ({
    type: actionTypes.IMPORT_OPERATION_INCHARGE_START,
    payload: data,
  }),
  importOperationInchargeSuccess: (task: any) => ({
    type: actionTypes.IMPORT_OPERATION_INCHARGE_SUCCESS,
    payload: task,
  }),
  importOperationInchargeFinish: () => ({
    type: actionTypes.IMPORT_OPERATION_INCHARGE_FINISH,
  }),
}
