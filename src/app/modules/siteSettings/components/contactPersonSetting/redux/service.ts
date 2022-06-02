import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {SortContactPersonModel} from '../Model'
import {ContactPersonModel, DeleteContactPersonModel} from '../Model/ContactPersonModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const CONTACT_PERSON_API = `${API_URL}/contact-person-setting`

export const service = {
  getContactPerson: (params: ParamsModel) => {
    return axios.get(CONTACT_PERSON_API, {params})
  },
  addContactPerson: (data: any) => {
    return axios.post(CONTACT_PERSON_API, data)
  },

  updateContactPerson: (body: ContactPersonModel, id: string) => {
    return axios.patch(`${CONTACT_PERSON_API}/${id}`, body)
  },

  deleteContactPerson: (data: DeleteContactPersonModel) => {
    return axios.delete(CONTACT_PERSON_API, {data})
  },

  sortContactPerson: (body: SortContactPersonModel) => {
    return axios.patch(`${CONTACT_PERSON_API}/sort`, body)
  },
}
