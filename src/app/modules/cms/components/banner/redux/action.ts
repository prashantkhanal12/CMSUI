import {ParamsModel} from 'src/app/modules/common/Model'
import {BannerModel, DeleteBannerModel, SortBannerModel} from '../Model'
import {actionTypes} from './constants'
import {IBannerState} from './reducer'

export const actions = {
  // get Banner
  getBanner: (params: ParamsModel = {page: 1, limit: 10}) => {
    return {
      type: actionTypes.GET_BANNER_START,
      payload: {params},
    }
  },
  getBannerSuccess: (data: IBannerState) => ({
    type: actionTypes.GET_BANNER_SUCCESS,
    payload: data,
  }),
  getBannerError: (data: IBannerState) => ({
    type: actionTypes.GET_BANNER_FINISH,
    payload: data,
  }),

  // get Banner
  getAllBanner: () => {
    return {
      type: actionTypes.GET_ALL_BANNER_START,
    }
  },
  getAllBannerSuccess: (data: IBannerState) => ({
    type: actionTypes.GET_ALL_BANNER_SUCCESS,
    payload: data,
  }),
  getAllBannerError: () => ({
    type: actionTypes.GET_ALL_BANNER_FINISH,
  }),

  //Add Banner Action
  CreateBanner: (data: any) => ({
    type: actionTypes.ADD_BANNER_REQUEST,
    payload: data,
  }),

  createBannerSuccess: (task: any) => ({
    type: actionTypes.ADD_BANNER_SUCCESS,
    payload: task,
  }),
  createBannerFinish: (errorMsg: any) => ({
    type: actionTypes.ADD_BANNER_FINISH,
    payload: errorMsg,
  }),
  createBannerReset: () => ({
    type: actionTypes.ADD_BANNER_RESET,
  }),

  //Activate and Deactivate Bulk Banner
  activateBanner: (data: any) => ({type: actionTypes.ACTIVATE_BANNER_REQUEST, payload: {data}}),
  deactivateBanner: (data: any) => ({type: actionTypes.DEACTIVATE_BANNER_REQUEST, payload: {data}}),

  //Single Activate and Deactivate Banner
  singleActivateBanner: (data: any) => ({
    type: actionTypes.SINGLE_ACTIVATE_BANNER_REQUEST,
    payload: {data},
  }),

  singleDeactivateBanner: (data: any) => ({
    type: actionTypes.SINGLE_DEACTIVATE_BANNER_REQUEST,
    payload: {data},
  }),

  // update Banner
  updateBanner: (data: BannerModel, id: string) => ({
    type: actionTypes.UPDATE_BANNER_START,
    payload: {data, id},
  }),

  //delete and reset Banner
  deleteBanner: (data: DeleteBannerModel[]) => ({
    type: actionTypes.DELETE_BANNER_START,
    payload: {bannerId: data},
  }),

  // sort
  sortBanner: (data: SortBannerModel) => ({
    type: actionTypes.SORT_BANNER_START,
    payload: data,
  }),
  sortBannerSuccess: (data: Array<BannerModel>) => ({
    type: actionTypes.SORT_BANNER_SUCCESS,
    payload: data,
  }),
  sortBannerFinish: () => ({
    type: actionTypes.SORT_BANNER_FINISH,
  }),
  sortBannerReset: () => ({
    type: actionTypes.SORT_BANNER_RESET,
  }),
}
