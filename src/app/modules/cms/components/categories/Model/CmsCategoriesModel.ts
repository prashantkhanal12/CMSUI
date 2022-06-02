import {OptionModel, PlaceModel} from '.'

export interface CmsCategoriesModel {
  id?: string
  name?: string
  name_np?: string
  slug?: string
  typeId?: OptionModel
  categoryId?: string
  order?: number
  status?: boolean
}
