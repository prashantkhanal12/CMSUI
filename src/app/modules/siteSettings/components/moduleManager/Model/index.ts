export interface IModuleModel {
  alias?: string
  iconClass?: string
  id?: string
  name?: string
  navigationVisibility?: {[key: string]: string}
  order?: string
  parentId?: {[key: string]: string}
  socialIntegration?: {[key: string]: string}
  parent?: {[key: string]: string}
  status?: boolean
}

export interface ToogleStatusType {
  statusId?: string | undefined | number
  moduleId?: Array<{id: string | undefined}>
}

export interface ModuleStatusType {
  moduleId: Array<{id: string | undefined}>
}

export interface SortModuleManagerModel {
  modules: Array<{id: string}>
}

export interface SortModuleActionModel {
  payload: SortModuleManagerModel
  type: {[key: string]: string}
}

export interface ActionModelEnableDisable {
  payload: ModuleStatusType
  type: {[key: string]: string}
}
