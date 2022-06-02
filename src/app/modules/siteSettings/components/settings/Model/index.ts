export interface SettingTypeModel {
  id?: string
  name?: string
}

export interface SettingFieldModel {
  id?: string
  name?: string
  value?: string
  settingGroupId?: string
  type?: string
  group?: string
  label?: string
  settingType?: string
  colorPicker?: string
}
