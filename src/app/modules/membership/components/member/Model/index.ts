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

export interface DeleteMemberModel {
  id: string
}

export interface SortMemberModel {
  memberId: Array<{id: string}>
}

export interface SortMemberActionModel {
  payload: SortMemberModel
  type: {[key: string]: string}
}
