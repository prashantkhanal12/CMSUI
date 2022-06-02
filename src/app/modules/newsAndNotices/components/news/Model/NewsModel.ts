import {SubCategoryModel} from '../../subCategory/Model/SubCategoryModel'

export interface NewsModel {
  id?: string
  name?: string
  name_np?: string
  description?: string
  description_np?: string
  attached_file_title?: string
  attached_file_title_np?: string
  attached_file?: string
  slug?: string
  show_pop_up?: string
  published_date?: string
  archive_date?: string
  visibility_time?: string
  image?: string
  image_np?: string
  subCategory?: SubCategoryModel
  status?: boolean
}
