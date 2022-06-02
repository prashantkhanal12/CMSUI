import {AuthModel} from './AuthModel'

export interface RolePermissionsModel {
  id: string
  name: string
  permissions: Array<{[key: string]: string}>
}
export interface UserModel {
  data: {
    id: number
    name: string
    username: string
    email: string
    mobile_number?: string
    auth?: AuthModel
    role?: RolePermissionsModel
  }
  status?: number
}
