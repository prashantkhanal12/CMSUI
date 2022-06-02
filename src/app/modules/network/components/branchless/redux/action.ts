import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteModel, OptionModel} from '../Model'
import {actionTypes} from './constants'
import {IBranchlessState, IExportFileState} from './reducer'
import {BranchlessModel} from './../Model/BranchlessModel'
export const actions = {
  // GET BRANCHLESS BANKING
  getBranchlessBanking: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_BRANCHLESS_BANKING_START,
    payload: params,
  }),

  getBranchlessBankingSuccess: (data: any) => ({
    type: actionTypes.GET_BRANCHLESS_BANKING_SUCCESS,
    payload: data,
  }),
  getBranchlessBankingError: (error: unknown) => ({
    type: actionTypes.GET_BRANCHLESS_BANKING_FINISH,
    payload: {error},
  }),

  // create branchless banking
  addBranchlessBanking: (data: BranchlessModel) => ({
    type: actionTypes.ADD_BRANCHLESS_BANKING_START,
    payload: data,
  }),
  addBranchlessBankingSuccess: (task: any) => ({
    type: actionTypes.ADD_BRANCHLESS_BANKING_SUCCESS,
    payload: task,
  }),
  addBranchlessBankingFinish: (errorMsg: any) => ({
    type: actionTypes.ADD_BRANCHLESS_BANKING_FINISH,
    payload: errorMsg,
  }),
  addBranchlessBankingReset: () => ({
    type: actionTypes.ADD_BRANCHLESS_BANKING_RESET,
  }),

  // update branchless banking

  updateBranchlessBanking: (data: BranchlessModel, id: string) => ({
    type: actionTypes.UPDATE_BRANCHLESS_BANKING_START,
    payload: {data, id},
  }),
  updateBranchlessBankingSuccess: (task: any) => ({
    type: actionTypes.UPDATE_BRANCHLESS_BANKING_SUCCESS,
    payload: task,
  }),
  updateBranchlessBankingFinish: (errorMsg: any) => ({
    type: actionTypes.UPDATE_BRANCHLESS_BANKING_FINISH,
    payload: errorMsg,
  }),
  updateBranchlessBankingReset: () => ({
    type: actionTypes.UPDATE_BRANCHLESS_BANKING_RESET,
  }),

  // UPDATE branchless banking
  deleteBranchlessBanking: (data: DeleteModel[]) => ({
    type: actionTypes.DELETE_BRANCHLESS_BANKING_START,
    payload: {branchlessBankingId: data},
  }),
  deleteBranchlessBankingSuccess: (data: any) => ({
    type: actionTypes.DELETE_BRANCHLESS_BANKING_SUCCESS,
    payload: data,
  }),
  deleteBranchlessBankingFinish: (errorMsg: any) => ({
    type: actionTypes.DELETE_BRANCHLESS_BANKING_FINISH,
    payload: errorMsg,
  }),
  // single active branchless banking
  singleActivateBranchlessBanking: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_ACTIVATE_BRANCHLESS_BANKING_REQUEST,
    payload: {branchlessBankingId: [id]},
  }),
  // single deactive branchless banking
  singleDeactivateBranchlessBanking: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_DEACTIVATE_BRANCHLESS_BANKING_REQUEST,
    payload: {branchlessBankingId: [id]},
  }),

  //Export file csv/slsx
  exportFile: (fileName: string, params: ParamsModel) => {
    return {
      type: actionTypes.EXPORT_BRANCHLESS_FILE_START,
      payload: {fileName, params},
    }
  },

  exportFileSuccess: (data: IExportFileState) => ({
    type: actionTypes.EXPORT_BRANCHLESS_FILE_SUCCESS,
    payload: data,
  }),
  exportFileError: (data: IExportFileState) => ({
    type: actionTypes.EXPORT_BRANCHLESS_FILE_FINISH,
    payload: data,
  }),
}
