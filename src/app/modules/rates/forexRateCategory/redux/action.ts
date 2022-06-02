import {ParamsModel} from 'src/app/modules/common/Model'
import {actionTypes} from './constants'
import {IForexRateCategoryState} from './reducer'

export const actions = {
  getForexRateCategory: (params: ParamsModel = {page: 1, limit: 10}) => {
    return {
      type: actionTypes.GET_FOREX_RATE_CATEGORY_START,
      payload: {params},
    }
  },

  getForexRateCategorySuccess: (data: IForexRateCategoryState) => ({
    type: actionTypes.GET_FOREX_RATE_CATEGORY_SUCCESS,
    payload: data,
  }),
  getForexRateCategoryError: (data: IForexRateCategoryState) => ({
    type: actionTypes.GET_FOREX_RATE_CATEGORY_FINISH,
    payload: data,
  }),
}
