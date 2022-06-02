import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteMemberSubTypeModel, SortMemberSubTypeModel} from '../Model'
import {MemberSubTypeModel} from '../Model/MemberSubTypeModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const MEMBER_TYPE_DATA = `${API_URL}/member-sub-type`

export const service = {
  getMemberSubType: (params: ParamsModel) => {
    return axios.get(MEMBER_TYPE_DATA, {params})
  },
  getAllMemberSubType: (id: string) => {
    return axios.get(`${MEMBER_TYPE_DATA}/list?memberTypeId=${id}`)
  },

  addMemberSubType: (data: any) => {
    return axios.post(MEMBER_TYPE_DATA, data)
  },

  updateMemberSubType: (body: MemberSubTypeModel, id: string) => {
    return axios.patch(`${MEMBER_TYPE_DATA}/${id}`, body)
  },

  deleteMemberSubType: (data: DeleteMemberSubTypeModel) => {
    return axios.delete(MEMBER_TYPE_DATA, {data})
  },

  enableMemberSubType: (data: Array<string>) => {
    const selectedMemberSubType = {
      memberSubTypeId: data,
    }
    return axios.patch(`${MEMBER_TYPE_DATA}/enable`, selectedMemberSubType)
  },

  disableMemberSubType: (data: Array<string>) => {
    const selectedMemberSubType = {
      memberSubTypeId: data,
    }
    return axios.patch(`${MEMBER_TYPE_DATA}/disable`, selectedMemberSubType)
  },

  singleEnableMemberSubType: (data: Array<string>) => {
    const selectedMemberSubType = {
      memberSubTypeId: [data],
    }
    return axios.patch(`${MEMBER_TYPE_DATA}/enable`, selectedMemberSubType)
  },

  singleDisableMemberSubType: (data: Array<string>) => {
    const selectedMemberSubType = {
      memberSubTypeId: [data],
    }
    return axios.patch(`${MEMBER_TYPE_DATA}/disable`, selectedMemberSubType)
  },
  sortMemberSubType: (body: SortMemberSubTypeModel) => {
    return axios.patch(`${MEMBER_TYPE_DATA}/sort`, body)
  },
}
