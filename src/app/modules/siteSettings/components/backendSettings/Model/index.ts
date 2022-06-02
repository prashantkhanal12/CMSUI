export interface SettingTypeModel {
  id?: string
  name?: string
}

export interface SettingFieldModel {
  id?: string
  name?: string
  value?: string
  settingType?: string
  language?: string
}
