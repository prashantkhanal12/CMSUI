export interface DeleteMerchantManagerModel {
  id: string
}

export interface SortMerchantManagerModel {
  merchantId: Array<{id: string}>
}

export interface SortMerchantManagerActionModel {
  payload: SortMerchantManagerModel
  type: {[key: string]: string}
}
