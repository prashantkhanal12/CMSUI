export interface MerchantManagerModel {
  id?: string
  name?: string
  nameNp?: string
  slug?: string
  merchantCategoryId?: string
  merchantSubCategoryId?: string
  email?: string
  thumbImage?: string
  websiteLink?: string
  description?: string
  descriptionNp?: string
  status?: boolean | string
  order?: string
  merchantPhoneNumber?: {[key: string]: string | []}
  merchantMobileNumber?: {[key: string]: string | []}
  merchantAddress?: {[key: string]: string | []}
}
