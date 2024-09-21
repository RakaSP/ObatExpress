import React from 'react'
import RenderPlotly2 from './components/RenderPlotly2'
import styles from '../../styles/style'
import { container } from '../../constants/pack'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
const Vehicle = () => {
  return (
    <div className="py-[10px] px-10">
      <h4 className={`${styles.heading4} mt-7 text-text_primary mb-5`}>
        Vehicle
      </h4>
      <div className="flex flex-row justify-around mt-8">
        <div className="mr-4">
          <RenderPlotly2 container={container} />
        </div>
        <div className="pl-4">
          <button className="w-full bg-red-500 rounded-lg h-[64px] text-2xl font-roboto text-white flex justify-start items-center px-6 gap-8">
            <FontAwesomeIcon icon={faDownload} />
            Download Guidebook
          </button>
          <div className="w-[360px] flex flex-col border-2 border-[#6F6F70] rounded-lg mt-4 h-full max-h-[720px] bg-white p-[20px] overflow-y-scroll">
            {container.ItemList.map((item) => (
              <div
                key={(item.ID, {})}
                className="border-2 border-[#6F6F70] rounded-md w-full p-4 mb-4"
              >
                <h3>
                  {item.Name}: {item.ID}
                </h3>
                <div>
                  Pos X: {item.PosX} Pos Y: {item.PosY} Pos Z: {item.PosZ}
                </div>
                <div>
                  Size X: {item.SizeX} Size Y: {item.SizeY} Size Z: {item.SizeZ}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Vehicle
