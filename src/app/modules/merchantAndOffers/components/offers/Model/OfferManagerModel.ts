export interface OfferManagerModel {
  id?: string
  title?: string
  titleNp?: string
  slug?: string
  merchantId?: string
  categoryId?: string
  publishedDate?: string
  initiationDate?: string
  tillDate?: string
  discountTypeId?: string
  discount?: string
  thumbImage?: string
  link?: string
  shortDescription?: string
  shortDescriptionNp?: string
  description?: string
  descriptionNp?: string
  status?: boolean | string
  offerPhoneNumber?: {[key: string]: string | []}
  offerMobileNumber?: {[key: string]: string | []}
  offerAddress?: {[key: string]: string | []}
  mobileNumbers?: {[key: string]: string | []}
  offerAdresses?: {[key: string]: string | []}
  phoneNumbers?: {[key: string]: string | []}
}
