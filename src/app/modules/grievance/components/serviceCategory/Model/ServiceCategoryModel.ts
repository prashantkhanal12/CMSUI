export interface ServiceCategoryModel {
  id?: string
  name?: string
  name_np?: string
  serviceCodeId?: string
  showAccountNumberField?: string | boolean
  note?: string
  noteNp?: string
  status?: boolean | string
  serviceType?: {[key: string]: string}[]
}
