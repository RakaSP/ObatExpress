import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts'
import { truck3d } from '../../assets/EmployeePage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPhone } from '@fortawesome/free-solid-svg-icons'
const COLORS = [
  { start: '#FF0000', end: '#FF7F7F' },
  { start: '#FFA500', end: '#FFD700' },
  { start: '#FFFF00', end: '#FFFF99' },
  { start: '#00FF00', end: '#7FFF00' },
  { start: '#00FFFF', end: '#E0FFFF' },
]

const score = 49
const maxScore = 50
const segments = [15, 10, 10, 10, 5, 50]

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

const mappedData = data.map((value) => ({ value }))

console.log(mappedData)

const Dashboard = () => {
  return (
    <div className="h-full w-full flex flex-row">
      <div className="p-[10px] px-10 w-[40%] h-full">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <h4 className="font-poppins text-text_primary font-bold text-xl">
              Raka Prasasta
            </h4>
            <p className="font-poppins text-text_primary opacity-60 text-base font-semibold">
              Driver
            </p>
          </div>
          <div className="h-[128px] flex flex-row items-center">
            <div className="mr-4 font-poppins text-right">
              <p className=" text-base text-text_primary font-medium mb-1">
                7 480 km
              </p>
              <p className=" text-sm text-text_primary font-medium">
                Orders Delivered
              </p>
              <p className=" text-sm text-text_primary font-medium">134</p>
            </div>
            <div className="h-[100px] w-[100px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    {mappedData.map((_, index) => (
                      <linearGradient
                        key={`gradient-${index}`}
                        id={`myGradient${index}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor={COLORS[index % COLORS.length].start}
                        />
                        <stop
                          offset="100%"
                          stopColor={COLORS[index % COLORS.length].end}
                        />
                      </linearGradient>
                    ))}
                  </defs>
                  <Pie
                    data={mappedData}
                    dataKey="value"
                    innerRadius={36}
                    outerRadius={48}
                  >
                    <Label
                      value={(score / 10).toFixed(2)}
                      position="center"
                      fontSize={18}
                      fontWeight="bold"
                      fill="#000"
                    />
                    {mappedData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`url(#myGradient${index})`}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <hr />
        <div className="w-full font-poppins text-text_primary text-lg font-semibold my-4 text-center">
          Assigned to Delivery ID 5
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
              AB 6243 CD
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
                <p className="mt-1 whitespace-nowrap">(3 km)</p>
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
                Address
              </p>
            </div>
          </div>

          <div className="w-full flex flex-row items-stretch mb-4">
            <div className="flex flex-row mr-4 pt-2 w-[80px] justify-between relative">
              <p className="text-text_primary text-xs opacity-60 font-semibold">
                <p>10:00</p>
                <p className="mt-1 whitespace-nowrap">(123 km)</p>
              </p>
              <div className="w-4 h-4 bg-highlight rounded-full flex justify-center">
                <div className="absolute w-1 h-[calc(100%+20px)] bg-highlight z-10"></div>
              </div>
            </div>
            <div className="w-full bg-bg_card rounded-lg shadow-lg p-4">
              <div className="w-full flex flex-row justify-between items-center font-poppins">
                <h5 className="text-text_primary font-semibold text-lg">
                  Order #1
                </h5>
                <div className="rounded-full text-green-500 bg-green-500 bg-opacity-20 py-1 px-2 text-sm font-semibold">
                  In Transit
                </div>
              </div>
              <p className="text-text_primary opacity-60 font-poppins text-base font-semibold">
                Address
              </p>
              <div className="flex flex-row mt-1 text-text_primary text-[15px] font-poppins">
                <div className="flex-1">
                  <p>
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Raka Prasasta
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                    +62 812 7113 9285
                  </p>
                </div>
                <div className="flex-1">
                  <ul className="list-decimal">
                    <li>Item #1</li>
                    <li>Item #1</li>
                    <li>Item #1</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-row items-stretch mb-4">
            <div className="flex flex-row mr-4 pt-2 w-[80px] justify-between relative">
              <p className="text-text_primary text-xs opacity-60 font-semibold">
                <p>11:00</p>
                <p className="mt-1 whitespace-nowrap">(3 km)</p>
              </p>
              <div className="w-4 h-4 bg-highlight rounded-full flex justify-center">
                <div className="absolute w-1 h-[calc(100%+20px)] bg-highlight z-10"></div>
              </div>
            </div>
            <div className="w-full bg-bg_card rounded-lg shadow-lg p-4">
              <div className="w-full flex flex-row justify-between items-center font-poppins">
                <h5 className="text-text_primary font-semibold text-lg">
                  Order #2
                </h5>
                <div className="rounded-full text-yellow-500 bg-yellow-500 bg-opacity-20 py-1 px-2 text-sm font-semibold">
                  Pending
                </div>
              </div>
              <p className="text-text_primary opacity-60 font-poppins text-base font-semibold">
                Address
              </p>
              <div className="flex flex-row mt-1 text-text_primary text-[15px] font-poppins">
                <div className="flex-1">
                  <p>
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Raka Prasasta
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                    +62 812 7113 9285
                  </p>
                </div>
                <div className="flex-1">
                  <ul className="list-decimal">
                    <li>Item #1</li>
                    <li>Item #1</li>
                    <li>Item #1</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-row items-stretch mb-4">
            <div className="flex flex-row mr-4 pt-2 w-[80px] justify-between relative">
              <p className="text-text_primary text-xs opacity-60 font-semibold">
                <p>12:00</p>
                <p className="mt-1 whitespace-nowrap">(3 km)</p>
              </p>
              <div className="w-4 h-4 bg-highlight rounded-full flex justify-center">
                <div className="absolute w-1 h-[calc(100%+20px)] bg-highlight z-10"></div>
              </div>
            </div>
            <div className="w-full bg-bg_card rounded-lg shadow-lg p-4">
              <div className="w-full flex flex-row justify-between items-center font-poppins">
                <h5 className="text-text_primary font-semibold text-lg">
                  Order #3
                </h5>
                <div className="rounded-full text-yellow-500 bg-yellow-500 bg-opacity-20 py-1 px-2 text-sm font-semibold">
                  Pending
                </div>
              </div>
              <p className="text-text_primary opacity-60 font-poppins text-base font-semibold">
                Address
              </p>
              <div className="flex flex-row mt-1 text-text_primary text-[15px] font-poppins">
                <div className="flex-1">
                  <p>
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Raka Prasasta
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faPhone} className="mr-2" />
                    +62 812 7113 9285
                  </p>
                </div>
                <div className="flex-1">
                  <ul className="list-decimal">
                    <li>Item #1</li>
                    <li>Item #1</li>
                    <li>Item #1</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-row items-stretch mb-4">
            <div className="flex flex-row mr-4 pt-2 w-[80px] justify-between relative">
              <p className="text-text_primary text-xs opacity-60 font-semibold">
                <p>13:00</p>
                <p className="mt-1 whitespace-nowrap">(3 km)</p>
              </p>
              <div className="w-4 h-4 bg-highlight rounded-full flex justify-center"></div>
            </div>
            <div className="w-full bg-bg_card rounded-lg shadow-lg p-4">
              <div className="w-full flex flex-row justify-between items-center font-poppins">
                <h5 className="text-text_primary font-semibold text-lg">
                  Return
                </h5>
                <div className="rounded-full text-yellow-500 bg-yellow-500 bg-opacity-20 py-1 px-2 text-sm font-semibold">
                  Pending
                </div>
              </div>
              <p className="text-text_primary opacity-60 font-poppins text-base font-semibold">
                Address
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
