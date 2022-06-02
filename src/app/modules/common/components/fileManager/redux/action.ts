import { DeleteFolderType, FileProps, MediaHierarchyType, MediaParams, MoveCopyBodyType } from '../Model'
import { actionTypes } from './constants'

export const actions = {
  // get
  getMediaList: (params: MediaParams) => ({
    type: actionTypes.GET_MEDIA_LIST_START,
    payload: { params },
  }),
  getMediaListSuccess: (data: { folder: Array<FileProps>, currentPath: string }) => ({
    type: actionTypes.GET_MEDIA_LIST_SUCCESS,
    payload: { data: data?.folder, currentPath: data?.currentPath },
  }),
  getMediaListFinish: () => ({
    type: actionTypes.GET_MEDIA_LIST_FINISH,
  }),

  getMediaHierarchy: () => ({
    type: actionTypes.GET_MEDIA_HIERARCHY_START,
  }),
  getMediaHierarchySuccess: (data: Array<MediaHierarchyType>) => ({
    type: actionTypes.GET_MEDIA_HIERARCHY_SUCCESS,
    payload: data,
  }),
  getMediaHierarchyFinish: () => ({
    type: actionTypes.GET_MEDIA_HIERARCHY_FINISH,
  }),

  // create
  addNewFolder: (data: MediaParams) => ({
    type: actionTypes.ADD_NEW_FOLDER_START,
    payload: data,
  }),
  addNewFolderSuccess: (data: { [key: string]: string }) => ({
    type: actionTypes.ADD_NEW_FOLDER_SUCCESS,
    payload: data,
  }),
  addNewFolderFinish: () => ({
    type: actionTypes.ADD_NEW_FOLDER_FINISH,
  }),
  addNewFolderReset: () => ({
    type: actionTypes.ADD_NEW_FOLDER_RESET,
  }),

  // update
  addFiles: (data: FormData, options?: any) => ({
    type: actionTypes.ADD_FILES_START,
    payload: { data, options },
  }),
  addFilesSuccess: (data: { [key: string]: string }) => ({
    type: actionTypes.ADD_FILES_SUCCESS,
    payload: data,
  }),
  addFilesFinish: (errMsg?: string) => ({
    type: actionTypes.ADD_FILES_FINISH,
    payload: errMsg,
  }),
  addFilesReset: () => ({
    type: actionTypes.ADD_FILES_RESET,
  }),

  renameFileFolder: (data: MoveCopyBodyType) => ({
    type: actionTypes.RENAME_FILE_FOLDER_START,
    payload: { data },
  }),
  renameFileFolderSuccess: (data: { [key: string]: string }) => ({
    type: actionTypes.RENAME_FILE_FOLDER_SUCCESS,
    payload: data,
  }),
  renameFileFolderFinish: (errMsg?: string) => ({
    type: actionTypes.RENAME_FILE_FOLDER_FINISH,
    payload: errMsg,
  }),
  renameFileFolderReset: () => ({
    type: actionTypes.RENAME_FILE_FOLDER_RESET,
  }),

  // delete
  deleteFolderFiles: (data: DeleteFolderType) => ({
    type: actionTypes.DELETE_FOLDER_FILES_START,
    payload: data,
  }),
  deleteFolderFilesSuccess: (data: { [key: string]: string }) => ({
    type: actionTypes.DELETE_FOLDER_FILES_SUCCESS,
    payload: data,
  }),
  deleteFolderFilesFinish: () => ({
    type: actionTypes.DELETE_FOLDER_FILES_FINISH,
  }),
  deleteFolderFilesReset: () => ({
    type: actionTypes.DELETE_FOLDER_FILES_RESET,
  }),
}
