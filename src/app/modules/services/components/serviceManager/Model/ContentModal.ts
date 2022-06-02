import { CategoryModel, ServiceOptionType } from '.'

export interface ContentModel {
  id?: 'string'
  title?: string
  titleNp?: string
  description?: string
  descriptionNp?: string
  category?: CategoryModel
  showLeadForm?: ServiceOptionType
  enablePageHeader?: ServiceOptionType
  showBanner?: ServiceOptionType
  showReview?: ServiceOptionType
  collapsibleStatus?: ServiceOptionType
  collapsibleTitle?: string
  collapsibleTitleNp?: string
  collapsibleData?: [
    {
      id: string
    }
  ]
  status?: true
}
