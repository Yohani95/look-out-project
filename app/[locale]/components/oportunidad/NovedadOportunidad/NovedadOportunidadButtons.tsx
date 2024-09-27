import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import ConfirmationDialog from '@/app/[locale]/components/common/ConfirmationDialog';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import { deleteNovedadOportunidad } from '@/app/actions/Oportunidad/NovedadOportunidadActions';
function NovedadOportunidadButtons({ t, novedad }) {
  const router = useRouter();
  const handleEdit = async (id, trans, push) => {
    const confirmed = await ConfirmationDialog(
      trans.notification.edit.title,
      trans.notification.edit.text,
      trans.notification.edit.type,
      trans.notification.edit.buttonOk,
      trans.notification.edit.buttonCancel
    );
    if (confirmed) {
      push(
        `/opportunities/edit/${novedad.idOportunidad}/events/edit/${novedad.id}`
      );
    }
  };
  const handleDelete = async () => {
    const confirmed = await ConfirmationDialog(
      t.notification.deleting.title,
      t.notification.deleting.text,
      t.notification.deleting.type,
      t.notification.deleting.buttonOk,
      t.notification.deleting.buttonCancel
    );
    if (confirmed) {
      await NotificationSweet({
        title: t.notification.loading.title,
        text: '',
        type: t.notification.loading.type,
        showLoading: true,
      });

      await deleteNovedadOportunidad(novedad.id)
        .then(async (res) => {
          NotificationSweet({
            title: t.notification.Deleted.title,
            text: t.notification.Deleted.text,
            type: t.notification.Deleted.type,
          });
        })
        .catch((err) => {
          NotificationSweet({
            title: t.notification.error.title,
            text: t.notification.error.text,
            type: t.notification.error.type,
          });
        });
    }
  };
  return (
    <>
      {/* Botón de Editar con ID único */}
      <Button
        size="sm"
        variant="link"
        onClick={() => handleEdit(novedad.id, t, router.push)}
      >
        {/* Asigna un ID único basado en `novedad.id` */}
        <FaEdit size={16} id={`edit-tooltip-${novedad.id}`} />

        {/* Usa el ID único en `anchorSelect` */}
        <Tooltip anchorSelect={`#edit-tooltip-${novedad.id}`} place="top">
          {t?.Common.edit}
        </Tooltip>
      </Button>

      {/* Botón de Eliminar con ID único y Tooltip */}
      <Button size="sm" variant="link" onClick={() => handleDelete()}>
        {/* Asigna un ID único basado en `novedad.id` */}
        <FaTrash size={16} id={`delete-tooltip-${novedad.id}`} />

        {/* Usa el ID único en `anchorSelect` */}
        <Tooltip anchorSelect={`#delete-tooltip-${novedad.id}`} place="top">
          {t?.Common.delete}
        </Tooltip>
      </Button>
    </>
  );
}

export default NovedadOportunidadButtons;
