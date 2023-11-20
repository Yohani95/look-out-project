"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import Persona from "@/app/api/models/admin/Persona";
import ProfessionalsFormSection from "@/app/[locale]/components/admin/professionals/ProfessionalsFormSection";
import { useRouter } from "next/navigation";
import { handleFormSubmit } from "@/app/[locale]/utils/Form/UtilsForm";
import { professionalCreateApiUrl } from "@/app/api/apiConfig";
import { EditAction } from "./ProfessionalsActions";
function ProfessionalsCreate({ locale, data }) {
  const t = require(`@/messages/${locale}.json`);
  const router = useRouter();

  //validación con Yup
  const validationSchema = Persona.validationRules(t);
  const apiurl = {
    edit: "",
    create: professionalCreateApiUrl,
  };
  const formik = useFormik({
    initialValues: new Persona(),
    validationSchema,
    //validateOnMount: true,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Submitting form with values:", values);
      try {
        // Utiliza una variable para almacenar la función handleFormSubmit
        await  handleFormSubmit(
          values,
          t,
          router.push,
          false,
          "/admin/professional",
          apiurl,
          0
        );
        // Ejecuta la función almacenada
        console.log("After handleFormSubmit");
      } catch (error) {
        console.error("Error in handleFormSubmit:", error);
      } finally {
        EditAction()
        setSubmitting(false); // Importante para indicar que el formulario ya no está siendo enviado.
      }
    },
  });
  return (
    <>
      <h4>
        {t.Common.create} {t.Common.professionals}
      </h4>
      <br />
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <ProfessionalsFormSection
          t={t}
          formData={formik.values}
          setFormData={formik.setValues}
          countryOptions={data}
          formik={formik}
        />

        <div className="d-flex justify-content-end mt-2 mb-2 ">
          <button type="submit" className="btn btn-primary m-2">
            {t.Common.add}
          </button>
          <button
            type="button"
            className="btn btn-danger m-2"
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

export default ProfessionalsCreate;
