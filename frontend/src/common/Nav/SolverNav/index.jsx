import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGears } from '@fortawesome/free-solid-svg-icons'
import styles from '../../../styles/style'

const SolverNav = () => {
  const [activeNavItemIndex, setactiveNavItemIndex] = useState(null)

  const handleNavItemClick = (index) => {
    setactiveNavItemIndex(index === activeNavItemIndex ? null : index)
  }

  const links = [
    {
      title: 'Solver',
      link: '/',
      icon: faGears,
    },
  ]
  return (
    <div className="flex flex-col justify-between flex-1">
      <nav className="mt-3">
        {links.map((item, index) => (
          <React.Fragment key={item.title}>
            <NavLink
              exact="true"
              className={`${styles.sidebar_item} flex justify-between flex-row`}
              activeclassname="active"
              to={item.link}
              onClick={() => handleNavItemClick(index)}
            >
              <div>
                <FontAwesomeIcon
                  icon={item.icon}
                  className="mr-[10px] w-[25px]"
                />
                <span>{item.title}</span>
              </div>
            </NavLink>
          </React.Fragment>
        ))}
      </nav>
    </div>
  )
}

export default SolverNav
