export interface DeleteDocumentSubCategoryModel {
  id: string
}
export interface SortDocumentSubCategoryModel {
  documentSubCategoryId: Array<{id: string}>
}

export interface SortDocumentSubCategoryActionModel {
  payload: SortDocumentSubCategoryModel
  type: {[key: string]: string}
}
