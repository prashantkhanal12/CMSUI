export interface RoleModel {
  name?: string
  description?: string
  permissions?: {[key: string]: string}[]
  search?: string
  orderBy?: string
}

export interface RoleModel1 {
  userId?: string
  roles?: string
  search?: string
  orderBy?: string
  //permissions?: {[key: string]: string}[]
}

export interface DeleteRoleModel {
  id?: string
}
