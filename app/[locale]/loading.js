import React from "react";
import { useTranslations } from "next-intl";

function Loading() {
  const t = useTranslations();

  return (
    <>
      <div className="d-flex justify-content-center align-items-center m-4">
        <div className="col-lg-10">
          <div className="card-body">
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-4" style={{ borderRadius: "10px" }}></span>
            </h5>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="card col-lg-10 shadow">
          <div className="container mt-4 mb-4">
            <div className="card-body">
              <h5 className="card-title placeholder-glow">
                <span className="placeholder col-6" style={{ borderRadius: "10px" }}></span>
              </h5>
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7" style={{ borderRadius: "10px" }}></span>
                <span className="placeholder col-4" style={{ borderRadius: "10px" }}></span>
                <span className="placeholder col-4" style={{ borderRadius: "10px" }}></span>
                <span className="placeholder col-6" style={{ borderRadius: "10px" }}></span>
                <span className="placeholder col-8" style={{ borderRadius: "10px" }}></span>
              </p>
              {/* <a
                className="btn btn-primary disabled placeholder col-6"
                aria-disabled="true"
              ></a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loading;
