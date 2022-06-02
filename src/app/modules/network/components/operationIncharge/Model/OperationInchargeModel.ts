import {OptionModel, PlaceModel} from '.'
import {BranchModel} from '../../branch/Model/BranchModel'

export interface OperationInchargeModel {
  id?: string
  name?: string
  name_np?: string
  email?: string
  phone?: string
  telephone?: string
  status?: boolean
  hidden_in_website?: boolean
  branch?: BranchModel
  branchId?: string
}
