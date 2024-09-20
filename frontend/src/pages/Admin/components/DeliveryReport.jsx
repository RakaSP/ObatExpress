import React, { useState } from 'react'
import styles from '../../../styles/style'
import { Link } from 'react-router-dom'
import DriverProfileComponent from '../../Driver/components/ProfileComponent'

const DeliveryReport = ({ shipments }) => {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString('en-GB')
    const formattedTime = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
    return `${formattedDate} ${formattedTime}`
  }

  const sortedShipments = shipments.slice().sort((a, b) => {
    return new Date(b.departureDate) - new Date(a.departureDate)
  })

  const [active, setActive] = useState(false)
  const [data, setData] = useState(null)

  const handleClose = () => {
    setData(null)
  }

  return (
    <div className="mb-4 mt-8 bg-bg_card pt-4 px-4 pb-2 rounded-xl shadow-lg">
      <h3 className={`${styles.heading4} text-text_primary`}>
        Recent Deliveries
      </h3>
      <div className="bg-bg_card m-4 rounded-l">
        <table className="min-w-full text-text_primary">
          <thead className="text-text_primary border-b-2 border-border_primary">
            <tr className="h-[40px]">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Driver</th>
              <th className="py-2 px-4 text-left">Departure Date</th>
              <th className="py-2 px-4 text-left">Completion Date</th>
              <th className="py-2 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedShipments.map((item) => {
              return (
                <tr key={item.id} className="text-base font-medium">
                  <td className="py-2 px-4">
                    <Link
                      to={`/admin/shipment/${item.id}`}
                      className="underline hover:text-highlight"
                    >
                      {item.id}
                    </Link>
                  </td>
                  <td className="py-2 px-4">
                    <p
                      href
                      className="underline hover:text-highlight inline"
                      onClick={() => {
                        setActive(true)
                        setData(item.driver)
                      }}
                    >
                      {item.driver.name}
                    </p>
                  </td>
                  <td className="py-2 px-4">
                    {formatDateTime(item.departureDate)}
                  </td>
                  <td className="py-2 px-4">
                    {item.completionDate === null
                      ? 'TBD'
                      : formatDateTime(item.completionDate)}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <span
                      className={`${
                        item.status === 'Scheduled'
                          ? 'bg-slate-500 text-slate-500'
                          : item.status === 'Ready'
                          ? 'bg-blue-500 text-blue-500'
                          : item.status === 'In Transit'
                          ? 'bg-yellow-500 text-yellow-500'
                          : item.status === 'Delayed'
                          ? 'bg-orange-500 text-orange-500'
                          : item.status === 'Delivered'
                          ? 'bg-green-500 text-green-500'
                          : 'bg-red-500 text-red-500'
                      } bg-opacity-20 py-1 px-2 rounded-md`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {data && (
        <DriverProfileComponent
          style={`${
            !active && 'hidden'
          } fixed w-full h-full flex items-center justify-center bg-black bg-opacity-30 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[9999]`}
          data={data}
          onClose={handleClose}
        />
      )}
    </div>
  )
}

export default DeliveryReport
