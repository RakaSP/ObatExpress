import axios from 'axios'
import React from 'react'

const Trigger = () => {
  const func = async () => {
    try {
      const res = await axios.get('http://localhost:3001/avalVehicleList')
      console.log('stdout: ', res)
    } catch (e) {
      console.error('Error fetching vehicle list:', e)
    }
  }
  return (
    <div
      onClick={func}
      className="w-[480px] h-[48px] bg-slate-400 text-[24px] font-bold font-poppins"
    >
      Trigger
    </div>
  )
}

export default Trigger
