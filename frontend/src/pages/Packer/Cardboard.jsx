import React from 'react'
import RenderPlotly from './components/RenderPlotly'
import styles from '../../styles/style'
const Cardboard = () => {
  return (
    <div className="py-[10px] px-10">
      <h4 className={`${styles.heading4} mt-7 text-text_primary mb-5`}>
        Cardboard
      </h4>
      <RenderPlotly />
    </div>
  )
}

export default Cardboard
