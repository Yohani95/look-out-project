'use client';
import Link from 'next/link';
import React, { useMemo } from 'react';
import TableMaterialUI from '@/app/[locale]/components/common/TablaMaterialUi';

import Utils from '@/app/api/models/common/Utils';
import { RolClass } from '@/app/api/models/admin/Rol';
import RolButtons from './RolButtons';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function RolSearch({ t, data }) {
  const columns = useMemo(() => RolClass.createColumns(t), [t]);
  const memoizedSoporteActions = useMemo(() => {
    return data.map((rol: RolClass) => ({
      ...rol,
      actions: (
        <>
          <RolButtons rol={rol} t={t} />
        </>
      ),
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
}

export default RolSearch;
