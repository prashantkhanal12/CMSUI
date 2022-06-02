export interface CustomerTestimonialsModel {
  id?: string
  title?: string
  title_np?: string
  subtitle?: string
  subtitle_np?: string
  slug?: string
  image?: string
  video?: string
  short_description?: string
  short_description_np?: string
  description?: string
  description_np?: string
  thumbnail_image?: string
}

export interface DeleteCustomerTestimonialsModel {
  id: string
}

export interface SortCustomerTestimonialModel {
  customerTestimonialId: Array<{id: string}>
}

export interface SortCustomerTestimonialActionModel {
  payload: SortCustomerTestimonialModel
  type: {[key: string]: string}
}
