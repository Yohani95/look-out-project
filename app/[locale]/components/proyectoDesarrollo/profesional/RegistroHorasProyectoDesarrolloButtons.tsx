'use client';

import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import NotificationSweet from '@/app/[locale]/components/common/NotificationSweet';
import Utils from '@/app/api/models/common/Utils';
import { deleteRegistroHorasProyectoDesarrollo } from '@/app/actions/proyectoDesarrollo/RegistroHorasProyectoDesarrolloActions';

function RegistroHorasProyectoDesarrolloButtons({ t, registro }) {
  const router = useRouter();

  const handleEdit = async () => {
    const confirmed = await Utils.showConfirmationDialogEdit(t);
    if (confirmed) {
      router.push(
        `/developmentProject/hours/${registro.idProfesionalProyecto}/edit/${registro.id}`
      );
    }
  };

  const handleDelete = async () => {
    const confirmed = await Utils.showConfirmationDialogDelete(t);
    if (confirmed) {
      await deleteRegistroHorasProyectoDesarrollo(registro.id)
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

  // Genera IDs únicos para cada fila en función del id del registro de horas
  const editId = `edit-tooltip-${registro.id}`;
  const deleteId = `delete-tooltip-${registro.id}`;

  return (
    <>
      <Button size="sm" variant="link" onClick={handleEdit}>
        <FaEdit size={16} id={editId} />
        <Tooltip anchorSelect={`#${editId}`} place="left">
          {t?.Common.edit}
        </Tooltip>
      </Button>

      <Button size="sm" variant="link" onClick={handleDelete}>
        <FaTrash size={16} id={deleteId} />
        <Tooltip anchorSelect={`#${deleteId}`} place="left">
          {t?.Common.delete}
        </Tooltip>
      </Button>
    </>
  );
}

export default RegistroHorasProyectoDesarrolloButtons;
