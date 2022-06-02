import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {ApplyLoanModel, DeleteApplyLoanModel} from '../Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_APPLY_LOAN = `${API_URL}/apply-loan`
export const GET_MUNICIPALITY = `${API_URL}/municipality`

export const service = {
  getApplyLoan: (params: ParamsModel) => {
    return axios.get(GET_APPLY_LOAN, {params})
  },

  getMunicipality: (params: ParamsModel) => {
    return axios.get(GET_MUNICIPALITY, {params})
  },

  addApplyLoan: (data: any) => {
    return axios.post(GET_APPLY_LOAN, data)
  },

  updateApplyLoan: (body: ApplyLoanModel, id: string) => {
    return axios.post(`${GET_APPLY_LOAN}/${id}`, body)
  },

  deleteApplyLoan: (data: DeleteApplyLoanModel) => {
    return axios.delete(GET_APPLY_LOAN, {data})
  },

  enableApplyLoan: (data: Array<string>) => {
    const selectedapplyLoan = {
      applyLoanId: data,
    }
    return axios.patch(`${GET_APPLY_LOAN}/enable`, selectedapplyLoan)
  },

  disableApplyLoan: (data: Array<string>) => {
    const selectedapplyLoan = {
      applyLoanId: data,
    }
    return axios.patch(`${GET_APPLY_LOAN}/disable`, selectedapplyLoan)
  },

  singleEnableApplyLoan: (data: Array<string>) => {
    const selectedapplyLoan = {
      applyLoanId: [data],
    }
    return axios.patch(`${GET_APPLY_LOAN}/enable`, selectedapplyLoan)
  },

  singleDisableApplyLoan: (data: Array<string>) => {
    const selectedapplyLoan = {
      applyLoanId: [data],
    }
    return axios.patch(`${GET_APPLY_LOAN}/disable`, selectedapplyLoan)
  },
}
