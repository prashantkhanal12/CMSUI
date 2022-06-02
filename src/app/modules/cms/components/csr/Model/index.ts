export interface CsrModel {
  id?: string
  title?: string
  title_np?: string
  slug?: string
  description?: string
  description_np?: string
  shortDescription?: string
  shortDescriptionNp?: string
  fileType?: string
  thumbnailImage?: string
  file?: string
  status?: true
  order?: true
}
export interface SortCsrModel {
  csrLists: Array<{csrId: string}>
}

export interface SortCsrActionModel {
  payload: SortCsrModel
  type: {[key: string]: string}
}
export interface CsrOptionModel {
  id: string
  systemName: string
  displayName: string
}
export interface CompareCsrModal {
  label: string
  value: string
  systemName?: string
}

export interface DeleteModel {
  id: string
}

export interface CsrResponseModel {
  config: {[key: string]: string}
  data: {data: {csrFileOption: CsrOptionModel[]}}
  status: number
  statusText: string
}
