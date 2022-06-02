import {CategoryModel, ContentOptionModal} from '.'

export interface ContentModel {
  id?: string
  title?: string
  titleNp?: string
  description?: string
  descriptionNp?: string
  category?: CategoryModel
  showLeadForm?: ContentOptionModal
  enablePageHeader?: ContentOptionModal
  showBanner?: ContentOptionModal
  showReview?: ContentOptionModal
  collapsibleStatus?: ContentOptionModal
  collapsibleTitle?: string
  collapsibleTitleNp?: string
  menuId?: string
  collapsibleData?: [
    {
      id: string
    }
  ]
  status?: true
}
