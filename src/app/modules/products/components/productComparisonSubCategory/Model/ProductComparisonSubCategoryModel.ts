export interface ProductComparisonSubCategoryModel {
  id?: string
  name: string
  nameNp: string
  description: string
  descriptionNp: string
  slug: string
  status: boolean | string
  order?: string
  productComparisionCategory?: {[key: string]: string}
}

export interface SortProductComparisonSubModel {
  productComparisonSubCategoryId: Array<{id: string}>
}

export interface SortProductComparisonSubActionModel {
  payload: SortProductComparisonSubModel
  type: {[key: string]: string}
}
