import React, { useMemo } from 'react';
import TableMaterialUI from '../../common/TablaMaterialUi';
import LlamadaProspecto from '@/app/api/models/prospecto/LlamadaProspecto';
import Link from 'next/link';
import LlamadaProspectoButtons from './LlamadaProspectoButtons';
import Utils from '@/app/api/models/common/Utils';
import { FaPhoneFlip } from 'react-icons/fa6';
import { FaPhoneSlash } from 'react-icons/fa';

const MemoizedTableMaterialUI = React.memo(TableMaterialUI);

function LlamadaProspectoSearch({ data, t }) {
  const columns = useMemo(() => LlamadaProspecto.createColumns(t), [t]);
  const renderIcon = (value: boolean | null) => {
    return value ? <FaPhoneFlip color="green" /> : <FaPhoneSlash color="red" />;
  };
  const memoizedData = useMemo(() => {
    return data.map((llamada) => ({
      ...llamada,
      fechaCreacion: Utils.getFechaString(llamada.fechaCreacion),
      respondeLlamada: renderIcon(llamada.respondeLlamada),
      fechaProximaLlamada: Utils.getFechaString(llamada.fechaProximaLlamada),
      actions: <LlamadaProspectoButtons t={t} llamada={llamada} />,
    }));
  }, [data]);

  return (
    <>
      <MemoizedTableMaterialUI columns={columns} data={memoizedData} />
    </>
  );
}

export default LlamadaProspectoSearch;
