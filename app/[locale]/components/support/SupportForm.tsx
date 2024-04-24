import React, { useState, useEffect, useRef } from "react";
import {
    handleSelectChange,
    handleInputChange,
} from "@/app/[locale]/utils/Form/UtilsForm";
import SelectField from "../common/SelectField";
import MyDatePicker from "@/app/[locale]/components/common/MyDatePicker";
import { useSession } from "next-auth/react";
import { fetchPersonGetbyIdClient } from "@/app/[locale]/utils/person/UtilsPerson";
import { addMonths} from "date-fns";
import { Usuario } from "@/app/api/models/admin/Usuario";
import DocumentosSoporte from "@/app/api/models/support/DocumentosSoporte";
function SupportForm({
    soporteModel,
    setSoporte,
    t,
    data
}) {
    //========DECLARACION DE VARIABLES ===============
    const [contactOptions, setContactOptions] = useState([]);
    const { data: session, status } = useSession();
    const user = session?.user as Usuario;
    const daysArray = Array.from({ length: 31 }, (_, index) => {
        const day = index + 1;
        return { label: day.toString(), value: day };
    });
    /*
       =================================================================================
       SECCION DE USSEFFECT
       =================================================================================
    */
    useEffect(() => {
        if (session) {
            setSoporte((prevData) => ({
                ...prevData,
                kamId: user.persona.id,
            }));
        }
    }, [session]);
    useEffect(() => {
        fetchPersonGetbyIdClient(soporteModel.pryIdCliente).then((person) => {
            const options = person?.data?.map((item) => ({
                value: item.id,
                label: item.perNombres + " " + item.perApellidoPaterno,
            }));
            setContactOptions(options);
        });
    }, [soporteModel.pryIdCliente]);
    useEffect(() => {
        calculateEndDate();
    }, [soporteModel.months, soporteModel.pryFechaInicioEstimada]);
    //=======FIN SECCION DE USSEFFECT===============
    /*
       =================================================================================
       Seccion Funciones de componente
       =================================================================================
    */
    const calculateEndDate = () => {
        const { months, pryFechaInicioEstimada } = soporteModel;
        
        if (!months || !pryFechaInicioEstimada) {
            return; // No calcular si no hay datos suficientes
        }

        const endDate = addMonths(pryFechaInicioEstimada, parseInt(months, 10));

        setSoporte({
            ...soporteModel,
            pryFechaCierreEstimada: endDate,
        });
    };

    return (
        <>
            <div className="mb-3 row align-items-center">
                <label className="col-sm-1 col-form-label">{t.Account.KAM}</label>
                <div className="col-sm-3">
                    <span className="form-control">
                        {session
                            ? `${user.persona.perNombres} ${user.persona.perApellidoPaterno}`
                            : ""}
                    </span>
                </div>
                <label className="col-sm-2 col-form-label">
                    {t.Ficha.table.business.dateEnd}
                </label>
                <div className="col-sm-3">
                    <MyDatePicker
                        selectedDate={soporteModel.pryFechaCierre}
                        onChange={(date) =>
                            setSoporte({ ...soporteModel, pryFechaCierre: date })
                        }
                        title={t.Common.date}
                    />
                </div>
                <SelectField
                    label={t.Account.country}
                    options={data.paises}
                    preOption={t.Account.select}
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-2"
                    onChange={(e) => handleSelectChange(e, "paisId", setSoporte)}
                    selectedValue={soporteModel.paisId}
                />
            </div>

            <div className=" mb-3 row align-items-center">
                <SelectField
                    label={t.Account.name}
                    options={data.clientes}
                    preOption={t.Account.select}
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-3"
                    onChange={(e) => handleSelectChange(e, "pryIdCliente", setSoporte)}
                    selectedValue={soporteModel.pryIdCliente}
                />
                <div className="col-sm-2">
                    <button type="button" className="badge btn btn-primary">
                        {t.Common.request} (+){" "}
                    </button>
                </div>
                <label htmlFor="pryNombre" className="col-sm-1 col-form-label">
                    {t.Account.business_name}
                </label>
                <div className="col-sm-5">
                    <input
                        type="text"
                        className="form-control"
                        id="pryNombre"
                        name="pryNombre"
                        value={soporteModel.pryNombre}
                        onChange={handleInputChange(soporteModel, setSoporte)}
                    />
                </div>
            </div>

            <div className=" mb-3 row align-items-center">
                <SelectField
                    label={t.Common.contact}
                    options={contactOptions}
                    preOption={t.Account.select}
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-3"
                    onChange={(e) => handleSelectChange(e, "pryIdContacto", setSoporte)}
                    selectedValue={soporteModel.pryIdContacto}
                />
                <div className="col-sm-2">
                    <button
                        type="button"
                        className="badge btn btn-primary"
                    //onClick={goContactCreate}
                    >
                        {t.Common.add} (+)
                    </button>
                </div>
                {/* <SelectField
                    label={`${t.Account.type} ${t.Account.business}`}
                    options={data.tipoServicios}
                    preOption={t.Account.select}
                    className="my-contacto"
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-3"
                    onChange={(e) => handleSelectChange(e, "tseId", setSoporte)}
                    selectedValue={soporteModel.tseId}
                /> */}
            </div>

            <div>
                <div className="mb-3 row align-items-center">
                    <label htmlFor="confirmclient" className="col-sm-1 col-form-label">
                        {t.Common.confirm} {t.Common.client}
                    </label>
                    <div className="col-sm-5">
                        <input className="form-control" type="file" id="fileOC" name="fileOC" onChange={async (event) => {
                            const fileInput = event.currentTarget;
                            if (fileInput.files && fileInput.files.length > 0) {
                                const newDocumentos = soporteModel.documentosSoporte ? [...soporteModel.documentosSoporte] : [];

                                // Buscar si ya existe un documento del mismo tipo
                                const existingDocumentoIndex = newDocumentos.findIndex(doc => doc.idTipoDocumento === DocumentosSoporte.TIPO_DOCUMENTO.CONFIRMACION_CLIENTE);

                                // Leer el archivo y convertirlo a base64
                                let reader = new FileReader();
                                let arrayBuffer = await new Promise(resolve => {
                                    reader.onload = e => resolve(e.target.result);
                                    reader.readAsArrayBuffer(fileInput.files[0]);
                                });
                                let base64String = btoa(
                                    new Uint8Array(arrayBuffer as ArrayBuffer)
                                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                                );

                                // Crear el nuevo documento
                                const newDocumento: DocumentosSoporte = {
                                    id: existingDocumentoIndex !== -1 ? newDocumentos[existingDocumentoIndex].id : 0, // Reutilizar el ID si ya existe un documento del mismo tipo
                                    idSoporte: existingDocumentoIndex !== -1 ? newDocumentos[existingDocumentoIndex].idSoporte : 0, // Reutilizar el ID de soporte si ya existe un documento del mismo tipo
                                    contenidoDocumento: base64String,
                                    soporte: null,
                                    archivo: fileInput.files[0],
                                    nombreDocumento: fileInput.files[0].name,
                                    idTipoDocumento: DocumentosSoporte.TIPO_DOCUMENTO.CONFIRMACION_CLIENTE,
                                    fecha: new Date(),
                                };

                                // Reemplazar el documento existente si ya existe uno del mismo tipo, de lo contrario, agregar el nuevo documento
                                if (existingDocumentoIndex !== -1) {
                                    newDocumentos[existingDocumentoIndex] = newDocumento;
                                } else {
                                    newDocumentos.push(newDocumento);
                                }

                                // Actualizar el estado con los nuevos documentos y limitar la lista a 3
                                setSoporte({
                                    ...soporteModel,
                                    documentosSoporte: newDocumentos.slice(0, 3),
                                });
                            }
                        }} />

                        {soporteModel.documentosSoporte &&
                            soporteModel.documentosSoporte.map(doc => {
                                if (doc.idTipoDocumento === DocumentosSoporte.TIPO_DOCUMENTO.CONFIRMACION_CLIENTE) {
                                    return (
                                        <div key={doc.id}>
                                            <a href={`data:application/octet-stream;base64,${doc.contenidoDocumento}`} download={doc.nombreDocumento}>
                                                {t.Common.downloadFile} {doc.nombreDocumento}
                                            </a>
                                        </div>
                                    );
                                }
                                return null;
                            })
                        }
                    </div>
                    <label htmlFor="proposal" className="col-sm-1 col-form-label">
                        {t.Common.proposal} {t.Common.accepted}
                    </label>
                    <div className="col-sm-5">
                        <input className="form-control" type="file" id="fileOC" name="fileOC" onChange={async (event) => {
                            const fileInput = event.currentTarget;
                            if (fileInput.files && fileInput.files.length > 0) {
                                const newDocumentos = soporteModel.documentosSoporte ? [...soporteModel.documentosSoporte] : [];

                                // Buscar si ya existe un documento del mismo tipo
                                const existingDocumentoIndex = newDocumentos.findIndex(doc => doc.idTipoDocumento === DocumentosSoporte.TIPO_DOCUMENTO.CONTRATO);


                                // Leer el archivo y convertirlo a base64
                                let reader = new FileReader();
                                let arrayBuffer = await new Promise(resolve => {
                                    reader.onload = e => resolve(e.target.result);
                                    reader.readAsArrayBuffer(fileInput.files[0]);
                                });
                                let base64String = btoa(
                                    new Uint8Array(arrayBuffer as ArrayBuffer)
                                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                                );
                                // Crear el nuevo documento
                                const newDocumento: DocumentosSoporte = {
                                    id: existingDocumentoIndex !== -1 ? newDocumentos[existingDocumentoIndex].id : 0, // Reutilizar el ID si ya existe un documento del mismo tipo
                                    idSoporte: existingDocumentoIndex !== -1 ? newDocumentos[existingDocumentoIndex].idSoporte : 0, // Reutilizar el ID de soporte si ya existe un documento del mismo tipo
                                    contenidoDocumento: base64String,
                                    soporte: null,
                                    archivo: fileInput.files[0],
                                    nombreDocumento: fileInput.files[0].name,
                                    idTipoDocumento: DocumentosSoporte.TIPO_DOCUMENTO.CONTRATO,
                                    fecha: new Date(),
                                };
                                delete newDocumento.archivo;
                                newDocumentos.push(newDocumento);
                                if (existingDocumentoIndex !== -1) {
                                    newDocumentos[existingDocumentoIndex] = newDocumento;
                                } else {
                                    newDocumentos.push(newDocumento);
                                }
                                // Actualizar el estado con los nuevos documentos
                                setSoporte({
                                    ...soporteModel,
                                    documentosSoporte: newDocumentos.slice(0, 3) // Limitar la cantidad de documentos a 3
                                });
                            }
                        }} />

                        {soporteModel.documentosSoporte &&
                            soporteModel.documentosSoporte.map(doc => {
                                if (doc.idTipoDocumento === DocumentosSoporte.TIPO_DOCUMENTO.CONTRATO) {
                                    return (
                                        <div key={doc.id}>
                                            <a href={`data:application/octet-stream;base64,${doc.contenidoDocumento}`} download={doc.nombreDocumento}>
                                                {t.Common.downloadFile} {doc.nombreDocumento}
                                            </a>
                                        </div>
                                    );
                                }
                                return null;
                            })
                        }
                    </div>

                </div>
            </div>
            <hr />
            <div className="mb-3 row align-items-center">
                <label className="col-sm-1 col-form-label">
                    {t.business.estimatedStartDate}
                </label>
                <div className="col-sm-2">
                    <MyDatePicker
                        selectedDate={soporteModel.pryFechaInicioEstimada}
                        onChange={(date) =>
                            setSoporte({
                                ...soporteModel,
                                pryFechaInicioEstimada: date,
                            })
                        }
                        title={t.Common.date}
                    />
                </div>
                <label htmlFor="months" className="col-sm-1 col-form-label">
                    {t.business.estimatedTerm}
                </label>
                <div className="col-sm-2">
                    <input
                        type="number"
                        className="form-control"
                        id="months"
                        name="months"
                        min="1"
                        max="120"
                        value={soporteModel.months || ""}
                        onChange={handleInputChange(soporteModel, setSoporte)}
                    />
                </div>
                <label className="col-sm-2 col-form-label">
                    {t.business.estimatedClosingDate}
                </label>
                <div className="col-sm-2">
                    <MyDatePicker
                        selectedDate={soporteModel.pryFechaCierreEstimada}
                        onChange={(date) =>
                            setSoporte({
                                ...soporteModel,
                                pryFechaCierreEstimada: date,
                            })
                        }
                        isRead={true}
                        title={t.Common.date}
                    />
                </div>
            </div>
            <div className="mb-3 row align-items-center">
                <SelectField
                    label={t.project.datecut}
                    options={daysArray}
                    preOption={t.Account.select}
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-2"
                    onChange={(e) => handleSelectChange(e, "fechaCorte", setSoporte)}
                    selectedValue={soporteModel.fechaCorte}
                />
                <SelectField
                    label={`${t.Ficha.type} ${t.Common.currency}`}
                    options={data.monedas}
                    preOption={t.Account.select}
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-2"
                    onChange={(e) => handleSelectChange(e, "monId", setSoporte)}
                    selectedValue={soporteModel.monId}
                />
                <SelectField
                    label={`${t.Ficha.type} ${t.Nav.facture.billing}`}
                    options={data.tiposFacturas}
                    preOption={t.Account.select}
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-2"
                    onChange={(e) => handleSelectChange(e, "idTipoFacturacion", setSoporte)}
                    selectedValue={soporteModel.idTipoFacturacion}
                />
            </div>
            <div className="mb-3 row align-items-center">
                <SelectField
                    label={t.Common.payday}
                    options={data.diaPagos}
                    preOption={t.Account.select}
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-2"
                    onChange={(e) => handleSelectChange(e, "idDiaPago", setSoporte)}
                    selectedValue={soporteModel.idDiaPago}
                />
                <SelectField
                    label={"Empresa Prestadora"}
                    options={data.empresaPrestadora}
                    preOption={t.Account.select}
                    labelClassName="col-sm-1 col-form-label"
                    divClassName="col-sm-2"
                    onChange={(e) => handleSelectChange(e, "idEmpresaPrestadora", setSoporte)}
                    selectedValue={soporteModel.idEmpresaPrestadora}
                />
            </div>
            <div className="mb-3 row align-items-center">
                <label htmlFor="pryValor" className="col-sm-1 col-form-label">
                    Monto
                </label>
                <div className="col-sm-2">
                    <input
                        type="number"
                        className="form-control"
                        id="pryValor"
                        name="pryValor"
                        value={soporteModel.pryValor ?? ""}
                        onChange={handleInputChange(soporteModel, setSoporte)}
                    />
                </div>
                <label htmlFor="valorHoraAdicional" className="col-sm-1 col-form-label">
                    Valor Hora Adicional
                </label>
                <div className="col-sm-2">
                    <input
                        type="number"
                        className="form-control"
                        id="valorHoraAdicional"
                        name="valorHoraAdicional"
                        value={soporteModel.valorHoraAdicional ?? ""}
                        onChange={handleInputChange(soporteModel, setSoporte)}
                    />
                </div>
                <label htmlFor="numeroHoras" className="col-sm-1 col-form-label">
                    Número de Horas
                </label>
                <div className="col-sm-2">
                    <input
                        type="number"
                        className="form-control"
                        id="numeroHoras"
                        name="numeroHoras"
                        value={soporteModel.numeroHoras ?? ""}
                        onChange={handleInputChange(soporteModel, setSoporte)}
                        min="1"
                    />
                </div>
                <label htmlFor="acumularHoras" className="col-sm-2 col-form-label">
                    Acumular Horas?
                </label>
                <div className="col-sm-1 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="acumularHoras"
                        name="acumularHoras"
                        checked={soporteModel.acumularHoras ?? false}
                        onChange={(e) => setSoporte({ ...soporteModel, acumularHoras: e.target.checked })}
                    />

                </div>

            </div>

        </>
    );
}

export default SupportForm;
