import React, {Suspense, useEffect, useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {GlobalStyles} from 'src/cms/layout/core/theme/globalStyles'
import {useTheme} from 'src/cms/layout/core/theme/useTheme'
import {ThemeProvider} from 'styled-components'
import {I18nProvider} from '../cms/i18n/i18nProvider'
import {LayoutProvider, LayoutSplashScreen} from '../cms/layout/core'
import AuthInit from './modules/auth/redux/AuthInit'
import {Routes} from './routing/Routes'
import {Helmet} from 'react-helmet-async'
import {ISettingTypeState} from './modules/siteSettings/components/settings'
import {useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {imageBaseUrl} from 'src/cms/helpers/constants'
import IdleTimerContainer from 'src/cms/helpers/IdleTimerContainer'

type Props = {
  basename: string
}

const App: React.FC<Props> = () => {
  const {theme, themeLoaded = true} = useTheme()
  const [applicationName, setAplicationName] = useState('')
  const [favicon, setFavicon] = useState('')
  const settingTypeData: ISettingTypeState = useSelector((state: any) => state.settingType)
  const [selectedTheme, setSelectedTheme] = useState(theme)

  useEffect(() => {
    setSelectedTheme(theme)
  }, [themeLoaded])

  useEffect(() => {
    if (!isEmpty(settingTypeData?.backendData)) {
      settingTypeData?.backendData &&
        settingTypeData?.backendData['Theme settings']?.map((item: any) => {
          if (item?.name === 'favicon') {
            setFavicon(item?.value)
          }
        })

      settingTypeData?.backendData &&
        settingTypeData?.backendData['Application Credentials']?.map((item: any) => {
          if (item?.name === 'applicationName') {
            setAplicationName(item?.value)
          }
        })
    }
  }, [settingTypeData])

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Helmet>
        <title>{applicationName || 'Admin Panel'}</title>
        <link rel='shortcut icon' href={`${imageBaseUrl}/${favicon}`} />
        <meta name='description' content={applicationName || 'Admin Panel'} />
      </Helmet>
      <BrowserRouter>
        <I18nProvider>
          <LayoutProvider>
            <AuthInit>
              {themeLoaded && (
                <ThemeProvider theme={selectedTheme}>
                  <GlobalStyles />
                  <Routes />
                  <IdleTimerContainer />
                </ThemeProvider>
              )}
            </AuthInit>
          </LayoutProvider>
        </I18nProvider>
      </BrowserRouter>
    </Suspense>
  )
}

export {App}
