export interface TextPopupModel {
  id?: string
  title?: string
  titleNp?: string
  url?: string
  publishDate?: string
  publishTime?: string
  expiryDate?: string
  expiryTime?: string
  status?: boolean
}

export interface DeleteTextPopupModel {
  id: string
}

export interface SortTextPopupModel {
  textPopupLists: Array<{id: string}>
}

export interface SortTextPopupActionModel {
  payload: SortTextPopupModel
  type: {[key: string]: string}
}
