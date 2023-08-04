import React from "react";
import { useTranslations } from "next-intl";
function loading() {
  const t = useTranslations();
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "40vh" }}
    >
      <h5 className="mb-5">{t('Common.loading')}</h5>
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "7rem", height: "7rem" }}
      >
      </div>
    </div>
  );
}
export default loading;
