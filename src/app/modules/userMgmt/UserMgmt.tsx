import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../cms/layout/core'
import RoleMgmt from './components/roles/components/RoleMgmt'
import UserRoleIndex from './components/userRoles/UserRole'
import UserManagementIndex from './components/users/components/users'

const userRoutesBreadCrumbs: Array<PageLink> = [
  {
    title: 'User Management',
    path: '/pages/usermanagement/users',
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

const UserManagmentPage: React.FC = () => {
  return (
    <>
      <Switch>
        <Route path='/pages/usermanagement/role' exact={true}>
          <PageTitle breadcrumbs={userRoutesBreadCrumbs}>Roles</PageTitle>
          <RoleMgmt />
        </Route>
        <Route path='/pages/usermanagement/userRole' exact={true}>
          <PageTitle breadcrumbs={userRoutesBreadCrumbs}>User Roles</PageTitle>
          <UserRoleIndex />
        </Route>
        <Route path='/pages/usermanagement/users' exact={true}>
          <PageTitle breadcrumbs={userRoutesBreadCrumbs}>Users</PageTitle>
          <UserManagementIndex />
        </Route>

        <Redirect from='/pages/usermanagement' exact={true} to='/pages/usermanagement/users' />
        <Redirect to='/pages/usermanagement/users' />
      </Switch>
    </>
  )
}

export default UserManagmentPage
