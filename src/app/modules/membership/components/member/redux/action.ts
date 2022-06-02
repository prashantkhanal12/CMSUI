import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteMemberModel, OptionModel, SortMemberModel} from '../Model'
import {MemberModel} from '../Model/MemberModel'
import {actionTypes} from './constants'
export const actions = {
  // get Member
  getAllMember: () => ({
    type: actionTypes.GET_ALL_MEMBER_START,
  }),
  getAllMemberSuccess: (data: OptionModel) => ({
    type: actionTypes.GET_ALL_MEMBER_SUCCESS,
    payload: data,
  }),
  getAllMemberFinish: () => ({
    type: actionTypes.GET_ALL_MEMBER_FINISH,
  }),

  // get Member
  getFeaturedMember: () => ({
    type: actionTypes.GET_FEATURED_MEMBER_START,
  }),
  getFeaturedMemberSuccess: (data: OptionModel) => ({
    type: actionTypes.GET_FEATURED_MEMBER_SUCCESS,
    payload: data,
  }),
  getFeaturedMemberFinish: () => ({
    type: actionTypes.GET_FEATURED_MEMBER_FINISH,
  }),

  // get Member DATA
  getMember: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_MEMBER_START,
    payload: params,
  }),
  getMemberSuccess: (data: OptionModel) => ({
    type: actionTypes.GET_MEMBER_SUCCESS,
    payload: data,
  }),
  getMemberFinish: () => ({
    type: actionTypes.GET_MEMBER_FINISH,
  }),

  // create key
  addMember: (data: MemberModel) => ({
    type: actionTypes.ADD_MEMBER_START,
    payload: data,
  }),
  addMemberSuccess: (task: any) => ({
    type: actionTypes.ADD_MEMBER_SUCCESS,
    payload: task,
  }),
  addMemberFinish: () => ({
    type: actionTypes.ADD_MEMBER_FINISH,
  }),
  resetMember: () => ({
    type: actionTypes.RESET_MEMBER,
  }),

  //Update Member
  updateMember: (data: MemberModel, id: string) => ({
    type: actionTypes.UPDATE_MEMBER_START,
    payload: data,
    id,
  }),

  updateMemberSuccess: (data: MemberModel) => ({
    type: actionTypes.UPDATE_MEMBER_SUCCESS,
    payload: data,
  }),

  updateMemberFinish: () => ({
    type: actionTypes.UPDATE_MEMBER_FINISH,
  }),

  // delete key
  deleteMember: (data: DeleteMemberModel[]) => ({
    type: actionTypes.DELETE_MEMBER_START,
    payload: {memberId: data},
  }),
  deleteMemberSuccess: (data: any) => ({
    type: actionTypes.DELETE_MEMBER_SUCCESS,
    payload: data,
  }),
  deleteMemberFinish: () => ({
    type: actionTypes.DELETE_MEMBER_FINISH,
  }),

  //Enable Member
  enableMember: (data: any) => ({
    type: actionTypes.ENABLE_MEMBER_REQUEST,
    payload: {data},
  }),

  enableMemberSuccess: (task: any) => ({
    type: actionTypes.ENABLE_MEMBER_SUCCESS,
    payload: task,
  }),
  enableMemberFinish: () => ({
    type: actionTypes.ENABLE_MEMBER_FINISH,
  }),

  //Disable Member
  disableMember: (data: any) => ({
    type: actionTypes.DISABLE_MEMBER_REQUEST,
    payload: {data},
  }),

  disableMemberSuccess: (task: any) => ({
    type: actionTypes.DISABLE_MEMBER_SUCCESS,
    payload: task,
  }),
  disableMemberFinish: () => ({
    type: actionTypes.DISABLE_MEMBER_FINISH,
  }),

  //Enable Member
  singleEnableMember: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_MEMBER_REQUEST,
    payload: {data},
  }),

  singleEnableMemberSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_MEMBER_SUCCESS,
    payload: task,
  }),
  singleEnableMemberFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_MEMBER_FINISH,
  }),

  //Disable Member
  singleDisableMember: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_MEMBER_REQUEST,
    payload: {data},
  }),

  singleDisableMemberSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_MEMBER_SUCCESS,
    payload: task,
  }),
  singleDisableMemberFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_MEMBER_FINISH,
  }),
  
  // sort
  sortMember: (data: SortMemberModel) => ({
    type: actionTypes.SORT_MEMBER_START,
    payload: data,
  }),
  sortMemberSuccess: (data: Array<MemberModel>) => ({
    type: actionTypes.SORT_MEMBER_SUCCESS,
    payload: data,
  }),
  sortMemberFinish: () => ({
    type: actionTypes.SORT_MEMBER_FINISH,
  }),
  sortMemberReset: () => ({
    type: actionTypes.SORT_MEMBER_RESET,
  }),
}
