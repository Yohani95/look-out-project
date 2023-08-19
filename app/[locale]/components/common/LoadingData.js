import React from 'react'
function LoadingData({ loadingMessage }) {
  return (
    <div className="text-center d-flex justify-content-center align-items-center ">
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
      </div>
    <p className="ms-2">{loadingMessage}</p>
  </div>
  )
}

export default LoadingData