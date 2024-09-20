import React, { useState } from 'react'
import { shipments2 } from '../../constants'
import { NavLink } from 'react-router-dom'
import styles from '../../styles/style'

const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString('en-GB')
  const formattedTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  return `${formattedDate} ${formattedTime}`
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const ShipmentList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 15

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentShipments = shipments2.slice(indexOfFirstRow, indexOfLastRow)

  const totalPages = Math.ceil(shipments2.length / rowsPerPage)

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id))
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          id={i}
          onClick={handleClick}
          className={`${
            currentPage === i
              ? 'text-highlight cursor-pointer'
              : 'cursor-pointer'
          } inline-block mx-1 px-2 py-1 border border-gray-200 rounded`}
        >
          {i}
        </li>
      )
    }
    return pageNumbers
  }

  return (
    <div className="p-[10px] px-10">
      <h4 className={`${styles.heading4} mt-7 text-text_primary`}>
        Delivery List
      </h4>
      <div className="bg-bg_card shadow-xl rounded-lg pt-6 pb-4 px-4 mt-5 border-gray-200">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-md text-text_primary ">
          <thead className="bg-gray-100 border-b border-gray-200 text-lg">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Departure</th>
              <th className="py-2 px-4 text-left">ETA</th>
              <th className="py-2 px-4 text-left">Total Price</th>
              <th className="py-2 px-4 text-left">Total Weight</th>
              <th className="py-2 px-4 text-left">Total Distance</th>
              <th className="py-2 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentShipments.map((shipment) => (
              <tr
                key={shipment.id}
                className="border-b border-gray-200 text-base font-medium"
              >
                <td className="py-2 px-4">
                  <NavLink
                    className="underline cursor-pointer hover:text-highlight"
                    to={`${shipment.id}`}
                  >
                    {shipment.id}
                  </NavLink>
                </td>
                <td className="py-2 px-4">
                  {formatDateTime(shipment.departureDate)}
                </td>
                <td className="py-2 px-4">{formatDateTime(shipment.ETA)}</td>
                <td className="py-2 px-4">
                  {formatCurrency(shipment.totalPrice)}
                </td>
                <td className="py-2 px-4">{shipment.totalWeight} KG</td>
                <td className="py-2 px-4">{shipment.totalDistance} KM</td>
                <td className="py-2 px-4 text-center">
                  <span
                    className={`${
                      shipment.status === 'Scheduled'
                        ? 'bg-slate-500 text-slate-500'
                        : shipment.status === 'Ready'
                        ? 'bg-blue-500 text-blue-500'
                        : shipment.status === 'In Transit'
                        ? 'bg-yellow-500 text-yellow-500'
                        : shipment.status === 'Delayed'
                        ? 'bg-orange-500 text-orange-500'
                        : shipment.status === 'Delivered'
                        ? 'bg-green-500 text-green-500'
                        : 'bg-red-500 text-red-500'
                    } bg-opacity-20 py-1 px-2 rounded-md`}
                  >
                    {shipment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul className="mt-4 flex justify-center">{renderPageNumbers()}</ul>
      </div>
    </div>
  )
}

export default ShipmentList
