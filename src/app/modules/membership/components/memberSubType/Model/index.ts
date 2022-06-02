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

export interface DeleteMemberSubTypeModel {
  id: string
}
export interface SortMemberSubTypeModel {
  memberSubTypeId: Array<{id: string}>
}

export interface SortMemberSubTypeActionModel {
  payload: SortMemberSubTypeModel
  type: {[key: string]: string}
}
