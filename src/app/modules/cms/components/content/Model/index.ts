export interface ContentOptionModal {
  id?: string
  systemName?: string
  displayName?: string
}

export interface FormOptionModal {
  label: string
  value: string
}

export interface CategoryModel {
  id?: string
  name?: string
  nameNp?: string
  slug?: string
  typeId?: ContentOptionModal[]
  order?: number
}
