import {ParamsModel} from 'src/app/modules/common/Model'
import {actionTypes} from './constants'
import {IGoldRateCategoryState} from './reducer'

export const actions = {
  getGoldRateCategory: (params: ParamsModel = {page: 1, limit: 10}) => {
    return {
      type: actionTypes.GET_GOLD_RATE_CATEGORY_START,
      payload: {params},
    }
  },

  getGoldRateCategorySuccess: (data: IGoldRateCategoryState) => ({
    type: actionTypes.GET_GOLD_RATE_CATEGORY_SUCCESS,
    payload: data,
  }),
  getGoldRateCategoryError: (data: IGoldRateCategoryState) => ({
    type: actionTypes.GET_GOLD_RATE_CATEGORY_FINISH,
    payload: data,
  }),
}
