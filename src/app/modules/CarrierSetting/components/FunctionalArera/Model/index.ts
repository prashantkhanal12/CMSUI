export interface FunctionalAreaModel {
  id?: string
  name?: string
  nameNp?: string
  description?: string
  descriptionNp?: string
  status?: boolean
}

export interface DeleteFunctionalAreaModel {
  id: string
}

export interface SortFunctionalAreaModel {
  id: Array<{id: string}>
}

export interface SortFunctionalAreaActionModel {
  payload: SortFunctionalAreaModel
  type: {[key: string]: string}
}
