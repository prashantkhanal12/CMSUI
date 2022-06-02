import {DeleteDepartmentModel, DepartmentModel} from '../Model'
import {actionTypes} from './constants'
import {IDepartmentState} from './reducer'
import {ParamsModel} from 'src/app/modules/common/Model'
export const actions = {
  // get key
  getDepartment: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_DEPARTMENT_START,
    payload: {params},
  }),
  getDepartmentSuccess: (data: any) => ({
    type: actionTypes.GET_DEPARTMENT_SUCCESS,
    payload: data,
  }),
  getDepartmentError: (error: string) => ({
    type: actionTypes.GET_DEPARTMENT_FINISH,
    payload: {error},
  }),

  // create key
  createDepartment: (data: DepartmentModel) => ({
    type: actionTypes.ADD_DEPARTMENT_START,
    payload: data,
  }),
  createDepartmentSuccess: (task: any) => ({
    type: actionTypes.ADD_DEPARTMENT_SUCCESS,
    payload: task,
  }),
  createDepartmentFinish: (errorMsg: any) => ({
    type: actionTypes.ADD_DEPARTMENT_FINISH,
    payload: errorMsg,
  }),
  createDepartmentReset: () => ({
    type: actionTypes.ADD_DEPARTMENT_RESET,
  }),

  // update key
  updateDepartment: (data: DepartmentModel, id: string) => ({
    type: actionTypes.UPDATE_DEPARTMENT_START,
    payload: {data, id},
  }),
  updateDepartmentSuccess: (task: any) => ({
    type: actionTypes.UPDATE_DEPARTMENT_SUCCESS,
    payload: task,
  }),
  updateDepartmentFinish: (errorMsg: any) => ({
    type: actionTypes.UPDATE_DEPARTMENT_FINISH,
    payload: errorMsg,
  }),
  updateDepartmentReset: () => ({
    type: actionTypes.UPDATE_DEPARTMENT_RESET,
  }),

  // UPDATE key
  deleteDepartment: (data: DeleteDepartmentModel[]) => ({
    type: actionTypes.DELETE_DEPARTMENT_START,
    payload: {department: data},
  }),
  deleteDepartmentSuccess: (data: any) => ({
    type: actionTypes.DELETE_DEPARTMENT_SUCCESS,
    payload: data,
  }),
  deleteDepartmentFinish: (errorMsg: any) => ({
    type: actionTypes.DELETE_DEPARTMENT_FINISH,
    payload: errorMsg,
  }),

  // single active branchless banking
  singleActivateBranchlessBanking: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_ACTIVATE_DEPARTMENT_REQUEST,
    payload: {department: [id]},
  }),
  // single deactive branchless banking
  singleDeactivateBranchlessBanking: (id: {[key: string]: string}) => ({
    type: actionTypes.SINGLE_DEACTIVATE_DEPARTMENT_REQUEST,
    payload: {department: [id]},
  }),
}
