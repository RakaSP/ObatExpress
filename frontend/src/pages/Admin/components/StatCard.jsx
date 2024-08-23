import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styles from '../../../styles/style'

const StatCard = ({ title, value, valueTitle, change, icon, style }) => (
  <div
    className={`${style} bg-bg_card shadow-md flex-1 rounded-md h-[150px] flex justify-between flex-col relative p-3 pt-5 mt-4`}
  >
    <FontAwesomeIcon
      className="absolute top-0 right-0 text-[28px] m-2"
      icon={icon}
    />
    <div>
      <p className={`${styles.paragraph} text-text_dimPrimary`}>{title}</p>
      <h4 className={`${styles.heading4} text-text_primary`}>
        {value} {valueTitle}
      </h4>
    </div>
    <span>
      <p
        className={`${
          change >= 0 ? 'text-green-600' : 'text-red-600'
        } font-semibold inline`}
      >
        {change > 0 ? '+' : ''}
        {change}%
      </p>{' '}
      <p className="text-text_primary inline">vs Past Month</p>
    </span>
  </div>
)

export default StatCard
