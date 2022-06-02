import React, {useRef, useEffect, Dispatch, SetStateAction} from 'react'
import {useLocation} from 'react-router'
import clsx from 'clsx'
import {AsideMenuMain} from './AsideMenuMain'
import {DrawerComponent, ScrollComponent, ToggleComponent} from '../../../assets/ts/components'
import {profile} from 'console'
import {useDispatch, useSelector} from 'react-redux'
import {IModuleModel} from 'src/app/modules/siteSettings/components/moduleManager/Model'
import * as moduleRedux from 'src/app/modules/siteSettings'
import * as auth from 'src/app/modules/auth'
import {isEmpty} from 'lodash'
type Props = {
  asideMenuCSSClasses: string[]
}

const AsideMenu: React.FC<Props> = ({asideMenuCSSClasses}) => {
  const dispatch = useDispatch()
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const {pathname} = useLocation()
  // const {module} = useSelector((state: any) => state.module)
  const module: any = useSelector((state: any) => state.auth.module)

  // const routeData = ModuleData
  //   ? ModuleData?.filter((items: IModuleModel) => isEmpty(items.parentId)).map(
  //       (parentData: IModuleModel) => ({
  //         route: parentData.alias,
  //         title: parentData.name,
  //         subRoutes: ModuleData?.children
  //           ?.filter((child: IModuleModel) => child?.id === parentData.id)
  //           .map((childrenData: IModuleModel) => ({
  //             route: childrenData.alias,
  //             title: childrenData.name,
  //           })),
  //       })
  //     )
  //   : []

  // useEffect(() => {
  //   if (!isEmpty(module?.moduleData)) {
  //     dispatch(auth.actions.getUserModule())
  //   }
  // }, [module])

  const routeData = !isEmpty(module?.moduleData)
    ? module?.moduleData?.map((parentData: any) => ({
        route: parentData.alias,
        title: parentData.name,
        subRoutes: parentData?.children?.map((childrenData: IModuleModel) => ({
          route: childrenData.alias,
          title: childrenData.name,
        })),
      }))
    : []

  useEffect(() => {
    setTimeout(() => {
      DrawerComponent.reinitialization()
      ToggleComponent.reinitialization()
      ScrollComponent.reinitialization()
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0
      }
    }, 50)
  }, [pathname])

  return (
    <div
      id='kt_aside_menu_wrapper'
      ref={scrollRef}
      className='hover-scroll-overlay-y my-5 my-lg-5'
      data-kt-scroll='true'
      data-kt-scroll-activate='{default: false, lg: true}'
      data-kt-scroll-height='auto'
      data-kt-scroll-dependencies='#kt_aside_logo, #kt_aside_footer'
      data-kt-scroll-wrappers='#kt_aside_menu'
      data-kt-scroll-offset='0'
    >
      <div
        id='#kt_aside_menu'
        data-kt-menu='true'
        className={clsx(
          'menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500',
          asideMenuCSSClasses.join(' ')
        )}
      >
        {/* <AsideMenuMain /> */}
        <AsideMenuMain data={routeData} />
      </div>
    </div>
  )
}

export {AsideMenu}
