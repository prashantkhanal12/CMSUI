import {useIntl} from 'react-intl'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain({data}: any) {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem to='/profile' title={'Profile'} fontIcon='bi-app-indicator' />
      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div>
      <div className='menu-item'>
        <div className='menu-content py-5'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Menu</span>
        </div>
      </div>
      {data.map((routes: any, i: number) => {
        const hasChild = routes.subRoutes ? true : false
        return (
          <AsideMenuItemWithSub to={routes.route} title={routes.title} hasBullet={true} key={i}>
            {hasChild
              ? routes.subRoutes.map((subRoutes: any, j: number) => {
                  return (
                    <AsideMenuItem
                      to={subRoutes.route}
                      title={subRoutes.title}
                      hasBullet={true}
                      key={j}
                    />
                  )
                })
              : null}
          </AsideMenuItemWithSub>
        )
      })}
    </>
  )
}
