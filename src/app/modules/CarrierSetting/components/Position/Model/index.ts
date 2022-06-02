export interface PositionModel {
  id?: string
  name?: string
  nameNp?: string
  description?: string
  descriptionNp?: string
  status?: boolean
}

export interface DeletePositionModel {
  id: string
}

export interface SortPositionModel {
  id: Array<{id: string}>
}

export interface SortPositionActionModel {
  payload: SortPositionModel
  type: {[key: string]: string}
}
