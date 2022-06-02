import {OptionModel, PlaceModel} from '.'

export interface BranchModel {
  id?: string
  title?: string
  title_np?: string
  telephone?: string
  fax?: string
  code?: string
  latitude?: string
  longitude?: string
  address?: string
  address_np?: string
  province?: string
  district?: string
  email?: string
  extended_hour?: OptionModel
  opening_time?: string
  closing_time?: string
  description?: string
  description_np?: string
  status?: boolean
  cash_counter?: string
  upcoming_branch?: boolean
  branch_category?: OptionModel
  category?: {
    id: string
    name: string
    nameNp: string
    slug: string
    typeId: OptionModel[]
    order: number
    status?: string
  }
}
