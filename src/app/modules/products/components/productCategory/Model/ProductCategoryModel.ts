export interface ProductCategoryModel {
  id?: string
  name: string
  nameNp: string
  status: boolean | string
  order?: string
  productCategory: {[key: string]: string}
}

export interface SortProductCategoryModel {
  productCategoryId: Array<{id: string}>
}

export interface SortProductActionModel {
  payload: SortProductCategoryModel
  type: {[key: string]: string}
}
