export interface BannerModel {
  id?: string
  title?: string
  title_np?: string
  subtitle?: string
  subtitle_np?: string
  image?: string
  first_button_text?: string
  first_button_text_np?: string
  first_button_url?: string
  second_button_text?: string
  second_button_text_np?: string
  second_button_url?: string
  status?: boolean
  show_first_button?: boolean
  show_second_button?: boolean
}

export interface DeleteBannerModel {
  id: string
}


export interface SortBannerModel {
  bannerId: Array<{id: string}>
}

export interface SortBannerActionModel {
  payload: SortBannerModel
  type: {[key: string]: string}
}