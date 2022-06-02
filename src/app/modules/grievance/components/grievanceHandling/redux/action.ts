import {ParamsModel} from 'src/app/modules/common/Model'
import {IExportFileState} from 'src/app/modules/network/components/branchless'
import {actionTypes} from './constants'

export const actions = {
  // get ServiceType DATA
  getGrievance: (params: ParamsModel | {status: number} = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_GRIEVANCE_START,
    payload: params,
  }),
  getGrievanceSuccess: (data: any) => ({
    type: actionTypes.GET_GRIEVANCE_SUCCESS,
    payload: data,
  }),
  getGrievanceFinish: () => ({
    type: actionTypes.GET_GRIEVANCE_FINISH,
  }),

  //Export file csv
  exportFile: (fileName: string, params: ParamsModel) => {
    return {
      type: actionTypes.EXPORT_GRIEVANCE_FILE_START,
      payload: {fileName, params},
    }
  },

  exportFileSuccess: (data: IExportFileState) => ({
    type: actionTypes.EXPORT_GRIEVANCE_FILE_SUCCESS,
    payload: data,
  }),
  exportFileError: () => ({
    type: actionTypes.EXPORT_GRIEVANCE_FILE_FINISH,
  }),
}
