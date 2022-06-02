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

export interface DeleteModel {
  id: string
}

export interface SortCategoriesModel {
  categoryId: Array<{ id: string }>
}
export interface SortActionModel {
  payload: SortCategoriesModel
  type: { [key: string]: string }
}