'use client';
import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import TableCommon from '@/app/[locale]/components/common/TableCommon';
import Persona from '@/app/api/models/admin/Persona';
import { handleEditProfessional } from '@/app/[locale]/utils/person/UtilsPerson';
import ActionButtons from '../../contact/ActionButtons';
import { EditAction } from './ProfessionalsActions';
import TableMaterialUI from '../../common/TablaMaterialUi';
import Utils from '@/app/api/models/common/Utils';
import NotificationSweet from '../../common/NotificationSweet';
import { deletePersona } from '@/app/actions/admin/PersonaActions';
const MemoizedTableMaterialUI = React.memo(TableMaterialUI);

async function ProfesionalsSearch({ data, locale }) {
  const t = require(`@/messages/${locale}.json`);
  const router = useRouter();
  const columns = [
    {
      key: 'id',
      title: 'ID',
    },
    { key: 'perNombres', title: t.Common.name },
    { key: 'perIdNacional', title: t.Common.rut },
    {
      title: t.Account.action,
      key: 'actions',
      render: (item) => (
        <ActionButtons
          //onDelete={() => handleDelete(item.id, t)}
          onEdit={() => handleEditProfessional(item.id, t, router.push)}
          onView={() => {
            router.push(`/admin/professional/view/${item.id}`);
          }}
        />
      ),
    },
  ];
  const onDelete = async (id) => {
    const confirmed = await Utils.showConfirmationDialogDelete(t);
    if (confirmed) {
      await deletePersona(id)
        .then(() => {
          NotificationSweet({
            title: t.notification.Deleted.title,
            text: t.notification.Deleted.text,
            type: t.notification.Deleted.type,
          });
        })
        .catch(() => {
          Utils.handleErrorNotification(t);
        });
    }
  };
  const columns2 = useMemo(() => Persona.createColumnsProfessionals(t), [t]);
  const personas = data?.map((persona) => ({
    ...new Persona(persona), // Instancia una nueva Persona con los datos existentes
    perNombres: new Persona(persona).getNombreCompleto(),
  }));
  const memoizedActions = useMemo(() => {
    return data.map((persona: Persona) => ({
      ...persona,
      nombre: new Persona(persona).getNombreCompleto(),
      actions: (
        <>
          <ActionButtons
            onDelete={() => onDelete(persona.id)}
            onEdit={() => handleEditProfessional(persona.id, t, router.push)}
            onView={() => {
              router.push(`/admin/professional/view/${persona.id}`);
            }}
          />
        </>
      ),
    }));
  }, [data, t]);
  return (
    <>
      {personas && personas.length > 0 ? (
        <MemoizedTableMaterialUI columns={columns2} data={memoizedActions} />
      ) : (
        <div className="text-center justify-content-center align-items-center">
          <h4>{t.Common.professionals}</h4> {t.Common.noData}
        </div>
      )}
    </>
  );
}
export default ProfesionalsSearch;
