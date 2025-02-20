'use client';
import React, { useEffect, useState } from 'react';
import { Usuario } from '@/app/api/models/admin/Usuario';
import { useSession } from 'next-auth/react';
import MyDatePicker from '@/app/[locale]/components/common/MyDatePicker';
import {
  handleSelectChange,
  handleInputChange,
} from '@/app/[locale]/utils/Form/UtilsForm';
import SelectField from '@/app/[locale]/components/common/SelectField';
import { fetchPersonGetbyIdClient } from '@/app/[locale]/utils/person/UtilsPerson';
import { set } from 'date-fns';
import Oportunidad from '@/app/api/models/oportunidad/Oportunidad';
import { Form } from 'react-bootstrap';
import { FormikProps } from 'formik';
import TipoLicenciaOportunidad from '@/app/api/models/oportunidad/TipoLicenciaOportunidad';
import EstadoOportunidad from '@/app/api/models/oportunidad/EstadoOportunidad';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
interface OportunidadFormProps {
  oportunidadModel: Oportunidad;
  setOportunidad: React.Dispatch<React.SetStateAction<any>>;
  t: any;
  data: any;
  formik: FormikProps<Oportunidad>;
}
const OportunidadForm: React.FC<OportunidadFormProps> = ({
  oportunidadModel,
  setOportunidad,
  t,
  data,
  formik,
}) => {
  //========DECLARACION DE VARIABLES ===============
  const [contactOptions, setContactOptions] = useState([]);
  const [statusTipo, setStatusTipo] = useState(false);
  const [statusTipoCerrada, setStatusTipoCerrada] = useState(false);
  const { data: session, status } = useSession();
  const [showKamSelect, setShowKamSelect] = useState(!!data.personasKam);
  const user = session?.user as Usuario;
  useEffect(() => {
    fetchPersonGetbyIdClient(oportunidadModel.idCliente).then((person) => {
      const options = person?.data?.map((item) => ({
        value: item.id,
        label: item.perNombres + ' ' + item.perApellidoPaterno,
      }));
      setContactOptions(options);
    });
  }, [oportunidadModel.idCliente]);
  useEffect(() => {
    if (!oportunidadModel.idKam && user?.persona.id) {
      setOportunidad((prev) => ({ ...prev, idKam: user.persona.id }));
    }
  }, [oportunidadModel.idKam, user?.persona.id, setOportunidad]);
  useEffect(() => {
    if (
      oportunidadModel.idTipoOportunidad ==
      TipoLicenciaOportunidad.Constantes.LICENCIA
    ) {
      setStatusTipo(true);
    } else {
      setStatusTipo(false);
    }
  }, [oportunidadModel.idTipoOportunidad]);
  useEffect(() => {
    if (
      oportunidadModel.idEstadoOportunidad ==
      EstadoOportunidad.Constantes.CERRADA_PERDIDA
    ) {
      setStatusTipoCerrada(true);
    } else {
      setStatusTipoCerrada(false);
    }
  }, [oportunidadModel.idEstadoOportunidad]);
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
                  onChange={(e) =>
                    handleSelectChange(e, 'idKam', setOportunidad)
                  }
                  selectedValue={oportunidadModel.idKam}
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
            <Label htmlFor="nombre">{t.Account.business_name}</Label>
            <Input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={oportunidadModel.nombre}
              onChange={handleInputChange(oportunidadModel, setOportunidad)}
            />
          </div>
          <div>
            <Label htmlFor="idCliente">{t.Account.name}</Label>
            <SelectField
              label={''}
              options={data.clientes}
              preOption={t.Account.select}
              onChange={(e) =>
                handleSelectChange(e, 'idCliente', setOportunidad)
              }
              selectedValue={oportunidadModel.idCliente}
            />
          </div>
          <div>
            <Label htmlFor="idContacto">{t.Account.contact}</Label>
            <SelectField
              label={t.Common.contact}
              options={contactOptions}
              preOption={t.Account.select}
              onChange={(e) =>
                handleSelectChange(e, 'idContacto', setOportunidad)
              }
              selectedValue={oportunidadModel.idContacto}
            />
          </div>
          <div>
            <Label htmlFor="idTipoOportunidad">{`${t.Account.type} ${t.Opportunity.opportunity}`}</Label>
            <SelectField
              label={``}
              options={data.tipoOportunidad}
              preOption={t.Account.select}
              onChange={(e) =>
                handleSelectChange(e, 'idTipoOportunidad', setOportunidad)
              }
              selectedValue={oportunidadModel.idTipoOportunidad}
            />
          </div>
          <div>
            <Label htmlFor="idOrigen">{`Origen`}</Label>
            <SelectField
              label={``}
              options={data.origenOportunidad}
              preOption={t.Account.select}
              onChange={(e) =>
                handleSelectChange(e, 'idOrigen', setOportunidad)
              }
              selectedValue={oportunidadModel.idOrigen}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <Label htmlFor="idLicitacion">{`Licitacion`}</Label>
            <SelectField
              label={``}
              options={data.licitacionOportunidad}
              preOption={t.Account.select}
              onChange={(e) =>
                handleSelectChange(e, 'idLicitacion', setOportunidad)
              }
              selectedValue={oportunidadModel.idLicitacion}
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
                handleSelectChange(e, 'idEmpresaPrestadora', setOportunidad)
              }
              selectedValue={oportunidadModel.idEmpresaPrestadora}
            />
          </div>
          <div>
            <Label htmlFor="idAreaServicio">{`area Servicio`}</Label>
            <SelectField
              label={``}
              options={data.areaServicio}
              preOption={t.Account.select}
              onChange={(e) =>
                handleSelectChange(e, 'idAreaServicio', setOportunidad)
              }
              selectedValue={oportunidadModel.idAreaServicio}
            />
          </div>
          <div>
            <Label htmlFor="idEstadoOportunidad">{t.Common.status}</Label>
            <SelectField
              label={``}
              options={data.estadoOportunidad}
              preOption={t.Account.select}
              onChange={(e) =>
                handleSelectChange(e, 'idEstadoOportunidad', setOportunidad)
              }
              selectedValue={oportunidadModel.idEstadoOportunidad}
            />
          </div>
          <div>
            {statusTipoCerrada && (
              <>
                <Label htmlFor="idTipoCerrada">{t.Common.closed}</Label>
                <SelectField
                  label={``}
                  options={data.tipoCerrada}
                  preOption={t.Account.select}
                  onChange={(e) =>
                    handleSelectChange(e, 'idTipoCerrada', setOportunidad)
                  }
                  selectedValue={oportunidadModel.idTipoCerrada}
                />
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            {statusTipo && (
              <>
                <Label htmlFor="idTipoLicencia">{t.Common.license}</Label>
                <SelectField
                  label={``}
                  options={data.tipoLicencia}
                  preOption={t.Account.select}
                  onChange={(e) =>
                    handleSelectChange(e, 'idTipoLicencia', setOportunidad)
                  }
                  selectedValue={oportunidadModel.idTipoLicencia}
                />
              </>
            )}
          </div>
        </div>
        <h6 className="text-[#2f4bce]  font-bold">{t.Common.date}</h6>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <Switch
              id="renovable"
              className="custom-switch"
              checked={oportunidadModel.renovable ?? false}
              onCheckedChange={(value) =>
                setOportunidad({
                  ...oportunidadModel,
                  renovable: value,
                })
              }
            />
            <Label className="ml-2" htmlFor="renovable">
              Renovable?
            </Label>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <Label htmlFor="fechaCierre">
              {t.Ficha.table.business.dateEnd}
            </Label>
            <MyDatePicker
              selectedDate={oportunidadModel.fechaCierre}
              onChange={(date) =>
                setOportunidad({ ...oportunidadModel, fechaCierre: date })
              }
              title={''}
            />
          </div>
        </div>
        <h6 className="text-[#2f4bce]  font-bold">{t.Common.amount}</h6>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="monto">Monto</Label>
            <Input
              type="number"
              className="form-control"
              id="monto"
              name="monto"
              value={oportunidadModel.monto ?? ''}
              onChange={handleInputChange(oportunidadModel, setOportunidad)}
            />
          </div>
          <div>
            <Label htmlFor="fechaCierre">
              {`${t.Ficha.type} ${t.Common.currency}`}
            </Label>
            <SelectField
              label=""
              options={data.monedas}
              preOption={t.Account.select}
              onChange={(e) =>
                handleSelectChange(e, 'idMoneda', setOportunidad)
              }
              selectedValue={oportunidadModel.idMoneda}
            />
          </div>
        </div>
        <div className="grid w-full gap-1.5">
          <div>
            <Label htmlFor="descripcion">{t.Common.description}</Label>
            <Textarea
              id="descripcion"
              rows={6}
              value={oportunidadModel.descripcion || ''}
              onChange={(e) =>
                setOportunidad((prev) => ({
                  ...prev,
                  descripcion: e.target.value,
                }))
              }
              className="w-full"
            />
            {formik?.touched?.descripcion && formik.errors.descripcion && (
              <p className="text-red-500 text-sm">
                {formik.errors.descripcion}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OportunidadForm;
