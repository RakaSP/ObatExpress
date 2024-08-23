import React, { useState } from 'react'
import { orders } from '../../constants'
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

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 15

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentOrders = orders.slice(indexOfFirstRow, indexOfLastRow)
  console.log(currentOrders)
  const totalPages = Math.ceil(orders.length / rowsPerPage)

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
    <div className="py-[10px] px-10">
      <h4 className={`${styles.heading4} mt-7 text-text_primary`}>
        Shipment List
      </h4>
      <div className="bg-bg_card shadow-xl rounded-lg pt-6 pb-4 px-4 mt-5 border-gray-200">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Order ID</th>
              <th className="py-2 px-4 text-left">Customer Name</th>
              <th className="py-2 px-4 text-left">Order Date</th>
              <th className="py-2 px-4 text-left">ETA</th>
              <th className="py-2 px-4 text-left">Total Price</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-200 text-base font-medium"
              >
                <td className="py-2 px-4">
                  <NavLink
                    exact="true"
                    className="underline cursor-pointer hover:text-highlight"
                    to={`${order.id}`}
                  >
                    {order.id}
                  </NavLink>
                </td>
                <td className="py-2 px-4">{order.customer.name}</td>
                <td className="py-2 px-4">{formatDateTime(order.date)}</td>
                <td className="py-2 px-4">
                  {new Date(order.ETA).toLocaleDateString('en-GB')}
                </td>
                <td className="py-2 px-4">
                  {formatCurrency(
                    order.items.reduce(
                      (acc, item) => acc + parseInt(item.price),
                      0
                    )
                  )}
                </td>
                <td className="py-2 px-4">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul className="mt-4 flex justify-center">{renderPageNumbers()}</ul>
      </div>
    </div>
  )
}

export default OrderList