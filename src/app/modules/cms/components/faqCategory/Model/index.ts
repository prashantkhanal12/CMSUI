export interface FaqCategoryModel {
  id?: string
  name?: string
  name_np?: string
  slug?: string
  iconTypeId?: string
  image?: string
  iconType?: string
  status?: boolean
  parent?: {[key: string]: string}[]
}

export interface DeleteFaqCategoryModel {
  id: string
}

export interface FaqParamsModel {
  id?: string
  status?: boolean
}

export interface IconOptionModel {
  label: string
  value: string
  system_name?: string
}
export interface SortFaqCategoryModel {
  faqCategoryId: Array<{id: string; parentId: string}>
}

export interface SortFaqCategoryActionModel {
  payload: SortFaqCategoryModel
  type: {[key: string]: string}
}
