export interface DeleteDocumentModel {
  id: string
}
export interface SortDocumentModel {
  documentId: Array<{id: string}>
}

export interface SortDocumentActionModel {
  payload: SortDocumentModel
  type: {[key: string]: string}
}
