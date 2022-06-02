import {ParamsModel} from 'src/app/modules/common/Model'
import {IExportFileState} from '../../branchless'
import {DeleteAtmModel, OptionModel} from '../Model'
import {AtmModel} from '../Model/AtmModel'
import {actionTypes} from './constants'
export const actions = {
  // get ATM DATA category
  getAtmData: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_ATM_DATA_START,
    payload: params,
  }),
  getAtmDataSuccess: (data: OptionModel) => ({
    type: actionTypes.GET_ATM_DATA_SUCCESS,
    payload: data,
  }),
  getAtmDataFinish: () => ({
    type: actionTypes.GET_ATM_DATA_FINISH,
  }),

  // create ATM
  addAtm: (data: AtmModel) => ({
    type: actionTypes.ADD_ATM_START,
    payload: data,
  }),
  addAtmSuccess: (task: any) => ({
    type: actionTypes.ADD_ATM_SUCCESS,
    payload: task,
  }),
  addAtmFinish: () => ({
    type: actionTypes.ADD_ATM_FINISH,
  }),
  resetAtm: () => ({
    type: actionTypes.RESET_ATM,
  }),

  //Update ATM
  updateAtm: (data: AtmModel, id: string) => ({
    type: actionTypes.UPDATE_ATM_START,
    payload: data,
    id,
  }),

  updateAtmSuccess: (data: AtmModel) => ({
    type: actionTypes.UPDATE_ATM_SUCCESS,
    payload: data,
  }),

  updateAtmFinish: () => ({
    type: actionTypes.UPDATE_ATM_FINISH,
  }),

  // delete Atm
  deleteAtm: (data: DeleteAtmModel[]) => ({
    type: actionTypes.DELETE_ATM_START,
    payload: {atm: data},
  }),
  deleteAtmSuccess: (data: any) => ({
    type: actionTypes.DELETE_ATM_SUCCESS,
    payload: data,
  }),
  deleteAtmFinish: () => ({
    type: actionTypes.DELETE_ATM_FINISH,
  }),

  // IMPORT Atm
  importAtm: (data: any) => ({
    type: actionTypes.IMPORT_ATM_START,
    payload: data,
  }),
  importAtmSuccess: (task: any) => ({
    type: actionTypes.IMPORT_ATM_SUCCESS,
    payload: task,
  }),
  importAtmFinish: () => ({
    type: actionTypes.IMPORT_ATM_FINISH,
  }),

  //Enable Atm
  enableAtm: (data: any) => ({type: actionTypes.ENABLE_ATM_REQUEST, payload: {data}}),

  enableAtmSuccess: (task: any) => ({
    type: actionTypes.ENABLE_ATM_SUCCESS,
    payload: task,
  }),
  enableAtmFinish: () => ({
    type: actionTypes.ENABLE_ATM_FINISH,
  }),

  //Disable Atm
  disableAtm: (data: any) => ({type: actionTypes.DISABLE_ATM_REQUEST, payload: {data}}),

  disableAtmSuccess: (task: any) => ({
    type: actionTypes.DISABLE_ATM_SUCCESS,
    payload: task,
  }),
  disableAtmFinish: () => ({
    type: actionTypes.DISABLE_ATM_FINISH,
  }),

  //Enable Atm
  singleEnableAtm: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_ATM_REQUEST,
    payload: {data},
  }),

  singleEnableAtmSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_ATM_SUCCESS,
    payload: task,
  }),
  singleEnableAtmFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_ATM_FINISH,
  }),

  //Disable Atm
  singleDisableAtm: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_ATM_REQUEST,
    payload: {data},
  }),

  singleDisableAtmSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_ATM_SUCCESS,
    payload: task,
  }),
  singleDisableAtmFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_ATM_FINISH,
  }),

  //Export file csv/slsx
  exportFile: (fileName: string, params: ParamsModel) => {
    return {
      type: actionTypes.EXPORT_ATM_FILE_START,
      payload: {fileName, params},
    }
  },

  exportFileSuccess: (data: IExportFileState) => ({
    type: actionTypes.EXPORT_ATM_FILE_SUCCESS,
    payload: data,
  }),
  exportFileError: () => ({
    type: actionTypes.EXPORT_ATM_FILE_FINISH,
  }),
}
