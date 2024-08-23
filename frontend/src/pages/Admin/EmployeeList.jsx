import React, { useState, useRef, useEffect } from 'react'
import styles from '../../styles/style'
import { employees } from '../../constants'
import '../../styles/index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

const jobRoles = [
  {
    id: 1,
    role: 'Admin',
  },
  {
    id: 2,
    role: 'Driver',
  },
  {
    id: 3,
    role: 'Packer',
  },
]
const EmployeeList = () => {
  const [activeRole, setActiveRole] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [filteredEmployeesData, setFilteredEmployeesData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const itemsPerPage = 16

  const handleListClick = (index) => {
    setActiveRole(index)
    firstPage()
  }

  const firstPage = () => {
    setCurrentPage(1)
  }

  const handleInputChange = (event) => {
    setSearchValue(event.target.value)
  }

  useEffect(() => {
    let filteredData = employees

    if (searchValue !== '') {
      filteredData = filteredData.filter((employee) =>
        employee.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    }

    setFilteredEmployeesData(filteredData)
  }, [searchValue])

  useEffect(() => {
    let filteredData = employees
    if (activeRole === 1) {
      filteredData = employees.filter((item) => item.role === 'Admin')
    } else if (activeRole === 2) {
      filteredData = employees.filter((item) => item.role === 'Driver')
    } else if (activeRole === 3) {
      filteredData = employees.filter((item) => item.role === 'Packer')
    }
    setFilteredEmployeesData(filteredData)
  }, [activeRole])

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const importAll = (r) => {
    let images = {}
    r.keys().map((item) => {
      images[item.replace('./', '')] = r(item)
    })
    return images
  }

  const images = importAll(
    require.context('../../assets/ProfilePhotos', false, /\.(png|jpe?g|svg)$/)
  )

  const getEmployeeImage = (filename) => {
    return images[filename]
  }

  const renderCardRow = () => {
    let indents = []
    const paginatedEmployees = filteredEmployeesData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    )

    for (let i = 0; i < Math.ceil(paginatedEmployees.length / 4); i++) {
      let currentEmployees = paginatedEmployees.slice(i * 4, (i + 1) * 4)

      indents.push(
        <div
          className="flex flex-row justify-start mb-4 gap-4 font-poppins"
          key={i}
        >
          {currentEmployees.map((employee) => (
            <div
              className="w-[24%] relative py-4 px-3 rounded-md border-2 border-gray-200 shadow-md bg-bg_card"
              key={employee.id}
            >
              <div
                className={`absolute top-2 right-4 items-center py-1 px-2 rounded-md ${
                  employee.status === 'Idle'
                    ? 'bg-slate-500 text-slate-500'
                    : employee.status === 'Available' ||
                      employee.status === 'Active'
                    ? 'bg-green-500 text-green-500'
                    : employee.status === 'Assigned'
                    ? 'bg-blue-500 text-blue-500'
                    : employee.status === 'En Route' ||
                      employee.status === 'Loading'
                    ? 'bg-yellow-500 text-yellow-500'
                    : 'bg-red-500 text-red-500'
                } bg-opacity-25`}
              >
                <span className="text-xs font-[500]">{employee.status}</span>
              </div>
              <div className="w-full flex flex-col justify-center items-center mb-2">
                <div className="relative w-[64px] h-[64px]">
                  <img
                    src={getEmployeeImage(employee.pfp)}
                    alt={employee.name}
                    className="w-full h-full object-cover rounded-full border-2"
                  />
                </div>
                <div className="flex items-center flex-col">
                  <h3 className="text-lg font-semibold text-text_primary">
                    {employee.name}
                  </h3>
                  <p className="text-base font-medium text-text_dimPrimary">
                    {employee.role}
                  </p>
                </div>
              </div>
              <div className="text-sm text-text_primary bg-highlight bg-opacity-30 px-4 py-2 rounded-md">
                <p className="text-sm font-[500] my-1">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <a
                    href={`mailto:${employee.email}`}
                    className="hover:text-highlight ml-2"
                  >
                    {employee.email}
                  </a>
                </p>
                <p className="text-sm font-[500] my-1">
                  <FontAwesomeIcon icon={faPhone} />
                  <a
                    href={`tel:${employee.phone}`}
                    className="hover:text-highlight ml-2"
                  >
                    {employee.phone}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      )
    }
    return indents
  }

  return (
    <div className="relative py-[10px] px-10">
      <h4 className={`${styles.heading4} mt-7 text-text_primary`}>
        {filteredEmployeesData.length} Employees
      </h4>
      <div className="mt-5 bg-bg_card rounded-xl pt-8 px-4 pb-2 shadow-lg">
        <div className="flex flex-row items-center justify-between mb-4">
          <ul className="flex flex-row">
            {[{ id: 0, role: 'All Employees' }, ...jobRoles].map(
              (item, index) => (
                <div
                  key={index}
                  className={`${
                    activeRole === index
                      ? 'text-white'
                      : 'bg-opacity-20 hover:bg-opacity-100 text-highlight hover:text-[#fff]'
                  } bg-highlight rounded-md mx-2 p-2 text-[14px] w-[120px] text-center font-semibold cursor-pointer`}
                  onClick={() => handleListClick(index)}
                >
                  {item.role}
                </div>
              )
            )}
          </ul>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={searchValue}
              onChange={handleInputChange}
              placeholder="Search Employee Name"
              className="font-medium border-2 rounded-full px-4 py-1 outline-none"
            />
          </form>
        </div>
        <div className="m-4">{renderCardRow()}</div>
        <div className="flex justify-center mt-4">
          {Array.from(
            { length: Math.ceil(filteredEmployeesData.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-1 px-3 py-1 border-2 rounded ${
                  currentPage === index + 1
                    ? 'bg-highlight text-white'
                    : 'bg-white text-highlight'
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default EmployeeList
