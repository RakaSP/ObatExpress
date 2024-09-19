import React, { useState } from 'react'
import { troubles } from '../../constants'
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

const Troubles = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 15

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentTroubles = troubles.slice(indexOfFirstRow, indexOfLastRow)

  const totalPages = Math.ceil(troubles.length / rowsPerPage)

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
      <h4 className={`${styles.heading4} mt-7 text-text_primary`}>Troubles</h4>
      <div className="bg-bg_card shadow-xl rounded-lg pt-6 pb-4 px-4 mt-5 border-gray-200">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-md text-text_primary ">
          <thead className="bg-gray-100 border-b border-gray-200 text-lg">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Employee</th>
              <th className="py-2 px-4 text-left">Location</th>
              <th className="py-2 px-4 text-left">Time</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentTroubles.map((trouble) => (
              <tr
                key={trouble.id}
                className="border-b border-gray-200 text-base font-medium"
              >
                <td className="py-2 px-4">
                  <NavLink
                    className="underline cursor-pointer hover:text-highlight"
                    to={`${trouble.id}`}
                  >
                    {trouble.id}
                  </NavLink>
                </td>
                <td className="py-2 px-4">{trouble.name}</td>
                <td className="py-2 px-4">{trouble.location}</td>
                <td className="py-2 px-4">
                  {formatDateTime(trouble.datetime)}
                </td>
                <td className="py-2 px-4">{trouble.description}</td>
                <td className="py-2 px-4 text-center">
                  <span
                    className={`${
                      trouble.status === 'Pending'
                        ? 'bg-red-500 text-red-500'
                        : trouble.status === 'Responding'
                        ? 'bg-orange-400 text-orange-400'
                        : 'bg-green-500 text-green-500'
                    } bg-opacity-20 py-1 px-2 rounded-md`}
                  >
                    {trouble.status}
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

export default Troubles
