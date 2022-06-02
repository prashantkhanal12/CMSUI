import {ParamsModel} from 'src/app/modules/common/Model'
import {ForexCategory} from '../Model'
import {actionTypes} from './constants'
import {IForexRateFileState, IForexRateState} from './reducer'

export const actions = {
  // get Forex Rate
  getForexRate: (params: ParamsModel = {page: 1, limit: 10}) => {
    return {
      type: actionTypes.GET_FOREX_RATE_START,
      payload: {params},
    }
  },

  getForexRateSuccess: (data: IForexRateState) => ({
    type: actionTypes.GET_FOREX_RATE_SUCCESS,
    payload: data,
  }),
  getForexRateError: (data: IForexRateState) => ({
    type: actionTypes.GET_FOREX_RATE_FINISH,
    payload: data,
  }),

  //Get forex rate file csv slsx
  getForexRateFile: (fileType: string = 'csv') => {
    return {
      type: actionTypes.GET_FOREX_RATE_FILE_START,
      payload: fileType,
    }
  },

  getForexRateFileSuccess: (data: IForexRateFileState) => ({
    type: actionTypes.GET_FOREX_RATE_FILE_SUCCESS,
    payload: data,
  }),
  getForexRateFileError: (data: IForexRateFileState) => ({
    type: actionTypes.GET_FOREX_RATE_FILE_FINISH,
    payload: data,
  }),

  // create Forex Rate
  CreateForexRate: (data: any) => ({
    type: actionTypes.CREATE_FOREX_RATE_START,
    payload: data,
  }),

  createForexRateSuccess: (task: any) => ({
    type: actionTypes.CREATE_FOREX_RATE_SUCCESS,
    payload: task,
  }),
  createForexRateFinish: (errorMsg: any) => ({
    type: actionTypes.CREATE_FOREX_RATE_FINISH,
    payload: errorMsg,
  }),
  createForexRateReset: () => ({
    type: actionTypes.CREATE_FOREX_RATE_RESET,
  }),

  //Activate deactivate
  activateForexRates: (data: any) => ({
    type: actionTypes.ACTIVATE_FOREX_RATE_REQUEST,
    payload: {data},
  }),

  singleActivateForexRate: (data: string) => ({
    type: actionTypes.SINGLE_ACTIVATE_FOREX_RATE_REQUEST,
    payload: data,
  }),

  singleDeactivateForexRate: (id: string) => ({
    type: actionTypes.SINGLE_DEACTIVATE_FOREX_RATE_REQUEST,
    payload: id,
  }),

  deactivateForexRate: (data: any) => ({
    type: actionTypes.DEACTIVATE_FOREX_RATE_REQUEST,
    payload: {data},
  }),

  // update UserRole
  updateForexRate: (data: any, id: string) => ({
    type: actionTypes.UPDATE_FOREX_RATE_START,
    payload: {data, id},
  }),
  updateForexRateSuccess: (task: any) => ({
    type: actionTypes.UPDATE_FOREX_RATE_SUCCESS,
    payload: task,
  }),
  updateForexRateFinish: (errorMsg: any) => ({
    type: actionTypes.UPDATE_FOREX_RATE_FINISH,
    payload: errorMsg,
  }),
  updateForexRateReset: () => ({
    type: actionTypes.UPDATE_FOREX_RATE_RESET,
  }),

  // IMPORT FOREX RATE
  importForexRate: (data: any) => ({
    type: actionTypes.IMPORT_FOREX_RATE_START,
    payload: data,
  }),
  importForexRateSuccess: (task: any) => ({
    type: actionTypes.IMPORT_FOREX_RATE_SUCCESS,
    payload: task,
  }),
  importForexRateFinish: () => ({
    type: actionTypes.IMPORT_FOREX_RATE_FINISH,
  }),

  //delete and reset Forex Rate
  deleteForexRate: (data: ForexCategory[]) => ({
    type: actionTypes.DELETE_FOREX_RATE_START,
    payload: {forexRateId: data},
  }),
}
