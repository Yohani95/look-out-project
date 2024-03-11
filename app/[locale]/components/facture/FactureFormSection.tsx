import FacturaPeriodo from "@/app/api/models/factura/FacturaPeriodo";
import { handleInputChange } from "@/app/[locale]/utils/Form/UtilsForm";
import React from "react";
import MyDatePicker from "../common/MyDatePicker";
import DocumentoFactura from "@/app/api/models/factura/DocumentoFactura";

function FactureFormSection({
  t,
  setFormData,
  formData,
  tipoFactura,
  formik
}: {
  t: any;
  setFormData: (value: any) => void;
  formData?: FacturaPeriodo;
  tipoFactura: boolean;
  formik: any;
}) {

  return (
    <>
      <div className="mb-3 row align-items-center">
        <label htmlFor="rut" className="col-sm-1 col-form-label">
          {t.Common.rut}
        </label>
        <div className="col-sm-5">
          <input
            type="text"
            className="form-control"
            id="rut"
            name="rut"
            onChange={handleInputChange(formData, setFormData)}
            value={formData?.rut}
          />
        </div>
        <label htmlFor="razonSocial" className="col-sm-1 col-form-label">
          {t.facture.businessName}
        </label>
        <div className="col-sm-5">
          <input
            type="text"
            className="form-control"
            id="razonSocial"
            name="razonSocial"
            onChange={handleInputChange(formData, setFormData)}
            value={formData?.razonSocial}
          />
        </div>
      </div>
      {/* area de orden de compra */}
      <div className="mb-3 row align-items-center">
        <label
          htmlFor="ocCodigo"
          className="col-sm-2 col-form-label"
        >
          {t.facture.purchaseOrder}
        </label>
        <div className="col-sm-2">
          <input type="text" className="form-control" id="ocCodigo" name="ocCodigo" onChange={handleInputChange(formData, setFormData)} value={formData?.ocCodigo} />
        </div>
        <div className="col-sm-1 col-form-label">
          {t.Common.date}
        </div>
        <div className="col-sm-2">
          <MyDatePicker
            selectedDate={formData?.fechaOc}
            onChange={(date) =>
              setFormData({ ...formData, fechaOc: date })
            }
            title={t.Common.date}
          />
        </div>
        <div className="col-sm-4">
          <input className="form-control" type="file" id="fileOC" name="fileOC" onChange={async (event) => {
            const fileInput = event.currentTarget;
            if (fileInput.files && fileInput.files.length > 0) {
              const newDocumentos = formData.documentosFactura ? [...formData.documentosFactura] : [];
              const existingDocumentoIndex = newDocumentos.findIndex(doc => doc.idTipoDocumento === DocumentoFactura.TIPO_DOCUMENTO.OC);
              if (existingDocumentoIndex !== -1) {
                newDocumentos.splice(existingDocumentoIndex, 1);
              }
              let reader = new FileReader();
              // Crear una nueva Promise que se resuelve cuando el FileReader ha terminado de leer el archivo
              let arrayBuffer = await new Promise(resolve => {
                reader.onload = e => resolve(e.target.result);
                reader.readAsArrayBuffer(fileInput.files[0]);
              });
      
              // Convertir el ArrayBuffer a una cadena base64
              let base64String = btoa(
                new Uint8Array(arrayBuffer as ArrayBuffer)
                  .reduce((data, byte) => data + String.fromCharCode(byte), '')
              );
              const newDocumento: DocumentoFactura = {
                id: 0, // asigna un valor adecuado si es necesario
                idFactura: 0, // asigna un valor adecuado si es necesario
                contenidoDocumento: base64String, // asigna un valor adecuado si es necesario
                facturaPeriodo: null, // asigna un valor adecuado si es necesario
                archivo: fileInput.files[0],
                nombreDocumento: fileInput.files[0].name,
                idTipoDocumento: DocumentoFactura.TIPO_DOCUMENTO.OC,
                fecha: new Date(),
                monto: null,
                idTipoMoneda: null
              };
              delete newDocumento.archivo;
              newDocumentos.push(newDocumento);
              setFormData({
                ...formData,
                documentosFactura: newDocumentos.slice(0, 2) // Limitar la cantidad de documentos a 2
              });
            }
          }} />
        </div>
      </div>
      {tipoFactura &&
        <div className="mb-3 row align-items-center">
          <label
            htmlFor="hesCodigo"
            className="col-sm-2 col-form-label"
          >
            HES N°
          </label>
          <div className="col-sm-2">
            <input type="text" className="form-control" id="hesCodigo" name="hesCodigo" onChange={handleInputChange(formData, setFormData)} value={formData?.hesCodigo} />
          </div>
          <div className="col-sm-1 col-form-label">
            {t.Common.date}
          </div>
          <div className="col-sm-2">
            <MyDatePicker
              selectedDate={formData?.fechaHes}
              onChange={(date) =>
                setFormData({ ...formData, fechaHes: date })
              }
              title={t.Common.date}
            />
          </div>
          <div className="col-sm-4">
            <input className="form-control" type="file" id="fileHES" name="fileHES" onChange={async (event) => {
              const fileInput = event.currentTarget;
              if (fileInput.files && fileInput.files.length > 0) {
                const newDocumentos = formData.documentosFactura ? [...formData.documentosFactura] : [];
                const existingDocumentoIndex = newDocumentos.findIndex(doc => doc.idTipoDocumento === DocumentoFactura.TIPO_DOCUMENTO.HES);
                if (existingDocumentoIndex !== -1) {
                  newDocumentos.splice(existingDocumentoIndex, 1);
                }
                let reader = new FileReader();
                // Crear una nueva Promise que se resuelve cuando el FileReader ha terminado de leer el archivo
                let arrayBuffer = await new Promise(resolve => {
                  reader.onload = e => resolve(e.target.result);
                  reader.readAsArrayBuffer(fileInput.files[0]);
                });
                   // Convertir el ArrayBuffer a una cadena base64
              let base64String = btoa(
                new Uint8Array(arrayBuffer as ArrayBuffer)
                  .reduce((data, byte) => data + String.fromCharCode(byte), '')
              );
                const newDocumento: DocumentoFactura = {
                  id: 0, // asigna un valor adecuado si es necesario
                  idFactura: 0, // asigna un valor adecuado si es necesario
                  contenidoDocumento: base64String, // asigna un valor adecuado si es necesario
                  facturaPeriodo: null, // asigna un valor adecuado si es necesario
                  archivo: fileInput.files[0],
                  nombreDocumento: fileInput.files[0].name,
                  idTipoDocumento: DocumentoFactura.TIPO_DOCUMENTO.HES,
                  fecha: new Date(),
                  monto: null,
                  idTipoMoneda: null
                };
                delete newDocumento.archivo;
                newDocumentos.push(newDocumento);
                setFormData({
                  ...formData,
                  documentosFactura: newDocumentos.slice(0, 2) // Limitar la cantidad de documentos a 2
                });
              }
            }} />
          </div>
        </div>
      }



      <div className="mb-3 row align-items-center">
        <label htmlFor="monto" className="col-sm-2 col-form-label">
          {t.Common.amount}
        </label>
        <div className="col-sm-2">
          <input
            type="text"
            className="form-control"
            id="monto"
            name="monto"
            value={formData?.monto}
            min={1}
            onChange={(e) => {
              const inputValue = e.target.value;
              // Validar que el valor ingresado sea un número decimal
              if (/^\d*\.?\d*$/.test(inputValue)) {
                // Actualizar el estado con el nuevo valor si es válido
                setFormData({
                  ...formData,
                  monto: inputValue,
                });
              }
            }}
          />
          {formik.errors.monto ? <div className="text-danger small">{formik.errors.monto}</div> : null}
        </div>
      </div>
      <div className="mb-3 row align-items-center">
        <label htmlFor="observaciones" className="col-sm-2 col-form-label">
          {t.Common.observations}
        </label>
        <div className="col-sm-6">
          <textarea
            className="form-control"
            id="observaciones"
            name="observaciones"
            onChange={handleInputChange(formData, setFormData)}
            value={formData?.observaciones}
          />
        </div>
      </div>
    </>
  );
}

export default FactureFormSection;
