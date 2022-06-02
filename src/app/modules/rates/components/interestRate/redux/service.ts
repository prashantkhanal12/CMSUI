import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteInterestRateModel, InterestRateModel} from '../Model'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_INTEREST_RATE = `${API_URL}/interestrate`
export const GET_INTEREST_RATE_LOAN_FILE = `${API_URL}/interestrate/loanExport`
export const GET_INTEREST_RATE_DEPOSIT_FILE = `${API_URL}/interestrate/depositExport`

export const service = {
  getInterestRate: (params: ParamsModel) => {
    return axios.get(GET_INTEREST_RATE, {params})
  },

  //Get file of loan interest
  getInterestRateLoanFile: () => {
    return axios.get(`${GET_INTEREST_RATE_LOAN_FILE}`).then((response) => {
      const blob = new Blob([response?.data])
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `Loan_interest_rate.csv`) //or any other extension
      document.body.appendChild(link)
      link.click()
    })
  },
  //Get file of deposit interest
  getInterestRateDepositFile: () => {
    return axios.get(`${GET_INTEREST_RATE_DEPOSIT_FILE}`).then((response) => {
      const blob = new Blob([response?.data])
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `Deposit_interest_rate.csv`) //or any other extension
      document.body.appendChild(link)
      link.click()
    })
  },

  addInterestRate: (data: any) => {
    return axios.post(GET_INTEREST_RATE, data)
  },

  updateInterestRate: (body: InterestRateModel, id: string) => {
    return axios.post(`${GET_INTEREST_RATE}/${id}`, body)
  },

  deleteInterestRate: (data: DeleteInterestRateModel) => {
    return axios.delete(GET_INTEREST_RATE, {data})
  },

  enableInterestRate: (data: Array<string>) => {
    const selectedInterestRate = {
      interestRateId: data,
    }
    return axios.patch(`${GET_INTEREST_RATE}/enable`, selectedInterestRate)
  },

  disableInterestRate: (data: Array<string>) => {
    const selectedInterestRate = {
      interestRateId: data,
    }
    return axios.patch(`${GET_INTEREST_RATE}/disable`, selectedInterestRate)
  },

  singleEnableInterestRate: (data: Array<string>) => {
    const selectedGallery = {
      interestRateId: [data],
    }
    return axios.patch(`${GET_INTEREST_RATE}/enable`, selectedGallery)
  },

  singleDisableInterestRate: (data: Array<string>) => {
    const selectedInterestRate = {
      interestRateId: [data],
    }
    return axios.patch(`${GET_INTEREST_RATE}/disable`, selectedInterestRate)
  },
}
