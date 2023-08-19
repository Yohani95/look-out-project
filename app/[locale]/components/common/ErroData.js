import React from "react";
function ErroData({message}) {
  return (
    <div className="text-center text-danger">
      <p>{message}</p>
    </div>
  );
}

export default ErroData;
