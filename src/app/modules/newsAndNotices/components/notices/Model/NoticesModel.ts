import {SubCategoryModel} from '../../subCategory/Model/SubCategoryModel'

export interface NoticesModel {
  id?: string
  title?: string
  title_np?: string
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
  showing_days?: number
  published_time?: string
  expiry_date?: string
  expiry_time?: string
  subCategory?: SubCategoryModel
  status?: boolean
}
