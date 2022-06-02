import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {CustomerTestimonialsModel, SortCustomerTestimonialModel} from '../Model'
const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const GET_CUSTOMER_TESTIMONIALS = `${API_URL}/customer-testimonial`
export const ADD_CUSTOMER_TESTIMONIALS = `${API_URL}/customer-testimonial`
export const ACTIVATE_CUSTOMER_TESTIMONIALS = `${API_URL}/customer-testimonial/enable`
export const DEACTIVATE_CUSTOMER_TESTIMONIALS = `${API_URL}/customer-testimonial/disable`
export const DELETE_CUSTOMER_TESTIMONIALS = `${API_URL}/customer-testimonial`

export const service = {
  getCustomerTestimonials: (params: ParamsModel) => {
    return axios.get(GET_CUSTOMER_TESTIMONIALS, {params})
  },

  addCustomerTestimonials: (data: any) => {
    return axios.post(ADD_CUSTOMER_TESTIMONIALS, data)
  },

  activateCustomerTestimonials: (data: Array<string>) => {
    const formData = {
      customerTestimonialId: data,
    }
    return axios.patch(ACTIVATE_CUSTOMER_TESTIMONIALS, formData)
  },

  singleActivateCustomerTestimonials: (data: Array<string>) => {
    const formData = {
      customerTestimonialId: [data],
    }
    return axios.patch(ACTIVATE_CUSTOMER_TESTIMONIALS, formData)
  },
  singleDeactivateCustomerTestimonials: (data: Array<string>) => {
    const formData = {
      customerTestimonialId: [data],
    }
    return axios.patch(DEACTIVATE_CUSTOMER_TESTIMONIALS, formData)
  },

  deactivateCustomerTestimonials: (data: Array<string>) => {
    const formData = {
      customerTestimonialId: data,
    }
    return axios.patch(DEACTIVATE_CUSTOMER_TESTIMONIALS, formData)
  },

  updateCustomerTestimonials: (body: CustomerTestimonialsModel, id: string) => {
    return axios.patch(`${ADD_CUSTOMER_TESTIMONIALS}/${id}`, body)
  },

  deleteCustomerTestimonials: (data: CustomerTestimonialsModel) => {
    return axios.delete(DELETE_CUSTOMER_TESTIMONIALS, {data})
  },
  getAllCustomerTestimonial: () => {
    return axios.get(`${GET_CUSTOMER_TESTIMONIALS}/list`)
  },
  sortCustomerTestimonial: (body: SortCustomerTestimonialModel) => {
    return axios.patch(`${GET_CUSTOMER_TESTIMONIALS}/sort`, body)
  },
}
