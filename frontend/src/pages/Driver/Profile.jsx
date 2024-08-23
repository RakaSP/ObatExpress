import React from 'react'
import styles from '../../styles/style'
import pfp from '../../assets/ProfilePhotos/pfp.png'
const Profile = () => {
  return (
    <div className="py-[10px] px-10">
      <h4 className={`${styles.heading4} mt-7 text-text_primary `}>
        Profile Info
      </h4>
      <div className="w-full h-full flex items-center justify-center px-10">
        <div className="w-[650px] mt-7 bg-bg_card shadow-md rounded-md border border-gray-200 font-poppins text-text_primary p-8">
          <div className="flex flex-row justify-start items-center">
            <div className="flex-40% rounded-lg border border-gray-200 mr-8">
              <img className="w-full h-full" src={pfp} alt="" />
            </div>
            <div className="flex flex-col">
              <div>
                <label htmlFor="" className="opacity-60 text-sm">
                  Full Name
                </label>
                <p className="font-medium">Raka Prasasta</p>
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
                <p className="font-medium">raka.s.prasasta@gmail.com</p>
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
          <div className="flex justify-center pt-[30px] pb-[20px] w-full">
            <button
              type="submit"
              class="w-[80%] relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden font-poppins text-base font-semibold text-text_primary rounded-lg group bg-gradient-to-br from-highlight to-[#00BFFF] group-hover:from-highlight group-hover:to-[#00BFFF] hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <span class="w-full relative px-5 py-2.5 transition-all ease-in duration-150 bg-bg_card rounded-md group-hover:bg-opacity-0">
                Save Changes
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
