import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import styles from '../../styles/style'
import './OrderDetail.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserGear,
  faTruckRampBox,
  faTruck,
  faCreditCard,
  faBoxOpen,
  faEnvelope,
  faUser,
  faLocationArrow,
  faPhone,
} from '@fortawesome/free-solid-svg-icons'

import { orders } from '../../constants'
const OrderDetail = () => {
  let { id } = useParams()
  const numericId = parseInt(id, 10)
  let order = orders.find((order) => order.id === numericId)
  let totalPrice = 0
  return (
    <div className="py-[10px] px-10">
      <h4 className={`${styles.heading4} mt-7 text-text_primary`}>
        Order ID #{order.id}
        <NavLink
          to={`/admin/shipment/1`}
          className="ml-4 text-text_primary !text-[16px] cursor-pointer hover:text-highlight"
        >
          (Shipment #1)
        </NavLink>
      </h4>
      <div className="flex-col flex justify-between mt-7 py-6 px-10 bg-bg_card rounded-lg shadow-lg">
        <div className="flex flex-col text-text_primary font-poppins">
          <p className="text-sm font-semibold mb-1">
            <span className="w-12 inline-block">ETA</span>
            {': '}
            <span>{order.ETA}</span>
          </p>
          <p className="text-sm font-semibold mb-1">
            <span className="w-12 inline-block">USPS</span>
            {': '}
            <span>2482184721847124</span>
          </p>
        </div>
        <div className="flex-row flex justify-center">
          <div className="w-full">
            <ul id="progressbar" className="text-center w-full">
              <li className="active step0"></li>
              <li className="active step0"></li>
              <li className="active step0"></li>
              <li className="active step0"></li>
              <li className="step0"></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex-row flex flex-1 justify-center">
            <div className="flex flex-col text-center">
              <FontAwesomeIcon icon={faUserGear} className="text-[24px]" />
              <p className="font-bold mt-2">Processing</p>
            </div>
          </div>
          <div className="flex-row flex flex-1 justify-center">
            <div className="flex flex-col text-center">
              <FontAwesomeIcon icon={faCreditCard} className="text-[24px]" />
              <p className="font-bold mt-2">Confirmed</p>
            </div>
          </div>
          <div className="flex-row flex flex-1 justify-center">
            <div className="flex flex-col text-center">
              <FontAwesomeIcon icon={faTruckRampBox} className="text-[24px]" />
              <p className="font-bold mt-2">Loading</p>
            </div>
          </div>
          <div className="flex-row flex flex-1 justify-center">
            <div className="flex flex-col text-center">
              <FontAwesomeIcon icon={faTruck} className="text-[24px]" />
              <p className="font-bold mt-2">In Transit</p>
            </div>
          </div>
          <div className="flex-row flex flex-1 justify-center">
            <div className="flex flex-col text-center">
              <FontAwesomeIcon icon={faBoxOpen} className="text-[24px]" />
              <p className="font-bold mt-2">Delivered</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row mx-auto mt-8 justify-between">
        <div className="bg-bg_card shadow-md rounded-lg flex-1 mr-10 py-[20px] px-[40px] font-poppins max-h-[50vh] overflow-y-scroll">
          <h4 className={`${styles.heading42}`}>Item List</h4>
          {order.items.map((item) => {
            const subTotal = item.price * item.qty
            totalPrice += subTotal
            return (
              <React.Fragment key={item}>
                <div className="flex flex-row justify-between h-[80px] items-center">
                  <div>{item.name}</div>
                  <div className="flex flex-row w-[30%] justify-between">
                    <div>
                      <p>
                        {item.qty} x <span>{item.price} (IDR)</span>
                      </p>
                    </div>
                    <div>{subTotal} (IDR)</div>
                  </div>
                </div>
                <hr className="border-highlight border-[1px]" />
              </React.Fragment>
            )
          })}

          <div className="w-full flex justify-end mt-4">
            <div className="w-[30%]">
              <p className="flex justify-between">
                Product Total <span>{totalPrice} (IDR)</span>
              </p>
              <p className="flex justify-between">
                Shipping Cost <span>FREE</span>
              </p>
              <hr className="border-highlight border-[1px] my-4" />
              <p className="flex justify-between">
                Total <span>{totalPrice} (IDR)</span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-[25%] font-poppins flex flex-col info-card justify-between">
          <div className="bg-bg_card p-[20px] rounded-md shadow-md">
            <h5 className={`${styles.heading5}`}>Customer Details</h5>
            <hr className="border-highlight border-[1px] mb-2" />
            <div className="my-2 truncate">
              <FontAwesomeIcon icon={faUser} />
              <span>Lenore Hinrich</span>
            </div>
            <div className="my-2 truncate">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>LenoreHinrich@gmail.com</span>
            </div>
            <div className="my-2 truncate">
              <FontAwesomeIcon icon={faPhone} />
              <span>+62 712 805 0876</span>
            </div>
            <div className="my-2 truncate">
              <FontAwesomeIcon icon={faLocationArrow} />
              <span>
                Jujur Agung Rejeki. PT, JL. Gajah Mada 22, Yogyakarta, 55112,
                Purwokinanti, Pakualaman, Yogyakarta City, Special Region of
                Yogyakarta 55151
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
