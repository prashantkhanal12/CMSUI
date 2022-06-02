import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteOfferManagerModel, SortOfferManagerModel} from '../Model'
import {OfferManagerModel} from '../Model/OfferManagerModel'
import {actionTypes} from './constants'
export const actions = {
  // get Offer
  getAllOffer: () => ({
    type: actionTypes.GET_ALL_OFFER_START,
  }),
  getAllOfferSuccess: (data: OfferManagerModel) => ({
    type: actionTypes.GET_ALL_OFFER_SUCCESS,
    payload: data,
  }),
  getAllOfferFinish: () => ({
    type: actionTypes.GET_ALL_OFFER_FINISH,
  }),

  // get DiscountType DATA
  getDiscountType: () => ({
    type: actionTypes.GET_DISCOUNT_TYPE_START,
  }),
  getDiscountTypeSuccess: (data: {[key: string]: string}) => ({
    type: actionTypes.GET_DISCOUNT_TYPE_SUCCESS,
    payload: data,
  }),
  getDiscountTypeFinish: () => ({
    type: actionTypes.GET_DISCOUNT_TYPE_FINISH,
  }),

  // get Offer DATA
  getOffer: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_OFFER_START,
    payload: params,
  }),
  getOfferSuccess: (data: OfferManagerModel) => ({
    type: actionTypes.GET_OFFER_SUCCESS,
    payload: data,
  }),
  getOfferFinish: () => ({
    type: actionTypes.GET_OFFER_FINISH,
  }),

  // create key
  addOffer: (data: OfferManagerModel | any) => ({
    type: actionTypes.ADD_OFFER_START,
    payload: data,
  }),
  addOfferSuccess: (task: any) => ({
    type: actionTypes.ADD_OFFER_SUCCESS,
    payload: task,
  }),
  addOfferFinish: () => ({
    type: actionTypes.ADD_OFFER_FINISH,
  }),
  resetOffer: () => ({
    type: actionTypes.RESET_OFFER,
  }),

  //Update Offer
  updateOffer: (data: OfferManagerModel | any, id: string) => ({
    type: actionTypes.UPDATE_OFFER_START,
    payload: data,
    id,
  }),

  updateOfferSuccess: (data: OfferManagerModel) => ({
    type: actionTypes.UPDATE_OFFER_SUCCESS,
    payload: data,
  }),

  updateOfferFinish: () => ({
    type: actionTypes.UPDATE_OFFER_FINISH,
  }),

  // delete key
  deleteOffer: (data: DeleteOfferManagerModel[]) => ({
    type: actionTypes.DELETE_OFFER_START,
    payload: {offerId: data},
  }),
  deleteOfferSuccess: (data: any) => ({
    type: actionTypes.DELETE_OFFER_SUCCESS,
    payload: data,
  }),
  deleteOfferFinish: () => ({
    type: actionTypes.DELETE_OFFER_FINISH,
  }),

  //Enable Offer
  enableOffer: (data: any) => ({
    type: actionTypes.ENABLE_OFFER_REQUEST,
    payload: {data},
  }),

  enableOfferSuccess: (task: any) => ({
    type: actionTypes.ENABLE_OFFER_SUCCESS,
    payload: task,
  }),
  enableOfferFinish: () => ({
    type: actionTypes.ENABLE_OFFER_FINISH,
  }),

  //Disable Offer
  disableOffer: (data: any) => ({
    type: actionTypes.DISABLE_OFFER_REQUEST,
    payload: {data},
  }),

  disableOfferSuccess: (task: any) => ({
    type: actionTypes.DISABLE_OFFER_SUCCESS,
    payload: task,
  }),
  disableOfferFinish: () => ({
    type: actionTypes.DISABLE_OFFER_FINISH,
  }),

  //Enable Offer
  singleEnableOffer: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_OFFER_REQUEST,
    payload: {data},
  }),

  singleEnableOfferSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_OFFER_SUCCESS,
    payload: task,
  }),
  singleEnableOfferFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_OFFER_FINISH,
  }),

  //Disable Offer
  singleDisableOffer: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_OFFER_REQUEST,
    payload: {data},
  }),

  singleDisableOfferSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_OFFER_SUCCESS,
    payload: task,
  }),
  singleDisableOfferFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_OFFER_FINISH,
  }),

  // sort
  sortOfferManager: (data: SortOfferManagerModel) => ({
    type: actionTypes.SORT_OFFER_MANAGER_START,
    payload: data,
  }),
  sortOfferManagerSuccess: (data: Array<OfferManagerModel>) => ({
    type: actionTypes.SORT_OFFER_MANAGER_SUCCESS,
    payload: data,
  }),
  sortOfferManagerFinish: () => ({
    type: actionTypes.SORT_OFFER_MANAGER_FINISH,
  }),
  sortOfferManagerReset: () => ({
    type: actionTypes.SORT_OFFER_MANAGER_RESET,
  }),
}
