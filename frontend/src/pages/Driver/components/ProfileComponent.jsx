import React from 'react'
import pfp from '../../../assets/ProfilePhotos/pfp.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
const ProfileComponent = ({ closeButton = true, style, data, onClose }) => {
  return (
    <div className={`${style}`}>
      <div className="w-[650px] mt-7 bg-bg_card shadow-md rounded-md border border-gray-200 font-poppins text-text_primary p-8 relative">
        {closeButton && (
          <FontAwesomeIcon
            icon={faClose}
            className="absolute top-5 right-5 text-text_dimPrimary hover:text-red-500 rounded-full text-4xl flex items-center justify-center"
            onClick={onClose}
          />
        )}
        <div className="flex flex-row justify-start items-center">
          <div className="flex-40% rounded-lg border border-gray-200 mr-8">
            <img className="w-full h-full" src={pfp} alt="" />
          </div>
          <div className="flex flex-col">
            <div>
              <label htmlFor="" className="opacity-60 text-sm">
                Full Name
              </label>
              <p className="font-medium">{data.name}</p>
            </div>
            <div>
              <label htmlFor="" className="opacity-60 text-sm">
                Role
              </label>
              <p className="font-medium">Driver</p>
            </div>
            <div>
              <label htmlFor="" className="opacity-60 text-sm">
                Email
              </label>
              <p className="font-medium">{data.email}</p>
            </div>
            <div>
              <label htmlFor="" className="opacity-60 text-sm">
                Phone
              </label>
              <p className="font-medium">+62 812-7113-9285</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col my-6">
          <p className="text-base font-medium">License Type</p>
          <div className="flex flex-row gap-3 mt-[6px]">
            <div className="text-sm  font-medium rounded-xl px-3 py-1 bg-highlight text-highlight bg-opacity-20">
              B1 - Light Truck
            </div>
            <div className="text-sm  font-medium rounded-xl px-3 py-1 bg-highlight text-highlight bg-opacity-20">
              C1 - Scooter
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex flex-row items-center">
          <div className="flex flex-col items-center w-[25%]">
            <p className="text-sm opacity-60">Days Active</p>
            <p className="font-semibold">275</p>
          </div>
          <div className="flex flex-col items-center w-[25%]">
            <p className="text-sm opacity-60">Distance Traveled</p>
            <p className="font-semibold">8 475 km</p>
          </div>
          <div className="flex flex-col items-center w-[25%]">
            <p className="text-sm opacity-60">Payload Delivered</p>
            <p className="font-semibold">1 235 kg</p>
          </div>
          <div className="flex flex-col items-center w-[25%]">
            <p className="text-sm opacity-60">Orders Completed</p>
            <p className="font-semibold">3 571</p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex flex-row items-center">
          <div className="flex flex-col items-center w-[25%]">
            <p className="text-sm opacity-60">On-Time Delivery</p>
            <p className="font-semibold">97.34%</p>
          </div>
          <div className="flex flex-col items-center w-[25%]">
            <p className="text-sm opacity-60">Safety Record</p>
            <p className="font-semibold">21 / 3 571</p>
          </div>
          <div className="flex flex-col items-center w-[25%]">
            <p className="text-sm opacity-60">Ratings</p>
            <p className="font-semibold">4.90</p>
          </div>
        </div>
        <hr className="my-4" />
      </div>
    </div>
  )
}

export default ProfileComponent
