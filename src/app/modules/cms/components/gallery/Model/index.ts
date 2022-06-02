export interface GalleryModel {
  id?: string
  title?: string
  titleNp?: string
  date?: string
  description?: string
  descriptionNp?: string
  thumbImage?: string
  coverImage?: string
}

export interface DeleteGalleryModel {
  albumId: string
}

export interface SortGalleryModel {
  albumId: Array<{id: string}>
}

export interface SortGalleryActionModel {
  payload: SortGalleryModel
  type: {[key: string]: string}
}
