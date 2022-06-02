export interface RoadBlockPopupModel {
  id?: string
  title?: string
  titleNp?: string
  description?: string
  descriptionNp?: string
  startDate?: string
  startTime?: string
  endDate?: string
  endTime?: string
  status?: boolean
}

export interface DeleteRoadBlockPopupModel {
  id: string
}

export interface SortRoadBlockModel {
  roadBlockPopupLists: Array<{id: string}>
}

export interface SortRoadBlockActionModel {
  payload: SortRoadBlockModel
  type: {[key: string]: string}
}
