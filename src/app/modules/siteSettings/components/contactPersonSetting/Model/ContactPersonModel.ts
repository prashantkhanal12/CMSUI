export interface ContactPersonModel {
  id?: string
  name?: string
  name_np?: string
  slug?: string
  description?: string
  description_np?: string
  status?: boolean | string
  order?: string
}

export interface DeleteContactPersonModel {
  id: string
}