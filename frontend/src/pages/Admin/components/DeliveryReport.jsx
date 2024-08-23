import React from 'react'
import styles from '../../../styles/style'
import { Link } from 'react-router-dom'
const DeliveryReport = ({ title, shipments, employees }) => {
  return (
    <div className="mb-4 mt-8 bg-bg_card pt-4 px-4 pb-2 rounded-xl shadow-lg">
      <h3 className={`${styles.heading4} text-text_primary`}>{title}</h3>
      <div className="bg-bg_card m-4 rounded-l">
        <table className="w-[100%]">
          <thead className="text-text_primary border-b-2 border-border_primary">
            <tr className="h-[40px]">
              <th className="pr-3">ID</th>
              <th className="text-left">Driver</th>
              <th className="text-left">Departure Date</th>
              <th className="text-left">Completion Date</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-text_primary">
            {shipments.map((item) => {
              const driverInfo = employees.find(
                (employee) => employee.id === item.driver_id
              )
              return (
                <tr key={item.id} className="h-[40px]">
                  <th className="pr-3">
                    <Link
                      to={`/admin/shipment/${item.id}`}
                      className="underline hover:text-highlight"
                    >
                      {item.id}
                    </Link>
                  </th>
                  <th className="text-left">
                    <a href className="underline hover:text-highlight">
                      {driverInfo.name}
                    </a>
                  </th>
                  <th className="text-left">{item.departure_date}</th>
                  <th className="text-left">
                    {item.completion_date === null ? '-' : item.completion_date}
                  </th>
                  <th className="text-left">{item.status}</th>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DeliveryReport
