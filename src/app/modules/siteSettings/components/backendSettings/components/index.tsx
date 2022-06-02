import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

// includes
import * as setting from 'src/app/modules/siteSettings/components/settings'
import {ISettingTypeState} from 'src/app/modules/siteSettings/components/settings'
import DynamicSettings from './../../../../common/components/settings'

const Settings = () => {
  const dispatch = useDispatch()
  const settingTypeData: ISettingTypeState = useSelector((state: any) => state.settingType)

  useEffect(() => {
    dispatch(setting.actions.getSettingType())
  }, [])

  const settingType: any = settingTypeData?.data?.settingType
    ? settingTypeData?.data?.settingType?.find((item: any) => item.name === 'Backend')
    : {}

  return (
    <>
      <DynamicSettings
        settingTypeId={settingType?.id}
        settingName='Backend Settings'
        settingTypeName={settingType?.name}
      />
    </>
  )
}

export default Settings
