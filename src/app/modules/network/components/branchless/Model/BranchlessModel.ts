import { PlaceModel} from '.'

export interface BranchlessModel {
  id?: string
  title?: string
  title_np?: string
  telephone?: string
  address?: string
  address_np?: string
  contact_person?: string
  contact_person_np?: string
  contact_number?: string
  province?: PlaceModel
  district?: PlaceModel
  status?: boolean
}
