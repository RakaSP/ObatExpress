import React from 'react'

const MapPlaceholder = () => {
  return (
    <div className="h-full w-full">
      <iframe
        title="map-placeholder"
        src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d63460.1377616945!2d106.78219215541529!3d-6.229597419757486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x2e69f24687d85acf%3A0x13a10478ac523e9e!2sJl.%20Raya%20Pasar%20Minggu%20No.Km.%2018%202rt%2C%20RT.13%2FRW.5%2C%20Pejaten%20Timur%2C%20Ps.%20Minggu%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012510!3m2!1d-6.2703282!2d106.8466083!4m5!1s0x2e69f69e27a8f089%3A0xa836bdb82f15e4bb!2sJl.%20Kebon%20Kacang%20Raya%20No.23%2C%20RT.4%2FRW.8%2C%20Kb.%20Kacang%2C%20Kecamatan%20Tanah%20Abang%2C%20Kota%20Jakarta%20Pusat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2010240!3m2!1d-6.193728!2d106.817691!5e0!3m2!1sen!2sid!4v1726888232618!5m2!1sen!2sid"
        style={{ border: 'none', width: '100%', height: '100%' }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  )
}

export default MapPlaceholder
