export interface DeleteOfferManagerModel {
  id: string
}

export interface SortOfferManagerModel {
  offerId: Array<{id: string}>
}

export interface SortOfferManagerActionModel {
  payload: SortOfferManagerModel
  type: {[key: string]: string}
}
