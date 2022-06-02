import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteInterestRateModel, InterestRateModel} from '../Model'
import {actionTypes} from './constants'
import {IInterestRateLoanFileState} from './reducer'
export const actions = {
  // get InterestRate DATA
  getInterestRate: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_INTEREST_RATE_START,
    payload: params,
  }),
  getInterestRateSuccess: (data: InterestRateModel) => ({
    type: actionTypes.GET_INTEREST_RATE_SUCCESS,
    payload: data,
  }),
  getInterestRateFinish: () => ({
    type: actionTypes.GET_INTEREST_RATE_FINISH,
  }),

  //Get interest rate loan file csv slsx
  getInterestRateLoanFile: () => {
    return {
      type: actionTypes.GET_INTEREST_RATE_LOAN_FILE_START,
    }
  },

  getInterestRateLoanFileSuccess: (data: IInterestRateLoanFileState) => ({
    type: actionTypes.GET_INTEREST_RATE_LOAN_FILE_SUCCESS,
    payload: data,
  }),
  getInterestRateLoanFileError: (data: IInterestRateLoanFileState) => ({
    type: actionTypes.GET_INTEREST_RATE_LOAN_FILE_FINISH,
    payload: data,
  }),

  //Get interest rate Deposit file csv slsx
  getInterestRateDepositFile: () => {
    return {
      type: actionTypes.GET_INTEREST_RATE_DEPOSIT_FILE_START,
    }
  },

  getInterestRateDepositFileSuccess: (data: IInterestRateLoanFileState) => ({
    type: actionTypes.GET_INTEREST_RATE_DEPOSIT_FILE_SUCCESS,
    payload: data,
  }),
  getInterestRateDepositFileError: (data: IInterestRateLoanFileState) => ({
    type: actionTypes.GET_INTEREST_RATE_DEPOSIT_FILE_FINISH,
    payload: data,
  }),
  // create InterestRate
  addInterestRate: (data: InterestRateModel | any) => ({
    type: actionTypes.ADD_INTEREST_RATE_START,
    payload: data,
  }),
  addInterestRateSuccess: (task: any) => ({
    type: actionTypes.ADD_INTEREST_RATE_SUCCESS,
    payload: task,
  }),
  addInterestRateFinish: () => ({
    type: actionTypes.ADD_INTEREST_RATE_FINISH,
  }),
  resetInterestRate: () => ({
    type: actionTypes.RESET_INTEREST_RATE_TYPE,
  }),

  //Update InterestRate
  updateInterestRate: (data: InterestRateModel | any, id: string) => ({
    type: actionTypes.UPDATE_INTEREST_RATE_START,
    payload: data,
    id,
  }),

  updateInterestRateSuccess: (data: InterestRateModel) => ({
    type: actionTypes.UPDATE_INTEREST_RATE_SUCCESS,
    payload: data,
  }),

  updateInterestRateFinish: () => ({
    type: actionTypes.UPDATE_INTEREST_RATE_FINISH,
  }),

  // delete InterestRate
  deleteInterestRate: (data: DeleteInterestRateModel[]) => ({
    type: actionTypes.DELETE_INTEREST_RATE_START,
    payload: {interestRateId: data},
  }),
  deleteInterestRateSuccess: (data: any) => ({
    type: actionTypes.DELETE_INTEREST_RATE_SUCCESS,
    payload: data,
  }),
  deleteInterestRateFinish: () => ({
    type: actionTypes.DELETE_INTEREST_RATE_FINISH,
  }),

  //Enable InterestRate
  enableInterestRate: (data: any) => ({
    type: actionTypes.ENABLE_INTEREST_RATE_REQUEST,
    payload: {data},
  }),

  enableInterestRateSuccess: (task: any) => ({
    type: actionTypes.ENABLE_INTEREST_RATE_SUCCESS,
    payload: task,
  }),
  enableInterestRateFinish: () => ({
    type: actionTypes.ENABLE_INTEREST_RATE_FINISH,
  }),

  //Disable InterestRate
  disableInterestRate: (data: any) => ({
    type: actionTypes.DISABLE_INTEREST_RATE_REQUEST,
    payload: {data},
  }),

  disableInterestRateSuccess: (task: any) => ({
    type: actionTypes.DISABLE_INTEREST_RATE_SUCCESS,
    payload: task,
  }),
  disableInterestRateFinish: () => ({
    type: actionTypes.DISABLE_INTEREST_RATE_FINISH,
  }),

  //Single Enable InterestRate
  singleEnableInterestRate: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_INTEREST_RATE_REQUEST,
    payload: {data},
  }),

  singleEnableInterestRateSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_INTEREST_RATE_SUCCESS,
    payload: task,
  }),
  singleEnableInterestRateFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_INTEREST_RATE_FINISH,
  }),

  //Single Disable InterestRate
  singleDisableInterestRate: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_INTEREST_RATE_REQUEST,
    payload: {data},
  }),

  singleDisableInterestRateSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_INTEREST_RATE_SUCCESS,
    payload: task,
  }),
  singleDisableInterestRateFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_INTEREST_RATE_FINISH,
  }),
}
