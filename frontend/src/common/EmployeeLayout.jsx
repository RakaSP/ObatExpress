import Sidebar from './Sidebar'
import styles from '../styles/style'
import { Outlet } from 'react-router-dom'
import '../styles/index.scss'

const EmployeeLayout = () => {
  return (
    <>
      <div className={`${styles.fullScreen} relative`}>
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}

export default EmployeeLayout
