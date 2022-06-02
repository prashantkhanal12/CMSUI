
import { Action } from 'redux'
import { FileProps, MediaHierarchyType } from '../Model'
import { actionTypes } from './constants'

export interface ActionWithPayload<T> extends Action {
    payload?: T
}

const initialMediaManagerState: IMediaManagerState = {
    data: [],
    mediaHierarchyData: {},
    addFolderData: {},
    addFileData: {},
    removeFolderFilesData: {},
    renameFileData: {},
    currentPath: '',
    loading: false,
    success: false,
    error: ''
}

export interface IMediaManagerState {
    data: Array<FileProps>,
    mediaHierarchyData: MediaHierarchyType
    addFolderData: { [key: string]: string }
    addFileData: { [key: string]: string }
    renameFileData: { [key: string]: string }
    removeFolderFilesData: { [key: string]: string }
    currentPath: string
    loading?: boolean
    success?: boolean
    error: string
}

export const reducer =
    (state: IMediaManagerState = initialMediaManagerState, action: ActionWithPayload<IMediaManagerState>) => {
        switch (action.type) {

            case actionTypes.GET_MEDIA_LIST_START: {
                return { ...state, loading: true }
            }

            case actionTypes.GET_MEDIA_LIST_SUCCESS: {
                return { ...state, data: action.payload?.data, currentPath: action?.payload?.currentPath, loading: false }
            }

            case actionTypes.GET_MEDIA_LIST_FINISH: {
                const error = action.payload
                return { ...state, error, loading: false }
            }

            case actionTypes.GET_MEDIA_HIERARCHY_START: {
                return { ...state, loading: true }
            }

            case actionTypes.GET_MEDIA_HIERARCHY_SUCCESS: {
                return { ...state, mediaHierarchyData: action.payload, loading: false }
            }

            case actionTypes.GET_MEDIA_HIERARCHY_FINISH: {
                const error = action.payload
                return { ...state, error, loading: false }
            }

            case actionTypes.ADD_NEW_FOLDER_START: {
                return { ...state, loading: true }
            }

            case actionTypes.ADD_NEW_FOLDER_SUCCESS: {
                return {
                    ...state,
                    addFolderData: action?.payload,
                    success: true,
                    loading: false
                }
            }

            case actionTypes.ADD_NEW_FOLDER_FINISH: {
                const error = action.payload
                return { ...state, error, loading: false }
            }

            case actionTypes.ADD_NEW_FOLDER_RESET: {
                return {
                    ...state,
                    addFolderData: {},
                    success: false
                }
            }

            case actionTypes.ADD_FILES_START: {
                return { ...state, loading: true }
            }

            case actionTypes.ADD_FILES_SUCCESS: {
                return {
                    ...state,
                    addFileData: action?.payload,
                    success: true,
                    loading: false
                }
            }

            case actionTypes.ADD_FILES_FINISH: {
                const error = action.payload
                return { ...state, error, loading: false }
            }

            case actionTypes.ADD_FILES_RESET: {
                return {
                    ...state,
                    addFileData: [],
                    success: false
                }
            }

            case actionTypes.RENAME_FILE_FOLDER_START: {
                return { ...state, loading: true }
            }

            case actionTypes.RENAME_FILE_FOLDER_SUCCESS: {
                return {
                    ...state,
                    renameFileData: action?.payload,
                    success: true,
                    loading: false
                }
            }

            case actionTypes.RENAME_FILE_FOLDER_FINISH: {
                const error = action.payload
                return { ...state, error, loading: false }
            }

            case actionTypes.RENAME_FILE_FOLDER_RESET: {
                return {
                    ...state,
                    renameFileData: [],
                    success: false
                }
            }

            case actionTypes.DELETE_FOLDER_FILES_START: {
                return { ...state, loading: true, success: false }
            }

            case actionTypes.DELETE_FOLDER_FILES_SUCCESS: {
                return {
                    ...state,
                    removeFolderFilesData: action?.payload,
                    success: true,
                    loading: false
                }
            }

            case actionTypes.DELETE_FOLDER_FILES_FINISH: {
                return {
                    ...state,
                    loading: false,
                    success: false
                }
            }

            case actionTypes.DELETE_FOLDER_FILES_RESET: {
                return {
                    ...state,
                    removeFolderFilesData: [],
                    loading: false,
                    success: false
                }
            }

            default:
                return state
        }
    }
