import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteMemberModel, SortMemberModel} from '../Model'
import {MemberModel} from '../Model/MemberModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const MEMBER_DATA = `${API_URL}/member`
export const FEATURED_MEMBER = `${API_URL}/member-featured`

export const service = {
  getMember: (params: ParamsModel) => {
    return axios.get(MEMBER_DATA, {params})
  },
  getAllMember: () => {
    return axios.get(`${MEMBER_DATA}/list`)
  },
  getFeaturedMember: () => {
    return axios.get(FEATURED_MEMBER)
  },
  addMember: (data: any) => {
    return axios.post(MEMBER_DATA, data)
  },

  updateMember: (body: MemberModel, id: string) => {
    return axios.patch(`${MEMBER_DATA}/${id}`, body)
  },

  deleteMember: (data: DeleteMemberModel) => {
    return axios.delete(MEMBER_DATA, {data})
  },

  enableMember: (data: Array<string>) => {
    const selectedMember = {
      memberId: data,
    }
    return axios.patch(`${MEMBER_DATA}/enable`, selectedMember)
  },

  disableMember: (data: Array<string>) => {
    const selectedMember = {
      memberId: data,
    }
    return axios.patch(`${MEMBER_DATA}/disable`, selectedMember)
  },

  singleEnableMember: (data: Array<string>) => {
    const selectedMember = {
      memberId: [data],
    }
    return axios.patch(`${MEMBER_DATA}/enable`, selectedMember)
  },

  singleDisableMember: (data: Array<string>) => {
    const selectedMember = {
      memberId: [data],
    }
    return axios.patch(`${MEMBER_DATA}/disable`, selectedMember)
  },
  sortMember: (body: SortMemberModel) => {
    return axios.patch(`${MEMBER_DATA}/sort`, body)
  },
}
