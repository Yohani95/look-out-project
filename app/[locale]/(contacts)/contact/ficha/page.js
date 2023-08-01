import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
function page() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title="" />
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="card col-lg-10 shadow"></div>

        
      </div>
    </>
  );
}

export default page;


