import React, { useMemo } from 'react';
import TableMaterialUI from '../../common/TablaMaterialUi';
import Industria from '@/app/api/models/prospecto/Industria';
import Link from 'next/link';
import IndustriaButtons from './IndustriaButtons';

const MemoizedTableMaterialUI = React.memo(TableMaterialUI);

function IndustriaSearch({ data, t }) {
  const columns = useMemo(() => Industria.createColumns(t), [t]);

  const memoizedData = useMemo(() => {
    return data.map((industria) => ({
      ...industria,
      actions: <IndustriaButtons t={t} industria={industria} />,
    }));
  }, [data, t]);

  return (
    <>
      <h4 className="mb-3">{t.Common.industry}</h4>
      <div className="d-flex justify-content-end container mb-3">
        <Link href={'/prospect/industry/create'}>
          <button type="button" className="btn btn-primary">
            + {t.Account.add} {t.Common.industry}
          </button>
        </Link>
      </div>
      <MemoizedTableMaterialUI columns={columns} data={memoizedData} />
    </>
  );
}

export default IndustriaSearch;
