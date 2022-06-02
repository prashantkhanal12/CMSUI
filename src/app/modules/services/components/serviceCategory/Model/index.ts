export interface ServiceCategoryModel {
  id?: string
  name?: string
  name_np?: string
  slug?: string
  status?: boolean
}

export interface DeleteServiceCategoryModel {
  id: string
}

export interface SortServiceCategoryModel {
  serviceCategoryId: Array<{id: string}>
}

export interface SortServiceCategoryActionModel {
  payload: SortServiceCategoryModel
  type: {[key: string]: string}
}
