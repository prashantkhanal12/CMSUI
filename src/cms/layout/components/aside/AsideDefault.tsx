import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import {useLayout} from '../../core'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {AsideMenu} from './AsideMenu'
import {useSelector} from 'react-redux'
import {ISettingTypeState} from 'src/app/modules/siteSettings/components/settings'
import {isEmpty, iteratee} from 'lodash'
import {imageBaseUrl} from 'src/cms/helpers/constants'

const AsideDefault: FC = () => {
  const {config, classes} = useLayout()
  const {aside} = config
  const [logo, setLogo] = useState('')
  const settingTypeData: ISettingTypeState = useSelector((state: any) => state.settingType)

  useEffect(() => {
    if (!isEmpty(settingTypeData?.backendData)) {
      settingTypeData?.backendData &&
        settingTypeData?.backendData['Theme settings']?.map((item: any) => {
          if (item?.name === 'mainLogo') {
            setLogo(item?.value)
          }
        })
    }
  }, [settingTypeData])

  return (
    <div
      id='kt_aside'
      className={clsx('aside', classes.aside.join(' '))}
      data-kt-drawer='true'
      data-kt-drawer-name='aside'
      data-kt-drawer-activate='{default: true, lg: false}'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'200px', '300px': '250px'}"
      data-kt-drawer-direction='start'
      data-kt-drawer-toggle='#kt_aside_mobile_toggle'
    >
      {/* begin::Brand */}
      <div
        className='aside-logo flex-column-auto'
        id='kt_aside_logo'
        style={{backgroundColor: 'white'}}
      >
        {/* begin::Logo */}
        {aside.theme === 'dark' && (
          <Link to='/dashboard'>
            <img alt='Logo' className='h-50px logo' src={`${imageBaseUrl}/${logo}`} />
          </Link>
        )}
        {aside.theme === 'light' && (
          <Link to='/dashboard'>
            <img alt='Logo' className='h-50px logo' src={`${imageBaseUrl}/${logo}`} />
          </Link>
        )}
        {/* end::Logo */}

        {/* begin::Aside toggler */}
        {/* {aside.minimize && (
          <div
            id='kt_aside_toggle'
            className='btn btn-icon w-auto px-0 btn-active-color-primary aside-toggle'
            data-kt-toggle='true'
            data-kt-toggle-state='active'
            data-kt-toggle-target='body'
            data-kt-toggle-name='aside-minimize'
          >
            <KTSVG
              path={'/media/icons/duotune/arrows/arr080.svg'}
              className={'svg-icon-1 rotate-180'}
            />
          </div>
        )} */}
        {/* end::Aside toggler */}
      </div>
      {/* end::Brand */}

      {/* begin::Aside menu */}
      <div className='aside-menu flex-column-fluid'>
        <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
      </div>
      {/* end::Aside menu */}
    </div>
  )
}

export {AsideDefault}
