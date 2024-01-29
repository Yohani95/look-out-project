"use client";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaCreditCard, FaCartPlus, FaDollarSign, FaEye } from "react-icons/fa";
import FacturaPeriodo from "@/app/api/models/factura/FacturaPeriodo";
import { useRouter } from "next/navigation";
import { Tooltip } from "react-tooltip";
import DocumentoFactura from "@/app/api/models/factura/DocumentoFactura";
import { AddDocumento } from "@/app/api/actions/factura/DocumentoFacturaActions";
import { documentoFacturaApiUrl } from "@/app/api/apiConfig";
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import { revalidateTag } from "next/cache";
import { ChangeEstado, updateFacturaPeriodo } from "@/app/api/actions/factura/FacturaPeriodoActions";
const ModalForm = ({ t, showModal, handleClose, idFactura, idPeriodo }) => {
  const formik = useFormik({
    initialValues: new DocumentoFactura(),
    validationSchema: null,
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
        values.nombreDocumento = values.archivo.name;

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
        delete values.archivo;
        values.contenidoDocumento = base64String;
        const response = await fetch(
          `${documentoFacturaApiUrl}/AddDocumento/${values.fecha}/${idFactura}`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
            cache: "no-cache",
            next: { tags: ["documentosFactura"] },
          }
        ).then((res) => {
          if (res.status == 200) {
            NotificationSweet({
              title: t.notification.success.title,
              text: t.notification.success.text,
              type: t.notification.success.type,
            });
          } else {
            NotificationSweet({
              title: t.notification.error.title,
              text: t.notification.error.text,
              type: t.notification.error.type,
            });
          }
        }).catch((err) => {
          NotificationSweet({
            title: t.notification.error.title,
            text: t.notification.error.text,
            type: t.notification.error.type,
          });
        });;
      } catch (error) {
        console.error("Error in createFORMIK:", error);
      } finally {
        setSubmitting(false);
        handleClose();
        revalidateTag("facturasPeriodo");
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
            <Form.Label>Archivo</Form.Label>
            <Form.Control
              type="file"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const fileInput = event.currentTarget;
                if (fileInput.files && fileInput.files.length > 0) {
                  formik.setFieldValue("archivo", fileInput.files[0]);
                }
              }}
              isInvalid={formik.touched.contenidoDocumento && !!formik.errors.contenidoDocumento}
            />
            <Form.Control.Feedback type="invalid">
              {typeof formik.errors.contenidoDocumento === 'string' ? formik.errors.contenidoDocumento :
                (formik.errors.contenidoDocumento as string[])?.join(', ')}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="fecha">
            <Form.Label>Fecha Vencimiento</Form.Label>
            <Form.Control
              type="date"
              value={formik.values.facturaPeriodo?.fechaVencimiento?.toISOString().split('T')[0]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.fecha && !!formik.errors.fecha}
            />
            <Form.Control.Feedback type="invalid">
              test
            </Form.Control.Feedback>
          </Form.Group>

          <Button className="mt-2" variant="primary" type="submit">
            Enviar
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

  const handleFacturada = async () => {
    // Lógica para el botón Facturada
  };

  const handlePagada = async () => {
    try {
      if (FacturaPeriodo.ESTADO_FACTURA.FACTURADA == periodoFactura?.idEstado) {
        await NotificationSweet({
          title: t.notification.loading.title,
          text: "",
          type: t.notification.loading.type,
          showLoading: true,
        });
  
        periodoFactura.idEstado = FacturaPeriodo.ESTADO_FACTURA.PAGADA;
        console.log("Factura actualizada:", periodoFactura);
  
        const res = await updateFacturaPeriodo(periodoFactura, idFactura);
        console.log("Respuesta del servidor:", res);
  
        if (res.status == 200 || res.status == 204) {
          NotificationSweet({
            title: t.notification.success.title,
            text: t.notification.success.text,
            type: t.notification.success.type,
          });
        } else {
          NotificationSweet({
            title: t.notification.error.title,
            text: t.notification.error.text,
            type: t.notification.error.type,
          });
        }
      } else {
        NotificationSweet({
          title: "La factura no se encuentra en estado FACTURADA",
          text: t.notification.success.text,
          type: t.notification.success.type,
        });
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
      {periodoFactura?.idEstado != FacturaPeriodo.ESTADO_FACTURA.FACTURADA && periodoFactura?.idEstado != FacturaPeriodo.ESTADO_FACTURA.PAGADA  ?
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
      {periodoFactura?.idEstado != FacturaPeriodo.ESTADO_FACTURA.PAGADA ?
       <Button variant="link" onClick={handlePagada}>
        <FaDollarSign className="changeStatus" size={16} />
        <Tooltip anchorSelect=".changeStatus" place="top">
          {t.Common.pay}
        </Tooltip>
      </Button> :
        <Button variant="link" disabled>
          <FaDollarSign className="changeStatus" size={16} />
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
