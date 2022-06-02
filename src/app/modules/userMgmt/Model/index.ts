export interface RoleModel {
  name?: string
  description?: string
  permissions?: { [key: string]: string }[]
}

export interface userRoleFormModel {
  id: string
}