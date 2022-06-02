export interface ProductComparisonCategoryModel {
  id?: string
  name: string
  nameNp: string
  description: string
  descriptionNp: string
  slug: string
  status: boolean | string
  order?: string
}

export interface SortProductComparisonModel {
  productComparisonCategoryId: Array<{id: string}>
}

export interface SortProductComparisonActionModel {
  payload: SortProductComparisonModel
  type: {[key: string]: string}
}
