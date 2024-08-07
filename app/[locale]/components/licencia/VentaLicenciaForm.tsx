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
import { Form } from 'react-bootstrap';
import { FormikProps } from 'formik';
import VentaLicencia from '@/app/api/models/licencia/VentaLicencia';
interface VentaLicenciaFormProps {
  ventaLicenciaModel: VentaLicencia;
  setVentaLicencia: React.Dispatch<React.SetStateAction<any>>;
  t: any; // 't' is my translation function
  data: any;
  formik: FormikProps<VentaLicencia>;
}

const VentaLicenciaForm: React.FC<VentaLicenciaFormProps> = ({
  ventaLicenciaModel,
  setVentaLicencia,
  t,
  data,
  formik,
}) => {
  // Declare state variables and any necessary hooks similar to OportunidadForm
  const [contactOptions, setContactOptions] = useState([]);

  const { data: session, status } = useSession();
  const user = session?.user as Usuario;

  useEffect(() => {
    fetchPersonGetbyIdClient(ventaLicenciaModel.idCliente).then((person) => {
      const options = person?.data?.map((item) => ({
        value: item.id,
        label: item.perNombres + ' ' + item.perApellidoPaterno,
      }));
      setContactOptions(options);
    });
  }, [ventaLicenciaModel.idCliente]);

  useEffect(() => {
    if (!ventaLicenciaModel.idKam && user?.persona.id) {
      setVentaLicencia((prev) => ({ ...prev, idKam: user.persona.id }));
    }
  }, [ventaLicenciaModel.idKam, user?.persona.id, setVentaLicencia]);

  // Similar useEffect hooks for other fields like idEstadoOportunidad, etc.

  return (
    <>
      <div className="mb-3 row align-items-center">
        {data.personasKam ? (
          <SelectField
            label="KAM"
            options={data.personasKam}
            preOption={t.Account.select}
            labelClassName="col-sm-1 col-form-label"
            divClassName="col-sm-3"
            onChange={(e) => handleSelectChange(e, 'idKam', setVentaLicencia)}
            selectedValue={ventaLicenciaModel.idKam}
          />
        ) : (
          <>
            <label className="col-sm-1 col-form-label">{t.Account.KAM}</label>
            <div className="col-sm-3">
              <input
                type="hidden"
                name="idKam"
                id="idKam"
                value={ventaLicenciaModel.idKam || (user?.persona.id ?? '')}
                onChange={handleInputChange(
                  ventaLicenciaModel,
                  setVentaLicencia
                )}
              />
              <span className="form-control">
                {`${user?.persona.perNombres} ${user?.persona.perApellidoPaterno}`}
              </span>
            </div>
          </>
        )}
        <label className="col-sm-2 col-form-label">
          {t.Ficha.table.business.dateEnd}
        </label>
        <div className="col-sm-3">
          <MyDatePicker
            selectedDate={ventaLicenciaModel.fechaCierre}
            onChange={(date) =>
              setVentaLicencia({ ...ventaLicenciaModel, fechaCierre: date })
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
          onChange={(e) => handleSelectChange(e, 'idPais', setVentaLicencia)}
          selectedValue={ventaLicenciaModel.idPais}
        />
      </div>
      <div className="mb-3 row align-items-center">
        <SelectField
          label={t.Account.name}
          options={data.clientes}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) => handleSelectChange(e, 'idCliente', setVentaLicencia)}
          selectedValue={ventaLicenciaModel.idCliente}
        />
        <label htmlFor="nombre" className="col-sm-1 col-form-label">
          {t.Account.business_name}
        </label>
        <div className="col-sm-5">
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={ventaLicenciaModel.nombre}
            onChange={handleInputChange(ventaLicenciaModel, setVentaLicencia)}
          />
        </div>
      </div>
      <div className="mb-3 row align-items-center">
        <SelectField
          label={t.Common.contact}
          options={contactOptions}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) =>
            handleSelectChange(e, 'idContacto', setVentaLicencia)
          }
          selectedValue={ventaLicenciaModel.idContacto}
        />
        <label className="col-sm-1 col-form-label">
          {t.Common.renewalDate}
        </label>
        <div className="col-sm-2">
          <MyDatePicker
            selectedDate={ventaLicenciaModel.fechaRenovacion}
            onChange={(date) =>
              setVentaLicencia({ ...ventaLicenciaModel, fechaRenovacion: date })
            }
            title={t.Common.date}
          />
        </div>
        <SelectField
          label={`Estado`}
          options={data.estadoVentaLicencia}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) => handleSelectChange(e, 'idEstado', setVentaLicencia)}
          selectedValue={ventaLicenciaModel.idEstado}
        />
        <SelectField
          label={'Empresa Prestadora'}
          options={data.empresaPrestadora}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) =>
            handleSelectChange(e, 'idEmpresaPrestadora', setVentaLicencia)
          }
          selectedValue={ventaLicenciaModel.idEmpresaPrestadora}
        />
      </div>
      <hr />
      <div className="mb-3 row align-items-center">
        <SelectField
          label={`${t.Ficha.type} ${t.Common.currency}`}
          options={data.monedas}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) => handleSelectChange(e, 'idMoneda', setVentaLicencia)}
          selectedValue={ventaLicenciaModel.idMoneda}
        />
        <SelectField
          label={`${t.Ficha.type} ${t.Nav.facture.billing}`}
          options={data.tipofacturacion}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) =>
            handleSelectChange(e, 'idTipoFacturacion', setVentaLicencia)
          }
          selectedValue={ventaLicenciaModel.idTipoFacturacion}
        />
        <SelectField
          label={t.Common.payday}
          options={data.diaPagos}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-2"
          onChange={(e) => handleSelectChange(e, 'idDiaPago', setVentaLicencia)}
          selectedValue={ventaLicenciaModel.idDiaPago}
        />
        <div className="col-sm-1">
          <label>{t.Common.discount}</label>
        </div>
        <div className="col-sm-2">
          <Form.Group controlId="descuento">
            <Form.Control
              type="number"
              name="descuento"
              value={ventaLicenciaModel.descuento ?? ''}
              onChange={handleInputChange(ventaLicenciaModel, setVentaLicencia)}
              isInvalid={
                formik?.touched?.descuento && !!formik.errors.descuento
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.descuento}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
      </div>
      {/* Render other fields with similar structure */}
    </>
  );
};

export default VentaLicenciaForm;
