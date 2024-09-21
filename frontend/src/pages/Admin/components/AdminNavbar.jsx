import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../../styles/index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell,
  faExclamationTriangle,
  faImage,
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const AdminNavbar = ({ location }) => {
  const rebuildDB = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/admin/generate/db'
      )
      console.log(response)
    } catch (e) {
      console.error('Error rebuild DB: ', e)
    }
  }

  const generateOrders = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/runGenerateOrders'
      )
      console.log(response)
    } catch (e) {
      console.error('Error generate orders: ', e)
    }
  }
  const generateVehicles = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/runGenerateAvalVehicles'
      )
      console.log(response)
    } catch (e) {
      console.error('Error fetching available vehicle list: ', e)
    }
  }
  const deliverOrders = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3001/runDeliverOrders'
      )
      console.log(response)
    } catch (e) {
      console.error('Error fetching available vehicle list: ', e)
    }
  }
  const navText = [
    {
      title: 'Rebuild Database',
      trigger: rebuildDB,
    },
    {
      title: 'Generate Orders',
      trigger: generateOrders,
    },
    {
      title: 'Generate Vehicles',
      trigger: generateVehicles,
    },
    {
      title: 'Delivery Orders',
      trigger: deliverOrders,
    },
  ]

  let searchPlaceholder = 'Search Driver or Order ID'
  let disableSearch = false

  if (location.pathname.startsWith('/admin/shipment/')) {
    searchPlaceholder = 'Search Shipment ID'
  } else if (location.pathname.startsWith('/admin/order/')) {
    searchPlaceholder = 'Search Order ID'
  } else if (location.pathname.startsWith('/admin')) {
    disableSearch = true
  }

  const [notification, setNotification] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const handleNotificationClick = () => {
    setNotification((prevNotification) => !prevNotification)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const id = searchValue
    const urlParts = location.pathname.split('/')
    if (id) {
      let url
      if (urlParts[2] === 'order') {
        url = `/admin/order/${id}`
      } else if (urlParts[2] === 'shipment') {
        url = `/admin/shipment/${id}`
      }
      if (url) {
        navigate(url)
      }
    }
  }

  const handleInputChange = (event) => {
    setSearchValue(event.target.value)
  }

  return (
    <div className="min-h-[80px] flex items-center w-full bg-[#FFFFFF] shadow-md">
      <div className="flex justify-between items-center w-full px-10">
        <div className="flex flex-row items-center justify-between">
          {navText.map((item, index) => (
            <div
              key={index}
              onClick={item.trigger}
              className={`${
                index !== navText.length - 1 ? 'mr-3' : 'mr-0'
              } font-poppins flex-1 inline whitespace-nowrap border-2 rounded-md p-2 font-medium hover:cursor-pointer text-[#5E5E5E] hover:bg-[#8083FF] hover:text-white hover:border-[#8083FF]`}
            >
              {item.title}
            </div>
          ))}
        </div>
        <div className="flex flex-row items-center">
          {!disableSearch ? (
            <form className="p-3" onSubmit={handleSubmit}>
              <input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                className="font-medium font-poppins border-2 rounded-full px-5 py-2"
                placeholder={searchPlaceholder}
              />
            </form>
          ) : (
            <div className="font-poppins rounded-md px-5 py-2 bg-[#B10000]  text-white font-medium">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <span className="ml-2">Emergency</span>
            </div>
          )}
          <div className="ml-5 relative">
            <div
              className="border-2 rounded-md flex items-center p-2 cursor-pointer text-[#5e5e5e] hover:text-black "
              onClick={handleNotificationClick}
            >
              <FontAwesomeIcon icon={faBell} />
            </div>
            {notification && (
              <div className="absolute w-[360px] right-0 border-2 rounded-md z-[1] bg-white mt-4 drop-shadow-sm">
                <header className="text-text_primary font-semibold text-xl px-4 pt-2">
                  Notifications
                </header>
                <ul className="w-full mt-2">
                  <li className="border-t-[#BBB8B8] border-t w-full px-2 py-2 flex flex-row gap-4 bg-bg_card hover:bg-[#EEE] cursor-pointer transition-colors duration-300">
                    <aside>
                      <figure className="rounded-full border border-black h-8 w-8 flex items-center justify-center">
                        <img src="" alt="" />
                        <FontAwesomeIcon
                          icon={faImage}
                          className="fallback-icon"
                        />
                      </figure>
                    </aside>
                    <div>
                      <p className="text-text_primary text-[15px] font-roboto">
                        Emergency Order from{' '}
                        <span className="font-semibold">William Clark</span>{' '}
                        Received! Please review and process immediately
                      </p>
                      <p className="text-sm text-text_dimPrimary">1 hour ago</p>
                    </div>
                  </li>
                  <li className="border-t-[#BBB8B8] border-t w-full px-2 py-2 flex flex-row gap-4 bg-bg_card hover:bg-[#EEE] cursor-pointer transition-colors duration-300">
                    <aside>
                      <figure className="rounded-full border border-black h-8 w-8 flex items-center justify-center">
                        <img src="" alt="" />
                        <FontAwesomeIcon
                          icon={faImage}
                          className="fallback-icon"
                        />
                      </figure>
                    </aside>
                    <div>
                      <p className="text-text_primary text-[15px] font-roboto">
                        Emergency Order from{' '}
                        <span className="font-semibold">William Clark</span>{' '}
                        Received! Please review and process immediately
                      </p>
                      <p className="text-sm text-text_dimPrimary">1 hour ago</p>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminNavbar
