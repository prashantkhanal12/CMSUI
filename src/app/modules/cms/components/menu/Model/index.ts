export interface MenuOptionModal {
  id?: string
  systemName?: string
  displayName?: string
}

export interface FormOptionModal {
  label: string
  value: string
  systemName?: string
}

export interface AllMenuModel {
  status?: boolean
  id?: string
}

export interface SortMenuModel {
  menuLists: Array<{id: string; parentId: string; children: any}>
}

export interface SortMenuActionModel {
  payload: SortMenuModel
  type: {[key: string]: string}
}
