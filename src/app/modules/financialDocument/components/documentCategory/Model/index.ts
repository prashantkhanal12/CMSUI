export interface DeleteDocumentCategoryModel {
  id: string
}

export interface SortDocumentCategoryModel {
  documentCategoryId: Array<{id: string}>
}

export interface SortDocumentCategoryActionModel {
  payload: SortDocumentCategoryModel
  type: {[key: string]: string}
}
