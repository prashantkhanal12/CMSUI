import {useContext, ReactNode} from 'react'
import {isEmpty} from 'lodash'
import {useSelector} from 'react-redux'
import {IAuthState} from '../auth'
import {ActiveMenuContex} from 'src/cms/layout/MasterLayout'
interface Props {
  type: string
  children: ReactNode
}

const CheckPermissions = ({type, children}: Props) => {
  const auth: IAuthState = useSelector((state: any) => state.auth)
  const activeMenu: any = useContext(ActiveMenuContex)

  const hasPermission = auth?.rolePermissions?.permissions.find(
    (permission) => permission?.name === `${type} ${activeMenu?.currentActiveMenu}`
  )

  return <>{!isEmpty(hasPermission) && children}</>
}

export default CheckPermissions
