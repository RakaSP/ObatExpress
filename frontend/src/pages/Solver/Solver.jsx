import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faGear, faTimes } from '@fortawesome/free-solid-svg-icons'

const Vehicle = () => {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setUploadProgress(0) // Reset progress when a new file is selected
      handleUpload(selectedFile) // Start upload immediately after selection
    }
  }

  const handleUpload = (selectedFile) => {
    setUploading(true)
    setUploadProgress(0)

    const totalSize = selectedFile.size
    let uploadedSize = 0

    const interval = setInterval(() => {
      if (uploadedSize < totalSize) {
        uploadedSize += totalSize / 10
        setUploadProgress(Math.min((uploadedSize / totalSize) * 100, 100))
      } else {
        clearInterval(interval)
      }
    }, 300)

    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)
    }, 3000)
  }

  const handleCancel = () => {
    setUploading(false)
    setUploadProgress(0)
    setFile(null)
  }

  return (
    <div className="py-10 px-10">
      <h4 className="text-3xl font-bold text-text_primary mb-5">Solver</h4>
      <div className="border-dashed border-2 hover:border-[#3e4756] transition duration-200 rounded-lg text-lg font-roboto flex items-center gap-4 w-[420px] h-[160px] bg-white justify-center">
        {!uploading ? (
          <div className="flex flex-col items-center w-full h-full">
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
            />
            <button
              className="w-full h-full text-[#4f6180]"
              onClick={() => fileInputRef.current.click()}
            >
              Upload <span className="text-text_primary font-[500]">JSON</span>{' '}
              problem instance to solve it
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {uploadProgress < 100 && (
              <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
                <div
                  className="bg-red-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
            {uploadProgress === 100 && (
              <div className="text-text_primary font-medium mt-2">
                Upload Successfully!
              </div>
            )}
            <div className="flex space-x-4 mt-2">
              <button
                className={`rounded-lg py-2 text-lg font-roboto flex justify-center items-center px-6 gap-4 transition duration-200 ${
                  uploadProgress === 100
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                }`}
                disabled={uploadProgress < 100}
              >
                <FontAwesomeIcon icon={faGear} />
                Solve
              </button>
              <button
                onClick={handleCancel}
                className={`rounded-lg py-2 text-lg font-roboto flex justify-center items-center px-6 gap-4 transition duration-200 ${
                  uploadProgress === 100
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                }`}
                disabled={uploadProgress < 100}
              >
                <FontAwesomeIcon icon={faTimes} />
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Vehicle
