import React, {Suspense, useEffect, useState} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../cms/partials'
import {RouteList, RouteModel} from './RoutesList'
import {useSelector} from 'react-redux'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {isEmpty} from 'lodash'
import {ProfileHeader} from '../modules/profileComponent/components/ProfileHeader'
import FileManager from '../modules/common/components/fileManager/components'

export function PrivateRoutes() {
  const module: any = useSelector((state: any) => state.auth.module)
  const [authorizedRoute, setAuthorizedRoute] = useState<Array<string>>([])
  useEffect(() => {
    if (isEmpty(authorizedRoute)) {
      let newAuthorizedRoute = [...authorizedRoute]
      module?.moduleData?.map((modules: any) =>
        modules.children?.map((route: any) => {
          newAuthorizedRoute?.push(route?.alias)
        })
      )
      setAuthorizedRoute(newAuthorizedRoute)
    }
  }, [module])

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/media-manager' component={FileManager} />
        <Route path='/profile' component={ProfileHeader} />
        {RouteList?.map(
          (route: RouteModel, i: number) =>
            authorizedRoute?.includes(route?.path) && (
              <Route path={route?.path} component={route?.component} key={i} exact={route?.exact} />
            )
        )}
        <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' />
      </Switch>
    </Suspense>
  )
}
