import RolFuncionalidad from '@/app/api/models/admin/RolFuncionalidad';
import React, { useMemo } from 'react';
import TableMaterialUI from '../../../common/TablaMaterialUi';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
interface FormProps {
  t: any; // Función de traducción
  data: any;
}
const RolfuncionalidadSearch: React.FC<FormProps> = ({ t, data }) => {
  const columns = useMemo(() => RolFuncionalidad.createColumns(t), [t]);
  const memoizedSoporteActions = useMemo(() => {
    return data.map((rolFuncionalidad: RolFuncionalidad) => ({
      ...rolFuncionalidad,
      actions: <>{/* <RolButtons rol={rolFuncionalidad} t={t} /> */}</>,
    }));
  }, [data, t]);
  return (
    <>
      <MemoizedTableMaterialUI
        columns={columns}
        data={memoizedSoporteActions}
      />
    </>
  );
};

export default RolfuncionalidadSearch;
