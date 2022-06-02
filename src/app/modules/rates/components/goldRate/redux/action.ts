import {ParamsModel} from 'src/app/modules/common/Model'
import {GoldCategory, GoldRateModel} from '../Model'
import {actionTypes} from './constants'
import {IGoldRateFileState, IGoldRateState} from './reducer'

export const actions = {
  // get GOLDRATE
  getGoldRate: (params: ParamsModel = {page: 1, limit: 10}) => {
    return {
      type: actionTypes.GET_GOLD_RATE_START,
      payload: {params},
    }
  },

  getGoldRateSuccess: (data: IGoldRateState) => ({
    type: actionTypes.GET_GOLD_RATE_SUCCESS,
    payload: data,
  }),
  getGoldRateError: () => ({
    type: actionTypes.GET_GOLD_RATE_FINISH,
  }),

  //Get gold rate file csv slsx
  getGoldRateFile: (fileType: string = 'csv') => {
    return {
      type: actionTypes.GET_GOLD_RATE_FILE_START,
      payload: fileType,
    }
  },

  getGoldRateFileSuccess: (data: IGoldRateFileState) => ({
    type: actionTypes.GET_GOLD_RATE_FILE_SUCCESS,
    payload: data,
  }),
  getGoldRateFileError: () => ({
    type: actionTypes.GET_GOLD_RATE_FILE_FINISH,
  }),

  // create GOLDRATE
  CreateGoldRate: (data: any) => ({
    type: actionTypes.CREATE_GOLD_RATE_START,
    payload: data,
  }),

  createGoldRateSuccess: (task: any) => ({
    type: actionTypes.CREATE_GOLD_RATE_SUCCESS,
    payload: task,
  }),
  createGoldRateFinish: (errorMsg: any) => ({
    type: actionTypes.CREATE_GOLD_RATE_FINISH,
    payload: errorMsg,
  }),
  createGoldRateReset: () => ({
    type: actionTypes.CREATE_GOLD_RATE_RESET,
  }),

  //Activate deactivate
  activateGoldRates: (data: any) => ({
    type: actionTypes.ACTIVATE_GOLD_RATE_REQUEST,
    payload: {data},
  }),

  singleActivateGoldRate: (data: string) => ({
    type: actionTypes.SINGLE_ACTIVATE_GOLD_RATE_REQUEST,
    payload: data,
  }),

  singleDeactivateGoldRate: (id: string) => ({
    type: actionTypes.SINGLE_DEACTIVATE_GOLD_RATE_REQUEST,
    payload: id,
  }),

  deactivateGoldRate: (data: any) => ({
    type: actionTypes.DEACTIVATE_GOLD_RATE_REQUEST,
    payload: {data},
  }),

  // IMPORT GOLD RATE
  importGoldRate: (data: any) => ({
    type: actionTypes.IMPORT_GOLD_RATE_START,
    payload: data,
  }),
  importGoldRateSuccess: (task: any) => ({
    type: actionTypes.IMPORT_GOLD_RATE_SUCCESS,
    payload: task,
  }),
  importGoldRateFinish: () => ({
    type: actionTypes.IMPORT_GOLD_RATE_FINISH,
  }),

  // update GOLDRATE
  updateGoldRate: (data: any, id: string) => ({
    type: actionTypes.UPDATE_GOLD_RATE_START,
    payload: {data, id},
  }),
  updateGoldRateSuccess: (task: any) => ({
    type: actionTypes.UPDATE_GOLD_RATE_SUCCESS,
    payload: task,
  }),
  updateGoldRateFinish: (errorMsg: any) => ({
    type: actionTypes.UPDATE_GOLD_RATE_FINISH,
    payload: errorMsg,
  }),
  updateGoldRateReset: () => ({
    type: actionTypes.UPDATE_GOLD_RATE_RESET,
  }),

  //delete and reset
  deleteGoldRate: (data: GoldCategory[]) => ({
    type: actionTypes.DELETE_GOLD_RATE_START,
    payload: {goldRateId: data},
  }),
}
