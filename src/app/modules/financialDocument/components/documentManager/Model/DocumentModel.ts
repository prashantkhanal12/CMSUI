export interface DocumentModel {
  id?: string
  name?: string
  name_np?: string
  file?: string | null
  filscalYear?: string
  nepaliYear?: string
  nepaliMonth?: string
  status?: boolean | string
  order?: string
  documentSubCategory?: {[key: string]: string}
}
