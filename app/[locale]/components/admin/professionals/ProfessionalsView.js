"use client";
import React from "react";
import ProfessionalsFormSection from "@/app/[locale]/components/admin/professionals/ProfessionalsFormSection";
import { useRouter } from "next/navigation";

function ProfessionalView({ persona, data, t }) {
  const router = useRouter();
  return (
    <>
      <h4>
       {t.Common.professionals}
      </h4>
      <br />
      <fieldset disabled>
        <ProfessionalsFormSection
          t={t}
          formData={persona}
          setFormData={() => {}} // No se necesita setFormData si no estás editando
          countryOptions={data}
        />
      </fieldset>
      <div className="d-flex justify-content-end mt-2 mb-2 ">
        <button
          className="btn btn-danger m-2"
          type="button"
          onClick={() => {
            router.back();
          }}
        >
          {t.Common.goBack}
        </button>
      </div>
    </>
  );
}

export default ProfessionalView;
