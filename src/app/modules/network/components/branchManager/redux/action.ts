import {ParamsModel} from 'src/app/modules/common/Model'
import {IExportFileState} from '../../branchless'
import {DeleteBranchManagerModel, OptionModel} from '../Model'
import {BranchManagerModel} from '../Model/BranchManagerModel'
import {actionTypes} from './constants'
export const actions = {
  // get BranchManager DATA category
  getBranchManagerData: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_BRANCH_MANAGER_DATA_START,
    payload: params,
  }),
  getBranchManagerDataSuccess: (data: OptionModel) => ({
    type: actionTypes.GET_BRANCH_MANAGER_DATA_SUCCESS,
    payload: data,
  }),
  getBranchManagerDataFinish: () => ({
    type: actionTypes.GET_BRANCH_MANAGER_DATA_FINISH,
  }),

  // create BranchManager
  addBranchManager: (data: BranchManagerModel) => ({
    type: actionTypes.ADD_BRANCH_MANAGER_START,
    payload: data,
  }),
  addBranchManagerSuccess: (task: any) => ({
    type: actionTypes.ADD_BRANCH_MANAGER_SUCCESS,
    payload: task,
  }),
  addBranchManagerFinish: () => ({
    type: actionTypes.ADD_BRANCH_MANAGER_FINISH,
  }),
  resetBranchManager: () => ({
    type: actionTypes.RESET_BRANCH_MANAGER,
  }),

  //Update BranchManager
  updateBranchManager: (data: BranchManagerModel, id: string) => ({
    type: actionTypes.UPDATE_BRANCH_MANAGER_START,
    payload: data,
    id,
  }),

  updateBranchManagerSuccess: (data: BranchManagerModel) => ({
    type: actionTypes.UPDATE_BRANCH_MANAGER_SUCCESS,
    payload: data,
  }),

  updateBranchManagerFinish: () => ({
    type: actionTypes.UPDATE_BRANCH_MANAGER_FINISH,
  }),

  // delete BranchManager
  deleteBranchManager: (data: DeleteBranchManagerModel[]) => ({
    type: actionTypes.DELETE_BRANCH_MANAGER_START,
    payload: {manager: data},
  }),
  deleteBranchManagerSuccess: (data: any) => ({
    type: actionTypes.DELETE_BRANCH_MANAGER_SUCCESS,
    payload: data,
  }),
  deleteBranchManagerFinish: () => ({
    type: actionTypes.DELETE_BRANCH_MANAGER_FINISH,
  }),

  // IMPORT BranchManager
  importBranchManager: (data: any) => ({
    type: actionTypes.IMPORT_BRANCH_MANAGER_START,
    payload: data,
  }),
  importBranchManagerSuccess: (task: any) => ({
    type: actionTypes.IMPORT_BRANCH_MANAGER_SUCCESS,
    payload: task,
  }),
  importBranchManagerFinish: () => ({
    type: actionTypes.IMPORT_BRANCH_MANAGER_FINISH,
  }),

  //Enable BranchManager
  enableBranchManager: (data: any) => ({
    type: actionTypes.ENABLE_BRANCH_MANAGER_REQUEST,
    payload: {data},
  }),

  enableBranchManagerSuccess: (task: any) => ({
    type: actionTypes.ENABLE_BRANCH_MANAGER_SUCCESS,
    payload: task,
  }),
  enableBranchManagerFinish: () => ({
    type: actionTypes.ENABLE_BRANCH_MANAGER_FINISH,
  }),

  //Disable BranchManager
  disableBranchManager: (data: any) => ({
    type: actionTypes.DISABLE_BRANCH_MANAGER_REQUEST,
    payload: {data},
  }),

  disableBranchManagerSuccess: (task: any) => ({
    type: actionTypes.DISABLE_BRANCH_MANAGER_SUCCESS,
    payload: task,
  }),
  disableBranchManagerFinish: () => ({
    type: actionTypes.DISABLE_BRANCH_MANAGER_FINISH,
  }),

  //Enable BranchManager
  singleEnableBranchManager: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_BRANCH_MANAGER_REQUEST,
    payload: {data},
  }),

  singleEnableBranchManagerSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_BRANCH_MANAGER_SUCCESS,
    payload: task,
  }),
  singleEnableBranchManagerFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_BRANCH_MANAGER_FINISH,
  }),

  //Disable BranchManager
  singleDisableBranchManager: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_BRANCH_MANAGER_REQUEST,
    payload: {data},
  }),

  singleDisableBranchManagerSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_BRANCH_MANAGER_SUCCESS,
    payload: task,
  }),
  singleDisableBranchManagerFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_BRANCH_MANAGER_FINISH,
  }),

  //Export file csv/slsx
  exportFile: (fileName: string, params: ParamsModel) => {
    return {
      type: actionTypes.EXPORT_BRANCH_MANAGER_FILE_START,
      payload: {fileName, params},
    }
  },

  exportFileSuccess: (data: IExportFileState) => ({
    type: actionTypes.EXPORT_BRANCH_MANAGER_FILE_SUCCESS,
    payload: data,
  }),
  exportFileError: () => ({
    type: actionTypes.EXPORT_BRANCH_MANAGER_FILE_FINISH,
  }),

  exportTemplateFile: () => {
    return {
      type: actionTypes.EXPORT_BRANCH_MANAGER_TEMPLATE_FILE_START,
    }
  },

  exportTemplateFileSuccess: (data: IExportFileState) => ({
    type: actionTypes.EXPORT_BRANCH_MANAGER_TEMPLATE_FILE_SUCCESS,
    payload: data,
  }),
  exportTemplateFileError: () => ({
    type: actionTypes.EXPORT_BRANCH_MANAGER_TEMPLATE_FILE_FINISH,
  }),
}
