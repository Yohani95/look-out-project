import Prospecto from '@/app/api/models/prospecto/Prospecto';
import React, { useEffect } from 'react';
import SelectField from '@/app/[locale]/components/common/SelectField';
import {
  handleSelectChange,
  handleInputChange,
} from '@/app/[locale]/utils/Form/UtilsForm';
import { FormikProps } from 'formik';
import { Usuario } from '@/app/api/models/admin/Usuario';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
interface FormProps {
  prospectoModel: Prospecto;
  setProspecto: React.Dispatch<React.SetStateAction<any>>;
  t: any; // Función de traducción
  data: any;
  formik?: FormikProps<Prospecto>;
}

const ProspectoForm: React.FC<FormProps> = ({
  prospectoModel,
  setProspecto,
  t,
  data,
  formik,
}) => {
  const { data: session, status } = useSession();
  const user = session?.user as Usuario;
  const pathname = usePathname();
  useEffect(() => {
    if (!prospectoModel.idKam && user?.persona.id) {
      setProspecto((prev) => ({
        ...prev,
        idKam: user.persona.id,
      }));
    }
  }, [prospectoModel.idKam, user?.persona.id, setProspecto]);
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
            onChange={(e) => handleSelectChange(e, 'idKam', setProspecto)}
            selectedValue={prospectoModel.idKam}
          />
        ) : (
          <>
            <label className="col-sm-1 col-form-label">{t.Account.KAM}</label>
            <div className="col-sm-3">
              <input
                type="hidden"
                name="idKam"
                id="idKam"
                value={prospectoModel.idKam || (user?.persona.id ?? '')}
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
          onChange={(e) => handleSelectChange(e, 'idCliente', setProspecto)}
          selectedValue={prospectoModel.idCliente}
        />
        {!pathname.includes('prospect/create') && (
          <SelectField
            label={t.Common.contact}
            options={data.contactos}
            preOption={t.Account.select}
            labelClassName="col-sm-1 col-form-label"
            divClassName="col-sm-3"
            onChange={(e) => handleSelectChange(e, 'idContacto', setProspecto)}
            selectedValue={prospectoModel.idContacto}
          />
        )}
      </div>
      <div className="mb-3 row align-items-center">
        <SelectField
          label={t.Common.status}
          options={data.estados}
          preOption={t.Account.select}
          labelClassName="col-sm-1 col-form-label"
          divClassName="col-sm-3"
          onChange={(e) =>
            handleSelectChange(e, 'idEstadoProspecto', setProspecto)
          }
          selectedValue={prospectoModel.idEstadoProspecto}
        />
        <label htmlFor="contactado" className="col-sm-2 col-form-label">
          Fue Contactado?
        </label>
        <div className="col-sm-1 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="contactado"
            name="contactado"
            checked={prospectoModel.contactado ?? false}
            onChange={(e) =>
              setProspecto({
                ...prospectoModel,
                contactado: e.target.checked,
              })
            }
          />
        </div>
        <label htmlFor="responde" className="col-sm-2 col-form-label">
          Responde?
        </label>
        <div className="col-sm-1 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="responde"
            name="responde"
            checked={prospectoModel.responde ?? false}
            onChange={(e) =>
              setProspecto({
                ...prospectoModel,
                responde: e.target.checked,
              })
            }
          />
        </div>
      </div>
    </>
  );
};

export default ProspectoForm;
