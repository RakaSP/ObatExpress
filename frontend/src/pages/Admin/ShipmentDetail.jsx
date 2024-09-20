import React from 'react'
import { useParams } from 'react-router-dom'
import styles from '../../styles/style'
import {
  faClock,
  faCircleUser,
  faCircleCheck,
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import MapContainer from './components/MapContainer'
import { shipments2 } from '../../constants/index'
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import MapPlaceholder from './components/MapPlaceholer'

const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString('en-GB')
  const formattedTime = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  return `${formattedDate} ${formattedTime}`
}

const ShipmentDetail = () => {
  let { id } = useParams()
  const numericId = parseInt(id, 10)
  let shipment = shipments2.find((shipment) => shipment.id === numericId)
  if (!shipment)
    return (
      <div className="flex items-center justify-center">Shipment Not Found</div>
    )

  let isShipmentFinished = false
  return (
    <div>
      <div className="p-10px px-10">
        <h4 className={`${styles.heading4} mt-7 text-text_primary mb-2`}>
          Delivery<span className="text-sm opacity-60">/Detail - {id}</span>
        </h4>
        <div className="flex justify-between w-full">
          <div className="flex-1 w-full pr-10">
            <div className="flex flex-row">
              <div className="flex-1">
                <h5 className={`${styles.heading5}`}>Delivery Info</h5>
                <div className="flex flex-row justify-between">
                  <div className="flex-1">
                    <div>
                      <p className={`${styles.infoTitle}`}>ID</p>
                      <p className={`${styles.infoValue}`}>{shipment.id}</p>
                    </div>
                    <div>
                      <p className={`${styles.infoTitle}`}>Schedule</p>
                      <p className={`${styles.infoValue}`}>
                        {formatDateTime(shipment.departureDate)}
                      </p>
                    </div>
                    <div>
                      <p className={`${styles.infoTitle}`}>Estimated Time</p>
                      <p className={`${styles.infoValue}`}>
                        {formatDateTime(shipment.ETA)}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div>
                      <p className={`${styles.infoTitle}`}>Total Weight (KG)</p>
                      <p className={`${styles.infoValue}`}>7</p>
                    </div>
                    <div>
                      <p className={`${styles.infoTitle}`}>Total Price (IDR)</p>
                      <p className={`${styles.infoValue}`}>185.000</p>
                    </div>
                    <div>
                      <p className={`${styles.infoTitle}`}>
                        Total Distance (KM)
                      </p>
                      <p className={`${styles.infoValue}`}>17</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-row justify-between">
                <div className="flex-1">
                  <h5 className={`${styles.heading5}`}>Packer Info</h5>
                  <div>
                    <p className={`${styles.infoTitle}`}>Packer ID</p>
                    <p className={`${styles.infoValue}`}>{shipment.id}</p>
                  </div>
                  <div>
                    <p className={`${styles.infoTitle}`}>Packer Name</p>
                    <p className={`${styles.infoValue}`}>
                      {shipment.packer.name}
                    </p>
                  </div>
                  <div>
                    <p className={`${styles.infoTitle}`}>Packer Contact</p>
                    <p className={`${styles.infoValue}`}>
                      {shipment.packer.email}
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <h5 className={`${styles.heading5}`}>Driver Info</h5>
                  <div>
                    <p className={`${styles.infoTitle}`}>Driver ID</p>
                    <p className={`${styles.infoValue}`}>
                      {shipment.driver.id}
                    </p>
                  </div>
                  <div>
                    <p className={`${styles.infoTitle}`}>Driver Name</p>
                    <p className={`${styles.infoValue}`}>
                      {shipment.driver.name}
                    </p>
                  </div>
                  <div>
                    <p className={`${styles.infoTitle}`}>Driver Contact</p>
                    <p className={`${styles.infoValue}`}>
                      {shipment.driver.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-5" />
            <div>
              <h5 className={`${styles.heading5}`}>Additional Info</h5>
              <div className="flex flex-row">
                <div className="flex-1">
                  <p className={`${styles.infoTitle}`}>Vehicle Number</p>
                  <p className={`${styles.infoValue}`}>
                    {shipment.vehicle.plateNumber}
                  </p>
                </div>
                <div className="flex-1">
                  <p className={`${styles.infoTitle}`}>Vehicle Type</p>
                  <p className={`${styles.infoValue}`}>
                    {shipment.vehicle.type}
                  </p>
                </div>
                <div className="flex-1">
                  <p className={`${styles.infoTitle}`}>Orders ID</p>
                  <p className={`${styles.infoValue}`}>
                    {shipment.orders.map((order) => order.id).join(', ')}
                  </p>
                </div>
                <div className="flex-1">
                  <p className={`${styles.infoTitle}`}>Delivery Status</p>
                  <p className={`${styles.infoValue}`}>{shipment.status}</p>
                </div>
              </div>
            </div>
            <hr className="my-5" />
            <div className="h-[400px] w-full flex items-center justify-center ring-2 ring-border_primary">
              {/* <MapContainer /> */}
              <MapPlaceholder />
              {/* <p className="text-[#5e5e5e] font-poppins text-2xl">No Route</p> */}
            </div>
          </div>
          <div>
            <div className="pl-10 pr-16 pb-5 pt-10 bg-bg_card shadow-[0_0_5px_rgba(152,128,234,0.7)] max-h-[80vh] overflow-y-scroll">
              <ul className="list-none p-0">
                <hr className="ml-5 w-full border-highlight border-[1px]" />
                <li className="border-l-[2px] border-highlight p-[10px] relative m-0 before:content-['\2022'] before:text-text_primary before:text-[36px] before:absolute before:left-[-8px] before:translate-y-[-70%]">
                  <div>
                    <h5 className={`${styles.heading5}`}>Packing</h5>
                    <div>
                      <FontAwesomeIcon icon={faCircleCheck} /> Goods are loaded
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCircleUser} /> Raka Satya
                      Prasasta
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faClock} /> 10 April 2024
                    </div>
                  </div>
                </li>
                <hr className="ml-5 w-full border-highlight border-[1px]" />
                <li className="max-w-[176px] border-l-[2px] border-highlight p-[10px] relative m-0 before:content-['\2022'] before:text-text_primary before:text-[36px]  before:absolute before:left-[-8px] before:translate-y-[-70%]">
                  <div>
                    <h5 className={`${styles.heading5}`}>Pick up</h5>
                    <div>
                      <FontAwesomeIcon icon={faCircleCheck} /> Picked up
                    </div>
                    <div className="truncate">
                      <FontAwesomeIcon icon={faCircleUser} /> Santana Yuda
                      Pradata
                    </div>
                    <div className="truncate">
                      <FontAwesomeIcon icon={faLocationCrosshairs} /> Gudang
                      Farmasi dan Alat Kesehatan
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faClock} /> 12 April 2024
                    </div>
                  </div>
                </li>
                <hr className="ml-5 w-full border-highlight border-[1px]" />
                {shipment.orders.map((order) => {
                  const activeStyle = 'border-l-[2px] border-highlight'
                  return (
                    <React.Fragment key={order.id}>
                      <li
                        className={`${
                          order.status === 'Delivered' ? activeStyle : ''
                        } max-w-[176px] p-[10px] relative m-0 before:content-['\\2022'] before:text-text_primary before:text-[36px] before:absolute before:left-[-8px] before:translate-y-[-70%]`}
                      >
                        <div>
                          <h5 className={`${styles.heading5}`}>
                            Order {order.id}
                          </h5>
                          <div className="truncate">
                            <FontAwesomeIcon icon={faCircleCheck} />{' '}
                            {order.status}
                          </div>
                          <div className="truncate">
                            <FontAwesomeIcon icon={faCircleUser} />{' '}
                            {order.customer_name}
                          </div>
                          <div className="truncate">
                            <FontAwesomeIcon icon={faLocationCrosshairs} />{' '}
                            {order.address}
                          </div>
                        </div>
                      </li>
                      <hr className="ml-5 w-full border-highlight border-[1px]" />
                    </React.Fragment>
                  )
                })}
                <li
                  className={`${
                    isShipmentFinished ? styles.shipmentFinished : ''
                  } max-w-[176px] p-[10px] border-l-2 border-transparent relative m-0 before:z-10 before:content-['\\2022'] before:text-text_primary before:text-[36px] before:absolute before:left-[-8px] before:translate-y-[-70%]`}
                >
                  <div>
                    <h5 className={`${styles.heading5}`}>Warehouse</h5>
                    <div>
                      <FontAwesomeIcon icon={faCircleCheck} /> On Route
                    </div>
                    <div className="truncate">
                      <FontAwesomeIcon icon={faLocationCrosshairs} /> Gudang
                      Farmasi dan Alat Kesehatan
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faClock} /> N/A
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShipmentDetail
