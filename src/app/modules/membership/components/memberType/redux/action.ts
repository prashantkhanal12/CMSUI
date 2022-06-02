import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteMemberTypeModel, OptionModel, SortMemberTypeModel} from '../Model'
import {MemberTypeModel} from '../Model/MemberTypeModel'
import {actionTypes} from './constants'
export const actions = {
  // get MemberType
  getAllMemberType: () => ({
    type: actionTypes.GET_ALL_MEMBER_TYPE_START,
  }),
  getAllMemberTypeSuccess: (data: OptionModel) => ({
    type: actionTypes.GET_ALL_MEMBER_TYPE_SUCCESS,
    payload: data,
  }),
  getAllMemberTypeFinish: () => ({
    type: actionTypes.GET_ALL_MEMBER_TYPE_FINISH,
  }),

  // get MemberType DATA
  getMemberType: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_MEMBER_TYPE_START,
    payload: params,
  }),
  getMemberTypeSuccess: (data: OptionModel) => ({
    type: actionTypes.GET_MEMBER_TYPE_SUCCESS,
    payload: data,
  }),
  getMemberTypeFinish: () => ({
    type: actionTypes.GET_MEMBER_TYPE_FINISH,
  }),

  // create key
  addMemberType: (data: MemberTypeModel) => ({
    type: actionTypes.ADD_MEMBER_TYPE_START,
    payload: data,
  }),
  addMemberTypeSuccess: (task: any) => ({
    type: actionTypes.ADD_MEMBER_TYPE_SUCCESS,
    payload: task,
  }),
  addMemberTypeFinish: () => ({
    type: actionTypes.ADD_MEMBER_TYPE_FINISH,
  }),
  resetMemberType: () => ({
    type: actionTypes.RESET_MEMBER_TYPE,
  }),

  //Update MemberType
  updateMemberType: (data: MemberTypeModel, id: string) => ({
    type: actionTypes.UPDATE_MEMBER_TYPE_START,
    payload: data,
    id,
  }),

  updateMemberTypeSuccess: (data: MemberTypeModel) => ({
    type: actionTypes.UPDATE_MEMBER_TYPE_SUCCESS,
    payload: data,
  }),

  updateMemberTypeFinish: () => ({
    type: actionTypes.UPDATE_MEMBER_TYPE_FINISH,
  }),

  // delete key
  deleteMemberType: (data: DeleteMemberTypeModel[]) => ({
    type: actionTypes.DELETE_MEMBER_TYPE_START,
    payload: {memberTypeId: data},
  }),
  deleteMemberTypeSuccess: (data: any) => ({
    type: actionTypes.DELETE_MEMBER_TYPE_SUCCESS,
    payload: data,
  }),
  deleteMemberTypeFinish: () => ({
    type: actionTypes.DELETE_MEMBER_TYPE_FINISH,
  }),

  //Enable MemberType
  enableMemberType: (data: any) => ({
    type: actionTypes.ENABLE_MEMBER_TYPE_REQUEST,
    payload: {data},
  }),

  enableMemberTypeSuccess: (task: any) => ({
    type: actionTypes.ENABLE_MEMBER_TYPE_SUCCESS,
    payload: task,
  }),
  enableMemberTypeFinish: () => ({
    type: actionTypes.ENABLE_MEMBER_TYPE_FINISH,
  }),

  //Disable MemberType
  disableMemberType: (data: any) => ({
    type: actionTypes.DISABLE_MEMBER_TYPE_REQUEST,
    payload: {data},
  }),

  disableMemberTypeSuccess: (task: any) => ({
    type: actionTypes.DISABLE_MEMBER_TYPE_SUCCESS,
    payload: task,
  }),
  disableMemberTypeFinish: () => ({
    type: actionTypes.DISABLE_MEMBER_TYPE_FINISH,
  }),

  //Enable MemberType
  singleEnableMemberType: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_MEMBER_TYPE_REQUEST,
    payload: {data},
  }),

  singleEnableMemberTypeSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_MEMBER_TYPE_SUCCESS,
    payload: task,
  }),
  singleEnableMemberTypeFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_MEMBER_TYPE_FINISH,
  }),

  //Disable MemberType
  singleDisableMemberType: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_MEMBER_TYPE_REQUEST,
    payload: {data},
  }),

  singleDisableMemberTypeSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_MEMBER_TYPE_SUCCESS,
    payload: task,
  }),
  singleDisableMemberTypeFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_MEMBER_TYPE_FINISH,
  }),
  // sort
  sortMemberType: (data: SortMemberTypeModel) => ({
    type: actionTypes.SORT_MEMBER_TYPE_START,
    payload: data,
  }),
  sortMemberTypeSuccess: (data: Array<MemberTypeModel>) => ({
    type: actionTypes.SORT_MEMBER_TYPE_SUCCESS,
    payload: data,
  }),
  sortMemberTypeFinish: () => ({
    type: actionTypes.SORT_MEMBER_TYPE_FINISH,
  }),
  sortMemberTypeReset: () => ({
    type: actionTypes.SORT_MEMBER_TYPE_RESET,
  }),
}
