import React from "react";
import TarifarioConvenido from "@/app/api/models/proyecto/TarifarioConvenido";
import { useFormik } from "formik";
import TarifarioForm from "./TarifarioForm";
import { handleFormSubmit } from "@/app/[locale]/utils/Form/UtilsForm";
import { tarifarioApiUrl } from "@/app/api/apiConfig";
import { EditAction, tagAction } from "../../../admin/professionals/ProfessionalsActions";
import TarifarioSearch from "@/app/[locale]/components/business/Services/tarifarioConvenido/TarifarioSearch";
import { revalidatePath, revalidateTag } from "next/cache";
function TarifarioCreate({ t, data, idService }) {
  const apiurl = {
    edit: "",
    create: tarifarioApiUrl,
  };
  const validationSchema = TarifarioConvenido.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new TarifarioConvenido(),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        values.prpId = idService;
        await handleFormSubmit(values, t, "", false, "", apiurl, 0);
        tagAction("tarifas")
      } catch (error) {
        console.error("Error in handleFormSubmit:", error);
      } finally {
        //EditAction();
        setSubmitting(false); // Importante para indicar que el formulario ya no está siendo enviado.
      }
    },
  });
  return (
    <>
      <form
        action={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <TarifarioForm
          t={t}
          data={data}
          tarifario={formik.values}
          setFormData={formik.setValues}
        />
        <div className="d-flex justify-content-end mb-3">
          <button type="submit" className="btn btn-primary m-2">
            {t.Common.saveButton}
          </button>
        </div>
      </form>
      <TarifarioSearch
        t={t}
        idService={idService}
        tarifarios={data.tarifarios}
      />
    </>
  );
}

export default TarifarioCreate;
