import {ParamsModel} from 'src/app/modules/common/Model'
import {ApplyLoanModel, DeleteApplyLoanModel} from '../Model'
import {actionTypes} from './constants'
export const actions = {
  // get Apply Loan DATA
  getApplyLoan: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_APPLY_LOAN_START,
    payload: params,
  }),
  getApplyLoanSuccess: (data: any) => ({
    type: actionTypes.GET_APPLY_LOAN_SUCCESS,
    payload: data,
  }),
  getApplyLoanFinish: () => ({
    type: actionTypes.GET_APPLY_LOAN_FINISH,
  }),
  // get Municipality DATA
  getMunicipality: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_MUNICIPALITY_START,
    payload: params,
  }),
  getMunicipalitySuccess: (data: any) => ({
    type: actionTypes.GET_MUNICIPALITY_SUCCESS,
    payload: data,
  }),
  getMunicipalityFinish: () => ({
    type: actionTypes.GET_MUNICIPALITY_FINISH,
  }),

  // create Apply Laon
  addApplyLoan: (data: ApplyLoanModel) => ({
    type: actionTypes.ADD_APPLY_LOAN_START,
    payload: data,
  }),
  addApplyLoanSuccess: (task: any) => ({
    type: actionTypes.ADD_APPLY_LOAN_SUCCESS,
    payload: task,
  }),
  addApplyLoanFinish: () => ({
    type: actionTypes.ADD_APPLY_LOAN_FINISH,
  }),
  resetApplyLoan: () => ({
    type: actionTypes.RESET_APPLY_LOAN,
  }),

  //Update Apply Loan
  updateApplyLoan: (data: ApplyLoanModel, id: string) => ({
    type: actionTypes.UPDATE_APPLY_LOAN_START,
    payload: data,
    id,
  }),

  updateApplyLoanSuccess: (data: ApplyLoanModel) => ({
    type: actionTypes.UPDATE_APPLY_LOAN_SUCCESS,
    payload: data,
  }),

  updateApplyLoanFinish: () => ({
    type: actionTypes.UPDATE_APPLY_LOAN_FINISH,
  }),

  // delete Apply Loan
  deleteApplyLoan: (data: DeleteApplyLoanModel[]) => ({
    type: actionTypes.DELETE_APPLY_LOAN_START,
    payload: {applyLoanId: data},
  }),
  deleteApplyLoanSuccess: (data: any) => ({
    type: actionTypes.DELETE_APPLY_LOAN_SUCCESS,
    payload: data,
  }),
  deleteApplyLoanFinish: () => ({
    type: actionTypes.DELETE_APPLY_LOAN_FINISH,
  }),

  //Enable Apply Loan
  enableApplyLoan: (data: any) => ({type: actionTypes.ENABLE_APPLY_LOAN_REQUEST, payload: {data}}),

  enableApplyLoanSuccess: (task: any) => ({
    type: actionTypes.ENABLE_APPLY_LOAN_SUCCESS,
    payload: task,
  }),
  enableApplyLoanFinish: () => ({
    type: actionTypes.ENABLE_APPLY_LOAN_FINISH,
  }),

  //Disable Apply Loan
  disableApplyLoan: (data: any) => ({
    type: actionTypes.DISABLE_APPLY_LOAN_REQUEST,
    payload: {data},
  }),

  disableApplyLoanSuccess: (task: any) => ({
    type: actionTypes.DISABLE_APPLY_LOAN_SUCCESS,
    payload: task,
  }),
  disableApplyLoanFinish: () => ({
    type: actionTypes.DISABLE_APPLY_LOAN_FINISH,
  }),

  //Enable Apply Loan
  singleEnableApplyLoan: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_APPLY_LOAN_REQUEST,
    payload: {data},
  }),

  singleEnableApplyLoanSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_APPLY_LOAN_SUCCESS,
    payload: task,
  }),
  singleEnableApplyLoanFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_APPLY_LOAN_FINISH,
  }),

  //Disable Apply Loan
  singleDisableApplyLoan: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_APPLY_LOAN_REQUEST,
    payload: {data},
  }),

  singleDisableApplyLoanSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_APPLY_LOAN_SUCCESS,
    payload: task,
  }),
  singleDisableApplyLoanFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_APPLY_LOAN_FINISH,
  }),
}
