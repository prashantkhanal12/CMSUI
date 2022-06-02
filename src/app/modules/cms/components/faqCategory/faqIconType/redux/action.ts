import {ParamsModel} from 'src/app/modules/common/Model'
import {actionTypes} from './constants'
import {IFaqIconTypeState} from './reducer'

export const actions = {
  getFaqIconType: (params: ParamsModel = {page: 1, limit: 10}) => {
    return {
      type: actionTypes.GET_FAQ_ICON_TYPE_START,
      payload: {params},
    }
  },

  getFaqIconTypeSuccess: (data: IFaqIconTypeState) => ({
    type: actionTypes.GET_FAQ_ICON_TYPE_SUCCESS,
    payload: data,
  }),

  getFaqIconTypeError: (data: IFaqIconTypeState) => ({
    type: actionTypes.GET_FAQ_ICON_TYPE_FINISH,
    payload: data,
  }),
}
