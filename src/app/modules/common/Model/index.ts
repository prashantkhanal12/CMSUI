export interface ParamsModel {
  type?: string
  page?: number
  limit?: number
  orderBy?: string
  order?: string
  search?: string
}
export interface StateParamsModel {
  type?: string
  page: number
  limit: number
  orderBy?: string
  order?: string
  search?: string
  status?: number
}

export interface PermissionModel {
  id?: string
  action?: string
  description?: string
  name?: string
  children?: {[key: string]: string}[]
}
export interface CategoryTypeModel {
  id?: string
  system_name?: string
  display_name?: string
}
export interface MediaTypeModel {
  id?: string
  system_name?: string
  display_name?: string
}

export interface FormOptionModal {
  label: string
  value: string
  systemName?: string
}

export interface ItemType {
  id: number
  name?: string
  title?: string
  keyId: string
  parentId?: string
  children?: any
}
