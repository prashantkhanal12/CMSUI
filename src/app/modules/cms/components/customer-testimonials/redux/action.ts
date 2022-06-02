import {ParamsModel} from 'src/app/modules/common/Model'
import { OptionModel } from '../../categories/Model'
import {CustomerTestimonialsModel, DeleteCustomerTestimonialsModel, SortCustomerTestimonialModel} from '../Model'
import {actionTypes} from './constants'
import {ICustomerTestimonialsState} from './reducer'

export const actions = {
  // get CustomerTestimonial
  getAllCustomerTestimonial: () => ({
    type: actionTypes.GET_ALL_CUSTOMER_TESTIMONIALS_START,
  }),
  getAllCustomerTestimonialSuccess: (data: OptionModel) => ({
    type: actionTypes.GET_ALL_CUSTOMER_TESTIMONIALS_SUCCESS,
    payload: data,
  }),
  getAllCustomerTestimonialFinish: () => ({
    type: actionTypes.GET_ALL_CUSTOMER_TESTIMONIALS_FINISH,
  }),

  // get Customer Testimonials
  getCustomerTestimonials: (params: ParamsModel = {page: 1, limit: 10}) => {
    return {
      type: actionTypes.GET_CUSTOMER_TESTIMONIALS_START,
      payload: {params},
    }
  },
  getCustomerTestimonialsMediaType: () => {
    return {
      type: actionTypes.GET_CUSTOMER_TESTIMONIALS_MEDIA_START,
    }
  },
  getCustomerTestimonialsSuccess: (data: ICustomerTestimonialsState) => ({
    type: actionTypes.GET_CUSTOMER_TESTIMONIALS_SUCCESS,
    payload: data,
  }),
  getCustomerTestimonialsError: (data: ICustomerTestimonialsState) => ({
    type: actionTypes.GET_CUSTOMER_TESTIMONIALS_FINISH,
    payload: data,
  }),

  //Add Customer Testimonials Action
  CreateCustomerTestimonials: (data: any) => ({
    type: actionTypes.ADD_CUSTOMER_TESTIMONIALS_REQUEST,
    payload: data,
  }),

  createCustomerTestimonialsSuccess: (task: any) => ({
    type: actionTypes.ADD_CUSTOMER_TESTIMONIALS_SUCCESS,
    payload: task,
  }),
  createCustomerTestimonialsFinish: (errorMsg: any) => ({
    type: actionTypes.ADD_CUSTOMER_TESTIMONIALS_FINISH,
    payload: errorMsg,
  }),
  createCustomerTestimonialsReset: () => ({
    type: actionTypes.ADD_CUSTOMER_TESTIMONIALS_RESET,
  }),

  //Activate and Deactivate Bulk Customer Testimonials
  activateCustomerTestimonials: (data: any) => ({
    type: actionTypes.ACTIVATE_CUSTOMER_TESTIMONIALS_REQUEST,
    payload: {data},
  }),
  deactivateCustomerTestimonials: (data: any) => ({
    type: actionTypes.DEACTIVATE_CUSTOMER_TESTIMONIALS_REQUEST,
    payload: {data},
  }),

  //Single Activate and Deactivate Customer Testimonials
  singleActivateCustomerTestimonials: (data: any) => ({
    type: actionTypes.SINGLE_ACTIVATE_CUSTOMER_TESTIMONIALS_REQUEST,
    payload: {data},
  }),

  singleDeactivateCustomerTestimonials: (data: any) => ({
    type: actionTypes.SINGLE_DEACTIVATE_CUSTOMER_TESTIMONIALS_REQUEST,
    payload: {data},
  }),

  // update Customer Testimonials
  updateCustomerTestimonials: (data: CustomerTestimonialsModel, id: string) => ({
    type: actionTypes.UPDATE_CUSTOMER_TESTIMONIALS_START,
    payload: {data, id},
  }),

  //delete and reset Customer Testimonials
  deleteCustomerTestimonials: (data: DeleteCustomerTestimonialsModel[]) => ({
    type: actionTypes.DELETE_CUSTOMER_TESTIMONIALS_START,
    payload: {customerTestimonialId: data},
  }),

  // sort
  sortCustomerTestimonial: (data: SortCustomerTestimonialModel) => ({
    type: actionTypes.SORT_CUSTOMER_TESTIMONIALS_START,
    payload: data,
  }),
  sortCustomerTestimonialSuccess: (data: Array<CustomerTestimonialsModel>) => ({
    type: actionTypes.SORT_CUSTOMER_TESTIMONIALS_SUCCESS,
    payload: data,
  }),
  sortCustomerTestimonialFinish: () => ({
    type: actionTypes.SORT_CUSTOMER_TESTIMONIALS_FINISH,
  }),
  sortCustomerTestimonialReset: () => ({
    type: actionTypes.SORT_CUSTOMER_TESTIMONIALS_RESET,
  }),
}
