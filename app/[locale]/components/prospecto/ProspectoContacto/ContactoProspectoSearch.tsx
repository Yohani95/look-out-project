import React, { useMemo } from 'react';
import TableMaterialUI from '../../common/TablaMaterialUi';
import ContactosProspecto from '@/app/api/models/prospecto/ContactoProspecto';
import Link from 'next/link';
import ContactoProspectoButtons from './ContactoProspectoButtons';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);
function ContactoProspectoSearch({ data, t }) {
  const columns = useMemo(() => ContactosProspecto.createColumns(t), [t]);
  const memoizedData = useMemo(() => {
    return data.map((contacto) => ({
      ...contacto,
      actions: <ContactoProspectoButtons t={t} contacto={contacto} />,
    }));
  }, [data]);
  return (
    <>
      <div className="d-flex justify-content-end container mb-3">
        <Link href={'/prospect/contact/create'}>
          <button type="button" className=" btn btn-primary ">
            + {t.Account.add} {t.Common.prospectContact}
          </button>
        </Link>
      </div>
      <MemoizedTableMaterialUI columns={columns} data={memoizedData} />
    </>
  );
}

export default ContactoProspectoSearch;
