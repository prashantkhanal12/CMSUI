export interface ServiceTagModel {
  id?: string
  name?: string
  name_np?: string
  serviceCategoryId?: string
  status?: boolean
}

export interface DeleteServiceTagModel {
  id: string
}

export interface SortServiceTagModel {
  serviceTagId: Array<{id: string}>
}

export interface SortServiceTagActionModel {
  payload: SortServiceTagModel
  type: {[key: string]: string}
}
