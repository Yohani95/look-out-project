import React, { useState, useEffect, useRef } from 'react';
import {
  handleSelectChange,
  handleInputChange,
} from '@/app/[locale]/utils/Form/UtilsForm';
import SelectField from '../../common/SelectField';
import MyDatePicker from '@/app/[locale]/components/common/MyDatePicker';
import { useSession } from 'next-auth/react';
import { fetchPersonGetbyIdClient } from '@/app/[locale]/utils/person/UtilsPerson';
import { addMonths, set } from 'date-fns';
import { Button } from 'react-bootstrap';
import { FaFileDownload } from 'react-icons/fa';
import { Usuario } from '@/app/api/models/admin/Usuario';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
function ServiceFormSection({
  proyectoModel,
  setProyecto,
  t,
  setFormData,
  formData,
  data,
}) {
  //========DECLARACION DE VARIABLES ===============
  const [contactOptions, setContactOptions] = useState([]);
  const fileInputRefs = [useRef(null), useRef(null)];
  const { data: session, status } = useSession();
  const [showKamSelect, setShowKamSelect] = useState(!!data.personasKam);
  const user = session?.user as Usuario;
  const openFileDialog = (index) => {
    fileInputRefs[index].current.click();
  };
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
    if (!proyectoModel.kamId && user?.persona.id) {
      setProyecto((prev) => ({ ...prev, kamId: user.persona.id }));
    }
  }, [proyectoModel.kamId, user?.persona.id, setProyecto]);
  useEffect(() => {
    fetchPersonGetbyIdClient(proyectoModel.pryIdCliente).then((person) => {
      const options = person?.data?.map((item) => ({
        value: item.id,
        label: item.perNombres + ' ' + item.perApellidoPaterno,
      }));
      setContactOptions(options);
    });
  }, [proyectoModel.pryIdCliente]);
  useEffect(() => {
    calculateEndDate();
  }, [proyectoModel.months, proyectoModel.pryFechaInicioEstimada]);
  //=======FIN SECCION DE USSEFFECT===============
  /*
     =================================================================================
     Seccion Funciones de componente
     =================================================================================
  */
  const handleFileChange = (event, fileindex) => {
    const { name, files } = event.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };
  const calculateEndDate = () => {
    const { months, pryFechaInicioEstimada } = proyectoModel;
    if (!months || !pryFechaInicioEstimada) {
      return; // No calcular si no hay datos suficientes
    }

    const endDate = addMonths(pryFechaInicioEstimada, parseInt(months, 10));

    setProyecto({
      ...proyectoModel,
      pryFechaCierreEstimada: endDate,
    });
  };

  const handleCheckboxChange = () => {
    const newValue = proyectoModel.facturacionDiaHabil === 1 ? 0 : 1;

    const newProyectoModel = {
      ...proyectoModel,
      facturacionDiaHabil: newValue,
    };

    setProyecto(newProyectoModel);
  };

  return (
    <>
      <div className="space-y-6">
        <h4 className="text-[#2f4bce] text-xl font-bold">Cuenta asociada</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {showKamSelect ? (
            <>
              <div>
                <Label htmlFor="kamId">KAM</Label>
                <SelectField
                  label=""
                  options={data.personasKam}
                  preOption={t.Account.select}
                  onChange={(e) => handleSelectChange(e, 'kamId', setProyecto)}
                  selectedValue={proyectoModel.kamId}
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="pryNombre">{t.Account.business_name}</Label>
            <Input
              type="text"
              className="form-control"
              id="pryNombre"
              name="pryNombre"
              value={proyectoModel.pryNombre}
              onChange={handleInputChange(proyectoModel, setProyecto)}
              required
            />
          </div>
          <div>
            <Label htmlFor="pryIdCliente">{t.Account.name}</Label>
            <SelectField
              label=""
              options={data.clientes}
              preOption={t.Account.select}
              onChange={(e) =>
                handleSelectChange(e, 'pryIdCliente', setProyecto)
              }
              selectedValue={proyectoModel.pryIdCliente}
            />
          </div>
          <div>
            <Label htmlFor="paisId">{t.Account.country}</Label>
            <SelectField
              label=""
              options={data.paises}
              preOption={t.Account.select}
              onChange={(e) => handleSelectChange(e, 'paisId', setProyecto)}
              selectedValue={proyectoModel.paisId}
            />
          </div>
          <div>
            <Label htmlFor="pryIdContacto">{t.Common.contact}</Label>
            <SelectField
              label=""
              options={contactOptions}
              preOption={t.Account.select}
              onChange={(e) =>
                handleSelectChange(e, 'pryIdContacto', setProyecto)
              }
              selectedValue={proyectoModel.pryIdContacto}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
          <div>
            <Label htmlFor="tseId">{`${t.Account.type} ${t.Account.business}`}</Label>
            <SelectField
              label={``}
              options={data.tipoServicios}
              preOption={t.Account.select}
              onChange={(e) => handleSelectChange(e, 'tseId', setProyecto)}
              selectedValue={proyectoModel.tseId}
            />
          </div>
          <div>
            <Label htmlFor="idEmpresaPrestadora">{'Empresa Prestadora'}</Label>
            <SelectField
              label=""
              options={data.empresaPrestadora}
              preOption={t.Account.select}
              onChange={(e) =>
                handleSelectChange(e, 'idEmpresaPrestadora', setProyecto)
              }
              selectedValue={proyectoModel.idEmpresaPrestadora}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
        <div>
          <Label htmlFor="confirmclient">
            {t.Common.confirm} {t.Common.client}
          </Label>
          {/* <Input
            id="confirmclient"
            value={formData.file1 ? formData.file1.name : 'N/A'}
            readOnly
            onClick={() => openFileDialog(0)}
            className="cursor-pointer"
          /> */}
          <input
            type="file"
            className="form-control"
            ref={fileInputRefs[0]}
            id="file1"
            name="file1"
            onChange={(event) => handleFileChange(event, 0)}
          />
          {/* <Button variant="outline" onClick={() => openFileDialog(0)}>
            {t.Common.uploadFile}
          </Button> */}
          {formData.file1 && (
            <a
              href={URL.createObjectURL(formData.file1)}
              download={formData.file1.name}
              className="text-primary flex items-center"
            >
              <FaFileDownload size={18} className="mr-1" />
              {t.Common.downloadFile} {formData.file1.name}
            </a>
          )}
        </div>
        <div>
          <Label htmlFor="proposal">
            {t.Common.proposal} {t.Common.accepted}
          </Label>
          <input
            type="file"
            ref={fileInputRefs[1]}
            id="file2"
            name="file2"
            onChange={(event) => handleFileChange(event, 1)}
            className="form-control"
          />
          {formData.file2 && (
            <a
              href={URL.createObjectURL(formData.file2)}
              download={formData.file2.name}
              className="text-primary flex items-center"
            >
              <FaFileDownload size={18} className="mr-1" />{' '}
              {t.Common.downloadFile} {formData.file2.name}
            </a>
          )}
        </div>
      </div>
      <h4 className="text-[#2f4bce] text-xl font-bold">{t.Common.date}</h4>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
        <div>
          <Label htmlFor="pryFechaInicioEstimada">
            {t.business.estimatedStartDate}
          </Label>
          <MyDatePicker
            selectedDate={proyectoModel.pryFechaInicioEstimada}
            onChange={(date) =>
              setProyecto({
                ...proyectoModel,
                pryFechaInicioEstimada: date,
              })
            }
            title={''}
          />
        </div>
        <div>
          <Label htmlFor="pryFechaCierre">
            {t.Ficha.table.business.dateEnd}
          </Label>
          <MyDatePicker
            selectedDate={proyectoModel.pryFechaCierre}
            onChange={(date) =>
              setProyecto({ ...proyectoModel, pryFechaCierre: date })
            }
            title={''}
          />
        </div>
        <div>
          <Label htmlFor="pryFechaCierreEstimada">
            {t.business.estimatedClosingDate}
          </Label>

          <MyDatePicker
            selectedDate={proyectoModel.pryFechaCierreEstimada}
            onChange={(date) =>
              setProyecto({
                ...proyectoModel,
                pryFechaCierreEstimada: date,
              })
            }
            isRead={true}
            title={''}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
        <div>
          <Label htmlFor="months">{t.business.estimatedTerm}</Label>

          <Input
            type="number"
            className="form-control"
            id="months"
            name="months"
            min="1"
            max="120"
            value={proyectoModel.months || ''}
            onChange={handleInputChange(proyectoModel, setProyecto)}
          />
        </div>
        <div>
          <Label htmlFor="fechaCorte">{t.project.datecut}</Label>
          <SelectField
            label={''}
            options={daysArray}
            preOption={t.Account.select}
            onChange={(e) => handleSelectChange(e, 'fechaCorte', setProyecto)}
            selectedValue={proyectoModel.fechaCorte}
          />
        </div>
        <div>
          <Label htmlFor="idDiaPago">{t.Common.payday}</Label>
          <SelectField
            label={''}
            options={data.diaPagos}
            preOption={t.Account.select}
            onChange={(e) => handleSelectChange(e, 'idDiaPago', setProyecto)}
            selectedValue={proyectoModel.idDiaPago}
          />
        </div>
      </div>

      <h4 className="text-[#2f4bce] text-xl font-bold">{t.Common.amount}</h4>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
        <div className="flex items-center space-x-2">
          <Input
            type="checkbox"
            id="facturacionDiaHabil"
            name="facturacionDiaHabil"
            checked={proyectoModel.facturacionDiaHabil === 1}
            onChange={handleCheckboxChange}
            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="facturacionDiaHabil">{t.Common.billingType}</Label>
        </div>
        <div>
          <Label htmlFor="monId">{`${t.Ficha.type} ${t.Common.currency}`}</Label>
          <SelectField
            label=""
            options={data.monedas}
            preOption={t.Account.select}
            onChange={(e) => handleSelectChange(e, 'monId', setProyecto)}
            selectedValue={proyectoModel.monId}
          />
        </div>
        <div>
          <Label htmlFor="idTipoFacturacion">{`${t.Ficha.type} ${t.Nav.facture.billing}`}</Label>
          <SelectField
            label=""
            options={data.tiposFacturas}
            preOption={t.Account.select}
            onChange={(e) =>
              handleSelectChange(e, 'idTipoFacturacion', setProyecto)
            }
            selectedValue={proyectoModel.idTipoFacturacion}
          />
        </div>
      </div>
    </>
  );
}

export default ServiceFormSection;
