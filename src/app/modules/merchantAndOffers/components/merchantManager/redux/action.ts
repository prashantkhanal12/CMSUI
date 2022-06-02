import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteMerchantManagerModel, SortMerchantManagerModel} from '../Model'
import {MerchantManagerModel} from '../Model/MerchantManagerModel'
import {actionTypes} from './constants'
export const actions = {
  // get MerchantManager
  getAllMerchantManager: () => ({
    type: actionTypes.GET_ALL_MERCHANT_MANAGER_START,
  }),
  getAllMerchantManagerSuccess: (data: MerchantManagerModel) => ({
    type: actionTypes.GET_ALL_MERCHANT_MANAGER_SUCCESS,
    payload: data,
  }),
  getAllMerchantManagerFinish: () => ({
    type: actionTypes.GET_ALL_MERCHANT_MANAGER_FINISH,
  }),

  // get MerchantManager DATA
  getMerchantManager: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_MERCHANT_MANAGER_START,
    payload: params,
  }),
  getMerchantManagerSuccess: (data: MerchantManagerModel) => ({
    type: actionTypes.GET_MERCHANT_MANAGER_SUCCESS,
    payload: data,
  }),
  getMerchantManagerFinish: () => ({
    type: actionTypes.GET_MERCHANT_MANAGER_FINISH,
  }),

  // create key
  addMerchantManager: (data: MerchantManagerModel) => ({
    type: actionTypes.ADD_MERCHANT_MANAGER_START,
    payload: data,
  }),
  addMerchantManagerSuccess: (task: any) => ({
    type: actionTypes.ADD_MERCHANT_MANAGER_SUCCESS,
    payload: task,
  }),
  addMerchantManagerFinish: () => ({
    type: actionTypes.ADD_MERCHANT_MANAGER_FINISH,
  }),
  resetMerchantManager: () => ({
    type: actionTypes.RESET_MERCHANT_MANAGER,
  }),

  //Update MerchantManager
  updateMerchantManager: (data: MerchantManagerModel, id: string) => ({
    type: actionTypes.UPDATE_MERCHANT_MANAGER_START,
    payload: data,
    id,
  }),

  updateMerchantManagerSuccess: (data: MerchantManagerModel) => ({
    type: actionTypes.UPDATE_MERCHANT_MANAGER_SUCCESS,
    payload: data,
  }),

  updateMerchantManagerFinish: () => ({
    type: actionTypes.UPDATE_MERCHANT_MANAGER_FINISH,
  }),

  // delete key
  deleteMerchantManager: (data: DeleteMerchantManagerModel[]) => ({
    type: actionTypes.DELETE_MERCHANT_MANAGER_START,
    payload: {merchantId: data},
  }),
  deleteMerchantManagerSuccess: (data: any) => ({
    type: actionTypes.DELETE_MERCHANT_MANAGER_SUCCESS,
    payload: data,
  }),
  deleteMerchantManagerFinish: () => ({
    type: actionTypes.DELETE_MERCHANT_MANAGER_FINISH,
  }),

  //Enable MerchantManager
  enableMerchantManager: (data: any) => ({
    type: actionTypes.ENABLE_MERCHANT_MANAGER_REQUEST,
    payload: {data},
  }),

  enableMerchantManagerSuccess: (task: any) => ({
    type: actionTypes.ENABLE_MERCHANT_MANAGER_SUCCESS,
    payload: task,
  }),
  enableMerchantManagerFinish: () => ({
    type: actionTypes.ENABLE_MERCHANT_MANAGER_FINISH,
  }),

  //Disable MerchantManager
  disableMerchantManager: (data: any) => ({
    type: actionTypes.DISABLE_MERCHANT_MANAGER_REQUEST,
    payload: {data},
  }),

  disableMerchantManagerSuccess: (task: any) => ({
    type: actionTypes.DISABLE_MERCHANT_MANAGER_SUCCESS,
    payload: task,
  }),
  disableMerchantManagerFinish: () => ({
    type: actionTypes.DISABLE_MERCHANT_MANAGER_FINISH,
  }),

  //Enable MerchantManager
  singleEnableMerchantManager: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_MERCHANT_MANAGER_REQUEST,
    payload: {data},
  }),

  singleEnableMerchantManagerSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_MERCHANT_MANAGER_SUCCESS,
    payload: task,
  }),
  singleEnableMerchantManagerFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_MERCHANT_MANAGER_FINISH,
  }),

  //Disable MerchantManager
  singleDisableMerchantManager: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_MERCHANT_MANAGER_REQUEST,
    payload: {data},
  }),

  singleDisableMerchantManagerSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_MERCHANT_MANAGER_SUCCESS,
    payload: task,
  }),
  singleDisableMerchantManagerFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_MERCHANT_MANAGER_FINISH,
  }),

  // sort
  sortMerchantManager: (data: SortMerchantManagerModel) => ({
    type: actionTypes.SORT_MERCHANT_MANAGER_START,
    payload: data,
  }),
  sortMerchantManagerSuccess: (data: Array<MerchantManagerModel>) => ({
    type: actionTypes.SORT_MERCHANT_MANAGER_SUCCESS,
    payload: data,
  }),
  sortMerchantManagerFinish: () => ({
    type: actionTypes.SORT_MERCHANT_MANAGER_FINISH,
  }),
  sortMerchantManagerReset: () => ({
    type: actionTypes.SORT_MERCHANT_MANAGER_RESET,
  }),
}
