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

export interface DeleteMemberTypeModel {
  id: string
}

export interface SortMemberTypeModel {
  memberTypeId: Array<{id: string}>
}

export interface SortMemberTypeActionModel {
  payload: SortMemberTypeModel
  type: {[key: string]: string}
}
