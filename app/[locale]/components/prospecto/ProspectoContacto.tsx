'use client';
import React from 'react';
import ProspectoForm from './ProspectoForm';
import { useRouter } from 'next/navigation';
import LlamadaProspectoCreate from './llamada/LlamadaProspectoCreate';
import LlamadaProspectoSearch from './llamada/LlamadaProspectoSearch';
import BoxInfo from '@/app/[locale]/components/common/BoxInfo';
interface FormProps {
  t: any; // Función de traducción
  data: any;
  id: number; // ID del prospecto
}
const ProspectoContacto: React.FC<FormProps> = ({ t, data, id }) => {
  const router = useRouter();
  return (
    <>
      <h4>{`${t.Common.prospect}`}</h4>
      <fieldset disabled>
        <ProspectoForm
          t={t}
          prospectoModel={data.prospecto} // Solo lectura
          setProspecto={() => {}} // No se necesita en modo solo lectura
          data={data}
        />
      </fieldset>
      <hr />
      <BoxInfo title={t.Common.activities}>
        <LlamadaProspectoCreate data={data} t={t} idProspecto={id} />
        <hr />
        <LlamadaProspectoSearch data={data.llamadas} t={t} />
      </BoxInfo>
      <div className="d-flex justify-content-end mb-2">
        <button
          type="button"
          className="btn btn-danger m-2"
          onClick={async () => {
            await router.refresh();
            router.back();
          }}
        >
          {t.Common.goBack}
        </button>
      </div>
    </>
  );
};

export default ProspectoContacto;
