import React, { useState, useEffect, useRef } from 'react';
import {
  handleSelectChange,
  handleInputChange,
} from '@/app/[locale]/utils/Form/UtilsForm';
import SelectField from '../common/SelectField';
import MyDatePicker from '@/app/[locale]/components/common/MyDatePicker';
import { useSession } from 'next-auth/react';
import { fetchPersonGetbyIdClient } from '@/app/[locale]/utils/person/UtilsPerson';
import { addMonths } from 'date-fns';
import { Usuario } from '@/app/api/models/admin/Usuario';
import DocumentosSoporte from '@/app/api/models/support/DocumentosSoporte';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FaFileDownload } from 'react-icons/fa';
import { Switch } from '@/components/ui/switch';
function SupportForm({ soporteModel, setSoporte, t, data }) {
  //========DECLARACION DE VARIABLES ===============
  const [contactOptions, setContactOptions] = useState([]);
  const [showKamSelect, setShowKamSelect] = useState(!!data.personasKam);
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
        label: item.perNombres + ' ' + item.perApellidoPaterno,
      }));
      setContactOptions(options);
    });
  }, [soporteModel.pryIdCliente]);
  useEffect(() => {
    calculateEndDate();
  }, [soporteModel.months, soporteModel.pryFechaInicioEstimada]);
  useEffect(() => {
    if (!soporteModel.kamId && user?.persona.id) {
      setSoporte((prev) => ({ ...prev, kamId: user.persona.id }));
    }
  }, [soporteModel.kamId, user?.persona.id, setSoporte]);
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
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {showKamSelect ? (
            <>
              <div>
                <Label htmlFor="kamId">KAM</Label>
                <SelectField
                  label=""
                  options={data.personasKam}
                  preOption={t.Account.select}
                  onChange={(e) => handleSelectChange(e, 'kamId', setSoporte)}
                  selectedValue={soporteModel.kamId}
                />
              </div>
            </>
          ) : (
            <div>
              <Label>KAM</Label>
              <span className="border p-2 rounded-md block bg-gray-100">
                {`${user?.persona.perNombres} ${user?.persona.perApellidoPaterno}`}
              </span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <Label htmlFor="pryNombre">{t.Account.business_name}</Label>
            <Input
              type="text"
              className="form-control"
              id="pryNombre"
              name="pryNombre"
              value={soporteModel.pryNombre}
              onChange={handleInputChange(soporteModel, setSoporte)}
            />
          </div>
          <div>
            <Label htmlFor="pryIdCliente">{t.Account.name}</Label>
            <SelectField
              label={''}
              options={data.clientes}
              preOption={t.Account.select}
              onChange={(e) =>
                handleSelectChange(e, 'pryIdCliente', setSoporte)
              }
              selectedValue={soporteModel.pryIdCliente}
            />
          </div>
          <div>
            <Label htmlFor="pryIdContacto">{t.Common.contact}</Label>
            <SelectField
              label={''}
              options={contactOptions}
              preOption={t.Account.select}
              onChange={(e) =>
                handleSelectChange(e, 'pryIdContacto', setSoporte)
              }
              selectedValue={soporteModel.pryIdContacto}
            />
          </div>
          <div>
            <Label htmlFor="paisId">{t.Account.country}</Label>
            <SelectField
              label={''}
              options={data.paises}
              preOption={t.Account.select}
              onChange={(e) => handleSelectChange(e, 'paisId', setSoporte)}
              selectedValue={soporteModel.paisId}
            />
          </div>
          <div>
            <Label htmlFor="idEmpresaPrestadora">
              {t.Common.lendingCompany}
            </Label>
            <SelectField
              label={''}
              options={data.empresaPrestadora}
              preOption={t.Account.select}
              onChange={(e) =>
                handleSelectChange(e, 'idEmpresaPrestadora', setSoporte)
              }
              selectedValue={soporteModel.idEmpresaPrestadora}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fileOC">
              {t.Common.confirm} {t.Common.client}
            </Label>
            <input
              className="form-control"
              type="file"
              id="fileOC"
              name="fileOC"
              onChange={async (event) => {
                const fileInput = event.currentTarget;
                if (fileInput.files && fileInput.files.length > 0) {
                  const newDocumentos = soporteModel.documentosSoporte
                    ? [...soporteModel.documentosSoporte]
                    : [];

                  // Buscar si ya existe un documento del mismo tipo
                  const existingDocumentoIndex = newDocumentos.findIndex(
                    (doc) =>
                      doc.idTipoDocumento ===
                      DocumentosSoporte.TIPO_DOCUMENTO.CONFIRMACION_CLIENTE
                  );

                  // Leer el archivo y convertirlo a base64
                  let reader = new FileReader();
                  let arrayBuffer = await new Promise((resolve) => {
                    reader.onload = (e) => resolve(e.target.result);
                    reader.readAsArrayBuffer(fileInput.files[0]);
                  });
                  let base64String = btoa(
                    new Uint8Array(arrayBuffer as ArrayBuffer).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ''
                    )
                  );

                  // Crear el nuevo documento
                  const newDocumento: DocumentosSoporte = {
                    id:
                      existingDocumentoIndex !== -1
                        ? newDocumentos[existingDocumentoIndex].id
                        : 0, // Reutilizar el ID si ya existe un documento del mismo tipo
                    idSoporte:
                      existingDocumentoIndex !== -1
                        ? newDocumentos[existingDocumentoIndex].idSoporte
                        : 0, // Reutilizar el ID de soporte si ya existe un documento del mismo tipo
                    contenidoDocumento: base64String,
                    soporte: null,
                    archivo: fileInput.files[0],
                    nombreDocumento: fileInput.files[0].name,
                    idTipoDocumento:
                      DocumentosSoporte.TIPO_DOCUMENTO.CONFIRMACION_CLIENTE,
                    fecha: new Date(),
                  };

                  // Reemplazar el documento existente si ya existe uno del mismo tipo, de lo contrario, agregar el nuevo documento
                  delete newDocumento.archivo;
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
              }}
            />
            {soporteModel.documentosSoporte &&
              soporteModel.documentosSoporte.map((doc) => {
                if (
                  doc.idTipoDocumento ===
                  DocumentosSoporte.TIPO_DOCUMENTO.CONFIRMACION_CLIENTE
                ) {
                  return (
                    <div key={doc.id}>
                      <a
                        href={`data:application/octet-stream;base64,${doc.contenidoDocumento}`}
                        download={doc.nombreDocumento}
                        className="text-primary flex items-center"
                      >
                        {t.Common.downloadFile} {doc.nombreDocumento}
                      </a>
                    </div>
                  );
                }
                return null;
              })}
          </div>
          <div>
            <Label htmlFor="proposal">
              {t.Common.proposal} {t.Common.accepted}
            </Label>
            <input
              className="form-control"
              type="file"
              id="proposal"
              name="proposal"
              onChange={async (event) => {
                const fileInput = event.currentTarget;
                if (fileInput.files && fileInput.files.length > 0) {
                  const newDocumentos = soporteModel.documentosSoporte
                    ? [...soporteModel.documentosSoporte]
                    : [];

                  // Buscar si ya existe un documento del mismo tipo
                  const existingDocumentoIndex = newDocumentos.findIndex(
                    (doc) =>
                      doc.idTipoDocumento ===
                      DocumentosSoporte.TIPO_DOCUMENTO.CONTRATO
                  );

                  // Leer el archivo y convertirlo a base64
                  let reader = new FileReader();
                  let arrayBuffer = await new Promise((resolve) => {
                    reader.onload = (e) => resolve(e.target.result);
                    reader.readAsArrayBuffer(fileInput.files[0]);
                  });
                  let base64String = btoa(
                    new Uint8Array(arrayBuffer as ArrayBuffer).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ''
                    )
                  );
                  // Crear el nuevo documento
                  const newDocumento: DocumentosSoporte = {
                    id:
                      existingDocumentoIndex !== -1
                        ? newDocumentos[existingDocumentoIndex].id
                        : 0, // Reutilizar el ID si ya existe un documento del mismo tipo
                    idSoporte:
                      existingDocumentoIndex !== -1
                        ? newDocumentos[existingDocumentoIndex].idSoporte
                        : 0, // Reutilizar el ID de soporte si ya existe un documento del mismo tipo
                    contenidoDocumento: base64String,
                    soporte: null,
                    archivo: fileInput.files[0],
                    nombreDocumento: fileInput.files[0].name,
                    idTipoDocumento: DocumentosSoporte.TIPO_DOCUMENTO.CONTRATO,
                    fecha: new Date(),
                  };
                  delete newDocumento.archivo;
                  if (existingDocumentoIndex !== -1) {
                    newDocumentos[existingDocumentoIndex] = newDocumento;
                  } else {
                    newDocumentos.push(newDocumento);
                  }
                  // Actualizar el estado con los nuevos documentos
                  setSoporte({
                    ...soporteModel,
                    documentosSoporte: newDocumentos.slice(0, 3), // Limitar la cantidad de documentos a 3
                  });
                }
              }}
            />

            {soporteModel.documentosSoporte &&
              soporteModel.documentosSoporte.map((doc) => {
                if (
                  doc.idTipoDocumento ===
                  DocumentosSoporte.TIPO_DOCUMENTO.CONTRATO
                ) {
                  return (
                    <div key={doc.id}>
                      <a
                        href={`data:application/octet-stream;base64,${doc.contenidoDocumento}`}
                        download={doc.nombreDocumento}
                        className="text-primary flex items-center"
                      >
                        {t.Common.downloadFile} {doc.nombreDocumento}
                      </a>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
        <h6 className="text-[#2f4bce]  font-bold">{t.Common.date}</h6>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <Label htmlFor="pryFechaCierre">
              {t.Ficha.table.business.dateEnd}
            </Label>
            <MyDatePicker
              selectedDate={soporteModel.pryFechaCierre}
              onChange={(date) =>
                setSoporte({ ...soporteModel, pryFechaCierre: date })
              }
              title={''}
            />
          </div>
          <div>
            <Label htmlFor="pryFechaInicioEstimada">
              {t.business.estimatedStartDate}
            </Label>
            <MyDatePicker
              selectedDate={soporteModel.pryFechaInicioEstimada}
              onChange={(date) =>
                setSoporte({
                  ...soporteModel,
                  pryFechaInicioEstimada: date,
                })
              }
              title={''}
            />
          </div>
          <div>
            <Label htmlFor="months">{t.business.estimatedTerm}</Label>
            <Input
              type="number"
              id="months"
              name="months"
              min="1"
              max="120"
              value={soporteModel.months || ''}
              onChange={handleInputChange(soporteModel, setSoporte)}
            />
          </div>
          <div>
            <Label htmlFor="pryFechaCierreEstimada">
              {t.business.estimatedClosingDate}
            </Label>

            <MyDatePicker
              selectedDate={soporteModel.pryFechaCierreEstimada}
              onChange={(date) =>
                setSoporte({
                  ...soporteModel,
                  pryFechaCierreEstimada: date,
                })
              }
              isRead={true}
              title={''}
            />
          </div>
          <div>
            <Label htmlFor="fechaCorte">{t.project.datecut}</Label>
            <SelectField
              label={''}
              options={daysArray}
              preOption={t.Account.select}
              onChange={(e) => handleSelectChange(e, 'fechaCorte', setSoporte)}
              selectedValue={soporteModel.fechaCorte}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="idDiaPago">{t.Common.payday}</Label>
            <SelectField
              label={''}
              options={data.diaPagos}
              preOption={t.Account.select}
              onChange={(e) => handleSelectChange(e, 'idDiaPago', setSoporte)}
              selectedValue={soporteModel.idDiaPago}
            />
          </div>
        </div>
        <h6 className="text-[#2f4bce]  font-bold">{t.Common.amount}</h6>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="pryValor">Monto</Label>
            <Input
              type="number"
              id="pryValor"
              name="pryValor"
              value={soporteModel.pryValor ?? ''}
              onChange={handleInputChange(soporteModel, setSoporte)}
            />
          </div>
          <div>
            <Label htmlFor="monId">{`${t.Ficha.type} ${t.Common.currency}`}</Label>
            <SelectField
              label={``}
              options={data.monedas}
              preOption={t.Account.select}
              onChange={(e) => handleSelectChange(e, 'monId', setSoporte)}
              selectedValue={soporteModel.monId}
            />
          </div>
          <div>
            <Label htmlFor="idTipoFacturacion">{`${t.Ficha.type} ${t.Nav.facture.billing}`}</Label>
            <SelectField
              label={``}
              options={data.tiposFacturas}
              preOption={t.Account.select}
              onChange={(e) =>
                handleSelectChange(e, 'idTipoFacturacion', setSoporte)
              }
              selectedValue={soporteModel.idTipoFacturacion}
            />
          </div>
          <div>
            <Label htmlFor="valorHoraAdicional">Valor Hora Adicional</Label>
            <Input
              type="number"
              id="valorHoraAdicional"
              name="valorHoraAdicional"
              value={soporteModel.valorHoraAdicional ?? ''}
              onChange={handleInputChange(soporteModel, setSoporte)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Input de Número de Horas */}
          <div className="flex flex-col justify-center">
            <Label htmlFor="numeroHoras">Número de Horas</Label>
            <Input
              type="number"
              id="numeroHoras"
              name="numeroHoras"
              value={soporteModel.numeroHoras ?? ''}
              onChange={handleInputChange(soporteModel, setSoporte)}
              min="1"
              className="h-10"
            />
          </div>

          {/* Switch de Acumular Horas */}
          <div className="flex justify-center items-center space-x-3 h-10">
            <Switch
              className="custom-switch"
              id="acumularHoras"
              checked={soporteModel.acumularHoras ?? false}
              onCheckedChange={(value) =>
                setSoporte({ ...soporteModel, acumularHoras: value })
              }
            />
            <Label htmlFor="acumularHoras" className="text-sm align-middle">
              Acumular Horas?
            </Label>
          </div>
        </div>
      </div>
    </>
  );
}

export default SupportForm;
