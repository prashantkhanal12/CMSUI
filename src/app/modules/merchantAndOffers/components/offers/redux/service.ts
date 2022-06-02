import axios from 'axios'
import {ParamsModel} from 'src/app/modules/common/Model'
import {DeleteOfferManagerModel, SortOfferManagerModel} from '../Model'
import {OfferManagerModel} from '../Model/OfferManagerModel'

const API_URL = window.__RUNTIME_CONFIG__.REACT_APP_API_URL

export const OFFER_DATA_API = `${API_URL}/offer`
export const OFFER_DISCOUNT_TYPE_API = `${API_URL}/merchant/discounttype`

export const service = {
  getOffer: (params: ParamsModel) => {
    return axios.get(OFFER_DATA_API, {params})
  },
  getAllOffer: () => {
    return axios.get(`${OFFER_DATA_API}/list`)
  },

  getDiscountType: () => {
    return axios.get(OFFER_DISCOUNT_TYPE_API)
  },

  addOffer: (data: any) => {
    return axios.post(OFFER_DATA_API, data)
  },

  updateOffer: (body: OfferManagerModel, id: string) => {
    return axios.put(`${OFFER_DATA_API}/${id}`, body)
  },

  deleteOffer: (data: DeleteOfferManagerModel) => {
    return axios.delete(OFFER_DATA_API, {data})
  },

  enableOffer: (data: Array<string>) => {
    const selectedOffer = {
      offerId: data,
    }
    return axios.patch(`${OFFER_DATA_API}/enable`, selectedOffer)
  },

  disableOffer: (data: Array<string>) => {
    const selectedOffer = {
      offerId: data,
    }
    return axios.patch(`${OFFER_DATA_API}/disable`, selectedOffer)
  },

  singleEnableOffer: (data: Array<string>) => {
    const selectedOffer = {
      offerId: [data],
    }
    return axios.patch(`${OFFER_DATA_API}/enable`, selectedOffer)
  },

  singleDisableOffer: (data: Array<string>) => {
    const selectedOffer = {
      offerId: [data],
    }
    return axios.patch(`${OFFER_DATA_API}/disable`, selectedOffer)
  },

  sortOfferManager: (body: SortOfferManagerModel) => {
    return axios.patch(`${OFFER_DATA_API}/sort`, body)
  },
}
