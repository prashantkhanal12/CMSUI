import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../cms/layout/core'

// import AddContent from './components/content/Addcontent';
// import Cms from './components/content/content'

const cmsRoutesBreadCrumbs: Array<PageLink> = [
    {
        title: 'CMS',
        path: '/pages/cms/content',
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

const CmsPage: React.FC = () => {
    return (
        <>
            <Switch>
                {/* <Route path='/pages/cms/content' exact={true}>
                    <PageTitle breadcrumbs={cmsRoutesBreadCrumbs}>Content</PageTitle>
                    <Cms />
                </Route>
                <Route path='/pages/cms/content/addContent' exact={true}>
                    <AddContent />
                </Route> */}

            </Switch>
        </>
    )
}

export default CmsPage