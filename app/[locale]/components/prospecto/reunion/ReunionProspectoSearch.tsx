import React, { useMemo } from 'react';
import TableMaterialUI from '../../common/TablaMaterialUi';
import ReunionProspecto from '@/app/api/models/prospecto/ReunionProspecto';
import Link from 'next/link';
import ReunionProspectoButtons from './ReunionProspectoButtons';
import { FaSquareCheck, FaX } from 'react-icons/fa6';
import { FaCheck, FaNotEqual } from 'react-icons/fa';
import Utils from '@/app/api/models/common/Utils';

const MemoizedTableMaterialUI = React.memo(TableMaterialUI);

function ReunionProspectoSearch({ data, t }) {
  const renderIcon = (value: boolean | null) => {
    return value ? <FaCheck color="green" /> : <FaX color="red" />;
  };
  const columns = useMemo(() => ReunionProspecto.createColumns(t), [t]);
  const memoizedData = useMemo(() => {
    return data.map((reunion) => ({
      ...reunion,
      solicitaPropuesta: renderIcon(reunion.solicitaPropuesta),
      fechaReunion: Utils.getFechaHoraString(reunion.fechaReunion),
      fechaCreacion: Utils.getFechaString(reunion.fechaCreacion),
      actions: <ReunionProspectoButtons t={t} reunion={reunion} />,
    }));
  }, [data]);

  return (
    <>
      <MemoizedTableMaterialUI columns={columns} data={memoizedData} />
    </>
  );
}

export default ReunionProspectoSearch;
