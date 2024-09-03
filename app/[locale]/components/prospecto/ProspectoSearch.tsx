import React, { useMemo } from 'react';
import TableMaterialUI from '../common/TablaMaterialUi';
import Prospecto from '@/app/api/models/prospecto/Prospecto';
import ProspectoButtons from './ProspectoButtons';
import Link from 'next/link';
import Utils from '@/app/api/models/common/Utils';
import { FaCheck, FaPhoneSlash, FaTimes } from 'react-icons/fa';
import Persona from '@/app/api/models/admin/Persona';
import { FaPhoneFlip } from 'react-icons/fa6';
import ContactosProspecto from '@/app/api/models/prospecto/ContactoProspecto';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function ProspectoSearch({ t, data }) {
  const columns = useMemo(() => Prospecto.createColumns(t), [t]);
  const renderIcon = (value: boolean | null) => {
    return value ? <FaPhoneFlip color="green" /> : <FaPhoneSlash color="red" />;
  };
  const memoizedData = useMemo(() => {
    return data.map((prospecto) => ({
      ...prospecto,
      kam: new Persona(prospecto.kam).getNombreCompleto(),
      fechaCreacion: Utils.getFechaString(prospecto.fechaCreacion),
      fechaActividad: Utils.getFechaString(prospecto.fechaActividad),
      contactado: renderIcon(prospecto.contacto),
      responde: renderIcon(prospecto.responde),
      cantidadLlamadas: prospecto.cantidadLlamadas ?? '—',
      contacto: new ContactosProspecto(prospecto.contacto).nombreCompleto,
      tipoContactoProspecto: prospecto.contacto?.tipoContactoProspecto.nombre,
      actions: <ProspectoButtons t={t} prospecto={prospecto} />,
    }));
  }, [data]);
  return (
    <>
      <h4 className="mb-3">{t.Common.prospect}</h4>
      <div className="d-flex justify-content-end container mb-3">
        <Link href={'/prospect/create'}>
          <button type="button" className=" btn btn-primary ">
            + {t.Account.add} {t.Common.prospect}
          </button>
        </Link>
      </div>
      <MemoizedTableMaterialUI columns={columns} data={memoizedData} />
    </>
  );
}

export default ProspectoSearch;
