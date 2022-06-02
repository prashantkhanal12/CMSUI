import {ParamsModel} from 'src/app/modules/common/Model'
import {actionTypes} from './constants'
export const actions = {
  // get FormsDownload
  getAllFormsDownload: () => ({
    type: actionTypes.GET_ALL_FORMS_DOWNLOAD_START,
  }),
  getAllFormsDownloadSuccess: (data: any) => ({
    type: actionTypes.GET_ALL_FORMS_DOWNLOAD_SUCCESS,
    payload: data,
  }),
  getAllFormsDownloadFinish: () => ({
    type: actionTypes.GET_ALL_FORMS_DOWNLOAD_FINISH,
  }),

  // get FormsDownload DATA
  getFormsDownload: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_FORMS_DOWNLOAD_START,
    payload: params,
  }),
  getFormsDownloadSuccess: (data: any) => ({
    type: actionTypes.GET_FORMS_DOWNLOAD_SUCCESS,
    payload: data,
  }),
  getFormsDownloadFinish: () => ({
    type: actionTypes.GET_FORMS_DOWNLOAD_FINISH,
  }),

  // create key
  addFormsDownload: (data: any) => ({
    type: actionTypes.ADD_FORMS_DOWNLOAD_START,
    payload: data,
  }),
  addFormsDownloadSuccess: (task: any) => ({
    type: actionTypes.ADD_FORMS_DOWNLOAD_SUCCESS,
    payload: task,
  }),
  addFormsDownloadFinish: () => ({
    type: actionTypes.ADD_FORMS_DOWNLOAD_FINISH,
  }),
  resetFormsDownload: () => ({
    type: actionTypes.RESET_FORMS_DOWNLOAD,
  }),

  //Update FormsDownload
  updateFormsDownload: (data: any, id: string) => ({
    type: actionTypes.UPDATE_FORMS_DOWNLOAD_START,
    payload: data,
    id,
  }),

  updateFormsDownloadSuccess: (data: any) => ({
    type: actionTypes.UPDATE_FORMS_DOWNLOAD_SUCCESS,
    payload: data,
  }),

  updateFormsDownloadFinish: () => ({
    type: actionTypes.UPDATE_FORMS_DOWNLOAD_FINISH,
  }),

  // delete key
  deleteFormsDownload: (data: any) => ({
    type: actionTypes.DELETE_FORMS_DOWNLOAD_START,
    payload: {downloadId: data},
  }),
  deleteFormsDownloadSuccess: (data: any) => ({
    type: actionTypes.DELETE_FORMS_DOWNLOAD_SUCCESS,
    payload: data,
  }),
  deleteFormsDownloadFinish: () => ({
    type: actionTypes.DELETE_FORMS_DOWNLOAD_FINISH,
  }),

  //Enable FormsDownload
  enableFormsDownload: (data: any) => ({
    type: actionTypes.ENABLE_FORMS_DOWNLOAD_REQUEST,
    payload: {data},
  }),

  enableFormsDownloadSuccess: (task: any) => ({
    type: actionTypes.ENABLE_FORMS_DOWNLOAD_SUCCESS,
    payload: task,
  }),
  enableFormsDownloadFinish: () => ({
    type: actionTypes.ENABLE_FORMS_DOWNLOAD_FINISH,
  }),

  //Disable FormsDownload
  disableFormsDownload: (data: any) => ({
    type: actionTypes.DISABLE_FORMS_DOWNLOAD_REQUEST,
    payload: {data},
  }),

  disableFormsDownloadSuccess: (task: any) => ({
    type: actionTypes.DISABLE_FORMS_DOWNLOAD_SUCCESS,
    payload: task,
  }),
  disableFormsDownloadFinish: () => ({
    type: actionTypes.DISABLE_FORMS_DOWNLOAD_FINISH,
  }),

  //Enable FormsDownload
  singleEnableFormsDownload: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_FORMS_DOWNLOAD_REQUEST,
    payload: {data},
  }),

  singleEnableFormsDownloadSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_FORMS_DOWNLOAD_SUCCESS,
    payload: task,
  }),
  singleEnableFormsDownloadFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_FORMS_DOWNLOAD_FINISH,
  }),

  //Disable FormsDownload
  singleDisableFormsDownload: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_FORMS_DOWNLOAD_REQUEST,
    payload: {data},
  }),

  singleDisableFormsDownloadSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_FORMS_DOWNLOAD_SUCCESS,
    payload: task,
  }),
  singleDisableFormsDownloadFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_FORMS_DOWNLOAD_FINISH,
  }),
  // sort
  sortFormsDownload: (data: any) => ({
    type: actionTypes.SORT_FORMS_DOWNLOAD_START,
    payload: data,
  }),
  sortFormsDownloadSuccess: (data: Array<any>) => ({
    type: actionTypes.SORT_FORMS_DOWNLOAD_SUCCESS,
    payload: data,
  }),
  sortFormsDownloadFinish: () => ({
    type: actionTypes.SORT_FORMS_DOWNLOAD_FINISH,
  }),
  sortFormsDownloadReset: () => ({
    type: actionTypes.SORT_FORMS_DOWNLOAD_RESET,
  }),
}
