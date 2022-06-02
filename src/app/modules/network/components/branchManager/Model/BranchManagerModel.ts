import {OptionModel, PlaceModel} from '.'

export interface BranchManagerModel {
  id?: string
  name?: string
  nameNp?: string
  email?: string
  managerPhone?: string
  phone?: string
  status?: boolean
  hideInWebsite?: boolean
  branch?: PlaceModel
}
