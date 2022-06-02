export interface ServiceTypeModel {
  id?: string
  name?: string
  name_np?: string
  serviceCodeId?: string
  showAccountNumberField?: string | boolean
  note?: string
  noteNp?: string
  status?: boolean | string
  serviceType?: {[key: string]: string}[]
  serviceSubType?: {[key: string]: string}[]
  receiverEmails?: string
  serviceCategory?: {[key: string]: string}[]
}
