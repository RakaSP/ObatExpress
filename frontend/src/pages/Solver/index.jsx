import React from 'react'
import '../../styles/index.scss'
import { Outlet, useLocation } from 'react-router-dom'

const Packer = () => {
  return (
    <div className="ml-[260px] h-full">
      <Outlet />
    </div>
  )
}

export default Packer
