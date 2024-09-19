import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { truck3d } from '../../assets/EmployeePage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUser,
  faPhone,
  faMoneyBill,
  faM,
} from '@fortawesome/free-solid-svg-icons'
import { shipments2, orders } from '../../constants'

const score = 49
const maxScore = 50
const segments = [15, 10, 10, 10, 5, 50]
const randomIndex = Math.floor(Math.random() * shipments2.length) + 1
const shipment = shipments2[randomIndex]

let tempScore = score
const data = segments.map((limit, index) => {
  if (index < 5) {
    if (tempScore > limit) {
      tempScore -= limit
      return limit
    } else {
      return tempScore
    }
  } else {
    return maxScore - score
  }
})
const driverMileage = Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000

function generateRandomPlate() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const randomLetter = () =>
    letters.charAt(Math.floor(Math.random() * letters.length))

  const region = randomLetter() + randomLetter()
  const numbers = Math.floor(1000 + Math.random() * 9000)
  const suffix = randomLetter() + randomLetter()

  return `${region} ${numbers} ${suffix}`
}

const mappedData = data.map((value) => ({ value }))
const rating = (Math.random() * (5 - 4) + 4).toFixed(2)
const orderIndex = Math.floor(Math.random() * shipment.orders.length) + 1
console.log(mappedData)

const Dashboard = () => {
  return (
    <div className="h-full min-h-[100vh] w-full flex flex-row">
      <div className="p-[10px] px-10 w-[40%] h-full">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h4 className="font-poppins text-text_primary font-bold text-xl">
              {shipment.driver.name}
            </h4>
            <p className="font-poppins text-text_primary opacity-60 text-base font-semibold">
              Driver
            </p>
          </div>
          <div className="h-[128px] flex flex-col justify-center">
            <ReactStars
              count={5}
              value={rating}
              size={24}
              isHalf={true}
              edit={false}
              activeColor="#ffd700"
            />
            <div className="font-poppins">
              <p className=" text-sm text-text_primary font-medium">
                Ratings: {rating}
              </p>
              <p className=" text-sm text-text_primary font-medium">
                {driverMileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
                km
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className="w-full font-poppins text-text_primary text-lg font-semibold my-4 text-center">
          Assigned to Delivery ID {shipment.id}
        </div>
        <hr />
        <div className="w-full flex flex-row mt-4 gap-4">
          <img
            src={truck3d}
            alt=""
            className="h-20 w-[80px] -scale-x-100 bg-white rounded-lg shadow-lg border-gray-200 border"
          />
          <div className="flex flex-col">
            <h5 className="font-poppins tet-text_primary text-base font-bold mt-2">
              {generateRandomPlate()}
            </h5>
            <p className="font-poppins text-text_primary text-sm font-semibold">
              150/250 kg, 35 km
            </p>
          </div>
        </div>

        <div className="mt-8 pb-8">
          <div className="w-full flex flex-row items-stretch mb-4 h-full">
            <div className="flex flex-row mr-4 pt-2 w-[80px] justify-between relative">
              <p className="text-text_primary text-xs opacity-60 font-semibold">
                <p>09:00</p>
                <p className="mt-1 whitespace-nowrap">(0.5 km)</p>
              </p>
              <div className="w-4 h-4 bg-highlight rounded-full flex justify-center">
                <div className="absolute w-1 h-[calc(100%+20px)] bg-highlight z-10"></div>
              </div>
            </div>
            <div className="w-full bg-bg_card rounded-lg shadow-lg p-4">
              <div className="w-full flex flex-row justify-between items-center font-poppins">
                <h5 className="text-text_primary font-semibold text-lg">
                  Pick Up
                </h5>
                <div className="rounded-full text-green-500 bg-green-500 bg-opacity-20 py-1 px-2 text-sm font-semibold">
                  Picked Up
                </div>
              </div>
              <p className="text-text_primary opacity-60 font-poppins text-base font-semibold">
                {shipment.warehouseStart}
              </p>
            </div>
          </div>
          {shipment.orders.map((order, index) => {
            const orderID = order.id
            const orderDetail = orders.find((order) => order.id === orderID)
            return (
              <div className="w-full flex flex-row items-stretch mb-4">
                <div className="flex flex-row mr-4 pt-2 w-[80px] justify-between relative">
                  <p className="text-text_primary text-xs opacity-60 font-semibold">
                    <p>10:00</p>
                    <p className="mt-1 whitespace-nowrap">(4 km)</p>
                  </p>
                  <div className="w-4 h-4 bg-highlight rounded-full flex justify-center">
                    <div className="absolute w-1 h-[calc(100%+20px)] bg-highlight z-10 bg-opacity-40"></div>
                  </div>
                </div>
                <div className="w-full bg-bg_card rounded-lg shadow-lg p-4">
                  <div className="w-full flex flex-row justify-between items-center font-poppins">
                    <h5 className="text-text_primary font-semibold text-lg">
                      Order #{order.id}
                    </h5>
                    <div
                      className={`${
                        index >= orderIndex
                          ? 'text-yellow-500 bg-yellow-500'
                          : 'text-green-500 bg-green-500 '
                      } rounded-full bg-opacity-20 py-1 px-2 text-sm font-semibold`}
                    >
                      {index === orderIndex
                        ? 'In Transit'
                        : index > orderIndex
                        ? 'Pending'
                        : 'Delivered'}
                    </div>
                  </div>
                  <p className="text-text_primary opacity-60 font-poppins text-base font-semibold">
                    {order.address}
                  </p>
                  <div className="flex flex-row mt-1 text-text_primary text-[15px] font-poppins">
                    <div className="flex-1">
                      <p>
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        {order.customer_name}
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faPhone} className="mr-2" />
                        +62 812 7113 9285
                      </p>
                      {/* <p>
                        <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
                        Rp.{' '}
                        {Math.floor(Math.random() * (200000 - 100000 + 1)) +
                          50000}
                      </p> */}
                    </div>
                    <div className="flex-1">
                      <ul className="list-decimal">
                        {orderDetail.items.map((item) => (
                          <li>{item.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          <div className="w-full flex flex-row items-stretch mb-4">
            <div className="flex flex-row mr-4 pt-2 w-[80px] justify-between relative">
              <p className="text-text_primary text-xs opacity-60 font-semibold">
                <p>13:00</p>
                <p className="mt-1 whitespace-nowrap">(12 km)</p>
              </p>
              <div className="w-4 h-4 bg-highlight rounded-full flex justify-center"></div>
            </div>
            <div className="w-full bg-bg_card rounded-lg shadow-lg p-4">
              <div className="w-full flex flex-row justify-between items-center font-poppins">
                <h5 className="text-text_primary font-semibold text-lg">
                  Return
                </h5>
                <div className="rounded-full text-yellow-500 bg-yellow-500 bg-opacity-20 py-1 px-2 text-sm font-semibold">
                  {orderIndex === shipment.orders.length
                    ? 'In Transit'
                    : 'Pending'}
                </div>
              </div>
              <p className="text-text_primary opacity-60 font-poppins text-base font-semibold">
                {shipment.warehouseEnd}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[60%] bg-bg_card min-h-full border-2 border-gray-200 flex items-center justify-center">
        <p className="font-poppins text-text_primary opacity-60 text-xl font-medium">
          Route not Found
        </p>
      </div>
    </div>
  )
}

export default Dashboard
