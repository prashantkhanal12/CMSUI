import {ParamsModel} from 'src/app/modules/common/Model'
import {FaqManagerModel} from '../Model'
import {actionTypes} from './constants'
import {IFaqManagerState} from './reducer'

export const actions = {
  getFaqManager: (params: ParamsModel = {page: 1, limit: 10}, id: string = '') => {
    return {
      type: actionTypes.GET_FAQ_MANAGER_START,
      payload: {params, id},
    }
  },

  getFaqManagerSuccess: (data: IFaqManagerState) => ({
    type: actionTypes.GET_FAQ_MANAGER_SUCCESS,
    payload: data,
  }),

  getFaqManagerError: (data: IFaqManagerState) => ({
    type: actionTypes.GET_FAQ_MANAGER_FINISH,
    payload: data,
  }),

  //Add faq Manager
  CreateFaqManger: (data: FaqManagerModel) => ({
    type: actionTypes.ADD_FAQ_MANAGER_REQUEST,
    payload: data,
  }),

  createFaqManagerSuccess: (task: any) => ({
    type: actionTypes.ADD_FAQ_MANAGER_SUCCESS,
    payload: task,
  }),
  createFaqManagerFinish: (errorMsg: any) => ({
    type: actionTypes.ADD_FAQ_MANAGER_FINISH,
    payload: errorMsg,
  }),
  createFaqManagerReset: () => ({
    type: actionTypes.ADD_FAQ_MANAGER_RESET,
  }),

  /*  updateFaqManager: (data: FaqManagerModel, id: string) => ({
    type: actionTypes.UPDATE_FAQ_MANAGER_START,
    payload: {data, id},
  }), */
  // update Faq Manager
  updateFaqManager: (data: FaqManagerModel, id: string) => ({
    type: actionTypes.UPDATE_FAQ_MANAGER_START,
    payload: {data, id},
  }),

  /*  deleteFaqCategory: (data: DeleteFaqCategoryModel[]) => ({
    type: actionTypes.DELETE_FAQ_CATEGORY_START,
    payload: {faqCategoryId: data},
  }), */
}
