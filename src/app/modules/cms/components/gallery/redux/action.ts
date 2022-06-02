import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteGalleryModel, GalleryModel, SortGalleryModel} from '../Model'
import {actionTypes} from './constants'
import { IGalleryState } from './reducer'
export const actions = {
  // get Gallery DATA
  getGallery: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_GALLERY_START,
    payload: params,
  }),
  getGallerySuccess: (data: GalleryModel) => ({
    type: actionTypes.GET_GALLERY_SUCCESS,
    payload: data,
  }),
  getGalleryFinish: () => ({
    type: actionTypes.GET_GALLERY_FINISH,
  }),

  // create key
  addGallery: (data: GalleryModel) => ({
    type: actionTypes.ADD_GALLERY_START,
    payload: data,
  }),
  addGallerySuccess: (task: any) => ({
    type: actionTypes.ADD_GALLERY_SUCCESS,
    payload: task,
  }),
  addGalleryFinish: () => ({
    type: actionTypes.ADD_GALLERY_FINISH,
  }),
  resetGallery: () => ({
    type: actionTypes.RESET_GALLERY_TYPE,
  }),

  //Update Gallery
  updateGallery: (data: GalleryModel, id: string) => ({
    type: actionTypes.UPDATE_GALLERY_START,
    payload: data,
    id,
  }),

  updateGallerySuccess: (data: GalleryModel) => ({
    type: actionTypes.UPDATE_GALLERY_SUCCESS,
    payload: data,
  }),

  updateGalleryFinish: () => ({
    type: actionTypes.UPDATE_GALLERY_FINISH,
  }),

  // delete key
  deleteGallery: (data: DeleteGalleryModel[]) => ({
    type: actionTypes.DELETE_GALLERY_START,
    payload: {albumId: data},
  }),
  deleteGallerySuccess: (data: any) => ({
    type: actionTypes.DELETE_GALLERY_SUCCESS,
    payload: data,
  }),
  deleteGalleryFinish: () => ({
    type: actionTypes.DELETE_GALLERY_FINISH,
  }),

  //Enable Gallery
  enableGallery: (data: any) => ({
    type: actionTypes.ENABLE_GALLERY_REQUEST,
    payload: {data},
  }),

  enableGallerySuccess: (task: any) => ({
    type: actionTypes.ENABLE_GALLERY_SUCCESS,
    payload: task,
  }),
  enableGalleryFinish: () => ({
    type: actionTypes.ENABLE_GALLERY_FINISH,
  }),

  //Disable Gallery
  disableGallery: (data: any) => ({
    type: actionTypes.DISABLE_GALLERY_REQUEST,
    payload: {data},
  }),

  disableGallerySuccess: (task: any) => ({
    type: actionTypes.DISABLE_GALLERY_SUCCESS,
    payload: task,
  }),
  disableGalleryFinish: () => ({
    type: actionTypes.DISABLE_GALLERY_FINISH,
  }),

  //Enable Gallery
  singleEnableGallery: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_GALLERY_REQUEST,
    payload: {data},
  }),

  singleEnableGallerySuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_GALLERY_SUCCESS,
    payload: task,
  }),
  singleEnableGalleryFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_GALLERY_FINISH,
  }),

  //Disable Gallery
  singleDisableGallery: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_GALLERY_REQUEST,
    payload: {data},
  }),

  singleDisableGallerySuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_GALLERY_SUCCESS,
    payload: task,
  }),
  singleDisableGalleryFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_GALLERY_FINISH,
  }),

  // get Gallery
  getAllGallery: () => {
    return {
      type: actionTypes.GET_ALL_GALLERY_START,
    }
  },
  getAllGallerySuccess: (data: IGalleryState) => ({
    type: actionTypes.GET_ALL_GALLERY_SUCCESS,
    payload: data,
  }),
  getAllGalleryError: () => ({
    type: actionTypes.GET_ALL_GALLERY_FINISH,
  }),

  // sort
  sortGallery: (data: SortGalleryModel) => ({
    type: actionTypes.SORT_GALLERY_START,
    payload: data,
  }),
  sortGallerySuccess: (data: Array<GalleryModel>) => ({
    type: actionTypes.SORT_GALLERY_SUCCESS,
    payload: data,
  }),
  sortGalleryFinish: () => ({
    type: actionTypes.SORT_GALLERY_FINISH,
  }),
  sortGalleryReset: () => ({
    type: actionTypes.SORT_GALLERY_RESET,
  }),
}
