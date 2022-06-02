export interface ProductTagModel {
  id?: string
  name?: string
  nameNp: string
  status: boolean | string
  order?: string
  productCategory: {[key: string]: string}
}
