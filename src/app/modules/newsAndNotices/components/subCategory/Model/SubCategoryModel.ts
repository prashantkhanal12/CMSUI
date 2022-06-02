import {CmsCategoriesModel} from 'src/app/modules/cms/components/categories/Model/CmsCategoriesModel'

export interface SubCategoryModel {
  id?: string
  name?: string
  name_np?: string
  description?: string
  description_np?: string
  category?: CmsCategoriesModel
  order?: number
  status?: boolean
}
