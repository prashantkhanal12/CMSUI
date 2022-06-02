import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteModel, OptionModel} from '../Model'
import {actionTypes} from './constants'
// import {INewsState} from './reducer'
// import {NewsModel} from '../Model/NewsModel'
export const actions = {
  // GET NEWS
  getNews: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_NEWS_START,
    payload: params,
  }),

  getNewsSuccess: (data: any) => ({
    type: actionTypes.GET_NEWS_SUCCESS,
    payload: data,
  }),
  getNewsFinish: () => ({
    type: actionTypes.GET_NEWS_FINISH,
  }),
  getNewsError: (error: unknown) => ({
    type: actionTypes.GET_NEWS_FINISH,
    payload: {error},
  }),

  // create NEWS
  addNews: (data: any) => ({
    type: actionTypes.ADD_NEWS_START,
    payload: data,
  }),
  addNewsSuccess: (task: any) => ({
    type: actionTypes.ADD_NEWS_SUCCESS,
    payload: task,
  }),
  addNewsFinish: () => ({
    type: actionTypes.ADD_NEWS_FINISH,
  }),
  addNewsReset: () => ({
    type: actionTypes.ADD_NEWS_RESET,
  }),

  // update NEWS

  updateNews: (data: any, id: string) => ({
    type: actionTypes.UPDATE_NEWS_START,
    payload: {data, id},
  }),
  updateNewsSuccess: (task: any) => ({
    type: actionTypes.UPDATE_NEWS_SUCCESS,
    payload: task,
  }),
  updateNewsFinish: () => ({
    type: actionTypes.UPDATE_NEWS_FINISH,
  }),
  updateNewsReset: () => ({
    type: actionTypes.UPDATE_NEWS_RESET,
  }),

  // DELETE NEWS
  deleteNews: (data: DeleteModel[]) => ({
    type: actionTypes.DELETE_NEWS_START,
    payload: {newsId: data},
  }),
  deleteNewsSuccess: (data: any) => ({
    type: actionTypes.DELETE_NEWS_SUCCESS,
    payload: data,
  }),
  deleteNewsFinish: () => ({
    type: actionTypes.DELETE_NEWS_FINISH,
  }),
  // Active NEWS
  activateNews: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_ACTIVATE_NEWS_REQUEST,
    payload: {newsId: id},
  }),
  //  deactive NEWS
  deactivateNews: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_DEACTIVATE_NEWS_REQUEST,
    payload: {newsId: id},
  }),
  // single active NEWS
  singleActivateNews: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_ACTIVATE_NEWS_REQUEST,
    payload: {newsId: [id]},
  }),
  // single deactive NEWS
  singleDeactivateNews: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_DEACTIVATE_NEWS_REQUEST,
    payload: {newsId: [id]},
  }),
}
