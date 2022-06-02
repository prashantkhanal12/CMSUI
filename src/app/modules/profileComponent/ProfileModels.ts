export interface IconUserModel {
  name: string
  avatar?: string
  color?: string
  initials?: string
}

export interface PasswordModel {
  oldPassword?: string
  newPassword?: string
  confirmPassword?: string
}
