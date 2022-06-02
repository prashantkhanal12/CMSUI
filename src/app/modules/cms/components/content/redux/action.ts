import {ParamsModel} from 'src/app/modules/common/Model'
import {ContentOptionModal} from '../Model'
import {ContentModel} from '../Model/ContentModal'
import {actionTypes} from './constants'

export const actions = {
  //GET APPLY NOW SECTION ACTIONS
  getApplyNowSection: () => ({type: actionTypes.GET_APPLY_NOW_SECTION_START}),

  getApplyNowSectionSuccess: (data: ContentOptionModal) => ({
    type: actionTypes.GET_APPLY_NOW_SECTION_SUCCESS,
    payload: data,
  }),
  getApplyNowSectionError: (error: string) => ({
    type: actionTypes.GET_APPLY_NOW_SECTION_FINISH,
    payload: {error},
  }),

  //GET BANNER ACTIONS
  getConstantBanner: () => ({type: actionTypes.GET_CONSTANTBANNER_START}),

  getConstantBannerSuccess: (data: ContentOptionModal) => ({
    type: actionTypes.GET_CONSTANTBANNER_SUCCESS,
    payload: data,
  }),
  getConstantBannerError: (error: string) => ({
    type: actionTypes.GET_CONSTANTBANNER_FINISH,
    payload: {error},
  }),

  //GET COLLAPSIBLE SECTION ACTIONS
  getCollapsibleSection: () => ({type: actionTypes.GET_COLLAPSIBLE_SECTION_START}),

  getCollapsibleSectionSuccess: (data: ContentOptionModal) => ({
    type: actionTypes.GET_COLLAPSIBLE_SECTION_SUCCESS,
    payload: data,
  }),
  getCollapsibleSectionError: (error: string) => ({
    type: actionTypes.GET_COLLAPSIBLE_SECTION_FINISH,
    payload: {error},
  }),

  //GET FAQ OPTION ACTIONS
  getFaqOption: () => ({type: actionTypes.GET_FAQ_OPTION_START}),

  getFaqOptionSuccess: (data: ContentOptionModal) => ({
    type: actionTypes.GET_FAQ_OPTION_SUCCESS,
    payload: data,
  }),
  getFaqOptionError: (error: string) => ({
    type: actionTypes.GET_FAQ_OPTION_FINISH,
    payload: {error},
  }),

  //GET HELP SECTION ACTIONS
  getHelpSection: () => ({type: actionTypes.GET_HELP_SECTION_START}),

  getHelpSectionSuccess: (data: ContentOptionModal) => ({
    type: actionTypes.GET_HELP_SECTION_SUCCESS,
    payload: data,
  }),
  getHelpSectionError: (error: string) => ({
    type: actionTypes.GET_HELP_SECTION_FINISH,
    payload: {error},
  }),

  //GET LEAD FORM ACTIONS
  getLeadForm: () => ({type: actionTypes.GET_LEAD_FORM_START}),

  getLeadFormSuccess: (data: ContentOptionModal) => ({
    type: actionTypes.GET_LEAD_FORM_SUCCESS,
    payload: data,
  }),
  getLeadFormError: (error: string) => ({
    type: actionTypes.GET_LEAD_FORM_FINISH,
    payload: {error},
  }),

  //GET PAGE HEADER ACTIONS
  getPageHeader: () => ({type: actionTypes.GET_PAGE_HEADER_START}),

  getPageHeaderSuccess: (data: ContentOptionModal) => ({
    type: actionTypes.GET_PAGE_HEADER_SUCCESS,
    payload: data,
  }),
  getPageHeaderError: (error: string) => ({
    type: actionTypes.GET_PAGE_HEADER_FINISH,
    payload: {error},
  }),

  //GET PRODUCT OPTION ACTIONS
  getProductOption: () => ({type: actionTypes.GET_PRODUCT_OPTION_START}),

  getProductOptionSuccess: (data: ContentOptionModal) => ({
    type: actionTypes.GET_PRODUCT_OPTION_SUCCESS,
    payload: data,
  }),
  getProductOptionError: (error: string) => ({
    type: actionTypes.GET_PRODUCT_OPTION_FINISH,
    payload: {error},
  }),

  //GET REVIEW AND RATING ACTIONS
  getReviewAndRating: () => ({type: actionTypes.GET_REVIEW_AND_RATING_START}),

  getReviewAndRatingSuccess: (data: ContentOptionModal) => ({
    type: actionTypes.GET_REVIEW_AND_RATING_SUCCESS,
    payload: data,
  }),
  getReviewAndRatingError: (error: string) => ({
    type: actionTypes.GET_REVIEW_AND_RATING_FINISH,
    payload: {error},
  }),

  // get ContentData DATA
  getContentData: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_CONTENT_DATA_START,
    payload: params,
  }),
  getContentDataSuccess: (data: ContentModel | any) => ({
    type: actionTypes.GET_CONTENT_DATA_SUCCESS,
    payload: data,
  }),
  getContentDataFinish: () => ({
    type: actionTypes.GET_CONTENT_DATA_FINISH,
  }),

  // get ContentDataByCategoryId DATA
  getContentDataByCategoryId: (id: string) => ({
    type: actionTypes.GET_CONTENT_DATA_BY_CATEGORY_ID_START,
    payload: id,
  }),
  getContentDataByCategoryIdSuccess: (data: ContentModel | any) => ({
    type: actionTypes.GET_CONTENT_DATA_BY_CATEGORY_ID_SUCCESS,
    payload: data,
  }),
  getContentDataByCategoryIdFinish: () => ({
    type: actionTypes.GET_CONTENT_DATA_BY_CATEGORY_ID_FINISH,
  }),

  //ADD CONTENT ACTIONS
  addContent: (data: ContentModel | any) => ({type: actionTypes.ADD_CONTENT_START, payload: data}),

  addContentSuccess: (data: ContentOptionModal | any) => ({
    type: actionTypes.ADD_CONTENT_SUCCESS,
    payload: data,
  }),
  addContentError: (error: string) => ({
    type: actionTypes.ADD_CONTENT_FINISH,
    payload: {error},
  }),

  resetContent: () => ({type: actionTypes.RESET_CONTENT}),

  //Update Content
  updateContent: (data: ContentModel | any, id: string) => ({
    type: actionTypes.UPDATE_CONTENT_DATA_START,
    payload: data,
    id,
  }),

  updateContentSuccess: (data: ContentModel | any) => ({
    type: actionTypes.UPDATE_CONTENT_DATA_SUCCESS,
    payload: data,
  }),

  updateContentFinish: () => ({
    type: actionTypes.UPDATE_CONTENT_DATA_FINISH,
  }),

  // delete key
  deleteContent: (data: {id: string}[]) => ({
    type: actionTypes.DELETE_CONTENT_DATA_START,
    payload: {contentId: data},
  }),
  deleteContentSuccess: (data: any) => ({
    type: actionTypes.DELETE_CONTENT_DATA_SUCCESS,
    payload: data,
  }),
  deleteContentFinish: () => ({
    type: actionTypes.DELETE_CONTENT_DATA_FINISH,
  }),

  //Enable Content
  enableContent: (data: any) => ({
    type: actionTypes.ENABLE_CONTENT_DATA_REQUEST,
    payload: {data},
  }),

  enableContentSuccess: (task: any) => ({
    type: actionTypes.ENABLE_CONTENT_DATA_SUCCESS,
    payload: task,
  }),
  enableContentFinish: () => ({
    type: actionTypes.ENABLE_CONTENT_DATA_FINISH,
  }),

  //Disable Content
  disableContent: (data: any) => ({
    type: actionTypes.DISABLE_CONTENT_DATA_REQUEST,
    payload: {data},
  }),

  disableContentSuccess: (task: any) => ({
    type: actionTypes.DISABLE_CONTENT_DATA_SUCCESS,
    payload: task,
  }),
  disableContentFinish: () => ({
    type: actionTypes.DISABLE_CONTENT_DATA_FINISH,
  }),

  //Enable Content
  singleEnableContent: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_CONTENT_DATA_REQUEST,
    payload: {data},
  }),

  singleEnableContentSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_CONTENT_DATA_SUCCESS,
    payload: task,
  }),
  singleEnableContentFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_CONTENT_DATA_FINISH,
  }),

  //Disable Content
  singleDisableContent: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_CONTENT_DATA_REQUEST,
    payload: {data},
  }),

  singleDisableContentSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_CONTENT_DATA_SUCCESS,
    payload: task,
  }),
  singleDisableContentFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_CONTENT_DATA_FINISH,
  }),
}
