"use client";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import ConfirmationDialog from "@/app/[locale]/components/common/ConfirmationDialog";
import { FaCartPlus, FaDollarSign, FaEye } from "react-icons/fa";
import FacturaPeriodo from "@/app/api/models/factura/FacturaPeriodo";
import { useRouter } from "next/navigation";
import { Tooltip } from "react-tooltip";
import DocumentoFactura from "@/app/api/models/factura/DocumentoFactura";
import { documentoFacturaApiUrl } from "@/app/api/apiConfig";
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import { revalidateDataFacturaPeriodo, updateFacturaPeriodo } from "@/app/api/actions/factura/FacturaPeriodoActions";
const ModalForm = ({ t, showModal, handleClose, idFactura, idPeriodo }) => {
  const validationSchema = DocumentoFactura.getValidationSchema(t);
  const formik = useFormik({
    initialValues: new DocumentoFactura(),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await NotificationSweet({
          title: t.notification.loading.title,
          text: "",
          type: t.notification.loading.type,
          showLoading: true,
        });
        // Lógica para manejar el envío del formulario
        values.idFactura = idFactura;
        // Crear un nuevo FileReader
        let reader = new FileReader();
        // Crear una nueva Promise que se resuelve cuando el FileReader ha terminado de leer el archivo
        let arrayBuffer = await new Promise(resolve => {
          reader.onload = e => resolve(e.target.result);
          reader.readAsArrayBuffer(values.archivo);
        });

        // Convertir el ArrayBuffer a una cadena base64
        let base64String = btoa(
          new Uint8Array(arrayBuffer as ArrayBuffer)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        values.contenidoDocumento = base64String;
        // Enviar el documento al servidor
        delete values.archivo;
        await fetch(`${documentoFacturaApiUrl}/AddDocumento/${values.fecha}/${idFactura}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values)
        }).then((res) => {
          if (res.ok) {
            NotificationSweet({
              title: t.notification.success.title,
              text: t.notification.success.text,
              type: t.notification.success.type,
            });
            revalidateDataFacturaPeriodo()
          } else {
            NotificationSweet({
              title: t.notification.error.title,
              text: t.notification.error.text,
              type: t.notification.error.type,
            });
          }
        }).catch((err) => {
          console.error("Error en fetch:", err);
          NotificationSweet({
            title: t.notification.error.title,
            text: t.notification.error.text,
            type: t.notification.error.type,
          });
        });
      } catch (error) {
        NotificationSweet({
          title: t.notification.error.title,
          text: t.notification.error.text,
          type: t.notification.error.type,
        });
      } finally {
        setSubmitting(false);
        handleClose();
      }
    },
  });

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ingresa los datos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="archivo">
            <Form.Label>{t.Common.uploadFile}</Form.Label>
            <Form.Control
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const fileInput = event.currentTarget;
                if (fileInput.files && fileInput.files.length > 0) {
                  formik.setFieldValue("archivo", fileInput.files[0]);
                  formik.setFieldValue("nombreDocumento", fileInput.files[0].name);
                }
              }}
              isInvalid={formik.touched.nombreDocumento && !!formik.errors.nombreDocumento}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.nombreDocumento}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="fecha">
            <Form.Label>{t.Common.date} {t.Common.expiration}</Form.Label>
            <Form.Control
              type="date"
              value={formik.values?.fecha ? new Date(formik.values.fecha).toISOString().split('T')[0] : ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.fecha && !!formik.errors.fecha}
            />
            <Form.Control.Feedback type="invalid">
              {typeof formik.errors.fecha === 'string' ? formik.errors.fecha :
                Array.isArray(formik.errors.fecha) ? formik.errors.fecha.join(', ') : ''}
            </Form.Control.Feedback>
          </Form.Group>

          <Button className="mt-2" variant="primary" type="submit">
            {t.Common.submit}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const ButtonsFacture = ({ t, idFactura, idPeriodo, periodoFactura }) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const handleAddDocument = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handlePagada = async () => {
    try {
      const result= await ConfirmationDialog(
        t.Common.areYouSure,
        "",
        t.notification.deleting.type,
        t.notification.deleting.buttonOk,
        t.notification.deleting.buttonCancel
      );
      if (!result.isConfirmed) return;
      const factura = periodoFactura;
      if (FacturaPeriodo.ESTADO_FACTURA.FACTURADA == factura?.idEstado) {
        await NotificationSweet({
          title: t.notification.loading.title,
          text: "",
          type: t.notification.loading.type,
          showLoading: true,
        });

        factura.idEstado = FacturaPeriodo.ESTADO_FACTURA.PAGADA;
        delete factura.periodo;
        delete factura.estado;
        const res = await updateFacturaPeriodo(factura, idFactura).then((res) => NotificationSweet({
          title: t.notification.success.title,
          text: t.notification.success.text,
          type: t.notification.success.type,
        })).catch((err) => {
          NotificationSweet({
            title: t.notification.error.title,
            text: t.notification.error.text,
            type: t.notification.error.type,
          });
        });
        console.log("Respuesta del servidor:", res);

      }
    } catch (error) {
      console.error("Error en handlePagada:", error);
      NotificationSweet({
        title: t.notification.error.title,
        text: t.notification.error.text,
        type: t.notification.error.type,
      });
    }
  };


  return (
    <>
      {periodoFactura?.idEstado != FacturaPeriodo.ESTADO_FACTURA.FACTURADA && periodoFactura?.idEstado != FacturaPeriodo.ESTADO_FACTURA.PAGADA ?
        <Button variant="link" onClick={handleAddDocument}>
          <FaCartPlus size={16} className="canasto" />
          <Tooltip anchorSelect=".canasto" place="top">
            {t.Nav.facture.requestBilling}
          </Tooltip>
        </Button>
        : <Button variant="link" disabled>
          <FaCartPlus size={16} className="canasto" />
          <Tooltip anchorSelect=".canasto" place="top">
            {t.Nav.facture.requestBilling}
          </Tooltip>
        </Button>}
      {periodoFactura.idEstado == FacturaPeriodo.ESTADO_FACTURA.FACTURADA ?
        <Button variant="link" onClick={handlePagada}>
          <FaDollarSign className="changeStatus" size={16} />
          <Tooltip anchorSelect=".changeStatus" place="top">
            {t.Common.pay}
          </Tooltip>
        </Button> :
        <Button variant="link" disabled>
          <FaDollarSign  className="changeStatus" size={16} />
          <Tooltip anchorSelect=".changeStatus" place="top">
            {t.Common.pay}
          </Tooltip>
        </Button>
      }
      <Button variant="link" onClick={(e) => router.push(`/facture/create/${idPeriodo}`)}>
        <FaEye size={16} className="detalles" />
        <Tooltip anchorSelect=".detalles" place="top">
          {t.facture.billingDetails}
        </Tooltip>
      </Button>
      <ModalForm idPeriodo={idPeriodo} idFactura={idFactura} t={t} showModal={showModal} handleClose={handleClose} />
    </>
  );
};

export default ButtonsFacture;
