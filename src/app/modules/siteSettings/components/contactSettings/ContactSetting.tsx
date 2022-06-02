import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// includes
import * as setting from 'src/app/modules/siteSettings/components/settings'
import {ISettingTypeState} from 'src/app/modules/siteSettings/components/settings'
import DynamicSettings from 'src/app/modules/common/components/settings'
import ContactPersonComponent from '../contactPersonSetting/component'

const Settings = () => {
  const dispatch = useDispatch()
  const settingTypeData: ISettingTypeState = useSelector((state: any) => state.settingType)

  useEffect(() => {
    dispatch(setting.actions.getSettingType())
  }, [])

  const settingType: any = settingTypeData?.data?.settingType
    ? settingTypeData?.data?.settingType?.find((item: any) => item.name === 'Contact')
    : {}

  return (
    <>
      <DynamicSettings
        settingTypeId={settingType?.id}
        settingTypeName={settingType?.name}
        settingName='Contact Settings'
      />
      <ContactPersonComponent />
    </>
  )
}

export default Settings
