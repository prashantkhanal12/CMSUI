import {useEffect, useState} from 'react'
import {setToLS, getFromLS} from './storage'
import _, {groupBy, isEmpty, mapValues, omit} from 'lodash'
import allThemes from './themes.json'
import {useDispatch, useSelector, shallowEqual} from 'react-redux'

// includes
import * as setting from 'src/app/modules/siteSettings/components/settings'
import {ISettingTypeState} from 'src/app/modules/siteSettings/components/settings'
import {RootState} from 'src/setup/redux/RootReducer'

export const useTheme = () => {
  const dispatch = useDispatch()
  const [theme, setTheme] = useState<any>(allThemes)
  const [themeLoaded, setThemeLoaded] = useState(false)
  const settingTypeData: ISettingTypeState = useSelector((state: any) => state.settingType)
  const {guestToken}: any = useSelector<RootState>(({auth}) => auth, shallowEqual)

  useEffect(() => {
    if (guestToken && isEmpty(settingTypeData?.settingType)) {
      dispatch(setting.actions.getSettingType())
    }
  }, [guestToken])

  const getSettingType = () => {
    dispatch(setting.actions.getSettingType())
  }
  const settingType: any = settingTypeData?.settingType
    ? settingTypeData?.settingType?.find((item: any) => item.name === 'Backend')
    : {}

  useEffect(() => {
    if (!isEmpty(settingType)) {
      dispatch(setting?.actions.getSpecifiSettingType(settingType?.id, settingType?.name))
    }
  }, [settingType])

  useEffect(() => {
    if (!isEmpty(settingTypeData?.backendData)) {
      // const backendData = mapValues(groupBy(settingTypeData?.setting, 'group.name'), (obj) =>
      //   obj.map((item) => omit(item, 'group.name'))
      // )
      let d: any = {}
      settingTypeData?.backendData &&
        settingTypeData?.backendData['Theme settings']?.map((item: any) => {
          d[item?.name + ''] = item?.value
        })
      setTheme(d)
      setThemeLoaded(true)
    }
  }, [settingTypeData])

  return {theme, themeLoaded, getSettingType}
}
