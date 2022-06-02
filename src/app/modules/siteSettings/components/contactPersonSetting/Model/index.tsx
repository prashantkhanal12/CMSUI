
export interface SortContactPersonModel {
    contactPersonSettingId: Array<{id: string}>
  }
  
  export interface SortContactPersonActionModel {
    payload: SortContactPersonModel
    type: {[key: string]: string}
  }
  