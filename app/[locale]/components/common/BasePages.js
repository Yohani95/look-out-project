import React from "react";
import MyTitle from "@/app/[locale]/components/common/MyTitle";
function BasePages({ children,additionalContent,title }) {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <MyTitle title={title} />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="card col-lg-10 shadow">
          <div className="container mt-4 mb-4">
            {children}
            {additionalContent}
          </div>
        </div>
      </div>
    </>
  );
}

export default BasePages;
