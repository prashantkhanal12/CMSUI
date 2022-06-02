import {ParamsModel} from 'src/app/modules/common/Model'
import {IExportFileState} from '../../branchless'
import {DeleteBranchModel, OptionModel} from '../Model'
import {BranchModel} from '../Model/BranchModel'
import {actionTypes} from './constants'
import {IBranchState} from './reducer'
export const actions = {
  // get branch category
  getBranchCategory: () => ({
    type: actionTypes.GET_BRANCH_CATEGORY_START,
  }),
  getBranchCategorySuccess: (data: OptionModel) => ({
    type: actionTypes.GET_BRANCH_CATEGORY_SUCCESS,
    payload: data,
  }),
  getBranchCategoryFinish: () => ({
    type: actionTypes.GET_BRANCH_CATEGORY_FINISH,
  }),

  // get EXTENDED HOUR category
  getExtendedHour: () => ({
    type: actionTypes.GET_EXTENDED_HOURS_START,
  }),
  getExtendedHourSuccess: (data: OptionModel) => ({
    type: actionTypes.GET_EXTENDED_HOURS_SUCCESS,
    payload: data,
  }),
  getExtendedHourFinish: () => ({
    type: actionTypes.GET_EXTENDED_HOURS_FINISH,
  }),

  // get BRANCH DATA category
  getBranchData: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_BRANCH_DATA_START,
    payload: params,
  }),
  getBranchDataSuccess: (data: OptionModel) => ({
    type: actionTypes.GET_BRANCH_DATA_SUCCESS,
    payload: data,
  }),
  getBranchDataFinish: () => ({
    type: actionTypes.GET_BRANCH_DATA_FINISH,
  }),

  // get EXTENDED HOUR category
  getAllBranchList: () => ({
    type: actionTypes.GET_ALL_BRANCH_DATA_START,
  }),
  getAllBranchListSuccess: (data: OptionModel) => ({
    type: actionTypes.GET_ALL_BRANCH_DATA_SUCCESS,
    payload: data,
  }),
  getAllBranchListFinish: () => ({
    type: actionTypes.GET_ALL_BRANCH_DATA_FINISH,
  }),

  // create key
  addBranch: (data: BranchModel) => ({
    type: actionTypes.ADD_BRANCH_START,
    payload: data,
  }),
  addBranchSuccess: (task: any) => ({
    type: actionTypes.ADD_BRANCH_SUCCESS,
    payload: task,
  }),
  addBranchFinish: () => ({
    type: actionTypes.ADD_BRANCH_FINISH,
  }),
  resetBranch: () => ({
    type: actionTypes.RESET_BRANCH,
  }),

  //Update BRANCH
  updateBranch: (data: BranchModel, id: string) => ({
    type: actionTypes.UPDATE_BRANCH_START,
    payload: data,
    id,
  }),

  updateBranchSuccess: (data: BranchModel) => ({
    type: actionTypes.UPDATE_BRANCH_SUCCESS,
    payload: data,
  }),

  updateBranchFinish: () => ({
    type: actionTypes.UPDATE_BRANCH_FINISH,
  }),

  // delete key
  deleteBranch: (data: DeleteBranchModel[]) => ({
    type: actionTypes.DELETE_BRANCH_START,
    payload: {branchId: data},
  }),
  deleteBranchSuccess: (data: any) => ({
    type: actionTypes.DELETE_BRANCH_SUCCESS,
    payload: data,
  }),
  deleteBranchFinish: () => ({
    type: actionTypes.DELETE_BRANCH_FINISH,
  }),

  // IMPORT BRANCH
  importBranch: (data: any) => ({
    type: actionTypes.IMPORT_BRANCH_START,
    payload: data,
  }),
  importBranchSuccess: (task: any) => ({
    type: actionTypes.IMPORT_BRANCH_SUCCESS,
    payload: task,
  }),
  importBranchFinish: () => ({
    type: actionTypes.IMPORT_BRANCH_FINISH,
  }),

  //Enable Branch
  enableBranch: (data: any) => ({type: actionTypes.ENABLE_BRANCH_REQUEST, payload: {data}}),

  enableBranchSuccess: (task: any) => ({
    type: actionTypes.ENABLE_BRANCH_SUCCESS,
    payload: task,
  }),
  enableBranchFinish: () => ({
    type: actionTypes.ENABLE_BRANCH_FINISH,
  }),

  //Disable Branch
  disableBranch: (data: any) => ({type: actionTypes.DISABLE_BRANCH_REQUEST, payload: {data}}),

  disableBranchSuccess: (task: any) => ({
    type: actionTypes.DISABLE_BRANCH_SUCCESS,
    payload: task,
  }),
  disableBranchFinish: () => ({
    type: actionTypes.DISABLE_BRANCH_FINISH,
  }),

  //Enable Branch
  singleEnableBranch: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_BRANCH_REQUEST,
    payload: {data},
  }),

  singleEnableBranchSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_BRANCH_SUCCESS,
    payload: task,
  }),
  singleEnableBranchFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_BRANCH_FINISH,
  }),

  //Disable Branch
  singleDisableBranch: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_BRANCH_REQUEST,
    payload: {data},
  }),

  singleDisableBranchSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_BRANCH_SUCCESS,
    payload: task,
  }),
  singleDisableBranchFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_BRANCH_FINISH,
  }),

  //Export file csv
  exportFile: (fileName: string, params: ParamsModel) => {
    return {
      type: actionTypes.EXPORT_BRANCH_FILE_START,
      payload: {fileName, params},
    }
  },

  exportFileSuccess: (data: IExportFileState) => ({
    type: actionTypes.EXPORT_BRANCH_FILE_SUCCESS,
    payload: data,
  }),
  exportFileError: () => ({
    type: actionTypes.EXPORT_BRANCH_FILE_FINISH,
  }),

  //Export Template
  exportTemplateFile: () => {
    return {
      type: actionTypes.EXPORT_BRANCH_TEMPLATE_FILE_START,
    }
  },

  exportTemplateFileSuccess: (data: any) => ({
    type: actionTypes.EXPORT_BRANCH_TEMPLATE_FILE_SUCCESS,
    payload: data,
  }),
  exportTemplateFileFinish: () => ({
    type: actionTypes.EXPORT_BRANCH_TEMPLATE_FILE_FINISH,
  }),
}
