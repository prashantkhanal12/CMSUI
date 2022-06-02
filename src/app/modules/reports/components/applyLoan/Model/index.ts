export interface ApplyLoanModel {
  id?: string
  name?: string
  email?: string
  mobileNumber?: string
  dob?: string
  provinveId?: string
  districtId?: string
  municipality?: string
  wardno?: number | string
  laonTypeID?: string
  laonAmount?: string
}

export interface DeleteApplyLoanModel {
  id: string
}
