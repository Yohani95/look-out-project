import ProyectoDesarrollo from '@/app/api/models/proyectoDesarrollo/ProyectoDesarrollo';
import React, { useEffect, useState } from 'react';
import SelectField from '@/app/[locale]/components/common/SelectField';
import {
  handleSelectChange,
  handleInputChange,
} from '@/app/[locale]/utils/Form/UtilsForm';
import { FormikProps } from 'formik';
import { Usuario } from '@/app/api/models/admin/Usuario';
import { useSession } from 'next-auth/react';
import MyDatePicker from '@/app/[locale]/components/common/MyDatePicker';
import { fetchPersonGetbyIdClient } from '@/app/[locale]/utils/person/UtilsPerson';
interface FormProps {
  proyectoModel: ProyectoDesarrollo;
  setProyecto: React.Dispatch<React.SetStateAction<any>>;
  t: any; // Función de traducción
  data: any;
  formik?: FormikProps<ProyectoDesarrollo>;
}

const ProyectoDesarrolloForm: React.FC<FormProps> = ({
  proyectoModel,
  setProyecto,
  t,
  data,
  formik,
}) => {
  const { data: session, status } = useSession();
  const user = session?.user as Usuario;
  useEffect(() => {
    if (!proyectoModel.idKam && user?.persona.id) {
      setProyecto((prev) => ({
        ...prev,
        idKam: user.persona.id,
      }));
    }
  }, [proyectoModel.idKam, user?.persona.id, setProyecto]);
  const [contactOptions, setContactOptions] = useState([]);
  useEffect(() => {
    fetchPersonGetbyIdClient(proyectoModel.idCliente).then((person) => {
      const options = person?.data?.map((item) => ({
        value: item.id,
        label: item.perNombres + ' ' + item.perApellidoPaterno,
      }));
      setContactOptions(options);
    });
  }, [proyectoModel.idCliente]);
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
            onChange={(e) => handleSelectChange(e, 'idKam', setProyecto)}
            selectedValue={proyectoModel.idKam}
          />
        ) : (
          <>
            <label className="col-sm-1 col-form-label">{t.Account.KAM}</label>
            <div className="col-sm-3">
              <input
                type="hidden"
                name="idKam"
                id="idKam"
                value={proyectoModel.idKam || (user?.persona.id ?? '')}
              />
              <span className="form-control">
                {`${user?.persona.perNombres} ${user?.persona.perApellidoPaterno}`}
              </span>
            </div>
          </>
        )}
        <SelectField
          label={t.Ficha.name}
          options={data.clientes}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) => handleSelectChange(e, 'idCliente', setProyecto)}
          selectedValue={proyectoModel.idCliente}
        />
        <SelectField
          label={t.Common.contact}
          options={contactOptions}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) => handleSelectChange(e, 'idContacto', setProyecto)}
          selectedValue={proyectoModel.idContacto}
        />
      </div>
      <div className="mb-3 row align-items-center">
        <SelectField
          label={t.Ficha.type}
          options={data.tiposProyecto}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) => handleSelectChange(e, 'idTipoProyecto', setProyecto)}
          selectedValue={proyectoModel.idTipoProyecto}
        />
        <SelectField
          label={'Etapa'}
          options={data.etapas}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) => handleSelectChange(e, 'idEtapa', setProyecto)}
          selectedValue={proyectoModel.idEtapa}
        />
        <SelectField
          label={t.Common.status}
          options={data.estados}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) => handleSelectChange(e, 'idEstado', setProyecto)}
          selectedValue={proyectoModel.idEstado}
        />
      </div>
      <div className="mb-3 row align-items-center">
        <label htmlFor="avance" className="col-sm-1 col-form-label">
          {t.Ficha.progress} Avance
        </label>
        <div className="col-sm-2">
          <input
            type="number"
            className="form-control"
            id="avance"
            name="avance"
            value={proyectoModel.avance || ''}
            onChange={(e) => handleInputChange(e, 'avance', setProyecto)}
          />
        </div>
        <label className="col-sm-2 col-form-label">
          {t.Ficha.table.business.dateEnd}
        </label>
        <div className="col-sm-3">
          <MyDatePicker
            selectedDate={proyectoModel.fechaCierre}
            onChange={(date) =>
              setProyecto({ ...proyectoModel, fechaCierre: date })
            }
            title={t.Common.date}
          />
        </div>
        <SelectField
          label={t.Common.currency}
          options={data.monedas}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) => handleSelectChange(e, 'idMoneda', setProyecto)}
          selectedValue={proyectoModel.idMoneda}
        />
      </div>
    </>
  );
};

export default ProyectoDesarrolloForm;
