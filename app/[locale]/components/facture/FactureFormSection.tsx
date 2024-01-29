import FacturaPeriodo from "@/app/api/models/factura/FacturaPeriodo";
import { handleInputChange } from "@/app/[locale]/utils/Form/UtilsForm";
import React from "react";
import MyDatePicker from "../common/MyDatePicker";

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
          <div  className="col-sm-1 col-form-label">
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
        {/* <label htmlFor="fileInput" className="col-sm-2 col-form-label">
            Documento
          </label>
          <div className="col-sm-5">
            <input
              type="file"
              className="form-control"
              id="fileInput"
              //onChange={handleFileChange}
              accept=".pdf, .doc, .docx"
            />
          </div>
          {/* {file && (
            <>
              <label className="col-sm-3 col-form-label">
                {file ? file.name : ""}
              </label>
              <Button variant="link" className="col-sm-2" href={file && URL.createObjectURL(file)} download={file && file.name}>
               {t.Common.downloadFile}  {"      "}
              <FaFileDownload size={18} className="link" beat/>
              </Button>
            </>
          )} */} 
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
