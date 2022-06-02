export interface DeleteMerchantSubCategoryModel {
  id: string
}

export interface SortMerchantSubCategoryModel {
  merchantSubCategoryId: Array<{id: string}>
}

export interface SortMerchantSubCategoryActionModel {
  payload: SortMerchantSubCategoryModel
  type: {[key: string]: string}
}
