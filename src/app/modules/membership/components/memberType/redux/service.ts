import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteMemberTypeModel, SortMemberTypeModel} from '../Model'
import {MemberTypeModel} from '../Model/MemberTypeModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const MEMBER_TYPE_DATA = `${API_URL}/member-type`

export const service = {
  getMemberType: (params: ParamsModel) => {
    return axios.get(MEMBER_TYPE_DATA, {params})
  },
  getAllMemberType: () => {
    return axios.get(`${MEMBER_TYPE_DATA}/list`)
  },

  addMemberType: (data: any) => {
    return axios.post(MEMBER_TYPE_DATA, data)
  },

  updateMemberType: (body: MemberTypeModel, id: string) => {
    return axios.patch(`${MEMBER_TYPE_DATA}/${id}`, body)
  },

  deleteMemberType: (data: DeleteMemberTypeModel) => {
    return axios.delete(MEMBER_TYPE_DATA, {data})
  },

  enableMemberType: (data: Array<string>) => {
    const selectedMemberType = {
      memberTypeId: data,
    }
    return axios.patch(`${MEMBER_TYPE_DATA}/enable`, selectedMemberType)
  },

  disableMemberType: (data: Array<string>) => {
    const selectedMemberType = {
      memberTypeId: data,
    }
    return axios.patch(`${MEMBER_TYPE_DATA}/disable`, selectedMemberType)
  },

  singleEnableMemberType: (data: Array<string>) => {
    const selectedMemberType = {
      memberTypeId: [data],
    }
    return axios.patch(`${MEMBER_TYPE_DATA}/enable`, selectedMemberType)
  },

  singleDisableMemberType: (data: Array<string>) => {
    const selectedMemberType = {
      memberTypeId: [data],
    }
    return axios.patch(`${MEMBER_TYPE_DATA}/disable`, selectedMemberType)
  },

  sortMemberType: (body: SortMemberTypeModel) => {
    return axios.patch(`${MEMBER_TYPE_DATA}/sort`, body)
  },
}
