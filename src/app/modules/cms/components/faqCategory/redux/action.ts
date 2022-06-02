import {ParamsModel} from 'src/app/modules/common/Model'
import {
  FaqCategoryModel,
  DeleteFaqCategoryModel,
  SortFaqCategoryModel,
  FaqParamsModel,
} from '../Model'
import {actionTypes} from './constants'
import {IFaqCategoryState} from './reducer'

export const actions = {
  getAllFaqCategory: (params: FaqParamsModel = {}) => {
    return {
      type: actionTypes.GET_ALL_FAQ_CATEGORY_START,
      payload: params,
    }
  },

  getAllFaqCategorySuccess: (data: IFaqCategoryState) => ({
    type: actionTypes.GET_ALL_FAQ_CATEGORY_SUCCESS,
    payload: data,
  }),

  getAllFaqCategoryError: () => ({
    type: actionTypes.GET_ALL_FAQ_CATEGORY_FINISH,
  }),
  getFaqCategory: (params: ParamsModel = {page: 1, limit: 10}) => {
    return {
      type: actionTypes.GET_FAQ_CATEGORY_START,
      payload: {params},
    }
  },

  getFaqCategorySuccess: (data: IFaqCategoryState) => ({
    type: actionTypes.GET_FAQ_CATEGORY_SUCCESS,
    payload: data,
  }),

  getFaqCategoryError: (data: IFaqCategoryState) => ({
    type: actionTypes.GET_FAQ_CATEGORY_FINISH,
    payload: data,
  }),

  //Add faq Category
  CreateFaqCategory: (data: FaqCategoryModel) => ({
    type: actionTypes.ADD_FAQ_CATEGORY_REQUEST,
    payload: data,
  }),

  createFaqCategorySuccess: (task: any) => ({
    type: actionTypes.ADD_FAQ_CATEGORY_SUCCESS,
    payload: task,
  }),
  createFaqCategoryFinish: (errorMsg: any) => ({
    type: actionTypes.ADD_FAQ_CATEGORY_FINISH,
    payload: errorMsg,
  }),
  createFaqCategoryReset: () => ({
    type: actionTypes.ADD_FAQ_CATEGORY_RESET,
  }),

  //Activate and Deactivate Faq Category
  activateFaqCategory: (data: any) => ({
    type: actionTypes.ACTIVATE_FAQ_CATEGORY_REQUEST,
    payload: {data},
  }),
  deactivateFaqCategory: (data: any) => ({
    type: actionTypes.DEACTIVATE_FAQ_CATEGORY_REQUEST,
    payload: {data},
  }),

  //Single Activate and Deactivate RoadBlock Popup
  singleActivateFaqCategory: (data: any) => ({
    type: actionTypes.SINGLE_ACTIVATE_FAQ_CATEGORY_REQUEST,
    payload: {data},
  }),

  singleDeactivateFaqCategory: (data: any) => ({
    type: actionTypes.SINGLE_DEACTIVATE_FAQ_CATEGORY_REQUEST,
    payload: {data},
  }),

  // update RoadBlock Popup
  updateFaqCategory: (data: FaqCategoryModel, id: string) => ({
    type: actionTypes.UPDATE_FAQ_CATEGORY_START,
    payload: {data, id},
  }),

  //delete and reset RoadBlock Popup
  deleteFaqCategory: (data: DeleteFaqCategoryModel[]) => ({
    type: actionTypes.DELETE_FAQ_CATEGORY_START,
    payload: {faqCategoryId: data},
  }),

  // sort
  sortFaqCategory: (data: SortFaqCategoryModel | any) => ({
    type: actionTypes.SORT_FAQ_CATEGORY_START,
    payload: data,
  }),
  sortFaqCategorySuccess: (data: Array<FaqCategoryModel>) => ({
    type: actionTypes.SORT_FAQ_CATEGORY_SUCCESS,
    payload: data,
  }),
  sortFaqCategoryFinish: () => ({
    type: actionTypes.SORT_FAQ_CATEGORY_FINISH,
  }),
  sortFaqCategoryReset: () => ({
    type: actionTypes.SORT_FAQ_CATEGORY_RESET,
  }),
}
