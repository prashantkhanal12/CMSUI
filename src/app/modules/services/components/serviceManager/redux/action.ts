import {ParamsModel} from 'src/app/modules/common/Model'
import {
  ServiceOptionType,
  ServiceManagerDataType,
  ServiceManagerType,
  SortServiceManagerModel,
} from '../Model'
import {actionTypes} from './constants'

export const actions = {
  //GET
  getServiceManager: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_SERVICE_MANAGER_START,
    payload: params,
  }),

  getServiceManagerSuccess: (data: ServiceManagerDataType) => ({
    type: actionTypes.GET_SERVICE_MANAGER_SUCCESS,
    payload: data,
  }),
  getServiceManagerFinish: () => ({
    type: actionTypes.GET_SERVICE_MANAGER_FINISH,
  }),

  getServiceManagerList: () => ({type: actionTypes.GET_SERVICE_MANAGER_LIST_START}),

  getServiceManagerListSuccess: (data: Array<ServiceManagerType>) => ({
    type: actionTypes.GET_SERVICE_MANAGER_LIST_SUCCESS,
    payload: data,
  }),
  getServiceManagerListFinish: () => ({
    type: actionTypes.GET_SERVICE_MANAGER_LIST_FINISH,
  }),

  // POST
  addServiceManager: (body: any) => ({type: actionTypes.ADD_SERVICE_MANAGER_START, payload: body}),

  addServiceManagerSuccess: (data: ServiceManagerDataType) => ({
    type: actionTypes.ADD_SERVICE_MANAGER_SUCCESS,
    payload: data,
  }),
  addServiceManagerFinish: () => ({
    type: actionTypes.ADD_SERVICE_MANAGER_FINISH,
  }),
  addServiceManagerReset: () => ({
    type: actionTypes.ADD_SERVICE_MANAGER_RESET,
  }),

  // UPDATE
  updateServiceManager: (body: any, id: string) => ({
    type: actionTypes.UPDATE_SERVICE_MANAGER_START,
    payload: {body, id},
  }),

  updateServiceManagerSuccess: (data: ServiceManagerDataType) => ({
    type: actionTypes.UPDATE_SERVICE_MANAGER_SUCCESS,
    payload: data,
  }),
  updateServiceManagerFinish: () => ({
    type: actionTypes.UPDATE_SERVICE_MANAGER_FINISH,
  }),
  updateServiceManagerReset: () => ({
    type: actionTypes.ADD_SERVICE_MANAGER_RESET,
  }),

  // options
  getServiceReviewOption: () => ({type: actionTypes.GET_SERVICE_REVIEW_OPTIONS_START}),

  getServiceReviewOptionSuccess: (data: {serviceReviewOption: Array<ServiceOptionType>}) => ({
    type: actionTypes.GET_SERVICE_REVIEW_OPTIONS_SUCCESS,
    payload: data,
  }),
  getServiceReviewOptionFinish: () => ({
    type: actionTypes.GET_SERVICE_REVIEW_OPTIONS_FINISH,
  }),

  getServicePopularity: () => ({type: actionTypes.GET_SERVICE_POPULARITY_START}),

  getServicePopularitySuccess: (data: ServiceOptionType) => ({
    type: actionTypes.GET_SERVICE_POPULARITY_SUCCESS,
    payload: data,
  }),
  getServicePopularityFinish: () => ({
    type: actionTypes.GET_SERVICE_POPULARITY_FINISH,
  }),

  getServicesLeadForm: () => ({type: actionTypes.GET_SERVICES_LEAD_FORM_START}),

  getServicesLeadFormSuccess: (data: ServiceOptionType) => ({
    type: actionTypes.GET_SERVICES_LEAD_FORM_SUCCESS,
    payload: data,
  }),
  getServicesLeadFormFinish: () => ({
    type: actionTypes.GET_SERVICES_LEAD_FORM_FINISH,
  }),

  getServiceMediaType: () => ({type: actionTypes.GET_SERVICES_MEDIA_TYPE_START}),

  getServiceMediaTypeSuccess: (data: ServiceOptionType) => ({
    type: actionTypes.GET_SERVICES_MEDIA_TYPE_SUCCESS,
    payload: data,
  }),
  getServiceMediaTypeFinish: () => ({
    type: actionTypes.GET_SERVICES_MEDIA_TYPE_FINISH,
  }),

  getServicesFeaturesOption: () => ({type: actionTypes.GET_SERVICES_FEATURES_OPTION_START}),

  getServicesFeaturesOptionSuccess: (data: ServiceOptionType) => ({
    type: actionTypes.GET_SERVICES_FEATURES_OPTION_SUCCESS,
    payload: data,
  }),
  getServicesFeaturesOptionFinish: () => ({
    type: actionTypes.GET_SERVICES_FEATURES_OPTION_FINISH,
  }),

  //GET FAQ OPTION ACTIONS
  getServiceFaqOption: () => ({type: actionTypes.GET_SERVICE_FAQ_OPTION_START}),

  getServiceFaqOptionSuccess: (data: ServiceOptionType) => ({
    type: actionTypes.GET_SERVICE_FAQ_OPTION_SUCCESS,
    payload: data,
  }),
  getServiceFaqOptionFinish: () => ({
    type: actionTypes.GET_SERVICE_FAQ_OPTION_FINISH,
  }),

  // get service DocumentOption
  getServiceDocumentOption: () => ({
    type: actionTypes.GET_SERVICE_DOCUMENT_OPTION_START,
  }),
  getServiceDocumentOptionSuccess: (data: ServiceOptionType) => ({
    type: actionTypes.GET_SERVICE_DOCUMENT_OPTION_SUCCESS,
    payload: data,
  }),
  getServiceDocumentOptionFinish: () => ({
    type: actionTypes.GET_SERVICE_DOCUMENT_OPTION_FINISH,
  }),

  getServiceApplyNowOption: () => ({
    type: actionTypes.GET_SERVICE_APPLY_NOW_OPTION_START,
  }),
  getServiceApplyNowOptionSuccess: (data: ServiceOptionType) => ({
    type: actionTypes.GET_SERVICE_APPLY_NOW_OPTION_SUCCESS,
    payload: data,
  }),
  getServiceApplyNowOptionFinish: () => ({
    type: actionTypes.GET_SERVICE_APPLY_NOW_OPTION_FINISH,
  }),

  getServiceRelatedOption: () => ({
    type: actionTypes.GET_SERVICE_RELATED_OPTION_START,
  }),
  getServiceRelatedOptionSuccess: (data: ServiceOptionType) => ({
    type: actionTypes.GET_SERVICE_RELATED_OPTION_SUCCESS,
    payload: data,
  }),
  getServiceRelatedOptionFinish: () => ({
    type: actionTypes.GET_SERVICE_RELATED_OPTION_FINISH,
  }),

  // DELETE
  deleteServiceManager: (data: {serviceManagerId: Array<{id: string}>}) => ({
    type: actionTypes.DELETE_SERVICE_MANAGER_START,
    payload: data,
  }),
  deleteServiceManagerSuccess: (data: {id: string}[]) => ({
    type: actionTypes.DELETE_SERVICE_MANAGER_SUCCESS,
    payload: data,
  }),
  deleteServiceManagerFinish: () => ({
    type: actionTypes.DELETE_SERVICE_MANAGER_FINISH,
  }),
  deleteServiceManagerReset: () => ({
    type: actionTypes.DELETE_SERVICE_MANAGER_RESET,
  }),

  // ENABLE
  enableServiceManager: (data: {serviceManagerId: Array<{id: string}>}) => ({
    type: actionTypes.ENABLE_SERVICE_MANAGER_START,
    payload: data,
  }),
  enableServiceManagerSuccess: (data: {id: string}[]) => ({
    type: actionTypes.ENABLE_SERVICE_MANAGER_SUCCESS,
    payload: data,
  }),
  enableServiceManagerFinish: () => ({
    type: actionTypes.ENABLE_SERVICE_MANAGER_FINISH,
  }),
  enableServiceManagerReset: () => ({
    type: actionTypes.ENABLE_SERVICE_MANAGER_RESET,
  }),

  // DISABLE
  disableServiceManager: (data: {serviceManagerId: Array<{id: string}>}) => ({
    type: actionTypes.DISABLE_SERVICE_MANAGER_START,
    payload: data,
  }),
  disableServiceManagerSuccess: (data: {id: string}[]) => ({
    type: actionTypes.DISABLE_SERVICE_MANAGER_SUCCESS,
    payload: data,
  }),
  disableServiceManagerFinish: () => ({
    type: actionTypes.DISABLE_SERVICE_MANAGER_FINISH,
  }),
  disableServiceManagerReset: () => ({
    type: actionTypes.DISABLE_SERVICE_MANAGER_RESET,
  }),

  // sort
  sortServiceManager: (data: SortServiceManagerModel) => ({
    type: actionTypes.SORT_SERVICE_MANAGER_START,
    payload: data,
  }),
  sortServiceManagerSuccess: (data: Array<ServiceManagerDataType>) => ({
    type: actionTypes.SORT_SERVICE_MANAGER_SUCCESS,
    payload: data,
  }),
  sortServiceManagerFinish: () => ({
    type: actionTypes.SORT_SERVICE_MANAGER_FINISH,
  }),
  sortServiceManagerReset: () => ({
    type: actionTypes.SORT_SERVICE_MANAGER_RESET,
  }),
}
