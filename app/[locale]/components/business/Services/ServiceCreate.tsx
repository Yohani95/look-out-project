"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { handleFormSubmit } from "@/app/[locale]/utils/business/UtilsService";
import Proyecto from "@/app/api/models/proyecto/Proyecto";
import { useFormik } from "formik";
import { EditAction } from "../../admin/professionals/ProfessionalsActions";
import ServiceFormSection from "./ServiceFormSection";
function ServiceCreate({ t, data }) {
  //========DECLARACION DE VARIABLES ===============
  const [correlativo, setCorrelativo] = useState([]);
  const [formData, setFormData] = useState({
    file1: null,
    file2: null,
  });
  const router = useRouter();
  //========FIN DECLARACION DE VARIABLES ===============
  /*
     =================================================================================
     Seccion Funciones de componente
     =================================================================================
  */
  const validationSchema = Proyecto.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new Proyecto(),
    validationSchema,
    //validateOnMount: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Utiliza una variable para almacenar la función handleFormSubmit
        const proyectoDTO = {
          proyecto: values,
        };
        const data = new FormData();
        data.append("proyectoJson", JSON.stringify(proyectoDTO));
        // Agrega los archivos
        data.append("files", formData.file1);
        data.append("files", formData.file2);
        await handleFormSubmit(data, t, router.push);
      } catch (error) {
        console.error("Error in handleFormSubmit:", error);
      } finally {
        EditAction();
        setSubmitting(false); // Importante para indicar que el formulario ya no está siendo enviado.
      }
    },
  });
  return (
    <>
      <form
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3 mt-2">
          <h4>{`${t.Common.create} ${t.business.title}`}</h4>
          <div className="col-sm-2 text-end">
            <h6>
              {t.Common.correlative} {t.business.title}{" "}
              {correlativo ? "#" : correlativo}
            </h6>
          </div>
        </div>
        <ServiceFormSection
          t={t}
          proyectoModel={formik.values}
          setProyecto={formik.setValues}
          setFormData={setFormData}
          formData={formData}
          data={data}
        />
        <div className="d-flex justify-content-end mb-3">
          <button type="submit" className="btn btn-primary m-2">
            {t.Common.saveButton}
          </button>
          <button
            type="button"
            className="btn btn-danger m-2"
            onClick={(e) => {
              router.back();
            }}
          >
            {t.Common.cancel}
          </button>
        </div>
      </form>
    </>
  );
}

export default ServiceCreate;
