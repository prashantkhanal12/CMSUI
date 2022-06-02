export interface OptionModel {
  id?: string
  system_name?: string
  display_name?: string
  systemName?: string
  displayName?: string
}

export interface PlaceModel {
  id?: string
  title?: string
  titleNp?: string
}

export interface DeleteFormDownloadModel {
  id: string
}

export interface SortFormDownloadModel {
  formDownloadId: Array<{id: string}>
}

export interface SortFormDownloadActionModel {
  payload: SortFormDownloadModel
  type: {[key: string]: string}
}
