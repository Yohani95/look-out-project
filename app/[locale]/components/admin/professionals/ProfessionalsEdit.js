"use client";
import React from "react";
import { useFormik } from "formik";
import Persona from "@/app/api/models/admin/Persona";
import ProfessionalsFormSection from "@/app/[locale]/components/admin/professionals/ProfessionalsFormSection";
import { useRouter } from "next/navigation";
import { professionalEditApiUrl,professionalApiUrl } from "@/app/api/apiConfig";
import { handleFormSubmit } from "@/app/[locale]/utils/Form/UtilsForm";
import { revalidatePath,revalidateTag } from "next/cache";
export const revalidate=true;
function ProfessionalsEdit({ persona, data, locale }) {
  const t = require(`@/messages/${locale}.json`);
  const router = useRouter();

  //validación con Yup
  const validationSchema = Persona.validationRules(t);
  const apiurl={
    edit:professionalApiUrl,
    create:""
  }
  const formik = useFormik({
    initialValues: new Persona(persona),
    validationSchema,
    //validateOnMount: true,
    onSubmit: async (values) => {
      try {
        await handleFormSubmit(
          values,
          t,
          router.push,
          true,
          "/admin/professional",
          apiurl,
          persona.id
        );
        console.log("Realizando revalidaciones");
      } catch (error) {
        console.error("Error al manejar el formulario:", error);
      }
    }
  });
  return (
    <>
      <h4>
        {t.Common.create} {t.Common.professionals}
      </h4>
      <br />
      <form onSubmit={formik.handleSubmit}>
        <ProfessionalsFormSection
          t={t}
          formData={formik.values}
          setFormData={formik.setValues}
          countryOptions={data}
          formik={formik}
        />
        <div className="d-flex justify-content-end mt-2 mb-2 ">
          <button type="submit" className="btn btn-primary m-2">{t.Common.edit}</button>
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
      </form>
    </>
  );
}

export default ProfessionalsEdit;
