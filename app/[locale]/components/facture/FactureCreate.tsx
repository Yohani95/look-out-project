"use client";
import React from "react";
import TableMaterialUI from "@/app/[locale]/components/common/TablaMaterialUi";
import FacturaPeriodo from "@/app/api/models/factura/FacturaPeriodo";
import PeriodoInfo from "./PeriodoInfo";
import FactureFormSection from "./FactureFormSection";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import PeriodosProyecto from "@/app/api/models/proyecto/PeriodosProyecto";
function FactureCreate({ t,periodo,facturas  }: { t: any,periodo:PeriodosProyecto,facturas:FacturaPeriodo[] }) {
    const validationSchema = FacturaPeriodo.getValidationSchema(t);
    const router = useRouter();
    const formik = useFormik({
        initialValues: new FacturaPeriodo(),
        validationSchema,
        //validateOnMount: true,
        onSubmit: async (values : FacturaPeriodo, { setSubmitting }) => {
            try {
                console.log(values)
                // Utiliza una variable para almacenar la función handleFormSubmit
            } catch (error) {
                console.error("Error in handleFormSubmit:", error);
            } finally {
                setSubmitting(false); // Importante para indicar que el formulario ya no está siendo enviado.
            }
        },
    });
    return (
        <>
            <h4>{t?.Nav.facture.requestBilling}</h4>
            <PeriodoInfo t={t} periodo={periodo} />
            <hr />
            <form
                onSubmit={(e) => {
                    formik.handleSubmit(e);
                }}
            >
                <FactureFormSection
                    t={t}
                    setFormData={formik.setValues}
                    formData={formik.values}
                    tipoFactura={periodo?.proyecto?.idTipoFacturacion == FacturaPeriodo.TIPO_FACTURA.HES}
                />
                <div className="d-flex justify-content-end mt-2 mb-2 ">
                    <button className="btn btn-primary">{t?.Common.saveButton}</button>
                </div>
            </form>
            <hr />
            <h4>{t?.facture.requestedInvoices}</h4>
            <TableMaterialUI columns={FacturaPeriodo.createColumns(t)} data={facturas} />
            <div className="d-flex justify-content-end mt-2 mb-2 ">
                <button
                    type="button"
                    className="btn btn-danger m-2"
                    onClick={(e) => {
                        router.back();
                    }}
                >{t.Common.goBack}</button>
                <button className="m-2 btn btn-primary">{t?.Common.request}</button>
            </div>
        </>
    );
}

export default FactureCreate;
