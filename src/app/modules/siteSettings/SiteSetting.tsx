import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../cms/layout/core'
import BackendSettings from './components/backendSettings/components'

import ContactSetting from './components/contactSettings/ContactSetting'
import HomepageSetting from './components/homepageSettings/HomepageSetting'
// key settings
import KeySettings from './components/keySetting/components'
import AddKey from './components/keySetting/components/AddKey'
// module manager
import AddModules from './components/moduleManager/components/AddModules'
import ModuleManager from './components/moduleManager/components/ModuleManager'
import Settings from './components/settings/components/index'
import GroupSetting from './components/settings/groupSetting/components/index'
// settings
// smtp settings
import SmtpSettings from './components/smtpSetting/components'

const userRoutesBreadCrumbs: Array<PageLink> = [
  {
    title: 'Site Setting',
    path: '/pages/sitesetting/homepage',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const SiteSetting: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path='/pages/sitesetting/homepage' exact={true}>
          <PageTitle breadcrumbs={userRoutesBreadCrumbs}>Homepage Setting</PageTitle>
          <HomepageSetting />
        </Route>

        <Route path='/pages/sitesetting/contactsetting' exact={true}>
          <PageTitle breadcrumbs={userRoutesBreadCrumbs}>Contact Setting</PageTitle>
          <ContactSetting />
        </Route>

        <Route path='/pages/sitesetting/modules' exact={true}>
          <PageTitle breadcrumbs={userRoutesBreadCrumbs}> Module Manager</PageTitle>
          <ModuleManager />
        </Route>

        {/* settings */}
        <Route path='/pages/sitesetting/settings' exact={true}>
          <PageTitle breadcrumbs={userRoutesBreadCrumbs}>Settings</PageTitle>
          <Settings />
        </Route>
        {/*group settings */}
        <Route path='/pages/sitesetting/settings/groupsetting' exact={true}>
          <PageTitle breadcrumbs={userRoutesBreadCrumbs}>Group Settings</PageTitle>
          <GroupSetting />
        </Route>

        {/* smtp settings */}
        <Route path='/pages/sitesetting/smtpsettings' exact={true}>
          <PageTitle breadcrumbs={userRoutesBreadCrumbs}>SMTP Settings</PageTitle>
          <SmtpSettings />
        </Route>
        {/* Backend Settings */}
        <Route path='/pages/sitesetting/backendsettings' exact={true}>
          <PageTitle breadcrumbs={userRoutesBreadCrumbs}>Backend Settings</PageTitle>
          <BackendSettings />
        </Route>
        {/* key settings */}
        <Route path='/pages/sitesetting/keysettings' exact={true}>
          <PageTitle breadcrumbs={userRoutesBreadCrumbs}>Key Settings</PageTitle>
          <KeySettings />
        </Route>

        <Redirect from='/pages/sitesetting' exact={true} to='/pages/sitesetting/homepage' />
        <Redirect to='/pages/sitesetting/homepage' />
      </Switch>
    </>
  )
}

export default SiteSetting
