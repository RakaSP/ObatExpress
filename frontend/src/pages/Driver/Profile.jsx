import React from 'react'
import styles from '../../styles/style'
import ProfileComponent from './components/ProfileComponent'
import { useOutletContext } from 'react-router-dom'
const Profile = () => {
  const shipment = useOutletContext()

  return (
    <div className="py-[10px] px-10">
      <h4 className={`${styles.heading4} mt-7 text-text_primary `}>
        Profile Info
      </h4>
      <ProfileComponent
        closeButton={false}
        style={`w-full h-full flex items-center justify-center px-10`}
        data={shipment.driver}
      />
    </div>
  )
}

export default Profile
