"use client";
import React, { useMemo } from "react";
import FacturaPeriodo from "@/app/api/models/factura/FacturaPeriodo";
import PeriodoInfo from "./PeriodoInfo";
import FactureFormSection from "./FactureFormSection";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import PeriodosProyecto from "@/app/api/models/proyecto/PeriodosProyecto";
import { ChangeEstadoFacturaBySoporte, createFacturaPeriodo, deleteFacturaPeriodo } from "@/app/api/actions/factura/FacturaPeriodoActions";
import TableMaterialUI from "../common/TablaMaterialUi";
import { FaTrash, FaFileDownload } from "react-icons/fa";
import { Button } from "react-bootstrap";
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import ConfirmationDialog from "@/app/[locale]/components/common/ConfirmationDialog";
import { ChangeEstado, ChangeEstadoHoras } from "@/app/api/actions/factura/FacturaPeriodoActions";
import { revalidateTag } from "next/cache";
import DocumentoFactura from "@/app/api/models/factura/DocumentoFactura";
import { Tooltip } from "react-tooltip";
import HorasUtilizadas from "@/app/api/models/support/HorasUtilizadas";
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function FactureCreate({ t, periodo, facturas }: { t: any, periodo: PeriodosProyecto | HorasUtilizadas , facturas: FacturaPeriodo[] }) {
    const columns = useMemo(() => FacturaPeriodo.createColumns(t), [t]);
    const router = useRouter();
    const totalFacturas = facturas?.reduce((total, factura) => total + factura.monto, 0);
    const maxMontoNextFactura = periodo?.monto - totalFacturas;
    const validationSchema = FacturaPeriodo.getValidationSchema(t, maxMontoNextFactura);
    const formik = useFormik({
        initialValues: new FacturaPeriodo(),
        validationSchema,
        //validateOnMount: true,
        onSubmit: async (values: FacturaPeriodo, { setSubmitting }) => {
            try {
                //aqui al asignar estos valores uno de los 2 quedara null y essto 
                //hara la diferencia entre si es soporte o proyecto, es una adaptacion al codigo 
                //o un parche solicitado por Don RAUL ya que quiere o necesita ocupar la misma entidad para ahorrar tiempo
                if ('numeroProfesionales' in periodo) {
                    values.idPeriodo = periodo.id;
                    values.idHorasUtilizadas = null;
                } else if('horasExtras' in periodo && periodo.id!=0){
                    values.idPeriodo = null;
                    values.idHorasUtilizadas = periodo.id;
                }
                if(values.idPeriodo==null && values.idHorasUtilizadas==null){
                    values.idHorasUtilizadas = null;
                    values.idSoporteBolsa=periodo.proyecto.pryId;
                }
                values.fechaFactura = new Date();
                await NotificationSweet({
                    title: t.notification.loading.title,
                    text: "",
                    type: t.notification.loading.type,
                    showLoading: true,
                });
                values.idEstado = FacturaPeriodo.ESTADO_FACTURA.PENDIENTE;
                await createFacturaPeriodo(values).then((res) => {
                    NotificationSweet({
                        title: t.notification.success.title,
                        text: t.notification.success.text,
                        type: t.notification.success.type,
                    });
                }).catch((err) => {
                    NotificationSweet({
                        title: t.notification.error.title,
                        text: t.notification.error.text,
                        type: t.notification.error.type,
                    });
                });
                // Utiliza una variable para almacenar la función handleFormSubmit
            } catch (error) {
                console.error("Error in createFORMIK:", error);
            } finally {
                setSubmitting(false); // Importante para indicar que el formulario ya no está siendo enviado.
            }
        },
    });
    const downloadDocumento = (documentos: DocumentoFactura[]) => {
        documentos.forEach(documento => {
            const uint8Array = new Uint8Array(atob(documento.contenidoDocumento).split('').map((char) => char.charCodeAt(0)));

            const blob = new Blob([uint8Array], { type: 'application/pdf' });

            // Crea una URL de objeto para el Blob
            const blobUrl = URL.createObjectURL(blob);

            // Crea un enlace (a) para descargar el Blob
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = documento.nombreDocumento; // Ajusta el nombre del archivo según tus necesidades

            // Agrega el enlace al documento y simula un clic para iniciar la descarga
            document.body.appendChild(link);
            link.click();

            // Elimina el enlace después de la descarga
            document.body.removeChild(link);

            // Liberar recursos
            URL.revokeObjectURL(blobUrl);
        });
    };
    const memoizedFacturaActions = useMemo(() => {
        const handleDelete = async (facturaId: number) => {
            const confirmed = await ConfirmationDialog(
                t.notification.deleting.title,
                t.notification.deleting.text,
                t.notification.deleting.type,
                t.notification.deleting.buttonOk,
                t.notification.deleting.buttonCancel
            );
            if (!confirmed) {
                return;
            }
            await NotificationSweet({
                title: t.notification.loading.title,
                text: "",
                type: t.notification.loading.type,
                showLoading: true,
            });
            await deleteFacturaPeriodo(facturaId).then((res) => {
                NotificationSweet({
                    title: t.notification.success.title,
                    text: t.notification.success.text,
                    type: t.notification.success.type,
                });
            }).catch((err) => {
                NotificationSweet({
                    title: t.notification.error.title,
                    text: t.notification.error.text,
                    type: t.notification.error.type,
                });
            });
        };
        return facturas.map((factura) => ({
            ...FacturaPeriodo.transformFacturaPeriodoData(factura),
            actions: (
                <>
                    <Button
                        variant="link"
                        type="button"
                        onClick={() => handleDelete(factura.id)}
                        disabled={factura.idEstado != FacturaPeriodo.ESTADO_FACTURA.PENDIENTE}
                    ><FaTrash size={16} className="my-anchor-element" />
                    </Button>
                    <Button
                        variant="link"
                        type="button"
                        onClick={() => downloadDocumento(factura.documentosFactura)}
                    ><FaFileDownload size={16} className="descargar" />
                        <Tooltip anchorSelect='.descargar' >
                            {t.Common.downloadFile}
                        </Tooltip>
                    </Button>
                </>
            )
        }));
    }, [facturas, t]);
    const handleChangeEstado = async () => {
        await NotificationSweet({
            title: t.notification.loading.title,
            text: "",
            type: t.notification.loading.type,
            showLoading: true,
        });
        if(periodo.id==null || periodo.id==0){
            await ChangeEstadoFacturaBySoporte(periodo.proyecto.pryId, FacturaPeriodo.ESTADO_FACTURA.SOLICITADA)
            .then((res) => {
                NotificationSweet({
                    title: t.notification.success.title,
                    text: t.notification.success.text,
                    type: t.notification.success.type,
                });
                router.back();
            }).catch((err) => {
                NotificationSweet({
                    title: t.notification.error.title,
                    text: t.notification.error.text,
                    type: t.notification.error.type,
                });
            });
            return;
        }
        if ('numeroProfesionales' in periodo) {
            await ChangeEstado(periodo.id, FacturaPeriodo.ESTADO_FACTURA.SOLICITADA)
                .then((res) => {
                    console.log(res)
                    NotificationSweet({
                        title: t.notification.success.title,
                        text: t.notification.success.text,
                        type: t.notification.success.type,
                    });
                    router.back();
                }).catch((err) => {
                    NotificationSweet({
                        title: t.notification.error.title,
                        text: t.notification.error.text,
                        type: t.notification.error.type,
                    });
                });
        } else if ('horasExtras' in periodo) {
            await ChangeEstadoHoras(periodo.id, FacturaPeriodo.ESTADO_FACTURA.SOLICITADA)
                .then((res) => {
                    NotificationSweet({
                        title: t.notification.success.title,
                        text: t.notification.success.text,
                        type: t.notification.success.type,
                    });
                    router.back();
                }).catch((err) => {
                    NotificationSweet({
                        title: t.notification.error.title,
                        text: t.notification.error.text,
                        type: t.notification.error.type,
                    });
                });
        }
    }
    return (
        <>
            <h4>{t?.Nav.facture.requestBilling}</h4>
            <PeriodoInfo t={t} periodo={periodo} />
            <hr />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit(e);
                }}
            >
                <FactureFormSection
                    t={t}
                    formik={formik}
                    setFormData={formik.setValues}
                    formData={formik.values}
                    tipoFactura={periodo?.proyecto?.idTipoFacturacion == FacturaPeriodo.TIPO_FACTURA.HES}
                />
                <div className="d-flex justify-content-end mt-2 mb-2 ">
                    <button type="submit" className="btn btn-primary">{t?.Common.saveButton}</button>
                </div>
            </form>
            <hr />
            <h4>{t?.facture.requestedInvoices}</h4>
            <MemoizedTableMaterialUI columns={columns} data={memoizedFacturaActions} />

            <div className="d-flex justify-content-end mt-2 mb-2 ">
                <button
                    type="button"
                    className="btn btn-danger m-2"
                    onClick={(e) => {
                        router.back();
                    }}
                >{t.Common.goBack}</button>
                <button onClick={handleChangeEstado} className="m-2 btn btn-primary">{t?.Common.request}</button>
            </div>
        </>
    );
}

export default FactureCreate;
