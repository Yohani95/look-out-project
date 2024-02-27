"use client";
import React, { useState } from "react";
import { Modal, Button, Form, ModalFooter } from "react-bootstrap";
import { useFormik } from "formik";
import ConfirmationDialog from "@/app/[locale]/components/common/ConfirmationDialog";
import { FaCartPlus, FaDollarSign, FaEye, FaFileDownload } from "react-icons/fa";
import FacturaPeriodo from "@/app/api/models/factura/FacturaPeriodo";
import { useRouter } from "next/navigation";
import { Tooltip } from "react-tooltip";
import DocumentoFactura from "@/app/api/models/factura/DocumentoFactura";
import { documentoFacturaApiUrl } from "@/app/api/apiConfig";
import NotificationSweet from "@/app/[locale]/components/common/NotificationSweet";
import { revalidateDataFacturaPeriodo, updateFacturaPeriodo } from "@/app/api/actions/factura/FacturaPeriodoActions";
import {
  handleSelectChange,
  handleInputChange,
} from "@/app/[locale]/utils/Form/UtilsForm";
import SelectField from "@/app/[locale]/components/common/SelectField";
const ModalForm = ({ t, showModal, handleClose, idFactura, idPeriodo, periodoFactura, monedas }) => {
  const validationSchema = DocumentoFactura.getValidationSchema(t);
  let factura = periodoFactura as FacturaPeriodo
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
        <div>
          <div>
            <p style={{ display: 'inline', marginRight: '1em' }}><strong>{t.Common.rut}:</strong> {factura.rut}</p>
            <p style={{ display: 'inline', marginRight: '1em' }}><strong>{t.Common.name}:</strong> {factura.razonSocial}</p>
          </div>
          <div>
            <p style={{ display: 'inline', marginRight: '1em' }}><strong>{t.Common.observations}</strong>: {factura.observaciones}</p>
          </div>
          <div>
            <p style={{ display: 'inline', marginRight: '1em' }}><strong>{t.Common.amount}</strong>: {factura.monto}</p>
          </div>
        </div>
        <hr />
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
            <Form.Label>{t.Common.date} Emisión</Form.Label>
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
          <Form.Group controlId="moneda">
          <div className=" row align-items-center">
          <SelectField
              label={`${t.Ficha.type} ${t.Common.currency}`}
              options={monedas}
              preOption={t.Account.select}
              labelClassName="col-sm-2 col-form-label"
              divClassName="col-sm-4"
              onChange={(e) => handleSelectChange(e, "idTipoMoneda", formik.setValues)}
              selectedValue={formik.values.idTipoMoneda}
              isInvalid={formik.touched.idTipoMoneda && !!formik.errors.idTipoMoneda}
            />
          </div>
            <Form.Control.Feedback type="invalid">
              {formik.errors.idTipoMoneda}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="monto">
          <Form.Label>{t.Common.amount}</Form.Label>
          <Form.Control
              type="text" // Cambiado a tipo "text" para permitir decimales
              className="form-control"
              name="monto"
              id="monto"
              value={formik.values.monto}
              isInvalid={formik.touched.monto && !!formik.errors.monto}
              onChange={(e) => {
                const inputValue = e.target.value;
                // Validar que el valor ingresado sea un número decimal
                if (/^\d*\.?\d*$/.test(inputValue)) {
                  // Actualizar el estado con el nuevo valor si es válido
                  formik.setValues({
                    ...formik.values,
                    monto: parseFloat(inputValue),
                  });
                }
              }}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.monto}
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

const ButtonsFacture = ({ t, idFactura, idPeriodo, periodoFactura, monedas }) => {
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
      const result = await ConfirmationDialog(
        t.notification.bill.title,
        t.notification.bill.text,
        t.notification.bill.type,
        t.notification.bill.buttonOk,
        t.notification.bill.buttonCancel
      );
      if (!result) {
        return;
      }
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

  const downloadDocumento = (documento) => {
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

      {periodoFactura.documentosFactura.length > 0 && (
        <Button
          variant="link"
          onClick={() => downloadDocumento(periodoFactura.documentosFactura[0])}
          //disabled={!periodoFactura.documentosFactura[0] || !periodoFactura.documentosFactura[0].contenidoDocumento}
          style={{ fontSize: periodoFactura.documentosFactura[0] ? '14px' : '14px' }}
          className='descargar'
        >
          <FaFileDownload size={16} />
          <Tooltip anchorSelect='.descargar' >
            {t.Common.downloadFile}
          </Tooltip>
        </Button>
      )}

      <ModalForm periodoFactura={periodoFactura} idPeriodo={idPeriodo} idFactura={idFactura} t={t} showModal={showModal} handleClose={handleClose} monedas={monedas} />
    </>
  );
};

export default ButtonsFacture;
