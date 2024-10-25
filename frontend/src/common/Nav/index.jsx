import { useLocation } from 'react-router-dom'

import AdminNav from './AdminNav'
import PackerNav from './PackerNav'
import DriverNav from './DriverNav'
import SolverNav from './SolverNav'

const Nav = () => {
  const location = useLocation()

  const renderNav = () => {
    const { pathname } = location
    if (pathname.includes('/admin')) {
      return <AdminNav />
    } else if (pathname.includes('/packer')) {
      return <PackerNav />
    } else if (pathname.includes('/driver')) {
      return <DriverNav />
    } else if (pathname.includes('/solver')) {
      return <SolverNav />
    }

    return null
  }

  return renderNav()
}

export default Nav
