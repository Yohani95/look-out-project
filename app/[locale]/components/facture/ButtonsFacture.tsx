'use client';
import React, { useState } from 'react';
import { Modal, Button, Form, ModalFooter } from 'react-bootstrap';
import { useFormik } from 'formik';
import ConfirmationDialog from '@/app/[locale]/components/common/ConfirmationDialog';
import {
  FaCartPlus,
  FaDollarSign,
  FaEye,
  FaFileDownload,
  FaFileUpload,
} from 'react-icons/fa';
import FacturaPeriodo from '@/app/api/models/factura/FacturaPeriodo';
import { useRouter } from 'next/navigation';
import { Tooltip } from 'react-tooltip';
import DocumentoFactura from '@/app/api/models/factura/DocumentoFactura';
import { documentoFacturaApiUrl } from '@/app/api/apiConfig';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import {
  revalidateDataFacturaPeriodo,
  updateFacturaPeriodo,
} from '@/app/api/actions/factura/FacturaPeriodoActions';
import {
  handleSelectChange,
  handleInputChange,
} from '@/app/[locale]/utils/Form/UtilsForm';
import SelectField from '@/app/[locale]/components/common/SelectField';
import HorasUtilizadas from '@/app/api/models/support/HorasUtilizadas';
import MyDatePicker from '../common/MyDatePicker';
import Utils from '@/app/api/models/common/Utils';
import ModalInfo from '../common/ModalInfo';
import { getDocumentoFacturaById } from '@/app/api/actions/factura/DocumentoFacturaActions';
const ButtonsFacture = ({
  t,
  idFactura,
  idPeriodo,
  idHoraUtilizada,
  periodoFactura,
  monedas,
  bancos,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalPago, setShowModalPago] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);
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
      if (FacturaPeriodo.ESTADO_FACTURA.ENVIADA == periodoFactura?.idEstado) {
        setShowModalPago(true);
      }
    } catch (error) {
      console.error('Error en handlePagada:', error);
      NotificationSweet({
        title: t.notification.error.title,
        text: t.notification.error.text,
        type: t.notification.error.type,
      });
    }
  };
  const handleEnviada = async () => {
    try {
      const result = await ConfirmationDialog(
        t.notification.sendBill.title,
        t.notification.sendBill.text,
        t.notification.sendBill.type,
        t.notification.sendBill.buttonOk,
        t.notification.sendBill.buttonCancel
      );
      if (!result) {
        return;
      }
      const factura = periodoFactura;
      if (FacturaPeriodo.ESTADO_FACTURA.FACTURADA == factura?.idEstado) {
        await NotificationSweet({
          title: t.notification.loading.title,
          text: '',
          type: t.notification.loading.type,
          showLoading: true,
        });
        factura.idEstado = FacturaPeriodo.ESTADO_FACTURA.ENVIADA;
        delete factura.periodo;
        delete factura.estado;
        delete factura.documentosFactura;
        const res = await updateFacturaPeriodo(factura, idFactura)
          .then((res) => {
            NotificationSweet({
              title: t.notification.success.title,
              text: t.notification.success.text,
              type: t.notification.success.type,
            });
          })
          .catch((err) => {
            NotificationSweet({
              title: t.notification.error.title,
              text: err,
              type: t.notification.error.type,
            });
          });
      }
    } catch (error) {
      console.error('Error en handlePagada:', error);
      NotificationSweet({
        title: t.notification.error.title,
        text: t.notification.error.text,
        type: t.notification.error.type,
      });
    }
  };
  const downloadDocumento = async (predocumento) => {
    const documento = await getDocumentoFacturaById(predocumento.id);
    const uint8Array = new Uint8Array(
      atob(documento.contenidoDocumento)
        .split('')
        .map((char) => char.charCodeAt(0))
    );

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
  const documentoFactura = periodoFactura.documentosFactura?.find(
    (document) => {
      return (
        document.idTipoDocumento == DocumentoFactura.TIPO_DOCUMENTO.FACTURA
      );
    }
  );
  // Generar IDs únicos basados en idFactura, idPeriodo o idHoraUtilizada
  const canastoId = `canasto-${idFactura || idPeriodo || idHoraUtilizada}`;
  const documentId = `document-${idFactura || idPeriodo || idHoraUtilizada}`;
  const changeStatusId = `changeStatus-${
    idFactura || idPeriodo || idHoraUtilizada
  }`;
  const payDateId = `payDate-${idFactura || idPeriodo || idHoraUtilizada}`;
  const detallesId = `detalles-${idFactura || idPeriodo || idHoraUtilizada}`;
  const descargarId = `descargar-${idFactura || idPeriodo || idHoraUtilizada}`;
  return (
    <>
      {periodoFactura?.idEstado != FacturaPeriodo.ESTADO_FACTURA.FACTURADA &&
      periodoFactura?.idEstado != FacturaPeriodo.ESTADO_FACTURA.PAGADA &&
      periodoFactura?.idEstado != FacturaPeriodo.ESTADO_FACTURA.ENVIADA ? (
        <Button variant="link" onClick={handleAddDocument}>
          <FaCartPlus size={16} id={canastoId} />
          <Tooltip anchorSelect={`#${canastoId}`} place="top">
            {t.Nav.facture.requestBilling}
          </Tooltip>
        </Button>
      ) : (
        <Button variant="link" disabled>
          <FaCartPlus size={16} id={canastoId} />
          <Tooltip anchorSelect={`#${canastoId}`} place="top">
            {t.Nav.facture.requestBilling}
          </Tooltip>
        </Button>
      )}

      {periodoFactura.idEstado == FacturaPeriodo.ESTADO_FACTURA.FACTURADA ? (
        <Button variant="link" onClick={handleEnviada}>
          <FaFileUpload id={documentId} size={16} />
          <Tooltip anchorSelect={`#${documentId}`} place="top">
            {t.Common.submit} {t.Common.document}
          </Tooltip>
        </Button>
      ) : periodoFactura.idEstado == FacturaPeriodo.ESTADO_FACTURA.ENVIADA ? (
        <Button variant="link" onClick={handlePagada}>
          <FaDollarSign id={changeStatusId} size={16} />
          <Tooltip anchorSelect={`#${changeStatusId}`} place="top">
            {t.Common.pay}
          </Tooltip>
        </Button>
      ) : periodoFactura.idEstado == FacturaPeriodo.ESTADO_FACTURA.PAGADA ? (
        <Button variant="link" onClick={() => setShowModalInfo(true)}>
          <FaDollarSign color="green" id={payDateId} size={16} />
          <Tooltip anchorSelect={`#${payDateId}`} place="top">
            {t.Common.payDate}
          </Tooltip>
        </Button>
      ) : null}

      <Button
        variant="link"
        onClick={(e) =>
          idPeriodo
            ? router.push(`/facture/create/${idPeriodo}`)
            : router.push(`/facture/createSupport/${idHoraUtilizada}`)
        }
      >
        <FaEye size={16} id={detallesId} />
        <Tooltip anchorSelect={`#${detallesId}`} place="top">
          {t.facture.billingDetails}
        </Tooltip>
      </Button>

      {documentoFactura && (
        <Button
          variant="link"
          onClick={() => downloadDocumento(documentoFactura)}
          style={{ fontSize: '14px' }}
          id={descargarId}
        >
          <FaFileDownload size={16} />
          <Tooltip anchorSelect={`#${descargarId}`}>
            {t.Common.downloadFile}
          </Tooltip>
        </Button>
      )}

      {/* Modal Forms */}
      <ModalForm
        periodoFactura={periodoFactura}
        idPeriodo={idPeriodo}
        idFactura={idFactura}
        t={t}
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        monedas={monedas}
      />
      <ModalPago
        show={showModalPago}
        setShowModalPago={setShowModalPago}
        factura={periodoFactura}
        bancos={bancos}
        t={t}
      />
      <ModalInfo
        show={showModalInfo}
        handleClose={() => setShowModalInfo(false)}
        t={t}
      >
        <ModalInfoContent
          periodoFactura={periodoFactura}
          bancos={bancos}
          t={t}
        />
      </ModalInfo>
    </>
  );
};
const ModalPago = ({ show, t, factura, setShowModalPago, bancos }) => {
  const validationSchema = FacturaPeriodo.getValidationSchema(t);
  const formik = useFormik({
    initialValues: factura,
    validationSchema: null,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await NotificationSweet({
          title: t.notification.loading.title,
          text: '',
          type: t.notification.loading.type,
          showLoading: true,
        });
        values.idEstado = FacturaPeriodo.ESTADO_FACTURA.PAGADA;
        delete values.periodo;
        delete values.documentosFactura;
        delete values.estado;
        await updateFacturaPeriodo(values, values.id)
          .then((res) => {
            console.log(res);
            if (res != 204) {
              Utils.handleErrorNotification(t);
              return;
            }
            Utils.handleSuccessNotification(t);
          })
          .catch((err) => {
            NotificationSweet({
              title: t.notification.error.title,
              text: err.message || t.notification.error.text,
              type: t.notification.error.type,
            });
          });
      } catch (error) {
        NotificationSweet({
          title: t.notification.error.title,
          text: error.message || t.notification.error.text,
          type: t.notification.error.type,
        });
      } finally {
        setSubmitting(false);
        setShowModalPago(false);
      }
    },
  });

  return (
    <Modal show={show} onHide={() => setShowModalPago(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Ingresar Datos de Pago</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <div className=" row align-items-center">
            <label className="col-sm-3 col-form-label">
              {t.Common.payDate}
            </label>
            <div className="col-sm-8">
              <MyDatePicker
                selectedDate={
                  formik.values.fechaPago && new Date(formik.values.fechaPago)
                }
                onChange={(date) => formik.setFieldValue('fechaPago', date)}
                title={t.Common.date}
              />
              <Form.Control.Feedback type="invalid">
                {formik.touched.fechaPago &&
                typeof formik.errors.fechaPago === 'string'
                  ? formik.errors.fechaPago
                  : ''}
              </Form.Control.Feedback>
            </div>
          </div>
          <div className="row align-items-center mt-2">
            <SelectField
              label={`${t.Common.bank}`}
              options={bancos}
              preOption={t.Account.select}
              labelClassName="col-sm-3 col-form-label"
              divClassName="col-sm-8"
              onChange={(e) =>
                handleSelectChange(e, 'idBanco', formik.setValues)
              }
              selectedValue={formik.values.idBanco}
              isInvalid={formik.touched.idBanco && !!formik.errors.idBanco}
            />
          </div>
          <div className="d-flex justify-content-end mt-2">
            <button type="submit" className="btn btn-primary m-2">
              {t.Common.saveButton}
            </button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModalPago(false)}>
          {t.Common.cancel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
const ModalForm = ({
  t,
  showModal,
  handleClose,
  idFactura,
  idPeriodo,
  periodoFactura,
  monedas,
}) => {
  const validationSchema = DocumentoFactura.getValidationSchema(t);
  let factura = periodoFactura as FacturaPeriodo;
  const formik = useFormik({
    initialValues: new DocumentoFactura(),
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await NotificationSweet({
          title: t.notification.loading.title,
          text: '',
          type: t.notification.loading.type,
          showLoading: true,
        });
        let addDias = 30;
        if (factura.periodo) {
          addDias = factura.periodo.proyecto.diaPagos.dia;
        } else if (factura.horasUtilizadas) {
          const horasUtilizadas = new HorasUtilizadas(factura.horasUtilizadas);
          addDias = horasUtilizadas.proyecto.diaPagos.dia;
        } else if (factura.Soporte) {
          addDias = factura.Soporte.diaPagos.dia;
        } else if (factura.ventaLicencia) {
          addDias = factura.ventaLicencia.diaPagos.dia;
        }
        const fecha = new Date(values.fecha);
        fecha.setDate(fecha.getDate() + addDias);

        const year = fecha.getFullYear();
        const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
        const day = ('0' + fecha.getDate()).slice(-2);

        const formattedFecha = `${year}-${month}-${day}`;

        // Inyectar la fecha formateada en el objeto values
        values.fecha = new Date(fecha);

        // Lógica para manejar el envío del formulario
        values.idFactura = idFactura;
        // Crear un nuevo FileReader
        let reader = new FileReader();
        // Crear una nueva Promise que se resuelve cuando el FileReader ha terminado de leer el archivo
        let arrayBuffer = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsArrayBuffer(values.archivo);
        });

        // Convertir el ArrayBuffer a una cadena base64
        let base64String = btoa(
          new Uint8Array(arrayBuffer as ArrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        values.contenidoDocumento = base64String;
        values.idTipoDocumento = DocumentoFactura.TIPO_DOCUMENTO.FACTURA;
        console.log(values);
        // Enviar el documento al servidor
        delete values.archivo;
        await fetch(
          `${documentoFacturaApiUrl}/AddDocumento/${formattedFecha}/${idFactura}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          }
        )
          .then((res) => {
            if (res.ok) {
              NotificationSweet({
                title: t.notification.success.title,
                text: t.notification.success.text,
                type: t.notification.success.type,
              });
              revalidateDataFacturaPeriodo();
            } else {
              NotificationSweet({
                title: t.notification.error.title,
                text: t.notification.error.text,
                type: t.notification.error.type,
              });
            }
          })
          .catch((err) => {
            console.error('Error en fetch:', err);
            NotificationSweet({
              title: t.notification.error.title,
              text: t.notification.error.text,
              type: t.notification.error.type,
            });
          });
      } catch (error) {
        NotificationSweet({
          title: t.notification.error.title,
          text: error,
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
            <p style={{ display: 'inline', marginRight: '1em' }}>
              <strong>{t.Common.rut}:</strong> {factura.rut}
            </p>
            <p style={{ display: 'inline', marginRight: '1em' }}>
              <strong>{t.Common.name}:</strong> {factura.razonSocial}
            </p>
          </div>
          <div>
            <p style={{ display: 'inline', marginRight: '1em' }}>
              <strong>{t.Common.observations}</strong>: {factura.observaciones}
            </p>
          </div>
          <div>
            <p style={{ display: 'inline', marginRight: '1em' }}>
              <strong>{t.Common.amount}</strong>: {factura.monto}
            </p>
            <p style={{ display: 'inline', marginRight: '1em' }}>
              <strong>OC</strong>: {factura.ocCodigo}
            </p>
            <p style={{ display: 'inline', marginRight: '1em' }}>
              <strong>HES</strong>: {factura.hesCodigo}
            </p>
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
                  formik.setFieldValue('archivo', fileInput.files[0]);
                  formik.setFieldValue(
                    'nombreDocumento',
                    fileInput.files[0].name
                  );
                }
              }}
              isInvalid={
                formik.touched.nombreDocumento &&
                !!formik.errors.nombreDocumento
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.nombreDocumento}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="fecha">
            <Form.Label>{t.Common.date} Emisión</Form.Label>
            <Form.Control
              type="date"
              value={
                formik.values?.fecha &&
                !isNaN(new Date(formik.values.fecha).getTime())
                  ? new Date(formik.values.fecha).toISOString().split('T')[0]
                  : ''
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.fecha && !!formik.errors.fecha}
            />
            <Form.Control.Feedback type="invalid">
              {typeof formik.errors.fecha === 'string'
                ? formik.errors.fecha
                : Array.isArray(formik.errors.fecha)
                ? formik.errors.fecha.join(', ')
                : ''}
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
                onChange={(e) =>
                  handleSelectChange(e, 'idTipoMoneda', formik.setValues)
                }
                selectedValue={formik.values.idTipoMoneda}
                isInvalid={
                  formik.touched.idTipoMoneda && !!formik.errors.idTipoMoneda
                }
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
const ModalInfoContent = ({ periodoFactura, bancos, t }) => {
  return (
    <>
      <div className="row align-items-center mb-2">
        <label className="col-sm-3 col-form-label">{t.Common.payDate} :</label>
        <div className="col-sm-9">
          <p className="mb-0">
            {periodoFactura.fechaPago
              ? new Date(periodoFactura.fechaPago).toLocaleDateString()
              : 'N/A'}
          </p>
        </div>
      </div>
      <div className="row align-items-center">
        <label className="col-sm-3 col-form-label">{t.Common.bank} :</label>
        <div className="col-sm-9">
          <p className="mb-0">
            {periodoFactura.idBanco
              ? bancos.find((bank) => bank.value === periodoFactura.idBanco)
                  ?.label
              : 'N/A'}
          </p>
        </div>
      </div>
    </>
  );
};
export default ButtonsFacture;
