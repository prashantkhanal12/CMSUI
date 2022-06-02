import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteMemberSubTypeModel, OptionModel, SortMemberSubTypeModel} from '../Model'
import {MemberSubTypeModel} from '../Model/MemberSubTypeModel'
import {actionTypes} from './constants'
export const actions = {
  // get MemberSubType
  getAllMemberSubType: (id: string = '') => ({
    type: actionTypes.GET_ALL_MEMBER_SUB_TYPE_START,
    payload: id,
  }),
  getAllMemberSubTypeSuccess: (data: OptionModel) => ({
    type: actionTypes.GET_ALL_MEMBER_SUB_TYPE_SUCCESS,
    payload: data,
  }),
  getAllMemberSubTypeFinish: () => ({
    type: actionTypes.GET_ALL_MEMBER_SUB_TYPE_FINISH,
  }),

  // get MemberSubType DATA
  getMemberSubType: (params: ParamsModel = {page: 1, limit: 10}) => ({
    type: actionTypes.GET_MEMBER_SUB_TYPE_START,
    payload: params,
  }),
  getMemberSubTypeSuccess: (data: OptionModel) => ({
    type: actionTypes.GET_MEMBER_SUB_TYPE_SUCCESS,
    payload: data,
  }),
  getMemberSubTypeFinish: () => ({
    type: actionTypes.GET_MEMBER_SUB_TYPE_FINISH,
  }),

  // create key
  addMemberSubType: (data: MemberSubTypeModel) => ({
    type: actionTypes.ADD_MEMBER_SUB_TYPE_START,
    payload: data,
  }),
  addMemberSubTypeSuccess: (task: any) => ({
    type: actionTypes.ADD_MEMBER_SUB_TYPE_SUCCESS,
    payload: task,
  }),
  addMemberSubTypeFinish: () => ({
    type: actionTypes.ADD_MEMBER_SUB_TYPE_FINISH,
  }),
  resetMemberSubType: () => ({
    type: actionTypes.RESET_MEMBER_SUB_TYPE,
  }),

  //Update MemberSubType
  updateMemberSubType: (data: MemberSubTypeModel, id: string) => ({
    type: actionTypes.UPDATE_MEMBER_SUB_TYPE_START,
    payload: data,
    id,
  }),

  updateMemberSubTypeSuccess: (data: MemberSubTypeModel) => ({
    type: actionTypes.UPDATE_MEMBER_SUB_TYPE_SUCCESS,
    payload: data,
  }),

  updateMemberSubTypeFinish: () => ({
    type: actionTypes.UPDATE_MEMBER_SUB_TYPE_FINISH,
  }),

  // delete key
  deleteMemberSubType: (data: DeleteMemberSubTypeModel[]) => ({
    type: actionTypes.DELETE_MEMBER_SUB_TYPE_START,
    payload: {memberSubTypeId: data},
  }),
  deleteMemberSubTypeSuccess: (data: any) => ({
    type: actionTypes.DELETE_MEMBER_SUB_TYPE_SUCCESS,
    payload: data,
  }),
  deleteMemberSubTypeFinish: () => ({
    type: actionTypes.DELETE_MEMBER_SUB_TYPE_FINISH,
  }),

  //Enable MemberSubType
  enableMemberSubType: (data: any) => ({
    type: actionTypes.ENABLE_MEMBER_SUB_TYPE_REQUEST,
    payload: {data},
  }),

  enableMemberSubTypeSuccess: (task: any) => ({
    type: actionTypes.ENABLE_MEMBER_SUB_TYPE_SUCCESS,
    payload: task,
  }),
  enableMemberSubTypeFinish: () => ({
    type: actionTypes.ENABLE_MEMBER_SUB_TYPE_FINISH,
  }),

  //Disable MemberSubType
  disableMemberSubType: (data: any) => ({
    type: actionTypes.DISABLE_MEMBER_SUB_TYPE_REQUEST,
    payload: {data},
  }),

  disableMemberSubTypeSuccess: (task: any) => ({
    type: actionTypes.DISABLE_MEMBER_SUB_TYPE_SUCCESS,
    payload: task,
  }),
  disableMemberSubTypeFinish: () => ({
    type: actionTypes.DISABLE_MEMBER_SUB_TYPE_FINISH,
  }),

  //Enable MemberSubType
  singleEnableMemberSubType: (data: any) => ({
    type: actionTypes.SINGLE_ENABLE_MEMBER_SUB_TYPE_REQUEST,
    payload: {data},
  }),

  singleEnableMemberSubTypeSuccess: (task: any) => ({
    type: actionTypes.SINGLE_ENABLE_MEMBER_SUB_TYPE_SUCCESS,
    payload: task,
  }),
  singleEnableMemberSubTypeFinish: () => ({
    type: actionTypes.SINGLE_ENABLE_MEMBER_SUB_TYPE_FINISH,
  }),

  //Disable MemberSubType
  singleDisableMemberSubType: (data: any) => ({
    type: actionTypes.SINGLE_DISABLE_MEMBER_SUB_TYPE_REQUEST,
    payload: {data},
  }),

  singleDisableMemberSubTypeSuccess: (task: any) => ({
    type: actionTypes.SINGLE_DISABLE_MEMBER_SUB_TYPE_SUCCESS,
    payload: task,
  }),
  singleDisableMemberSubTypeFinish: () => ({
    type: actionTypes.SINGLE_DISABLE_MEMBER_SUB_TYPE_FINISH,
  }),

  // sort
  sortMemberSubType: (data: SortMemberSubTypeModel) => ({
    type: actionTypes.SORT_MEMBER_SUB_TYPE_START,
    payload: data,
  }),
  sortMemberSubTypeSuccess: (data: Array<MemberSubTypeModel>) => ({
    type: actionTypes.SORT_MEMBER_SUB_TYPE_SUCCESS,
    payload: data,
  }),
  sortMemberSubTypeFinish: () => ({
    type: actionTypes.SORT_MEMBER_SUB_TYPE_FINISH,
  }),
  sortMemberSubTypeReset: () => ({
    type: actionTypes.SORT_MEMBER_SUB_TYPE_RESET,
  }),
}
